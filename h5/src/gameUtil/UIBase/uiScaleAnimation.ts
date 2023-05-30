@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiScaleAnimation extends m4m.framework.behaviour2d {
    /** 是否循环播放 */
    public isLoop = false;
    /** 播放速度 f/s (帧每秒)*/
    public playSpeed = 5;
    public lastFun: Function;//动画执行结束后，需要执行的方法
    private runState: boolean = false;
    private mth: number = 0;

    private time = 0;
    private coutTime = 7.5;
    private scale = 1;
    public onPlay() {
        this.mth = m4m.framework.tweenMethod.ElasticEaseOut;
    }
    public play() {
        this.scale = 0;
        this.time = 0;
        this.runState = true;
        this.transform.visible = true;
        this.resTransform();
    }

    public stop() {
        this.runState = false;
        this.time = 0;
        this.scale = 1;
        this.resTransform();
    }
    public update(delta: number) {
        if (!this.runState) { return; }

        let num = delta * this.playSpeed;
        this.time += num;
        let p = this.time / this.coutTime;
        //
        this.scale = m4m.framework.tweenUtil.GetEaseProgress(this.mth, p);
        //  console.error("this.scale   "+this.scale+"  num  "+num);
        this.resTransform();

        if (this.time >= this.coutTime) {
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
