import { NetData } from "../../../Net/NetData";


export class ThemeBaseBuffer{

    public static get Instance(): ThemeBaseBuffer {
        if (this._instance == null) {
            this._instance = new ThemeBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: ThemeBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["sceneName"]=NetData.readString(br);
getData["image1"]=NetData.readString(br);
getData["image2"]=NetData.readString(br);
getData["cubeImage"]=NetData.readString(br);
len=br.readInt32();
let deblockingDic = {};
for (let i = 0; i < len; i++){
let deblockingDicKey=NetData.readString(br);
deblockingDic[deblockingDicKey]=br.readInt32();
}
getData["deblocking"]=deblockingDic;getData["color"]=NetData.readString(br);
len=br.readInt32();
let hRangeList = [];
for (let i = 0; i < len; i++){
hRangeList.push(br.readInt32());
}
getData["hRange"]=hRangeList;getData["sFactor"]=br.readInt32();
getData["vFactor"]=br.readInt32();
getData["icon"]=NetData.readString(br);
getData["isDynamicColor"]=br.readBoolean();
getData["tableID"]=br.readULong();

          return getData;
    }
}