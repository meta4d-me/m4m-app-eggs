import { TipsManager } from "Manager/TipsManager";
import { uiLayerType, UiManager } from "PSDUI/UiManager";
import { commTool } from "Tools/commTool";
import { Tips } from "./Tips";
export class TipsView extends Tips {
    public static Instance: TipsView;
    public uiLayer = uiLayerType.poplayer;
    public btn: m4m.framework.button;
    framebtn: m4m.framework.button;
    public onInit() {
        super.onInit();
        // //打开当前界面不影响其他界面 TipPanel
        // this.noAffected = true;
        //屏蔽UI事件
        // commTool.makeUIEventDiscard(this.bg_img.transform);
        this.onShow = this.onShowFun.bind(this);
        this.onHide = this.onHideFun.bind(this);
        this.onDispose = this.onDisposeFun.bind(this);
        this.btn = this.bg_img.transform.addComponent("button") as m4m.framework.button;
        this.btn.addListener(m4m.event.UIEventEnum.PointerClick, this.buttonbgFun, this);
    }
    private onShowFun() {
        // this.text_lab_text(TipsManager.descTips);
        this.frame_img.text_lab.label.text = TipsManager.descTips
    }
    private buttonbgFun() {
        if (TipsManager.tipsbool) {
            UiManager.hideUi("Tips");
        }
    }
    private onHideFun() {
    }
    private onDisposeFun() {
        this.btn.removeListener(m4m.event.UIEventEnum.PointerClick, this.buttonbgFun, this);
    }
}