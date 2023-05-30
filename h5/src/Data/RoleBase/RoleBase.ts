//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class RoleBase extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<RoleBase>;

	/**id*/
	public id:string;
	/**角色名*/
	public roleName:string;
	/**职业类型 1.战士 2.法师 3.游侠*/
	public jobType:number;
	/**英雄id*/
	public heroId:number;
	/**图标*/
	public icon:string;
	/**模型*/
	public model:string;
	/**士兵模型*/
	public soldier:string;
	/**动态立绘*/
	public spine:string;
	/**立绘背景*/
	public backround:string;
	/**描述*/
	public desc:string;
	/**等级上限*/
	public lv:number;
	/**稀有度 1.r 2.sr 3.ssr*/
	public rera:number;
	/**品质 1.绿 2.蓝 3.紫 4.橙 5.红*/
	public originQuality:number;
	/**属性值 1.atk 攻击 2.def 防御 3.com 统率 4.cbatk 城战攻击 5.cbdef 城战防御 6.fire 火元素攻击 7 ice 冰元素攻击 8.lighting 雷元素攻击 9. firedef 火元素抵抗 10.icedef 冰元素抵抗 11.lightdef 雷元素抵抗*/
	public attributeMax:{ [id: string]:number};
	/**属性值 1.atk 攻击 2.def 防御 3.com 统率 4.cbatk 城战攻击 5.cbdef 城战防御 6.fire 火元素攻击 7 ice 冰元素攻击 8.lighting 雷元素攻击 9. firedef 火元素抵抗 10.icedef 冰元素抵抗 11.lightdef 雷元素抵抗Json*/
	public attributeMaxJson: string;
	/**初始成长值*/
	public growthLim:number;
	/**成长值上限*/
	public growthMax:number;
	/**突破后赠送成长点*/
	public growthSend:number;
	/**重复获得转化（填道具表id）*/
	public change:string;
	/**突破保险值*/
	public breakThroughMin:number;
	/**突破最大值*/
	public breakThroughMax:number;
	/**突破后id*/
	public breakThroughChange:string;
	/**突破次数*/
	public breakThroughCount:number;
	/**潜力值*/
	public Potential:number;


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

var baseData:RoleBase = new RoleBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.roleName=br.readUTFBytes();
	
	baseData.jobType=br.readByte();
	
	baseData.heroId=br.readByte();
	
	baseData.icon=br.readUTFBytes();
	
	baseData.model=br.readUTFBytes();
	
	baseData.soldier=br.readUTFBytes();
	
	baseData.spine=br.readUTFBytes();
	
	baseData.backround=br.readUTFBytes();
	
	baseData.desc=br.readUTFBytes();
	
	baseData.lv=br.readInt32();
	
	baseData.rera=br.readByte();
	
	baseData.originQuality=br.readByte();
	
	baseData.attributeMaxJson=br.readUTFBytes();
	
	baseData.growthLim=br.readInt32();
	
	baseData.growthMax=br.readInt32();
	
	baseData.growthSend=br.readInt32();
	
	baseData.change=br.readUTFBytes();
	
	baseData.breakThroughMin=br.readInt32();
	
	baseData.breakThroughMax=br.readInt32();
	
	baseData.breakThroughChange=br.readUTFBytes();
	
	baseData.breakThroughCount=br.readInt32();
	
	baseData.Potential=br.readInt32();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:RoleBase):RoleBase{
var clone :RoleBase = new RoleBase();
	clone.id=old.id;
	
	clone.roleName=old.roleName;
	
	clone.jobType=old.jobType;
	
	clone.heroId=old.heroId;
	
	clone.icon=old.icon;
	
	clone.model=old.model;
	
	clone.soldier=old.soldier;
	
	clone.spine=old.spine;
	
	clone.backround=old.backround;
	
	clone.desc=old.desc;
	
	clone.lv=old.lv;
	
	clone.rera=old.rera;
	
	clone.originQuality=old.originQuality;
	
	clone.attributeMax=old.attributeMax;
	
	clone.growthLim=old.growthLim;
	
	clone.growthMax=old.growthMax;
	
	clone.growthSend=old.growthSend;
	
	clone.change=old.change;
	
	clone.breakThroughMin=old.breakThroughMin;
	
	clone.breakThroughMax=old.breakThroughMax;
	
	clone.breakThroughChange=old.breakThroughChange;
	
	clone.breakThroughCount=old.breakThroughCount;
	
	clone.Potential=old.Potential;
	
return clone;
}

public   clone(old:RoleBase){
	this.id=old.id;
	
	this.roleName=old.roleName;
	
	this.jobType=old.jobType;
	
	this.heroId=old.heroId;
	
	this.icon=old.icon;
	
	this.model=old.model;
	
	this.soldier=old.soldier;
	
	this.spine=old.spine;
	
	this.backround=old.backround;
	
	this.desc=old.desc;
	
	this.lv=old.lv;
	
	this.rera=old.rera;
	
	this.originQuality=old.originQuality;
	
	this.attributeMax=old.attributeMax;
	
	this.growthLim=old.growthLim;
	
	this.growthMax=old.growthMax;
	
	this.growthSend=old.growthSend;
	
	this.change=old.change;
	
	this.breakThroughMin=old.breakThroughMin;
	
	this.breakThroughMax=old.breakThroughMax;
	
	this.breakThroughChange=old.breakThroughChange;
	
	this.breakThroughCount=old.breakThroughCount;
	
	this.Potential=old.Potential;
	
}
	private static params = ["id","roleName","jobType","heroId","icon","model","soldier","spine","backround","desc","lv","rera","originQuality","attributeMax","growthLim","growthMax","growthSend","change","breakThroughMin","breakThroughMax","breakThroughChange","breakThroughCount","Potential",];
	public static add(a: RoleBase, b: RoleBase, start: number = 0, end: number, limit: RoleBase) {
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

	public static sub(a: RoleBase, b: RoleBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: RoleBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: RoleBase, b: RoleBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: RoleBase, b: RoleBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: RoleBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: RoleBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(RoleBase);