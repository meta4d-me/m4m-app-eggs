import { cMap } from "../Data/Map";
import { LoadType } from "./newLoaderManager";
import { combinNewLoader } from "./combinNewLoader";
import { metaUIManager } from "../UIBase/metaUIManager";
import { newUiBase } from "./newUiBase";
import { LoaderLibManager } from "../Loader/LoaderLibManager";
import { loadMgr } from "../Loader/loadMgr";
import { consTool } from "../Tools/consTool";
import { miniAPIType, miniGame } from "../Tools/miniGame";
declare let System;

class UiManagerEventer extends m4m.AEvent {
    //
}

/**
 * UI 管理类 （type2）
 */
export class UiManager extends metaUIManager {
    /** 创建UI 事件 */
    public static readonly ON_CREATE_UI = "onCreateUI";
    /** UI显示（show）事件 */
    public static readonly ON_SHOW_UI = "onShowUI";
    /** UI隐藏（hide）事件 */
    public static readonly ON_HIDE_UI = "onHideUI";
    //开始加载
    public static startLoadCallBack: Function;
    //加载结束
    public static endLoadCallBack: Function;
    //隐藏 不主动释放UI列表
    public static dontDisposeUIList: string[];

    // private static _fullScreenTran: m4m.framework.transform2D;
    private static scene: m4m.framework.scene;
    private static nowLoadingMap: cMap<boolean> = new cMap<boolean>();
    private static uiMap: cMap<newUiBase> = new cMap<newUiBase>();

    private static viewName: string = "View";

    private static jsonList: cMap<any> = new cMap<any>();
    private static _eventer = new UiManagerEventer();
    /** uiManager 事件 控制对象 */
    public static get eventer() { return this._eventer; }
    // private static instance: UiManager;
    // public static get Instance(): UiManager {
    //     if (this.instance == null) {
    //         this.instance = new UiManager();
    //     }
    //     return this.instance;
    // }
    public static hideLayerAll(layer: uiLayerType) {
        let layerTran: newUiBase[] = newUiBase.baselayerPages;
        switch (layer) {
            case -1: layerTran = newUiBase.downlayerPages; break;
            case 1: layerTran = newUiBase.midlayerPages; break;
            case 2: layerTran = newUiBase.highlayerPages; break;
            case 3: layerTran = newUiBase.poplayerPages; break;
            default: let temp;
        }
        layerTran.forEach((page) => {
            page.hide();
        });
    }
    public static hideAllUi(without: string = null) {
        newUiBase.pages.forEach((page) => {
            if (!without || page.uiName != without) {
                page.hide();
            }
        });
    }
    // public static overlay: m4m.framework.overlay2D;
    // public static downlayer: m4m.framework.transform2D;
    // public static baselayer: m4m.framework.transform2D;
    // public static midlayer: m4m.framework.transform2D;
    // public static highlayer: m4m.framework.transform2D;
    // public static poplayer: m4m.framework.transform2D;

    protected static uiRoot: m4m.framework.transform2D;
    //用于测试时调用 项目游戏逻辑一般不会用到
    public static getUiRootTest(): m4m.framework.transform2D {
        return UiManager.uiRoot;
    }
    protected static isInited = false;
    protected static uiLogList: string[] = [];
    protected static logLimit = 3;
    protected static logUiNow = false;
    protected static logUi(UIName: string) {
        if (this.uiLogList.length >= this.logLimit) {
            this.uiLogList.shift();
        }
        this.logUiNow = true;
        this.uiLogList.push(UIName);
    }
    public static openLastUI(uiName: string, isOpenUI = true) {
        // if (this.uiLogList.length <= 0) {
        //     return;
        // }
        // if (this.logUiNow && this.uiLogList.length <= 1) {
        //     return;
        // }
        // let lastUiName = this.uiLogList.pop();
        // if (this.logUiNow) {
        //     lastUiName = this.uiLogList.pop();
        // }
        // this.showUi(lastUiName);
        if (this.uiLogList.length <= 0) {
            return null;
        }
        if (uiName == this.uiLogList[0]) {
            return null;
        }
        let tempList = this.uiLogList.concat();
        let lastUiName = tempList.pop();
        if (lastUiName == uiName) {
            lastUiName = tempList.pop();
        }
        if (isOpenUI) {
            this.uiLogList = tempList;
            this.showUi(lastUiName);
        }
        return lastUiName;
    }

