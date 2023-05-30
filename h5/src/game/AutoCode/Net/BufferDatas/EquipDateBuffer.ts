import { NetData } from "../../../Net/NetData";
import { EquipBaseBuffer } from "./EquipBaseBuffer";


export class EquipDateBuffer{

    public static get Instance(): EquipDateBuffer {
        if (this._instance == null) {
            this._instance = new EquipDateBuffer();
        }

        return this._instance;
    }
    private static _instance: EquipDateBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
len=br.readInt32();
let equipDataList = [];
for (let i = 0; i < len; i++){
equipDataList.push(EquipBaseBuffer.Instance.readArrayBuffer(br));
}
getData["equipData"]=equipDataList;getData["equipStartTime"]=br.readULong();
getData["equipEndTime"]=br.readULong();
getData["tableID"]=br.readULong();

          return getData;
    }
}