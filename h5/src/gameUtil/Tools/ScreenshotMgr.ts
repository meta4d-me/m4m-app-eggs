import { mathClamp } from "engine/math/utils";
import { PlatformType, PlatformUtil } from "./PlatformUtil";

/**
 * 截屏管理器 
 */
export class ScreenshotMgr {
    private static camPostObj: m4m.framework.cameraPostQueue_Color;
    private static texReader: m4m.render.textureReader;
    private static canvas2d: HTMLCanvasElement;
    private static ctx2d: CanvasRenderingContext2D;
    private static currW: number = 0;
    private static currH: number = 0;
    private static currData: Uint8Array;
    private static lastfixRot = 0;   //屏幕旋转角度
    private static PictureWidth: number = 700;
    private static PictureHeight: number = 700;
    private static PictureScale: number = 0.6;
    public static init() {
        let scene = m4m.framework.sceneMgr.scene;
        let app = scene.app;
        let w = app.width;
        let h = app.height;
        this.camPostObj = new m4m.framework.cameraPostQueue_Color();
        this.camPostObj.renderTarget = new m4m.render.glRenderTarget(scene.webgl, w, h, false, false);
        this.canvas2d = document.createElement("canvas");
        this.canvas2d.width = 100;
        this.canvas2d.height = 100;
        this.ctx2d = this.canvas2d.getContext("2d");
    }

    /** 截取屏幕 */
    public static Screenshot(withOutUI: boolean = true) {
        this.refreshGlRenderTarget();
        //获取相机
        let scene = m4m.framework.sceneMgr.scene;
        let idx = scene.renderCameras.length - 1;
        let cam = scene.renderCameras[idx];
        let context = scene.renderContext[idx];
        if (!cam || !context) { return; }
        let webgl = scene.app.webgl;
        let app = scene.app;
        let astMgr = scene.app.getAssetMgr();

        //准备好 fbo
        cam._targetAndViewport(this.camPostObj.renderTarget, scene, context, false);
        context.webgl.depthMask(true);//zwrite 會影響clear depth，這個查了好一陣
        m4m.render.glDrawPass.lastZWrite = true;

        //绘制到 fbo
        //绘制场景
        context.updateCamera(app, cam);
        context.updateLights(scene["renderLights"]);
        m4m.framework.camera["lastFID"] = -1;
        cam.fillRenderer(scene);
        cam.renderScene(scene, context, idx);
        if (!withOutUI) {
            //绘制UI
            let ols = cam.getOverLays();
            for (let i = 0, len = ols.length; i < len; i++) {
                let ol = ols[i];
                ol.render(context, astMgr, cam);
            }
        }

        //关闭fbo
        m4m.render.glRenderTarget.useNull(webgl);

        let rt = this.camPostObj.renderTarget;

        if (this.texReader) {
            this.texReader.dispose();
        }
        this.texReader = this.makeTexReader(rt.width, rt.height, rt.texture);
        //翻转Y
        this.flipY();
        let height: number;
        let _y: number;
        let _x: number;
        if (PlatformUtil.WXGetSystemPlatformType == PlatformType.PC) {
            if (window.innerHeight > window.innerWidth) {
                // tslint:disable-next-line: newline-per-chained-call
                height = Number((window.innerHeight * this.PictureScale).toString().split(".")[0]);
                // tslint:disable-next-line: newline-per-chained-call
                _x = Number(((rt.width - height) / 2).toString().split(".")[0]);
                // tslint:disable-next-line: newline-per-chained-call
                _y = Number(((rt.height - height) / 2).toString().split(".")[0]);
            } else {
                // tslint:disable-next-line: newline-per-chained-call
                height = Number((window.innerWidth * this.PictureScale).toString().split(".")[0]);
                // tslint:disable-next-line: newline-per-chained-call
                _y = Number(((rt.width - height) / 2).toString().split(".")[0]);
                // tslint:disable-next-line: newline-per-chained-call
                _x = Number(((rt.height - height) / 2).toString().split(".")[0]);
            }
        } else {
            if (rt.height > rt.width) {
                // tslint:disable-next-line: newline-per-chained-call
                console.log("window.innerHeight", window.innerHeight);
                console.log("window.innerWidth", window.innerWidth);
                height = Number((rt.height * this.PictureScale).toString().split(".")[0]);
                // tslint:disable-next-line: newline-per-chained-call
                _x = Number(((rt.width - height) / 2).toString().split(".")[0]);
                // tslint:disable-next-line: newline-per-chained-call
                _y = Number(((rt.height - height) / 2).toString().split(".")[0]);
            } else {
                console.log("window.innerHeight", window.innerHeight);
                console.log("window.innerWidth", window.innerWidth);
                // tslint:disable-next-line: newline-per-chained-call
                height = Number((rt.width * this.PictureScale).toString().split(".")[0]);
                // tslint:disable-next-line: newline-per-chained-call
                console.log("rt.width", rt.width);
                console.log("rt.height", rt.height);
                _y = Number(((rt.width - height) / 2).toString().split(".")[0]);
                // tslint:disable-next-line: newline-per-chained-call
                _x = Number(((rt.height - height) / 2).toString().split(".")[0]);
            }
        }
        this.Cutting(_x, _y, height, height);
    }

