import { commTool } from "../Tools/commTool";

// tslint:disable-next-line: class-name
export class metaUIManager {

    /** 给 子域分享画布 使用 */
    public static shareCanvasImg: m4m.framework.rawImage2D;
    /** 全屏尺寸 img容器 */
    public static scFullImg: m4m.framework.rawImage2D;
    /** 头像尺寸 img容器  */
    public static scIconImg: m4m.framework.rawImage2D;
    /** 上层相机的 overLay , UI 上模型模式使用*/
    public static topOverlay: m4m.framework.overlay2D;

    /** 相机的 overLay , UI 的承载实体 */
    public static overlay: m4m.framework.overlay2D;
    /** UI 根节点 ，下层之下 */
    public static downlayer: m4m.framework.transform2D;
    /** UI 根节点 ，底层 */
    public static baselayer: m4m.framework.transform2D;
    /** UI 根节点 ，中层 */
    public static midlayer: m4m.framework.transform2D;
    /** UI 根节点 ，高层 */
    public static highlayer: m4m.framework.transform2D;
    /** UI 根节点 ，最高层 */
    public static poplayer: m4m.framework.transform2D;

    /** uiPrefab 资源路径 */
    public static uiPrefabPath: string;
    /** ui atlas 资源路径 */
    public static atlasPath: string;

    public static _layerIndexOverUI3d: number = 30;

    protected static _fullScreenTran: m4m.framework.transform2D;      //全品UI事件 遮罩
    /** 首屏显示的UI对象 */
    protected static firstDisplay: m4m.framework.transform2D;

    protected static isInited = false;
    protected static uiRoot: m4m.framework.transform2D;
    protected static _ActiveSelf = metaUIManager;

    /** 跳跃层级map */
    private static leapLayerMap: { [layer: number]: number[] } = {};
    /** insID Layer Map */
    private static uiInsIDLayerMap: { [insid: number]: number } = {};
    /** leap layer渲染队列 */
    private static leapLayerQueue: number[] = [];
    private static cTIdx = 0;
    private static _sCanvIconMode = false;
    private static _modelcam: m4m.framework.camera;
    private static leapRenderFunMap: { [insId: number]: (canvas: m4m.framework.canvas) => any } = {};   //跳跃到 top_overlay 的渲染容器
    private static FrontBefRenderFunMap: { [insId: number]: (canvas: m4m.framework.canvas) => any } = {};   //overlay 的渲染前

    /** 当前激活中 变体子类 */
    public static get ActiveSelf() { return this._ActiveSelf; }

    /** shareCanvas image 容器的 icon ，（isIconMode ? this.scIconImg : this.scFullImg）*/
    public static get sCanvIconMode() { return this._sCanvIconMode; }
    public static set sCanvIconMode(isIconMode: boolean) {
        this.shareCanvasImg.transform.visible = false;
        if (isIconMode) {
            this.shareCanvasImg = this.scIconImg;
        } else {
            this.shareCanvasImg = this.scFullImg;
        }
        this._sCanvIconMode = isIconMode;
    }

    /** UI之上显示 模型的专有层级 （默认 31）*/
    public static get layerIndexOverUI3d() { return this._layerIndexOverUI3d; }
    public static set layerIndexOverUI3d(v) {
        this._layerIndexOverUI3d = v;
        this.refrashCamMask();
    }

    /** UI 上模型相机 */
    static get modelCam() {
        if (!this._modelcam) {
            this.initModelOverCam();
        }
        return this._modelcam;
    }

