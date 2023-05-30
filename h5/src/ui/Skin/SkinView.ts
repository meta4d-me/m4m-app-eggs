import { AudioMgr } from "audio/AudioMgr";
import { GameArchiveManagerRequest } from "AutoCode/Net/ClientRequest/GameArchiveManagerRequest";
import { WsDataManager } from "AutoCode/Net/WsDataManager";
import { ConnectWalletManager, IpareComponentParams } from "Core/blockchain/ConnectWalletManager";
import { BindKeyName } from "Data/BindKeyName";
import { CellData } from "Data/CellData";
import { Grid } from "Data/Grid";
import { GridData } from "Data/GridData";
import { ListModel } from "Data/ListModel";
import { ScrollRectExtend } from "Data/ScrollRectExtend";
import { GameMgr } from "GameMgr";
import { GameArchiveManager } from "Manager/GameArchiveManager";
import { SDKWebsokectTool } from "Net/SDKWebsokectTool";
import { UiDataManager } from "PSDUI/UiDataManager";
import { UiManager } from "PSDUI/UiManager";
import { playerMgr } from "role/playerMgr";
import { skinChunk, skinMgr } from "skinMgr";
import { homePage } from "ui/pages/homePage";
import { inGamePage, showItem } from "ui/pages/inGamePage";
import { Skin } from "./Skin";
import { SkinCell } from "./SkinCell";

