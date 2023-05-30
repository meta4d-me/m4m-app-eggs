//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
import { EquipBase } from "./EquipBase";
declare let gd3d;
export class EquipDate extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<EquipDate>;

	/**ID*/
	public id:string;
	/**装备打造id*/
	public equipData:any[];
	/**装备打造idJson*/
	public equipDataJson:string;
	/**打造开始时间*/
	public equipStartTime:number;
	/**打造结束时间*/
	public equipEndTime:number;
	/**获取的词条*/
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

var baseData:EquipDate = new EquipDate ();	
	baseData.id=br.readUTFBytes();
	
	baseData.equipDataJson = JSON.stringify((() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})());
	
	baseData.equipStartTime=br.readULong();
	
	baseData.equipEndTime=br.readULong();
	
	baseData.equipEffect=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:EquipDate):EquipDate{
var clone :EquipDate = new EquipDate();
	clone.id=old.id;
	
	clone.equipData=old.equipData;
	
	clone.equipStartTime=old.equipStartTime;
	
	clone.equipEndTime=old.equipEndTime;
	
	clone.equipEffect=old.equipEffect;
	
return clone;
}

public   clone(old:EquipDate){
	this.id=old.id;
	
	this.equipData=old.equipData;
	
	this.equipStartTime=old.equipStartTime;
	
	this.equipEndTime=old.equipEndTime;
	
	this.equipEffect=old.equipEffect;
	
}
	private static params = ["id","equipData","equipStartTime","equipEndTime","equipEffect",];
	public static add(a: EquipDate, b: EquipDate, start: number = 0, end: number, limit: EquipDate) {
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

	public static sub(a: EquipDate, b: EquipDate, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: EquipDate, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: EquipDate, b: EquipDate, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: EquipDate, b: EquipDate, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: EquipDate, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: EquipDate, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(EquipDate);