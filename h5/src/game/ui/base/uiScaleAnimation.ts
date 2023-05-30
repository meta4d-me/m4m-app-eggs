/** 序列帧动画 */
@m4m.reflect.node2DComponent
export class uiScaleAnimation extends m4m.framework.behaviour2d {
    /** 是否循环播放 */
    isLoop = false;
    /** 播放速度 f/s (帧每秒)*/
    playSpeed = 5;
    private sps: m4m.framework.sprite[] = [];
    private isStop = true;
    public onPlay() {
        this.init();
    }

    private inited = false;
    private init() {
        if (this.inited) return;
        this.transform.visible = true;
        this.scale = 0;
        this.resTransform();
        this.inited = true;
    }
    public resTransform() {
        this.transform.localScale.x = this.scale;
        this.transform.localScale.y = this.scale;
        this.transform.markDirty();
    }
    play() {
        if (!this.isStop) return;
        this.scale = 0;
        this.time=0;
        this.isStop = false;
    }

    stop() {
        if (this.isStop) return;
        this.isStop = true;
        this.scale =1;
    }

    private time = 0;
    private coutTime = 2;
    private scale = 0;
    public update(delta: number) {
        if (this.isStop) return;
        this.init();
        if (!this.inited) return;
        let num =  delta*this.playSpeed;
        this.time+=num;
        let p = this.time / this.coutTime;
        //计算欢动
        let mth = m4m.framework.tweenMethod.BackEaseOut;
        let tp = m4m.framework.tweenUtil.GetEaseProgress(mth, p);

        this.scale = tp;
      //  console.error("this.scale   "+this.scale+"  num  "+num);
        if (this.time>this.coutTime) {
            this.stop();
        }
        this.resTransform();
    }

    public remove() {

    }
}
