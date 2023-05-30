import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { continuePageHandle } from "../continuePageHandle";

import { GameMgr } from "../../GameMgr";
import { MatMgr } from "../../MatMgr";
import { stageMgr } from "../../stageMgr";
import { playerMgr } from "../../role/playerMgr"
import { prizePage } from "./prizePage";
import { inGamePage, showItem } from "./inGamePage";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { FrameMgr } from "Tools/FrameMgr";
import { AudioMgr } from "audio/AudioMgr";

//继续
export class continuePage implements IPageBase {

    private static _instance: continuePage;
    static prefabName: string = `continue_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["continue"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new continuePage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: continuePageHandle;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(continuePage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("continuePageHandle") as continuePageHandle;
        //事件
        this.handle.continue_.addListener(m4m.event.UIEventEnum.PointerClick, this.onContinueGameClick, this);
        this.handle.no_.addListener(m4m.event.UIEventEnum.PointerClick, this.onNoClick, this);
        // this.handle.setting.addListener(m4m.event.UIEventEnum.PointerClick, this.onSettingClick, this);
        this.inited = true;
        FrameMgr.Add(this.update, this);


    }
    private update(d: number) {
        this.updateReLiveBtn(d);
    }


    setInfo(info: string) {
        this.handle.info.text = info;
    }

    //设置
    private onSettingClick() {
        //  setingPage.Instance.show();
    }

    private Vtrigger = false;     
    //游戏继续
    private onContinueGameClick() {
        //播放按钮声音
       AudioMgr.Play("touch.mp3");        
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.LoseWatchAdToContinue]: 17 }); //数据埋点 
        GameMgr.enginePause();
        this.Vtrigger = false;       
        joinTool.watchVideo(success => {
              GameMgr.engineReplay();    
            if(!success)  return;
                
               
           
            if(this.Vtrigger ) return;
            this.Vtrigger = true;
            
             
            this.isStop = true;
            console.log("我复活啦!");
            // inGamePage.Instance.setShowItem(showItem.allShow);
            // inGamePage.Instance().then((ins) => {
            //     ins.setShowItem(showItem.allShow);
            // });
            joinTool.hide_item_Ranks();
            console.log("游戏继续");
            this.relivePlayer();
        })
    }


    private isStop: boolean = true;
    private readonly showPoint: number = 1.2; //出现图标的时间
    private readonly waiteTime: number = 8 + this.showPoint; //总共等待的时长
    private readonly noShowWaiteT: number = 0.5; //跳过按钮出现等待时间
    private count: number = 0;
    //复活按钮倒计时
    private updateReLiveBtn(d: number) {
        if (this.isStop) return;
        this.count += d;
        let hd = this.handle;
        if (this.count > this.showPoint && this.count <= this.waiteTime) {
            //跳过按钮show
            if (!hd.no_.transform.visible && this.count > (this.showPoint + this.noShowWaiteT)) {
                hd.no_.transform.visible = true;
            }
            //复活按钮show
            if (!hd.continue_.transform.visible)
                hd.continue_.transform.visible = true;
            hd.countDown.fillAmmount = Math.max(1 - ((this.count - this.showPoint) / (this.waiteTime - this.showPoint)), 0);
        } else if (this.count > this.waiteTime) {
            this.onNoClick();
        }
    }

    private hideAllBtn() {
        this.handle.continue_.transform.visible = false;
        this.handle.no_.transform.visible = false;
    }

    static recoverCount = 0;  //复活次数
    //复活玩家
    public relivePlayer() {
        continuePage.recoverCount++;
        // inGamePage.Instance.show();
        // inGamePage.Instance().then((ins) => {
        //     ins.show();
        // });
        MatMgr.relive();
        playerMgr.relive();

        // this.show();

        AudioMgr.Play("environment.mp3", true);
    }

    //点击拒绝
    private onNoClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        this.isStop = true;
        let currentlevel = stageMgr.currentLevel.id + 1; // 当前关卡 (1 indexed)
        let prole = playerMgr.getRole();
        stageMgr.settlement(currentlevel, stageMgr.dieRanking); //第一次死亡不 复活结算
        joinTool.hide_nextSurpass();
        // gameOverPage.Instance.show();
        prizePage.Instance().then((ins) => {
            ins.show();
            ins.setInfo(stageMgr.gameDiamond, false);
        });
        // saveTool.d

        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.LoseNoThanks]: 16 }); //数据埋点

    }
    /**
     * 显示下一个超越的对象
     * @param score 分数
     */
    private setMyScore_showNext(score: number) {
     //   if (continuePage.recoverCount < ) {
            joinTool.nextSurpass(score);
     //   }

    }
    show() {
        this.hideAllBtn();
        this.isStop = false;
        this.count = 0;
        AudioMgr.Stop("environment.mp3");
        // inGamePage.Instance.setShowItem(showItem.continu);
        // inGamePage.Instance().then((ins) => {
        //     ins.setShowItem(showItem.continu);
        // });

        let score = stageMgr.getScore(GameMgr.currentLevel + 1, playerMgr.getRole().rankNum);

        //   console.log(GameMgr.currentLevel + 1 + "----" + playerMgr.getRole().rankNum + "------" + score);

        this.setMyScore_showNext(score);
        this.handle.show();
    }
    hide() {
        this.handle.hide();
    }



}