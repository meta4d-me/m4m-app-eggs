import { uiPop } from "./base/uiPage";

@m4m.reflect.node2DComponent
export class codePageHandle extends uiPop {
    //关闭
    @m4m.reflect.Field("reference", null, "button")
    close: m4m.framework.button;
    @m4m.reflect.Field("reference", null, "rawImage2D")
    img: m4m.framework.rawImage2D;
    @m4m.reflect.Field("reference", null, "button")
    save: m4m.framework.button;
    //防止按钮穿透
    @m4m.reflect.Field("reference", null, "button")
    bt: m4m.framework.button;
    public onPlay() {

    }


    public update(delta: number) {

    }
    public remove() {

    }
}    
