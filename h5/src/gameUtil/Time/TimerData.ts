import { CTimer } from "./CTimer";
export class TimerData {

    public get isEnd(): boolean {
        return this._isEnd;
    }

    public set isEnd(value: boolean) {
        this._isEnd = value;

        if (value) {
            CTimer.Instance.removeList.push(this);
        }
    }
    public id: number = 0;
    //是否需要在loopTime时间 一直循环更新
    public isNeedLoop: boolean = false;
    public currentCount: number = 0;
    public count: number = -1;
    public loopTime: number = 0;
    public oldTime: number = 0;
    public callback: Function;
    public pause: boolean = false;
    public countDownid: number = -1;

    public showLog: boolean = false;
    private _isEnd: boolean = false;

    public tick(nowTime: number) {
        if (this.oldTime + this.loopTime <= nowTime) {
            let timercount: number = Math.floor(Math.floor(nowTime - this.oldTime) / Math.floor(this.loopTime));
            if (this.callback != null && this.pause == false) {

                for (let i = 0; i < timercount; i++) {
                    if (this.countDownid == -1) {
                        this.callback(this.id);
                    } else {
                        if (this.count == 1) {
                            CTimer.Instance.showConutDown(this.countDownid);
                        }
                        //LogManager.Warn("countDownid" + this.countDownid + "        " + this.currentCount + ">=" + this.count);
                        this.callback(this.countDownid);
                    }
                    if (this.showLog) {
                        // tslint:disable-next-line: max-line-length
                        //LogManager.Warn("countDownid" + this.countDownid + " id:" + this.id + " count:" + this.count + "oldTime:" + this.oldTime + "  nowTime" + nowTime);
                    }
                    if (!this.isNeedLoop) {
                        this.currentCount++;
                    }
                }
            }

            this.oldTime = this.oldTime + timercount * this.loopTime;
        }
        if (!this.isNeedLoop) {
            if (this.count == -1) { return; }
            if (this.currentCount >= this.count) {
                this.isEnd = true;
            }
        }
    }

    public disponse() {

    }
}