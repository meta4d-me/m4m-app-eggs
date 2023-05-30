import { NetData } from "../../../Net/NetData";
import { GameArchiveDataBuffer } from "./GameArchiveDataBuffer";


export class UserDataBaseBuffer{

    public static get Instance(): UserDataBaseBuffer {
        if (this._instance == null) {
            this._instance = new UserDataBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: UserDataBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["playerName"]=NetData.readString(br);
getData["token"]=NetData.readString(br);
getData["status"]=br.readByte();
len=br.readInt32();
let currencyDic = {};
for (let i = 0; i < len; i++){
let currencyDicKey=NetData.readString(br);
currencyDic[currencyDicKey]=br.readInt32();
}
getData["currency"]=currencyDic;getData["isBlock"]=br.readBoolean();
getData["isLogUser"]=br.readBoolean();
getData["loginTime"]=br.readULong();
getData["thirdPartyAccount"]=br.readByte();
getData["serverChannel"]=br.readByte();
getData["accountAccess"]=br.readByte();
getData["blacklist"]=NetData.readString(br);
getData["frinedName"]=NetData.readString(br);
getData["icon"]=NetData.readString(br);
len=br.readInt32();
let GameArchiveDic = {};
for (let i = 0; i < len; i++){
let GameArchiveDicKey=NetData.readString(br);
GameArchiveDic[GameArchiveDicKey]=GameArchiveDataBuffer.Instance.readArrayBuffer(br);
}
getData["GameArchive"]=GameArchiveDic;getData["tableID"]=br.readULong();

          return getData;
    }
}