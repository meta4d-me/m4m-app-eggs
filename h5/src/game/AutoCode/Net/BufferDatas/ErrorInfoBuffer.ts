import { NetData } from "../../../Net/NetData";


export class ErrorInfoBuffer{

    public static get Instance(): ErrorInfoBuffer {
        if (this._instance == null) {
            this._instance = new ErrorInfoBuffer();
        }

        return this._instance;
    }
    private static _instance: ErrorInfoBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["message"]=NetData.readString(br);
getData["errorType"]=NetData.readString(br);
getData["time"]=NetData.readString(br);
getData["modelType"]=NetData.readString(br);
getData["ip"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}