export class SkinView extends Skin {
    public static Instance: SkinView;
    private mygrid: Grid;
    private seqtListModel = new ListModel<skinChunk>();
    private ScExtl: any;
    private skinFun: any;
    private currentSkin: skinChunk;
    private skinBtnFun: any;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFun.bind(this);
        this.onHide = this.onHideFun.bind(this);
        this.onDispose = this.onDisposeFun.bind(this);
        this.toptext_lab_text("Choose Skin");
        this.back_btn_btnEvent = this.backBtnFun.bind(this);
        this.text2_lab_text(`Level ${GameArchiveManager.Instance.isLevel}`);
        this.text3_lab_text(`Minted`);
        this.text1_lab_text(`Mint`);
        this.oninfogamingGrid();
        this.greybtn_btn_btnEvent = this.greybtnFun.bind(this);
        this.bluebtn_btn_btnEvent = this.bluebtnFun.bind(this);
        this.skinFun = this.skindata.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.skinImage, this.skinFun);
        this.skinBtnFun = this.btnVisible.bind(this)
        UiDataManager.bindFunctionData(BindKeyName.skinBtnVisible, this.skinBtnFun)
    }
    private onShowFun() {
        let GameArchive = this.btnVisible();
        this.GameArchiveSkinData(skinMgr.skins);
        this.mygrid.SelectIndex = Number(GameArchive.baseData.id) - 1;
    }
    private btnVisible() {
        let GameArchive = GameArchiveManager.Instance.GameArchiveData;
        this.currentSkin = GameArchive.baseData;
        if (GameArchive) {
            let isLevel = GameArchiveManager.Instance.isLevel;
            let isbool = Number(GameArchive.Currentlevel.id) <= isLevel;
            this.midbg.btnbg.greybtn_btn.btnlock_img.transform.visible = isbool;
            if (!isbool) {
                this.midbg.btnbg.greybtn_btn.transform.visible = GameArchive.ism4mnft;
                this.midbg.btnbg.greybtn_btn.text2_lab.transform.visible = false;
                this.midbg.btnbg.greybtn_btn.text3_lab.transform.visible = GameArchive.ism4mnft;
            } else {
                this.midbg.btnbg.greybtn_btn.transform.visible = isbool;
                this.midbg.btnbg.greybtn_btn.text2_lab.transform.visible = isbool;
                this.midbg.btnbg.greybtn_btn.text3_lab.transform.visible = false;
            }
            this.midbg.btnbg.bluebtn_btn.transform.visible = (!GameArchive.ism4mnft && !isbool);
        }
        return GameArchive;
    }

    private onHideFun() {

    }
    private onDisposeFun() {
        this.mygrid.dispose();
        UiDataManager.unBindFunctionData(BindKeyName.skinImage, this.skinFun);
        UiDataManager.unBindFunctionData(BindKeyName.skinBtnVisible, this.skinBtnFun)
    }

    public backBtnFun() {
        AudioMgr.Play("touch.mp3");
        UiManager.hideUi("Skin");
        UiManager.showUi("Main");
        inGamePage.Instance().then((ins) => {
            ins.setShowItem(showItem.home);
        })
        homePage.Instance().then((ins) => {
            ins.show();
        })
    }
    //初始化所有存档
    public oninfogamingGrid() {
        let lo = m4m.framework.layoutOption;
        let cellTrans: m4m.framework.transform2D = this.midbg.listscr_scr.listscrcontent.ball_raw.transform;
        let cellPercentWidth = cellTrans.width;
        let cellPercentHeight = cellTrans.height;
        let cellData = new CellData();
        cellData.width = cellPercentWidth;
        cellData.height = cellPercentHeight;
        let gridData = new GridData();
        gridData.columns = 3;
        gridData.rows = 50;
        gridData.offsetX = 90;
        gridData.offsetY = 70;
        let initX = cellTrans.getLayoutValue(lo.H_CENTER);

        gridData.initXPlace = initX;
        let initY = cellTrans.getLayoutValue(lo.TOP);
        gridData.initYPlace = initY;
        gridData.cellName = SkinCell.name;
        gridData.cellData = cellData;
        gridData.cell = this.midbg.listscr_scr.listscrcontent.ball_raw;
        //生成的格子放在父节点
        gridData.parentTrans = cellTrans.parent;
        gridData.cellLayoutX = lo.H_CENTER;
        gridData.cellLayoutY = lo.TOP;
        this.mygrid = new Grid(gridData);
        cellTrans.visible = false;
        this.mygrid.selectCallBackFun = this.selectCallBackFun.bind(this);
        this.ScExtl = this.midbg.listscr_scr.scrollRect.transform.addComponent("ScrollRectExtend") as ScrollRectExtend;
        this.ScExtl.offsetUpY = 30;
        this.ScExtl.offsetDownY = 30;
        this.ScExtl.setList(this.mygrid.getCellList());
        setTimeout(() => {
            this.ScExtl.upDateTrans();
        }, 0);
    }

    public selectCallBack() {
        let game = GameArchiveManager.Instance.GameArchiveData;
        let data = this.mygrid.getCellList();
        data.forEach((cell: SkinCell) => {
            if (cell.cellData.data) {
                let bool = cell.cellData.data.id == game.baseData.id;
                cell.nowClass.frame1_img.transform.visible = bool;
            }
        });
    }

    public selectCallBackFun(data, index) {
        // console.log(data, index);
        this.currentSkin = data;
        let game = GameArchiveManager.Instance.GameArchiveData
        if (game) {
            let isskin = Number(game.Currentlevel.id) <= data.deblocking[0];
            if (!isskin && !game.ism4mnft) {
                // GameMgr.currUseSkin = data.id;
                if (game.baseData.id != data.id) {
                    playerMgr.changeSkin(data.id);
                    GameArchiveManagerRequest.Instance.SwitchSkin(game.id, data.id);
                }
            } else {
                // TipsManager.ShowTips("The ball has been registered as an NFT, and the skin cannot be switched");
            }
        }
    }

    public GameArchiveSkinData(data: skinChunk[]) {
        this.seqtListModel.setSource(data);
        this.mygrid.setListModel(this.seqtListModel);
        this.midbg.listscr_scr.listscrcontent.transform.height = this.mygrid.getHeight() + 70;
    }
    // public 

    public greybtnFun() {
        AudioMgr.Play("touch.mp3");
        console.log("222");
        // this.updateSkindata({ url: "QmTU7z9Yzx1F6B8fP47gvmo4ic3k6VGZgfSUzp5nmHdjJM", imageurl: "https://show-svc.meta4d.me:4439/ImageSend?img=M4MNFT45wb2uFTMbUX.png" });
    }

    public bluebtnFun() {
        AudioMgr.Play("touch.mp3");
        UiManager.showUi("wloading");
        GameArchiveManagerRequest.Instance.selectData(this.currentSkin.headPortrait);
    }

    public skindata(data) {
        let keybool: { [key: string]: any } = {};
        keybool["ipfsUrl"] = data.url;
        let skin = GameArchiveManager.Instance.GameArchiveData;
        let tokenid = WsDataManager.UserDataBaseData.token;
        let address = ConnectWalletManager.Instance.address;
        let skintexTures = "";
        let skindata = skinMgr.skins_map.get(skin.baseData.id);
        if (skindata.skinSticker) {
            skintexTures = window.location.origin + "/" + GameMgr.skinTexPath + skindata.skinSticker
        }
        /**
         * prev参数根据”_“分隔，
         * 1155NFT，第一个参数是模型地址一般是在cdn上，第二个参数是本地图片地址，第三个参数是保存在ipfs上的模型
         * 721NFT, 第一个参数是上传的ipfs上的json，每个部件对应的模型名称，第二个参数是本地图片地址，第三个参数是本地模型地址
         */
        //window.location.origin +
        let prev = "https://eggs.meta4d.app" + "/" + GameMgr.propsPath + "qiu" + "#" + skintexTures + "_" + data.imageurl;
        let Params: IpareComponentParams = {
            Id: skin.id,
            desc: "",
            itemName: skin.baseData.skinName,
            symbol: "H",
            rolePartName: "Sphere",
            tokenid,
            address,
            pictureRes: "",
            imageBase64: "",
            keybool,
            prev,
        }
        SDKWebsokectTool.Instance.SDKManager_testprepareComponent(Params);
        UiManager.hideUi("wloading");
    }

    public updateSkindata(data) {
        let keybool: { [key: string]: any } = {};
        keybool["ipfsUrl"] = data.url;
        let skin = GameArchiveManager.Instance.GameArchiveData;
        let tokenid = WsDataManager.UserDataBaseData.token;
        let address = ConnectWalletManager.Instance.address;
        let skintexTures = "";
        let skindata = skinMgr.skins_map.get(skin.baseData.id);
        if (skindata.skinSticker) {
            skintexTures = window.location.origin + "/" + GameMgr.skinTexPath + skindata.skinSticker
        }
        let prev = window.location.origin + "/" + GameMgr.propsPath + "qiu" + "#" + skintexTures + "_" + data.imageurl;
        let Params: IpareComponentParams = {
            Id: skin.id,
            desc: "",
            itemName: skin.baseData.skinName,
            symbol: "H",
            rolePartName: "Sphere",
            tokenid,
            address,
            pictureRes: "",
            imageBase64: "",
            keybool,
            prev,
        }
        SDKWebsokectTool.Instance.SDKManager_RenewComponentData(Params);
    }
}