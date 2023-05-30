import { NetData } from "../../../Net/NetData";


export class SkinBaseBuffer{

    public static get Instance(): SkinBaseBuffer {
        if (this._instance == null) {
            this._instance = new SkinBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: SkinBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["skinName"]=NetData.readString(br);
getData["headPortrait"]=NetData.readString(br);
getData["skinSticker"]=NetData.readString(br);
len=br.readInt32();
let deblockingDic = {};
for (let i = 0; i < len; i++){
let deblockingDicKey=NetData.readString(br);
deblockingDic[deblockingDicKey]=br.readInt32();
}
getData["deblocking"]=deblockingDic;getData["color"]=NetData.readString(br);
getData["renderType"]=br.readByte();
getData["tableID"]=br.readULong();

          return getData;
    }
}