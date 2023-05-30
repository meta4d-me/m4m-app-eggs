import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { stageMgr } from "../../stageMgr";
import { gameOverPageHandle } from "../gameOverPageHandle";
import { homePage } from "./homePage";
import { continuePage } from "./continuePage";
import { stringMgr } from "../../stringMgr";
import { inGamePage, showItem } from "./inGamePage";
import { levelMgr } from "../../levelMgr";
import { skinMgr } from "../../skinMgr";
import { themeMgr } from "../../themeMgr";
import { unlockPage } from "./unlockPage";
import { GameMgr } from "../../GameMgr";
import { videoPrizePage } from "./videoPrizePage";
import { configMgr } from "../../configMgr";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { UiManager } from "PSDUI/UiManager";
import { playerMgr } from "../../role/playerMgr";
import { AudioMgr } from "audio/AudioMgr";

//游戏结束
export class gameOverPage implements IPageBase {
    private static _instance: gameOverPage;
    static prefabName: string = `gameOver_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["gameover"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new gameOverPage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: gameOverPageHandle;
    private inited = false;
    private init() {
        if (this.inited) return;


        let pfb = loadTool.PagePrefeb_map.get(gameOverPage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("gameOverPageHandle") as gameOverPageHandle;
        this.handle.video.transform.visible = false;
        this.handle.share.transform.visible = false;
        this.handle.challenge.transform.visible = false;
        //事件
        //  this.handle.rank.addListener(m4m.event.UIEventEnum.PointerClick, this.onRankClick, this);
        this.handle.share.addListener(m4m.event.UIEventEnum.PointerClick, this.onShareClick, this);

        //   this.handle.video.addListener(m4m.event.UIEventEnum.PointerClick, this.onVideoClick, this);
        this.handle.next.addListener(m4m.event.UIEventEnum.PointerClick, this.onNextClick, this);
        this.handle.again.addListener(m4m.event.UIEventEnum.PointerClick, this.onAgainClick, this);
        this.handle.challenge.addListener(m4m.event.UIEventEnum.PointerClick, this.onChallengeClick, this);
        this.handle.video.addListener(m4m.event.UIEventEnum.PointerClick, this.onVideoClick, this);
        this.inited = true;
        this.handle.nextBallNum.verticalType = m4m.framework.VerticalType.Top;
        this.handle.nextBallNum.horizontalOverflow = false;
        this.handle.nextBallNum.verticalOverflow = true;
        this.handle.nextBallNum.linespace = 1.3;

    }

    private score = 0;
    /**
     * @param ranking 获得的名次
     * @param customs 当前关卡
     * @param ballNum 当前关卡球球数量
     * @param  nextBallNum 下一关球球数量
     * @param isPass 是否通关
     */
    setInfo(ranking: number, customs: number, ballNum: number, nextBallNum: number, isPass: boolean = false) {
        if (customs < levelMgr.levels.length) {
            this.handle.customsNum.text = stringMgr.currentLevel + customs
            this.handle.nextBallNum.text = stringMgr.nextBallAmount + nextBallNum;
        } else {
            this.handle.customsNum.text = stringMgr.finalChallenge;
            this.handle.nextBallNum.text = "";
        }
        this.handle.ranking.text = stringMgr.di + ranking + stringMgr.ming;
        this.handle.ballNum.text = stringMgr.ballAmount + ballNum;
        this.isPassShow(isPass);
        this.score = stageMgr.getScore(customs, ranking);

        console.log(`设置 gameoverpage ${customs} 关 ${ranking}名`);
    }
    static isPass: boolean;

    /**
     * 通关就显示下一关和得分炫耀的按钮,否则显示再来一次和发起挑战按钮
     * @param isPass 是否通关
     */
    isPassShow(isPass: boolean) {
        gameOverPage.isPass = isPass;
        // this.handle.challenge.transform.visible = !isPass;
        this.handle.again.transform.visible = !isPass;
        this.handle.next.transform.visible = isPass;
        // this.handle.share.transform.visible = isPass;
    }

    private Vtrigger = false;
    /** 看视频得金币*/
    private onVideoClick() {
        //看视频获得的金币
        // AudioMgr.setMute(true);

        //configMgr.watchVideo
        this.Vtrigger = false;
        //开始 视频广告 
        joinTool.watchVideo(success => {
            if (!success) return;
            if (this.Vtrigger) return;
            this.Vtrigger = true;

            //看完结束后回调 
            joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.SettlementWatchAdGetFreeGems]: 27 });  //数据埋点


            videoPrizePage.Instance().then(ins => {
                ins.show();
                ins.setInfo(configMgr.watchVideo);
                ins.IsGameOver_homePage(true);
                // AudioMgr.setMute(!GameMgr.swSound);
                ins.show();
            });
        })
    }
    /**
     * 返回首页 点击已经移动ingame了  这里用来重置状态
     */
    static onHomeClick() {
        gameOverPage.endFun();
        AudioMgr.Stop("environment.mp3");
    }
    /** 
     * 过关炫耀
     */
    private onShareClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("过关炫耀");
        //得分炫耀 分享
        joinTool.showOffScore(this.score); //取得分

    }
    /**
     * 下一关
     */
    private onNextClick() {
        AudioMgr.Stop("environment.mp3");
        console.log("下一关!");

        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.WinNextlevel]: 21 }); //数据埋点
        homePage.Instance().then((ins) => {
            ins.showAndCgInGame();
            gameOverPage.endFun(true);
        });
    }
    /**
      * 再来一次
      */
    private onAgainClick() {
        //播放按钮声音
        console.log("再来一次!");
        AudioMgr.Stop("environment.mp3");
        homePage.Instance().then((ins) => {
            ins.showAndCgInGame();
            gameOverPage.endFun();
        });
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.LoseTryonemoretime]: 18 }); //数据埋点
    }

    private static endFun(bool: boolean = false) {
        UiManager.showUi("Main")
        continuePage.recoverCount = 0;
        AudioMgr.Play("touch.mp3");
        AudioMgr.stopAll();
        stageMgr.reState();
        gameOverPage.isCanBuyNewSkin();
        joinTool.hide_item_Ranks();
        //是否随机场景
        if (bool) {
            playerMgr.changeTheme();
        }
    }

    /**
     * 发起挑战
     */
    private onChallengeClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("得分炫耀 分享 发起挑战");
        //得分炫耀 分享
        joinTool.challengeFriend(this.score); //取得分
    }
    /**
     * 是否是新记录
     * @param  isNwe 是否是新纪录
     */
    setIsNewRecord(isNwe: boolean) {
        this.handle.newRecord.visible = isNwe;
    }
    /**
     * 是否有钱买新皮肤
     */

    private static isCanBuyNewSkin() {
        //这次打开游戏是否没显示过?8
        let len = skinMgr.skins.length;
        for (let i = 0; i < len; i++) {
            let skin = skinMgr.skins[i];
            if (!skin) continue;
            if (!GameMgr.unlockSkins[skin.id]) {
                if (skin.deblocking[0] == 1 && skin.deblocking[1] <= GameMgr.diamond) {

                    homePage.Instance().then((ins) => {
                        ins.isShowNewIcon(true);
                    });
                    if (!unlockPage.isCanBuy_noCanShow && gameOverPage.isPass) {
                        unlockPage.Instance().then(ins => {
                            if (GameMgr.raceStage == 1) return;
                            ins.show();
                            ins.setCanBuy(skin);
                        });
                        return;
                    }
                }
            }
        }

        len = themeMgr.themes.length;
        for (let i = 0; i < len; i++) {
            let theme = themeMgr.themes[i];
            if (!theme) continue;
            if (!GameMgr.unlockTheme[theme.id]) {
                if (theme.deblocking[0] == 1 && theme.deblocking[1] <= GameMgr.diamond) {
                    homePage.Instance().then((ins) => {
                        ins.isShowNewIcon(true);
                    });
                    return;
                }
            }
        }

    }
    show() {
        AudioMgr.Stop("environment.mp3");
        // inGamePage.Instance.setShowItem(showItem.gameOver);

        inGamePage.Instance().then((ins) => {
            ins.setShowItem(showItem.gameOver);
        });

        joinTool.show_item_Ranks();
        this.handle.show();
    }
    hide() {

        this.handle.hide();
    }
}