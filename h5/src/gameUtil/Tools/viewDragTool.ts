
/** 拖拽查看场景物体工具 */
// tslint:disable-next-line: class-name
export class viewDragTool{
    static get instance(){
        if (!this._instance){
            this._instance = new viewDragTool();
            this._instance.init();
        }
        return this._instance;
    }

    public static dispose(){
        this._instance.dispose();
        this._instance = null;
    }

    /** 能被拖拽 layermask */
    get dragLayerMask(){ return this._dragLayerMask;}
    set dragLayerMask(v){this._dragLayerMask = v;}
    /** 框选的 透明值  */
    get selectSphereAlpha(){return this._selectSphereAlpha;}
    set selectSphereAlpha(a){
        this._selectSphereAlpha = a;
        let mat = this.selectModel.materials[0];
        mat.setFloat("_Alpha",this._selectSphereAlpha);
    }

    public onPicked : (tran: m4m.framework.transform) => {};
    private static _instance : viewDragTool;

    private static readonly helpV2 = new m4m.math.vector2();
    private static readonly helpV3 = new m4m.math.vector3();
    private static readonly helpV3v1 = new m4m.math.vector3();

    private _dragLayerMask : number = 0xFFFFFFFF; //默认全layer

    private _selectSphereAlpha : number = 0.38;

    private _app : m4m.framework.application;
    private _inputMgr : m4m.framework.inputMgr;
    private _scene : m4m.framework.scene;
    private _assetMgr : m4m.framework.assetMgr;
    private _lastPickedTran : m4m.framework.transform;
    private selectModel : m4m.framework.meshRenderer;
    private canDragMove  = false;
    private startScreenPos = new m4m.math.vector2();
    private startTranPos = new m4m.math.vector3();
    private startPlaneHitPos = new m4m.math.vector3();
    private planeNormal = new m4m.math.vector3();

    private outInfo = new m4m.framework.pickinfo();

    public init(){
        //获取点击交互
        this._app = m4m.framework.sceneMgr.app;
        this._inputMgr = this._app.getInputMgr();
        this._assetMgr = this._app.getAssetMgr();
        this._scene = this._app.getScene();
        this._inputMgr.addPointListener(m4m.event.PointEventEnum.PointDown , this._pointDown , this);
        this._inputMgr.addPointListener(m4m.event.PointEventEnum.PointUp , this._pointUp , this);
        this._inputMgr.addPointListener(m4m.event.PointEventEnum.PointMove , this._pointmove , this);

        //meshrenderer
        let sMTran = m4m.framework.TransformUtil.CreatePrimitive(m4m.framework.PrimitiveType.Sphere , this._app);
        this.selectModel = sMTran.gameObject.getFirstComponentInChildren("meshRenderer") as m4m.framework.meshRenderer;
        let mat = this.selectModel.materials[0];
        mat.setShader(this._assetMgr.getShader("transparent.shader.json"));
        mat.setTexture("_MainTex",this._assetMgr.getDefaultTexture("normal"));
        mat.setFloat("_Alpha", this._selectSphereAlpha);
        mat.setFloat("_Superimposition",1.3);
    }

    public dispose(){
        this._inputMgr.removePointListener(m4m.event.PointEventEnum.PointDown , this._pointDown , this);
        this._inputMgr.removePointListener(m4m.event.PointEventEnum.PointUp , this._pointUp , this);
        this._inputMgr.removePointListener(m4m.event.PointEventEnum.PointMove , this._pointmove , this);
    }

    private _pointUp(ev){
        if (this.canDragMove) { this.cansoleSelecting(); }
    }

    private _pointmove(ev){
        if (!this.canDragMove || !this._lastPickedTran) { return; }
        let outHitPoint = viewDragTool.helpV3;
        let subv3 = viewDragTool.helpV3v1;

        this.getHitPointByPlane(outHitPoint);
        m4m.math.vec3Subtract(outHitPoint, this.startPlaneHitPos,subv3);
        //移动 物体
        let addV3 = subv3;
        m4m.math.vec3Add(subv3 , this.startTranPos ,addV3);
        this._lastPickedTran.setWorldPosition(addV3);
        this.setShperePos();
    }

    private getHitPointByPlane(outHitpoint : m4m.math.vector3){
        let point = this._inputMgr.point;
        let nowSpos = viewDragTool.helpV2;
        m4m.math.vec2Set(nowSpos ,point.x ,point.y);
        let cam = this._scene.mainCamera;
        let ray = cam.creatRayByScreen(nowSpos,this._app);
        ray.intersectPlane(this.startTranPos,this.planeNormal,outHitpoint);
    }

    private _pointDown(ev){
        this.canDragMove = false;
        if (this._inputMgr.isPressed(0)){
            this.leftDown(ev);
        }else if (this._inputMgr.isPressed(2)){
            this.rightDown();
        }
    }

    private cansoleSelecting(){
        let stran = this.selectModel.gameObject.transform;
        if (!stran.parent) { return; }
        stran.parent.removeChild(stran);
        this._lastPickedTran = null;
    }

    private rightDown(){
        this.cansoleSelecting();
    }
    private leftDown(ev){
        this.tryToPick();
    }

    private tryToPick(){
        let sV2 = viewDragTool.helpV2;
        m4m.math.vec2Set(sV2 , this._inputMgr.point.x , this._inputMgr.point.y);
        let cam = this._scene.mainCamera;
        let ray = cam.creatRayByScreen(sV2,this._app);
        let ispicked = this._scene.pick(ray , this.outInfo, true , this._scene.getRoot() ,this._dragLayerMask);
        if (ispicked){
            let sMTran = this.selectModel.gameObject.transform;
            if (this.outInfo.pickedtran != sMTran){
                this.pickedTrans(this.outInfo.pickedtran);
            }else{
                this.pickedSelectModel();
            }
            console.log(`picked ${this.outInfo.pickedtran.name}`);
        }
    }

    private pickedTrans(tran: m4m.framework.transform){
        this._lastPickedTran = tran;
        let sMTran = this.selectModel.gameObject.transform;
        this._scene.addChild(sMTran);
        this.setShperePos();
        //缩放  
        this.setShpereScele();
        if (this.onPicked) { this.onPicked(this._lastPickedTran); }
    }

    private setShperePos(){
        if (!this._lastPickedTran) { return; }
        let sMTran = this.selectModel.gameObject.transform;
        let aabb = this._lastPickedTran.aabb;
        sMTran.localPosition = aabb.center;
        sMTran.localPosition = sMTran.localPosition;
    }

    private setShpereScele(){
        if (!this._lastPickedTran) { return; }
        let sMTran = this.selectModel.gameObject.transform;
        let aabb = this._lastPickedTran.aabb;
        let s = m4m.math.vec3Distance(aabb.maximum,aabb.minimum) * 0.5;
        m4m.math.vec3SetAll(sMTran.localScale , s);
        sMTran.localScale = sMTran.localScale;
    }

    private pickedSelectModel(){
        //定移动初始点
        let point = this._inputMgr.point;
        m4m.math.vec2Set(this.startScreenPos ,point.x ,point.y);
        //移动球
        this.canDragMove = true;
        let pTran = this._lastPickedTran;
        //开始位置
        m4m.math.vec3Clone(pTran.getWorldPosition() , this.startTranPos);
        let cam = this._scene.mainCamera;
        //法线方向
        cam.gameObject.transform.getForwardInWorld(this.planeNormal);
        //记录平面初次碰撞位置
        this.getHitPointByPlane(this.startPlaneHitPos);

        console.log(` pickedSelectModel `);
    }
}