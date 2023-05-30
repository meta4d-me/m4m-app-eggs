//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
import { ItemBase } from "./ItemBase";
declare let gd3d;
export class test extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<test>;

	/**配置ID*/
	public id:string;
	/**道具名字*/
	public itemName:string;
	/**test1*/
	public test1:any;
	/**test1Json*/
	public test1Json:string;
	/**test2*/
	public test2:any[];
	/**test2Json*/
	public test2Json:string;
	/**test3*/
	public test3:{ [id: string]:string};
	/**test3Json*/
	public test3Json: string;
	/**test4*/
	public test4:{ [id: string]:string[]};
	/**test4Json*/
	public test4Json: string;
	/**test5*/
	public test5:{ [id: string]:any};
	/**test5Json*/
	public test5Json:string;
	/**test6*/
	public test6:{ [id: string]:any[]};
	/**test6Json*/
	public test6Json:string;


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

var baseData:test = new test ();	
	baseData.id=br.readUTFBytes();
	
	baseData.itemName=br.readUTFBytes();
	
	baseData.test1Json=br.readUTFBytes();
	
	baseData.test2Json = JSON.stringify((() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})());
	
	baseData.test3Json=br.readUTFBytes();
	
	baseData.test4Json=br.readUTFBytes();
	
	baseData.test5Json=br.readUTFBytes();
	
	baseData.test6Json=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:test):test{
var clone :test = new test();
	clone.id=old.id;
	
	clone.itemName=old.itemName;
	
	clone.test1=old.test1;
	
	clone.test2=old.test2;
	
	clone.test3=old.test3;
	
	clone.test4=old.test4;
	
	clone.test5=old.test5;
	
	clone.test6=old.test6;
	
return clone;
}

public   clone(old:test){
	this.id=old.id;
	
	this.itemName=old.itemName;
	
	this.test1=old.test1;
	
	this.test2=old.test2;
	
	this.test3=old.test3;
	
	this.test4=old.test4;
	
	this.test5=old.test5;
	
	this.test6=old.test6;
	
}
	private static params = ["id","itemName","test1","test2","test3","test4","test5","test6",];
	public static add(a: test, b: test, start: number = 0, end: number, limit: test) {
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

	public static sub(a: test, b: test, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: test, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: test, b: test, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: test, b: test, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: test, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: test, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(test);