import { NetData } from "../../../Net/NetData";


export class WalletErrLogBuffer{

    public static get Instance(): WalletErrLogBuffer {
        if (this._instance == null) {
            this._instance = new WalletErrLogBuffer();
        }

        return this._instance;
    }
    private static _instance: WalletErrLogBuffer;
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