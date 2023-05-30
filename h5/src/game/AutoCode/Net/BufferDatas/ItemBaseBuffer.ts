import { NetData } from "../../../Net/NetData";


export class ItemBaseBuffer{

    public static get Instance(): ItemBaseBuffer {
        if (this._instance == null) {
            this._instance = new ItemBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: ItemBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["itemName"]=NetData.readString(br);
getData["desc"]=NetData.readString(br);
getData["icon"]=NetData.readString(br);
getData["model"]=NetData.readString(br);
getData["effect"]=NetData.readString(br);
getData["tagType"]=br.readInt32();
getData["itemType"]=br.readInt32();
getData["quality"]=br.readInt32();
getData["maxNum"]=br.readInt32();
getData["useType"]=br.readInt32();
len=br.readInt32();
let useLimitList = [];
for (let i = 0; i < len; i++){
useLimitList.push(NetData.readString(br));
}
getData["useLimit"]=useLimitList;len=br.readInt32();
let useEffectList = [];
for (let i = 0; i < len; i++){
useEffectList.push(NetData.readString(br));
}
getData["useEffect"]=useEffectList;len=br.readInt32();
let jumpList = [];
for (let i = 0; i < len; i++){
jumpList.push(NetData.readString(br));
}
getData["jump"]=jumpList;len=br.readInt32();
let useList = [];
for (let i = 0; i < len; i++){
useList.push(NetData.readString(br));
}
getData["use"]=useList;getData["equipType"]=br.readInt32();
len=br.readInt32();
let statusDic = {};
for (let i = 0; i < len; i++){
let statusDicKey=NetData.readString(br);
statusDic[statusDicKey]=br.readInt32();
}
getData["status"]=statusDic;len=br.readInt32();
let statusUpDic = {};
for (let i = 0; i < len; i++){
let statusUpDicKey=NetData.readString(br);
statusUpDic[statusUpDicKey]=br.readInt32();
}
getData["statusUp"]=statusUpDic;getData["lv"]=br.readUInt32();
getData["rera"]=br.readInt32();
len=br.readInt32();
let saleDic = {};
for (let i = 0; i < len; i++){
let saleDicKey=NetData.readString(br);
saleDic[saleDicKey]=br.readInt32();
}
getData["sale"]=saleDic;len=br.readInt32();
let buyDic = {};
for (let i = 0; i < len; i++){
let buyDicKey=NetData.readString(br);
buyDic[buyDicKey]=br.readInt32();
}
getData["buy"]=buyDic;getData["imUse"]=br.readBoolean();
getData["tableID"]=br.readULong();

          return getData;
    }
}