    /**
     * 获取UI当前 初始化 状态
     * @param uiClassName UI名字
     * @returns UI当前是否已经初始化
     */
    public static isUiInited(uiClassName: string) {
        let className = uiClassName;
        let ui = this.uiMap.get(className);
        if (ui) {
            return ui.isInited;
        }
        return false;
    }

    /**
     * 获取UI当前显示状态
     * @param uiClassName UI名字
     * @returns UI当前是否显示
     */
    public static isUiShow(uiClassName: string) {
        let className = uiClassName;
        let ui = this.uiMap.get(className);
        if (ui) {
            return ui.isShow;
        }
        return false;
    }
    /**
     * 加载UI
     * @param uiClassName UI名字
     * @param coverLayer 覆盖 UI 放置到的层级设定
     * @param notHideOnOtherShow 其他UI打开时，自己不会被隐藏
     * @param oninit 初始化方法
     */
    public static InitUi(uiClassName: string, oninit: () => void = null) {
        let className = uiClassName;
        let ui = this.uiMap.get(className);
        if (!ui) {
            this.getUi(uiClassName, false, () => { }, oninit);
            return;
        }
    }
    /**
     * 显示UI
     * @param uiClassName UI名字
     * @param coverLayer 覆盖 UI 放置到的层级设定
     * @param notHideOnOtherShow 其他UI打开时，自己不会被隐藏
     * @param oninit 初始化方法
     */
    public static showUi(uiClassName: string, oninit: () => void = null, needCallBack: boolean = true) {
        let className = uiClassName;
        this.logUiNow = false;
        let ui = this.uiMap.get(className);
        if (!ui) {
            if (this.startLoadCallBack && needCallBack) { this.startLoadCallBack(uiClassName); }
            this.getUi(uiClassName, true, () => { }, oninit);
            return;
        }
        if (ui.isLogUi) {
            this.logUi(uiClassName);
        }

        ui.show();
    }
    /**
     * 隐藏UI
     * @param uiClassName UI名字
     */
    public static hideUi(uiClassName: string) {
        let ui = this.uiMap.get(uiClassName);
        if (!ui) {
            console.error("当前需要隐藏的UI未找到 " + uiClassName);
            return;
        }
        ui.hide();
    }
    /**
    * 销毁UI
    * @param uiClassName UI类名字
    */
    public static disposeUi(uiClassName: string) {
        let ui = this.uiMap.get(uiClassName);
        if (!ui) {
            console.error("当前需要销毁的UI未找到 " + uiClassName);
            return;
        }
        this.uiMap.delete(uiClassName);
        if (this.nowLoadingMap.get(uiClassName)) {
            this.nowLoadingMap.delete(uiClassName);
        }
        ui.dispose();
    }

    /**
    * 隐藏时 销毁UI 通用 直接在UI hide时会被调用
    * @param uiClassName UI类名字
    */
    public static OnHideDisposeUi(uiClassName: string) {
        //大部分UI隐藏就释放资源 如果有常用的UI 添加到列表中不做hide释放处理
        if (this.dontDisposeUIList.indexOf(uiClassName) == -1) {
            UiManager.disposeUi(uiClassName);
        }
    }
    /**
     * 获取UI对象
     * @param uiClass UI类 对象
     * @param isShowUi 是否显示UI
     * @param callBack 获取UI后回调
     * @param oninit 初始化方法
     * @param coverLayer 覆盖 UI 放置到的层级设定
     * @param notHideOnOtherShow 其他UI打开时，自己不会被隐藏
     */
    public static getUi<T extends newUiBase>(uiClassName: string, isShowUi = false, callBack: (uiObj: T) => void, oninit: () => void) {
        let className = uiClassName;
        this.nowLoadingMap.set(className, true);
        let ui: T = this.uiMap.get(className) as any;
        if (ui) {
            if (ui.isLogUi && isShowUi) {
                this.logUi(uiClassName);
            }
            if (callBack) {
                callBack(ui);
            }
            if (isShowUi) {
                ui.show();
            }
            return;
        }
        let uiClass = consTool[uiClassName + this.viewName];//***************暂时处理 用 潜规则写法 
        let classObj: T;
        if (uiClass) {
            classObj = new uiClass();
            this.setCreatUi(classObj, callBack, className, uiClass, oninit, isShowUi);
        } else {
            //加载 分包
            let libSrc = miniGame.miniType == miniAPIType.none ? `lib/node_modules/@types/${uiClassName}.js` : uiClassName;
            let loadFun = miniGame.miniType == miniAPIType.none ? LoaderLibManager.Instance.addLib : LoaderLibManager.Instance.addSubpackage;
            loadFun = loadFun.bind(LoaderLibManager.Instance);
            loadFun(libSrc, (isSucc) => {
                if (!isSucc) {
                    console.error("找不到这个UI资源",libSrc);
                    return;
                }
                System.init();
                consTool.init();
                uiClass = consTool[uiClassName + this.viewName];//***************暂时处理 用 潜规则写法
                if (uiClass == null) {
                    console.error(" 未找到 " + (uiClassName + this.viewName));
                    return;
                }
                classObj = new uiClass();
                this.setCreatUi(classObj, callBack, className, uiClass, oninit, isShowUi);
            });
        }

    }