    /** 保存称为base64 数据 */
    public static SaveToBase64(): string {
        if (!this.currData) { return ""; }
        let result: string;
        // //buffer conver 
        // result = commTool.getImgBase64ByBuffer(this.texReader.data);
        //canvas conver fun
        let buffer: Uint8ClampedArray = new Uint8ClampedArray(this.currData);
        let w = this.currW;
        let h = this.currH;
        let imgData: ImageData = new ImageData(buffer, w, h);
        this.canvas2d.width = w;
        this.canvas2d.height = h;
        this.ctx2d.putImageData(imgData, 0, 0);
        result = this.canvas2d.toDataURL(`image/png`);
        return result;
    }

    public static SaveToBuffer(): Int32Array {
        if (!this.currData) { return; }
        let buffer: Int32Array = new Int32Array(this.currData.buffer);
        return buffer;
    }

    /**
     * 裁剪截取的图片数据
     * @param x 屏幕空间坐标x
     * @param y 屏幕空间坐标y
     * @param w 屏幕空间 宽度
     * @param h 屏幕空间 高度
     */
    public static Cutting(x: number, y: number, w: number, h: number) {
        if (isNaN(w) || isNaN(h) || w == 0 || h == 0) { return; }
        let texReader = this.texReader;
        this.currW = w;
        this.currH = h;
        let tW = texReader.width;
        let tH = texReader.height;
        let notChange = x == 0 && y == 0 && w == tW && h == tH;
        if (notChange) {
            this.currData = texReader.data;
            return;
        }
        //调整过滤成有效数据
        // tslint:disable-next-line: no-parameter-reassignment
        x = x < 0 ? 0 : x > tW ? tW : x;
        // tslint:disable-next-line: no-parameter-reassignment
        y = y < 0 ? 0 : y > tH ? tH : y;
        let rDW = tW - x;
        let rDH = tH - y;
        if (rDW <= 0 || rDW <= 0) {
            this.currData = null;
            return;
        }
        // tslint:disable-next-line: no-parameter-reassignment
        this.currW = w = Math.min(rDW, w);
        // tslint:disable-next-line: no-parameter-reassignment
        this.currH = h = Math.min(rDH, h);
        //计算
        let wBAll = tW * 4;
        let wB = w * 4;
        let data = this.currData = new Uint8Array(wB * h);
        let allData = this.texReader.data;
        //copy byte
        for (let _y = 0; _y < h; _y++) {
            let _yAll = _y + y;
            let _numYAll = _yAll * wBAll;
            let _numY = _y * wB;
            for (let _x = 0; _x < wB; _x++) {
                let _xAll = _x + x * 4;
                data[_numY + _x] = allData[_numYAll + _xAll];
            }
        }
    }

    private static makeTexReader(w: number, h: number, glTex: WebGLTexture): m4m.render.textureReader {
        let postObj = this.camPostObj;
        if (!postObj) { return; }
        let app = m4m.framework.sceneMgr.scene.app;
        let result: m4m.render.textureReader
            = new m4m.render.textureReader(app.webgl, glTex, w, h, false);
        return result;
    }

    /** Y翻转纹理 */
    private static flipY() {
        let data = this.texReader.data;
        let w = this.texReader.width * 4;
        let h = this.texReader.height;
        let halfH = Math.floor(h / 2);
        for (let y = 0; y < halfH; y++) {
            let fY = h - y;
            let numYT = y * w;
            let numYB = fY * w;
            for (let x = 0; x < w; x++) {
                let top = data[numYT + x];
                data[numYT + x] = data[numYB + x];
                data[numYB + x] = top;
            }
        }
    }

    private static fixRotAngle() {
        let app = m4m.framework.sceneMgr.scene.app;
        if (app.orientation == m4m.framework.OrientationMode.AUTO) { return 0; }
        let ctn = app.outcontainer;
        if (ctn == null) { return 0; }
        let bound = ctn.getBoundingClientRect();
        let isWBigger = bound.width > bound.height;

        switch (app.orientation) {
            case m4m.framework.OrientationMode.LANDSCAPE:
                if (!isWBigger) { return 90; }
                break;
            case m4m.framework.OrientationMode.PORTRAIT:
                if (isWBigger) { return 90; }
                break;
            default:
        }

        return 0;
    }

    private static refreshGlRenderTarget() {
        let currRot = this.fixRotAngle();
        let app = m4m.framework.sceneMgr.scene.app;
        let w = app.width;
        let h = app.height;
        if (currRot == this.lastfixRot && this.currW == w && this.currH == h) { return; }
        this.lastfixRot = currRot;
        if (this.camPostObj.renderTarget) {
            if (this.camPostObj.renderTarget.renderbuffer) {
                let Length = Object.keys(this.camPostObj.renderTarget.renderbuffer).length;
                if (Length > 0) {
                    this.camPostObj.renderTarget.dispose(app.webgl);
                }
            } else {
                this.camPostObj.renderTarget.dispose(app.webgl);
            }
        }
        this.camPostObj.renderTarget = new m4m.render.glRenderTarget(app.webgl, w, h, true, true);
    }
}