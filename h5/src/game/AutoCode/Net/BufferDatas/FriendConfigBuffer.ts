import { NetData } from "../../../Net/NetData";


export class FriendConfigBuffer{

    public static get Instance(): FriendConfigBuffer {
        if (this._instance == null) {
            this._instance = new FriendConfigBuffer();
        }

        return this._instance;
    }
    private static _instance: FriendConfigBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["quantity"]=br.readByte();
getData["blacklistQuantity"]=br.readByte();
getData["suggestFriendLev"]=br.readByte();
getData["suggestFriendLog"]=br.readByte();
getData["friendRequestTime"]=br.readByte();
getData["desc"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}