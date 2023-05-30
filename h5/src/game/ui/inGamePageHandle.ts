import { uiPage, uiPop } from "./base/uiPage";
@m4m.reflect.node2DComponent
export class inGamePageHandle extends uiPage {
    //设置
    @m4m.reflect.Field("reference", null, "button")
    setting: m4m.framework.button;
    //返回首页按钮
    @m4m.reflect.Field("reference", null, "button")
    home: m4m.framework.button;
    //进度条
    @m4m.reflect.Field("reference", null, "progressbar")
    value: m4m.framework.progressbar;
    //
    @m4m.reflect.Field("reference", null, "transform2D")
    progressbarWidth: m4m.framework.transform2D;
    //
    @m4m.reflect.Field("reference", null, "transform2D")
    dot: m4m.framework.transform2D;
    //金币
    @m4m.reflect.Field("reference", null, "label")
    diamond: m4m.framework.label;
    //
    @m4m.reflect.Field("reference", null, "transform2D")
    progressbar: m4m.framework.transform2D;
    //关卡label
    @m4m.reflect.Field("reference", null, "label")
    customs: m4m.framework.label;
    //测试广告条
    @m4m.reflect.Field("reference", null, "image2D")
    banner: m4m.framework.image2D;
    //玩家名次显示 label
    @m4m.reflect.Field("reference", null, "label")
    numlabel: m4m.framework.label;
    
    public onPlay() {

    }

    public update(delta: number) {

    }
    public remove() {

    }
}    
