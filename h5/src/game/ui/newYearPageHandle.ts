
import { uiPage, uiPop } from "./base/uiPage"
//新年
@m4m.reflect.node2DComponent
export class newYearPageHandle extends uiPop {
    @m4m.reflect.Field("reference", null, "button")
    bt: m4m.framework.button;
    //关闭
    @m4m.reflect.Field("reference", null, "button")
    close: m4m.framework.button;
    //标题
    @m4m.reflect.Field("reference", null, "image2D")
    title: m4m.framework.image2D;
    @m4m.reflect.Field("reference", null, "image2D")
    title2: m4m.framework.image2D;
    //邀请状态
    @m4m.reflect.Field("reference", null, "image2D")
    state: m4m.framework.image2D;
    //好友的头像
    @m4m.reflect.Field("reference", null, "rawImage2D")
    friend: m4m.framework.rawImage2D;
    //皮肤
    @m4m.reflect.Field("reference", null, "rawImage2D")
    skin: m4m.framework.rawImage2D;
    //主题
    @m4m.reflect.Field("reference", null, "rawImage2D")
    theme: m4m.framework.rawImage2D;
    //邀请
    @m4m.reflect.Field("reference", null, "button")
    invite: m4m.framework.button;
    //再邀请
    @m4m.reflect.Field("reference", null, "button")
    againInvite: m4m.framework.button;
    //体验一下
    @m4m.reflect.Field("reference", null, "button")
    use: m4m.framework.button;
    //倒计时
    @m4m.reflect.Field("reference", null, "label")
    countDown: m4m.framework.label;
    //赠送
    @m4m.reflect.Field("reference", null, "transform2D")
    info2: m4m.framework.transform2D;
    @m4m.reflect.Field("reference", null, "button")
    give: m4m.framework.button;
    @m4m.reflect.Field("reference", null, "button")
    againGive: m4m.framework.button;
    public onPlay() {

    }

    onUpdate: (d: number) => any;
    public update(delta: number) {
        if (this.onUpdate)
            this.onUpdate(delta);
    }
    public remove() {

    }
}


