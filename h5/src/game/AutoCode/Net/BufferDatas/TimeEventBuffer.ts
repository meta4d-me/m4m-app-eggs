import { NetData } from "../../../Net/NetData";


export class TimeEventBuffer{

    public static get Instance(): TimeEventBuffer {
        if (this._instance == null) {
            this._instance = new TimeEventBuffer();
        }

        return this._instance;
    }
    private static _instance: TimeEventBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["eventName"]=NetData.readString(br);
getData["taskstartTime"]=br.readULong();
getData["taskEndTime"]=br.readULong();
getData["lastStartTime"]=br.readULong();
getData["lastEndTime"]=br.readULong();
getData["serverTimeZone"]=br.readInt32();
getData["LoopCount"]=br.readInt32();
getData["LoopTimers"]=br.readInt32();
getData["isFristNoCD"]=br.readBoolean();
getData["taskLoopTime"]=br.readULong();
getData["timeType"]=br.readByte();
getData["startTime"]=br.readULong();
getData["startLimitTime"]=br.readULong();
getData["predecessorTaskID"]=NetData.readString(br);
getData["taskEventString"]=NetData.readString(br);
getData["taskEventLog"]=NetData.readString(br);
getData["taskState"]=br.readInt32();
getData["taskPreviousState"]=br.readInt32();
getData["tableID"]=br.readULong();

          return getData;
    }
}