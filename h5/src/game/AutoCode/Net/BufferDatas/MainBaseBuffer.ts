import { NetData } from "../../../Net/NetData";


export class MainBaseBuffer{

    public static get Instance(): MainBaseBuffer {
        if (this._instance == null) {
            this._instance = new MainBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: MainBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["roleBspeed"]=br.readUInt32();
getData["roleStepSpeed"]=br.readUInt32();
getData["colorSpeed"]=br.readSingle();
getData["DistorSpeed"]=br.readSingle();
getData["DistorVrange"]=br.readUInt32();
getData["DistorHrange"]=br.readUInt32();
getData["obsBaseGap"]=br.readUInt32();
getData["BoostGenSpeed"]=br.readUInt32();
getData["singleCubeGenRate"]=br.readSingle();
getData["sceneColorHGap"]=br.readUInt32();
getData["firstColorH"]=br.readUInt32();
getData["firstColorS"]=br.readUInt32();
getData["firstColorV"]=br.readUInt32();
getData["speedAddDistance"]=br.readUInt32();
getData["speedAddRate"]=br.readUInt32();
getData["playerMaxSpeed"]=br.readUInt32();
getData["addMaxStepNum"]=br.readUInt32();
getData["stepTimeLength"]=br.readSingle();
getData["DiamonGenSpeed"]=br.readUInt32();
getData["robotBSpeed"]=br.readUInt32();
getData["robotReSurpassLimit"]=br.readUInt32();
getData["watchVideo"]=br.readUInt32();
getData["needRefreshADBanner"]=br.readBoolean();
getData["tableID"]=br.readULong();

          return getData;
    }
}