import { uiPop } from "./base/uiPage";
import { audioHandle } from "./audioHandle";

@m4m.reflect.node2DComponent
export class settingPageHandle extends uiPop {

    @m4m.reflect.Field("reference", null, "button")
    close: m4m.framework.button;

    //震动
    @m4m.reflect.Field("reference", null, "button")
    shake: m4m.framework.button;
    //音乐
    @m4m.reflect.Field("reference", null, "button")
    music: m4m.framework.button;
    //音效
    @m4m.reflect.Field("reference", null, "audioHandle")
    sound: audioHandle;
    //防止按钮穿透
    @m4m.reflect.Field("reference", null, "button")
    bt: m4m.framework.button;
    // @m4m.reflect.Field("reference", null, "label")
    //diamond: m4m.framework.label;
    //跳转 广告icon
    @m4m.reflect.Field("reference", null, "transform2D")
    icons: m4m.framework.transform2D;

    @m4m.reflect.Field("reference", null, "image2D")
    shakeImg: m4m.framework.image2D;
    public onPlay() {
       
    }
    
    public update(delta: number) {
    }
    public remove() {

    }
}    
