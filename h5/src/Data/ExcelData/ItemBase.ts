//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class ItemBase extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<ItemBase>;

	/**配置ID*/
	public id:string;
	/**道具名字*/
	public itemName:string;
	/**描述*/
	public desc:string;
	/**图标*/
	public icon:string;
	/**模型*/
	public model:string;
	/**特效*/
	public effect:string;
	/**页签类型*/
	public tagType:number;
	/**道具类型 1.基础货币 2.消耗品 3.宝箱 4.碎片 5.其他物品 6.装备*/
	public itemType:number;
	/**品质*/
	public quality:number;
	/**叠加数量限制*/
	public maxNum:number;
	/**使用类型 1.直接单个使用 2.批量使用*/
	public useType:number;
	/**使用限制*/
	public useLimit:string[];
	/**效果脚本*/
	public useEffect:string[];
	/**跳转*/
	public jump:string[];
	/**去使用（引导）*/
	public use:string[];
	/**装备类型 1：头盔 2：盔甲*/
	public equipType:number;
	/**属性*/
	public status:{ [id: string]:number};
	/**属性Json*/
	public statusJson: string;
	/**升级提升属性*/
	public statusUp:{ [id: string]:number};
	/**升级提升属性Json*/
	public statusUpJson: string;
	/**lv上限*/
	public lv:number;
	/**稀有度*/
	public rera:number;
	/**出售价格*/
	public sale:{ [id: string]:number};
	/**出售价格Json*/
	public saleJson: string;
	/**购买价格*/
	public buy:{ [id: string]:number};
	/**购买价格Json*/
	public buyJson: string;
	/**分解获得消耗物品数量[道具id，数量区间最小值:数量区间最大值]*/
	public decompose:string;
	/**是否立即使用*/
	public imUse:boolean;


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

var baseData:ItemBase = new ItemBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.itemName=br.readUTFBytes();
	
	baseData.desc=br.readUTFBytes();
	
	baseData.icon=br.readUTFBytes();
	
	baseData.model=br.readUTFBytes();
	
	baseData.effect=br.readUTFBytes();
	
	baseData.tagType=br.readInt32();
	
	baseData.itemType=br.readInt32();
	
	baseData.quality=br.readInt32();
	
	baseData.maxNum=br.readInt32();
	
	baseData.useType=br.readInt32();
	
	baseData.useLimit = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})();
	
	baseData.useEffect = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})();
	
	baseData.jump = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})();
	
	baseData.use = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})();
	
	baseData.equipType=br.readInt32();
	
	baseData.statusJson=br.readUTFBytes();
	
	baseData.statusUpJson=br.readUTFBytes();
	
	baseData.lv=br.readUInt32();
	
	baseData.rera=br.readInt32();
	
	baseData.saleJson=br.readUTFBytes();
	
	baseData.buyJson=br.readUTFBytes();
	
	baseData.decompose=br.readUTFBytes();
	
	baseData.imUse=br.readBoolean();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:ItemBase):ItemBase{
var clone :ItemBase = new ItemBase();
	clone.id=old.id;
	
	clone.itemName=old.itemName;
	
	clone.desc=old.desc;
	
	clone.icon=old.icon;
	
	clone.model=old.model;
	
	clone.effect=old.effect;
	
	clone.tagType=old.tagType;
	
	clone.itemType=old.itemType;
	
	clone.quality=old.quality;
	
	clone.maxNum=old.maxNum;
	
	clone.useType=old.useType;
	
	clone.useLimit=old.useLimit;
	
	clone.useEffect=old.useEffect;
	
	clone.jump=old.jump;
	
	clone.use=old.use;
	
	clone.equipType=old.equipType;
	
	clone.status=old.status;
	
	clone.statusUp=old.statusUp;
	
	clone.lv=old.lv;
	
	clone.rera=old.rera;
	
	clone.sale=old.sale;
	
	clone.buy=old.buy;
	
	clone.decompose=old.decompose;
	
	clone.imUse=old.imUse;
	
return clone;
}

public   clone(old:ItemBase){
	this.id=old.id;
	
	this.itemName=old.itemName;
	
	this.desc=old.desc;
	
	this.icon=old.icon;
	
	this.model=old.model;
	
	this.effect=old.effect;
	
	this.tagType=old.tagType;
	
	this.itemType=old.itemType;
	
	this.quality=old.quality;
	
	this.maxNum=old.maxNum;
	
	this.useType=old.useType;
	
	this.useLimit=old.useLimit;
	
	this.useEffect=old.useEffect;
	
	this.jump=old.jump;
	
	this.use=old.use;
	
	this.equipType=old.equipType;
	
	this.status=old.status;
	
	this.statusUp=old.statusUp;
	
	this.lv=old.lv;
	
	this.rera=old.rera;
	
	this.sale=old.sale;
	
	this.buy=old.buy;
	
	this.decompose=old.decompose;
	
	this.imUse=old.imUse;
	
}
	private static params = ["id","itemName","desc","icon","model","effect","tagType","itemType","quality","maxNum","useType","useLimit","useEffect","jump","use","equipType","status","statusUp","lv","rera","sale","buy","decompose","imUse",];
	public static add(a: ItemBase, b: ItemBase, start: number = 0, end: number, limit: ItemBase) {
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

	public static sub(a: ItemBase, b: ItemBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: ItemBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: ItemBase, b: ItemBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: ItemBase, b: ItemBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: ItemBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: ItemBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(ItemBase);