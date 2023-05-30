import { NetData } from "../../../Net/NetData";


export class FriendDataBuffer{

    public static get Instance(): FriendDataBuffer {
        if (this._instance == null) {
            this._instance = new FriendDataBuffer();
        }

        return this._instance;
    }
    private static _instance: FriendDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["playerId"]=NetData.readString(br);
getData["frinedName"]=NetData.readString(br);
getData["icon"]=NetData.readString(br);
getData["camp"]=br.readInt32();
getData["rank"]=br.readInt32();
getData["status"]=br.readByte();
getData["time"]=br.readULong();
getData["power"]=br.readInt32();
getData["creatTime"]=br.readULong();
getData["friendStatus"]=br.readByte();
getData["realTimeMessage"]=NetData.readString(br);
getData["historyMessage"]=NetData.readString(br);
getData["desc"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}