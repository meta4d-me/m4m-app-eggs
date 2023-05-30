//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
import { SkinBase } from "./SkinBase";
import { LevelBase } from "./LevelBase";
declare let gd3d;
export class GameArchiveData extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<GameArchiveData>;

	/**ID*/
	public id:string;
	/**角色配置数据*/
	public baseData:any;
	/**角色配置数据Json*/
	public baseDataJson:string;
	/**关卡数据*/
	public Currentlevel:any;
	/**关卡数据Json*/
	public CurrentlevelJson:string;
	/**上次使用时间*/
	public lastTime:number;
	/**是否是nft*/
	public ism4mnft:boolean;
	/**使用者*/
	public playerToken:string;


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

var baseData:GameArchiveData = new GameArchiveData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.baseDataJson=br.readUTFBytes();
	
	baseData.CurrentlevelJson=br.readUTFBytes();
	
	baseData.lastTime=br.readLong();
	
	baseData.ism4mnft=br.readBoolean();
	
	baseData.playerToken=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:GameArchiveData):GameArchiveData{
var clone :GameArchiveData = new GameArchiveData();
	clone.id=old.id;
	
	clone.baseData=old.baseData;
	
	clone.Currentlevel=old.Currentlevel;
	
	clone.lastTime=old.lastTime;
	
	clone.ism4mnft=old.ism4mnft;
	
	clone.playerToken=old.playerToken;
	
return clone;
}

public   clone(old:GameArchiveData){
	this.id=old.id;
	
	this.baseData=old.baseData;
	
	this.Currentlevel=old.Currentlevel;
	
	this.lastTime=old.lastTime;
	
	this.ism4mnft=old.ism4mnft;
	
	this.playerToken=old.playerToken;
	
}
	private static params = ["id","baseData","Currentlevel","lastTime","ism4mnft","playerToken",];
	public static add(a: GameArchiveData, b: GameArchiveData, start: number = 0, end: number, limit: GameArchiveData) {
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

	public static sub(a: GameArchiveData, b: GameArchiveData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: GameArchiveData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: GameArchiveData, b: GameArchiveData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: GameArchiveData, b: GameArchiveData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: GameArchiveData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: GameArchiveData, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(GameArchiveData);