    public static init(uiWidth: number, uiHeight: number, screenMatchRate: number, uiPrefabPath: string, atlasPath: string) {
        if (this.isInited) { return; }
        metaUIManager._ActiveSelf = this;
        super.init(uiWidth, uiHeight, screenMatchRate, uiPrefabPath, atlasPath);
    }

    private static setCreatUi(classObj, callBack, className, uiClass, oninit, isShowUi) {
        this.creatUi(classObj, (obj) => {
            if (this.nowLoadingMap.get(className)) {
                //---- show hide 事件包装----------
                let oldShow: Function = classObj.show;
                classObj.show = () => {
                    oldShow.apply(classObj);
                    this._eventer.Emit(this.ON_SHOW_UI, className);
                };
                let oldHide: Function = classObj.hide;
                classObj.hide = () => {
                    oldHide.apply(classObj);
                    this._eventer.Emit(this.ON_HIDE_UI, className);
                };
                //--------------------------------
                classObj.transform = obj;
                uiClass.Instance = classObj;
                if (callBack) {
                    callBack(classObj);
                }
                if (oninit) {
                    classObj.onInite = oninit;
                }
                classObj.onInit();
                //加载完成时回调
                if (this.endLoadCallBack) { this.endLoadCallBack(className); }
                this.nowLoadingMap.set(className, false);
                if (uiClass.Instance.isLogUi && isShowUi) {
                    this.logUi(className);
                }
                this.uiMap.set(className, classObj);
                if (isShowUi) {
                    classObj.show();
                }
                //
                this._eventer.Emit(this.ON_CREATE_UI, className);
            } else {
                if (callBack) {
                    callBack(classObj);
                }
            }
        });
    }
    private static creatUi(uiClass, callBack) {
        let uiName = uiClass.uiName;
        // let url = "Resources/newUi/" + uiName + "/resources/" + uiName + "_json.json";
        let url = this.uiPrefabPath + uiName + "/" + uiName + "_json.json";
        // let url = this.uiPrefabPath + uiName + "/resources/" + uiName + "_json.json";
        let uijsonLoder = new combinNewLoader();
        uijsonLoder.add(url, () => { }, LoadType.JSON);
        loadMgr.Instance.syncLoadList([`${this.atlasPath}${uiName}/${uiName}.assetbundle.json`], 110)
            .then(() => {
                // loadMgr.Instance.syncLoadList([`${this.atlasPath}${uiName}/${uiName}.assetbundle.json`], 110).then(() => {
                uijsonLoder.start((data) => {
                    let jsonData = data[0];
                    if (!jsonData) {
                        console.error("ui资源json有错误在请检查文件  " + url);
                        return;
                    }
                    this.jsonList.set(url, jsonData);
                    let uiInfo = jsonData[0];
                    if (!uiInfo) {
                        console.error("ui资源json有错误在请检查文件  " + url);
                        return;
                    }
                    let insidMap: { [key: number]: any } = {};
                    let compMap = [];
                    let trans = this.makeTran(uiInfo, uiClass, insidMap);
                    this.setCompsToTran2D(trans, uiInfo, insidMap, compMap, uiClass);
                    this.referenceComps(insidMap, compMap);
                    if (callBack) {
                        callBack(trans);
                    }
                });
            });
    }
    private static referenceComps(insidMap, compMap) {
        for (let index = 0; index < compMap.length; index++) {
            const element = compMap[index];
            this.referenceComp(element, insidMap);
        }

    }
    private static setCompsToTran2D(trans: m4m.framework.transform2D, pfInfo, insidMap, compMap, uiClass) {

        for (let i = 0; i < pfInfo.components.length; i++) {
            let compInfo = pfInfo.components[i];
            let rawComp = this.makeAComp2D(compInfo, insidMap, compMap, uiClass);
            if (rawComp) {
                trans.addComponentDirect(rawComp);
            }
        }

        //递归组装子对象
        for (let i = 0; i < trans.children.length; i++) {
            let childTran = trans.children[i];
            let childTranInfo = pfInfo.children[i];
            this.setCompsToTran2D(childTran, childTranInfo, insidMap, compMap, uiClass[childTran.name]);
        }
    }
    private static makeTran(pfInfo, uiClass, insidMap) {
        let trans = new m4m.framework.transform2D();
        uiClass.transform = trans;
        trans.name = pfInfo.tranName;
        trans.prefab = pfInfo.prefab;
        trans.layer = pfInfo.layer;
        trans.tag = pfInfo.tag;
        trans.isStatic = pfInfo.isStatic;
        trans.width = pfInfo.width;
        trans.height = pfInfo.height;
        m4m.math.vec2Clone(pfInfo.pivot, trans.pivot);
        trans.visible = pfInfo._visible;
        m4m.math.vec2Clone(pfInfo.localTranslate, trans.localTranslate);
        m4m.math.vec2Clone(pfInfo.localScale, trans.localScale);
        trans.localRotate = pfInfo.localRotate;
        trans.isMask = pfInfo.isMask;
        trans.layoutState = pfInfo.layoutState;
        trans.layoutPercentState = pfInfo.layoutPercentState;
        trans.setLayoutValue(1, pfInfo.layoutValueMap.n1);
        trans.setLayoutValue(2, pfInfo.layoutValueMap.n2);
        trans.setLayoutValue(4, pfInfo.layoutValueMap.n4);
        trans.setLayoutValue(8, pfInfo.layoutValueMap.n8);
        trans.setLayoutValue(16, pfInfo.layoutValueMap.n16);
        trans.setLayoutValue(32, pfInfo.layoutValueMap.n32);
        if (pfInfo.insid != null) {
            insidMap[pfInfo.insid] = trans;
        }
        //递归组装子对象
        if (pfInfo.children) {
            for (let i = 0; i < pfInfo.children.length; i++) {
                let childTranInfo = pfInfo.children[i];
                let childTran = this.makeTran(childTranInfo, uiClass[childTranInfo.tranName], insidMap);
                trans.addChild(childTran);
            }
        }
        return trans;
    }
    private static makeAComp2D(compInfo: any, insidMap, compMap, uiClass) {
        let name = compInfo.cmop as string || compInfo.className as string;
        switch (name) {
            case "button":
                let compButton = new m4m.framework.button();
                compButton.transition = compInfo.transition;
                compButton["_origianlSpriteName"] = compInfo._origianlSpriteName;
                compButton["_pressedSpriteName"] = compInfo._pressedSpriteName;
                m4m.math.colorClone(compInfo.normalColor, compButton.normalColor);
                m4m.math.colorClone(compInfo.pressedColor, compButton.pressedColor);
                compButton.fadeDuration = compInfo.fadeDuration;
                compInfo["_comp"] = compButton;
                uiClass.button = compButton;
                compMap.push(compInfo);
                return compButton;
            case "image2D":
                let compImage2D = new m4m.framework.image2D();
                m4m.math.colorClone(compInfo.color, compImage2D.color);
                compImage2D.imageType = compInfo.imageType;
                compImage2D.fillMethod = compInfo.fillMethod;
                compImage2D.fillAmmount = compInfo.fillAmmount;
                // compImage2D.sprite = m4m.framework.sceneMgr.app.getAssetMgr().getDefaultSprite("grid_sprite");
                let assetMgr = m4m.framework.sceneMgr.app.getAssetMgr();
                let _sp = assetMgr.getDefaultSprite(compInfo._spriteName);
                if (!_sp) {
                    _sp = assetMgr.getAssetByName(compInfo._spriteName);

                }
                compImage2D.sprite = _sp;
                compImage2D["_spriteName"] = compInfo._spriteName;
                compImage2D["_imageBorder"].l = compInfo._imageBorder.l;
                compImage2D["_imageBorder"].t = compInfo._imageBorder.t;
                compImage2D["_imageBorder"].r = compInfo._imageBorder.r;
                compImage2D["_imageBorder"].b = compInfo._imageBorder.b;
                uiClass.image = compImage2D;
                return compImage2D;
            case "label":
                let compLabel = new m4m.framework.label();
                compLabel.text = compInfo.text;
                //compLabel.font = new m4m.framework.font(compInfo._fontName);
                compLabel["_fontName"] = compInfo._fontName;
                compLabel.fontsize = compInfo.fontsize;
                compLabel.linespace = compInfo.linespace;
                compLabel.horizontalType = compInfo.horizontalType;
                compLabel.verticalType = compInfo.verticalType;
                compLabel.horizontalOverflow = compInfo.horizontalOverflow;
                compLabel.verticalOverflow = compInfo.verticalOverflow;
                m4m.math.colorClone(compInfo.color, compLabel.color);
                m4m.math.colorClone(compInfo.color2, compLabel.color2);
                uiClass.label = compLabel;
                return compLabel;
            case "scrollRect":
                let compScrollRect = new m4m.framework.scrollRect();
                compScrollRect.content = insidMap[compInfo.content];
                compScrollRect.horizontal = compInfo.horizontal;
                compScrollRect.vertical = compInfo.vertical;
                compScrollRect.inertia = compInfo.inertia;
                compScrollRect.decelerationRate = compInfo.decelerationRate;
                uiClass.scrollRect = compScrollRect;
                return compScrollRect;
            case "rawImage2D":
                let compRawImage2D = new m4m.framework.rawImage2D();
                m4m.math.colorClone(compInfo.color, compRawImage2D.color);
                uiClass.rawImage2D = compRawImage2D;
                return compRawImage2D;
            case "progressbar":
                let compProgressbar = new m4m.framework.progressbar();
                compProgressbar.value = compInfo.value;
                compProgressbar.cutPanel = insidMap[compInfo.cutPanel];
                // compProgressbar.barOverImg = insidMap[compInfo.barOverImg];
                // compProgressbar.barBg = insidMap[compInfo.barBg];
                compInfo["_comp"] = compProgressbar;
                compMap.push(compInfo);
                uiClass.progressbar = compProgressbar;
                return compProgressbar;
            case "input":
                let compinput = new m4m.framework.inputField();
                compinput.characterLimit = compInfo.characterLimit;
                compinput.LineType = compInfo.LineType;
                compinput.ContentType = compInfo.ContentType;

                // compinput.frameImage=insidMap[compInfo.frameImage];
                // compinput.TextLabel=insidMap[compInfo.TextLabel];
                // compinput.PlaceholderLabel=insidMap[compInfo.PlaceholderLabel];
                compInfo["_comp"] = compinput;
                compMap.push(compInfo);
                uiClass.inputField = compinput;
                return compinput;
            default: return null;
        }
    }

