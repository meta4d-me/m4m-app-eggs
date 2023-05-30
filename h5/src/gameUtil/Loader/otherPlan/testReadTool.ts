import { PropertieType } from "./PropertieType";
import { tPoseInfo } from "./dataType/tPoseInfo";
import { PoseBoneMatrix } from "./dataType/PoseBoneMatrix";
import { number4 } from "./dataType/number4";
import { nameEnum, prtEnum, typeEnum } from "./dataType/readEnums";
import { AssetBundleFileInfo } from "./dataType/AssetBundleFileInfo";
import { loadTools } from "./loadTools";
import { cMap } from "src/gameUtil/Data/Map";
import { testCreat } from "./testCreat";

// tslint:disable-next-line: class-name
export class fileInfo {
    public static classType = m4m["fileInfo"] = fileInfo;
    public fileCount: cMap<number> = new cMap<number>();
}

// tslint:disable-next-line: class-name
export class testReadTool {
    public static classType = m4m["testReadTool"] = testReadTool;
    // public static async loadArrayBuffera(url: string, onFishih: Function = null) {
    //     let loadFile = LoaderManage.Instance.load(url, onFishih);
    //     let buffer = await loadFile.load();
    //     // let loader = new Loader();
    //     // LoaderManage.Instance.loaders.set(url, loader);
    //     // let buffer = await loader.load();

    //     return buffer as ArrayBuffer;
    // }
    // "Resources/props/TESTAsset/role_middle/PF_PlayerSharkReef/resources/PF_PlayerSharkReef_Json.json"
    public static tempListString: cMap<AssetBundleFileInfo[]> = new cMap<AssetBundleFileInfo[]>();
    public static timer: cMap<number> = new cMap<number>();
    // public static async loadABFFromJson(url: string) {
    //     // this.timer.set(url + 1, Date.now());
    //     let json = await testCreat.loadJson(url);
    //     // let nowT = Date.now();
    //     // console.error(" 加载文件   " + url + "    " + (nowT - this.timer.get(url + 1)));
    //     // this.timer.set(url + 1, nowT);
    //     // let files = JSON.parse(json);
    //     return json
    // }

