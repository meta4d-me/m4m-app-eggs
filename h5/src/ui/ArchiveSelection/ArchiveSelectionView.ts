import { AudioMgr } from "audio/AudioMgr";
import { GameArchiveManagerRequest } from "AutoCode/Net/ClientRequest/GameArchiveManagerRequest";
import { WsDataManager } from "AutoCode/Net/WsDataManager";
import { CellData } from "Data/CellData";
import { Grid } from "Data/Grid";
import { GridData } from "Data/GridData";
import { ListModel } from "Data/ListModel";
import { GameArchiveData } from "GameArchiveData";
import { GameArchiveManager } from "Manager/GameArchiveManager";
import { TipsManager } from "Manager/TipsManager";
import { UiManager } from "PSDUI/UiManager";
import { homePage } from "ui/pages/homePage";
import { inGamePage, showItem } from "ui/pages/inGamePage";
import { ArchiveSelection } from "./ArchiveSelection";
import { ArchiveSelectionCell } from "./ArchiveSelectionCell";

export class ArchiveSelectionView extends ArchiveSelection {
    public static Instance: ArchiveSelectionView;
    public mygrid: Grid;
    private seqtListModel = new ListModel<GameArchiveData>();
    private GameArchiveList: GameArchiveData[] = [];
    ScExtl: any;
    public onInit() {
        super.onInit();
        // //打开当前界面不影响其他界面 TipPanel
        // this.noAffected = true;
        //屏蔽UI事件
        //多语言版本
        this.onShow = this.onShowFun.bind(this);
        this.onHide = this.onHideFun.bind(this);
        this.onDispose = this.onDisposeFun.bind(this);
        this.toptext_lab_text("Choose Egg");
        this.back_btn_btnEvent = this.backBtnFun.bind(this);
        this.plus_btn_btnEvent = this.plusBtnFun.bind(this);
        this.oninfogamingGrid();
    }
    private onShowFun() {
        this.transform.updateTran(true);
        this.topbg_img.back_btn.transform.visible = GameArchiveManager.Instance.isArchive;

        let game = WsDataManager.UserDataBaseData.GameArchive;
        for (const key in game) {
            const element = game[key];
            this.GameArchiveList.push(element);
        }

        this.GameArchiveSkinData(this.GameArchiveList);
        setTimeout(() => {
            this.update();
        }, 50)
    }
    private update() {
        if (this.mygrid) {
            let data = this.mygrid.getCellList();
            if (data.length != 0) {
                let indexNum = 0;
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if (element.cellData.data) {
                        indexNum = index;
                    }
                }
                if (indexNum >= 1) {
                    let cell: any = data[indexNum];
                    this.midbg.listscr_scr.listscrcontent.plus_btn.transform.localTranslate = cell.nowClass.transform.localTranslate;
                    this.midbg.listscr_scr.listscrcontent.plus_btn.transform.localTranslate.y += 400;
                    this.midbg.listscr_scr.listscrcontent.plus_btn.transform.markDirty();
                }
            }
        }
    }

    private onHideFun() {
    }
    private onDisposeFun() {
        this.mygrid.dispose();
    }

    public backBtnFun() {
        AudioMgr.Play("touch.mp3");
        
        UiManager.hideUi("ArchiveSelection");
        UiManager.showUi("Main");
        inGamePage.Instance().then((ins) => {
            ins.setShowItem(showItem.home);
        });
        homePage.Instance().then((ins) => {
            ins.show();
        });
    }

    /**创建存档 */
    public plusBtnFun() {
        AudioMgr.Play("touch.mp3");
        GameArchiveManagerRequest.Instance.CreateArchive();
        GameArchiveManager.Instance.isArchive = true;
    }

    //初始化所有存档
    public oninfogamingGrid() {
        let lo = m4m.framework.layoutOption;
        let cellTrans: m4m.framework.transform2D = this.midbg.listscr_scr.listscrcontent.frame_img.transform;
        let cellPercentWidth = cellTrans.width;
        let cellPercentHeight = cellTrans.height;
        let cellData = new CellData();
        cellData.width = cellPercentWidth;
        cellData.height = cellPercentHeight;
        let gridData = new GridData();
        gridData.columns = 1;
        gridData.rows = 20;
        gridData.offsetX = 0;
        gridData.offsetY = 50;
        let initX = cellTrans.getLayoutValue(lo.H_CENTER);

        gridData.initXPlace = initX;
        let initY = cellTrans.getLayoutValue(lo.TOP);
        gridData.initYPlace = initY;
        gridData.cellName = ArchiveSelectionCell.name;
        gridData.cellData = cellData;
        gridData.cell = this.midbg.listscr_scr.listscrcontent.frame_img;
        //生成的格子放在父节点
        gridData.parentTrans = cellTrans.parent;
        gridData.cellLayoutX = lo.H_CENTER;
        gridData.cellLayoutY = lo.TOP;
        this.mygrid = new Grid(gridData);
        cellTrans.visible = false;
        this.mygrid.selectCallBackFun = this.selectCellsqtFun.bind(this);
    }
    public index: number;
    public selectCellsqtFun(data, index) {
        console.log(data, index);
        GameArchiveManager.Instance.isArchive = true;
        let game = GameArchiveManager.Instance.GameArchiveData;
        if (game) {
            if (data.id != game.id) {
                GameArchiveManagerRequest.Instance.SelectArchive(data.id);
            } else {
                TipsManager.ShowTips("You are in this archive", true);
            }
        } else {
            GameArchiveManagerRequest.Instance.SelectArchive(data.id);
        }
    }

    public GameArchiveSkinData(data: GameArchiveData[]) {
        this.seqtListModel.setSource(data);
        this.mygrid.setListModel(this.seqtListModel);
        this.midbg.listscr_scr.listscrcontent.transform.height = this.mygrid.getHeight() + 900;
        this.midbg.listscr_scr.listscrcontent.transform.markDirty();
    }
    // public
}