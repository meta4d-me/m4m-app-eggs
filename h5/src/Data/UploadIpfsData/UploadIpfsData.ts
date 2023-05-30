//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class UploadIpfsData extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<UploadIpfsData>;

	/**ID*/
	public id:string;
	/**图片名称*/
	public ImageName:string;
	/**本地图片路径*/
	public ImageUrl:string;
	/**上传的ipfs上的图片唯一标识*/
	public IpfsImagehash:string;
	/**本地资源路径*/
	public modelUrl:string;
	/**上传的ipfs上到资源唯一标识*/
	public Ipfsmodelhash:string;


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

var baseData:UploadIpfsData = new UploadIpfsData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.ImageName=br.readUTFBytes();
	
	baseData.ImageUrl=br.readUTFBytes();
	
	baseData.IpfsImagehash=br.readUTFBytes();
	
	baseData.modelUrl=br.readUTFBytes();
	
	baseData.Ipfsmodelhash=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:UploadIpfsData):UploadIpfsData{
var clone :UploadIpfsData = new UploadIpfsData();
	clone.id=old.id;
	
	clone.ImageName=old.ImageName;
	
	clone.ImageUrl=old.ImageUrl;
	
	clone.IpfsImagehash=old.IpfsImagehash;
	
	clone.modelUrl=old.modelUrl;
	
	clone.Ipfsmodelhash=old.Ipfsmodelhash;
	
return clone;
}

public   clone(old:UploadIpfsData){
	this.id=old.id;
	
	this.ImageName=old.ImageName;
	
	this.ImageUrl=old.ImageUrl;
	
	this.IpfsImagehash=old.IpfsImagehash;
	
	this.modelUrl=old.modelUrl;
	
	this.Ipfsmodelhash=old.Ipfsmodelhash;
	
}
	private static params = ["id","ImageName","ImageUrl","IpfsImagehash","modelUrl","Ipfsmodelhash",];
	public static add(a: UploadIpfsData, b: UploadIpfsData, start: number = 0, end: number, limit: UploadIpfsData) {
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

	public static sub(a: UploadIpfsData, b: UploadIpfsData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: UploadIpfsData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: UploadIpfsData, b: UploadIpfsData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: UploadIpfsData, b: UploadIpfsData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: UploadIpfsData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: UploadIpfsData, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(UploadIpfsData);