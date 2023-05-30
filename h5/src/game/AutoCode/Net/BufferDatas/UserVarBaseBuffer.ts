import { NetData } from "../../../Net/NetData";
import { RoleDataBuffer } from "./RoleDataBuffer";
import { ArrangementDataBuffer } from "./ArrangementDataBuffer";


export class UserVarBaseBuffer{

    public static get Instance(): UserVarBaseBuffer {
        if (this._instance == null) {
            this._instance = new UserVarBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: UserVarBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["inGameStatus"]=br.readByte();
len=br.readInt32();
let currencyDic = {};
for (let i = 0; i < len; i++){
let currencyDicKey=NetData.readString(br);
currencyDic[currencyDicKey]=br.readInt32();
}
getData["currency"]=currencyDic;getData["littleManIcon"]=br.readBoolean();
getData["PlayerAccount"]=RoleDataBuffer.Instance.readArrayBuffer(br);
len=br.readInt32();
let listOfFiguresDic = {};
for (let i = 0; i < len; i++){
let listOfFiguresDicKey=NetData.readString(br);
listOfFiguresDic[listOfFiguresDicKey]=RoleDataBuffer.Instance.readArrayBuffer(br);
}
getData["listOfFigures"]=listOfFiguresDic;getData["Arrangement"]=ArrangementDataBuffer.Instance.readArrayBuffer(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}