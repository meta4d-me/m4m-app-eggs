import { cMap } from "../Data/Map";
import { testCreat } from "../Loader/otherPlan/testCreat";
import { miniAPIType, miniGame } from "../Tools/miniGame";
import { LoadType, newLoaderManager } from "./newLoaderManager";
import { newLoadTools } from "./newLoadTools";

// tslint:disable-next-line: class-name
export class newLoader {
    public static _loadJson(url: string, fun: (_txt: string, _err: Error, isloadFail?: boolean) => void,
                            onprocess: (curLength: number, totalLength: number) => void = null): void {
        if (miniGame.miniType != miniAPIType.none) {
            let path = testCreat.CDNURL + url;
            miniGame.request({
                url: path,
                success(res) {
                    fun(res.data, null, false);
                },
                fail() {
                    fun(null, null, true);
                },

            });
        } else {
            newLoadTools.xhrLoad(url, fun, onprocess, "json", (req) => {
                fun(req.response, null);
            });
        }
    }
    //微信可复写
    public static _loadImg(url: string, cb: (img, _err) => void) {
        let img = new Image();
        //webgl跨域渲染要这样玩 [crossOrigin = ""]否则服务器允许跨域也没用
        img.crossOrigin = "";
        img.src = url;
        img.onload = () => {
            if (cb) { cb(img, null); }
        };
        img.onerror = (_err) => {
            console.error(_err);
            if (cb) { cb(img, _err); }
        };
    }
    public id: number;

    /// <summary>
    /// 用于通知loadermanage开始下一个加载
    /// </summary>
    public endFunction: Function;

    public loaderEvents: CallBackData[];
    /// <summary>
    /// 加载路径
    /// </summary>
    public url: string;

    /// <summary>
    /// 优先级,数值越高越优先
    /// </summary>
    public priority: number = 0;

    /// <summary>
    /// 加载失败的重试次数
    /// </summary>
    /// <returns></returns>
    public timeoutCount: number = 3;

    /// <summary>
    /// 加载失败的重试次数
    /// </summary>
    /// <returns></returns>
    public timeout: number = 3;
    /// <summary>
    /// 资源的引用次数
    /// </summary>
    public userCount: number = 0;

    /// <summary>
    /// 加载进度
    /// </summary>
    /// <returns></returns>
    public progress: number = 0;

    ///已经加载的字节大小
    public bytesLoaded: number = 0;
    //总需求加载大小
    public bytesTotal: number = 0;
    public timer: cMap<number> = new cMap<number>();
    //总需要加载的文件数量
    public fileCount: number = 0;
    //当前已经加载文件数量
    public fileLoadedCount: number = 0;
    public loaderType = LoadType.ARRAYBUFFER;
    public bin: any;

    public constructor() {
        this.loaderEvents = new Array<CallBackData>();
        this.removeList = new Array<CallBackData>();
    }

    private _progressCallBack: Function;

    private removeList: CallBackData[];
    public load() {
        if (this.bin && this.endFunction) {
            this.endFunction(this, this.bin);
            return this.bin;
        }
        this.timer.set(this.url, Date.now());
        try {
            switch (this.loaderType) {
                case LoadType.ARRAYBUFFER:
                    return new Promise((resolve: ((a: ArrayBuffer) => void)) => {
                        // console.error("开始加载       " + this.url + "         " + (this.timer.get(this.url) - Date.now()) + "     ");
                        newLoadTools.loadArrayBuffer(this.url, (bin, urlStr, isLoadFail) => {
                            if (isLoadFail) {
                                newLoaderManager.Instance.addFail(this);
                                // LoaderManage.Instance.addFail(this);
                                // console.error("11111111111111111111111111111111");
                                resolve(null);
                            } else {
                                // console.error("加载成功       " + this.url + "         " + (this.timer.get(this.url) - Date.now()) + "     ");
                                if (bin) {
                                    bin["_url_"] = this.url;
                                    this.bin = bin;
                                    this.endFunction(this, bin);
                                    // if (BeginnerGuidManger.needGuid) {
                                    //     jsManager.noviceGuideFun(url, 1)
                                    // }
                                }
                                resolve(bin);
                            }
                        });
                    });
                case LoadType.IMAGE:
                    return new Promise((resolve: ((a: HTMLImageElement) => void)) => {
                        if (miniGame.miniType != miniAPIType.none) {
                            m4m.framework.assetMgr.prototype["_loadImg"](this.url, (bin) => {
                                if (bin) {
                                    bin["_url_"] = this.url;
                                    this.bin = bin;
                                    this.endFunction(this, bin);
                                }
                                resolve(bin);
                            });

                        } else {
                            newLoader._loadImg(this.url, (bin) => {
                                if (bin) {
                                    bin["_url_"] = this.url;
                                    this.bin = bin;
                                    this.endFunction(this, bin);
                                    // if (BeginnerGuidManger.needGuid) {
                                    //     jsManager.noviceGuideFun(url, 1)
                                    // }
                                }
                                resolve(bin);
                            });
                        }
                    });
                case LoadType.JSON:
                    return new Promise((resolve: ((a: string) => void)) => {
                        // console.error("开始加载       " + this.url + "         " + (this.timer.get(this.url) - Date.now()) + "     ");

                        newLoader._loadJson(this.url, (bin, urlStr, isLoadFail: boolean) => {

                            if (isLoadFail) {
                                newLoaderManager.Instance.addFail(this);
                                resolve(null);
                            } else {
                                // console.error("加载成功       " + this.url + "         " + (this.timer.get(this.url) - Date.now()) + "     ");
                                if (bin) {
                                    bin["_url_"] = this.url;
                                    this.bin = bin;
                                    this.endFunction(this, bin);
                                }
                                resolve(bin);
                            }
                        });
                    });
                default:
            }

        } catch (er) {
            console.error(this.url + " 报错 " + er);
        }

    }

    public dispose() {
        for (let i = 0; i < this.loaderEvents.length; i++) {
            let data: CallBackData = this.loaderEvents[i];
            data.dispose();
            data = null;
        }
        this.loaderEvents.length = 0;

        this.endFunction = null;
        this._progressCallBack = null;
    }
    //设置加载进度回调
    public addProgressCallBack(value: Function) {
        this._progressCallBack = value;
    }

    public addCallBack(callBack: Function, obj: any) {
        let cb: CallBackData = new CallBackData();
        cb.callback = callBack;
        cb.data = obj;
        this.loaderEvents.push(cb);
    }
    public removeCallBack(callBack: Function): void {
        for (let i = 0; i < this.loaderEvents.length; i++) {
            let cc: CallBackData = this.loaderEvents[i];
            if (cc.callback == callBack) {
                this.removeList.push(cc);
            }
        }

        for (let k = 0; k < this.removeList.length; k++) {
            let recallbackData: CallBackData = this.removeList[k];
            let index: number = this.loaderEvents.indexOf(recallbackData);
            if (index != -1) {
                this.loaderEvents.splice(index, 1);
            }
        }
        this.removeList.length = 0;
    }
}

class CallBackData {
    public callback: Function;
    public data: any;
    public dispose() {
        this.callback = null;
        this.data = null;
    }
}