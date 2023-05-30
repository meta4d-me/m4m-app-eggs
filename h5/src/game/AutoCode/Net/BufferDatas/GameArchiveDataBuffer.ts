import { NetData } from "../../../Net/NetData";
import { SkinBaseBuffer } from "./SkinBaseBuffer";
import { LevelBaseBuffer } from "./LevelBaseBuffer";


export class GameArchiveDataBuffer{

    public static get Instance(): GameArchiveDataBuffer {
        if (this._instance == null) {
            this._instance = new GameArchiveDataBuffer();
        }

        return this._instance;
    }
    private static _instance: GameArchiveDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["baseData"]=SkinBaseBuffer.Instance.readArrayBuffer(br);
getData["Currentlevel"]=LevelBaseBuffer.Instance.readArrayBuffer(br);
getData["ism4mnft"]=br.readBoolean();
getData["playerToken"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}