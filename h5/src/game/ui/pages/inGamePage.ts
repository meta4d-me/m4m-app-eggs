import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { inGamePageHandle } from "../inGamePageHandle";
import { setingPage } from "./setingPage";
import { stringMgr } from "../../stringMgr"
import { GameMgr } from "../../GameMgr"
import { level, levelMgr } from "../../levelMgr"
import { FrameTimer } from "../../FrameTimer"
import { advMgr } from "../../advMgr";
import { configMgr } from "../../configMgr";
import { ubiAdvIcon } from "../base/ubiAdvIcon";
import { homePage } from "./homePage";
import { gameOverPage } from "./gameOverPage";
import { wxTool } from "../../Tool/wxTool";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { saveTool } from "../../Tool/saveTool";
import { FrameMgr } from "Tools/FrameMgr";
import { AudioMgr } from "audio/AudioMgr";
//游戏中
export class inGamePage implements IPageBase {

    static prefabName: string = `inGame_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["ingame"]; //依赖的 图集资源
    private static _instance: inGamePage;
    static async Instance() {
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new inGamePage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: inGamePageHandle;
    advi: ubiAdvIcon;
    static isGameStart: boolean = false;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(inGamePage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("inGamePageHandle") as inGamePageHandle;
        this.handle.uiLayer = 1;
        this.handle.notHideOnOtherShow = true;
        this.handle.diamond.transform.visible = false;
        //事件
        this.handle.setting.addListener(m4m.event.UIEventEnum.PointerClick, this.onSettingClick, this);
        this.handle.home.addListener(m4m.event.UIEventEnum.PointerClick, this.onHomeClick, this);
        FrameMgr.Add(this.update, this);
        //右上角序列帧广告
        let isAdv = true;
        if (isAdv) {
            //add adv img
            let tran = new m4m.framework.transform2D();
            this.advi = tran.addComponent("ubiAdvIcon") as ubiAdvIcon;
            advMgr.ubiAdv = this.advi;
            if (wxTool.wx && !wxTool.isFristLogin) {
                let opt = m4m.framework.layoutOption;
                let sca = 0.8;
                tran.width = ubiAdvIcon.adv_W * sca;
                tran.height = ubiAdvIcon.adv_H * sca;
                tran.layoutState = opt.RIGHT | opt.V_CENTER;
                tran.pivot.x = tran.pivot.y = 0.5;
                tran.setLayoutValue(opt.V_CENTER, -300);
                this.handle.transform.addChild(tran);

                this.advi.onClickIcon = () => {
                    joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Othergamelink]: 5 }); //数据埋点
                }

                if (advMgr.sequenceAdvD)
                    this.advi.setIcon(advMgr.sequenceAdvD, 5000);

                // if(this.currshowItem != showItem.gameOver && this.currshowItem != showItem.home){
                //     this.advi.transform.visible = false;
                // }
                // //放置到 gamemgr
                // GameMgr.iwyAdvIconObj = this.advi;
                // this.advi.onClickIcon = ()=>{  //icon 点击
                //     joinTool.onIwyAdvIconClick();
                // }

            }
        }
        this.inited = true;
    }



    /** 播放金币收集动画 */
    PlayCoinCollectAnim() {
        AudioMgr.Seek("gold.mp3", 0);
        AudioMgr.Play("gold.mp3");
        wxTool.vibrateShort();
        this.ccAcount = 0;
        this.ccAPlayEnd = false;
    }

    private ccAPlayEnd = true;
    private ccAnimTime = 0.15;
    private ccAcount = 0;
    private maxSize = 1.5;
    private doCollectAnim(d: number) {
        if (this.ccAPlayEnd) return;
        this.ccAcount += d;
        let trans = this.handle.diamond.transform;
        let _s = 1;
        let half = this.ccAnimTime / 2;
        if (this.ccAcount < half) { //放大
            let rate = this.ccAcount / half;
            _s = m4m.math.numberLerp(1, this.maxSize, rate);
        } else if (this.ccAcount < this.ccAnimTime) { //缩小            
            let rate = (this.ccAcount - half) / half;
            _s = m4m.math.numberLerp(this.maxSize, 1, rate);
        } else {
            this.ccAPlayEnd = true;
        }
        trans.localScale.x = trans.localScale.y = _s;
        trans.markDirty();
    }
    static collectCoinsAnim_callfun: () => {};
    /** 收集大量金币 并保存 */
    collectCoinsAnim_save(addDiamond: number) {
        let _old = GameMgr.diamond;
        let _new = _old + addDiamond;
        //金币收集动画
        this.collectCoinsAnim(_old, _new);
        //金币增加动画
        GameMgr.diamond = _new;
        if (inGamePage.collectCoinsAnim_callfun) {
            inGamePage.collectCoinsAnim_callfun();
            inGamePage.collectCoinsAnim_callfun = null;
        }
        saveTool.save(null, null);
    }

    private old_: number = 0;
    private new_: number = 0;
    private readonly minAddingR = 0.02; //最小动画增加率
    /** 收集大量金币 */
    private collectCoinsAnim(old_: number, new_: number) {
        if (this.isDoCCsAnim) return;
        this.old_ = old_;
        this.new_ = new_;
        let count = Math.abs(new_ - old_);
        if (count == 0) return;
        this.isDoCCsAnim = true;
        let addingR = this.ccsATime / count;
        addingR = addingR < this.minAddingR ? this.minAddingR : addingR;
        this.CCsAnimTimeId = FrameTimer.Instance.loop(addingR, this.doCollectCoinsAnim.bind(this));
    }

    private isDoCCsAnim = false;
    private readonly ccsATime = 0.6; //动画总时长
    private ccsACount = 0;
    private CCsAnimTimeId = -1;
    private lastScore = -1;
    private doCollectCoinsAnim(d: number, isend, istick) {
        if (isend) return;
        this.ccsACount += d;
        let rate = this.ccsACount / this.ccsATime;
        let curr = m4m.math.numberLerp(this.old_, this.new_, rate);
        curr = Math.floor(curr);
        if (this.ccsACount >= this.ccsATime) {
            FrameTimer.Instance.stop(this.CCsAnimTimeId);
            this.CCsAnimTimeId = -1;
            this.isDoCCsAnim = false;
            this.ccsACount = 0;
            curr = this.new_;
        }
        if (this.lastScore != curr) {
            this.lastScore = curr;
            this.setDiamond(curr);
            this.PlayCoinCollectAnim();
        }
    }

    /**
     * 进度条
     * @param  value 进度
     */
    setValue(value: number) {
        this.handle.value.value = value;

        this.handle.dot.setLayoutValue(m4m.framework.layoutOption.LEFT, this.handle.progressbarWidth.width);
    }

    /** 设置关卡 */
    setCustoms(value: level) {
        if (value.id < levelMgr.levels.length) {
            this.handle.customs.text = value.stageName;
        } else {
            this.handle.customs.text = stringMgr.finalChallenge;
        }
    }


    private lastNum = -1;
    /** 排名 */
    setSurpassNum(surpassNum: number) {
        if (surpassNum == this.lastNum) return;
        this.lastNum = surpassNum;
        //this.handle.rank_num.setNum(surpassNum); //old
        this.handle.numlabel.text = `${stringMgr.di}${surpassNum}${stringMgr.ming}`;
    }
    /**
     * 设置
     */
    private onSettingClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("设置!");

        setingPage.Instance().then(ins => {
            ins.show();
        });
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Setting]: 7 });
    }
    /**
     * 返回首页
     */
    private onHomeClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("设置!");
        gameOverPage.onHomeClick();

        homePage.Instance().then((ins) => {
            ins.showAndCgInGame();
        });
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Setting]: 7 });
    }

    private currshowItem: showItem = showItem.home;
    /** 设置显示状态 */
    setShowItem(item) {
        this.updateData();
        this.isMove = false;
        inGamePage.isGameStart = false;
        this.handle.setting.transform.visible = false;
        this.handle.progressbar.transform.visible = false;
        //this.handle.rank.transform.visible = false;
        this.handle.numlabel.transform.visible = false;
        this.handle.customs.transform.visible = false;
        this.advi.transform.visible = false;
        this.handle.home.transform.visible = false;

        switch (item) {
            case showItem.shop:

                break;
            case showItem.Rank:

                this.handle.home.transform.visible = true;
                break;
            case showItem.gameOver:
                AudioMgr.setMute(!GameMgr.swSound);
                this.handle.home.transform.visible = true;
                this.advi.transform.visible = true;
                this.isBannerVisible = true;
                this.showBanner("adunit-118f3874747e250d");
                if (configMgr.needRefreshADBanner) {
                    joinTool.reMakeBottomAds();//重建 新广告
                }
                break;
            case showItem.continu:
                this.showBanner("adunit-118f3874747e250d");
                console.log("继续");
                break;
            case showItem.home:
                // console.log("??"+GameMgr.swSound);
                AudioMgr.stopAll();
                AudioMgr.setMute(!GameMgr.swSound);
                joinTool.hide_item_Ranks();
                this.advi.transform.visible = true;
                this.handle.customs.transform.setLayoutValue(this.opt.TOP, 210);
                this.handle.customs.transform.visible = true;
                this.setValue(0);
                this.handle.setting.transform.visible = false;
                this.handle.progressbar.transform.visible = true;
                this.handle.progressbar.setLayoutValue(this.opt.TOP, this.maxTopY);
                break;
            case showItem.allShow:

                console.log("游戏中");
                this.showBanner("adunit-95c314f355907cd5");
                this.handle.customs.fontsize = 30;
                this.handle.customs.transform.setLayoutValue(this.opt.TOP, 90);
                this.isMove = true;
                inGamePage.isGameStart = true;
                this.handle.progressbar.transform.visible = true;
                break;
        }
    }
    private isMove: boolean = false;
    private minTopY: number = 100;
    private maxTopY: number = 230.00;
    private minTopY_: number = 115;
    private maxTopY_: number = 275.00;
    private opt = m4m.framework.layoutOption;
    private ySpeed: number = 400;
    moveRankNumHeight: number = 65;
    private update(d: number) {
        this.doProgressBarAnim(d);
        this.doCollectAnim(d);
    }

    //顶部进度条 移动动画
    private doProgressBarAnim(d: number) {
        if (this.isMove) {
            let speed = this.handle.progressbar.getLayoutValue(this.opt.TOP) - this.ySpeed * d;
            this.handle.progressbar.setLayoutValue(this.opt.TOP, Math.max(speed, this.minTopY));
            if (speed <= this.minTopY) {
                // this.handle.rank.visible = true;
                this.isMove = false;
                this.handle.customs.transform.visible = true;
                this.handle.customs.fontsize = 40;
                //显示 排名
                this.handle.numlabel.transform.visible = true;
            }
        }
    }

    /**
     * 拥有的钻石
     */
    private setDiamond(diamond: number) {
        this.handle.diamond.text = diamond + "";
        this.handle.diamond.transform.markDirty();
    }
    /**
     * 更新钻石等信息
     */
    updateData() {
        this.setDiamond(saveTool.diamond);
    }
    show() {
        this.handle.show();
    }

    hide() {
        this.handle.hide();
    }

    isBannerVisible = false;
    showBanner(bannerId) {
        if (this.isBannerVisible) {

            joinTool.showBottomAd(bannerId);
        }
        // this.handle.banner.transform.visible = true;
    }



}

export enum showItem {
    home,
    allShow,
    gameOver,
    continu,
    shop,
    Rank


}