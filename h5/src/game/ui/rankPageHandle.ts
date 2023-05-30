import { uiPage } from "./base/uiPage"

@m4m.reflect.node2DComponent
export class rankPageHandle extends uiPage {

    @m4m.reflect.Field("reference", null, "button")
    per: m4m.framework.button;
    @m4m.reflect.Field("reference", null, "button")
    next: m4m.framework.button;
    @m4m.reflect.Field("reference", null, "button")
    share: m4m.framework.button;

    // @m4m.reflect.Field("reference", null, "label")
    //diamond: m4m.framework.label;

    public onPlay() {

    }


    public update(delta: number) {

    }
    public remove() {

    }
}    
