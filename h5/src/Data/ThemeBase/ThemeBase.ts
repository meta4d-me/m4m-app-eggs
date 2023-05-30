//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class ThemeBase extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<ThemeBase>;

	/**ID*/
	public id:string;
	/**名称*/
	public sceneName:string;
	/**图片1名称*/
	public image1:string;
	/**图片2名称*/
	public image2:string;
	/**模型图片*/
	public cubeImage:string;
	/**解锁条件*/
	public deblocking:{ [id: string]:number};
	/**解锁条件Json*/
	public deblockingJson: string;
	/**颜色*/
	public color:string;
	/**范围*/
	public hRange:number[];
	/**因素1*/
	public sFactor:number;
	/**因素2*/
	public vFactor:number;
	/**图标名称*/
	public icon:string;
	/**类型*/
	public isDynamicColor:boolean;


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

var baseData:ThemeBase = new ThemeBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.sceneName=br.readUTFBytes();
	
	baseData.image1=br.readUTFBytes();
	
	baseData.image2=br.readUTFBytes();
	
	baseData.cubeImage=br.readUTFBytes();
	
	baseData.deblockingJson=br.readUTFBytes();
	
	baseData.color=br.readUTFBytes();
	
	baseData.hRange = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readInt32());}return cache;})();
	
	baseData.sFactor=br.readInt32();
	
	baseData.vFactor=br.readInt32();
	
	baseData.icon=br.readUTFBytes();
	
	baseData.isDynamicColor=br.readBoolean();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:ThemeBase):ThemeBase{
var clone :ThemeBase = new ThemeBase();
	clone.id=old.id;
	
	clone.sceneName=old.sceneName;
	
	clone.image1=old.image1;
	
	clone.image2=old.image2;
	
	clone.cubeImage=old.cubeImage;
	
	clone.deblocking=old.deblocking;
	
	clone.color=old.color;
	
	clone.hRange=old.hRange;
	
	clone.sFactor=old.sFactor;
	
	clone.vFactor=old.vFactor;
	
	clone.icon=old.icon;
	
	clone.isDynamicColor=old.isDynamicColor;
	
return clone;
}

public   clone(old:ThemeBase){
	this.id=old.id;
	
	this.sceneName=old.sceneName;
	
	this.image1=old.image1;
	
	this.image2=old.image2;
	
	this.cubeImage=old.cubeImage;
	
	this.deblocking=old.deblocking;
	
	this.color=old.color;
	
	this.hRange=old.hRange;
	
	this.sFactor=old.sFactor;
	
	this.vFactor=old.vFactor;
	
	this.icon=old.icon;
	
	this.isDynamicColor=old.isDynamicColor;
	
}
	private static params = ["id","sceneName","image1","image2","cubeImage","deblocking","color","hRange","sFactor","vFactor","icon","isDynamicColor",];
	public static add(a: ThemeBase, b: ThemeBase, start: number = 0, end: number, limit: ThemeBase) {
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

	public static sub(a: ThemeBase, b: ThemeBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: ThemeBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: ThemeBase, b: ThemeBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: ThemeBase, b: ThemeBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: ThemeBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: ThemeBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(ThemeBase);