import { CTimer } from "Time/CTimer";
import { TimeUtil } from "Time/TimeUtil";

//心跳管理
export class HeartBeatManager {
    static get Instance() {
        if (this._instance == null) {
            this._instance = new HeartBeatManager();
        }
        return this._instance;
    }
    constructor() {
        //每10秒
        CTimer.Instance.loopTimeUpdate(10000, this.updateFun.bind(this));
    }
    private static _instance: HeartBeatManager;

    //心跳  同步服务器时间
    public SyncServerTime() {
        let gameTime: number = Math.floor(TimeUtil.realtimeSinceStartup / 1000);
        console.error("当前游戏启动时间秒 " + gameTime);
    }

    private updateFun() {
        // 
        this.SyncServerTime();
    }
}