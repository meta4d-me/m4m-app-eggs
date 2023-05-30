import { NetData } from "../../../Net/NetData";


export class RoleExpBaseBuffer{

    public static get Instance(): RoleExpBaseBuffer {
        if (this._instance == null) {
            this._instance = new RoleExpBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: RoleExpBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["lv"]=NetData.readString(br);
getData["expmax"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}