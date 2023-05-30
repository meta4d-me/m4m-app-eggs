//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class SeverConfigBase extends ExcelDataBase{
	public static versition:number = 0;

	/** 
	* 从服务器同步数据到本地
	* @param fields 指定需要同步的字段 例如["name","desc"]
	*/
	public sync:(fields?:string[]) => Promise<void>;

	/** 
	* 保存数据到服务器
	* @param fields 指定需要保存的字段 例如["name","desc"]
	*/
	public save:(fields?:string[]) => Promise<void>;

	/** 
	* 获取数据数量
	*/
	public static getlistCount:() => Promise<number>;

	/** 
	* 获取列表数据
	* @param offset 从什么位置获取 默认值:0
	* @param count 指定需要保存的字段 例如["name","desc"]
	*/
	public static getlist:(offset?:number, count?:number) => Promise<SeverConfigBase>;

	/**配置ID*/
	public id:string;
	/**备注*/
	public depict:string;
	/**ip*/
	public ip:string;
	/**网关地址*/
	public gateWay:string;
	/**区服ID*/
	public serverID:string;
	/**区服名称*/
	public serverName:string;
	/**区服状态: 1.爆满 2.维护 3.流畅*/
	public serverState:number;
	/**新区*/
	public newServer:boolean;
	/**MAC地址*/
	public MAC:string;
	/**启动时间*/
	public setupTime:string;
	/**状态*/
	public status:number;
	/**当前人数*/
	public playerSum:number;
	/**是否为网关*/
	public isGate:boolean;
	/**备注IP*/
	public descIP:string;
	/**地图更新序号*/
	public mapSaveVer:number;
	/**小地图显示玩家等级下限*/
	public mapShowLevel:number;
	/**地图分割尺寸*/
	public mapSplit:number;
	/**心跳断开限制*/
	public heatbeatLimit:number;
	/**每日最大野外战斗次数*/
	public battleTimes:number;
	/**行军速度*/
	public marchSpeed:number;
	/**战役推图玩家基础最大体力*/
	public campaignMaxStamina:number;
	/**每日购买体力基础次数*/
	public PhysicalTime:number;
	/**上阵基础数量*/
	public arrangeNum:number;
	/**战役起始关卡*/
	public campaignStartId:number;
	/**扫荡模式变更*/
	public sweepModeChanged:string;
	/**推荐阵营奖励*/
	public recomCampReward:string;
	/**阵营加入等级*/
	public campJoin:number;
	/**围攻等待时间*/
	public siegeWaitTime:number;
	/**围攻提高消耗时间*/
	public siegeMaxTime:number;
	/**突袭消耗*/
	public strikeCost:string;
	/**围攻低消耗*/
	public siegeMinCost:string;
	/**围攻高消耗*/
	public siegeMaxCost:string;
	/**召回功能消耗道具与数量*/
	public callBack:string;
	/**快速召回消耗道具与数量*/
	public fastCallBack:string;
	/**行军加速消耗道具与数量*/
	public marchSpeedUp:string;
	/**超级行军加速消耗道具与数量*/
	public superMarchSpeedUp:string;
	/**炸矿消耗*/
	public minerAttack:string;
	/**同阵营炸矿每日次数*/
	public sameCampMinerAttackLim:number;
	/**领地失守后免战时间（秒）*/
	public avoidWarTime:number;
	/**免战特效*/
	public avoidWarEffect:string;
	/**装备库最终解锁容量上限*/
	public maxEquipVolume:number;
	/**突破解锁条件*/
	public breakOutUnlock:string;
	/**日常任务解锁条件*/
	public dailyEventUnlock:string;
	/**解锁野外需要的玩家等级*/
	public unlockWildLevel:number;
	/**军情功能解锁条件*/
	public IntelligenceUnlock:string;
	/**装备自动锁定品质*/
	public equipAuutoLock:number;
	/**普通成长恢复时间（秒）*/
	public commonGrowthRecover:number;
	/**普通成长恢复最大上限*/
	public commonGrowthMaxTime:number;
	/**没有使用*/
	public seniorGrowthCost:string;
	/**跳过战斗时间（秒）*/
	public battleJumpTime:number;
	/**狂暴开始回合*/
	public furiousRound:number;
	/**狂暴强化倍率*/
	public furiousStrengthen:number;
	/**狂暴强化上限*/
	public furiousMaxStrengthen:number;
	/**据点免战时间（秒）*/
	public fortifiedAvoidWarTime:number;
	/**申请总督时长（秒）*/
	public applyGvernorTime:number;
	/**据点总督撤离时间（秒）*/
	public fortifiedRetreatTime:number;
	/**玩家进攻据点限制*/
	public fortifiedAvailable:string;
	/**资源田收取间隔（间隔多少秒可以收取一次资源）*/
	public resourceGetInterval:number;
	/**资源田计算时间（每隔多少秒获取一次addrescue）*/
	public resourceGetTime:number;
	/**初次引导气泡获取奖励*/
	public firstGuideReward:string;
	/**掠夺资源数量%*/
	public plunderPrecent:number;
	/**工人掠夺的数量%*/
	public HamalplunderPrecent:number;
	/**工人损失数量%*/
	public HamalLostPrecent:number;
	/**阵营建设每日最大次数*/
	public campDevelopMaxTime:number;
	/**改名卡消耗*/
	public changNameCost:string;
	/**改名卡消耗不足替换*/
	public changNameExchange:string;
	/**喇叭消耗*/
	public hornCost:string;
	/**喇叭消耗不足替换*/
	public hornCostExchange:string;
	/**聊天间隔cd*/
	public chatCd:number;
	/**解锁队列1介绍*/
	public Arrangement1UnlockDesc:string;
	/**解锁队列2介绍*/
	public Arrangement2UnlockDesc:string;
	/**邮件分享CD*/
	public mailShareCd:number;
	/**邮件默认保存时间*/
	public mailSaveTime:number;
	/**邮件最大持有数量*/
	public mailMaxKeep:number;
	/**免费附魔恢复间隔时间*/
	public enchantingFreeRefreshInterval:number;
	/**普通附魔消耗*/
	public commonGrowthCost:string;
	/**高级附魔每次消耗*/
	public seniorEnchantingCost:string;
	/**终极附魔消耗*/
	public ultimateEnchantingCost:string;
	/**免费附魔最大次数*/
	public enchantingFreeTimesLimit:number;
	/**附魔气泡出现免费次数*/
	public EnchantingBubble:number;
	/**祭坛出现条件，（消耗n倍时出现）*/
	public altarBubble:number;
	/**活动按钮出现条件*/
	public activityIconAvailable:string;
	/**福利按钮出现条件*/
	public welfareIconAvailable:string;
	/**特惠按钮出现条件*/
	public preferentialIconAvailable:string;


