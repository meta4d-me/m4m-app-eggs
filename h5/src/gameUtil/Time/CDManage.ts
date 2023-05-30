import { Dictionary } from "../Data/Dictionary";
import { FrameMgr } from "../Tools/FrameMgr";
import { CDData } from "./CDData";
import { TimeUtil } from "./TimeUtil";

export class CDManage {
    public static get Instance(): CDManage {
        if (this.instance == null) {
            this.instance = new CDManage();
        }
        return this.instance;
    }

    public currentSkillID: number = 0;

    public pingtimeStart: number;

    public timeQuality: number;
    constructor() {
        FrameMgr.Add(this.Update, this);
        this.cdData = new CDData();
    }
    private static instance: CDManage;

    private _serverTime: number = 0;
    private _initGameTime: number = 0;
    private cdData: CDData;

    /// <summary>
    /// 以服务器时间作为基准算出剩余时间。
    /// </summary>
    /// <param name="futureTime">服务器的未来时间</param>
    /// <returns></returns>
    public remainTime(futureTime: number): number {
        let serverTime: number = CDManage.instance.serverTime();
        let tempServerTime: number = serverTime;
        if (futureTime > tempServerTime) {
            return futureTime - tempServerTime;
            // tslint:disable-next-line: unnecessary-else
        } else { return 0; }
    }

    /// <summary>
    /// 取得服务器当前时间 毫秒
    /// </summary>
    /// <returns></returns>
    public serverTime(): number {

        let serverTime: number = CDManage.instance._serverTime;
        let getTimer: number = CDManage.instance.getTimer();
        let initGameTime: number = CDManage.instance._initGameTime;
        return serverTime + (getTimer - initGameTime);
    }

    /// <summary>
    /// 取得服务器当前时间 秒
    /// </summary>
    /// <returns></returns>
    public serverSecondsTime(): number {
        let time: number = CDManage.instance.serverTime();
        return time / 1000;
    }

    /// <summary>
    /// 设置服务器时间
    /// </summary>
    /// <param name="v"></param>
    public setServerTime(v: number): void {
        this._initGameTime = this.getTimer();
        this._serverTime = v;
    }

    public getTimer(): number {
        return TimeUtil.realtimeSinceStartup;
    }

    /// <summary>
    /// 开始cd计算
    /// 
    /// cdTime1 固定时间 已走百分比CD
    /// </summary>
    /// <param name="cdID"></param>
    /// <param name="time"></param>
    public startCDTime(cdID: number, time: number, cdTime1: number = 0): void {
        let cdData: CDData = this.getCDdata(cdID);
        cdData.startTime = this.serverTime();
        cdData.endTime = time;
        if (cdTime1 == 0) {
            cdData.cdTime = time - this.serverTime();
        } else {
            cdData.cdTime = cdTime1;
        }
    }

    /// <summary>
    /// 在物理时间内进行cd运算极其更新 如果某些平台出现cd不圆滑可以使用帧update
    /// </summary>
    public Update(): void {
        let list: Dictionary = this.cdData.list;
        for (let i: number = 0; i < list.count; i++) {
            let cdData: CDData = list.values[i];
            if (cdData != null && cdData.endTime != 0) {
                cdData.cdUpdate();
            }
        }
    }

    /// <summary>
    /// 是否在cd中
    /// </summary>
    /// <param name="cdID"></param>
    /// <returns></returns>
    public isCDing(cdID: number): boolean {
        return this.getCDdata(cdID).endTime == 0 ? false : true;
    }

    public stopCD(id: number): void {
        let cdData: CDData = this.getCDdata(id);
        cdData.endTime = 0;
    }

    /// <summary>
    /// 取出一个公共cd
    /// </summary>
    /// <param name="cdID"></param>
    /// <returns></returns>
    public getCDdata(cdID: number): CDData {
        if (this.cdData.list.ContainsKey(cdID)) {
            return this.cdData.list.GetValue(cdID);
            // tslint:disable-next-line: unnecessary-else
        } else {
            let cdData: CDData = new CDData();
            cdData.cdID = cdID;
            this.cdData.list.Add(cdID, cdData);
            return cdData;
        }
    }
}