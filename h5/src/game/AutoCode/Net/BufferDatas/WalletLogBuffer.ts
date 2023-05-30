import { NetData } from "../../../Net/NetData";


export class WalletLogBuffer{

    public static get Instance(): WalletLogBuffer {
        if (this._instance == null) {
            this._instance = new WalletLogBuffer();
        }

        return this._instance;
    }
    private static _instance: WalletLogBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["className"]=NetData.readString(br);
getData["methodName"]=NetData.readString(br);
getData["userToken"]=NetData.readString(br);
getData["logMessage"]=NetData.readString(br);
getData["resultTime"]=br.readLong();
getData["tableID"]=br.readULong();

          return getData;
    }
}