    public static index = 0;
    /**
     * 加载资源组二进制数据
     * @param url 
     */
    // public static loadAssetBoundleFiles(url: string, fun: (classObj) => void) {
    public static async loadAssetBoundleFiles(urll: string, isOnlyExportOne: boolean = false) {
        // url=  url.replace(".js","");
        // this.timer.set(url + 2, Date.now());
        let url = testCreat.CDNURL + urll;
        if (this.tempListString.has(url)) {
            return this.tempListString.get(url);
        }
        this.tempListString.set(url, null);

        let tempp = new Promise((resolve: ((a: ArrayBuffer) => void)) => {
            this.readArrayBuffer(url, resolve);
        });

        let bd = await tempp;
        return this.readInfoByBuffer(url, bd);

    }
    public static readInfoByBuffer(url: string, bd: ArrayBuffer) {
        // let nowT = Date.now();
        // console.error(" 加载文件   " + url + "    " + (nowT - this.timer.get(url + 2)));
        // this.timer.set(url + 3, nowT);

        let test: AssetBundleFileInfo[] = [];
        if (bd) {

            let bytes = new m4m.io.binTool();
            bytes.write(new Uint8Array(bd));

            let fileListLenght = bytes.readInt32();
            let deserializeCount = 0;
            for (let i = 0; i < fileListLenght; i++) {
                let classNameID = bytes.readUInt8();
                //通过编号取得类名
                let className = nameEnum[classNameID];
                //通过类名新建类
                let classObj = new m4m[className]();
                classObj["className"] = className;
                //解析类
                classObj = this.readBytes(bytes, classObj);

                test.push(classObj);
                deserializeCount++;

            }
            bytes.dispose();
        }
        this.tempListString.set(url, test);

        // let nowTT = Date.now();
        // console.error(" 解析二进制文件   " + url + "    " + (nowTT - this.timer.get(url + 3)));
        // this.timer.set(url + 4, nowTT);

        return test;
    }
    public static readArrayBuffer(url: string, cb: Function) {
        // if (url.indexOf("InGame_Sharks_ReefShark_ReefShark.FBX_Object003.mesh.bin.js") != -1) {
        //     url = url.replace("InGame_Sharks_ReefShark_ReefShark.FBX_Object003.mesh.bin.js", "PF_PlayerSharkReef.bpkg.json");
        // }
        loadTools.loadArrayBuffer(url, (bin, urlStr) => {
            cb(bin);
        });
    }
    /**
     * 解析类
     * @param br 
     * @param classObj 
     */
    private static readBytes(br: m4m.io.binTool, classObj) {
        while (true) {
            //一直解析直到读取到的数据类型代码为-1才停止
            let prNum = br.readUInt16();
            if (prNum == 0) {
                break;
            }
            //获取数据类型代码通过枚举获得变量类代码和变量名
            let typeNameFull = prtEnum[prNum];
            let typeName = typeNameFull.split("$")[1];
            let type = typeEnum[prtEnum[prNum]];
            let isComp = false;
            if (prtEnum[prNum] == "gameObjectInfo$components") {
                isComp = true;
            }
            //解析数据
            this.readValue(br, type, (v) => {
                classObj[typeName] = v;
            }, isComp);
        }
        return classObj;
    }
    private static readFloat(data, pos) {
        let num = data.getFloat32(pos, true);
        return num;
    }
    public static readListV3(br: ArrayBuffer, listLen: number, pos: number, cb: Function) {
        let dyList = [];
        let data = new DataView(br, 0);
        let _pos = pos;
        for (let j = 0; j < listLen; j++) {
            let v3 = new m4m.math.vector3();
            v3.x = this.readFloat(data, _pos);
            _pos += 4;
            v3.y = this.readFloat(data, _pos);
            _pos += 4;
            v3.z = this.readFloat(data, _pos);
            _pos += 4;
            dyList.push(v3);
        }
        cb(dyList);
        // return dyList;
    }
    /**
     * 解析数据
     * @param br 
     * @param type 
     */
    public static aaaaaaa = 0;
    public static aaaaaaabbbbbbbbbb = 0;
    // tslint:disable-next-line: cyclomatic-complexity
    private static readValue(br: m4m.io.binTool, type: number, cb: Function, isComp: boolean = false) {
        let classObj: any;
        //这段二进制不需要处理直接保存为二进制序列
        if (type == PropertieType.listByte) {
            let bufferLen = br.readInt32();
            classObj = br.readBytes(bufferLen);
        } else if (type == PropertieType.listFloat) {
            let bufferLen = br.readInt32();
            let buffer = br["buffer"] as Uint8Array;
            br.r_offset = Math.ceil(br.r_offset / 4) * 4;
            let floatArray = new Float32Array(buffer.buffer, br.r_offset, bufferLen);
            br.r_offset += bufferLen * 4;
            classObj = floatArray;
        } else if (type > -1 && type < 100) {
            classObj = this.readTypes(br, type);
        } else if (type == PropertieType.listVector3) {
            let listLen = br.readInt32();
            let r_offset = br.r_offset;
            let listV3Buffer = br.readBytes(listLen * 12).buffer;
            this.readListV3(listV3Buffer, listLen, r_offset, cb);
            return;
        } else if (type > 99 && type < 200) {
            let listLen = br.readInt32();
            let dyList = [];
            for (let j = 0; j < listLen; j++) {
                dyList.push(this.readTypes(br, type - 100));
            }
            classObj = dyList;
        } else if (type > 199 && type < 300) {
            let listLen = br.readInt32();
            let dyList = [];
            for (let j = 0; j < listLen; j++) {
                dyList.push(this.readTypes(br, type - 200));
            }
            classObj = dyList;
        } else if (type > 299 && type < 400) {
            let listLen = br.readInt32();
            let keyType = br.readInt16();
            let valueType = br.readInt16();
            let py: cMap<any> = new cMap<any>();
            for (let j = 0; j < listLen; j++) {
                let key = this.readTypes(br, keyType);
                this.readValue(br, valueType, (v) => {

                    py.set(key, v);
                });
            }
            classObj = py;
        } else if (type == PropertieType.typeClass) {
            let classNameID = br.readUInt8();
            let className = nameEnum[classNameID];
            let pdy = new m4m[className]();
            classObj = this.readBytes(br, pdy);
        } else if (isComp) {
            let listLen = br.readInt32();
            let dyList = [];
            for (let k = 0; k < listLen; k++) {
                let classNameID = br.readUInt8();
                let className = nameEnum[classNameID];
                let pdy = new m4m[className]();
                pdy = this.readBytes(br, pdy);
                dyList.push(pdy);
            }
            classObj = dyList;
        } else if (type == PropertieType.listClass || type == PropertieType.arrayClass) {
            let listLen = br.readInt32();
            let dyList = [];
            let classNameID = br.readUInt8();
            let className = nameEnum[classNameID];

            for (let k = 0; k < listLen; k++) {
                let pdy = new m4m[className]();
                pdy = this.readBytes(br, pdy);
                dyList.push(pdy);
            }
            classObj = dyList;
        }
        cb(classObj);
        // return classObj;
    }
    public static TypeListCount: cMap<number> = new cMap<number>();
    //预设解析方法的基础数据类型
    // tslint:disable-next-line: cyclomatic-complexity
    private static readTypes(br: m4m.io.binTool, type: PropertieType) {
        let dy = null;
        // tslint:disable-next-line: switch-default
        switch (type) {
            case PropertieType.typeString:
                //读取字符串长度，如果等于255则再次读取长度，最后计算总长度，按照总长度反序列化为字符串
                let stringLen = br.readUInt8();
                let nowLen = stringLen;
                while (nowLen >= 255) {
                    nowLen = br.readUInt8();
                    stringLen += nowLen;
                }
                dy = br.readUTFByLen(stringLen);
                break;
            case PropertieType.typeByte:
                dy = br.readUInt8();
                break;
            case PropertieType.typeSByte:
                dy = br.readInt8();
                break;
            case PropertieType.typeInt16:
                dy = br.readInt16();
                break;
            case PropertieType.typeUInt16:
                dy = br.readUInt16();
                break;
            case PropertieType.typeInt32:
                dy = br.readInt32();
                break;
            case PropertieType.typeUInt32:
                dy = br.readUInt32();
                break;
            case PropertieType.typeInt64:
                dy = br.readLong();
                break;
            case PropertieType.typeUInt64:
                dy = br.readULong();
                break;
            case PropertieType.typeFloat:
                dy = br.readSingle();
                break;
            case PropertieType.typeLong:
                dy = br.readLong();
                break;
            case PropertieType.typeDouble:
                dy = br.readDouble();
                break;
            case PropertieType.typeBool:
                dy = br.readBoolean();
                break;
            case PropertieType.typeVector2:
                dy = m4m.poolv2();
                // let v2Byte = br.readByte();
                // dy.x = (v2Byte & 2) == 0 ? 0 : br.readSingle();
                // dy.y = (v2Byte & 1) == 0 ? 0 : br.readSingle();
                let v2x = br.readSingle();
                let v2y = br.readSingle();
                dy.x = v2x;
                dy.y = v2y;
                break;
            case PropertieType.typeVector3:
                dy = m4m.poolv3();
                // let v3Byte = br.readByte();
                // dy.x = (v3Byte & 4) == 0 ? 0 : br.readSingle();
                // dy.y = (v3Byte & 2) == 0 ? 0 : br.readSingle();
                // dy.z = (v3Byte & 1) == 0 ? 0 : br.readSingle();
                let v3x = br.readSingle();
                let v3y = br.readSingle();
                let v3z = br.readSingle();
                dy.x = v3x;
                dy.y = v3y;
                dy.z = v3z;
                break;
            case PropertieType.typeColor:
                dy = m4m.poolcolor();
                // let coByte = br.readByte();
                // dy.r = (coByte & 8) == 0 ? 0 : br.readSingle();
                // dy.g = (coByte & 4) == 0 ? 0 : br.readSingle();
                // dy.b = (coByte & 2) == 0 ? 0 : br.readSingle();
                // dy.a = (coByte & 1) == 0 ? 0 : br.readSingle();
                let cor = br.readSingle();
                let cog = br.readSingle();
                let cob = br.readSingle();
                let coa = br.readSingle();
                dy.r = cor;
                dy.g = cog;
                dy.b = cob;
                dy.a = coa;
                break;
            case PropertieType.typeVector4:
            case PropertieType.typeQuaternion:
                dy = m4m.poolquat();
                // let v4Byte = br.readByte();
                // dy.x = (v4Byte & 8) == 0 ? 0 : br.readSingle();
                // dy.y = (v4Byte & 4) == 0 ? 0 : br.readSingle();
                // dy.z = (v4Byte & 2) == 0 ? 0 : br.readSingle();
                // dy.w = (v4Byte & 1) == 0 ? 0 : br.readSingle();
                let qux = br.readSingle();
                let quy = br.readSingle();
                let quz = br.readSingle();
                let quw = br.readSingle();
                dy.x = qux;
                dy.y = quy;
                dy.z = quz;
                dy.w = quw;
                break;
            case PropertieType.typeNumber4:
                dy = new number4();
                // let n4Byte = br.readByte();
                // dy.v0 = (n4Byte & 8) == 0 ? 0 : br.readSingle();
                // dy.v1 = (n4Byte & 4) == 0 ? 0 : br.readSingle();
                // dy.v2 = (n4Byte & 2) == 0 ? 0 : br.readSingle();
                // dy.v3 = (n4Byte & 1) == 0 ? 0 : br.readSingle();
                let n40 = br.readSingle();
                let n41 = br.readSingle();
                let n42 = br.readSingle();
                let n43 = br.readSingle();
                dy.v0 = n40;
                dy.v1 = n41;
                dy.v2 = n42;
                dy.v3 = n43;
                break;
            case PropertieType.typePoseBoneMatrix:
                dy = new PoseBoneMatrix();
                dy.r = this.readTypes(br, PropertieType.typeQuaternion);
                dy.t = this.readTypes(br, PropertieType.typeVector3);
                break;
            case PropertieType.typeTPoseInfo:
                dy = new tPoseInfo();
                dy.name = this.readTypes(br, PropertieType.typeString);
                dy.tposeq = this.readTypes(br, PropertieType.typeQuaternion);
                dy.tposep = this.readTypes(br, PropertieType.typeVector3);
        }
        return dy;
    }
}
//暴露出 类，微信前端使用
if (m4m) {
    if (!m4m["test"]) {
        m4m["test"] = {};
    }
    m4m["test"].testReadTool = testReadTool;
}