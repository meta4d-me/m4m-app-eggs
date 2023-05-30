import { TimerData } from "./TimerData";
import { TimeUtil } from "./TimeUtil";
import { FrameMgr } from "../Tools/FrameMgr";
export class CTimer {
    public static get Instance(): CTimer {
        if (this.instance == null) {
            this.instance = new CTimer();
        }
        return this.instance;
    }

    public static testC: boolean = true;
    public removeList: TimerData[] = new Array<TimerData>();

    constructor() {
        this.id = 0;
        FrameMgr.Add(this.Update, this);
    }
    private static instance: CTimer;
    private list: TimerData[] = new Array<TimerData>();
    private id: number = 0;

    public showTimer() {
        for (let i = 0; i < this.list.length; i++) {
            let item = this.list[i];
            //    console.warn("list.Count" + this.list.length);
            // tslint:disable-next-line: max-line-length
            //  console.warn(item.id + "    item.countDownid:" + item.countDownid + " item.count" + item.count + "   item.oldTime" + item.oldTime + "   item.loopTime" + item.loopTime + "   " + item.isEnd);
        }
    }

    public showConutDown(countDownid: number) {
        for (let i = 0; i < this.list.length; i++) {
            let item = this.list[i];
            if (item.countDownid == countDownid) {
                item.showLog = true;
            }
        }
    }

    /// <summary>
    /// 倒计时函数
    /// </summary>
    /// <param name="time"></param>
    /// <param name="rateTime"></param>
    /// <param name="callback"></param>
    /// <param name="completeCallback"></param>
    public countDown(time: number, rateTime: number, callback: Function, completeCallback: Function): number {
        this.id++;
        let countDownid = this.id;
        ///根据倒计时的频率算出需要倒计时的次数，然后最后一次不做更新，但是会发出完成事件
        let count = Math.floor(time / rateTime) - 1;
        if (time != 0) {
            this.timer(rateTime, count, callback, countDownid);
        }
        this.timeDelay(time, completeCallback, countDownid);
        return countDownid;
    }

    /// <summary>
    /// 暂停或继续回掉功能 pause true  暂停
    /// </summary>
    /// <param name="id"></param>
    public pause(id: number, pause: boolean) {
        for (let i = 0; i < this.list.length; i++) {
            let data = this.list[i];
            if (data.id == id) {
                data.pause = pause;
            }
        }
    }

    /// <summary>
    /// 直接将timer停止掉
    /// </summary>
    /// <param name="timerid"></param>
    public stop(timerid: number) {
        for (let i = 0; i < this.list.length; i++) {
            let data = this.list[i];
            if (data.id == timerid) {
                data.isEnd = true;
            }
        }
    }

    /// <summary>
    /// stopCountDown
    /// </summary>
    /// <param name="countDownid"></param>
    public stopCountDown(countDownid: number) {
        if (countDownid == -1) { return; }
        for (let i = 0; i < this.list.length; i++) {
            let data = this.list[i];
            if (data.countDownid == countDownid) {
                data.isEnd = true;
            }
        }
    }

    /// <summary>
    /// 定时执行函数
    /// </summary>
    /// <param name="time"></param>
    /// <param name="count"></param>
    /// <param name="callback"></param>
    public timer(time: number, count: number, callback: Function, countDownid: number = -1): number {
        ///虽然delay时间是0但是也应该使用timedelay的方法来调用，因为delay的时间是通过配置或者具体需求来的，优化交给架构本身。所以这里做了特殊处理
        if (time == 0) {
            callback(countDownid);
            return 0;
        }

        let data = new TimerData();
        data.count = count;
        this.id++;
        data.id = this.id;
        if (countDownid != -1) {
            data.countDownid = countDownid;
        }
        data.oldTime = TimeUtil.realtimeSinceStartup;
        data.callback = callback;
        data.loopTime = time;
        this.list.push(data);
        return data.id;
    }

    /// <summary>
    /// 延迟执行函数
    /// </summary>
    /// <param name="delayTime"></param>
    /// <param name="callback"></param>
    /// <returns></returns>
    public timeDelay(delayTime: number, callback: Function, countDownid: number = -1): number {
        this.id++;
        ///虽然delay时间是0但是也应该使用timedelay的方法来调用，因为delay的时间是通过配置或者具体需求来的，优化交给架构本身。所以这里做了特殊处理
        if (delayTime == 0) {
            callback(countDownid);
            return 0;
        }
        let data = new TimerData();
        data.count = 1;
        if (countDownid != -1) {
            data.countDownid = countDownid;
        }
        data.id = this.id;
        data.oldTime = TimeUtil.realtimeSinceStartup;
        data.callback = callback;
        data.loopTime = delayTime;
        this.list.push(data);
        return data.id;
    }

    /// <summary>
    /// loopTime 循环执行函数
    /// </summary>
    /// <param name="loopTime"></param>
    /// <param name="callback"></param>
    /// <returns></returns>
    public loopTimeUpdate(loopTime: number, callback: Function): number {
        this.id++;
        if (loopTime == 0) {
            console.error("CTimer Error: loopTime为0 不需要用这个方法  直接用Update每帧调用");
            return 0;
        }
        let data: TimerData = new TimerData();
        data.id = this.id;
        data.isNeedLoop = true;
        data.oldTime = TimeUtil.realtimeSinceStartup;
        data.callback = callback;
        data.loopTime = loopTime;
        this.list.push(data);
        return data.id;
    }
    //计时器抛出计时事件时，可能会出现调用已经释放的类，
    //所以在for循环中加了一个异常捕获，
    //当出现异常的时候直接Remove掉所在的元素，同时抛出一次异常提示   
    public Update() {
        let nowTime: number = TimeUtil.realtimeSinceStartup;
        for (let i = 0; i < this.list.length; i++) {
            let data = this.list[i];
            if (data == null) { continue; }
            if (data.isEnd == false) {
                data.tick(nowTime);
            }
        }

        for (let k = 0; k < this.removeList.length; k++) {
            let removeData: TimerData = this.removeList[k];
            let index = this.list.indexOf(removeData);
            if (index != -1) {
                this.list.splice(index, 1);
            }
        }
        this.removeList.length = 0;
    }
}