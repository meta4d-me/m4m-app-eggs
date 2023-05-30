import { NetData } from "../../../Net/NetData";
import { RoleBaseBuffer } from "./RoleBaseBuffer";
import { ItemDataBuffer } from "./ItemDataBuffer";


export class RoleDataBuffer{

    public static get Instance(): RoleDataBuffer {
        if (this._instance == null) {
            this._instance = new RoleDataBuffer();
        }

        return this._instance;
    }
    private static _instance: RoleDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["roleName"]=NetData.readString(br);
getData["server"]=NetData.readString(br);
getData["baseData"]=RoleBaseBuffer.Instance.readArrayBuffer(br);
getData["roleType"]=br.readByte();
getData["roleState"]=br.readByte();
len=br.readInt32();
let statusDic = {};
for (let i = 0; i < len; i++){
let statusDicKey=NetData.readString(br);
statusDic[statusDicKey]=br.readInt32();
}
getData["status"]=statusDic;getData["playerId"]=NetData.readString(br);
getData["lv"]=br.readInt32();
getData["exp"]=br.readInt32();
getData["rera"]=br.readInt32();
getData["quality"]=br.readInt32();
getData["currentGrowth"]=br.readInt32();
getData["breakThrough"]=br.readInt32();
getData["condition"]=br.readInt32();
len=br.readInt32();
let roleStatusDic = {};
for (let i = 0; i < len; i++){
let roleStatusDicKey=NetData.readString(br);
roleStatusDic[roleStatusDicKey]=NetData.readString(br);
}
getData["roleStatus"]=roleStatusDic;len=br.readInt32();
let currencyDic = {};
for (let i = 0; i < len; i++){
let currencyDicKey=NetData.readString(br);
currencyDic[currencyDicKey]=br.readInt32();
}
getData["currency"]=currencyDic;len=br.readInt32();
let equipDic = {};
for (let i = 0; i < len; i++){
let equipDicKey=NetData.readString(br);
equipDic[equipDicKey]=ItemDataBuffer.Instance.readArrayBuffer(br);
}
getData["equip"]=equipDic;getData["equipmMaxHold"]=br.readInt32();
len=br.readInt32();
let itemsDic = {};
for (let i = 0; i < len; i++){
let itemsDicKey=NetData.readString(br);
itemsDic[itemsDicKey]=ItemDataBuffer.Instance.readArrayBuffer(br);
}
getData["items"]=itemsDic;len=br.readInt32();
let mailItemDic = {};
for (let i = 0; i < len; i++){
let mailItemDicKey=NetData.readString(br);
mailItemDic[mailItemDicKey]=ItemDataBuffer.Instance.readArrayBuffer(br);
}
getData["mailItem"]=mailItemDic;len=br.readInt32();
let buildingDic = {};
for (let i = 0; i < len; i++){
let buildingDicKey=NetData.readString(br);
buildingDic[buildingDicKey]=ItemDataBuffer.Instance.readArrayBuffer(br);
}
getData["building"]=buildingDic;getData["tableID"]=br.readULong();

          return getData;
    }
}