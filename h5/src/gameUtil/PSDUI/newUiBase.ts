import { labelBinder, tran2DBinder, UiDataManager } from "./UiDataManager";
import { uiLayerType, UiManager } from "./UiManager";

// tslint:disable-next-line: class-name
export class newUiBase {
    //标记数组 
    public static signArr: string[] = [];

    // tslint:disable-next-line: member-ordering
    public static pages: newUiBase[] = [];
    // tslint:disable-next-line: member-ordering
    public static downlayerPages: newUiBase[] = [];
    // tslint:disable-next-line: member-ordering
    public static baselayerPages: newUiBase[] = [];
    // tslint:disable-next-line: member-ordering
    public static midlayerPages: newUiBase[] = [];
    // tslint:disable-next-line: member-ordering
    public static highlayerPages: newUiBase[] = [];
    // tslint:disable-next-line: member-ordering
    public static poplayerPages: newUiBase[] = [];
    public uiName: string = "";
    public isShow = false;
    public isInited = false;
    public linkList: labelBinder[] = [];
    public tranLinkList: tran2DBinder[] = [];
    public transform: m4m.framework.transform2D;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = false;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = false;
    public uiLayer: uiLayerType = uiLayerType.baselayer;
    /**当前UI是否会被记录 (用于返回上一步打开) */
    public isLogUi: boolean = false;
    /** 当前UI是否会影响场景玩家操作 */
    public influenceSceneAction: boolean = true;
    //常规事件
    /**隐藏UI事件 */
    public onHide: () => any;
    /**打开UI事件 */
    public onShow: () => any;
    /**销毁UI事件 */
    public onDispose: () => any;
    /**初始化UI事件 */
    public onInite: () => any;
    //需要隐藏 面板临时数组
    private static needHidePageList = [];
    public onInit() { }
    public show() {
        this.outLayer();

        // console.error("显示 UI " + this.uiName);

        // if (layer != null) {
        //     this.uiLayer = layer;
        // }
        // if (notHideOnOtherShow != null) {
        //     this.notHideOnOtherShow = notHideOnOtherShow;
        // }
        if (!this.isInited) {
            this.init();
        }
        if (this.uiLayer == 3) {
            this.notHideOnOtherShow = true;
        }
        this.isShow = true;
        let layTran = this.getParent();
        this.pushToLayer();
        if (this.transform.parent) {
            this.transform.parent.removeChild(this.transform);
        }
        layTran.addChild(this.transform);
        this.transform.visible = true;
        if (this.onShow) {
            this.onShow();
        }
        this.bind();
        if (this.noAffected) {
            //特殊界面不影响 其他 uiPage
        } else {
            newUiBase.hideLayerAll(this);
        }
        //当前UI是否会影响场景玩家操作
        if (this.influenceSceneAction) {
            let index: number = newUiBase.signArr.indexOf(this.uiName);
            if (index == -1) {
                newUiBase.signArr.push(this.uiName);
            }
        }
    }
    public hide() {
        if (!this.isInited || !this.transform.visible) { return; }
        this.isShow = false;
        console.error("隐藏 UI " + this.uiName);
        // this.uiLayer = uiLayerType.baselayer;
        // this.notHideOnOtherShow = false;
        if (this.onHide) {
            this.onHide();
        }
        this.unbind();
        this.outLayer();
        this.transform.visible = false;
        if (this.transform.parent) {
            // console.error("移除显示 " + this.uiName);
            this.transform.parent.removeChild(this.transform);
        }
        //当前UI是否会影响场景玩家操作
        if (this.influenceSceneAction) {
            let index: number = newUiBase.signArr.indexOf(this.uiName);
            if (index != -1) {
                newUiBase.signArr.splice(index, 1);
            }
        }
        //大部分UI隐藏就释放资源 如果有常用的UI 添加到列表中不做hide释放处理
        UiManager.OnHideDisposeUi(this.uiName);
    }
    public openLastUI() {
        return UiManager.openLastUI(this.uiName);
    }
    public getLastUI() {
        return UiManager.openLastUI(this.uiName, false);
    }
    public dispose() {
        console.error("dispose UI " + this.uiName);
        this.isShow = false;
        // this.uiLayer = uiLayerType.baselayer;
        // this.notHideOnOtherShow = false;
        if (this.onDispose) {
            this.onDispose();
            // this.onDispose = null;
        }
        // if (this.onHide) {
        //     this.onHide = null;
        // }
        // if (this.onShow) {
        //     this.onShow = null;
        // }
        this.outLayer();
        this.transform.visible = false;
        if (this.transform.parent) {
            this.transform.parent.removeChild(this.transform);
        }
        let index = newUiBase.pages.indexOf(this);
        if (index != -1) {
            newUiBase.pages.splice(index, 1);
        }
        this.unbind();
        for (let i = 0; i < this.linkList.length; i = 0) {
            // this.linkList[i] = null;
            this.linkList.pop();
        }
        // this.linkList.pop
        this.linkList.length = 0;
        for (let i = 0; i < this.tranLinkList.length; i = 0) {
            // this.linkList[i] = null;
            this.tranLinkList.pop();
        }
        // this.tranLinkList.pop
        this.tranLinkList.length = 0;
        this.transform.dispose();
    }
    private init() {
        newUiBase.pages.push(this);
        // let layTran = this.getParent();
        // layTran.addChild(this.transform);
        this.isInited = true;
    }
    private static hideLayerAll(without: newUiBase) {
        let layerTran: newUiBase[] = newUiBase.baselayerPages;
        switch (without.uiLayer) {
            case -1: layerTran = newUiBase.downlayerPages; break;
            // case 0: layerTran = newUiBase.baselayerPages; break;
            case 1: layerTran = newUiBase.midlayerPages; break;
            case 2: layerTran = newUiBase.highlayerPages; break;
            case 3: layerTran = newUiBase.poplayerPages; break;
            default:
        }
        this.needHidePageList.length = 0;
        layerTran.forEach((page) => {
            if (page != without && !page.notHideOnOtherShow) {
                this.needHidePageList.push(page);
            }
        });
        this.needHidePageList.forEach((page) => {
            if (page) {
                page.hide();
            }
        });
        this.needHidePageList.length = 0;
    }

