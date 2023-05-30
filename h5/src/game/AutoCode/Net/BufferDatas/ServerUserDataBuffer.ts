import { NetData } from "../../../Net/NetData";


export class ServerUserDataBuffer{

    public static get Instance(): ServerUserDataBuffer {
        if (this._instance == null) {
            this._instance = new ServerUserDataBuffer();
        }

        return this._instance;
    }
    private static _instance: ServerUserDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["playerIDCount"]=br.readInt32();
len=br.readInt32();
let userCampCountDic = {};
for (let i = 0; i < len; i++){
let userCampCountDicKey=NetData.readString(br);
userCampCountDic[userCampCountDicKey]=br.readInt32();
}
getData["userCampCount"]=userCampCountDic;getData["tableID"]=br.readULong();

          return getData;
    }
}