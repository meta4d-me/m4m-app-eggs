import { GameMgr } from "GameMgr";
import { uiLayerType } from "PSDUI/UiManager";
import { CTimer } from "Time/CTimer";
import { commTool } from "Tools/commTool";
import { FrameMgr } from "Tools/FrameMgr";
import { wloading } from "./wloading";
/*加载符号界面*/
export class wloadingView extends wloading {
    public static Instance: wloadingView;
    public uiLayer = uiLayerType.poplayer;
    private countNum = 0;
    private roateSpeed: any;
    private startTimeCD: number = 0;
    private timeOutNum: number = 20000;
    public onInit() {
        super.onInit();
        // //打开当前界面不影响其他界面 TipPanel
        this.noAffected = true;
        //屏蔽UI事件
        commTool.makeUIEventDiscard(this.gamebg.transform);
        this.symbol_img.transform.pivot.x = 0.5;
        this.symbol_img.transform.pivot.y = 0.5;
        this.onShow = this.onShowFun.bind(this);
        this.onHide = this.onHideFun.bind(this);
        this.onDispose = this.onDisposeFun.bind(this);
        this.countNum = 0;
        this.roateSpeed = Math.PI * 2.5 / 180;
    }
    private upDateFun(del) {
        this.countNum += 1;
        this.symbol_img.transform.localRotate = this.roateSpeed * this.countNum;
        this.symbol_img.transform.markDirty();
    }
    private startTimeCDFun() {
        this.stopTimeCd();
        this.startTimeCD = CTimer.Instance.loopTimeUpdate(this.timeOutNum, this.cdUpdateFun.bind(this));
    }
    private stopTimeCd() {
        if (this.startTimeCD != -1) {
            CTimer.Instance.stop(this.startTimeCD);
        }
    }
    private cdUpdateFun() {
        // UITipManager.Instance.tipPanelText = "Load timeout\nplease refresh the page and re-enter the game";
        // UITipManager.Instance.type = TipPanelType.mistake;
        // UIOpenOrHideManager.Instance.OpenTipsTCView();
    }
    private onShowFun() {
        FrameMgr.Add(this.upDateFun, this);
        if (!GameMgr.connectWalletLoadingBool) {
            this.startTimeCDFun();
        }
    }
    private onHideFun() {
        FrameMgr.Remove(this.upDateFun, this);
        this.stopTimeCd();
    }
    private onDisposeFun() {
    }
}