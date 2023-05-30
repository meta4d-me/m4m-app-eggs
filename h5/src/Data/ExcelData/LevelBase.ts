//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class LevelBase extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<LevelBase>;

	/**ID*/
	public id:string;
	/**数量*/
	public amount:number;
	/**关卡名称*/
	public stageName:string;
	/**跑道长度*/
	public runwayLength:number;
	/**跑道宽度*/
	public runwayWeight:number[];
	/**最小值*/
	public cubeSpMin:number;
	/**最大值*/
	public cubeSpMax:number;
	/**速度*/
	public beyondRate:number;
	/**重力*/
	public bootsWght:number[];
	/**复活计数*/
	public reviveCount:number;


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

var baseData:LevelBase = new LevelBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.amount=br.readUInt32();
	
	baseData.stageName=br.readUTFBytes();
	
	baseData.runwayLength=br.readUInt32();
	
	baseData.runwayWeight = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readInt32());}return cache;})();
	
	baseData.cubeSpMin=br.readFloat();
	
	baseData.cubeSpMax=br.readFloat();
	
	baseData.beyondRate=br.readFloat();
	
	baseData.bootsWght = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readInt32());}return cache;})();
	
	baseData.reviveCount=br.readByte();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:LevelBase):LevelBase{
var clone :LevelBase = new LevelBase();
	clone.id=old.id;
	
	clone.amount=old.amount;
	
	clone.stageName=old.stageName;
	
	clone.runwayLength=old.runwayLength;
	
	clone.runwayWeight=old.runwayWeight;
	
	clone.cubeSpMin=old.cubeSpMin;
	
	clone.cubeSpMax=old.cubeSpMax;
	
	clone.beyondRate=old.beyondRate;
	
	clone.bootsWght=old.bootsWght;
	
	clone.reviveCount=old.reviveCount;
	
return clone;
}

public   clone(old:LevelBase){
	this.id=old.id;
	
	this.amount=old.amount;
	
	this.stageName=old.stageName;
	
	this.runwayLength=old.runwayLength;
	
	this.runwayWeight=old.runwayWeight;
	
	this.cubeSpMin=old.cubeSpMin;
	
	this.cubeSpMax=old.cubeSpMax;
	
	this.beyondRate=old.beyondRate;
	
	this.bootsWght=old.bootsWght;
	
	this.reviveCount=old.reviveCount;
	
}
	private static params = ["id","amount","stageName","runwayLength","runwayWeight","cubeSpMin","cubeSpMax","beyondRate","bootsWght","reviveCount",];
	public static add(a: LevelBase, b: LevelBase, start: number = 0, end: number, limit: LevelBase) {
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

	public static sub(a: LevelBase, b: LevelBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: LevelBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: LevelBase, b: LevelBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: LevelBase, b: LevelBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: LevelBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: LevelBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(LevelBase);