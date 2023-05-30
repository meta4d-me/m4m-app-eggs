//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class EquipEffectBase extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<EquipEffectBase>;

	/**配置ID*/
	public id:string;
	/**词条名称*/
	public equipEffectName:string;
	/**词条描述*/
	public equipEffectdesc:string;
	/**词条图标*/
	public equipEffecticon:string;
	/**词条类型*/
	public equipEffectType:number;
	/**属性*/
	public status:{ [id: string]:number};
	/**属性Json*/
	public statusJson: string;
	/**词条效果脚本*/
	public equipEffect:string;


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

var baseData:EquipEffectBase = new EquipEffectBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.equipEffectName=br.readUTFBytes();
	
	baseData.equipEffectdesc=br.readUTFBytes();
	
	baseData.equipEffecticon=br.readUTFBytes();
	
	baseData.equipEffectType=br.readByte();
	
	baseData.statusJson=br.readUTFBytes();
	
	baseData.equipEffect=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:EquipEffectBase):EquipEffectBase{
var clone :EquipEffectBase = new EquipEffectBase();
	clone.id=old.id;
	
	clone.equipEffectName=old.equipEffectName;
	
	clone.equipEffectdesc=old.equipEffectdesc;
	
	clone.equipEffecticon=old.equipEffecticon;
	
	clone.equipEffectType=old.equipEffectType;
	
	clone.status=old.status;
	
	clone.equipEffect=old.equipEffect;
	
return clone;
}

public   clone(old:EquipEffectBase){
	this.id=old.id;
	
	this.equipEffectName=old.equipEffectName;
	
	this.equipEffectdesc=old.equipEffectdesc;
	
	this.equipEffecticon=old.equipEffecticon;
	
	this.equipEffectType=old.equipEffectType;
	
	this.status=old.status;
	
	this.equipEffect=old.equipEffect;
	
}
	private static params = ["id","equipEffectName","equipEffectdesc","equipEffecticon","equipEffectType","status","equipEffect",];
	public static add(a: EquipEffectBase, b: EquipEffectBase, start: number = 0, end: number, limit: EquipEffectBase) {
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

	public static sub(a: EquipEffectBase, b: EquipEffectBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: EquipEffectBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: EquipEffectBase, b: EquipEffectBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: EquipEffectBase, b: EquipEffectBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: EquipEffectBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: EquipEffectBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(EquipEffectBase);