    private static referenceComp(compInfo: any, insidMap) {
        let name = compInfo.cmop || compInfo.className;
        switch (name) {
            case "button":
                let compButton = compInfo["_comp"] as m4m.framework.button;
                if (insidMap[compInfo.targetImage]) {
                    let image = insidMap[compInfo.targetImage].getComponent("image2D") as m4m.framework.image2D;
                    compButton.targetImage = image;
                }
                break;
            case "progressbar":
                let compProgressbar = compInfo["_comp"] as m4m.framework.progressbar;
                if (insidMap[compInfo.barBg]) {
                    compProgressbar.barBg = insidMap[compInfo.barBg].getComponent("image2D") as m4m.framework.image2D;
                }
                if (insidMap[compInfo.barOverImg]) {
                    compProgressbar.barOverImg = insidMap[compInfo.barOverImg].getComponent("image2D") as m4m.framework.image2D;
                }
                break;
            case "input":
                let compinput = compInfo["_comp"] as m4m.framework.inputField;
                if (insidMap[compInfo.frameImage]) {
                    compinput.frameImage = insidMap[compInfo.frameImage].getComponent("image2D") as m4m.framework.image2D;
                }
                if (insidMap[compInfo.TextLabel]) {
                    compinput.TextLabel = insidMap[compInfo.TextLabel].getComponent("label") as m4m.framework.label;
                }
                if (insidMap[compInfo.PlaceholderLabel]) {
                    compinput.PlaceholderLabel = insidMap[compInfo.PlaceholderLabel].getComponent("label") as m4m.framework.label;
                }
                break;
            default: let temp;
        }
    }

}
export enum uiLayerType {
    downlayer = -1,
    baselayer = 0,
    midlayer = 1,
    highlayer = 2,
    poplayer = 3,
}