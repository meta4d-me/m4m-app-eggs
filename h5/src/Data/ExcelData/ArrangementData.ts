//请在项目中，将 SyncObject、cMap 注入到 m4m.__ExcDate__ 对象上。
import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let m4m;
export class ArrangementData extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<ArrangementData>;

	/**ID*/
	public id:string;
	/**玩家id*/
	public token:string;
	/**队列安排*/
	public Arrangement:{ [id: string]:string[]};
	/**队列安排Json*/
	public ArrangementJson: string;
	/**队伍上限*/
	public Limit:number[];


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

var baseData:ArrangementData = new ArrangementData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.token=br.readUTFBytes();
	
	baseData.ArrangementJson=br.readUTFBytes();
	
	baseData.Limit = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readInt32());}return cache;})();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:ArrangementData):ArrangementData{
var clone :ArrangementData = new ArrangementData();
	clone.id=old.id;
	
	clone.token=old.token;
	
	clone.Arrangement=old.Arrangement;
	
	clone.Limit=old.Limit;
	
return clone;
}

public   clone(old:ArrangementData){
	this.id=old.id;
	
	this.token=old.token;
	
	this.Arrangement=old.Arrangement;
	
	this.Limit=old.Limit;
	
}
	private static params = ["id","token","Arrangement","Limit",];
	public static add(a: ArrangementData, b: ArrangementData, start: number = 0, end: number, limit: ArrangementData) {
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

	public static sub(a: ArrangementData, b: ArrangementData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: ArrangementData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: ArrangementData, b: ArrangementData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: ArrangementData, b: ArrangementData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: ArrangementData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: ArrangementData, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!m4m.__ExcDate__)m4m.__ExcDate__= { } ; if(!m4m.__ExcDate__.__list) m4m.__ExcDate__.__list = []; m4m.__ExcDate__.__list.push(ArrangementData);