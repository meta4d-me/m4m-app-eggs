import { miniGame } from "../Tools/miniGame";

type cbFun = (isSuccess: boolean) => void;
type codeData = { queue: cbFun[], finish: boolean, scriptID?: string };

export class LoaderLibManager {
    private static instance: LoaderLibManager;
    public static get Instance(): LoaderLibManager {
        if (this.instance == null) {
            this.instance = new LoaderLibManager();
        }
        return this.instance;
    }
    private codeMap: { [url: string]: codeData } = {};
    private idIdx: number = 0;
    //加载js
    public addLib(lib: string, callback?: (isSuccess: boolean) => void) {
        let url: string = lib;
        if (this.codeMap[url]) {
            if (this.codeMap[url].finish != true) {
                this.codeMap[url].queue.push(callback);
                return;
            }
            return callback != null ? callback(true) : null;
        }

        let script = document.createElement("script");
        script.onload = () => {
            //this.codeMap[url] = script.id;
            // if (callback)
            //    callback();
            let load = this.codeMap[url];
            load.finish = true;
            while (load.queue.length > 0) {
                load.queue.shift()(true);
            }
        };
        script.id = `${++this.idIdx}`;

        this.codeMap[url] = {
            queue: [],
            finish: false,
            scriptID: script.id,
        };
        this.codeMap[url].queue.push(callback);

        script.onerror = (e) => {
            console.error(e);
            return callback != null ? callback(false) : null;
        };

        script.src = url;
        document.getElementsByTagName("head")[0]
            .appendChild(script);
        document.head.appendChild(script);
    }
    //移除js
    public removeLib(lib: string): boolean {
        let url = lib;
        if (!this.codeMap[url]) {
            return false;
        }
        let script = document.getElementById(this.codeMap[url].scriptID);
        if (script) {
            script.remove();
        }
        return true;
    }

    /**
     * 加载 小游戏平台的分包
     * @param packageName 分包名
     * @param callback 回调函数
     */
    public addSubpackage(packageName: string, callback?: cbFun) {
        let data = this.codeMap[packageName];
        if (data) {
            if (!callback) { return; }
            if (data.finish) {
                //已经加载过了
                callback(true);
            } else {
                data.queue.push(callback);
            }
            return;
        }
        this.codeMap[packageName] = data = {
            queue: [],
            finish: false,
        };
        if (callback) {data.queue.push(callback); }
        miniGame.loadSubpackage({
            name: packageName,
            success: (res) => {
                data.finish = true;
                while (data.queue.length > 0) {
                    data.queue.shift()(true);
                }
            },
            fail: (res) => {
                while (data.queue.length > 0) {
                    data.queue.shift()(false);
                }
                console.error(`addSubpackage fail , res : ${res}`);
            },
        });
    }
}