//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
import { GameArchiveData } from "./GameArchiveData";
declare let gd3d;
export class UserDataBase extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<UserDataBase>;

	/**用户uid*/
	public id:string;
	/**用户名*/
	public playerName:string;
	/**token*/
	public token:string;
	/**密码*/
	public passWord:string;
	/**账号状态*/
	public status:number;
	/**持有货币*/
	public currency:{ [id: string]:number};
	/**持有货币Json*/
	public currencyJson: string;
	/**是否屏蔽*/
	public isBlock:boolean;
	/**是否记录*/
	public isLogUser:boolean;
	/**登录时间*/
	public loginTime:number;
	/**第三方账号*/
	public thirdPartyAccount:number;
	/**服务器渠道*/
	public serverChannel:number;
	/**账号权限*/
	public accountAccess:number;
	/**黑名单*/
	public blacklist:string;
	/**玩家姓名*/
	public frinedName:string;
	/**玩家头像*/
	public icon:string;
	/**游戏存档*/
	public GameArchive:{ [id: string]:any};
	/**游戏存档Json*/
	public GameArchiveJson:string;


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

var baseData:UserDataBase = new UserDataBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.playerName=br.readUTFBytes();
	
	baseData.token=br.readUTFBytes();
	
	baseData.passWord=br.readUTFBytes();
	
	baseData.status=br.readByte();
	
	baseData.currencyJson=br.readUTFBytes();
	
	baseData.isBlock=br.readBoolean();
	
	baseData.isLogUser=br.readBoolean();
	
	baseData.loginTime=br.readULong();
	
	baseData.thirdPartyAccount=br.readByte();
	
	baseData.serverChannel=br.readByte();
	
	baseData.accountAccess=br.readByte();
	
	baseData.blacklist=br.readUTFBytes();
	
	baseData.frinedName=br.readUTFBytes();
	
	baseData.icon=br.readUTFBytes();
	
	baseData.GameArchiveJson=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:UserDataBase):UserDataBase{
var clone :UserDataBase = new UserDataBase();
	clone.id=old.id;
	
	clone.playerName=old.playerName;
	
	clone.token=old.token;
	
	clone.passWord=old.passWord;
	
	clone.status=old.status;
	
	clone.currency=old.currency;
	
	clone.isBlock=old.isBlock;
	
	clone.isLogUser=old.isLogUser;
	
	clone.loginTime=old.loginTime;
	
	clone.thirdPartyAccount=old.thirdPartyAccount;
	
	clone.serverChannel=old.serverChannel;
	
	clone.accountAccess=old.accountAccess;
	
	clone.blacklist=old.blacklist;
	
	clone.frinedName=old.frinedName;
	
	clone.icon=old.icon;
	
	clone.GameArchive=old.GameArchive;
	
return clone;
}

public   clone(old:UserDataBase){
	this.id=old.id;
	
	this.playerName=old.playerName;
	
	this.token=old.token;
	
	this.passWord=old.passWord;
	
	this.status=old.status;
	
	this.currency=old.currency;
	
	this.isBlock=old.isBlock;
	
	this.isLogUser=old.isLogUser;
	
	this.loginTime=old.loginTime;
	
	this.thirdPartyAccount=old.thirdPartyAccount;
	
	this.serverChannel=old.serverChannel;
	
	this.accountAccess=old.accountAccess;
	
	this.blacklist=old.blacklist;
	
	this.frinedName=old.frinedName;
	
	this.icon=old.icon;
	
	this.GameArchive=old.GameArchive;
	
}
	private static params = ["id","playerName","token","passWord","status","currency","isBlock","isLogUser","loginTime","thirdPartyAccount","serverChannel","accountAccess","blacklist","frinedName","icon","GameArchive",];
	public static add(a: UserDataBase, b: UserDataBase, start: number = 0, end: number, limit: UserDataBase) {
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

	public static sub(a: UserDataBase, b: UserDataBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: UserDataBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: UserDataBase, b: UserDataBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: UserDataBase, b: UserDataBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: UserDataBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: UserDataBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(UserDataBase);