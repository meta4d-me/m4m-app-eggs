import { NetData } from "../../../Net/NetData";


export class RoleBaseBuffer{

    public static get Instance(): RoleBaseBuffer {
        if (this._instance == null) {
            this._instance = new RoleBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: RoleBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["roleName"]=NetData.readString(br);
getData["jobType"]=br.readByte();
getData["heroId"]=br.readByte();
getData["icon"]=NetData.readString(br);
getData["model"]=NetData.readString(br);
getData["soldier"]=NetData.readString(br);
getData["spine"]=NetData.readString(br);
getData["backround"]=NetData.readString(br);
getData["desc"]=NetData.readString(br);
getData["lv"]=br.readInt32();
getData["rera"]=br.readByte();
getData["originQuality"]=br.readByte();
len=br.readInt32();
let attributeMaxDic = {};
for (let i = 0; i < len; i++){
let attributeMaxDicKey=NetData.readString(br);
attributeMaxDic[attributeMaxDicKey]=br.readInt32();
}
getData["attributeMax"]=attributeMaxDic;getData["growthLim"]=br.readInt32();
getData["growthMax"]=br.readInt32();
getData["growthSend"]=br.readInt32();
getData["change"]=NetData.readString(br);
getData["breakThroughMin"]=br.readInt32();
getData["breakThroughMax"]=br.readInt32();
getData["breakThroughChange"]=NetData.readString(br);
getData["breakThroughCount"]=br.readInt32();
getData["Potential"]=br.readInt32();
getData["tableID"]=br.readULong();

          return getData;
    }
}