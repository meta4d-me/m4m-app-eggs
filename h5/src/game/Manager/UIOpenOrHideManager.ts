import { UiManager } from "PSDUI/UiManager";

export class UIOpenOrHideManager {
    public static get Instance(): UIOpenOrHideManager {
        if (this._instance == null) {
            this._instance = new UIOpenOrHideManager();
        }
        return this._instance;
    }
    // public set showRoomEuler(v) { this._showRoomEuler = v; this.refreashShowRoompaltformEuler(); }
    // public get showRoomEuler() { return this._showRoomEuler; }

    //是否可以显示loading
    public static needShowLoading: boolean = true;

    public static neeshowwloaidn: boolean = true;

    public _showRoomEuler = 0;
    public touchPadTran: m4m.framework.transform2D;
    public roleId: number = 0;

    //设置下一个打开的UI
    public nextOpenUiName: string;
    /**设置矿洞页面 */
    public cavePageNumber = 0;
    public init() {
        ///隐藏 不主动释放的 UI列表
        UiManager.dontDisposeUIList = [];
        UiManager.dontDisposeUIList.push("wloading");
        // UiManager.dontDisposeUIList.push(UiNames.Tooltip);
        // UiManager.dontDisposeUIList.push(UiNames.Circleloading);
        // UiManager.dontDisposeUIList.push(UiNames.Cardsone);
        // UiManager.dontDisposeUIList.push(UiNames.Cardsten);
        // UiManager.dontDisposeUIList.push(UiNames.Guide);
        // UiManager.dontDisposeUIList.push(UiNames.Playgame);

        // UiManager.InitUi(UiNames.Solidcolor);

        //开始打开UI 回调
        UiManager.startLoadCallBack = (uiname) => {
            if (UIOpenOrHideManager.needShowLoading && uiname != "wloading") {
                // console.error("开始加载UI " + uiname);
                if (this.uiloadingCanShow) {
                    //显示UIloading界面
                    UiManager.showUi("wloading");
                    this.uiloadingCanShow = false;
                }
            }
        };
        UiManager.endLoadCallBack = (uiname) => {
            if (UIOpenOrHideManager.needShowLoading && uiname != "wloading") {
                // console.error("UI加载完成 " + uiname);
                //半闭UIloading界面
                if (UiManager.isUiShow("wloading") && UIOpenOrHideManager.neeshowwloaidn) {
                    UiManager.hideUi("wloading");
                }
                this.uiloadingCanShow = true;
            }
        };
    }
    private static _instance: UIOpenOrHideManager;
    private uiloadingCanShow: boolean = true;
}