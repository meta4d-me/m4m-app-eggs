@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiScaleDown extends m4m.framework.behaviour2d {
    /** 是否循环播放 */
    public isLoop = false;
    /** 播放速度 f/s (帧每秒)*/
    public playSpeed = 5;
    public lastFun: Function;
    private runState: boolean = false;
    private mth: number = 0;
    private time = 0;
    private coutTime = 2;
    private scale = 1;
    public onPlay() {
        this.mth = m4m.framework.tweenMethod.BackEaseIn;
    }
    public play() {
        if (this.runState) { return; }
        this.runState = true;
        this.scale = 1;
        this.time = 0;
        this.transform.visible = true;
        this.resTransform();
    }

    public stop() {
        this.runState = false;
        // this.scale = 0;
        this.time = 0;
        this.transform.visible = false;
        this.resTransform();
    }
    public update(delta: number) {
        if (!this.runState) { return; }
        let num = delta * this.playSpeed;
        this.time += num;
        let p = this.time / this.coutTime;
        //
        let tp = m4m.framework.tweenUtil.GetEaseProgress(this.mth, p);
        this.scale = 1 - tp;
        //console.error("this.scale   "+this.scale+"  num  "+num);
        this.resTransform();
        if (this.time > this.coutTime) {
            this.stop();
            if (this.lastFun) {
                this.lastFun();
            }
        }
    }

    public remove() {

    }

    private resTransform() {
        if (this.transform) {
            this.transform.localScale.x = this.scale;
            this.transform.localScale.y = this.scale;
            this.transform.markDirty();
        }
    }
}
