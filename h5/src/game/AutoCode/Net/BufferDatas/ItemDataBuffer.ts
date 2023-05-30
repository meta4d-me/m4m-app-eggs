import { NetData } from "../../../Net/NetData";
import { ItemBaseBuffer } from "./ItemBaseBuffer";


export class ItemDataBuffer{

    public static get Instance(): ItemDataBuffer {
        if (this._instance == null) {
            this._instance = new ItemDataBuffer();
        }

        return this._instance;
    }
    private static _instance: ItemDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["itemName"]=NetData.readString(br);
getData["baseId"]=NetData.readString(br);
getData["baseData"]=ItemBaseBuffer.Instance.readArrayBuffer(br);
getData["count"]=br.readUInt32();
getData["maxNum"]=br.readUInt32();
getData["fromWhere"]=NetData.readString(br);
len=br.readInt32();
let buyCurrencyDic = {};
for (let i = 0; i < len; i++){
let buyCurrencyDicKey=NetData.readString(br);
buyCurrencyDic[buyCurrencyDicKey]=br.readInt32();
}
getData["buyCurrency"]=buyCurrencyDic;len=br.readInt32();
let statusDic = {};
for (let i = 0; i < len; i++){
let statusDicKey=NetData.readString(br);
statusDic[statusDicKey]=br.readInt32();
}
getData["status"]=statusDic;getData["lv"]=br.readInt32();
getData["rera"]=br.readInt32();
getData["quality"]=br.readInt32();
getData["playerUuid"]=NetData.readString(br);
getData["getTime"]=br.readULong();
getData["statustype"]=br.readByte();
getData["ifUseLimit"]=br.readBoolean();
getData["forceTime"]=br.readULong();
getData["tableID"]=br.readULong();

          return getData;
    }
}