    /**
     * 初始化UIManager
     * @param uiWidth ui设计最大宽度分辨率
     * @param uiHeight ui设计最大高度分辨率
     * @param screenMatchRate 屏幕匹配率 ( 屏幕宽高匹配模式 (range 0-1  =0:固定宽  =1:固定高) ) 
     * @param uiPrefabPath UI prefab 资源路径
     * @param atlasPath ui atlas 资源路径
     */
    public static init(uiWidth: number, uiHeight: number, screenMatchRate: number, uiPrefabPath: string, atlasPath: string) {
        if (this.isInited) { return; }
        this.isInited = true;
        this.uiPrefabPath = uiPrefabPath;
        this.atlasPath = atlasPath;

        let app = m4m.framework.sceneMgr.app;
        let scene = app.getScene();
        //创建overlayer2d
        this.overlay = new m4m.framework.overlay2D();
        //
        this.overlay.scaleMode = m4m.framework.UIScaleMode.SCALE_WITH_SCREEN_SIZE;

        this.overlay.matchReference_width = uiWidth;  //UI 固定分辨率
        this.overlay.matchReference_height = uiHeight;
        this.overlay.screenMatchRate = screenMatchRate;//如果是以高度固定的 模屏 模式  要把这个值设置为1   默认为竖屏模式

        if (!scene.mainCamera) {
            let camT = new m4m.framework.transform();
            camT.name = "mainCam";
            scene.getRoot()
                .addChild(camT);
            let cam = camT.gameObject.addComponent("camera") as m4m.framework.camera;
            //渲染层级设置
            // cam.CullingMask = cam.CullingMask ^ GameLogic.layerBitGUI;  //GUI 层不渲染
            // cam.cullZPlane = false;
            if (!scene.autoCollectlightCamera) {
                scene.addCamera(cam);
            }

            scene.update(0);
        } else {
            let oldOl = scene.mainCamera.getOverLays();
            for (let i = 0, len = oldOl.length; i < len; i++) {
                let ol = oldOl[i] as m4m.framework.overlay2D;
                if (!this.firstDisplay && ol.canvas) {
                    let _root = ol.canvas.getRoot();
                    //获取 首屏渲染的对象
                    this.firstDisplay = _root.children[0];
                }
                scene.mainCamera.removeOverLay(ol);
            }
        }

        scene.mainCamera.addOverLay(this.overlay);

        //ui
        let opt = m4m.framework.layoutOption;
        let full = opt.LEFT | opt.RIGHT | opt.TOP | opt.BOTTOM;
        this.uiRoot = this.overlay.canvas.getRoot();

        //头像层
        // this.setHeadIcon();
        //各层
        this.downlayer = new m4m.framework.transform2D();
        this.downlayer.layoutState = full;
        this.downlayer.name = "downlayer";
        this.uiRoot.addChild(this.downlayer);
        this.baselayer = new m4m.framework.transform2D();
        this.baselayer.layoutState = full;
        this.baselayer.name = "baselayer";
        this.uiRoot.addChild(this.baselayer);
        this.midlayer = new m4m.framework.transform2D();
        this.midlayer.name = "midlayer";
        this.midlayer.layoutState = full;
        this.uiRoot.addChild(this.midlayer);
        this.highlayer = new m4m.framework.transform2D();
        this.highlayer.name = "highlayer";
        this.highlayer.layoutState = full;
        this.uiRoot.addChild(this.highlayer);
        //pop
        this.poplayer = new m4m.framework.transform2D();
        this.poplayer.name = "poplayer";
        this.poplayer.layoutState = full;
        this.uiRoot.addChild(this.poplayer);

        // //shareCanvasImg
        //scFullImg
        let SCITran = new m4m.framework.transform2D();
        SCITran.name = "scFullImg";
        this.uiRoot.addChild(SCITran);
        SCITran.layoutState = opt.LEFT | opt.RIGHT | opt.TOP | opt.BOTTOM;
        let rimg = SCITran.addComponent("rawImage2D") as m4m.framework.rawImage2D;
        // rimg.image = GameMgr.assetMgr.getDefaultTexture("grid");
        rimg.image = this.createTextrue();
        SCITran.visible = false;
        this.shareCanvasImg = this.scFullImg = rimg;

        //pop
        // this.poplayer = new m4m.framework.transform2D();
        // this.poplayer.layoutState = opt.LEFT | opt.RIGHT | opt.TOP | opt.BOTTOM;
        // this.uiRoot.addChild(this.poplayer);

        // //UI上的模型
        // this.initModelOverCam();

        //全屏事件遮挡对象
        this._fullScreenTran = new m4m.framework.transform2D();
        this.uiRoot.addChild(this._fullScreenTran);
        this._fullScreenTran.name = "_fullScreenTran";
        // let btn = this._fullScreenTran.addComponent("button") as m4m.framework.button;
        // let lo = m4m.framework.layoutOption;
        // this._fullScreenTran.layoutState = lo.TOP | lo.BOTTOM | lo.LEFT | lo.RIGHT;
        // btn.addListener(m4m.event.UIEventEnum.PointerClick, () => { }, this);   //遮挡的事件
        // btn.addListener(m4m.event.UIEventEnum.PointerDown, () => { }, this);
        // btn.addListener(m4m.event.UIEventEnum.PointerUp, () => { }, this);
        // btn.addListener(m4m.event.UIEventEnum.PointerEnter, () => { }, this);
        // btn.addListener(m4m.event.UIEventEnum.PointerExit, () => { }, this);
        commTool.makeUIEventDiscard(this._fullScreenTran);
        this._fullScreenTran.visible = false;

        //over 3d model 管理器
        // Over3dModelMgr.init();

        //old UI
        if (this.firstDisplay) {
            this.poplayer.addChild(this.firstDisplay);
        }

    }

