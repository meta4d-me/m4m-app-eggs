//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class SkinBase extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<SkinBase>;

	/**ID*/
	public id:string;
	/**名称*/
	public skinName:string;
	/**头像名*/
	public headPortrait:string;
	/**皮肤名*/
	public skinSticker:string;
	/**解锁条件*/
	public deblocking:{ [id: string]:number};
	/**解锁条件Json*/
	public deblockingJson: string;
	/**颜色*/
	public color:string;
	/**类型*/
	public renderType:number;


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

var baseData:SkinBase = new SkinBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.skinName=br.readUTFBytes();
	
	baseData.headPortrait=br.readUTFBytes();
	
	baseData.skinSticker=br.readUTFBytes();
	
	baseData.deblockingJson=br.readUTFBytes();
	
	baseData.color=br.readUTFBytes();
	
	baseData.renderType=br.readByte();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:SkinBase):SkinBase{
var clone :SkinBase = new SkinBase();
	clone.id=old.id;
	
	clone.skinName=old.skinName;
	
	clone.headPortrait=old.headPortrait;
	
	clone.skinSticker=old.skinSticker;
	
	clone.deblocking=old.deblocking;
	
	clone.color=old.color;
	
	clone.renderType=old.renderType;
	
return clone;
}

public   clone(old:SkinBase){
	this.id=old.id;
	
	this.skinName=old.skinName;
	
	this.headPortrait=old.headPortrait;
	
	this.skinSticker=old.skinSticker;
	
	this.deblocking=old.deblocking;
	
	this.color=old.color;
	
	this.renderType=old.renderType;
	
}
	private static params = ["id","skinName","headPortrait","skinSticker","deblocking","color","renderType",];
	public static add(a: SkinBase, b: SkinBase, start: number = 0, end: number, limit: SkinBase) {
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

	public static sub(a: SkinBase, b: SkinBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: SkinBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: SkinBase, b: SkinBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: SkinBase, b: SkinBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: SkinBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: SkinBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(SkinBase);