import { uiPage } from "./base/uiPage";

@m4m.reflect.node2DComponent
export class continuePageHandle extends uiPage {
    //设置
    //continue
    @m4m.reflect.Field("reference", null, "button")
    continue_: m4m.framework.button;
    //拒绝按钮
    @m4m.reflect.Field("reference", null, "button")
    no_: m4m.framework.button;
    //
    @m4m.reflect.Field("reference", null, "label")
    info: m4m.framework.label;
    //
    @m4m.reflect.Field("reference", null, "rawImage2D")
    head: m4m.framework.rawImage2D;
    //
    @m4m.reflect.Field("reference", null, "image2D")
    countDown: m4m.framework.image2D;

    public onPlay() {

    }


    public update(delta: number) {

    }
    public remove() {

    }
}    
