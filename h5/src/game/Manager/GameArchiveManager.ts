import { GameArchiveData } from "GameArchiveData";
import { UiDataManager } from "PSDUI/UiDataManager";
import { UiManager } from "PSDUI/UiManager";
import { UploadIpfsData } from "UploadIpfsData";
import { GameArchiveDataEvent } from "../AutoCode/Net/DataEvents/GameArchiveDataEvent";
import { LevelBaseEvent } from "../AutoCode/Net/DataEvents/LevelBaseEvent";
import { MainBaseEvent } from "../AutoCode/Net/DataEvents/MainBaseEvent";
import { SkinBaseEvent } from "../AutoCode/Net/DataEvents/SkinBaseEvent";
import { ThemeBaseEvent } from "../AutoCode/Net/DataEvents/ThemeBaseEvent";
import { UploadIpfsDataEvent } from "../AutoCode/Net/DataEvents/UploadIpfsDataEvent";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { ConnectWalletManager } from "../Core/blockchain/ConnectWalletManager";
import { StageMgr } from "../Core/StageMgr";
import { BindKeyName } from "../Data/BindKeyName";
import { GameMgr } from "../GameMgr";
import { Ress } from "../Ress";
import { playerMgr } from "../role/playerMgr";
import { stageMgr } from "../stageMgr";
import { homePage } from "../ui/pages/homePage";
import { inGamePage } from "../ui/pages/inGamePage";
import { launchPage } from "../ui/pages/launchPage";
import { PhotoSceneManager } from "./PhotoSceneManager";

export class GameArchiveManager {
    public static get Instance(): GameArchiveManager {
        if (this._instance == null) {
            this._instance = new GameArchiveManager();
        }
        return this._instance;
    }

    public isArchive: boolean = false;
    public GameArchiveData: GameArchiveData;

    public isLevel = 2;
    private static _instance: GameArchiveManager;
    public init() {
        WsDataManager.LevelBaseData.addEventListener(LevelBaseEvent.ChangeList, this.levelFunbind.bind(this));
        WsDataManager.SkinBaseData.addEventListener(SkinBaseEvent.ChangeList, this.skinFunbind.bind(this));
        WsDataManager.MainBaseData.addEventListener(MainBaseEvent.ChangeList, this.mainFunbind.bind(this));
        WsDataManager.ThemeBaseData.addEventListener(ThemeBaseEvent.ChangeList, this.themeFunbind.bind(this));
        WsDataManager.GameArchiveDataData.addEventListener(GameArchiveDataEvent.All, this.gameArchiveFunbind.bind(this));
        WsDataManager.GameArchiveDataData.addEventListener(GameArchiveDataEvent.baseData, this.baseDataFun.bind(this));
        WsDataManager.GameArchiveDataData.addEventListener(GameArchiveDataEvent.ism4mnft, this.ism4mNFTFun.bind(this));
        WsDataManager.GameArchiveDataData.addEventListener(GameArchiveDataEvent.Currentlevel, this.CurrentlevelFun.bind(this));
        WsDataManager.UploadIpfsDataData.addEventListener(UploadIpfsDataEvent.All, this.UploadIpfsFun.bind(this));
    }

    public levelFunbind(data) {
        // console.error("level:", data);
        Ress.levelConfig = data;
        StageMgr.isLevelBase = true;
        StageMgr.enterBase();
    }

    public skinFunbind(data) {
        // console.error("skin:", data);
        Ress.skinConfig = data;
        StageMgr.isSkinBase = true;
        StageMgr.enterBase();
        ConnectWalletManager.Instance.judgeNFT(data);
    }

    public mainFunbind(data) {
        // console.error("main:", data);
        Ress.mainConfig = data;
        StageMgr.isMainBase = true;
        StageMgr.enterBase();
    }

    public themeFunbind(data) {
        // console.error("theme:", data);
        Ress.themeConfig = data;
        StageMgr.isThemeBase = true;
        StageMgr.enterBase();
    }

    public gameArchiveFunbind(data) {
        if (!GameArchiveManager.Instance.GameArchiveData) {
            GameArchiveManager.Instance.GameArchiveData = data;
            stageMgr.init();
            UiManager.showUi("Main");
            inGamePage.Instance()
                .then((ins) => {
                    ins.show();
                    homePage.Instance()
                        .then((res) => {
                            res.showAndCgInGame();
                            // // 初始化 分享 卡片绘制 canvas
                            // joinTool.screenshotcanvasInit();
                        });
                });
        } else {
            GameArchiveManager.Instance.GameArchiveData = data;
            let game = GameArchiveManager.Instance.GameArchiveData;
            playerMgr.changeSkin(game.baseData.id);
            playerMgr.changeTheme();
            GameMgr.currentLevel = Number(GameArchiveManager.Instance.GameArchiveData.Currentlevel.id) - 1;
            GameMgr.raceStage = -1;
            stageMgr.reState();
            UiManager.hideUi("ArchiveSelection");
            launchPage.Instance.show();
            setTimeout(() => {
                UiManager.showUi("Main");
                inGamePage.Instance()
                    .then((ins) => {
                        ins.show();
                        homePage.Instance()
                            .then((res) => {
                                res.showAndCgInGame();
                            });
                    });
                launchPage.onLoadend();
            }, 2200);
        }
        // console.error("GameArchiveData", data);
    }

    public baseDataFun(data) {
        // console.error("baseData", data);
        GameArchiveManager.Instance.GameArchiveData.baseData = data;
    }

    public ism4mNFTFun(data) {
        // console.error("ism4mnft", data);
        if (GameArchiveManager.Instance.GameArchiveData) {
            GameArchiveManager.Instance.GameArchiveData.ism4mnft = data;
        }
        UiDataManager.changeFunctionData(BindKeyName.skinBtnVisible,data);
    }

    public CurrentlevelFun(data) {
        // console.error("Currentlevel", data);
        GameArchiveManager.Instance.GameArchiveData.Currentlevel = data;
    }

    public UploadIpfsFun(data: UploadIpfsData) {
        if (!data.id) {
            PhotoSceneManager.ChangeScen();
        } else {
            UiDataManager.changeFunctionData(BindKeyName.skinImage, { url: data.IpfsImagehash, imageurl: data.ImageUrl });
        }
    }
}