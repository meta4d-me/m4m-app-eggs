import { cMap } from "../Data/Map";
import { loader } from "./loader";

// tslint:disable-next-line: class-name
export class loadMgr {
    static get Instance() {
        if (!this._instance) { this._instance = new loadMgr(); }
        return this._instance;
    }
    private get assetMgr() {
        if (!this._assetMgr) { this._assetMgr = m4m.framework.sceneMgr.app.getAssetMgr(); }
        return this._assetMgr;
    }

    /** 并行加载最大数量 */
    public maxLoadingCount = 100;

    constructor() {
        this.loopCkLoaderTimeOut();
    }
    private static _instance: loadMgr;

    private endCaseDic: cMap<Function[]> = new cMap(); // 客户结束回调 , [key:url,value:backFun]
    private loadedDic: cMap<loader> = new cMap();  // 加载完的loader ，[key:url,value:loader]
    private addLoadDic: cMap<loader> = new cMap();  // 加载loader ，[key:url,value:loader]
    private waitLoaders: loader[] = [];
    private loadingLoaders: loader[] = [];
    private index = 0;

    private readonly ckTimeoutGap = 2000; //loader 超时 检查间隔时间

    private _assetMgr: m4m.framework.assetMgr;

    /**
     * 异步并行加载  资源列表
     * @param urls 
     * @param priority 
     */
    public syncLoadList(urls: string[], priority = 0) {
        return new Promise((resolve) => {
            let count = urls.length;
            let allEnd: Function;
            let loadedFun = () => {
                count--;
                if (count <= 0) {
                    resolve(null);
                }
            };

            // let waitP = new Promise((resolve) => {
            //     allEnd = resolve;
            // });

            let len = urls.length;
            for (let i = 0; i < len; i++) {
                this.load(urls[i], loadedFun, priority);
            }
        });
    }

    /**
     * 异步加载
     * @param url 
     * @param priority 
     */
    public syncLoad(url: string, priority = 0) {
        return new Promise((resolve) => {
            this.load(url, (_url) => {
                // console.error("异步加载资源   "+_url+"         "+TimeUtil.realtimeSinceStartup);
                resolve(null);
            }, priority);
        });
    }

    /**
     * 加载 Asset 通过 ，文件夹路径 + 资源名
     * @param dirPath  文件夹路径
     * @param assName   资源名
     * @param endFun 结束回调方法
     * @param priority 优先级
     */
    public loadByName(dirPath: string, assName: string, endFun: (url: string, assName: string) => any, priority = 0) {
        let url = `${dirPath}${assName}/${assName}.assetbundle.json`;
        this.load(url, () => {
            if (endFun) { endFun(url, assName); }
        }, priority);
    }

    /**
     * 加载 Asset to 引擎环境 
     * @argument url 资源url
     * @argument endFun loader end 回调方法
     * @argument priority 优先级 默认0 ，值越大越优先
     */
    public load(url: string, endFun: (url: string) => any, priority = 0): loader {
        if (this.loadedDic.has(url)) {
            if (endFun) {
                endFun(url);
            }
            return this.loadedDic.get(url);
        }

        //loader 新增判断
        let lod: loader;
        let isNew = !this.addLoadDic.has(url);
        if (isNew) {
            lod = new loader(url);
            lod.priority = priority;
            this.addLoadDic.set(url, lod);
        } else {
            lod = this.addLoadDic.get(url);
        }

        //结束回调入队
        let funArr: Function[];
        if (!this.endCaseDic.has(url)) {
            this.endCaseDic.set(url, []);
        }
        funArr = this.endCaseDic.get(url);
        funArr.push(endFun);

        //执行加载
        if (isNew) {
            this.addLoader(lod);
        }
        return lod;
    }

    /**
     * 加载 并返回资源对象
     * @param url 
     * @param priority 
     */
    public async syncLoadGain<T extends m4m.framework.IAsset>(url: string, priority = 0) {
        let i = url.lastIndexOf("/");
        let file = url.substring(i + 1);
        if (!file) { return; }
        await this.syncLoad(url, priority);
        return m4m.framework.sceneMgr.app.getAssetMgr()
            .getAssetByName<T>(file);
    }

