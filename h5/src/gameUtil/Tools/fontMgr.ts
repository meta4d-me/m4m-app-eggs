import { FrameMgr } from "./FrameMgr";
// import { uiMgr } from "../Game/uiMgr";
import { FrameTimer } from "../Time/FrameTimer";
import { TimeUtil } from "../Time/TimeUtil";
import { miniAPIType, miniGame } from "./miniGame";

export class FontMgr {
    static get Instance() {
        if (this._instance == null) {
            this._instance = new FontMgr();
        }
        return this._instance;
    }

    get realheight(): number {
        return this.fontSize + 8;
    }
    constructor() {
        FrameMgr.Add(this.update, this);
    }
    private static FONT_CANVAS = "FONT_CANVAS";
    private static FONT_CANVAS_TEMP = "FONT_CANVAS_TEMP";
    private static collectChars: string;
    private static _instance: FontMgr;

    private fontImageData: ImageData;
    private fontContext: CanvasRenderingContext2D;
    private fontcontexttemp: CanvasRenderingContext2D;
    private textureSize = 2048; //贴图尺寸

    // private canvas2d: HTMLCanvasElement;
    //文字间隔
    private letterSpacing: number = 1;
    //字体大小
    private fontSize: number = 30;
    //当前有的文字字符串
    private haveString: string = "";
    private defFontResName = "defFont.font.json";
    private _font: m4m.framework.font;
    // private _data: Uint8Array;
    private imgWidth: number;
    private imgHeight: number;
    /** 刷新字体纹理 是否使用unit8array  */
    private useBufferRefresh = false;
    //手机系统 ios 安卓
    private isIosBol: boolean = false;

    private adding = false;

    private cTIdx = 0;
    private xAddvance: number = 0;
    private yAddvance: number = 0;

    //初始化
    /**
     * name
     */
    public init(useBufferRefresh = false, isIosBol) {
        this.useBufferRefresh = useBufferRefresh;
        this.isIosBol = isIosBol;
        // console.error("初始化字体: " + TimeUtil.realtimeSinceStartup);
        this.fontcontexttemp = this.makeTempContext();

        this.imgWidth = this.textureSize;
        this.imgHeight = this.textureSize;
        this.fontImageData = this.makeFontCanvasImgData(this.imgWidth, this.imgHeight);
        /*
        fillStyle 可以（color 纯色填充  gradient 渐变填充  pattern 纹理填充）
        **/

        this.haveString = "abcdefghijklmnopqrstuvwxyz鳥麗ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890皚藹礙愛翺襖奧壩()[],.;:{}+_-*!<>?/";
        //init font res
        // this._font = new m4m.framework.fontNew(this.defFontResName);
        this._font = new m4m.framework.font(this.defFontResName);
        this._font.fontname = "FZCuYuan-M03S";// "defFont";
        this._font.cmap = {};
        // this._data = new Uint8Array(this.imgWidth * this.imgHeight * 4);
        this._font.texture = this.createTextrue();
        m4m.framework.assetMgr.mapNamed[this.defFontResName] = this._font as m4m.framework.IAsset;
        this._font.pointSize = this.fontSize;
        this._font.padding = this.letterSpacing;
        this._font.lineHeight = this.realheight;
        // this._font.baseline = 26.8125;
        this._font.baseline = -7;
        this._font.atlasWidth = this.textureSize;
        this._font.atlasHeight = this.textureSize;
        //lable 动态扩展接口 对接  新增新的文字
        m4m.framework.label.onTryExpandTexts = this.onTryExpandTexts.bind(this);
        //初始化时绘制的文字图
        this.checkAddText(this.haveString);
        // //test 
        // setTimeout(() => {
        //     this.test();
        // }, 9000);
    }
    /**
     * 添加字符到字体
     * @param str 
     */
    public checkAddText(str: string) {
        let updateData = this.tryExpandText(str);
        if (updateData) {
            this.refCanvas2d();
        }
    }

    private createCanvas(canvasName: string) {
        let canvas2d: HTMLCanvasElement;
        if (miniGame.miniType == miniAPIType.none) {
            canvas2d = document.createElement("canvas");
        } else {
            canvas2d = miniGame.getOffScreenCanvas(canvasName);
        }
        return canvas2d;
    }

