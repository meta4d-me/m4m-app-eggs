import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { homePageHandle } from "../homePageHandle";
import { GameMgr } from "../../GameMgr";
import { playerMgr } from "../../role/playerMgr";
import { codePage } from "./codePage";
import { skinShopPage } from "./skinShopPage";
import { inGamePage, showItem } from "./inGamePage";
import { stageMgr } from "../../stageMgr";
import { inviteMgr } from "../../inviteMgr";
import { rankPag } from "./rankPag";
import { inviteFriendsPage } from "./inviteFriendsPage";
import { videoPrizePage } from "./videoPrizePage";
import { stringMgr } from "../../stringMgr";
import { newYearPage } from "./newYearPage";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { wxTool } from "../../Tool/wxTool";
import { saveTool } from "../../Tool/saveTool";
import { UiManager } from "PSDUI/UiManager";
import { AudioMgr } from "audio/AudioMgr";

//首页页面  page
export class homePage implements IPageBase {
    private static _instance: homePage;
    static prefabName: string = `home_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["home", "common"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new homePage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: homePageHandle;
    private animation: any;

    static cacheNewYearPage: newYearPage;
    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(homePage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("homePageHandle") as homePageHandle;
        this.handle.onUpdate = this.update.bind(this);

        this.handle.code.transform.visible = false;
        this.handle.invite.transform.visible = false;
        this.handle.rank.transform.visible = false;
        this.handle.setting.transform.visible = false;
        this.handle.music.transform.visible = false;
        this.handle.skin.transform.visible = false;

        //事件
        // this.handle.setting.addListener(m4m.event.UIEventEnum.PointerClick, this.onSettingClick, this);
        this.handle.invite.addListener(m4m.event.UIEventEnum.PointerClick, this.onInviteClick, this);
        this.handle.rank.addListener(m4m.event.UIEventEnum.PointerClick, this.onRankClick, this);
        this.handle.skin.addListener(m4m.event.UIEventEnum.PointerClick, this.onSkinClick, this);
        this.handle.code.addListener(m4m.event.UIEventEnum.PointerClick, this.onCodeclick, this);
        this.handle.newYear.addListener(m4m.event.UIEventEnum.PointerDown, this.onNerYearClick, this);
        //this.handle.music.addListener(m4m.event.UIEventEnum.PointerClick, this.onMusiclick, this);
        this.handle.startBtn.addListener(m4m.event.UIEventEnum.PointerDown, this.onToStart, this);  //开始游戏

        this.handle.music.onClickFun = () => {
            joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Mute]: 12 }); //数据埋点
        }

        //初次检查
        this.youqingcg();
        this.activits();
        //saveTool.headPortrait();

        this.inited = true;
    }


    private update(d: number) {

        this.countDown(d);
        this.inviteAwardShow(d);
        this.ckShareLs(d);
    }

    private timeRefresh: number = 4;
    private c_Time_R: number = 0;
    //检查每日分享 结果
    private ckShareLs(d: number) {
        this.c_Time_R += d;
        if (GameMgr.netMode && this.c_Time_R >= this.timeRefresh) {
            if (homePage.hello_year) {
                this.pigSkinAndTheme();
            }

            inviteFriendsPage.sharels();

            // inviteFriendsPage.Instance().then(ins => {
            //     ins.sharels();
            // });

            this.c_Time_R = 0;
        }
    }

    ///如果新年分享就可隔段时间刷新
    pigSkinAndTheme() {
        if (wxTool.token == "" || wxTool.token == undefined || wxTool.token == "undefined") return;

        wxTool._loadFun(GameMgr.DNS_AND_PORT + "/newYearSharels?token=" + wxTool.token, function (res) {
            if (!res || !res.data || !res.data.body) return;
            let newYear = res.data.body;
            if (newYear.token && !GameMgr.newYear_inviteSucceed) {
                homePage.Instance().then((ins) => {
                    console.log("newYearSharels--" + ins.handle.transform.visible);
                    //如果是首页则领取!
                    if (ins.handle.transform.visible) {

                        newYearPage.Instance().then((ins) => {

                            ins.show();
                            if (!GameMgr.assetMgr.maploaded[`${ins.Pageurl}`]) return;
                            ins.prize(newYear);
                            homePage.hello_year = false;
                        });


                    }
                });

            }
        }, null);
    }
    //好友邀请奖励弹窗-控制
    inviteAwardShow(d: number) {

        videoPrizePage.Instance().then(ins => {
            if (ins.isContinue) {
                ins.c_Time += d;
                if (ins.c_Time >= 1) {
                    ins.isContinue = false;
                    // console.log("fun执行");
                    ins.fun();
                }
            }
        });



    }

    private static cache_d = 0;
    private static cache_h = 0;
    private static cache_m = 0;
    private static CDText = ""; //倒计时信息
    //获取新春倒记间 xx天xx时
    static getNewYearCDText() {
        if (!this.newYearShare) return this.CDText;
        let end = homePage.newYearShare.end;

        let now = Date.now();
        let t = end - now;
        if (t <= 0) {

            homePage.Instance().then((ins) => {
                ins.handle.newYear.transform.visible = false;
            });
            return;
        }
        this.cache_d = Math.floor(t / this.day);
        t = t - (this.cache_d * this.day);
        this.cache_h = Math.floor(t / this.h);;
        t = t - (this.cache_h * this.h);
        this.cache_m = Math.floor(t / this.m);
        //xx天xx时
        this.CDText = (this.cache_d < 10 ? "0" + this.cache_d : this.cache_d) + stringMgr.tian + (this.cache_h < 10 ? "0" + this.cache_h : this.cache_h) + stringMgr.shi;

        // if (homePage.cacheNewYearPage) {
        //     homePage.cacheNewYearPage.handle.countDown.text = time_lable;
        // } else {
        //     newYearPage.Instance().then((ins) => {
        //         ins.handle.countDown.text = time_lable;
        //     });
        // }

        return this.CDText;
    }

    //获取新春倒记间 xx天xx时xx分 
    static getNewYearCDText_minute() {
        let str = this.getNewYearCDText();
        //xx天xx时xx分 
        str = stringMgr.haiyou + str + (this.cache_m < 10 ? "0" + this.cache_m : this.cache_m) + stringMgr.fen + stringMgr.jiezhi;
        return str;
    }

    private static day: number = 1000 * 60 * 60 * 24;
    private static h: number = 1000 * 60 * 60;
    private static m: number = 1000 * 60;
    private readonly cd = 30;
    private cdCount = 0;
    //春节活动分享倒计时!~!~!~!~!~!~!~!~!~!~!~!
    private countDown(d: number) {
        this.cdCount += d;
        if (this.cdCount < this.cd) return;
        this.cdCount = 0;
        let time_lable = homePage.getNewYearCDText();

        this.handle.newYear_time.text = time_lable;

    }

    /** 
     * 邀请按钮click事件
     */
    onInviteClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");

        console.log("邀请");
        inviteFriendsPage.Instance().then(ins => {
            ins.show();
        });
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.DailyShare]: 6 });
    }
    /** 
     * 打开二维码按钮click事件
     */
    onCodeclick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");

        console.log("打开二维码");
        codePage.Instance().then((ins) => {
            ins.show();
        });
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.QRSkin]: 2 });

    }
    /** 
     * 排行榜按钮click事件
     */
    onRankClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("排行榜");
        rankPag.Instance().then(ins => {

            ins.show();
        });

        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Leaderboard]: 1 });
    }
    /**
     * 皮肤按钮click事件
     */
    onSkinClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");

        console.log("商店");
        skinShopPage.Instance().then((ins) => {
            ins.show();

        });

        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Store]: 3 });
    }
    /**
     * 音乐按钮click事件
     */
    onMusiclick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");


        console.log("音乐");
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Mute]: 4 });
    }

    /**
     * 新春
     */
    onNerYearClick([ev]) {
        this.needTipNY = false;
        if (homePage.cacheNewYearPage) {
            homePage.cacheNewYearPage.show();
        } else {
            newYearPage.Instance().then((ins) => {
                ins.show();
            });
        }
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.NewYearPackage]: 10 }); //数据埋点
    }

    /**
     *  剩余可以用邀请人数
     */
    setCanInviteNum(num) {
        this.handle.canInviteNum.text = num + "";
    }
    /**
     * 是否可以解锁新皮肤
     * 
     * @param isShowNew 是否可以解锁新皮肤
     */
    isShowNewIcon(isShowNew: boolean) {

        this.handle.newSkin.visible = isShowNew;
    }
    private onToStart([ev]) {
        // inGamePage.Instance.setShowItem(showItem.allShow);
        if(!UiManager.isUiShow("Tips")){
            UiManager.hideUi("Main");
            inGamePage.Instance().then((ins) => {
                ins.setShowItem(showItem.allShow);
            });
            stageMgr.replay();
            this.hide();
            console.error(`onToStart`);
            // //走匹配
            // lobbyPage.Instance.show();
    
            //  不走匹配
            // roleData.reqUserData(() => {
            //     // runingPage.Instance.show();
            //     inGamePage.Instance.show();
            //     stageMgr.replay();
            // });
    
            playerMgr.toRaceCount++;
            if (playerMgr.toRaceCount == 1) {  //首次游戏
                joinTool.tdcustomEvent(tdTool.FirstTimeFunnelEvent, tdTool.FirstTimeFunnelEvent, { [tdTool.Clicked_play]: 1 });  //数据埋点
                if (GameMgr.isNewAuth) {
                    joinTool.tdcustomEvent(tdTool.Started_1st_game, tdTool.Started_1st_game);  //数据埋点
                }
            } else if (playerMgr.toRaceCount == 2) { //再次游戏
                joinTool.tdcustomEvent(tdTool.FirstTimeFunnelEvent, tdTool.FirstTimeFunnelEvent, { [tdTool.Tap_to_restart]: 1 });  //数据埋点
            }
    
            joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.GameStart]: 8 });
        }
    }

    /** 显示 开始按钮 */
    setShowStartBtn() {
        if (!this.handle.startBtn) return;
        this.handle.startBtn.transform.parent.visible = true;
    }

    //如果是每日分享被邀请成功....
    private youqingcg() {
        if (wxTool.youqingcg) {
            let gold = inviteMgr.gold[0];
            if (wxTool.isNewPlayer) {
                gold = gold * 2;
            }
            // console.log("新?"+wxTool.isNewPlayer);
            videoPrizePage.Instance().then(ins => {


                ins.show();
                ins.setInfo(gold);
            });

        }
    }

    private activity: any[];
    static beforeActivitys: any[];
    private static hello_year: boolean = false;
    private static newYearShare;//新年分享活动!!!!
    private ckactivitsOnce = false;
    private activits() {
        if (this.ckactivitsOnce) return;
        this.ckactivitsOnce = true;

        //请求最近的活动
        if (!wxTool.token || wxTool.token == "undefined") return;
        wxTool._loadFun(GameMgr.DNS_AND_PORT + "/activity?token=" + wxTool.token, (res) => {
            let body = res.data.body;
            this.activity = body.nowActivitys;
            homePage.beforeActivitys = body.beforeActivitys;
            if (this.activity == null || this.activity.length < 0) return;
            this.activity.forEach(a => {
                homePage.newYearShare = a;
                let now = Date.now();
                if (a.activityName == "newYearShare" && a.end > now && now >= a.start) {

                    homePage.Instance().then((ins) => {
                        ins.handle.newYear.transform.visible = true;
                        ins.cdCount = ins.cd;
                        ins.countDown(0);
                    });
                    let date = new Date();
                    let l = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

                    if (l != saveTool.win_time) {
                        if (!wxTool.isFristLogin) {
                            saveTool.win_time = l;
                            saveTool.savaToNative(null, null);
                        }
                        if (homePage.newYearShare.win_start && now > homePage.newYearShare.win_start && now < homePage.newYearShare.win_end) {
                            // newYearPage.Instance().then((ins) => {
                            //     ins.show();
                            // });

                            this.needTipNY = true;  //需要显示
                            this.tryTipNewYear();
                        }
                    }
                    if (!GameMgr.newYear_inviteSucceed) {


                        //开始
                        homePage.hello_year = true;
                    }
                }
            });
        }, null);
        //let inviteFriendsPage_i = inviteFriendsPage.Instance;
        //inviteFriendsPage_i.sharels();
    }

    private needTipNY = false;
    //尝试显示 新春提示
    private tryTipNewYear() {
        if (wxTool.isFristLogin || !this.needTipNY) return;
        newYearPage.Instance().then((ins) => {
            if (GameMgr.raceStage != 1) {  //不在游戏中 才显示
                this.needTipNY = false;
                ins.show();
            }
        });
    }

    show() {
        this.handle.show();
        this.tryTipNewYear();
    }

    /** 显示并且 设置 ingamePage 的状态 */
    showAndCgInGame() {
        this.show();
        // inGamePage.Instance.setShowItem(showItem.home);
        inGamePage.Instance().then((ins) => {
            ins.setShowItem(showItem.home);
        });
    }

    hide() {
        this.handle.hide();
    }
}