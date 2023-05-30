//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class WalletLog extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<WalletLog>;

	/**记录ID*/
	public id:string;
	/**类名*/
	public className:string;
	/**方法名*/
	public methodName:string;
	/**玩家ID*/
	public userToken:string;
	/**log信息*/
	public logMessage:string;
	/**记录时间*/
	public resultTime:string;


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

var baseData:WalletLog = new WalletLog ();	
	baseData.id=br.readUTFBytes();
	
	baseData.className=br.readUTFBytes();
	
	baseData.methodName=br.readUTFBytes();
	
	baseData.userToken=br.readUTFBytes();
	
	baseData.logMessage=br.readUTFBytes();
	
	baseData.resultTime=br.readDouble();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:WalletLog):WalletLog{
var clone :WalletLog = new WalletLog();
	clone.id=old.id;
	
	clone.className=old.className;
	
	clone.methodName=old.methodName;
	
	clone.userToken=old.userToken;
	
	clone.logMessage=old.logMessage;
	
	clone.resultTime=old.resultTime;
	
return clone;
}

public   clone(old:WalletLog){
	this.id=old.id;
	
	this.className=old.className;
	
	this.methodName=old.methodName;
	
	this.userToken=old.userToken;
	
	this.logMessage=old.logMessage;
	
	this.resultTime=old.resultTime;
	
}
	private static params = ["id","className","methodName","userToken","logMessage","resultTime",];
	public static add(a: WalletLog, b: WalletLog, start: number = 0, end: number, limit: WalletLog) {
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

	public static sub(a: WalletLog, b: WalletLog, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: WalletLog, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: WalletLog, b: WalletLog, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: WalletLog, b: WalletLog, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: WalletLog, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: WalletLog, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(WalletLog);