    //检查超时 后 强制重新加载
    private loopCkLoaderTimeOut() {
        setTimeout(() => {
            //检查所有 loader
            let len = this.loadingLoaders.length;
            let nowTime = Date.now();
            for (let i = 0; i < len; i++) {
                let l = this.loadingLoaders[i];
                if (l) {
                    l.ckOfTimeOut(nowTime);
                }
            }
            this.loopCkLoaderTimeOut();
        }, this.ckTimeoutGap);
    }

    private addLoader(lod: loader): void {
        this.index++;
        lod.id = this.index;
        lod.assetmgr = this.assetMgr;
        lod.onEnd = this.onLoadEndOne.bind(this);
        // lod.onLoadFail = this.onLoadFail.bind(this);
        this.waitLoaders.push(lod);
        this.doLoad();
    }

    private doLoad() {
        //加满 最大加载线程
        if (this.loadingLoaders.length > this.maxLoadingCount) {
            //   console.error("警告！！！  当前加载列表中的数量超过 "+GameMgr.maxLoadingCount);
            return;
        }

        let lod = this.getNext();
        if (!lod) { return; }
        let idx = this.waitLoaders.indexOf(lod);
        if (idx != -1) {
            this.waitLoaders.splice(idx, 1);
        }
        this.loadingLoaders.push(lod);
        lod.load();

        this.doLoad();
    }

    private getNext() {
        let temp: loader = this.waitLoaders[0];
        this.waitLoaders.forEach((l) => {
            if (l && l.priority > temp.priority) { temp = l; }
        });
        return temp;
    }

    private onLoadEndOne(lod: loader) {
        let idx = this.loadingLoaders.indexOf(lod);
        if (idx == -1) { return; } //没在 list 中 不执行
        this.loadingLoaders.splice(idx, 1);

        this.loadedDic.set(lod.url, lod);
        this.doLoad();
        //通知 regers

        let backFuns;
        if (this.endCaseDic.has(lod.url)) {
            backFuns = this.endCaseDic.get(lod.url);
        }

        if (backFuns) {
            backFuns.forEach((fun) => {
                if (fun) { fun(lod.url, lod.preName); }
            });
            backFuns.length = 0; //置空
        }
    }

    // private reloadWaitTime = 300;
    //加载失败后 再次放入加载等待队列的尾部
    private onLoadFail(lod: loader) {
        // if(!lod) return;
        // let idx = this.loadingLoaders.indexOf(lod);
        // if (idx == -1) return; //没在 list 中 不执行
        // this.loadingLoaders.splice(idx, 1);
        // console.warn(`下载资源失败  onLoadFail retry loading \n ${lod.url}`);
        // setTimeout(() => {
        //     this.waitLoaders.push(lod);
        //     lod.assetmgr.unload(lod.url);
        //     lod.load();
        //     console.warn(`下载资源失败  已重新加入下载列表 \n ${lod.url}`);
        // }, this.reloadWaitTime);
    }

    // //通过url 释放清理资源
    // public destoryResByUrl(url: string) {

    //     this.loadedDic.delete(url);
    //     this.addLoadDic.delete(url);
    //     this.endCaseDic.delete(url);
    //     for (let i: number = 0; i < this.waitLoaders.length; ++i) {
    //         let load = this.waitLoaders[i];
    //         if (load.url == url) {
    //             this.waitLoaders.splice(i, 1);
    //             break;
    //         }
    //     }
    //     for (let i: number = 0; i < this.loadingLoaders.length; ++i) {
    //         let load = this.loadingLoaders[i];
    //         if (load.url == url) {
    //             this.loadingLoaders.splice(i, 1);
    //             break;
    //         }
    //     }

    //     //texts缓存
    //     commTool.loadedTextsMap.delete(url);

    //     //commTool 缓存清理
    //     let prefMap = commTool.PrefebMap;
    //     if(prefMap.has(url) && prefMap.get(url)){
    //         prefMap.delete(url);
    //     }

    //     //assetMgr Map
    //     // delete GameMgr.assetMgr.maploaded[url];

    //     let idx = url.lastIndexOf("/");
    //     let abStr: string = url.substr(idx + 1);
    //     let ab = this.assetMgr.getAssetBundle(abStr);
    //     if (ab) {
    //         ab.unload(true);
    //     }
    // }

    // public destoryResPath(dirPath: string, prefabName: string){
    //     this.destoryResByUrl(`${dirPath}${prefabName}/${prefabName}.assetbundle.json`);
    // }
}