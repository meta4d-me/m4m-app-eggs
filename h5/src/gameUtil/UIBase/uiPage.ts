import { TimeUtil } from "Time/TimeUtil";
import { loadMgr } from "Loader/loadMgr";
import { cMap } from "Data/Map";
import { commTool } from "Tools/commTool";
import { uiMgr } from "./uiMgr";
// import { wxTool } from "../../../Tool/wxTool";
/** 面板逻辑管理对象接口 */
export interface IPageBase {
    handle: IpageHandle;
}

/** 面板handle对象接口 */
// tslint:disable-next-line: interface-name
export interface IpageHandle {
    transform: m4m.framework.transform2D;
    onHide(): any;
    show();
    hide();
    remove();
}

/** 加载uipage工具类 */
class LoadTool {
    private static atlasEndMap: cMap<boolean> = new cMap();
    private static priorityAtlas = 110;
    //加载图集工具
    public static async loadAtlas(atlas: string[]) {
        if (!atlas || atlas.length < 1) { return; }
        let urls = [];
        let key: string = "";
        atlas.forEach((atl) => {
            //过滤无效图集
            if (typeof (atl) == "string" && atl != "") {
                key += atl + "_";
                urls.push(`${PageBase.atlasPath}${atl}/${atl}.assetbundle.json`);
            }
        });

        if (this.atlasEndMap.has(key) && this.atlasEndMap.get(key)) { return; }  //已经加载完了

        await loadMgr.Instance.syncLoadList(urls, LoadTool.priorityAtlas);
        // let count = urls.length;
        // let allEnd : Function;
        // let loadedFun = ()=>{
        //     count--;
        //     if(count <= 0){
        //         if(allEnd) allEnd();
        //     }
        // }

        // let waitP = new Promise((resolve)=>{
        //     allEnd = resolve;
        // });

        // while(urls.length > 0){
        //     let url = urls.pop();
        //     if(url){
        //         loadMgr.Instance.load(url,loadedFun,loadTool.priority_atlas);
        //     }
        // }

        // await waitP;

        this.atlasEndMap.set(key, true);
    }

    public static removeAtlasByName(atlas: string[]) {
        let key: string = "";
        atlas.forEach((atl) => {
            //过滤无效图集
            if (typeof (atl) == "string" && atl != "") {
                key += atl + "_";
            }
        });
        if (this.atlasEndMap.has(key)) {
            this.atlasEndMap.delete(key);
        }
    }

    private static priorityPagePfb = 100;
    //加载预设体
    public static async loadPrefeb(prefabName: string) {
        await commTool.loadPrefeb(PageBase.UIPath, prefabName, this.priorityPagePfb);
    }
}

/** uiPage基础类 */
export abstract class PageBase implements IPageBase {
    /** UI prefab 的资源路径 */
    static get UIPath() { return this._UIPath; }
    /** 图集 的资源路径 */
    static get atlasPath() { return this._atlasPath; }

    /**
     * 初始化设置
     * @param UIPath UI prefab 的资源路径
     * @param atlasPath 图集 的资源路径
     */
    public static init(UIPath: string, atlasPath: string) {
        this._UIPath = UIPath;
        this._atlasPath = atlasPath;
    }

    public static hasInstance(subClassName: string) {
        return this.instanceMap[subClassName] != null;
    }
    protected static instanceMap: { [subClassName: string]: PageBase } = {};
    protected static get instance() {
        let thisRef = this.instanceMap[this.name];
        if (!thisRef) {
            thisRef = this.instanceMap[this.name] = new (this as any)();
        }
        return thisRef;
    }

    /** 显示 */
    public static Show() {
        this.addTask("show", arguments);
    }

    /** 隐藏 */
    public static Hide() {
        this.addTask("hide", arguments);
    }

    /** 釋放清理資源 和 handle*/
    public static Destory() {
        this.addTask("destory", arguments);
    }
    public static Init() {
        this.addTask("Init", arguments);
    }

    /** 注册UI事件（中函数中注册各子类UI接收事件） */
    public static regUIEvent() {

    }

    //取是否加载完成  状态
    static get loadState(): number {
        return this.instance.resLoadState;
    }
    /** 0:未加载 、1：加载中 、 2：加载完毕 */
    protected resLoadState = 0;

