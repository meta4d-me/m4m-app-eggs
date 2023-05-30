import { NetData } from "../../../Net/NetData";


export class ArrangementDataBuffer{

    public static get Instance(): ArrangementDataBuffer {
        if (this._instance == null) {
            this._instance = new ArrangementDataBuffer();
        }

        return this._instance;
    }
    private static _instance: ArrangementDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["token"]=NetData.readString(br);
len=br.readInt32();
let ArrangementDic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let ArrangementList = [];
let ArrangementDicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
ArrangementList.push(NetData.readString(br));
}
ArrangementDic[ArrangementDicKey]=ArrangementList;
}
getData["Arrangement"]=ArrangementDic;len=br.readInt32();
let LimitList = [];
for (let i = 0; i < len; i++){
LimitList.push(br.readInt32());
}
getData["Limit"]=LimitList;getData["tableID"]=br.readULong();

          return getData;
    }
}