    /** 清理首屏渲染显示UI */
    public static clearFristDisplay() {
        if (!this.firstDisplay) { return; }
        this.firstDisplay.visible = false;
        let rawImage = this.firstDisplay.getComponent("rawImage2D") as m4m.framework.rawImage2D;
        rawImage.image.defaultAsset = false;
        rawImage.image.unuse(true);
        rawImage.image = null;
        if (this.firstDisplay.parent) {
            this.firstDisplay.parent.removeChild(this.firstDisplay);
        }
    }

    /**
     * 全屏UI 事件 遮挡 或 开启
     * @param enable 开启UI事件遮挡
     */
    public static fullScreenUIEventMask(enable: boolean) {
        if (!this._fullScreenTran) { return; }
        this._fullScreenTran.visible = enable;
    }

    /**
     * 计算ui坐标 通过 屏幕坐标
     * @param x 屏幕坐标系 x
     * @param y 屏幕坐标系 y
     * @param uiPos vector2 ui坐标系postion
     */
    public static screenPosToUIpos(x: number, y: number, uiPos: m4m.math.vector2) {
        if (isNaN(x) || isNaN(y) || !uiPos) { return; }
        m4m.math.vec2Set(uiPos, x, y);
        this.overlay.calScreenPosToCanvasPos(uiPos, uiPos);
    }

    //创建贴图
    private static createTextrue() {
        let gl = m4m.framework.sceneMgr.app.webgl;
        this.cTIdx++;
        let _texture = new m4m.framework.texture(`canvasTex_${this.cTIdx}`);
        let _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
        let t2d = new m4m.render.glTexture2D(gl, _textureFormat);
        t2d.uploadByteArray(false, true, 1, 1, new Uint8Array(4), false);
        _texture.glTexture = t2d;
        return _texture;
    }

    //头像显示
    private static setHeadIcon() {
        let opt = m4m.framework.layoutOption;
        let size = 80;
        //scIconImg
        let SCITran0 = new m4m.framework.transform2D();
        this.uiRoot.addChild(SCITran0);
        SCITran0.layoutState = opt.H_CENTER | opt.V_CENTER;
        SCITran0.name = "scIconImg";
        SCITran0.width = SCITran0.height = size;
        let rimg0 = SCITran0.addComponent("rawImage2D") as m4m.framework.rawImage2D;
        // rimg_0.image = GameMgr.assetMgr.getDefaultTexture("grid");
        rimg0.image = this.createTextrue();
        SCITran0.visible = false;
        this.scIconImg = rimg0;
    }

