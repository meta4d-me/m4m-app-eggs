import { IPageBase, uiPage } from "../base/uiPage";
import { launchPageHandle } from "../launchPageHandle";
import { loadingUIMgr } from "../../loadingUIMgr";
import { wxTool } from "../../Tool/wxTool";
//加载loading页面  page
export class launchPage implements IPageBase {
    private static _instance: launchPage;
    static get Instance() {
        if (!this._instance) {
            this._instance = new launchPage();
            this._instance.init();
        }
        return this._instance;
    }

    handle: launchPageHandle;
    private inited = false;
    private init() {
        if (this.inited) return;
        let tempRoot = loadingUIMgr.launch_page.getCloneTrans2D();
        this.handle = tempRoot.getComponent("launchPageHandle") as launchPageHandle;
        //    this.animation = tempRoot.getComponent("uiScaleAnimation") as any;
        //事件
        this.handle.onHide = () => {
            //joinTool.hideBottomAd();

        }

        //  let height = wxTool.getScreenHeightHeight() * 3;

        ////   let l = height / this.handle.transform.height;
        //   console.log(height / l + "??????" + window.innerHeight);
        //  let l = GameMgr.app.width / 720;
        //  l = l < 0 ? 1 : l;

        // this.handle.s.setLayoutValue(m4m.framework.layoutOption.V_CENTER, (150 * window.devicePixelRatio)*l);
        //    this.inited = true;
    }

    static inLoadend = false;
    private static endCallBack: Function;
    /** 加载完成回调 */
    static onLoadend() {
        return new m4m.threading.gdPromise((resolve, reject) => {
            if (launchPage.inLoadend) {
                reject();
                return;
            }

            //检查 是否登录
            // wxTool.showUserInfoBtn(resolve);
            // wxTool.userSetings(resolve);
            this.inLoadend = true;
            this.endCallBack = resolve;
            // this._instance.handle.pergress.transform.visible = false;
            this.endFun();
        });
    }

    //检查 加载过程是否结束
    private static endFun() {
        if (!this.endCallBack || !this.inLoadend || !this.wxAuthOk) return;
        this.endCallBack();
    }

    private static wxAuthOk = false;
    // 获取用户信息 ，授权登录
    private static ckWxAuthorization() {
        wxTool.userSetings(() => {
            this.wxAuthOk = true;
            let img = this._instance.handle.pergress.transform.getComponent("image2D") as m4m.framework.image2D;
            img.updateTran();
            // this._instance.handle.pergress.transform.updateTran(true);
            this._instance.handle.s.visible = false;
            setTimeout(() => {

                this._instance.handle.pergress.transform.visible = true;
                this._instance.handle.s.transform.visible = false;

            }, 0)
            this.endFun();
        }, (isad) => {
            this._instance.handle.pergress.transform.visible = isad;
            this._instance.handle.s.transform.visible = !isad;
        });
    }

    show() {
        this.handle.loadCount = 0;
        this.handle.show();

        launchPage.ckWxAuthorization();
        //  this.playAnimation();
    }
    hide() {
        this.handle.hide();
    }
}