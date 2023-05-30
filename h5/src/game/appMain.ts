import { UiManager } from "PSDUI/UiManager";
import { ScreenshotMgr } from "Tools/ScreenshotMgr";
import { StageMgr } from "./Core/StageMgr";
import { GameMgr } from "./GameMgr";
import { NetWebscoket } from "./Net/NetWebsocket";
import { SDKWebsocket } from "./Net/SDKWebsocket";
import { consTool } from "./Tool/consTool";
import { uiMgr } from "./uiMgr";

/** core enter point */
export class AppMain {
    constructor() {
        UiManager.InitUi("wloading");
        consTool.init();
        //init
        //console.log(`appMain inited`);
        // 引擎启动
        this.initEngine();
        let app = m4m.framework.sceneMgr.app;
        //项目启动
        let width: number = 1242;
        let height: number = 2688;

        //屏幕适配处理
        //因会被广告位档到  iphone  5  5s   iphone 8  ui整体微调缩小
        let isLowPix = app.canvasClientHeight <= 414;
        let pixChange = 1;
        pixChange = (app.canvasClientHeight * 530) / (height * (app.canvasClientHeight - 135));
        let screenMatchRate = 0;  //如果是以高度固定的 模屏 模式  要把这个值设置为1   默认为竖屏模式

        //处理窄屏UI适配问题
        let asp = app.width / app.height;
        let min = 0.6;
        let max = 1.68;
        asp = asp < min ? min : asp;
        if (asp < max) {
            screenMatchRate = (asp - min) / (max - min);
        }

        //相机ui
        console.log(`width：${width}height：${height}`);
        UiManager.init(width, height, screenMatchRate, GameMgr.UIPath, GameMgr.atlasPath);
        UiManager.dontDisposeUIList = [];
        UiManager.overlay.canvas.enableOutsideRenderClip = true;    //开启2d 视窗 剔除

        //测试下来 1024 * 64 或 1024 * 128 最优
        m4m.framework.batcher2D["limitCount"] = 1024 * 64;  //设置 UI vbo buffer 大小上限 ， 不同项目需要平衡（太大太小都不好）。

        //
        this.connectWebSocket();
        this.SDKconnectWebSocket();
        GameMgr.init(app);
        //UI
        uiMgr.init();
        StageMgr.init();
        //截屏管理器
        ScreenshotMgr.init();
        // //提前UI
        //初始化资源加载
        //  场景启动
    }

    //连接服务器
    private connectWebSocket() {
        // 外网
        //"wss://kingzet.cn"
        m4m.io.loadText(`res/server.json`, (txt, _err, isFail) => {
            if (isFail) {
                console.error(`load  server.json err : ${_err}`);
                return;
            }
            let obj = JSON.parse(txt);
            NetWebscoket.Instance.connect(obj.SERVER_ID);
            // console.error(`账号配置加载完毕!`,obj.SERVER_ID);
        });
    }

    private SDKconnectWebSocket() {
        m4m.io.loadText(`res/server.json`, (txt, _err, isFail) => {
            if (isFail) {
                console.error(`load  server.json err : ${_err}`);
                return;
            }
            let obj = JSON.parse(txt);
            SDKWebsocket.Instance.connect(obj.SERVER_IDNFT);
            // console.error(`账号配置加载完毕!`,obj.SERVER_ID);
        });
    }

    private initEngine() {
        let app = m4m.framework.sceneMgr.app;
        if (!app) {
            app = new m4m.framework.application();
            // 引擎启动
            app.bePlay = true;
            let rootEle = document.getElementById("gamecontainer") as HTMLDivElement;
            app.start(rootEle, m4m.framework.CanvasFixedType.Free);
            app.orientation = m4m.framework.OrientationMode.PORTRAIT;
            if (window != null) {
                window.onorientationchange = () => {
                    app.refreshOrientationMode();   //屏幕有旋转时，刷新屏幕方向。
                };
            }
        }
    }
}

setTimeout(() => {
    let a = new AppMain();
}, 0);