    /**
     * 添加执行任务
     * @param taskFun 任务方法
     * @param taskArg 任务参数对象 arguments
    */
    public static addTask(taskFunName: string, taskArg: any = null) {

        let thisRef = this.instance;

        let taskFun = thisRef[taskFunName];
        if (!taskFun) {
            console.error(`addTask 任务添加失败 , 目标对象中没有找到 ${taskFunName} 方法 `);
            return;
        }

        // console.error(thisRef.dependentPrefabName+"       "+thisRef.resLoadState);
        if (thisRef.resLoadState == 0) {
            if (taskFun == thisRef.destory) { return; }
            thisRef.taskQueue.push({ fun: thisRef.loadRes, arg: taskArg });
        }
        //未加载完 ， 先放入队列
        if (thisRef.resLoadState != 2) {
            thisRef.taskQueue.push({ fun: taskFun, arg: taskArg });
            thisRef.executeTask();
        } else {
            if (taskFun) { //加载完毕后，直接调用
                taskFun.apply(thisRef, taskArg);
            }
        }
    }
    /** uipage 加载工具类 */
    public static loadTool = LoadTool;

    //全局show 行为
    public static onShowAct: (pageObj: PageBase) => any;
    //全局hide 行为
    public static onHideAct: (pageObj: PageBase) => any;
    //全局destory 行为
    public static onDestoryAct: (pageObj: PageBase) => any;

    /** ui prefab handle */
    public abstract handle: IpageHandle;
    /** handle的类型 */
    public abstract handleType: any;
    /** 依赖的UI prefab 资源名 */
    public abstract dependentPrefabName: string;
    /** 依赖的UI 图集 资源名列表 */
    public abstract dependentAtlasNames: string[];
    private static _UIPath: string = "";
    private static _atlasPath: string = "";

    private taskQueue: { fun: Function, arg: any }[] = [];
    /** 加载完毕后 on 初始化结束 ，page实例对象、handle 构建 完毕 */
    protected oninited() { }    /** on开始加载 */
    protected onStartLoad() { }    private Init() {
    }

    private show() {
        if (this.handle) {
            this.handle.show();
        }
        if (PageBase.onShowAct) { PageBase.onShowAct(this); }
    }
    private hide() {
        if (this.handle) {
            this.handle.hide();
        }
        if (PageBase.onHideAct) { PageBase.onHideAct(this); }
    }

    private destory() {
        delete PageBase.instanceMap[this.constructor.name];
        if (PageBase.onDestoryAct) { PageBase.onDestoryAct(this); }
        this.resLoadState = 0;
        //任務隊列清理
        this.taskQueue.length = 0;
        //handle
        this.handle.hide();
        this.handle.remove();

        if (this.handle instanceof uiPage) {
            let han = this.handle as uiPage;
            let index = uiPage.pages.indexOf(han);
            if (index != -1) {
                uiPage.pages.splice(index, 1);
            }
        }
        this.handle = null;
        //清理 資源
        // commTool.destoryResByUrl(`${PageBase.UIPath}${this.dependentPrefabName}/${this.dependentPrefabName}.assetbundle.json`);

        // let abStrs : string [] = this.dependentAtlasNames;
        // let len = abStrs.length;
        // for (let i = 0; i < len; i++) {
        //     let atlasName:string=abStrs[i];
        //     let url = `${GameMgr.atlasPath}${atlasName}/${atlasName}.assetbundle.json`;
        //     // console.error("移除   " + abStr);
        //     loadMgr.Instance.destoryResByUrl(url);
        // } 

        LoadTool.removeAtlasByName(this.dependentAtlasNames);
    }

    //加载资源
    private async loadRes() {
        if (this.onStartLoad) { this.onStartLoad(); }
        this.resLoadState = 1;
        await LoadTool.loadPrefeb(this.dependentPrefabName);
        await LoadTool.loadAtlas(this.dependentAtlasNames);
        // console.error("资源已加载完成！！！！！！！"+TimeUtil.realtimeSinceStartup);
        this.mountComp();
        this.resLoadState = 2;
    }

