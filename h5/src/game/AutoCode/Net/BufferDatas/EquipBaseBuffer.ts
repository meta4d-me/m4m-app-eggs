import { NetData } from "../../../Net/NetData";


export class EquipBaseBuffer{

    public static get Instance(): EquipBaseBuffer {
        if (this._instance == null) {
            this._instance = new EquipBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: EquipBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["equipName"]=NetData.readString(br);
getData["visibl"]=NetData.readString(br);
getData["unlock"]=NetData.readString(br);
getData["buildTime"]=NetData.readString(br);
getData["PortfolioCost"]=NetData.readString(br);
getData["maxEffect"]=br.readByte();
getData["tableID"]=br.readULong();

          return getData;
    }
}