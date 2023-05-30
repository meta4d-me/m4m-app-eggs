//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class TimeEvent extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<TimeEvent>;

	/**配置ID*/
	public id:string;
	/**任务名称*/
	public eventName:string;
	/**任务实际开始时间*/
	public taskstartTime:number;
	/**任务结束时间*/
	public taskEndTime:number;
	/**上次开始时间*/
	public lastStartTime:number;
	/**上次结束时间*/
	public lastEndTime:number;
	/**默认时间是0也就是utc时间*/
	public serverTimeZone:number;
	/**重复循环次数，0就是无限次循环*/
	public LoopCount:number;
	/**已经重复的次数*/
	public LoopTimers:number;
	/**第一次是否有cd*/
	public isFristNoCD:boolean;
	/**任务间隔执行时间*/
	public taskLoopTime:number;
	/**循环类型 1.日循环 2.周循环 3.月循环*/
	public timeType:number;
	/**每天任务开始的时间，和loopTime共同执行*/
	public startTime:number;
	/**每天任务开始的时间的结束时间*/
	public startLimitTime:number;
	/**前置任务id，可以组成任务集合*/
	public predecessorTaskID:string;
	/**任务的回调事件名字*/
	public taskEventString:string;
	/**任务执行日志列表*/
	public taskEventLog:string;
	/**任务目前状态，0等待执行，1正在执行，2执行错误，3执行成功*/
	public taskState:number;
	/**任务之前的执行状态，1正在执行，2执行错误，3执行成功，注意写任务的一定要注意可能服务器被中断的情况*/
	public taskPreviousState:number;


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

var baseData:TimeEvent = new TimeEvent ();	
	baseData.id=br.readUTFBytes();
	
	baseData.eventName=br.readUTFBytes();
	
	baseData.taskstartTime=br.readULong();
	
	baseData.taskEndTime=br.readULong();
	
	baseData.lastStartTime=br.readULong();
	
	baseData.lastEndTime=br.readULong();
	
	baseData.serverTimeZone=br.readInt32();
	
	baseData.LoopCount=br.readInt32();
	
	baseData.LoopTimers=br.readInt32();
	
	baseData.isFristNoCD=br.readBoolean();
	
	baseData.taskLoopTime=br.readULong();
	
	baseData.timeType=br.readByte();
	
	baseData.startTime=br.readULong();
	
	baseData.startLimitTime=br.readULong();
	
	baseData.predecessorTaskID=br.readUTFBytes();
	
	baseData.taskEventString=br.readUTFBytes();
	
	baseData.taskEventLog=br.readUTFBytes();
	
	baseData.taskState=br.readInt32();
	
	baseData.taskPreviousState=br.readInt32();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:TimeEvent):TimeEvent{
var clone :TimeEvent = new TimeEvent();
	clone.id=old.id;
	
	clone.eventName=old.eventName;
	
	clone.taskstartTime=old.taskstartTime;
	
	clone.taskEndTime=old.taskEndTime;
	
	clone.lastStartTime=old.lastStartTime;
	
	clone.lastEndTime=old.lastEndTime;
	
	clone.serverTimeZone=old.serverTimeZone;
	
	clone.LoopCount=old.LoopCount;
	
	clone.LoopTimers=old.LoopTimers;
	
	clone.isFristNoCD=old.isFristNoCD;
	
	clone.taskLoopTime=old.taskLoopTime;
	
	clone.timeType=old.timeType;
	
	clone.startTime=old.startTime;
	
	clone.startLimitTime=old.startLimitTime;
	
	clone.predecessorTaskID=old.predecessorTaskID;
	
	clone.taskEventString=old.taskEventString;
	
	clone.taskEventLog=old.taskEventLog;
	
	clone.taskState=old.taskState;
	
	clone.taskPreviousState=old.taskPreviousState;
	
return clone;
}

public   clone(old:TimeEvent){
	this.id=old.id;
	
	this.eventName=old.eventName;
	
	this.taskstartTime=old.taskstartTime;
	
	this.taskEndTime=old.taskEndTime;
	
	this.lastStartTime=old.lastStartTime;
	
	this.lastEndTime=old.lastEndTime;
	
	this.serverTimeZone=old.serverTimeZone;
	
	this.LoopCount=old.LoopCount;
	
	this.LoopTimers=old.LoopTimers;
	
	this.isFristNoCD=old.isFristNoCD;
	
	this.taskLoopTime=old.taskLoopTime;
	
	this.timeType=old.timeType;
	
	this.startTime=old.startTime;
	
	this.startLimitTime=old.startLimitTime;
	
	this.predecessorTaskID=old.predecessorTaskID;
	
	this.taskEventString=old.taskEventString;
	
	this.taskEventLog=old.taskEventLog;
	
	this.taskState=old.taskState;
	
	this.taskPreviousState=old.taskPreviousState;
	
}
	private static params = ["id","eventName","taskstartTime","taskEndTime","lastStartTime","lastEndTime","serverTimeZone","LoopCount","LoopTimers","isFristNoCD","taskLoopTime","timeType","startTime","startLimitTime","predecessorTaskID","taskEventString","taskEventLog","taskState","taskPreviousState",];
	public static add(a: TimeEvent, b: TimeEvent, start: number = 0, end: number, limit: TimeEvent) {
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

	public static sub(a: TimeEvent, b: TimeEvent, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: TimeEvent, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: TimeEvent, b: TimeEvent, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: TimeEvent, b: TimeEvent, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: TimeEvent, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: TimeEvent, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(TimeEvent);