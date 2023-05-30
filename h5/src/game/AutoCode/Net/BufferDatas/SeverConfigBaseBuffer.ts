import { NetData } from "../../../Net/NetData";


export class SeverConfigBaseBuffer{

    public static get Instance(): SeverConfigBaseBuffer {
        if (this._instance == null) {
            this._instance = new SeverConfigBaseBuffer();
        }

        return this._instance;
    }
    private static _instance: SeverConfigBaseBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["depict"]=NetData.readString(br);
getData["ip"]=NetData.readString(br);
getData["gateWay"]=NetData.readString(br);
getData["serverID"]=NetData.readString(br);
getData["serverName"]=NetData.readString(br);
getData["serverState"]=br.readByte();
getData["newServer"]=br.readBoolean();
getData["MAC"]=NetData.readString(br);
getData["setupTime"]=br.readLong();
getData["status"]=br.readByte();
getData["playerSum"]=br.readUInt32();
getData["isGate"]=br.readBoolean();
getData["descIP"]=NetData.readString(br);
getData["mapSaveVer"]=br.readULong();
getData["mapShowLevel"]=br.readByte();
getData["mapSplit"]=br.readInt32();
getData["heatbeatLimit"]=br.readUInt32();
getData["battleTimes"]=br.readInt32();
getData["marchSpeed"]=br.readSingle();
getData["campaignMaxStamina"]=br.readInt32();
getData["PhysicalTime"]=br.readInt32();
getData["arrangeNum"]=br.readInt32();
getData["campaignStartId"]=br.readInt32();
getData["sweepModeChanged"]=NetData.readString(br);
getData["recomCampReward"]=NetData.readString(br);
getData["campJoin"]=br.readByte();
getData["siegeWaitTime"]=br.readInt32();
getData["siegeMaxTime"]=br.readInt32();
getData["strikeCost"]=NetData.readString(br);
getData["siegeMinCost"]=NetData.readString(br);
getData["siegeMaxCost"]=NetData.readString(br);
getData["callBack"]=NetData.readString(br);
getData["fastCallBack"]=NetData.readString(br);
getData["marchSpeedUp"]=NetData.readString(br);
getData["superMarchSpeedUp"]=NetData.readString(br);
getData["minerAttack"]=NetData.readString(br);
getData["sameCampMinerAttackLim"]=br.readInt32();
getData["avoidWarTime"]=br.readInt32();
getData["avoidWarEffect"]=NetData.readString(br);
getData["maxEquipVolume"]=br.readInt32();
getData["breakOutUnlock"]=NetData.readString(br);
getData["dailyEventUnlock"]=NetData.readString(br);
getData["unlockWildLevel"]=br.readInt32();
getData["IntelligenceUnlock"]=NetData.readString(br);
getData["equipAuutoLock"]=br.readByte();
getData["commonGrowthRecover"]=br.readInt32();
getData["commonGrowthMaxTime"]=br.readInt32();
getData["seniorGrowthCost"]=NetData.readString(br);
getData["battleJumpTime"]=br.readInt32();
getData["furiousRound"]=br.readInt32();
getData["furiousStrengthen"]=br.readSingle();
getData["furiousMaxStrengthen"]=br.readSingle();
getData["fortifiedAvoidWarTime"]=br.readInt32();
getData["applyGvernorTime"]=br.readInt32();
getData["fortifiedRetreatTime"]=br.readInt32();
getData["fortifiedAvailable"]=NetData.readString(br);
getData["resourceGetInterval"]=br.readInt32();
getData["resourceGetTime"]=br.readInt32();
getData["firstGuideReward"]=NetData.readString(br);
getData["plunderPrecent"]=br.readInt32();
getData["HamalplunderPrecent"]=br.readInt32();
getData["HamalLostPrecent"]=br.readInt32();
getData["campDevelopMaxTime"]=br.readInt32();
getData["changNameCost"]=NetData.readString(br);
getData["changNameExchange"]=NetData.readString(br);
getData["hornCost"]=NetData.readString(br);
getData["hornCostExchange"]=NetData.readString(br);
getData["chatCd"]=br.readInt32();
getData["Arrangement1UnlockDesc"]=NetData.readString(br);
getData["Arrangement2UnlockDesc"]=NetData.readString(br);
getData["mailShareCd"]=br.readInt32();
getData["mailSaveTime"]=br.readInt32();
getData["mailMaxKeep"]=br.readInt32();
getData["enchantingFreeRefreshInterval"]=br.readInt32();
getData["commonGrowthCost"]=NetData.readString(br);
getData["seniorEnchantingCost"]=NetData.readString(br);
getData["ultimateEnchantingCost"]=NetData.readString(br);
getData["enchantingFreeTimesLimit"]=br.readInt32();
getData["EnchantingBubble"]=br.readInt32();
getData["altarBubble"]=br.readInt32();
getData["activityIconAvailable"]=NetData.readString(br);
getData["welfareIconAvailable"]=NetData.readString(br);
getData["preferentialIconAvailable"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}