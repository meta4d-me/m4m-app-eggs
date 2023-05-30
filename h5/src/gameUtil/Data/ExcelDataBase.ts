import { ioTool } from "../Tools/ioTool";
import { EventDispatcher } from "./EventDispatcher";
import { cMap } from "./Map";

export class ExcelDataBase extends EventDispatcher {
    public static excelData = "res/ExcelData/";
    public static excelSplitData = "res/ExcelDataSplit/";

    private static _listMap: { [name: string]: cMap<any> } = {};
    private static loadedDic: cMap<any> = new cMap();  // 加载完的loader
    private static loadingDic: cMap<Function[]> = new cMap();  // 加载中loader
    protected static get _list() {
        let _name = this.name;  //当前子类 类名
        let _map = this._listMap[_name];
        if (!_map) {
            _map = this._listMap[_name] = new cMap();
        }
        return _map;
    }
    protected static set _list(v) {
        let _name = this.name;
        this._listMap[_name] = v;
    }
    public static getDataByIDCallBack(id: number, callBack: Function) {
        if (!this._list.get(id)) {
            let url = `${this.excelSplitData}${this.name}/${this.name}${id}.json`;
            if (this.loadedDic.has(url)) {
                if (callBack) {
                    callBack(this._list.get(id));
                }
                return;
            }

            //加载中 
            if (this.loadingDic.has(url)) {
                //不是第一个 ，加入列表
                let loadingList = this.loadingDic.get(url);
                loadingList.push(callBack);
                this.loadingDic.set(url, loadingList);
            } else {
                this.loadingDic.set(url, []);
                // console.error("加载人物表配置多次！！", url);
                this.loadArrayBuffer(url)
                    .then((bd) => {
                        this.loadedDic.set(url, true);
                        let bytes = new ioTool();
                        bytes.write(new Uint8Array(bd));
                        this.parseData(bytes);
                        bytes.dispose();
                        if (callBack) {
                            callBack(this._list.get(id));
                        }
                        let loadingList = this.loadingDic.get(url);
                        for (let i = 0; i < loadingList.length; i++) {
                            let fun = loadingList[i];
                            if (fun) {
                                fun(this._list.get(id));
                            }
                        }
                        loadingList.length = 0;
                        this.loadingDic.delete(url);
                    });
            }
        } else {
            if (callBack) {
                callBack(this._list.get(id));
            }
        }
    }
    public static async getDataByID(id: number) {
        let url = `${this.excelSplitData}${this.name}/${this.name}${id}.json`;
        if (!this._list.get(id)) {
            if (this.loadedDic.has(url)) {
                return this._list.get(id);
            }
            //加载中 
            if (this.loadingDic.has(url)) {
                //不是第一个 ，加入列表
                let loadingList = this.loadingDic.get(url);
                //
                let waitFun: Function;
                let p = new Promise<cMap<any>>((resolve) => { waitFun = resolve; });
                loadingList.push(waitFun);
                return p;
            }
            //是 第一个加载
            this.loadingDic.set(url, []);

            // console.error("加载表配置多次！！1111", url);
            let bd = await this.loadArrayBuffer(url);
            this.loadedDic.set(url, true);
            let bytes = new ioTool();
            bytes.write(new Uint8Array(bd));
            this.parseData(bytes);
            bytes.dispose();
            //加载完毕
            if (this.loadingDic.has(url)) {
                //处理等待队列
                let loadingList = this.loadingDic.get(url);
                for (let i = 0, len = loadingList.length; i < len; i++) {
                    let fun = loadingList[i];
                    if (fun) { fun(this._list.get(id)); }
                }
                loadingList.length = 0;
            }
            this.loadingDic.delete(url);
        }
        return this._list.get(id);
    }
    public static async getAllData() {
        let url = `${this.excelData}${this.name}.json`;
        if (this.loadedDic.has(url)) {
            return this._list;
        }

        //加载中 
        if (this.loadingDic.has(url)) {
            //不是第一个 ，加入列表
            let loadingList = this.loadingDic.get(url);
            //
            let waitFun: Function;
            let p = new Promise<cMap<any>>((resolve) => { waitFun = resolve; });
            loadingList.push(waitFun);
            return p;
        }
        //是 第一个加载
        this.loadingDic.set(url, []);

        // console.error("加载表配置多次！！22222", url, this.name);
        let bd = await this.loadArrayBuffer(url);
        // console.error("加载表配置多次！！********");
        this.loadedDic.set(url, true);
        let bytes = new ioTool();
        bytes.write(new Uint8Array(bd));
        this.parseData(bytes);
        bytes.dispose();

        //加载完毕
        if (this.loadingDic.has(url)) {
            //处理等待队列
            let loadingList = this.loadingDic.get(url);
            for (let i = 0, len = loadingList.length; i < len; i++) {
                let fun = loadingList[i];
                if (fun) { fun(this._list); }
            }
            loadingList.length = 0;
        }
        this.loadingDic.delete(url);

        return this._list;
    }
    public static getAllDataCallBack(callBack: Function) {
        let url = `${this.excelData}${this.name}.json`;
        if (this.loadedDic.has(url)) {
            if (callBack) {
                callBack(this._list);
            }
            return;
        }

        //加载中 
        if (this.loadingDic.has(url)) {
            //不是第一个 ，加入列表
            let loadingList = this.loadingDic.get(url);
            loadingList.push(callBack);
            this.loadingDic.set(url, loadingList);
        } else {
            this.loadingDic.set(url, []);
            // console.error("加载表配置多次！！33333", url, this.name);
            this.loadArrayBuffer(url)
                .then((bd) => {
                    this.loadedDic.set(url, true);
                    let bytes = new ioTool();
                    bytes.write(new Uint8Array(bd));
                    this.parseData(bytes);
                    bytes.dispose();
                    if (callBack) {
                        callBack(this._list);
                    }
                    let loadingList = this.loadingDic.get(url);
                    for (let i = 0; i < loadingList.length; i++) {
                        let fun = loadingList[i];
                        if (fun) {
                            fun(this._list);
                        }
                    }
                    loadingList.length = 0;
                    this.loadingDic.delete(url);
                });
        }
    }
    public static parseData(bytes: ioTool) {

    }
    private static loadArrayBuffer(url: string) {
        return new Promise((resolve: ((a: ArrayBuffer) => void)) => {
            m4m.io.loadArrayBuffer(url, (bin, urlStr) => {
                resolve(bin);
            });
        });
    }
}