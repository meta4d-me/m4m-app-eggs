//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class SeverData extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<SeverData>;

	/**配置ID*/
	public id:string;
	/**区服状态: 1.爆满 2.维护 3.流畅*/
	public serverState:number;
	/**新区*/
	public newServer:boolean;
	/**启动时间*/
	public setupTime:string;
	/**状态*/
	public status:number;
	/**当前人数*/
	public playerSum:number;
	/**地图更新序号*/
	public mapSaveVer:number;
	/**开服时间*/
	public openTime:string;
	/**服务器偏移时间*/
	public addTime:number;


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

var baseData:SeverData = new SeverData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.serverState=br.readByte();
	
	baseData.newServer=br.readBoolean();
	
	baseData.setupTime=br.readDouble();
	
	baseData.status=br.readByte();
	
	baseData.playerSum=br.readUInt32();
	
	baseData.mapSaveVer=br.readULong();
	
	baseData.openTime=br.readDouble();
	
	baseData.addTime=br.readLong();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:SeverData):SeverData{
var clone :SeverData = new SeverData();
	clone.id=old.id;
	
	clone.serverState=old.serverState;
	
	clone.newServer=old.newServer;
	
	clone.setupTime=old.setupTime;
	
	clone.status=old.status;
	
	clone.playerSum=old.playerSum;
	
	clone.mapSaveVer=old.mapSaveVer;
	
	clone.openTime=old.openTime;
	
	clone.addTime=old.addTime;
	
return clone;
}

public   clone(old:SeverData){
	this.id=old.id;
	
	this.serverState=old.serverState;
	
	this.newServer=old.newServer;
	
	this.setupTime=old.setupTime;
	
	this.status=old.status;
	
	this.playerSum=old.playerSum;
	
	this.mapSaveVer=old.mapSaveVer;
	
	this.openTime=old.openTime;
	
	this.addTime=old.addTime;
	
}
	private static params = ["id","serverState","newServer","setupTime","status","playerSum","mapSaveVer","openTime","addTime",];
	public static add(a: SeverData, b: SeverData, start: number = 0, end: number, limit: SeverData) {
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

	public static sub(a: SeverData, b: SeverData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: SeverData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: SeverData, b: SeverData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: SeverData, b: SeverData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: SeverData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: SeverData, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(SeverData);