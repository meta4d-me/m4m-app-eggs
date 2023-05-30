import {GameMgr} from "./GameMgr";
export class uiMgr
{
    static overlay : m4m.framework.overlay2D;
    static baselayer :m4m.framework.transform2D;
    static highlayer :m4m.framework.transform2D;
    static poplayer :m4m.framework.transform2D;
    private static uiRoot :m4m.framework.transform2D;
    private static scene : m4m.framework.scene;
    static shareCanvasImg: m4m.framework.rawImage2D;  //给 子域分享画布 使用
    private static scFullImg: m4m.framework.rawImage2D;  //全屏尺寸 img容器
    static scIconImg: m4m.framework.rawImage2D;  //头像尺寸 img容器 32 x 32
    static otherIconImg: m4m.framework.rawImage2D;  //其他头像的 img容器 32 x 32
    static headIcon : m4m.framework.transform2D; //头像icon 
    private static leapRenderFunMap: { [insId: number]: (canvas: m4m.framework.canvas) => any } = {};   //跳跃到 top_overlay 的渲染容器
    private static FrontBefRenderFunMap: { [insId: number]: (canvas: m4m.framework.canvas) => any } = {};   //overlay 的渲染前
    static init(){
        this.scene = GameMgr.app.getScene();
        //创建overlayer2d
        this.overlay = new m4m.framework.overlay2D();
        //
        this.overlay.scaleMode = m4m.framework.UIScaleMode.SCALE_WITH_SCREEN_SIZE;
        this.overlay.matchReference_width = 720;  //UI 固定分辨率
        this.overlay.matchReference_height = 1280; 
        if( !this.scene.mainCamera){
            let camT = new m4m.framework.transform();
            camT.name = "mainCam";
            this.scene.getRoot().addChild(camT);
            let cam = camT.gameObject.addComponent("camera") as m4m.framework.camera;
            this.scene.update(0);
        }
        this.scene.mainCamera.addOverLay(this.overlay);

        //ui
        let opt = m4m.framework.layoutOption;
        this.uiRoot = this.overlay.canvas.getRoot();

        //头像层
        this.setHeadIcon();
        //各层
        this.baselayer = new m4m.framework.transform2D();
        this.baselayer.layoutState = opt.LEFT | opt.RIGHT | opt.TOP | opt.BOTTOM;
        this.uiRoot.addChild(this.baselayer);
        this.highlayer = new m4m.framework.transform2D();
        this.highlayer.layoutState = opt.LEFT | opt.RIGHT | opt.TOP | opt.BOTTOM;
        this.uiRoot.addChild(this.highlayer);

        // //shareCanvasImg
            //scFullImg
        let SCITran = new m4m.framework.transform2D();
        SCITran.name = "scFullImg";
        this.uiRoot.addChild(SCITran); 
        SCITran.layoutState = opt.LEFT | opt.RIGHT | opt.TOP | opt.BOTTOM;
        let rimg = SCITran.addComponent("rawImage2D") as m4m.framework.rawImage2D ;
        rimg.image = GameMgr.assetMgr.getDefaultTexture("grid");
        SCITran.visible = false;
        this.shareCanvasImg = this.scFullImg = rimg;
        //     //scIconImg
        // let SCITran_0 = new m4m.framework.transform2D();
        // SCITran_0.name = "scIconImg";
        // SCITran_0.width = SCITran_0.height =80;
        // SCITran_0.pivot.x = 0.5;
        // SCITran_0.pivot.y = 1;
        // this.uiRoot.addChild(SCITran_0); 
        // let rimg_0 = SCITran_0.addComponent("rawImage2D") as m4m.framework.rawImage2D ;
        // rimg_0.image = GameMgr.assetMgr.getDefaultTexture("grid");
        // SCITran_0.visible = false;
        // this.scIconImg = rimg_0;
        
        

        //pop
        this.poplayer = new m4m.framework.transform2D();
        this.poplayer.layoutState = opt.LEFT | opt.RIGHT | opt.TOP | opt.BOTTOM;
        this.uiRoot.addChild(this.poplayer);
    }

    //头像显示
    private static setHeadIcon(){
        let opt = m4m.framework.layoutOption;
        let size  = 80;
        //headIcon root
        this.headIcon = new m4m.framework.transform2D();
        this.headIcon.name = "headIcon";
        this.headIcon.width = this.headIcon.height =size;
        this.headIcon.pivot.x = 0.5;
        this.headIcon.pivot.y = 1;
        this.uiRoot.addChild(this.headIcon); 
        // this.baselayer.addChild(this.headIcon);

        //other Icon
        let otherTran = new m4m.framework.transform2D();
        otherTran.layoutState = opt.H_CENTER | opt.V_CENTER;
        otherTran.name = "otherImg";
        otherTran.width = otherTran.height =size;
        this.headIcon.addChild(otherTran); 
        let rimg_1 = otherTran.addComponent("rawImage2D") as m4m.framework.rawImage2D ;
        rimg_1.image = GameMgr.assetMgr.getDefaultTexture("grid");
        otherTran.visible = false;
        this.otherIconImg = rimg_1;

        //scIconImg
        let SCITran_0 = new m4m.framework.transform2D();
        SCITran_0.layoutState = opt.H_CENTER | opt.V_CENTER;
        SCITran_0.name = "scIconImg";
        SCITran_0.width = SCITran_0.height =size;
        this.headIcon.addChild(SCITran_0); 
        let rimg_0 = SCITran_0.addComponent("rawImage2D") as m4m.framework.rawImage2D ;
        rimg_0.image = GameMgr.assetMgr.getDefaultTexture("grid");
        SCITran_0.visible = false;
        this.scIconImg = rimg_0;

    }

    private static _sCanvIconMode = false;
    /** shareCanvas image 容器的 icon */
    static get sCanvIconMode(){ return this._sCanvIconMode;};
    static set sCanvIconMode(isIconMode : boolean ){
        this.shareCanvasImg.transform.visible = false;
        if(isIconMode){
            this.shareCanvasImg = this.scIconImg;
        }else{
            this.shareCanvasImg = this.scFullImg;
        }
        this._sCanvIconMode = isIconMode;
    }
}