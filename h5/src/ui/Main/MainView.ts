import { AudioMgr } from "audio/AudioMgr";
import { UiManager } from "PSDUI/UiManager";
import { joinTool } from "Tool/joinTool";
import { tdTool } from "Tool/tdTool";
import { homePage } from "ui/pages/homePage";
import { inGamePage, showItem } from "ui/pages/inGamePage";
import { setingPage } from "ui/pages/setingPage";
import { Main } from "./Main";

export class MainView extends Main {
    public static Instance: MainView;
    public onInit() {
        super.onInit();
        // //打开当前界面不影响其他界面 TipPanel
        // this.noAffected = true;
        //屏蔽UI事件
        //多语言版本
        this.onShow = this.onShowFun.bind(this);
        this.onHide = this.onHideFun.bind(this);
        this.onDispose = this.onDisposeFun.bind(this);
        this.set_btn_btnEvent = this.setFun.bind(this);
        this.shop1_btn_btnEvent = this.shopFun.bind(this);
        this.spin_btn_btnEvent = this.spinFun.bind(this);
        this.back_btn_btnEvent = this.backFun.bind(this)
    }
    private onShowFun() {
        // FrameMgr.Add(this.update, this);
    }
    private onHideFun() {
        // FrameMgr.Remove(this.update, this);
    }
    private onDisposeFun() {
    }
    private sliderSpeed = 0.3;
    private sliderRange = 490;

    private backFun(){
        window.open("showroom://");
        setTimeout(() => {
            // 在指定时间后检查是否成功打开了 App，如果没有，则跳转备用 URL
            if (document.hidden) {
                console.log("在指定时间后检查是否成功打开了 App，如果没有，则跳转备用 URL");
            }
        }, 500);
    }
    private tween(p, dis) {
        let mth, tp;
        if (p <= 0.5) {
            mth = m4m.framework.tweenMethod.QuadEaseIn;
            tp = p * 2;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * dis / 2;
        } else {
            mth = m4m.framework.tweenMethod.QuadEaseOut;
            tp = p * 2 - 1;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * dis / 2 + dis / 2;
        }
    }
    private update(delta) {
        this.sliderAnimation(delta);
    }
    private tp = 0;
    private sliderAnimation(delta: number) {
 

        //let len =  this.tween(this.tp,this.sliderRange);
        // if(this.slider.transform.localTranslate.x > this.sliderRange || this.slider.transform.localTranslate.x < 0) {
        //     this.sliderSpeed *= -1;
        // }

    }

    private setFun() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("设置!");

        setingPage.Instance().then(ins => {
            ins.show();
        });
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Setting]: 7 });
    }

    private shopFun() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        UiManager.showUi("Skin");
        inGamePage.Instance().then((ins) => {
            ins.setShowItem(showItem.shop);
        });
        homePage.Instance().then((ins) => {
            ins.hide()
        });
    }

    private spinFun() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        UiManager.showUi("ArchiveSelection");
        inGamePage.Instance().then((ins) => {
            ins.setShowItem(showItem.shop);
        });
        homePage.Instance().then((ins) => {
            ins.hide()
        });
    }
}