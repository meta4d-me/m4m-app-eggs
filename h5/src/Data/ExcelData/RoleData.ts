//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
import { RoleBase } from "./RoleBase";
import { ItemData } from "./ItemData";
declare let gd3d;
export class RoleData extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<RoleData>;

	/**id*/
	public id:string;
	/**角色名*/
	public roleName:string;
	/**所属服务器*/
	public server:string;
	/**角色配置*/
	public baseData:any;
	/**角色配置Json*/
	public baseDataJson:string;
	/**角色类型*/
	public roleType:number;
	/**角色状态（0空闲 1 外出）*/
	public roleState:number;
	/**上次行动时间*/
	public lastTime:number;
	/**属性值1.atk 攻击 2.def 防御 3.com 统率 4.cbatk 城战攻击 5.cbdef 城战防御 6.fire 火元素攻击 7 ice 冰元素攻击 8.lighting 雷元素攻击 9. firedef 火元素抵抗 10.icedef 冰元素抵抗 11.lightdef 雷元素抵抗*/
	public status:{ [id: string]:number};
	/**属性值1.atk 攻击 2.def 防御 3.com 统率 4.cbatk 城战攻击 5.cbdef 城战防御 6.fire 火元素攻击 7 ice 冰元素攻击 8.lighting 雷元素攻击 9. firedef 火元素抵抗 10.icedef 冰元素抵抗 11.lightdef 雷元素抵抗Json*/
	public statusJson: string;
	/**玩家id*/
	public playerId:string;
	/**当前等级*/
	public lv:number;
	/**当前经验*/
	public exp:number;
	/**当前稀有度*/
	public rera:number;
	/**当前品质*/
	public quality:number;
	/**当前成长值*/
	public currentGrowth:number;
	/**当前突破值*/
	public breakThrough:number;
	/**当前状态*/
	public condition:number;
	/**人物属性*/
	public roleStatus:{ [id: string]:string};
	/**人物属性Json*/
	public roleStatusJson: string;
	/**持有货币*/
	public currency:{ [id: string]:number};
	/**持有货币Json*/
	public currencyJson: string;
	/**装备*/
	public equip:{ [id: string]:any};
	/**装备Json*/
	public equipJson:string;
	/**当前装备库上限*/
	public equipmMaxHold:number;
	/**持有道具*/
	public items:{ [id: string]:any};
	/**持有道具Json*/
	public itemsJson:string;
	/**邮箱道具*/
	public mailItem:{ [id: string]:any};
	/**邮箱道具Json*/
	public mailItemJson:string;
	/**持有建筑*/
	public building:{ [id: string]:any};
	/**持有建筑Json*/
	public buildingJson:string;


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

var baseData:RoleData = new RoleData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.roleName=br.readUTFBytes();
	
	baseData.server=br.readUTFBytes();
	
	baseData.baseDataJson=br.readUTFBytes();
	
	baseData.roleType=br.readByte();
	
	baseData.roleState=br.readByte();
	
	baseData.lastTime=br.readLong();
	
	baseData.statusJson=br.readUTFBytes();
	
	baseData.playerId=br.readUTFBytes();
	
	baseData.lv=br.readInt32();
	
	baseData.exp=br.readInt32();
	
	baseData.rera=br.readInt32();
	
	baseData.quality=br.readInt32();
	
	baseData.currentGrowth=br.readInt32();
	
	baseData.breakThrough=br.readInt32();
	
	baseData.condition=br.readInt32();
	
	baseData.roleStatusJson=br.readUTFBytes();
	
	baseData.currencyJson=br.readUTFBytes();
	
	baseData.equipJson=br.readUTFBytes();
	
	baseData.equipmMaxHold=br.readInt32();
	
	baseData.itemsJson=br.readUTFBytes();
	
	baseData.mailItemJson=br.readUTFBytes();
	
	baseData.buildingJson=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:RoleData):RoleData{
var clone :RoleData = new RoleData();
	clone.id=old.id;
	
	clone.roleName=old.roleName;
	
	clone.server=old.server;
	
	clone.baseData=old.baseData;
	
	clone.roleType=old.roleType;
	
	clone.roleState=old.roleState;
	
	clone.lastTime=old.lastTime;
	
	clone.status=old.status;
	
	clone.playerId=old.playerId;
	
	clone.lv=old.lv;
	
	clone.exp=old.exp;
	
	clone.rera=old.rera;
	
	clone.quality=old.quality;
	
	clone.currentGrowth=old.currentGrowth;
	
	clone.breakThrough=old.breakThrough;
	
	clone.condition=old.condition;
	
	clone.roleStatus=old.roleStatus;
	
	clone.currency=old.currency;
	
	clone.equip=old.equip;
	
	clone.equipmMaxHold=old.equipmMaxHold;
	
	clone.items=old.items;
	
	clone.mailItem=old.mailItem;
	
	clone.building=old.building;
	
return clone;
}

public   clone(old:RoleData){
	this.id=old.id;
	
	this.roleName=old.roleName;
	
	this.server=old.server;
	
	this.baseData=old.baseData;
	
	this.roleType=old.roleType;
	
	this.roleState=old.roleState;
	
	this.lastTime=old.lastTime;
	
	this.status=old.status;
	
	this.playerId=old.playerId;
	
	this.lv=old.lv;
	
	this.exp=old.exp;
	
	this.rera=old.rera;
	
	this.quality=old.quality;
	
	this.currentGrowth=old.currentGrowth;
	
	this.breakThrough=old.breakThrough;
	
	this.condition=old.condition;
	
	this.roleStatus=old.roleStatus;
	
	this.currency=old.currency;
	
	this.equip=old.equip;
	
	this.equipmMaxHold=old.equipmMaxHold;
	
	this.items=old.items;
	
	this.mailItem=old.mailItem;
	
	this.building=old.building;
	
}
	private static params = ["id","roleName","server","baseData","roleType","roleState","lastTime","status","playerId","lv","exp","rera","quality","currentGrowth","breakThrough","condition","roleStatus","currency","equip","equipmMaxHold","items","mailItem","building",];
	public static add(a: RoleData, b: RoleData, start: number = 0, end: number, limit: RoleData) {
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

	public static sub(a: RoleData, b: RoleData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: RoleData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: RoleData, b: RoleData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: RoleData, b: RoleData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: RoleData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: RoleData, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(RoleData);