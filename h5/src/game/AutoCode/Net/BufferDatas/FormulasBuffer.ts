import { NetData } from "../../../Net/NetData";


export class FormulasBuffer{

    public static get Instance(): FormulasBuffer {
        if (this._instance == null) {
            this._instance = new FormulasBuffer();
        }

        return this._instance;
    }
    private static _instance: FormulasBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["depict"]=NetData.readString(br);
getData["formulas"]=NetData.readString(br);
getData["randomRange"]=br.readSingle();
getData["tableID"]=br.readULong();

          return getData;
    }
}