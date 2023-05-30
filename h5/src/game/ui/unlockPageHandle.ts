import { uiPop } from "./base/uiPage";

@m4m.reflect.node2DComponent
export class unlockPageHandle extends uiPop {

    @m4m.reflect.Field("reference", null, "button")
    bt: m4m.framework.button;
    //设置
    @m4m.reflect.Field("reference", null, "button")
    close: m4m.framework.button;
    //金币不足
    @m4m.reflect.Field("reference", null, "transform2D")
    insufficient: m4m.framework.transform2D;
    //购买
    @m4m.reflect.Field("reference", null, "transform2D")
    purchase: m4m.framework.transform2D;
    //获的
    @m4m.reflect.Field("reference", null, "transform2D")
    acquisition: m4m.framework.transform2D;
    //皮肤
    @m4m.reflect.Field("reference", null, "transform2D")
    skin: m4m.framework.transform2D;
    //主题
    @m4m.reflect.Field("reference", null, "transform2D")
    theme: m4m.framework.transform2D;
    //看视频的皮肤
    @m4m.reflect.Field("reference", null, "transform2D")
    video: m4m.framework.transform2D;
    //看视频进度条
    @m4m.reflect.Field("reference", null, "progressbar")
    video_pd: m4m.framework.progressbar;
    //看视频得皮肤得按钮
    @m4m.reflect.Field("reference", null, "button")
    seeVideo: m4m.framework.button;
    //看了几个视频
    @m4m.reflect.Field("reference", null, "label")
    seeVideoNum: m4m.framework.label;


    //看视频
    @m4m.reflect.Field("reference", null, "button")
    video_bt: m4m.framework.button;

    //购买按钮
    @m4m.reflect.Field("reference", null, "button")
    purchase_bt: m4m.framework.button;
    //价格
    @m4m.reflect.Field("reference", null, "label")
    price: m4m.framework.label;
    //获得XX皮肤
    @m4m.reflect.Field("reference", null, "label")
    skinInfo: m4m.framework.label;
    //分享按钮
    @m4m.reflect.Field("reference", null, "button")
    share_bt: m4m.framework.button;
    //皮肤图标
    @m4m.reflect.Field("reference", null, "rawImage2D")
    skin_icon: m4m.framework.rawImage2D;
    //主题图标
    @m4m.reflect.Field("reference", null, "rawImage2D")
    theme_icon: m4m.framework.rawImage2D;
    //可以购买
    @m4m.reflect.Field("reference", null, "transform2D")
    canBuy: m4m.framework.transform2D;
    //按钮
    @m4m.reflect.Field("reference", null, "button")
    canBuy_bt: m4m.framework.button;

    public onPlay() {

    }


    public update(delta: number) {

    }
    public remove() {

    }
}