    private mountComp() {
        //构建prefab
        let postfix = `.prefab.json`;
        let obj = m4m.framework.sceneMgr.app.getAssetMgr()
        .getAssetByName(`${this.dependentPrefabName}${postfix}`,
                  `auiPre/ui/${this.dependentPrefabName}/${this.dependentPrefabName}.assetbundle.json`) as m4m.framework.prefab;
        if (obj == null) {
            console.error(`${this.dependentPrefabName}${postfix}  ui资源出错！！`);
        }
        let comps = obj.getCloneTrans2D().transform.components;
        let mountSucc = false;
        //寻找组件 并 挂载到 handle
        for (let i = 0; i < comps.length; i++) {
            let comp = comps[i];
            if (comp.comp instanceof uiPage || comp.comp instanceof uiPop) {
                if (!(comp.comp instanceof this.handleType)) {
                    // tslint:disable-next-line: max-line-length
                    console.error(`${this["constructor"].name} 组件挂载到handel失败！prefab上 组件类型 ${comp.comp["constructor"].name} 与 目标类型 ${this.handleType["constructor"].name} 不匹配`);
                    break;
                }

                this.handle = comp.comp;
                mountSucc = true;
                console.log(`${this["constructor"].name}  成功挂载到handel 组件：${this.handle["constructor"].name}   ` + TimeUtil.realtimeSinceStartup);
                if (this.oninited) { this.oninited(); }
                break;
            }
        }
        if (!mountSucc) { console.error(`${this["constructor"].name} 组件挂载到handel失败！请检查prefab 根节点上是否挂载ui Handel 组件 `); }
    }

    //执行任务
    private async executeTask() {
        if (this.resLoadState == 1 || this.taskQueue.length <= 0) { return null; }
        let task = this.taskQueue.shift();
        if (task.fun) {
            await task.fun.apply(this, task.arg);
        }
        this.executeTask();
    }

}

/**全屏 面板handle 基组件类 */
// tslint:disable-next-line: class-name
export abstract class uiPage extends m4m.framework.behaviour2d implements IpageHandle {

    private static hideAll(without: uiPage) {
        uiPage.pages.forEach((page) => {
            if (page != without && !page.notHideOnOtherShow) {
                page.hide();
            }
        });
    }
    /** page队列 */
    public static pages: uiPage[] = [];

    public uiLayer = 0; // 0: base 、1 : high
    public notHideOnOtherShow = false; //其他面板show 时 不隐藏

    public onHide: () => any;
    public onShow: () => any;
    public onDispose: () => any;
    private inited = false;

    /** 显示UI页面  */
    public show() {
        if (!this.inited) {
            this.init();
        }

        let layTran = this.getParent();
        layTran.addChild(this.transform);
        this.transform.visible = true;
        if (this.onShow) {
            this.onShow();
        }
        uiPage.hideAll(this);
    }

    /** 隐藏UI页面 */
    public hide() {
        if (!this.inited || !this.transform.visible) { return; }
        if (this.onHide) {
            this.onHide();
        }
        this.transform.visible = false;
        if (this.transform.parent) {
            this.transform.parent.removeChild(this.transform);
        }
    }

    public remove() {
        if (this.onDispose) {
            this.onDispose();
        }
    }
    private init() {
        let layTran = this.getParent();
        uiPage.pages.push(this);
        layTran.addChild(this.transform);
        this.inited = true;
    }

    private getParent() {
        let layTran: m4m.framework.transform2D;
        switch (this.uiLayer) {
            case 0: layTran = uiMgr.baselayer; break;
            case 1: layTran = uiMgr.highlayer; break;
            default : layTran = uiMgr.baselayer;
        }
        return layTran;
    }
}

/**pop 面板handle 基组件类 */
// tslint:disable-next-line: class-name
export abstract class uiPop extends m4m.framework.behaviour2d implements IpageHandle {

    public onHide: () => any;
    public onShow: () => any;
    public onDispose: () => any;
    private inited = false;

    public show() {
        if (!this.inited) {
            this.init();
        }
        this.transform.visible = true;
        uiMgr.poplayer.addChild(this.transform);
        if (this.onShow) {
            this.onShow();
        }
    }

    public hide() {
        if (!this.inited || !this.transform.visible) { return; }
        if (this.onHide) {
            this.onHide();
        }
        this.transform.visible = false;
        if (this.transform.parent) {
            this.transform.parent.removeChild(this.transform);
        }

    }
    public remove() {
        if (this.onDispose) {
            this.onDispose();
        }
    }
    private init() {
        let layTran = uiMgr.poplayer;
        layTran.addChild(this.transform);
        this.inited = true;
    }
}
