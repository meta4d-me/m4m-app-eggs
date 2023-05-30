import { uiPage } from "./base/uiPage"

@m4m.reflect.node2DComponent
export class prizePageHandle extends uiPage {
    //设置
    @m4m.reflect.Field("reference", null, "button")
    close: m4m.framework.button;

    @m4m.reflect.Field("reference", null, "button")
    video: m4m.framework.button;
    @m4m.reflect.Field("reference", null, "label")
    customs: m4m.framework.label;

    @m4m.reflect.Field("reference", null, "label")
    info: m4m.framework.label;

    @m4m.reflect.Field("reference", null, "transform2D")
    aureole: m4m.framework.transform2D;

    @m4m.reflect.Field("reference", null, "button")
    video_x3: m4m.framework.button;

    public onPlay() {

    }
    aRound: number = (Math.PI / 180) * 360;
    angleSpeed: number = (Math.PI / 180) * 90;

    public update(delta: number) {
        this.aureole.localRotate = this.aureole.localRotate + (this.angleSpeed * delta);
        this.aureole.localRotate = this.aureole.localRotate % this.aRound;
        this.aureole.markDirty();
    }
    public remove() {

    }
}


