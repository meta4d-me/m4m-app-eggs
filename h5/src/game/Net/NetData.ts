import { BufferDataReader } from "../AutoCode/Net/BufferDatas/BufferDataReader";

export class NetData {
    /**
     * json字符串
     */
    public code: string;
    public arrayBuffer;
    /**
     * 头部字符串
     */
    public head: string;
    public isBuffer = false;
    public constructor(str: any) {
        if (typeof (str) == "string") {
            let arr = str.match(NetData.reg);
            if (arr != null) {
                this.head = arr[0];
                this.code = str.substring(this.head.length);
            } else {
                this.head = null;
                this.code = str;
            }
        } else {
            this.arrayBuffer = str;
            if (str.className) {
                this.obj = [];
                this.obj.push(str);
            }
            this.isBuffer = true;
            this.head = "[BUFFER]";
        }
    }
    private static reg = /^\[\w+\]/;
    private obj: any;
    /**
     * 获取json对象
     */
    public GetJson(): any {
        if (this.obj == null) {
            this.obj = [];
            if (!this.isBuffer) {
                let timer = Date.now();
                this.obj.push(JSON.parse(this.code));
                let timer1 = Date.now() - timer;
                console.log("json长度  " + this.code.length + "   解析耗时  " + timer1);
            } else {

                let bytes = new m4m.io.binTool();
                bytes.write(new Uint8Array(this.arrayBuffer));
                while (bytes.r_offset < bytes.length) {
                    let className = NetData.readString(bytes);
                    let functionName = NetData.readString(bytes);
                    let argsType = NetData.readString(bytes);
                    let dataClass = NetData.readString(bytes);
                    let args = [];
                    let msgId = 0;
                    if (dataClass == "Param") {
                        while (bytes.r_offset < bytes.length - 4) {
                            args.push(this.getParams(bytes));
                        }
                        msgId = bytes.readUInt32();
                        this.obj.push({ className, functionName, argsType, args, msgId });
                        continue;
                    }
                    if (dataClass == "null") {
                        msgId = bytes.readUInt32();
                        this.obj.push({ className, functionName, argsType, args, msgId });
                        continue;
                    }
                    let dataType = NetData.readString(bytes);

                    switch (dataType) {
                        case "DataList":
                            let len = bytes.readInt32();
                            let listData = [];
                            for (let i = 0; i < len; i++) {
                                listData.push(this.getDataByBuffer(dataClass, bytes));
                            }
                            args.push(listData);
                            break;
                        case "DataDic":
                            let len2 = bytes.readInt32();
                            let DicData = {};
                            for (let i = 0; i < len2; i++) {
                                let key = NetData.readString(bytes);
                                DicData[key] = this.getDataByBuffer(dataClass, bytes);
                            }
                            args.push(DicData);
                            break;

                        default:
                            args.push(this.getDataByBuffer(dataClass, bytes));

                    }
                    msgId = bytes.readUInt32();
                    this.obj.push({ className, functionName, argsType, args, msgId });
                }
            }
        }
        return this.obj;
    }
    private getParams(bytes: m4m.io.binTool) {
        let classDtype = bytes.readByte();
        let dataClass = this.getDataClassByTypeId(bytes.readByte());
        switch (classDtype) {
            case 1:
                let len = bytes.readInt32();
                let listData: any[] = [];
                for (let i = 0; i < len; i++) {
                    listData.push(this.getDataByBuffer(dataClass, bytes));
                }
                return listData;
            case 2:
                let len2 = bytes.readInt32();
                let DicData = {};
                for (let i = 0; i < len2; i++) {
                    let key2 = NetData.readString(bytes);
                    if (DicData[key2] == null) {
                        DicData[key2] = this.getDataByBuffer(dataClass, bytes);
                    }
                }
                return DicData;
            case 3:
                let len3 = bytes.readInt32();
                let DicListData = {};
                for (let i = 0; i < len3; i++) {
                    let key = NetData.readString(bytes);
                    if (DicListData[key] == null) {
                        let newlist: any[] = [];
                        let newLen = bytes.readInt32();
                        for (let j = 0; j < newLen; j++) {
                            newlist.push(this.getDataByBuffer(dataClass, bytes));
                        }
                        DicListData[key] = newlist;
                    }

                }
                return DicListData;
            default:
                return this.getDataByBuffer(dataClass, bytes);
        }
    }
    private getDataClassByTypeId(id) {
        switch (id) {

            case 1:
                return "byte";
            case 2:
                return "bool";
            case 3:
                return "int";
            case 4:
                return "uint";
            case 5:
                return "float";
            case 6:
                return "ushort";
            case 7:
                return "short";
            case 8:
                return "ulong";
            case 9:
                return "long";
            default:
                return "string";
        }
    }
    private getDataByBuffer(dataClass: string, bytes: m4m.io.binTool) {
        switch (dataClass) {
            case "int":
                return bytes.readInt32();
            case "uint":
                return bytes.readUInt32();
            case "short":
                return bytes.readInt16();
            case "ushort":
                return bytes.readUInt16();
            case "long":
                return bytes.readLong();
            case "ulong":
                return bytes.readULong();
            case "byte":
                return bytes.readByte();
            case "float":
                return bytes.readSingle();
            case "bool":
                return bytes.readBoolean();
            case "DateTime":
                return bytes.readDouble();
            case "string":
                return NetData.readString(bytes);
            default:

        }
        let obj = BufferDataReader.Instance.readArrayBuffer(dataClass, bytes);
        return obj;
    }
    public static readString(bytes: m4m.io.binTool) {
        let len = bytes.readUInt16();
        return bytes.readUTFByLen(len);
    }
}