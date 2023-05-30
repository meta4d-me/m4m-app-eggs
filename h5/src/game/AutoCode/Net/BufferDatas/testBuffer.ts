import { NetData } from "../../../Net/NetData";
import { ItemBaseBuffer } from "./ItemBaseBuffer";


export class testBuffer{

    public static get Instance(): testBuffer {
        if (this._instance == null) {
            this._instance = new testBuffer();
        }

        return this._instance;
    }
    private static _instance: testBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["itemName"]=NetData.readString(br);
getData["test1"]=ItemBaseBuffer.Instance.readArrayBuffer(br);
len=br.readInt32();
let test2List = [];
for (let i = 0; i < len; i++){
test2List.push(ItemBaseBuffer.Instance.readArrayBuffer(br));
}
getData["test2"]=test2List;len=br.readInt32();
let test3Dic = {};
for (let i = 0; i < len; i++){
let test3DicKey=NetData.readString(br);
test3Dic[test3DicKey]=NetData.readString(br);
}
getData["test3"]=test3Dic;len=br.readInt32();
let test4Dic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let test4List = [];
let test4DicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
test4List.push(NetData.readString(br));
}
test4Dic[test4DicKey]=test4List;
}
getData["test4"]=test4Dic;len=br.readInt32();
let test5Dic = {};
for (let i = 0; i < len; i++){
let test5DicKey=NetData.readString(br);
test5Dic[test5DicKey]=ItemBaseBuffer.Instance.readArrayBuffer(br);
}
getData["test5"]=test5Dic;len=br.readInt32();
let test6Dic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let test6List = [];
let test6DicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
test6List.push(ItemBaseBuffer.Instance.readArrayBuffer(br));
}
test6Dic[test6DicKey]=test6List;
}
getData["test6"]=test6Dic;getData["tableID"]=br.readULong();

          return getData;
    }
}