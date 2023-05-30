import { uiPage } from "./base/uiPage";
import { imgNum } from "./base/imgNum";
import { audioHandle } from "./audioHandle";
//首页 handle
@m4m.reflect.node2DComponent
export class homePageHandle extends uiPage {
    //设置
    @m4m.reflect.Field("reference", null, "button")
    setting: m4m.framework.button;
    //邀请
    @m4m.reflect.Field("reference", null, "button")
    invite: m4m.framework.button;
    //排行
    @m4m.reflect.Field("reference", null, "button")
    rank: m4m.framework.button;
    //皮肤
    @m4m.reflect.Field("reference", null, "button")
    skin: m4m.framework.button;
    //二维码
    @m4m.reflect.Field("reference", null, "button")
    code: m4m.framework.button;
    //音乐
    @m4m.reflect.Field("reference", null, "audioHandle")
    music: audioHandle;
    //左右滑动的小手
    @m4m.reflect.Field("reference", null, "image2D")
    slider: m4m.framework.image2D
    //开始按钮
    @m4m.reflect.Field("reference", null, "button")
    startBtn: m4m.framework.button;

    //newYear
    @m4m.reflect.Field("reference", null, "button")
    newYear: m4m.framework.button;
    //新年活动倒计时
    @m4m.reflect.Field("reference", null, "label")
    newYear_time: m4m.framework.label;

    @m4m.reflect.Field("reference", null, "transform2D")
    newYear_gold: m4m.framework.transform2D;

    //可以解锁新皮肤
    @m4m.reflect.Field("reference", null, "transform2D")
    newSkin: m4m.framework.transform2D;

    @m4m.reflect.Field("reference", null, "label")
    canInviteNum: m4m.framework.label;

    public onPlay() {

    }
    private sliderSpeed = 0.3;
    private sliderRange = 490;

    private tween(p, dis) {
        let mth, tp;
        if (p <= 0.5) {
            console.log(p)
            mth = m4m.framework.tweenMethod.QuadEaseIn;
            tp = p * 2;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * dis / 2;
        } else {
            console.log(p)
            mth = m4m.framework.tweenMethod.QuadEaseOut;
            tp = p * 2 - 1;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * dis / 2 + dis / 2;
        }
    }

    onUpdate: (delta: number) => any;

    public update(delta: number) {
        if (this.onUpdate)
            this.onUpdate(delta);
            
        this.sliderAnimation(delta);
    }

    private tp = 0;
    private sliderAnimation(delta: number) {
        if (!this.slider) return;
        this.tp += this.sliderSpeed * delta;
        this.tp = this.tp > 1 ? this.tp - 1 : this.tp;
        let len = 0;
        if (this.tp <= 0.5) {
            len = this.tween(this.tp * 2, this.sliderRange);
        } else {
            len = this.tween((2 - this.tp * 2), this.sliderRange);
        }

        //let len =  this.tween(this.tp,this.sliderRange);
        this.slider.transform.localTranslate.x = len;
        // if(this.slider.transform.localTranslate.x > this.sliderRange || this.slider.transform.localTranslate.x < 0) {
        //     this.sliderSpeed *= -1;
        // }

        this.slider.transform.markDirty();
    }

    public remove() {

    }
}    
