import { newLoader } from "./newLoader";
import { CTimer } from "../Time/CTimer";
import { cMap } from "../Data/Map";
import { miniAPIType } from "../Tools/miniGame";

export enum ResLoadType {
    NONE = 0,
    SCENE = 1,//Scene
}
export enum LoadType {
    ARRAYBUFFER = 0,
    JSON = 1,
    IMAGE = 2,//Scene
}
// tslint:disable-next-line: class-name
export class newLoaderManager {

    public static get Instance(): newLoaderManager {
        if (this.instance == null) {
            this.instance = new newLoaderManager();
        }

        return this.instance;
    }
    //-------------------项目配置----------------------------
    // /** 项目当前 小游戏平台 */
    // public static miniType: miniAPIType;
    // /** 项目当前CDN url */
    // public static CDNURL: string;
    // /** 小游戏  */
    // public static miniRequestFun: (opt) => any;
    //-----------------------------------------------------

    public static loaderCount = 10;
    // public loaders: Dictionary = new Dictionary();
    public loaders: cMap<newLoader> = new cMap<newLoader>();

    /// <summary>
    /// 正在加载中的loader列表
    /// </summary>
    public currentLoaders: newLoader[] = new Array<newLoader>();

    /// <summary>
    /// 所有等待加载的Loader列表
    /// </summary>
    public waitLoaders: newLoader[] = new Array<newLoader>();
    constructor() {
        this.loadFailBackList = new Array<newLoader>();
        //每间隔 1200 毫秒取一次 加入重试load
        let timeID = CTimer.Instance.loopTimeUpdate(1200, this.failBackFun.bind(this));
    }

    private static instance: newLoaderManager;

    /// <summary>
    /// 只要产生加载文件即生成一个id;
    /// </summary>
    private index: number = 0;
    private loadFailBackList: newLoader[];

    public load(url: string, onLoadFinished: Function, data: any = null, loadType: LoadType = LoadType.ARRAYBUFFER): newLoader {
        let loader: newLoader;
        if (this.loaders.has(url)) {
            loader = this.loaders.get(url);

            if (loader && onLoadFinished) {
                onLoadFinished(data);
            }else {
                loader.addCallBack(onLoadFinished, data);
            }
        } else {
            loader = new newLoader();
            loader.loaderType = loadType;
            this.loaders.set(url, loader);
            loader.url = url;
            loader.addCallBack(onLoadFinished, data);
            // this.addLoader(loader);
        }
        return loader;
    }

    public startLoader(): void {
        if (this.waitLoaders.length == 0 || newLoaderManager.loaderCount <= this.currentLoaders.length) { return; }
        let nextLoader: newLoader = this.getNextLoader();

        if (nextLoader != null) {
            ///从等待加载的列表中移除,添加到当前加载列表中
            let index: number = this.waitLoaders.indexOf(nextLoader);
            if (index != -1) {
                this.waitLoaders.splice(index, 1);
            }
            //Debug.LogError("加入加载列表中");
            this.currentLoaders.push(nextLoader);
            nextLoader.load();
            ///判断下同时加载的数量是否达到默认设置的数量如果没有则继续开始新的加载
            if (this.currentLoaders.length <= newLoaderManager.loaderCount) {
                this.startLoader();
            }
        }
    }

    public loaderEnd(loader: newLoader): void {
        let index: number = this.currentLoaders.indexOf(loader);
        if (index != -1) {
            this.currentLoaders.splice(index, 1);
        }
        this.startLoader();
    }

    /// <summary>
    /// 添加loader
    /// </summary>
    /// <param name="loader"></param>
    public addLoader(loader: newLoader): void {
        this.index++;
        loader.id = this.index;
        loader.endFunction = this.loaderEnd.bind(this);
        this.waitLoaders.push(loader);
        this.startLoader();
    }

    /// <summary>
    /// 删除loader
    /// </summary>
    public removeLoader(url: string): void {
        if (!this.loaders.has(url)) { return; }

        let loader: newLoader = this.loaders.get(url);

        let index: number = this.waitLoaders.indexOf(loader);
        if (index != -1) {
            this.waitLoaders.splice(index, 1);
        }

        index = this.currentLoaders.indexOf(loader);
        if (index != -1) {
            this.currentLoaders.splice(index, 1);
        }

        this.loaders.delete(url);
        loader.dispose();
    }

    //加入失败列表
    public addFail(loader: newLoader): void {
        let index: number = this.loadFailBackList.indexOf(loader);
        console.error("重新加载     " + loader.url);
        if (index == -1) {
            this.loadFailBackList.push(loader);
        }
    }

    /// <summary>
    /// 获取下一个需要加载的loader,根据需要加载的优先级进行排序
    /// </summary>
    private getNextLoader(): newLoader {
        let loader: newLoader = this.waitLoaders[0];
        let temp: newLoader;
        for (let i: number = 0; i < this.waitLoaders.length; i++) {
            temp = this.waitLoaders[i];
            if (temp.priority > loader.priority) { loader = temp; }
        }
        return loader;
    }

    //失败重试
    private failBackFun() {
        if (this.loadFailBackList.length > 0) {
            let loader: newLoader = this.loadFailBackList.shift();
            loader.load();
            console.error(loader.url + "   下载失败  重新 下载loadArrayBuffer");
        }

        // for (let i: number = 0; i < this.loadFailBackList.length; i++) {
        //     let loader: Loader = this.loadFailBackList[i];
        //     setTimeout(() => {
        //         let index = loader.url.lastIndexOf("&rand");
        //         if (index != -1)
        //             loader.url = loader.url.substring(0, index);
        //         loader.url += "&randT=" + Date.now();
        //         loader.load();
        //         console.error(loader.url + "   下载失败  重新 下载loadArrayBuffer");
        //     }, i * 200);
        // }
        // this.loadFailBackList.length = 0;
    }
}
