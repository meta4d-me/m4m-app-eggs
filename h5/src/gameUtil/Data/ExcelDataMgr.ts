
import { LoaderLibManager } from "../Loader/LoaderLibManager";
import { miniAPIType, miniGame } from "../Tools/miniGame";
declare let System;
export class ExcelDataMgr {
    // public static jsPath = "lib/node_modules/@types/";
    private static jsPath = "";
    private static isInitAll = false;

    /**
     * 初始设置
     * @param jsPath 自动加载JS 文件的路径 （例："lib/node_modules/@types/"） 
     */
    public static init(jsPath: string) {
        this.jsPath = jsPath;
    }

    public static initAllDataClass(cb: Function) {
        let loadFun = this.getLoadFun();
        let className = "ExcelData";
        loadFun(this.getLibString(className), (isSucc) => {
            if (isSucc) {
                this.isInitAll = true;
                System.init();
                if (m4m["__consTool"]) {
                    m4m["__consTool"].init();
                }
                if (cb) { cb(); }
            } else {
                console.error("加载ExcelData出错");
            }
        });
    }
    public static initDataClassByName(className: string, cb: Function) {
        if (this.isInitAll) {
            console.log("ExcelData配置类：" + className + "   代码已经加载完毕");
            return;
        }
        // let dataClass = consTool[className];
        let dataClass = null;
        if (m4m["__consTool"]) {
            dataClass = m4m["__consTool"][className];
        }

        if (dataClass) {
            console.log("ExcelData配置类：" + className + "   代码已经加载完毕");
            return;
        }
        let loadFun = this.getLoadFun();
        loadFun(this.getLibString(className), (isSucc) => {
            if (isSucc) {
                System.init();
                // consTool.init();
                if (m4m["__consTool"]) {
                    m4m["__consTool"].init();
                }
                if (cb) { cb(); }
            } else {
                console.error("加载ExcelData配置类：" + className + "  出错");
            }
        });
    }

    private static getLoadFun() {
        let result: Function = miniGame.miniType == miniAPIType.none ? LoaderLibManager.Instance.addLib : LoaderLibManager.Instance.addSubpackage;
        return result.bind(LoaderLibManager.Instance);
    }

    private static getLibString(className: string) {
        return miniGame.miniType == miniAPIType.none ? `${this.jsPath}${className}.js` : className;
    }
}