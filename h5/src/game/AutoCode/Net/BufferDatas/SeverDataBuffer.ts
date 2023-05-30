import { NetData } from "../../../Net/NetData";


export class SeverDataBuffer{

    public static get Instance(): SeverDataBuffer {
        if (this._instance == null) {
            this._instance = new SeverDataBuffer();
        }

        return this._instance;
    }
    private static _instance: SeverDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["serverState"]=br.readByte();
getData["newServer"]=br.readBoolean();
getData["setupTime"]=br.readLong();
getData["status"]=br.readByte();
getData["playerSum"]=br.readUInt32();
getData["mapSaveVer"]=br.readULong();
getData["openTime"]=br.readLong();
getData["addTime"]=br.readLong();
getData["tableID"]=br.readULong();

          return getData;
    }
}