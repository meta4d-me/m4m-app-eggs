import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { videoPrizePageHandle } from "../videoPrizePageHandle";
import { homePage } from "./homePage";
import { stringMgr } from "../../stringMgr";
import { GameMgr } from "../../GameMgr";
import { stageMgr } from "../../stageMgr";
import { inviteMgr } from "../../inviteMgr";
import { inGamePage } from "./inGamePage";
import { gameOverPage } from "./gameOverPage";
import { saveTool } from "../../Tool/saveTool";
import { AudioMgr } from "audio/AudioMgr";
//排行榜

export class videoPrizePage implements IPageBase {

    private static _instance: videoPrizePage;
    static prefabName: string = `videoPrize_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["videoPrize"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new videoPrizePage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }
    //
    handle: videoPrizePageHandle;
    fun: Function;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(videoPrizePage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("videoPrizePageHandle") as videoPrizePageHandle;
        //事件
        this.handle.close.addListener(m4m.event.UIEventEnum.PointerClick, this.onCloseClick, this);
        this.handle.homePage.addListener(m4m.event.UIEventEnum.PointerDown, this.onHomePageClick, this);
        this.handle.bt.addListener(m4m.event.UIEventEnum.PointerDown, function () { }, this);
        this.inited = true;

    }

    setInfo(num: number, fun: Function = null) {
        this.fun = fun;
        // inGamePage.Instance.collectCoinsAnim_save(num);
        inGamePage.Instance().then((ins) => {
            ins.collectCoinsAnim_save(num);
        });
        this.handle.info.text = stringMgr.gained + num + stringMgr.diamond;
    }
    fun1: Function;
    //设置回调
    setfun(fun: Function) {
        this.fun1 = fun;
    }
    isGame_Over: boolean;
    /**
     * 结算界面的返回首页
     */
    IsGameOver_homePage(isGame_Over: boolean) {
        this.isGame_Over = isGame_Over;
    }
    /**
     *  返回首页
     */
    private onHomePageClick() {
        this.hide();
        if (GameMgr.raceStage == 1) return;
        //播放按钮声音
        AudioMgr.Play("touch.mp3");


        if (this.isGame_Over) {
            gameOverPage.onHomeClick();
            this.isGame_Over = false;
        }

        homePage.Instance().then(ins => {
            ins.showAndCgInGame();
        })

    }
    /**
     * 关闭
     */
    private onCloseClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");

        this.hide();
    }

    show() {
        this.handle.show();

    }
    isContinue: boolean = false;
    c_Time: number = 0;

    hide() {
        if (this.fun) {
            this.c_Time = 0;
            this.isContinue = true;
        }
        this.handle.hide();
    }

    static hasShareCP = false;
    //分享卡片参数 
    static shareCardParams() {
        this.hasShareCP = true;
        if (!stageMgr.inited) return;
        //弹出面板
        videoPrizePage.Instance().then(ins => {
            ins.show();

            let l = inviteMgr.gold[0];
            
            ins.setInfo(l);
            saveTool.save(null, null);
        });
    }

}