    private makeTempContext(): CanvasRenderingContext2D {
        let canvas2d: HTMLCanvasElement = this.createCanvas(FontMgr.FONT_CANVAS_TEMP);
        let context2d: CanvasRenderingContext2D = canvas2d.getContext("2d");

        canvas2d.className = "fontcanvas";
        canvas2d.style.width = `400px`;
        canvas2d.style.height = `200px`;
        canvas2d.style.backgroundColor = "#000000";
        return context2d;
    }
    //创建新的imageData对象
    private makeFontCanvasImgData(w: number, h: number) {
        let canvas2d: HTMLCanvasElement = this.createCanvas(FontMgr.FONT_CANVAS);
        canvas2d.width = w;
        canvas2d.height = h;
        this.fontContext = canvas2d.getContext("2d");
        return this.fontContext.createImageData(w, h);
    }

    private update(dt: number) {
        // console.error("帧管理 判断是否需要绘制canvas ： " + this.adding);
        if (!this.adding) { return; }
        this.adding = false;
        this.refCanvas2d();
    }
    //新增文字字符串
    private onTryExpandTexts(str: string) {
        // console.error("新增的字符串 ： " + str);
        let needUpdate = this.tryExpandText(str);
        if (!needUpdate) { return; }
        this.adding = true;
    }

