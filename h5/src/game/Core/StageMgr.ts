import { AudioMgr } from "audio/AudioMgr";
import { UiManager } from "PSDUI/UiManager";
import { advMgr } from "Tools/advMgr";
import { FontMgr } from "Tools/fontMgr";
import { gameMathUtil } from "Tools/gameMathUtil";
import { PlatformUtil, PlatformType } from "Tools/PlatformUtil";
import { GameArchiveManagerRequest } from "../AutoCode/Net/ClientRequest/GameArchiveManagerRequest";
import { LoginManagerRequest } from "../AutoCode/Net/ClientRequest/LoginManagerRequest";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { configMgr } from "../configMgr";
import { GameMgr } from "../GameMgr";
import { Inputer } from "../Inputer";
import { idleLoadMgr } from "../Loader/idleLoadMgr";
import { loadingUIMgr } from "../loadingUIMgr";
import { GameDataEventInitManager } from "../Manager/GameDataEventInitManager";
import { MatMgr } from "../MatMgr";
import { obsCreateMgr } from "../obsCreateMgr";
import { PoolMgr } from "../PoolMgr";
import { Ress } from "../Ress";
import { stageMgr } from "../stageMgr";
import { joinTool } from "../Tool/joinTool";
import { launchPage } from "../ui/pages/launchPage";
import { ConnectWalletManager } from "./blockchain/ConnectWalletManager";

export class StageMgr {
    public static get PlayerGUID() { return this._playerGUID; }
    public static init() {
        loadingUIMgr.init();
        GameDataEventInitManager.init();
        //gameMgr
        // GameMgr.init(app);

        // UiManager.showUi(UiNames.Black);

        //加载 用户保存的历时数据 
        // GameMgr.downLoadData().then();
        //test 对接 Res 资源
        // Ress.init().then(launchPage.onLoadend).then(GameMgr.downLoadData).resolve(lodinEnd);
        Ress.seconedLcallBack = () => {
            //材质管理
            MatMgr.init();
            //其他配置初始化
            configMgr.init();
            //障碍生成器
            obsCreateMgr.init();
            //输入管理
            Inputer.init();
            //音频
            AudioMgr.init(GameMgr.audioPath);
            //join init
            joinTool.init();
            //stage init
            // stageMgr.init();
            //内部广告
            advMgr.init();
            //空闲加载管理器
            idleLoadMgr.init();
            launchPage.Instance.hide();
            UiManager.showUi("ArchiveSelection");
        }
        this.resComFun();
    }
    private static serverConnect: boolean = false;
    private static resCom: boolean = false;
    /**已连接上服务器 */
    public static serverConnected() {
        this.serverConnect = true;
        this.enterLogin();
    }

    /**资源加载完毕 可登录 */
    private static resComFun() {
        this.resCom = true;
        this.enterLogin();
    }
    public static defToken: string;
    private static enterLogin() {
        if (this.serverConnect && this.resCom) {
            launchPage.onLoadend();
            if (GameMgr.openWalletBol) {
                ConnectWalletManager.Instance.loginAccount(async (address) => {
                    // let address = res.address;
                    let addr = address;
                    // await ConnectWalletManager.Instance.getM4MComponents(1);
                    LoginManagerRequest.Instance.loginWithOutWallet(addr, "123");
                });
            } else {
                let str: string = "";
                if (this.defToken == null) {
                    //如果不走钱包登录流程 这里改成 直接随一个账号登录  后续 随机的账号应该是用钱包地址
                    //测试
                    let length = gameMathUtil.RandRange(10, 20, true);
                    for (let i = 0; i < length; i++) {
                        str += gameMathUtil.RandRange(0, 10, true);
                    }
                } else {
                    str = this.defToken;
                }
                // console.error("随机账号:", str);
                LoginManagerRequest.Instance.loginWithOutWallet("123456", "123");
            }
        }
    }
    public static isLevelBase: boolean = false;
    public static isSkinBase: boolean = false;
    public static isMainBase: boolean = false;
    public static isThemeBase: boolean = false;
    public static enterBase() {
        if (this.isLevelBase && this.isSkinBase && this.isMainBase && this.isThemeBase) {
            Ress.init().then(() => {  //gdPromise 有问题 故此处理
                GameMgr.downLoadData().then(() => {
                    //配置
                    configMgr.PreInit();
                    //材质管理
                    MatMgr.preInit();
                    //池管理器
                    PoolMgr.init();
                    //font
                    let useBufferMode = PlatformUtil.WXGetSystemPlatformType == PlatformType.iPhone;
                    let isIosBol = PlatformUtil.WXGetSystemPlatformType == PlatformType.iPhone;
                    FontMgr.Instance.init(useBufferMode, isIosBol);
                    //预初始stage 
                    stageMgr.preInit();
                });
            });
        }
    }

    public static onLoginServerSuccess() {
        StageMgr._playerGUID = WsDataManager.UserDataBaseData.token;
        GameArchiveManagerRequest.Instance.getSkinBase();
        GameArchiveManagerRequest.Instance.getLevelBase();
        GameArchiveManagerRequest.Instance.getMainBase();
        GameArchiveManagerRequest.Instance.getThemeBase();
    }
    private static _playerGUID: string = "p:001";
}