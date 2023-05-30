import { NetData } from "../../../Net/NetData";


export class UploadIpfsDataBuffer{

    public static get Instance(): UploadIpfsDataBuffer {
        if (this._instance == null) {
            this._instance = new UploadIpfsDataBuffer();
        }

        return this._instance;
    }
    private static _instance: UploadIpfsDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["ImageName"]=NetData.readString(br);
getData["ImageUrl"]=NetData.readString(br);
getData["IpfsImagehash"]=NetData.readString(br);
getData["modelUrl"]=NetData.readString(br);
getData["Ipfsmodelhash"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}