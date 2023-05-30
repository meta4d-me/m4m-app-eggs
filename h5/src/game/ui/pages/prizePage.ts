import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { stageMgr } from "../../stageMgr";
import { GameMgr } from "../../GameMgr";
import { prizePageHandle } from "../prizePageHandle";
import { gameOverPage } from "./gameOverPage";
import { stringMgr } from "../../stringMgr";
import { victoryPage } from "./victoryPage";
import { inGamePage } from "./inGamePage";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { AudioMgr } from "audio/AudioMgr";

//通关奖励面板
export class prizePage implements IPageBase {

    static prefabName: string = `prize_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["prize"]; //依赖的 图集资源
    private static _instance: prizePage;
    static async Instance() {
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);
            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new prizePage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: prizePageHandle;
    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(prizePage.prefabName);

        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("prizePageHandle") as prizePageHandle;

        //点击过滤
        let fullBtn = this.handle.transform.getComponent("button") as m4m.framework.button;
        fullBtn.addListener(m4m.event.UIEventEnum.PointerClick, () => { }, this);
        fullBtn.addListener(m4m.event.UIEventEnum.PointerDown, () => { }, this);
        //事件
        this.handle.close.addListener(m4m.event.UIEventEnum.PointerClick, this.onCloseClick, this);
        this.handle.video.addListener(m4m.event.UIEventEnum.PointerClick, this.onSeeVideoClick, this);
        this.handle.video_x3.addListener(m4m.event.UIEventEnum.PointerClick, this.onX_3SeeVideoClick, this);
        this.inited = true;
    }


    diamond: number;
    victory: boolean;
    minDiamond: number = 5;
    /**
     * @param diamond 钻石
     * @paran  victory 是否通关了
     */
    setInfo(diamond: number, victory: boolean) {
        this.victory = victory;
        if (diamond < this.minDiamond) {
            this.end();
        }
        // let l = levelMgr.levels[customs];
        //领取一次金币
        //  this.setDiamondNum(l.reward);
        this.setDiamondNum(diamond);
        this.handle.video_x3.transform.visible = victory;
        this.handle.video.transform.visible = !victory;
        //this.prizeDiamond(this.diamond);
        //this.handle.customs.text = stringMgr.benju+stringMgr.gain+ (customs + 1) + stringMgr.diamond;
    }
    /**
  * @param diamond 钻石
 
  */
    private setDiamondNum(diamond: number) {
        this.diamond = diamond;
        this.handle.info.text = stringMgr.benju + stringMgr.gain + diamond + stringMgr.diamond;

    }

    private Vtrigger = false;  
    /**
     *  2x看视频
     */
    private onSeeVideoClick() {
        AudioMgr.Stop("environment.mp3");
        // AudioMgr.Stop();
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        AudioMgr.setMute(true);
        console.log("再来一次!");
        this.Vtrigger = false;  
        joinTool.watchVideo(success => {
            if (!success) return;
            if(this.Vtrigger ) return;
            this.Vtrigger = true;
            //看视频成功
            //看完视频再领取一次钻石
            //临时 处理 ，直接领取
            this.prizeDiamond(this.diamond); //再领一次 == * 2
            this.end();
            AudioMgr.setMute(!GameMgr.swSound);
            //回调成功
            joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.LoseWatchAdToGetDouble]: 19 }); //数据埋点
        })

    }
    /**
    *  3x看视频
    */
    private onX_3SeeVideoClick() {
        AudioMgr.Stop("environment.mp3");
        AudioMgr.setMute(true);
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        AudioMgr.stopAll();
        console.log("再来一次!");
        this.Vtrigger = false;  
        joinTool.watchVideo(success => {
            if (!success) return;
            if(this.Vtrigger ) return;
            this.Vtrigger = true;
            //看视频成功
            //看完视频再领取一次钻石
            //临时 处理 ，直接领取
            this.prizeDiamond(this.diamond * 2); //
            this.end();
            // //回调成功
            AudioMgr.setMute(!GameMgr.swSound);
            joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.WinWatchAdToGetTriple]: 20 }); //数据埋点
        })

    }
    /**
     * 领取金币
     */
    private prizeDiamond(diamond: number) {
        AudioMgr.stopAll();
        // inGamePage.Instance.collectCoinsAnim_save(diamond);
        inGamePage.Instance().then((ins) => {
            ins.collectCoinsAnim_save(diamond);
        });
    }
    /**
     * 关闭
     */
    private onCloseClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("再来一次!");
        this.end();
    }

    private end() {
        this.hide();
        AudioMgr.Stop("environment.mp3");
        victoryPage.Instance().then(ins => {

            ins.hide();
        });
        gameOverPage.Instance().then((ins) => {
            ins.show();
            ins.isPassShow(this.victory);
        });

        stageMgr.hideCPLevelFx();
    }

    show() {


        console.log("音乐停止!");
        this.handle.video.transform.visible = true;
        this.handle.show();
    }

    hide() {
        this.handle.hide();
    }



}