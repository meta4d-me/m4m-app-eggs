import { NetData } from "../../../Net/NetData";


export class TipInfoBuffer{

    public static get Instance(): TipInfoBuffer {
        if (this._instance == null) {
            this._instance = new TipInfoBuffer();
        }

        return this._instance;
    }
    private static _instance: TipInfoBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["title"]=NetData.readString(br);
getData["tipType"]=br.readInt32();
getData["context"]=NetData.readString(br);

          return getData;
    }
}