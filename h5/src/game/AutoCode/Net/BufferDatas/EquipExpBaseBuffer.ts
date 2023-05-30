import { NetData } from "../../../Net/NetData";


export class EquipExpBaseBuffer{

    public static get Instance(): EquipExpBaseBuffer {
        if (this._instance == null) {
            this._instance = new EquipExpBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: EquipExpBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["lv"]=NetData.readString(br);
getData["expMax"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}