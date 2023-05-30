import { UiDataManager } from "PSDUI/UiDataManager";
import { CTimer } from "Time/CTimer";
import { TimeUtil } from "Time/TimeUtil";

/** 
 * 网络品质类型
 */
export enum NetworkQualityType {
    height = 1,//高
    middle = 2,//中
    low = 3,//低
}

//ping 时间管理
export class PingTimeManager {
    static get Instance() {
        if (this._instance == null) {
            this._instance = new PingTimeManager();
        }
        return this._instance;
    }
    /**
     * 网络延迟时间  毫秒
     * */
    public timeQualityNum: number;
    constructor() {
        //每1秒
        CTimer.Instance.loopTimeUpdate(1000, this.updateFun.bind(this));
    }
    private static _instance: PingTimeManager;

    private pingtimeStart: number = 0;
    //返回当前网络质量品质
    public getNetworkQuality(): NetworkQualityType {
        if (this.timeQualityNum <= 100) {
            return NetworkQualityType.height;
        }
        if (this.timeQualityNum <= 200 && this.timeQualityNum > 100) {
            return NetworkQualityType.middle;
        }
        return NetworkQualityType.low;
    }
    //
    public pingTimeFun() {
        // let gameTime: number = Math.floor(TimeUtil.realtimeSinceStartup / 1000);
        // console.error("当前游戏启动时间秒 " + gameTime);
        this.pingtimeStart = TimeUtil.realtimeSinceStartup;
        // WebsocketTool.Instance.ServerManager_ping();
    }

    //收到服务器返回
    public serverBackFun() {
        //毫秒
        this.timeQualityNum = TimeUtil.realtimeSinceStartup - this.pingtimeStart;//
        // UiDataManager.changeFunctionData(BindKeyName.Network, this.timeQualityNum);
        // console.error("网络延迟 ", this.timeQualityNum,"毫秒");
    }

    private updateFun() {
        // 
        this.pingTimeFun();
    }
}