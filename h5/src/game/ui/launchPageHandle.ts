import { uiPage } from "./base/uiPage";

@m4m.reflect.node2DComponent
export class launchPageHandle extends uiPage {

    @m4m.reflect.Field("reference", null, "progressbar")
    pergress: m4m.framework.progressbar;
    @m4m.reflect.Field("reference", null, "button")
    login: m4m.framework.button;

    @m4m.reflect.Field("reference", null, "transform2D")
    s: m4m.framework.transform2D;

    private startPos : m4m.math.vector2; //手 开始的点
    private opt = m4m.framework.layoutOption;
    public onPlay() {
        let v_ = this.s.getLayoutValue(this.opt.V_CENTER)-12;
        let h_ = this.s.getLayoutValue(this.opt.H_CENTER);
        this.startPos = new m4m.math.vector2(v_,h_);
    }

    initY: number = 0;
    carY: number = 10;
    isup: boolean = false;
    disY: number = 0;
    speed = 20;
    private FastLoadTime = 2;  //xx s 加载到 80%
    public loadCount = 0;  //计时器
    private fastRate = 0.8;
    public update(delta: number) {
        if (!this.transform.visible) return;
        this.sliderAnimation(delta);
        this.pergressAnim(delta);
    }
    //进度条动画 
    private pergressAnim(delta: number){
        this.loadCount += delta;
        let p = 0;
        if (this.loadCount <= this.FastLoadTime) {
            p = this.loadCount / this.FastLoadTime * this.fastRate;
        } else {
            p = this.fastRate;
        }
        let addP = this.loadCount / (this.FastLoadTime + this.loadCount);  //饱和增长
        p = (p + addP * (1 - this.fastRate));
        this.pergress.value = p;
    }
    
    private sliderSpeed = 0.5;
    private sliderRange = 50;
    private tp = 0;
    //手指滑动动画
    private sliderAnimation(delta: number) {
        if (!this.s) return;
        this.tp += this.sliderSpeed * delta;
        this.tp = this.tp > 1 ? this.tp - 1 : this.tp;
        let len = 0;
        if (this.tp <= 0.5) {
            len = this.tween(this.tp * 2, this.sliderRange);
        } else {
            len = this.tween((2 - this.tp * 2), this.sliderRange);
        }

        //移动
        this.s.setLayoutValue(this.opt.V_CENTER,this.startPos.x +  len); 
        this.s.setLayoutValue(this.opt.H_CENTER,this.startPos.y +  len); 
        
        // this.s.transform.localTranslate.x = len 
        // this.s.transform.localTranslate.y = len 
        this.s.markDirty();
    }

    
    private tween(p, dis) {
        let mth, tp;
        if (p <= 0.5) {
            mth = m4m.framework.tweenMethod.QuadEaseIn;
            tp = p * 2;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * dis / 2;
        } else {
            mth = m4m.framework.tweenMethod.QuadEaseOut;
            tp = p * 2 - 1;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * dis / 2 + dis / 2;
        }
    }
    public remove() {

    }
}    