    //刷新canvas2d
    private refCanvas2d() {
        // console.error("刷新canvas2d");
        let _tex = this._font.texture;
        let gl = m4m.framework.sceneMgr.app.webgl;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);//y轴翻转
        gl.bindTexture(gl.TEXTURE_2D, _tex.glTexture.texture);
        if (!this.useBufferRefresh) {
            this.fontContext.putImageData(this.fontImageData, 0, 0);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.fontContext.canvas);
        } else {
            //解决IOS 下不刷新问题
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.imgWidth, this.imgHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.fontImageData.data);
            // console.error("文字绘制完成: " + TimeUtil.realtimeSinceStartup);
            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.imgWidth, this.imgHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._data);
            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas2d);
        }
    }
    //创建texture
    private createTextrue() {
        let gl = m4m.framework.sceneMgr.app.webgl;
        let _texture = new m4m.framework.texture(`canvasFont_${this.cTIdx}`);
        // console.error(`  createTextrue     ${_texture.getName()}-------------------------   `);
        let _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
        //let  t2d = new m4m.render.glTexture2D(assetMgr.webgl, _textureFormat);
        let t2d = new m4m.render.glTexture2D(gl, _textureFormat);
        // t2d.uploadImage(sharedCanvas, false, true, false, false);
        // t2d.uploadByteArray(false, true,w, h, data);
        t2d.uploadByteArray(false, true, 1, 1, new Uint8Array(4), false, false, false, false);
        _texture.glTexture = t2d;
        // uiMgr.shareCanvasImg.image = _texture;
        this.cTIdx++;
        return _texture;
    }

    /** 尝试拓展文字到font */
    private tryExpandText(str: string) {
        if (str == null) { return false; }
        let updateData = false;
        let font = this._font;
        for (let i = 0, len = str.length; i < len; i++) {
            let key = str.charAt(i);
            if (font.cmap[key]) { continue; }
            // console.error("增加字：" + key);
            this.adddNewChar(key);
            FontMgr.collectChars += key;
            updateData = true;
        }
        return updateData;
    }
    //把单个字符绘制到canvas上
    private adddNewChar(key: string) {
        //key = "击";
        //canvas绘制区域的背景色
        this.fontcontexttemp.fillStyle = "#000000";
        //canvas绘制的起始坐标和区域宽高
        this.fontcontexttemp.fillRect(0, 0, this.fontSize * 2, this.fontSize * 2);
        let realHeight = this.realheight;
        //字体样式
        //安卓字体
        this.fontcontexttemp.font = this.fontSize + "px NotoSansSC-Regular";//Heiti SC   Roboto   Heiti TC  NotoSansSC-Regular  DroidSansFallback
        if (this.isIosBol) {
            //ios字体
            this.fontcontexttemp.font = this.fontSize + "px Heiti TC";//Heiti SC   Roboto   Heiti TC  NotoSansSC-Regular  DroidSansFallback
        }
        this.fontcontexttemp.strokeStyle = "#6C6C6C";//描边颜色
        this.fontcontexttemp.lineWidth = 4;
        this.fontcontexttemp.fillStyle = "#ff0000";//"#ff0000"; #000000  ffffff
        this.fontcontexttemp.textBaseline = "bottom";
        this.fontcontexttemp.strokeText(key, 0, realHeight);//添加文字描边
        this.fontcontexttemp.fillText(key, 0, realHeight);//添加文字

        let charwidth = this.fontcontexttemp.measureText(key).width;
        charwidth = Math.ceil(charwidth);
        //console.log(key + " width:" + charwidth);
        if (charwidth == 0) {
            //console.log("font char: " + key);
            charwidth = this.fontSize;
        }
        let fontData = this.fontcontexttemp.getImageData(0, 0, charwidth, realHeight);

        let newchar = new m4m.framework.charinfo();
        //-------------------
        newchar.x = (this.xAddvance) / this.textureSize;
        newchar.y = (this.yAddvance) / this.textureSize;
        newchar.w = (charwidth) / this.textureSize;
        newchar.h = (realHeight) / this.textureSize;
        newchar.xSize = charwidth;
        newchar.ySize = realHeight;
        newchar.xAddvance = charwidth;
        this._font.cmap[key] = newchar;

        //let curline = Math.floor(this.charIndex / this.charlenInRow);
        //let curcolumn = this.charIndex % this.charlenInRow;
        //---------------------
        for (let h = 0; h < realHeight; h++) {
            for (let w = 0; w < charwidth; w++) {
                let newindex = (h + this.yAddvance) * this.textureSize + w + this.xAddvance;
                let oindex = h * charwidth + w;
                this.fontImageData.data[newindex * 4 + 0] = fontData.data[oindex * 4 + 0];
                this.fontImageData.data[newindex * 4 + 1] = fontData.data[oindex * 4 + 1];
                this.fontImageData.data[newindex * 4 + 2] = fontData.data[oindex * 4 + 2];
                this.fontImageData.data[newindex * 4 + 3] = fontData.data[oindex * 4 + 3];
                // this._data[newindex * 4 + 0] = fontData.data[oindex * 4 + 0];
                // this._data[newindex * 4 + 1] = fontData.data[oindex * 4 + 1];
                // this._data[newindex * 4 + 2] = fontData.data[oindex * 4 + 2];
                // this._data[newindex * 4 + 3] = fontData.data[oindex * 4 + 3];
                //this.fontTex.data.set(fontData.data.subarray(oindex * 4, oindex * 4 + 3), newindex * 4);
            }
        }
        //---------------- fontTex data
        this.xAddvance += charwidth;
        if (this.xAddvance + this.fontSize >= this.textureSize) {
            this.xAddvance = 0;
            this.yAddvance += realHeight;
            if (this.yAddvance > this.textureSize) {
                console.error("动态字体图的尺寸不够大！");
            }
            //this.yAddvance += this.yoffset;
        }
    }

    // test() {

    //     let arr = m4m["__consTool"].mainPage["instance"].handle.transform.getComponentsInChildren("image2D");
    //     let img2d: m4m.framework.image2D = arr[0] as any;
    //     let tran = img2d.transform;
    //     tran.width = 1024;
    //     tran.height = 1024;
    //     tran.localTranslate.x = 300;
    //     tran.localTranslate.y = 250;
    //     tran.markDirty();
    //     tran.removeComponent(img2d);
    //     // let rawImg = tran.addComponent("rawImage2D") as m4m.framework.rawImage2D;
    //     let fontImg = uiMgr.poplayer.addComponent("rawImage2D") as m4m.framework.rawImage2D;

    //     let font: m4m.framework.font;
    //     // font = this._font;
    //     font = m4m["__consTool"].commTool.searchFont(this.defFontResName);

    //     // rawImg.image = font.texture;
    //     // window["rawImg"] = rawImg;
    //     fontImg.image = font.texture;
    //     window["fontImg"] = fontImg;
    //     //lable 
    //     var larr = m4m["__consTool"].uiMgr.uiRoot.transform.getComponentsInChildren("label") as m4m.framework.label[];
    //     let l = larr[16];
    //     // l.text = "aaaa" + l.text;

    //     // //test data
    //     // let tempData = new Uint8Array(this.textureSize * this.textureSize * 4);
    //     // for(let i=0 , len = tempData.length ; i < len ; i += 4 * 2){
    //     //     tempData[i]   = 255;
    //     //     tempData[i+1] = 128;
    //     //     tempData[i+2] = 0;
    //     //     tempData[i+3] = 255;
    //     // }
    //     // this._data = tempData;

    //     // FrameTimer.Instance.loop(3, () => {
    //     //     this.refCanvas2d();
    //     // });
    // }
}
