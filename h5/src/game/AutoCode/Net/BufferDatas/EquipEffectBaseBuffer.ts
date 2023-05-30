import { NetData } from "../../../Net/NetData";


export class EquipEffectBaseBuffer{

    public static get Instance(): EquipEffectBaseBuffer {
        if (this._instance == null) {
            this._instance = new EquipEffectBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: EquipEffectBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["equipEffectName"]=NetData.readString(br);
getData["equipEffectdesc"]=NetData.readString(br);
getData["equipEffecticon"]=NetData.readString(br);
getData["equipEffectType"]=br.readByte();
len=br.readInt32();
let statusDic = {};
for (let i = 0; i < len; i++){
let statusDicKey=NetData.readString(br);
statusDic[statusDicKey]=br.readInt32();
}
getData["status"]=statusDic;getData["equipEffect"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}