    //UI 上的模型展示 初始化
    private static initModelOverCam() {
        let camT = new m4m.framework.transform();
        camT.name = "modelCam";
        let scene = m4m.framework.sceneMgr.scene;
        // camT.localPosition.y = -1200;
        // camT.localPosition.z = -15;
        // camT.localPosition = camT.localPosition;
        // m4m.math.quatFromEulerAngles(5, 0, 0, camT.localRotate);
        // camT.localRotate = camT.localRotate;

        scene.getRoot()
            .addChild(camT);

        let cam = camT.gameObject.addComponent("camera") as m4m.framework.camera;
        this._modelcam = cam;
        // cam.cullZPlane = false;
        this._modelcam.gameObject.visible = true;
        cam.opvalue = 0; //正交相机
        // cam.fov = 0.9075712110370514;// 角度值 52        80 * Math.PI / 180;
        cam.far = 100;
        cam.near = -10;
        cam.size = 20;
        //设置onlyDisp layers
        this.refrashCamMask();
        cam.clearOption_Color = false;

        scene.update(0);

        if (!scene.autoCollectlightCamera) {// 现不会自动把新加的相机添加到队列  需的 手动添加
            scene.addCamera(cam);
        }
        //overlay
        this.topOverlay = new m4m.framework.overlay2D();
        cam.addOverLay(this.topOverlay);

        //change to leap 
        this.overlay.canvas.beforeRender = this.onFrontLay2dBeforRender.bind(this);
        this.topOverlay.canvas.beforeRender = this.onTopLay2dBeforRender.bind(this);
    }
    /**
     * 注册 top_overLay 渲染跳跃对象
     * @param insid 实例id
     * @param leapRenderFun 
     * @param frontBefRenderFun 
     * @param layer 层级值 最大值显示在最上面 
     */
    public static registerLeapRender(insid: number, leapRenderFun: (canvas: m4m.framework.canvas) => any, frontBefRenderFun: () => any, layer = 0) {
        if (isNaN(insid)) { return; }
        let insidMap = this.uiInsIDLayerMap;
        if (insidMap[insid] != null) {
            if (insidMap[insid] == layer) { return; }   //去重
            this.unregisterLeapRender(insid);
        }
        insidMap[insid] = layer;

        let arr = this.leapLayerMap[layer];
        if (!arr) {
            arr = this.leapLayerMap[layer] = [];
            let queue = this.leapLayerQueue;
            queue.push(layer);
            //排序
            queue.sort();
        }
        arr.push(insid);

        if (leapRenderFun) { this.leapRenderFunMap[insid] = leapRenderFun; }
        if (frontBefRenderFun) { this.FrontBefRenderFunMap[insid] = frontBefRenderFun; }
    }

    /**
     * 注销 top_overLay 渲染跳跃对象
     * @param insid 实例id
     */
    public static unregisterLeapRender(insid: number) {
        if (isNaN(insid)) { return; }
        let layer = this.uiInsIDLayerMap[insid];
        let arr = this.leapLayerMap[layer];
        if (arr == null) { return; }
        if (arr.length > 0) {
            let idx = arr.indexOf(insid);
            if (idx != -1) {
                arr.splice(idx, 1);
            }
        } else {
            let queue = this.leapLayerQueue;
            let idx = queue.indexOf(layer);
            if (idx != -1) {
                queue.splice(idx, 1);
            }
            delete this.leapLayerMap[layer];
        }

        delete this.uiInsIDLayerMap[insid];
        delete this.leapRenderFunMap[insid];
        delete this.FrontBefRenderFunMap[insid];
    }

    //Front  overlay 渲染前的调用
    private static onFrontLay2dBeforRender() {
        let map = this.FrontBefRenderFunMap;
        if (!map) { return; }
        let queue = this.leapLayerQueue;
        for (let i = 0, len = queue.length; i < len; i++) {
            let layer = queue[i];
            let arr = this.leapLayerMap[layer];
            for (let j = 0, len1 = arr.length; j < len1; j++) {
                let insID = arr[j];
                if (map.hasOwnProperty(insID)) {
                    const fun = map[insID];
                    if (this.overlay.canvas.assetmgr) {
                        fun(this.overlay.canvas);
                    }
                }
            }
        }
    }

    //top_overLay 渲染前的调用
    private static onTopLay2dBeforRender() {
        let map = this.leapRenderFunMap;
        if (!map) { return; }
        let queue = this.leapLayerQueue;
        for (let i = 0, len = queue.length; i < len; i++) {
            let layer = queue[i];
            let arr = this.leapLayerMap[layer];
            for (let j = 0, len1 = arr.length; j < len1; j++) {
                let insID = arr[j];
                if (map.hasOwnProperty(insID)) {
                    const fun = map[insID];
                    if (this.topOverlay.canvas.assetmgr) {
                        fun(this.topOverlay.canvas);
                    }
                }
            }
        }
    }

    private static refrashCamMask() {

        let funToMask = m4m.framework.cullingmaskutil.layerToMask;
        let bit = funToMask(this._layerIndexOverUI3d);
        //over 3d cam 
        if (this._modelcam) { this._modelcam.CullingMask = bit | m4m.framework.CullingMask.ui; }
        //main cam 
        let mainCam = m4m.framework.sceneMgr.scene.mainCamera;
        if (mainCam) { mainCam.CullingMask = bit ^ 0xFFFFFFFF; }
    }
}