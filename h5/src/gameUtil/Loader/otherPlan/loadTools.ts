
// tslint:disable-next-line: class-name
export class loadTools {
    public static urlCaseDic: { [url: string]: number } = {};
    public static retryTime: number = 1000;
    public static retryCount: number = 9999;
    /**
     * 
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     * @param loadedFun 正常加载完成后回调
     */
    public static xhrLoad(url: string, fun: (ContentData: any, _err: Error, isloadFail?: boolean) => void,
                          onprocess: (curLength: number, totalLength: number) => void = null,
                          responseType: XMLHttpRequestResponseType, loadedFun: (req: XMLHttpRequest) => void) {
        let req = new XMLHttpRequest();
        let isLoaded = false;
        req.open("GET", url);
        req.responseType = responseType;
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    if (this.urlCaseDic[url]) {
                        delete this.urlCaseDic[url];
                    }
                    isLoaded = true;
                    loadedFun(req);
                    // if (fun)
                    //     fun(req, null, false);
                } else {
                    // tslint:disable-next-line: switch-default
                    switch (req.status) {
                        case 404:
                            if (fun) {
                                fun(null, new Error("got a 404:" + url));
                            }
                            console.error("got a 404:" + url);
                            this.urlCaseDic[url] = this.retryCount;
                    }
                }
            }
        };
        req.onprogress = (ev) => {
            if (onprocess) { onprocess(ev.loaded, ev.total); }
        };
        req.onerror = (ev) => {
            if (fun) {
                fun(null, new Error(`URL : ${url} \n onerr on req: `), true);
            }
        };
        req.onloadend = () => {
            //console.error(" is onload");
            if (!isLoaded) {
                // this.loadFail(req, url, fun, onprocess, responseType, loadedFun);
                if (fun) {
                    fun(null, new Error(`URL : ${url} \n onerr on req: `), true);
                }
            }
        };

        // try
        // {
        req.send();
        // } catch (err)
        // {
        //     fun(null, err);
        // }
    }
    // static loadFail(xhr: XMLHttpRequest, url, fun, onprocess, responseType, loadedFun) {
    //     console.error(`下载失败: ${url}  status:${xhr.status}, ${this.retryTime}/ms 后重试  testtesttesttesttest`);
    //     this.urlCaseDic[url] = this.urlCaseDic[url] || 0;
    //     if (this.urlCaseDic[url] >= this.retryCount) {
    //         this.urlCaseDic[url] = 0;
    //         if (fun)
    //             fun(null, new Error("load this url fail  ：" + url), true);  //throw error after retry some times
    //         console.error(`------ load this url fail URL:${url}  `);
    //     } else {
    //         setTimeout(() => {
    //             this.urlCaseDic[url]++;
    //             this.xhrLoad(url, fun, onprocess, responseType, loadedFun);
    //         }, this.retryTime);
    //     }
    // }
    // /**
    //  * @public
    //  * @language zh_CN
    //  * @classdesc
    //  * 加载text资源
    //  * @param url 加载路径
    //  * @param fun 加载结果回调函数
    //  * @param onprocess 加载进度
    //  * @version m4m-m4m 1.0
    //  */
    // tslint:disable-next-line: max-line-length
    // static loadText(url: string, fun: (_txt: string, _err: Error, isloadFail?: boolean) => void, onprocess: (curLength: number, totalLength: number) => void = null): void {
    //     this.xhrLoad(url, fun, onprocess, "text", (req) => {
    //         fun(req.responseText, null);
    //     });
    // }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载text资源
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     * @version m4m-m4m 1.0
     */
    public static loadJson(url: string, fun: (_txt: string, _err: Error, isloadFail?: boolean) => void,
                           onprocess: (curLength: number, totalLength: number) => void = null): void {
        this.xhrLoad(url, fun, onprocess, "json", (req) => {
            fun(req.response, null);
        });
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载arraybuffer资源
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     */
    public static loadArrayBuffer(url: string, fun: (_bin: ArrayBuffer, _err: Error, isloadFail?: boolean) => void,
                                  onprocess: (curLength: number, totalLength: number) => void = null): void {
        //req.responseType = "arraybuffer";//ie 一定要在open之后修改responseType
        this.xhrLoad(url, fun, onprocess, "arraybuffer", (req) => {
            fun(req.response, null, false);
        });
    }

    // /**
    //  * @public
    //  * @language zh_CN
    //  * @classdesc
    //  * 加载二进制资源
    //  * @param url 加载路径
    //  * @param fun 加载结果回调函数
    //  * @param onprocess 加载进度
    //  * @version m4m-m4m 1.0
    //  */
    // tslint:disable-next-line: max-line-length
    // static loadBlob(url: string, fun: (_blob: Blob, _err: Error, isloadFail?: boolean) => void, onprocess: (curLength: number, totalLength: number) => void = null): void {
    //     m4m.io.xhrLoad(url, fun, onprocess, "blob", (req) => {
    //         fun(req.response, null);
    //     });
    // }

    // /**
    //  * @public
    //  * @language zh_CN
    //  * @classdesc
    //  * 加载图片资源
    //  * @param url 加载路径
    //  * @param fun 加载结果回调函数
    //  * @param progress 加载进度
    //  */
    // tslint:disable-next-line: max-line-length
    // static loadImg(url: string, fun: (_tex: HTMLImageElement, _err?) => void, onprocess: (curLength: number, totalLength: number) => void = null): void {
    //     let img = new Image();
    //     //webgl跨域渲染要这样玩 [crossOrigin = ""]否则服务器允许跨域也没用
    //     img.crossOrigin = "";
    //     img.src = url;
    //     img.onload = () => {
    //         if (fun) fun(img);
    //     }
    //     img.onerror = (_err) => {
    //         if (fun) fun(img, _err);
    //     }
    // }
}