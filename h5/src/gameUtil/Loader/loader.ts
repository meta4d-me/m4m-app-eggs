// tslint:disable-next-line: class-name
export class loader {
    /** loader已经结束 */
    get isEnd() { return this._isEnd; }
    public preName: string = "";

    public assetmgr: m4m.framework.assetMgr;
    public id = -1;
    public url: string = "";
    //优先级
    public priority = 0;

    /** 加载进度 0-1 */
    public progress: number = 0;
    /** 资源总大小 */
    public resSize = 0;
    /** 加载了的资源大小 */
    public loadedSize = 0;
    /* 总需要加载的文件数量*/
    public fileCount = 0;
    /* 当前已经加载文件数量 */
    public fileLoadedCount = 0;
    /** 加载中的时间 */
    public loadingTime = 0;

    /** 加载完毕 */
    public onEnd: (l: loader) => any;
    /** 加载失败 */
    public onLoadFail: (l: loader) => any;
    /** 进度更新 */
    public onProgress: (prog, Loadfiles, loadSize) => any;
    constructor(url: string, preName: string = "") {
        this.url = url;
        this.preName = preName;
    }
    /** 等待最大时间 */
    private readonly waitMaxTime = 1000 * 9;
    private _isEnd = false;

    private lastckTime = Date.now();
    /** 超时重试 次数 */
    private timeOutTryLoadCount = 0;  //防止网络太差，调用堆积

    public load() {
        if (this._isEnd) { return; }
        // console.error(`${this.url}`);
        //downLoadFinish  回调  下载完成就触发
        this.assetmgr.load(this.url, m4m.framework.AssetTypeEnum.Auto, this.onloading.bind(this), this.downLoadFinish.bind(this));
    }

    /**
     * 检查超时
     * @param currTime 当前时间 
     */
    public ckOfTimeOut(currTime: number) {
        if (isNaN(currTime) || this._isEnd) { return; }
        let addTime = currTime - this.lastckTime;
        if (isNaN(addTime) || addTime < 0) { addTime = 0; }
        this.loadingTime += addTime;
        this.lastckTime = currTime;
        let maxTime = this.waitMaxTime * Math.pow(2, this.timeOutTryLoadCount);
        if (this.loadingTime > maxTime) {
            this.retryLaod();
        }
    }
    private downLoadFinish() {
        //下载完成回调
    }

    private onloading(sta: m4m.framework.stateLoad) {
        if (this._isEnd) { return; }    //已近完成不再回调
        if (sta.iserror) {
            let errStr = `err by loader.onloading()\n URL:${this.url} \n`;
            sta.errs.forEach((error) => {
                errStr += `\n ${error.stack}`;
            });
            console.error(`onloading 下载资源错误！  ${errStr}`);
        }

        if (sta.isloadFail || sta.iserror) {
            //加载失败
            if (this.onLoadFail != null) {
                this.onLoadFail(this);
            }
            // //重试
            // setTimeout(() => {
            //     this.retryLaod();
            // }, 1000);
            return;
        }

        this.fileCount = sta.totaltask;
        this.fileLoadedCount = sta.curtask;
        this.progress = sta.progress;
        this.resSize = sta.totalByteLength;
        this.loadedSize = sta.curByteLength;
        if (this.onProgress) {
            this.onProgress(this.progress, this.fileCount, this.loadedSize);
        }

        if (sta.isfinish) {
            this._isEnd = true;
            if (this.onEnd != null) {
                // console.error(`onEnd 加载完毕  ${this.url}`);
                this.onEnd(this);
            }
        }
    }

    //重试 加载
    private retryLaod() {
        console.error(`资源重试加载 ，已等待时间： ${this.loadingTime}， 已经重试次数 ： ${this.timeOutTryLoadCount} ，url ${this.url}`);
        //检查超时之后再 重试下载
        this.loadingTime = 0;
        this.assetmgr.unload(this.url);  //先释放之前的load
        this.load();
        this.timeOutTryLoadCount++;
    }
}