    private getParent() {
        let layTran: m4m.framework.transform2D = UiManager.baselayer;
        switch (this.uiLayer) {
            case -1: layTran = UiManager.downlayer; break;
            // case 0: layTran = UiManager.baselayer; break;
            case 1: layTran = UiManager.midlayer; break;
            case 2: layTran = UiManager.highlayer; break;
            case 3: layTran = UiManager.poplayer; break;
            default:
        }
        return layTran;
    }
    private pushToLayer() {
        switch (this.uiLayer) {
            case -1: newUiBase.downlayerPages.push(this); break;
            case 0: newUiBase.baselayerPages.push(this); break;
            case 1: newUiBase.midlayerPages.push(this); break;
            case 2: newUiBase.highlayerPages.push(this); break;
            case 3: newUiBase.poplayerPages.push(this); break;
            default:
        }
    }

    private outLayer() {
        let layerTran: newUiBase[] = newUiBase.baselayerPages;
        switch (this.uiLayer) {
            case -1: layerTran = newUiBase.downlayerPages; break;
            // case 0: layerTran = newUiBase.baselayerPages; break;
            case 1: layerTran = newUiBase.midlayerPages; break;
            case 2: layerTran = newUiBase.highlayerPages; break;
            case 3: layerTran = newUiBase.poplayerPages; break;
            default:
        }
        let index = layerTran.indexOf(this);
        if (index != -1) {
            layerTran.splice(index, 1);
        }
    }

    private unbind() {
        for (let i = 0; i < this.linkList.length; i++) {
            let linker = this.linkList[i];
            UiDataManager.unBindLabelDataByBinder(linker);
        }
        for (let i = 0; i < this.tranLinkList.length; i++) {
            let linker = this.tranLinkList[i];
            UiDataManager.unBindTransDataByBinder(linker);
        }
    }
    private bind() {
        for (let i = 0; i < this.linkList.length; i++) {
            let linker = this.linkList[i];
            UiDataManager.addBindLabl(linker);
        }
        for (let i = 0; i < this.tranLinkList.length; i++) {
            let linker = this.tranLinkList[i];
            UiDataManager.addBindTrans(linker);
        }
    }

}