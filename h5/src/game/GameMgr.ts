import { AudioMgr } from "audio/AudioMgr";
import { FrameMgr } from "Tools/FrameMgr";
import { saveTool } from "./Tool/saveTool";
import { wxTool } from "./Tool/wxTool";

export class GameMgr {
    static raceStage: number = 0;    //0：停止 、1：运行 -1 :结束
    static app: m4m.framework.application;
    static assetMgr: m4m.framework.assetMgr;
    static inputMgr: m4m.framework.inputMgr;
    private static appUpdateFun: any;
    private static nullFun = () => { };
    static init(app: m4m.framework.application) {
        // if(this.developModel){
        //     consTool.init();
        // }
        this.app = app;
        this.appUpdateFun = this.app["update"];
        this.assetMgr = this.app.getAssetMgr();
        this.app.markNotify = () => { }; //不需要广播
        // this.app["updateOrientationMode"] = () => { }; //不需要方向检测 

        this.app.isFrustumCulling = false; //剔除不需要 （会增加消耗）
        this.inputMgr = this.app.getInputMgr();
        this.app.addUserCode(FrameMgr.name);  //帧管理对象创建
        this.engineReplay();
        //wx hide & show
        if (wxTool.wx) {
            // wxTool.wx.onHide(() => { GameMgr.app.bePlay = false; console.error(`game on wx hide`); });
            // wxTool.wx.onShow(() => { GameMgr.app.bePlay = true; console.error(`game on wx show`); });
            wxTool.wx.onHide(() => {
                this.enginePause();
                wxTool.isNewPlayer = false;
                console.error(`game on wx hide`);
                if (this.onGameHide)
                    this.onGameHide();
            });
            wxTool.wx.onShow((res) => {
                this.engineReplay();
                console.error(`game on wx show`);
                console.log(res);
                if (this.onGameShow)
                    this.onGameShow(res);
            });
        }

        if (m4m["gameVersion"]) {
            this.gameVersion = m4m["gameVersion"];
        }
        if (m4m["CDNURL"]) {
            this._CDNURL = m4m["CDNURL"];
        }
        if (m4m["DNS_AND_PORT"]) {
            this.DNS_AND_PORT = m4m["DNS_AND_PORT"];
        }

        /*    saveTool.downLoad(() => {
                console.error("加载save 数据完成！ ");
                //   resolve();
            }, () => {
                //console.error(`加载save 数据失败！ 可能初次需要先保存`);
                //   saveTool.save(() => { }, () => { });
                //   resolve();
            });*/

        //other init
        
    }

    /** 引擎暂停 */
    static enginePause() {
        this.app["update"] = this.nullFun;
    }

    /** 引擎恢复运行 */
    static engineReplay() {
        this.app["update"] = this.appUpdateFun;
        if (this.raceStage === 1) // 如果在游戏中, 恢复背景音乐
            AudioMgr.Play("environment.mp3", true);
    }

    static onGameHide: Function;
    static onGameShow: Function;


    //获取 storge 或者 服务器上的数据
    static downLoadData() {
        // save data
        return new m4m.threading.gdPromise((resolve, reject) => {
            if (!wxTool.wx) {
                resolve();
                return;
            };
            saveTool.downLoad(() => {
                console.error("加载save 数据完成！ ");
                resolve();
            }, () => {
                if (!GameMgr.netMode) {
                    console.error(`加载save 数据失败！ 可能初次需要先保存`);
                    saveTool.save(() => { }, () => { });
                    resolve();
                }

            });
            saveTool.downLoaodNative(null, null);
        });
    }
    //
    //震动开关
    static get swSound() { return saveTool.swSound; };
    static set swSound(val) { saveTool.swSound = val; };

    static get swVibrate() { return saveTool.swVibrate; };
    static set swVibrate(val) { saveTool.swVibrate = val; };

    static get diamond() { return saveTool.diamond; };
    static set diamond(val) { saveTool.diamond = val; };

    static get newRecord() { return saveTool.newRecord; };
    static set newRecord(val) { saveTool.newRecord = val; };

    static get currentLevel() { return saveTool.currentLevel; };
    static set currentLevel(val) { saveTool.currentLevel = val; };
    static get unlockSkins() { return saveTool.unlockSkins; };
    static set unlockSkins(val) { saveTool.unlockSkins = val; };

    static get newYear_invite() { return saveTool.newYear_invite; };
    static set newYear_invite(val) { saveTool.newYear_invite = val; };
    static get newYear_inviteSucceed() { return saveTool.newYear_inviteSucceed; };
    static set newYear_inviteSucceed(val) { saveTool.newYear_inviteSucceed = val; };
    static get unlockTheme() { return saveTool.unlockTheme; };
    static set unlockTheme(val) { saveTool.unlockTheme = val; };


    static get shareActivity() { return saveTool.shareActivity; };
    static set shareActivity(val) { saveTool.shareActivity = val; };

    static get currUseSkin() { return saveTool.currUseSkin; };
    static set currUseSkin(val) { saveTool.currUseSkin = val; };
    static get currUseTheme() { return saveTool.currUseTheme; };
    static set currUseTheme(val) { saveTool.currUseTheme = val; };



    //-----------------
    static readonly gameName = "ballsrace";
    static isNewAuth = false; //是否是 新授权登录（需要点击 微信登录 按钮） 的用户
    static readonly developModel = false; //debuge 模式
    static readonly netMode = true;  //数存储 走网络 或 本地
    static gameVersion: string; // game.js 传入
    static readonly maxLoadingCount = 16;  //max loading progress lines count
    static readonly cubeLayer = 8; //cube terrain layer number
    static readonly limitDtime = 0.06; //dTime limit

    static readonly configPath = `res/config/`;
    static readonly atlasPath = `res/art/atlas/`;
    static readonly TexPath = `res/art/texture/`;
    static readonly UIPath = `res/art/ui/`;
    static readonly propsPath = `res/art/props/`;
    static readonly bgPath = `res/art/img/bg/`;
    static readonly iconPath = `res/art/img/icon/`;
    static readonly fxPath = `res/art/FX/`;
    static readonly audioPath = `res/art/audio/`;
    static readonly fontPath = `res/art/font/`;
    static readonly skinTexPath = `res/art/skin/textures/`;
    static readonly skinIconPath = `res/art/skin/icon/`;
    static readonly themeTexPath = "res/art/theme/textures/";
    static readonly themeIconPath = "res/art/theme/icon/";
    static readonly newYearIconPath = "res/art/newYear/";
    // 是否启用钱包
    public static openWalletBol: boolean = true;
    //是否钱包交互跳转loading
    public static connectWalletLoadingBool: boolean = true;
    static DNS_AND_PORT = "";
    private static _CDNURL: string = "";
    static get CDNURL() { return this._CDNURL; }

    //----------------- tags
    static readonly BoostTag = "BoostTag";
    static readonly CoinTag = "CoinTag";
    static readonly RampTag = "RampTag";

    static readonly WayBunchLength = 100;

}