static get list(){ if(!this._list ){this._list = new cMap()}; return this._list;};
static set list(v){ this._list=v;};		
public static  parseData(br):void {
 var length:number = br.readInt32();

for (var i = 0; i < length; i++)
{var b:string = br.readUTFBytes();
var bb:string = br.readUTFBytes();
	
}	
var row:number = br.readInt32();
var length2:number = br.readInt32();
 for (var i = 0; i < row; i++)
{ 

var baseData:SeverConfigBase = new SeverConfigBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.depict=br.readUTFBytes();
	
	baseData.ip=br.readUTFBytes();
	
	baseData.gateWay=br.readUTFBytes();
	
	baseData.serverID=br.readUTFBytes();
	
	baseData.serverName=br.readUTFBytes();
	
	baseData.serverState=br.readByte();
	
	baseData.newServer=br.readBoolean();
	
	baseData.MAC=br.readUTFBytes();
	
	baseData.setupTime=br.readDouble();
	
	baseData.status=br.readByte();
	
	baseData.playerSum=br.readUInt32();
	
	baseData.isGate=br.readBoolean();
	
	baseData.descIP=br.readUTFBytes();
	
	baseData.mapSaveVer=br.readULong();
	
	baseData.mapShowLevel=br.readByte();
	
	baseData.mapSplit=br.readInt32();
	
	baseData.heatbeatLimit=br.readUInt32();
	
	baseData.battleTimes=br.readInt32();
	
	baseData.marchSpeed=br.readFloat();
	
	baseData.campaignMaxStamina=br.readInt32();
	
	baseData.PhysicalTime=br.readInt32();
	
	baseData.arrangeNum=br.readInt32();
	
	baseData.campaignStartId=br.readInt32();
	
	baseData.sweepModeChanged=br.readUTFBytes();
	
	baseData.recomCampReward=br.readUTFBytes();
	
	baseData.campJoin=br.readByte();
	
	baseData.siegeWaitTime=br.readInt32();
	
	baseData.siegeMaxTime=br.readInt32();
	
	baseData.strikeCost=br.readUTFBytes();
	
	baseData.siegeMinCost=br.readUTFBytes();
	
	baseData.siegeMaxCost=br.readUTFBytes();
	
	baseData.callBack=br.readUTFBytes();
	
	baseData.fastCallBack=br.readUTFBytes();
	
	baseData.marchSpeedUp=br.readUTFBytes();
	
	baseData.superMarchSpeedUp=br.readUTFBytes();
	
	baseData.minerAttack=br.readUTFBytes();
	
	baseData.sameCampMinerAttackLim=br.readInt32();
	
	baseData.avoidWarTime=br.readInt32();
	
	baseData.avoidWarEffect=br.readUTFBytes();
	
	baseData.maxEquipVolume=br.readInt32();
	
	baseData.breakOutUnlock=br.readUTFBytes();
	
	baseData.dailyEventUnlock=br.readUTFBytes();
	
	baseData.unlockWildLevel=br.readInt32();
	
	baseData.IntelligenceUnlock=br.readUTFBytes();
	
	baseData.equipAuutoLock=br.readByte();
	
	baseData.commonGrowthRecover=br.readInt32();
	
	baseData.commonGrowthMaxTime=br.readInt32();
	
	baseData.seniorGrowthCost=br.readUTFBytes();
	
	baseData.battleJumpTime=br.readInt32();
	
	baseData.furiousRound=br.readInt32();
	
	baseData.furiousStrengthen=br.readFloat();
	
	baseData.furiousMaxStrengthen=br.readFloat();
	
	baseData.fortifiedAvoidWarTime=br.readInt32();
	
	baseData.applyGvernorTime=br.readInt32();
	
	baseData.fortifiedRetreatTime=br.readInt32();
	
	baseData.fortifiedAvailable=br.readUTFBytes();
	
	baseData.resourceGetInterval=br.readInt32();
	
	baseData.resourceGetTime=br.readInt32();
	
	baseData.firstGuideReward=br.readUTFBytes();
	
	baseData.plunderPrecent=br.readInt32();
	
	baseData.HamalplunderPrecent=br.readInt32();
	
	baseData.HamalLostPrecent=br.readInt32();
	
	baseData.campDevelopMaxTime=br.readInt32();
	
	baseData.changNameCost=br.readUTFBytes();
	
	baseData.changNameExchange=br.readUTFBytes();
	
	baseData.hornCost=br.readUTFBytes();
	
	baseData.hornCostExchange=br.readUTFBytes();
	
	baseData.chatCd=br.readInt32();
	
	baseData.Arrangement1UnlockDesc=br.readUTFBytes();
	
	baseData.Arrangement2UnlockDesc=br.readUTFBytes();
	
	baseData.mailShareCd=br.readInt32();
	
	baseData.mailSaveTime=br.readInt32();
	
	baseData.mailMaxKeep=br.readInt32();
	
	baseData.enchantingFreeRefreshInterval=br.readInt32();
	
	baseData.commonGrowthCost=br.readUTFBytes();
	
	baseData.seniorEnchantingCost=br.readUTFBytes();
	
	baseData.ultimateEnchantingCost=br.readUTFBytes();
	
	baseData.enchantingFreeTimesLimit=br.readInt32();
	
	baseData.EnchantingBubble=br.readInt32();
	
	baseData.altarBubble=br.readInt32();
	
	baseData.activityIconAvailable=br.readUTFBytes();
	
	baseData.welfareIconAvailable=br.readUTFBytes();
	
	baseData.preferentialIconAvailable=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:SeverConfigBase):SeverConfigBase{
var clone :SeverConfigBase = new SeverConfigBase();
	clone.id=old.id;
	
	clone.depict=old.depict;
	
	clone.ip=old.ip;
	
	clone.gateWay=old.gateWay;
	
	clone.serverID=old.serverID;
	
	clone.serverName=old.serverName;
	
	clone.serverState=old.serverState;
	
	clone.newServer=old.newServer;
	
	clone.MAC=old.MAC;
	
	clone.setupTime=old.setupTime;
	
	clone.status=old.status;
	
	clone.playerSum=old.playerSum;
	
	clone.isGate=old.isGate;
	
	clone.descIP=old.descIP;
	
	clone.mapSaveVer=old.mapSaveVer;
	
	clone.mapShowLevel=old.mapShowLevel;
	
	clone.mapSplit=old.mapSplit;
	
	clone.heatbeatLimit=old.heatbeatLimit;
	
	clone.battleTimes=old.battleTimes;
	
	clone.marchSpeed=old.marchSpeed;
	
	clone.campaignMaxStamina=old.campaignMaxStamina;
	
	clone.PhysicalTime=old.PhysicalTime;
	
	clone.arrangeNum=old.arrangeNum;
	
	clone.campaignStartId=old.campaignStartId;
	
	clone.sweepModeChanged=old.sweepModeChanged;
	
	clone.recomCampReward=old.recomCampReward;
	
	clone.campJoin=old.campJoin;
	
	clone.siegeWaitTime=old.siegeWaitTime;
	
	clone.siegeMaxTime=old.siegeMaxTime;
	
	clone.strikeCost=old.strikeCost;
	
	clone.siegeMinCost=old.siegeMinCost;
	
	clone.siegeMaxCost=old.siegeMaxCost;
	
	clone.callBack=old.callBack;
	
	clone.fastCallBack=old.fastCallBack;
	
	clone.marchSpeedUp=old.marchSpeedUp;
	
	clone.superMarchSpeedUp=old.superMarchSpeedUp;
	
	clone.minerAttack=old.minerAttack;
	
	clone.sameCampMinerAttackLim=old.sameCampMinerAttackLim;
	
	clone.avoidWarTime=old.avoidWarTime;
	
	clone.avoidWarEffect=old.avoidWarEffect;
	
	clone.maxEquipVolume=old.maxEquipVolume;
	
	clone.breakOutUnlock=old.breakOutUnlock;
	
	clone.dailyEventUnlock=old.dailyEventUnlock;
	
	clone.unlockWildLevel=old.unlockWildLevel;
	
	clone.IntelligenceUnlock=old.IntelligenceUnlock;
	
	clone.equipAuutoLock=old.equipAuutoLock;
	
	clone.commonGrowthRecover=old.commonGrowthRecover;
	
	clone.commonGrowthMaxTime=old.commonGrowthMaxTime;
	
	clone.seniorGrowthCost=old.seniorGrowthCost;
	
	clone.battleJumpTime=old.battleJumpTime;
	
	clone.furiousRound=old.furiousRound;
	
	clone.furiousStrengthen=old.furiousStrengthen;
	
	clone.furiousMaxStrengthen=old.furiousMaxStrengthen;
	
	clone.fortifiedAvoidWarTime=old.fortifiedAvoidWarTime;
	
	clone.applyGvernorTime=old.applyGvernorTime;
	
	clone.fortifiedRetreatTime=old.fortifiedRetreatTime;
	
	clone.fortifiedAvailable=old.fortifiedAvailable;
	
	clone.resourceGetInterval=old.resourceGetInterval;
	
	clone.resourceGetTime=old.resourceGetTime;
	
	clone.firstGuideReward=old.firstGuideReward;
	
	clone.plunderPrecent=old.plunderPrecent;
	
	clone.HamalplunderPrecent=old.HamalplunderPrecent;
	
	clone.HamalLostPrecent=old.HamalLostPrecent;
	
	clone.campDevelopMaxTime=old.campDevelopMaxTime;
	
	clone.changNameCost=old.changNameCost;
	
	clone.changNameExchange=old.changNameExchange;
	
	clone.hornCost=old.hornCost;
	
	clone.hornCostExchange=old.hornCostExchange;
	
	clone.chatCd=old.chatCd;
	
	clone.Arrangement1UnlockDesc=old.Arrangement1UnlockDesc;
	
	clone.Arrangement2UnlockDesc=old.Arrangement2UnlockDesc;
	
	clone.mailShareCd=old.mailShareCd;
	
	clone.mailSaveTime=old.mailSaveTime;
	
	clone.mailMaxKeep=old.mailMaxKeep;
	
	clone.enchantingFreeRefreshInterval=old.enchantingFreeRefreshInterval;
	
	clone.commonGrowthCost=old.commonGrowthCost;
	
	clone.seniorEnchantingCost=old.seniorEnchantingCost;
	
	clone.ultimateEnchantingCost=old.ultimateEnchantingCost;
	
	clone.enchantingFreeTimesLimit=old.enchantingFreeTimesLimit;
	
	clone.EnchantingBubble=old.EnchantingBubble;
	
	clone.altarBubble=old.altarBubble;
	
	clone.activityIconAvailable=old.activityIconAvailable;
	
	clone.welfareIconAvailable=old.welfareIconAvailable;
	
	clone.preferentialIconAvailable=old.preferentialIconAvailable;
	
return clone;
}

public   clone(old:SeverConfigBase){
	this.id=old.id;
	
	this.depict=old.depict;
	
	this.ip=old.ip;
	
	this.gateWay=old.gateWay;
	
	this.serverID=old.serverID;
	
	this.serverName=old.serverName;
	
	this.serverState=old.serverState;
	
	this.newServer=old.newServer;
	
	this.MAC=old.MAC;
	
	this.setupTime=old.setupTime;
	
	this.status=old.status;
	
	this.playerSum=old.playerSum;
	
	this.isGate=old.isGate;
	
	this.descIP=old.descIP;
	
	this.mapSaveVer=old.mapSaveVer;
	
	this.mapShowLevel=old.mapShowLevel;
	
	this.mapSplit=old.mapSplit;
	
	this.heatbeatLimit=old.heatbeatLimit;
	
	this.battleTimes=old.battleTimes;
	
	this.marchSpeed=old.marchSpeed;
	
	this.campaignMaxStamina=old.campaignMaxStamina;
	
	this.PhysicalTime=old.PhysicalTime;
	
	this.arrangeNum=old.arrangeNum;
	
	this.campaignStartId=old.campaignStartId;
	
	this.sweepModeChanged=old.sweepModeChanged;
	
	this.recomCampReward=old.recomCampReward;
	
	this.campJoin=old.campJoin;
	
	this.siegeWaitTime=old.siegeWaitTime;
	
	this.siegeMaxTime=old.siegeMaxTime;
	
	this.strikeCost=old.strikeCost;
	
	this.siegeMinCost=old.siegeMinCost;
	
	this.siegeMaxCost=old.siegeMaxCost;
	
	this.callBack=old.callBack;
	
	this.fastCallBack=old.fastCallBack;
	
	this.marchSpeedUp=old.marchSpeedUp;
	
	this.superMarchSpeedUp=old.superMarchSpeedUp;
	
	this.minerAttack=old.minerAttack;
	
	this.sameCampMinerAttackLim=old.sameCampMinerAttackLim;
	
	this.avoidWarTime=old.avoidWarTime;
	
	this.avoidWarEffect=old.avoidWarEffect;
	
	this.maxEquipVolume=old.maxEquipVolume;
	
	this.breakOutUnlock=old.breakOutUnlock;
	
	this.dailyEventUnlock=old.dailyEventUnlock;
	
	this.unlockWildLevel=old.unlockWildLevel;
	
	this.IntelligenceUnlock=old.IntelligenceUnlock;
	
	this.equipAuutoLock=old.equipAuutoLock;
	
	this.commonGrowthRecover=old.commonGrowthRecover;
	
	this.commonGrowthMaxTime=old.commonGrowthMaxTime;
	
	this.seniorGrowthCost=old.seniorGrowthCost;
	
	this.battleJumpTime=old.battleJumpTime;
	
	this.furiousRound=old.furiousRound;
	
	this.furiousStrengthen=old.furiousStrengthen;
	
	this.furiousMaxStrengthen=old.furiousMaxStrengthen;
	
	this.fortifiedAvoidWarTime=old.fortifiedAvoidWarTime;
	
	this.applyGvernorTime=old.applyGvernorTime;
	
	this.fortifiedRetreatTime=old.fortifiedRetreatTime;
	
	this.fortifiedAvailable=old.fortifiedAvailable;
	
	this.resourceGetInterval=old.resourceGetInterval;
	
	this.resourceGetTime=old.resourceGetTime;
	
	this.firstGuideReward=old.firstGuideReward;
	
	this.plunderPrecent=old.plunderPrecent;
	
	this.HamalplunderPrecent=old.HamalplunderPrecent;
	
	this.HamalLostPrecent=old.HamalLostPrecent;
	
	this.campDevelopMaxTime=old.campDevelopMaxTime;
	
	this.changNameCost=old.changNameCost;
	
	this.changNameExchange=old.changNameExchange;
	
	this.hornCost=old.hornCost;
	
	this.hornCostExchange=old.hornCostExchange;
	
	this.chatCd=old.chatCd;
	
	this.Arrangement1UnlockDesc=old.Arrangement1UnlockDesc;
	
	this.Arrangement2UnlockDesc=old.Arrangement2UnlockDesc;
	
	this.mailShareCd=old.mailShareCd;
	
	this.mailSaveTime=old.mailSaveTime;
	
	this.mailMaxKeep=old.mailMaxKeep;
	
	this.enchantingFreeRefreshInterval=old.enchantingFreeRefreshInterval;
	
	this.commonGrowthCost=old.commonGrowthCost;
	
	this.seniorEnchantingCost=old.seniorEnchantingCost;
	
	this.ultimateEnchantingCost=old.ultimateEnchantingCost;
	
	this.enchantingFreeTimesLimit=old.enchantingFreeTimesLimit;
	
	this.EnchantingBubble=old.EnchantingBubble;
	
	this.altarBubble=old.altarBubble;
	
	this.activityIconAvailable=old.activityIconAvailable;
	
	this.welfareIconAvailable=old.welfareIconAvailable;
	
	this.preferentialIconAvailable=old.preferentialIconAvailable;
	
}
	private static params = ["id","depict","ip","gateWay","serverID","serverName","serverState","newServer","MAC","setupTime","status","playerSum","isGate","descIP","mapSaveVer","mapShowLevel","mapSplit","heatbeatLimit","battleTimes","marchSpeed","campaignMaxStamina","PhysicalTime","arrangeNum","campaignStartId","sweepModeChanged","recomCampReward","campJoin","siegeWaitTime","siegeMaxTime","strikeCost","siegeMinCost","siegeMaxCost","callBack","fastCallBack","marchSpeedUp","superMarchSpeedUp","minerAttack","sameCampMinerAttackLim","avoidWarTime","avoidWarEffect","maxEquipVolume","breakOutUnlock","dailyEventUnlock","unlockWildLevel","IntelligenceUnlock","equipAuutoLock","commonGrowthRecover","commonGrowthMaxTime","seniorGrowthCost","battleJumpTime","furiousRound","furiousStrengthen","furiousMaxStrengthen","fortifiedAvoidWarTime","applyGvernorTime","fortifiedRetreatTime","fortifiedAvailable","resourceGetInterval","resourceGetTime","firstGuideReward","plunderPrecent","HamalplunderPrecent","HamalLostPrecent","campDevelopMaxTime","changNameCost","changNameExchange","hornCost","hornCostExchange","chatCd","Arrangement1UnlockDesc","Arrangement2UnlockDesc","mailShareCd","mailSaveTime","mailMaxKeep","enchantingFreeRefreshInterval","commonGrowthCost","seniorEnchantingCost","ultimateEnchantingCost","enchantingFreeTimesLimit","EnchantingBubble","altarBubble","activityIconAvailable","welfareIconAvailable","preferentialIconAvailable",];
	public static add(a: SeverConfigBase, b: SeverConfigBase, start: number = 0, end: number, limit: SeverConfigBase) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] += b[par];
			if(limit && result[par] > limit[par])
				result[par] = limit[par];
		}
		return result;
	}

	public static sub(a: SeverConfigBase, b: SeverConfigBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: SeverConfigBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: SeverConfigBase, b: SeverConfigBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: SeverConfigBase, b: SeverConfigBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: SeverConfigBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: SeverConfigBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(SeverConfigBase);