//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class MainBase extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<MainBase>;

	/**ID*/
	public id:string;
	/**角色速度*/
	public roleBspeed:number;
	/**角色加速度*/
	public roleStepSpeed:number;
	/**色彩速度*/
	public colorSpeed:number;
	/**分配器速度*/
	public DistorSpeed:number;
	/**距离传感器量程*/
	public DistorVrange:number;
	/**距离传感器范围*/
	public DistorHrange:number;
	/**间隙*/
	public obsBaseGap:number;
	/**升压发电机速度*/
	public BoostGenSpeed:number;
	/**单立方根速率*/
	public singleCubeGenRate:number;
	/**场景颜色间隙*/
	public sceneColorHGap:number;
	/**第一种颜色H*/
	public firstColorH:number;
	/**第一种颜色S*/
	public firstColorS:number;
	/**第一种颜色V*/
	public firstColorV:number;
	/**速度相加距离*/
	public speedAddDistance:number;
	/**速度增加率*/
	public speedAddRate:number;
	/**玩家最大速度*/
	public playerMaxSpeed:number;
	/**添加最大步长*/
	public addMaxStepNum:number;
	/**步长时间长度*/
	public stepTimeLength:number;
	/**方块速度*/
	public DiamonGenSpeed:number;
	/**机器人速度*/
	public robotBSpeed:number;
	/**机器人超越限制*/
	public robotReSurpassLimit:number;
	/**看广告*/
	public watchVideo:number;
	/**需要刷新广告横幅*/
	public needRefreshADBanner:boolean;


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

var baseData:MainBase = new MainBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.roleBspeed=br.readUInt32();
	
	baseData.roleStepSpeed=br.readUInt32();
	
	baseData.colorSpeed=br.readFloat();
	
	baseData.DistorSpeed=br.readFloat();
	
	baseData.DistorVrange=br.readUInt32();
	
	baseData.DistorHrange=br.readUInt32();
	
	baseData.obsBaseGap=br.readUInt32();
	
	baseData.BoostGenSpeed=br.readUInt32();
	
	baseData.singleCubeGenRate=br.readFloat();
	
	baseData.sceneColorHGap=br.readUInt32();
	
	baseData.firstColorH=br.readUInt32();
	
	baseData.firstColorS=br.readUInt32();
	
	baseData.firstColorV=br.readUInt32();
	
	baseData.speedAddDistance=br.readUInt32();
	
	baseData.speedAddRate=br.readUInt32();
	
	baseData.playerMaxSpeed=br.readUInt32();
	
	baseData.addMaxStepNum=br.readUInt32();
	
	baseData.stepTimeLength=br.readFloat();
	
	baseData.DiamonGenSpeed=br.readUInt32();
	
	baseData.robotBSpeed=br.readUInt32();
	
	baseData.robotReSurpassLimit=br.readUInt32();
	
	baseData.watchVideo=br.readUInt32();
	
	baseData.needRefreshADBanner=br.readBoolean();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:MainBase):MainBase{
var clone :MainBase = new MainBase();
	clone.id=old.id;
	
	clone.roleBspeed=old.roleBspeed;
	
	clone.roleStepSpeed=old.roleStepSpeed;
	
	clone.colorSpeed=old.colorSpeed;
	
	clone.DistorSpeed=old.DistorSpeed;
	
	clone.DistorVrange=old.DistorVrange;
	
	clone.DistorHrange=old.DistorHrange;
	
	clone.obsBaseGap=old.obsBaseGap;
	
	clone.BoostGenSpeed=old.BoostGenSpeed;
	
	clone.singleCubeGenRate=old.singleCubeGenRate;
	
	clone.sceneColorHGap=old.sceneColorHGap;
	
	clone.firstColorH=old.firstColorH;
	
	clone.firstColorS=old.firstColorS;
	
	clone.firstColorV=old.firstColorV;
	
	clone.speedAddDistance=old.speedAddDistance;
	
	clone.speedAddRate=old.speedAddRate;
	
	clone.playerMaxSpeed=old.playerMaxSpeed;
	
	clone.addMaxStepNum=old.addMaxStepNum;
	
	clone.stepTimeLength=old.stepTimeLength;
	
	clone.DiamonGenSpeed=old.DiamonGenSpeed;
	
	clone.robotBSpeed=old.robotBSpeed;
	
	clone.robotReSurpassLimit=old.robotReSurpassLimit;
	
	clone.watchVideo=old.watchVideo;
	
	clone.needRefreshADBanner=old.needRefreshADBanner;
	
return clone;
}

public   clone(old:MainBase){
	this.id=old.id;
	
	this.roleBspeed=old.roleBspeed;
	
	this.roleStepSpeed=old.roleStepSpeed;
	
	this.colorSpeed=old.colorSpeed;
	
	this.DistorSpeed=old.DistorSpeed;
	
	this.DistorVrange=old.DistorVrange;
	
	this.DistorHrange=old.DistorHrange;
	
	this.obsBaseGap=old.obsBaseGap;
	
	this.BoostGenSpeed=old.BoostGenSpeed;
	
	this.singleCubeGenRate=old.singleCubeGenRate;
	
	this.sceneColorHGap=old.sceneColorHGap;
	
	this.firstColorH=old.firstColorH;
	
	this.firstColorS=old.firstColorS;
	
	this.firstColorV=old.firstColorV;
	
	this.speedAddDistance=old.speedAddDistance;
	
	this.speedAddRate=old.speedAddRate;
	
	this.playerMaxSpeed=old.playerMaxSpeed;
	
	this.addMaxStepNum=old.addMaxStepNum;
	
	this.stepTimeLength=old.stepTimeLength;
	
	this.DiamonGenSpeed=old.DiamonGenSpeed;
	
	this.robotBSpeed=old.robotBSpeed;
	
	this.robotReSurpassLimit=old.robotReSurpassLimit;
	
	this.watchVideo=old.watchVideo;
	
	this.needRefreshADBanner=old.needRefreshADBanner;
	
}
	private static params = ["id","roleBspeed","roleStepSpeed","colorSpeed","DistorSpeed","DistorVrange","DistorHrange","obsBaseGap","BoostGenSpeed","singleCubeGenRate","sceneColorHGap","firstColorH","firstColorS","firstColorV","speedAddDistance","speedAddRate","playerMaxSpeed","addMaxStepNum","stepTimeLength","DiamonGenSpeed","robotBSpeed","robotReSurpassLimit","watchVideo","needRefreshADBanner",];
	public static add(a: MainBase, b: MainBase, start: number = 0, end: number, limit: MainBase) {
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

	public static sub(a: MainBase, b: MainBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: MainBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: MainBase, b: MainBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: MainBase, b: MainBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: MainBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: MainBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(MainBase);