@m4m.reflect.node2DComponent
export class SliderComponent extends m4m.framework.behaviour2d {
    public progressbar: m4m.framework.progressbar;
    public btn: m4m.framework.button;
    protected _transWidth: number;
    public onPlay() {
        //
    }
    public set setSliderBtn(value) {
        if (this.btn) {
            console.error("SliderComponent 组件已设置过按钮对象！");
            return;
        }
        this.btn = value;
        this.btn.addListener(m4m.event.UIEventEnum.PointerDown, this.btnDown_event, this);

        this.progressbar = this.transform.getComponent("progressbar") as m4m.framework.progressbar;
        if (this.progressbar == null) {
            console.error("progressbar 组件未找到！");
            return;
        }
    }

    //按钮 按下
    public btnDown_event() {

    }
}