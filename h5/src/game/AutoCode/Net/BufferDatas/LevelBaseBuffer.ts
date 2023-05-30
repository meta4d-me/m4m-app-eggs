import { NetData } from "../../../Net/NetData";


export class LevelBaseBuffer{

    public static get Instance(): LevelBaseBuffer {
        if (this._instance == null) {
            this._instance = new LevelBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: LevelBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["amount"]=br.readUInt32();
getData["stageName"]=NetData.readString(br);
getData["runwayLength"]=br.readUInt32();
len=br.readInt32();
let runwayWeightList = [];
for (let i = 0; i < len; i++){
runwayWeightList.push(br.readInt32());
}
getData["runwayWeight"]=runwayWeightList;getData["cubeSpMin"]=br.readSingle();
getData["cubeSpMax"]=br.readSingle();
getData["beyondRate"]=br.readSingle();
len=br.readInt32();
let bootsWghtList = [];
for (let i = 0; i < len; i++){
bootsWghtList.push(br.readInt32());
}
getData["bootsWght"]=bootsWghtList;getData["reviveCount"]=br.readByte();
getData["tableID"]=br.readULong();

          return getData;
    }
}