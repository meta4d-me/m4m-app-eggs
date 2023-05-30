@m4m.reflect.node2DComponent
export class RotateComponents extends m4m.framework.behaviour2d {
    public callBackFun: Function;
    //一定时间后回调   (如果有回调方法)
    public timeCallBack: number = 20;
    //旋转速度
    private angleSpeed: number = (Math.PI / 180) * 90;
    private gapTime = 1;//每1秒 轮一次
    private newDaTime: number = 0;
    private dnum: number = 0;
    private _start: boolean = false;
    public update(delta: number) {
        if (this._start == false) {
            return;
        }
        this.transform.localRotate = this.transform.localRotate + (this.angleSpeed * delta);
        this.transform.markDirty();

        if (this.callBackFun) {
            this.newDaTime += delta;
            if (this.newDaTime >= this.gapTime) {
                this.newDaTime = 0;
                this.dnum++;
                if (this.dnum >= this.timeCallBack)//等了xx秒
                {
                    // console.error("xx秒后回调");
                    this.dnum = 0;
                    this.callBackFun();
                    this.stop();
                }
            }
        }
    }

    public start() {
        this._start = true;
        this.transform.localRotate = 0;
        this.newDaTime = 0;
        this.dnum = 0;
    }
    public stop() {
        this._start = false;
    }
}