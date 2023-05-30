import { ISpGameObject, ISpTransform, spComponentType, ISpComponent, engineParallelType } from "./spInterface";
import { gdCamera } from "./m4m/gdCamera";
import { wxCamera } from "./wxEngine/wxCamera";
import { gdMeshRenderer } from "./m4m/gdMeshRenderer";
import { gdSkinnedMeshRenderer } from "./m4m/gdSkinnedMeshRenderer";
import { gdParticleSystem } from "./m4m/gdParticleSystem";
import { gdTrailRenderer } from "./m4m/gdTrailRenderer";
import { gdAnimPlayer } from "./m4m/gdAnimPlayer";
import { getSpTransform } from "./parallelEngineTool";
import { wxAnimPlayer } from "./wxEngine/wxAnimPlayer";
import engine from "engine";
import { wxMeshRenderer } from "./wxEngine/wxMeshRenderer";
import { wxSkinnedMeshRenderer } from "./wxEngine/wxSkinnedMeshRenderer";
import { wxParticleSystemt } from "./wxEngine/wxParticleSystemt";
import { wxTrailRenderer } from "./wxEngine/wxTrailRenderer";
import { gameMathUtil } from "Tools/gameMathUtil";
import { gdKeyFrameAnimPlayer } from "./m4m/gdKeyFrameAnimPlayer";

// /**
//  * 获取 SP transfrom
//  * @param rawTran 
//  */
// export function getSpTransform (rawTran : any) : ISpTransform{
//     if(!rawTran) return;
//     if(rawTran.rawHandle){
//         console.error(` getSpTransform 失败 , 当前对象已经是一个  ISpTransform 了。`);
//         return;
//     }
//     if(GameMgr.engineParallel == engineParallelType.none){
//         let gdRawTran : m4m.framework.transform = rawTran;
//         let cache = gdTransform.IDMap[gdRawTran.insId.getInsID()];
//         if(cache) return cache;
//         return new gdTransform(gdRawTran);
//     }else{
//         return new wxTransform();
//     }
// }

// /**
//  * 获取 SP transfom
//  * @param rawGo 
//  */
// export function getSpGameObject(rawGo : any) : ISpGameObject{
//     if(!rawGo) return;

//     if(GameMgr.engineParallel == engineParallelType.none){
//         //m4m 的对象
//         let gdRawGo : m4m.framework.gameObject = rawGo;
//         let gdRawTran : m4m.framework.transform = gdRawGo.transform;
//         let cache = gdTransform.IDMap[gdRawTran.insId.getInsID()];
//         if(cache) return cache.gameObject;
//         cache = new gdTransform(gdRawTran);
//         return cache.gameObject;
//     }else{
//         return
//     }
// }

/** 
 * m4m go
 */
// tslint:disable-next-line: class-name
export class m4mGO implements ISpGameObject {
    get layer() { return this.rawHandle.layer; }
    set layer(v) { this.rawHandle.layer = v; }

    get visible() { return this.rawHandle.visible; }
    set visible(v) { this.rawHandle.visible = v; }

    get isStatic() { return this.rawHandle.isStatic; }
    set isStatic(v) { this.rawHandle.isStatic = v; }

    get tag() { return this.rawHandle.tag; }
    set tag(v) { this.rawHandle.tag = v; }

    get name() { return this.rawHandle.transform.name; }
    set name(v) { this.rawHandle.transform.name = v; }

    /** 是否是关键帧差值播放器 */
    public isKeyFramePlayer: boolean = false;
    //获取raw组件类型str
    private static getRawCompStr(_type: spComponentType, isKeyFramePlayer: boolean) {
        let result: string;
        switch (_type) {
            case spComponentType.camera: result = m4m.framework.camera.ClassName; break;
            case spComponentType.meshRenderer: result = m4m.framework.meshRenderer.ClassName; break;
            case spComponentType.skinMeshRenderer: result = m4m.framework.skinnedMeshRenderer.ClassName; break;
            case spComponentType.particleSystem: result = m4m.framework.f14EffectSystem.ClassName; break;
            case spComponentType.trailRenderer: result = m4m.framework.trailRender.ClassName; break;
            // tslint:disable-next-line: max-line-length
            case spComponentType.animPlayer: result = isKeyFramePlayer ? m4m.framework.keyFrameAniPlayer.ClassName : m4m.framework.aniplayer.ClassName; break;
            default: result = null;
        }
        return result;
    }
    //获取组件唯一ID
    private static getCompID(comp: m4m.framework.INodeComponent) {
        return `${comp.gameObject.transform.insId.getInsID()}_${comp.constructor["ClassName"]}`;
    }

    //获取spComp 
    private static getSpCompByType(_type: spComponentType, go: m4mGO, rawComp: m4m.framework.INodeComponent) {
        let result;
        switch (_type) {
            case spComponentType.camera: result = new gdCamera(rawComp as any, go); break;
            case spComponentType.meshRenderer: result = new gdMeshRenderer(rawComp as any, go); break;
            case spComponentType.skinMeshRenderer: result = new gdSkinnedMeshRenderer(rawComp as any, go); break;
            case spComponentType.particleSystem: result = new gdParticleSystem(rawComp as any, go); break;
            case spComponentType.trailRenderer: result = new gdTrailRenderer(rawComp as any, go); break;
            case spComponentType.animPlayer:
                if (rawComp instanceof (m4m.framework.aniplayer)) {
                    result = new gdAnimPlayer(rawComp as any, go);
                } else if (rawComp instanceof (m4m.framework.keyFrameAniPlayer)) {
                    result = new gdKeyFrameAnimPlayer(rawComp as any, go);
                }
                break;
            default: result = null;
        }

        return result;
    }

    public transform: gdTransform;
    public rawHandle: m4m.framework.gameObject;

    constructor(rawGo: m4m.framework.gameObject, trans?: gdTransform) {
        this.rawHandle = rawGo;
        this.transform = trans ? trans : new gdTransform(this.rawHandle.transform, this);
    }

    private static readonly helpArr = [];
    private _rootNode: gdTransform;
    private componentsMap: { [id: string]: ISpComponent } = {};

    public getID() {
        return this.rawHandle.transform.insId.getInsID();
    }

    public getRootNode(): gdTransform {
        if (!this._rootNode) {
            let scene = this.rawHandle.getScene();
            this._rootNode = new gdTransform(scene.getRoot(), this);
        }

        return this._rootNode;
    }

    public getFirstComponent(_type: spComponentType): ISpComponent {
        let rawComp = this.rawHandle.getFirstComponentInChildren(m4mGO.getRawCompStr(_type, this.isKeyFramePlayer));
        return this.makeComp(_type, rawComp);
    }

    public getComponents(_type: spComponentType): ISpComponent[] {
        let rawComps = this.rawHandle.getComponentsInChildren(m4mGO.getRawCompStr(_type, this.isKeyFramePlayer));
        let comps = [];
        for (let i = 0, len = rawComps.length; i < len; i++) {
            comps.push(this.makeComp(_type, rawComps[i]));
        }
        return comps;
    }

    public addComponent(_type: spComponentType): ISpComponent {
        let rawComp = this.rawHandle.addComponent(m4mGO.getRawCompStr(_type, this.isKeyFramePlayer));
        return this.makeComp(_type, rawComp);
    }

    public dispose(): void {
        let arr = m4mGO.helpArr;
        if (this.componentsMap) {
            for (let key in this.componentsMap) {
                arr.push(key);
                let comp = this.componentsMap[key];
                if (comp.dispose) {
                    comp.dispose();
                }
            }
        }

        for (let i = 0, len = arr.length; i < len; i++) {
            delete this.componentsMap[arr[i]];
        }

        arr.length = 0;

        this.rawHandle = null;
        this.transform = null;
        this.componentsMap = null;
        this._rootNode = null;
    }

    //创建Cmp
    private makeComp(_type: spComponentType, rawComp: m4m.framework.INodeComponent) {
        if (!rawComp) { return; }
        let compId = m4mGO.getCompID(rawComp);
        let result = this.componentsMap[compId];
        if (!result) {
            let compTran = getSpTransform(rawComp.gameObject.transform) as gdTransform;
            result = m4mGO.getSpCompByType(_type, compTran.gameObject, rawComp) as ISpComponent;
            result.id = compId;
            this.componentsMap[compId] = result;
        }
        return result;
    }
}

/**
 * m4m transform
 */
// tslint:disable-next-line: class-name
export class gdTransform implements ISpTransform {
    get name() { return this.rawHandle.name; }
    set name(v) { this.rawHandle.name = v; }

    get enableCulling() { return this.rawHandle.enableCulling; }
    set enableCulling(v) { this.rawHandle.enableCulling = v; }

    get needGpuInstancBatcher() { return this.rawHandle.needGpuInstancBatcher; }
    set needGpuInstancBatcher(v) { this.rawHandle.needGpuInstancBatcher = v; }

    private static packTran(tran: m4m.framework.transform) {
        if (!tran) { return; }
        //看下缓存中是否创建了壳子
        let gdTran = gdTransform.IDMap[tran.insId.getInsID()];
        if (gdTran) { return gdTran; }
        let t = new gdTransform(tran);
        return t;
    }
    get childrenCount() { return this.rawHandle.children.length; }

    get localRotate() { return this.rawHandle.localRotate; }
    set localRotate(v) { this.rawHandle.localRotate = v; }
    // localRotate: m4m.math.quaternion;

    get localPosition() { return this.rawHandle.localPosition; }
    set localPosition(v) { this.rawHandle.localPosition = v; }
    // localPosition: m4m.math.vector3;

    get localScale() { return this.rawHandle.localScale; }
    set localScale(v) { this.rawHandle.localScale = v; }
    // localScale: m4m.math.vector3;

    get localEulerAngles() { return this.rawHandle.localEulerAngles; }
    set localEulerAngles(v) { this.rawHandle.localEulerAngles = v; }
    public static IDMap: { [transId: string]: gdTransform } = {};
    public engineType: engineParallelType = engineParallelType.none;
    public gameObject: m4mGO;
    public rawHandle: m4m.framework.transform;

    /**
     * 
     * @param _rawhandle 原始 m4m transform 数据
     * @param _gameObject GO对象
     */
    constructor(_rawhandle?: m4m.framework.transform, _gameObject?: m4mGO) {
        if (!_rawhandle) {
            // tslint:disable-next-line: no-parameter-reassignment
            _rawhandle = new m4m.framework.transform();
        }
        if (!_gameObject) {
            // tslint:disable-next-line: no-parameter-reassignment
            _gameObject = new m4mGO(_rawhandle.gameObject, this);
        }
        this.rawHandle = _rawhandle;
        this.gameObject = _gameObject;
        gdTransform.IDMap[_rawhandle.insId.getInsID()] = this;
    }

    public getChildByIdx(childIdx: number): gdTransform {
        let tempTrans = this.rawHandle.children[childIdx];
        return gdTransform.packTran(tempTrans);
    }

    public addChild(node: gdTransform): void {
        if (!node || node.engineType != engineParallelType.none) {
            // tslint:disable-next-line: max-line-length
            console.error(`addChild fail to  engineParallelType : ${engineParallelType[engineParallelType.none]} node , node == null : ${node == null} `);
            return;
        }
        this.rawHandle.addChild(node.rawHandle);
    }
    public removeAllChild(needDispose?: boolean): void {
        while (this.childrenCount > 0) {
            if (needDispose) {
                this.getChildByIdx(0)
                    .dispose();
            } else {
                this.removeChild(this.getChildByIdx(0));
            }
        }
    }
    public removeChild(node: gdTransform): void {
        this.rawHandle.removeChild(node.rawHandle);
    }
    public find(name: string): gdTransform {
        let tempTran = this.rawHandle.find(name);
        return gdTransform.packTran(tempTran);
    }
    // localEulerAngles: m4m.math.vector3;

    public getWorldRotate(): m4m.math.quaternion {
        return this.rawHandle.getWorldRotate();
    }
    public setWorldRotate(rotate: m4m.math.quaternion): void {
        this.rawHandle.setWorldRotate(rotate);
    }
    public getWorldPosition(): m4m.math.vector3 {
        return this.rawHandle.getWorldPosition();
    }
    public setWorldPosition(pos: m4m.math.vector3): void {
        this.rawHandle.setWorldPosition(pos);
    }
    public getWorldScale(): m4m.math.vector3 {
        return this.rawHandle.getWorldScale();
    }
    public setWorldScale(scale: m4m.math.vector3): void {
        this.rawHandle.setWorldScale(scale);
    }
    public getWorldMatrix(): m4m.math.matrix {
        return this.rawHandle.getWorldMatrix();
    }
    public getLocalMatrix(): m4m.math.matrix {
        return this.rawHandle.getLocalMatrix();
    }
    public setWorldMatrix(mat: m4m.math.matrix) {
        this.rawHandle.setWorldMatrix(mat);
    }
    public lookatPoint(point: m4m.math.vector3): void {
        this.rawHandle.lookatPoint(point);
    }

    public getForwardInWorld(out: m4m.math.vector3) {
        this.rawHandle.getForwardInWorld(out);
    }

    public getRightInWorld(out: m4m.math.vector3) {
        this.rawHandle.getRightInWorld(out);
    }

    public getUpInWorld(out: m4m.math.vector3) {
        this.rawHandle.getUpInWorld(out);
    }

    public getParent() {
        let tempTran = this.rawHandle.parent;
        return gdTransform.packTran(tempTran);
    }

    public getAabbMax() {
        return this.rawHandle.aabb.maximum;
    }

    public getAabbMin() {
        return this.rawHandle.aabb.minimum;
    }

    public getAabbCenter() {
        return this.rawHandle.aabb.center;
    }

    public dispose(): void {
        let tranID = this.rawHandle.insId.getInsID();
        this.rawHandle.dispose();

        delete gdTransform.IDMap[tranID];
        this.gameObject.dispose();

        this.gameObject = null;
        this.rawHandle = null;
    }
    private getWorldTranslate() {
        return this.getWorldPosition();
    }

}

//------------------------------------------------------------wxEngine-----------------------------------------------------------------------
/**
 * wxEngine go
 */
// tslint:disable-next-line: class-name
export class wxEngineGO implements ISpGameObject {
    // get layer(){ return this.rawHandle.layer;}
    // set layer(v){ this.rawHandle.layer = v;};
    get layer() { return 0; }
    // tslint:disable-next-line: no-empty
    set layer(v) { }

    get visible() { return this.rawHandle.active; }
    set visible(v) { this.rawHandle.active = v; }

    get isStatic() { return false; }
    // tslint:disable-next-line: no-empty
    set isStatic(v) { }

    get tag() { return ""; }
    // tslint:disable-next-line: no-empty
    set tag(v) { }

    get name() { return this.rawHandle.name; }
    set name(v) { this.rawHandle.name = v; }

    //获取raw组件类型str
    private static getRawCompType(_type: spComponentType) {
        let result: any;
        switch (_type) {
            case spComponentType.camera: result = engine.Camera; break;
            case spComponentType.animPlayer: result = engine.Animator; break;
            case spComponentType.meshRenderer: result = engine.MeshRenderer; break;
            case spComponentType.skinMeshRenderer: result = engine.SkinnedMeshRenderer; break;
            case spComponentType.particleSystem: result = engine.Particle; break;
            case spComponentType.trailRenderer: result = engine.TrailRenderer; break;
            default: result = null;
        }
        return result;
    }

    //获取spComp 
    private static getSpCompByType(_type: spComponentType, go: wxEngineGO, rawComp: any) {
        let result;
        switch (_type) {
            case spComponentType.camera: result = new wxCamera(rawComp as any, go); break;
            case spComponentType.animPlayer: result = new wxAnimPlayer(rawComp as any, go); break;
            case spComponentType.meshRenderer: result = new wxMeshRenderer(rawComp as any, go); break;
            case spComponentType.skinMeshRenderer: result = new wxSkinnedMeshRenderer(rawComp as any, go); break;
            case spComponentType.particleSystem: result = new wxParticleSystemt(rawComp as any, go); break;
            case spComponentType.trailRenderer: result = new wxTrailRenderer(rawComp as any, go); break;
            default: result = null;
        }

        return result;
    }
    public transform: wxTransform;
    public rawHandle: engine.Entity;

    constructor(rawGo: engine.Entity) {
        this.rawHandle = rawGo;
        this.transform = new wxTransform(this.rawHandle.transform, this);
    }

    private static readonly helpArr = [];
    private _rootNode: wxTransform;
    private componentsMap: { [id: string]: ISpComponent } = {};

    public getID() {
        return this.rawHandle.transform.id;
    }

    public getRootNode(): ISpTransform {
        if (!this._rootNode) {
            let root = engine.game.sceneRoot.transform;
            this._rootNode = new wxTransform(root, this);
        }
        return this._rootNode;
    }
    public getFirstComponent(_type: spComponentType): ISpComponent {
        // let rawComp = this.rawHandle.getComponent(wxEngineGO.getRawCompType(_type));
        // let compTypeStr = wxEngineGO.getRawCompType(_type).name; 
        let compTypeStr = wxEngineGO.getRawCompType(_type).prototype.__typeName;
        let rawComp = this.getNodeFirstComponent(this.rawHandle, compTypeStr);
        return this.makeComp(_type, rawComp);
    }

    public getComponents(_type: spComponentType): ISpComponent[] {
        let compTypeStr = wxEngineGO.getRawCompType(_type).prototype.__typeName;
        let rawComps: engine.Component[] = [];
        this.getNodeComponentsInChildren(this.rawHandle, compTypeStr, rawComps);
        let comps = [];
        for (let i = 0, len = rawComps.length; i < len; i++) {
            comps.push(this.makeComp(_type, rawComps[i]));
        }
        return comps;
    }

    public addComponent(_type: spComponentType): ISpComponent {
        let rawComp = this.rawHandle.addComponent(wxEngineGO.getRawCompType(_type));
        return this.makeComp(spComponentType.camera, rawComp);
    }
    public dispose(): void {
        let arr = wxEngineGO.helpArr;
        if (this.componentsMap) {
            for (let key in this.componentsMap) {
                arr.push(key);
                let comp = this.componentsMap[key];
                if (comp.dispose) {
                    comp.dispose();
                }
            }
        }

        for (let i = 0, len = arr.length; i < len; i++) {
            delete this.componentsMap[arr[i]];
        }

        arr.length = 0;

        this.rawHandle = null;
        this.transform = null;
        this.componentsMap = null;
        this._rootNode = null;
    }

    //创建Cmp
    private makeComp(_type: spComponentType, rawComp: engine.Component) {
        if (!rawComp) { return; }
        let compId = rawComp.id;
        let result = this.componentsMap[compId];
        if (!result) {
            let compTran = getSpTransform(rawComp.entity.transform) as wxTransform;
            result = wxEngineGO.getSpCompByType(_type, compTran.gameObject, rawComp) as ISpComponent;
            result.id = compId.toString();
            this.componentsMap[compId] = result;
        }
        return result;
    }

    /** 获取节点的第一个组件 */
    private getNodeFirstComponent(entity: engine.Entity, compTypeName: string): engine.Component {
        let len = entity.components.length;
        for (let i = 0; i < len; i++) {
            let comp = entity.components[i];
            if (comp["__typeName"] != compTypeName) { continue; }
            return comp;
        }

        let children = entity.transform.children;
        if (children != null) {
            let len1 = children.length;
            for (let j = 0; j < len1; j++) {
                let result = this.getNodeFirstComponent(children[j].entity, compTypeName);
                if (result) { return result; }
            }
        }

    }

    private getNodeComponentsInChildren(entity: engine.Entity, compTypeName: string, rawComps: engine.Component[]) {
        let len = entity.components.length;
        for (let i = 0; i < len; i++) {
            let comp = entity.components[i];
            if (comp["__typeName"] != compTypeName) { continue; }
            // return comp;
            rawComps.push(comp);
        }

        let children = entity.transform.children;
        if (children) {
            for (let j = 0, len1 = children.length; j < len1; j++) {
                this.getNodeComponentsInChildren(children[j].entity, compTypeName, rawComps);
            }
        }
    }
}
// tslint:disable-next-line: class-name
export class wxTransform implements ISpTransform {

    private static packTran(tran: engine.Transform3D) {
        if (!tran) { return; }
        //看下缓存中是否创建了壳子
        let gdTran = wxTransform.IDMap[tran.id];
        if (gdTran) { return gdTran; }
        let t = new wxTransform(tran);
        return t;
    }

    get name() { return this.gameObject.name; }
    set name(v) { this.gameObject.name = v; }

    get enableCulling() { return false; }
    // tslint:disable-next-line: no-empty
    set enableCulling(v) { }

    get needGpuInstancBatcher() { return false; }
    // tslint:disable-next-line: no-empty
    set needGpuInstancBatcher(v) { }

    get localRotate() {
        return this.getData(this.rawHandle.quaternion, "localRotate", "quat");
    }
    set localRotate(v) {
        gameMathUtil.IquatClone(v, this.rawHandle.quaternion);
        this.rawHandle.quaternion.x *= -1;
        this.rawHandle.quaternion.w *= -1;
        this.rawHandle.quaternion = this.rawHandle.quaternion;
    }
    get localPosition() {

        return this.getData(this.rawHandle.position, "localPosition", "v3_pos");
    }
    set localPosition(v) {
        let pos = this.rawHandle.position;
        gameMathUtil.Ivec3Clone(v, pos);
        pos.x *= -1;
        this.rawHandle.position = pos;
    }
    get localScale() {
        // gameMathUtil.Ivec3Clone(this.rawHandle.scale , this._help_scale);
        // return this._help_scale;
        return this.getData(this.rawHandle.scale, "localScale", "v3");
    }
    set localScale(v) {
        gameMathUtil.Ivec3Clone(v, this.rawHandle.scale);
        this.rawHandle.scale = this.rawHandle.scale;
    }
    get localEulerAngles() {
        // gameMathUtil.Ivec3Clone(this.rawHandle.euler , this._help_Euler);
        // return this._help_Euler;
        return this.getData(this.rawHandle.euler, "localEulerAngles", "v3");
    }
    set localEulerAngles(v) {
        gameMathUtil.Ivec3Clone(v, this.rawHandle.euler);
        this.rawHandle.euler = this.rawHandle.euler;
    }

    get childrenCount() { return this.rawHandle.children.length; }
    public static IDMap: { [transId: string]: wxTransform } = {};

    public rawHandle: engine.Transform3D;
    public gameObject: wxEngineGO;
    public engineType: engineParallelType = engineParallelType.wxEngine;
    constructor(_rawhandle?: any, _gameObject?: wxEngineGO) {
        if (!_rawhandle) {
            wxTransform.count++;
            // _rawhandle = engine.Entity.createEntity3D("wxTransForm_" + wxTransform.count).transform;
            // tslint:disable-next-line: no-parameter-reassignment
            _rawhandle = engine.game.createEntity3D("wxTransForm_" + wxTransform.count).transform;
            // let go = new engine.Entity();
            // _rawhandle = go.addComponent(engine.Transform3D);
        }
        if (!_gameObject) {
            // tslint:disable-next-line: no-parameter-reassignment
            _gameObject = new wxEngineGO(_rawhandle.entity);
        }
        this.rawHandle = _rawhandle;
        this.gameObject = _gameObject;
        wxTransform.IDMap[_rawhandle.id] = this;
    }
    private static readonly helpMtx: m4m.math.matrix = new m4m.math.matrix();
    private static readonly helpMtx1: m4m.math.matrix = new m4m.math.matrix();

    private static readonly helpMtxWx: engine.Matrix4 = new engine.Matrix4();
    private static readonly helpMtxWx1: engine.Matrix4 = new engine.Matrix4();

    private static readonly helpV3: m4m.math.vector3 = new m4m.math.vector3();
    private static readonly helpV3v1: m4m.math.vector3 = new m4m.math.vector3();

    private static readonly helpQuat: m4m.math.quaternion = new m4m.math.quaternion();
    private static readonly helpQuat1: m4m.math.quaternion = new m4m.math.quaternion();

    private static readonly helpQuatWx: engine.Quaternion = new engine.Quaternion();
    private static readonly helpQuatWx1: engine.Quaternion = new engine.Quaternion();

    private static readonly helpV3Wx: engine.Vector3 = new engine.Vector3();
    private static readonly helpV3Wx1: engine.Vector3 = new engine.Vector3();

    private static readonly helpUp = new m4m.math.vector3(0, 1, 0);
    private static readonly helpRight = new m4m.math.vector3(1, 0, 0);
    private static readonly helpFoward = new m4m.math.vector3(0, 0, 1);

    private static readonly cacheTrans: any[] = [];
    private static count = 0;

    private _helpDataMap: { [key: string]: any[] } = {};
    // localRotate: m4m.math.quaternion;

    private readonly _helpPos: m4m.math.vector3 = new m4m.math.vector3();
    // localPosition: m4m.math.vector3;

    private readonly _helpScale: m4m.math.vector3 = new m4m.math.vector3();
    // localScale: m4m.math.vector3;

    private readonly _helpEuler: m4m.math.vector3 = new m4m.math.vector3();

    private readonly _helpWRotate: m4m.math.quaternion = new m4m.math.quaternion();
    private readonly _helpWPos: m4m.math.vector3 = new m4m.math.vector3();
    private readonly _helpWScale: m4m.math.vector3 = new m4m.math.vector3();
    private readonly _helpWorldMatrix: m4m.math.matrix = new m4m.math.matrix();

    private readonly _helpLocalMatrix: m4m.math.matrix = new m4m.math.matrix();

    private _aabbMax = new m4m.math.vector3(0.5, 0.5, 0.5);

    private _aabbMin = new m4m.math.vector3(-0.5, -0.5, -0.5);

    private _aabbCenter = new m4m.math.vector3(0, 0, 0);

    public getChildByIdx(childIdx: number): wxTransform {
        let tempTrans = this.rawHandle.children[childIdx] as engine.Transform3D;
        return wxTransform.packTran(tempTrans);
    }

    public addChild(node: ISpTransform): void {
        if (!node || node.engineType != engineParallelType.wxEngine) {
            // tslint:disable-next-line: max-line-length
            console.error(`addChild fail to engineParallelType :  ${engineParallelType[engineParallelType.wxEngine]} node , node == null : ${node == null} `);
            return;
        }
        this.rawHandle.addChild(node.rawHandle);
    }

    /**
     * 删除所有child
     * @param needDispose 是否需要销毁
     */
    public removeAllChild(needDispose?: boolean): void {
        let children = this.rawHandle.children as any[];
        let temparr = wxTransform.cacheTrans;
        for (let i = 0, len = children.length; i < len; i++) {
            let c = children[i];
            temparr.push(c);
        }

        while (temparr && temparr.length > 0) {
            let t = temparr.pop();
            this.rawHandle.removeChild(t);
            if (needDispose) {
                t.destroy();
            }
        }
    }
    public removeChild(node: wxTransform): void {
        this.rawHandle.removeChild(node.rawHandle);
    }

    public find(name: string): wxTransform {
        let tempTran = this.findNodeFirst(this.rawHandle, name) as engine.Transform3D;
        if (!tempTran) { return; }
        return wxTransform.packTran(tempTran);
    }
    public getWorldRotate(): m4m.math.quaternion {
        return this.getData(this.rawHandle.worldQuaternion, "getWorldRotate", "quat");

    }
    public setWorldRotate(rotate: m4m.math.quaternion): void {
        let tempQaut = wxTransform.helpQuat;
        m4m.math.quatClone(rotate, tempQaut);
        tempQaut.x *= -1;
        tempQaut.w *= -1;

        let currQuat = this.rawHandle.quaternion;
        if (!this.rawHandle.parent) {
            gameMathUtil.IquatClone(tempQaut, currQuat);
        } else {
            let tquat = wxTransform.helpQuatWx;
            let tquat1 = wxTransform.helpQuatWx1;
            (this.rawHandle.parent as engine.Transform3D).worldQuaternion.invert(tquat);
            gameMathUtil.IquatClone(tempQaut, tquat1);
            tquat.multiply(tquat1, currQuat);
        }

        this.rawHandle.quaternion = this.rawHandle.quaternion;
    }
    public getWorldPosition(): m4m.math.vector3 {
        return this.getData(this.rawHandle.worldPosition, "getWorldPosition", "v3_pos");
    }
    public setWorldPosition(pos: m4m.math.vector3): void {
        let rawTemp: any = this.rawHandle;
        gameMathUtil.Ivec3Clone(pos, rawTemp.worldPosition);
        rawTemp.worldPosition.x *= -1;
        rawTemp.worldPosition = rawTemp.worldPosition;
    }
    public getWorldScale(): m4m.math.vector3 {
        // gameMathUtil.Ivec3Clone( this.rawHandle.worldScale , this._help_w_scale);
        // return this._help_w_scale;
        return this.getData(this.rawHandle.worldScale, "getWorldScale", "v3");
    }
    public setWorldScale(scale: m4m.math.vector3): void {
        let rawLocalScale = this.rawHandle.scale;
        if (!this.rawHandle.parent) {
            gameMathUtil.Ivec3Clone(scale, this.rawHandle.scale);
        } else {
            let tv3 = wxTransform.helpV3;
            gameMathUtil.Ivec3Clone((this.rawHandle.parent as engine.Transform3D).worldScale, tv3);
            rawLocalScale.x = scale.x / tv3.x;
            rawLocalScale.y = scale.y / tv3.y;
            rawLocalScale.z = scale.z / tv3.z;
        }

        this.rawHandle.scale = rawLocalScale;
    }
    public getWorldMatrix(): m4m.math.matrix {
        matrixCloneFromWX(this.rawHandle.worldMatrix, this._helpWorldMatrix);
        let data = this._helpWorldMatrix.rawData;
        //反 x
        data[12] *= -1;
        //反 旋转
        data[4] *= -1;
        data[8] *= -1;
        data[2] *= -1;
        data[1] *= -1;
        return this._helpWorldMatrix;
    }
    public getLocalMatrix(): m4m.math.matrix {
        matrixCloneFromWX(this.rawHandle.localMatrix, this._helpLocalMatrix);
        let data = this._helpLocalMatrix.rawData;
        //反 x
        data[12] *= -1;
        //反 旋转
        data[4] *= -1;
        data[8] *= -1;
        data[2] *= -1;
        data[1] *= -1;
        return this._helpLocalMatrix;
    }

    public setWorldMatrix(mat: m4m.math.matrix) {
        let rawTran = this.rawHandle;
        let pos = wxTransform.helpV3;
        let scale = wxTransform.helpV3v1;
        let rot = wxTransform.helpQuat;

        let finalMat = mat;
        if (rawTran.parent) {
            let tmtx = wxTransform.helpMtx;
            matrixCloneFromWX((rawTran.parent as engine.Transform3D).worldMatrix, tmtx);
            m4m.math.matrixInverse(tmtx, tmtx);
            let localMtx = wxTransform.helpMtx1;
            m4m.math.matrixMultiply(tmtx, mat, localMtx);
            finalMat = localMtx;
        }

        m4m.math.matrixDecompose(finalMat, pos, rot, scale);
        //左右手翻转
        pos.x *= -1;
        //旋转
        rot.x *= -1;
        rot.w *= -1;

        gameMathUtil.Ivec3Clone(pos, rawTran.position);
        gameMathUtil.Ivec3Clone(scale, rawTran.scale);
        gameMathUtil.IquatClone(rot, rawTran.quaternion);
        rawTran.position = rawTran.position;
        rawTran.scale = rawTran.scale;
        rawTran.quaternion = rawTran.quaternion;
    }

    public getForwardInWorld(out: m4m.math.vector3) {
        // hsUtil.Ivec3Clone(this.rawHandle.forward, out);
        m4m.math.matrixTransformNormal(wxTransform.helpFoward, this.getWorldMatrix(), out);
        m4m.math.vec3Normalize(out, out);
    }
    public getRightInWorld(out: m4m.math.vector3) {
        // hsUtil.Ivec3Clone(this.rawHandle.right, out);
        m4m.math.matrixTransformNormal(wxTransform.helpRight, this.getWorldMatrix(), out);
        m4m.math.vec3Normalize(out, out);

    }
    public getUpInWorld(out: m4m.math.vector3) {
        // hsUtil.Ivec3Clone(this.rawHandle.up, out);
        m4m.math.matrixTransformNormal(wxTransform.helpUp, this.getWorldMatrix(), out);
        m4m.math.vec3Normalize(out, out);
    }
    public lookatPoint(point: m4m.math.vector3): void {
        // this.rawHandle.lookatPoint(point);

        throw new Error("Method not implemented.");
    }

    public getParent() {
        let tempTran = this.rawHandle.parent as engine.Transform3D;
        if (!tempTran) { return; }
        return wxTransform.packTran(tempTran);
    }
    public getAabbMax() {
        return this._aabbMax;
    }
    public getAabbMin() {
        return this._aabbMin;
    }
    public getAabbCenter() {
        return this._aabbCenter;
    }

    public dispose(): void {
        // throw new Error("Method not implemented.");
        let tranID = this.rawHandle.id;
        this.rawHandle.destroy();

        delete wxTransform.IDMap[tranID];
        this.gameObject.dispose();

        this.gameObject = null;
        this.rawHandle = null;
    }
    private getData<T extends keyof { "v3_pos", "v3", "quat" }>(rawData: any, key: string, type: T) {
        let arr = this._helpDataMap[key];
        let isDirty = false;
        //init data;
        if (!arr) {
            arr = this._helpDataMap[key] = [];
            isDirty = true;
        }
        let gdData = arr[0];
        if (!gdData) {
            switch (type) {
                case "v3": gdData = arr[0] = new m4m.math.vector3(); break;
                case "v3_pos": gdData = arr[0] = new m4m.math.vector3(); break;
                case "quat": gdData = arr[0] = new m4m.math.quaternion(); break;
                default: gdData = null;
            }
            isDirty = true;
        }
        let wxData = arr[1];
        if (!wxData) {
            switch (type) {
                case "v3": wxData = arr[1] = new engine.Vector3(); break;
                case "v3_pos": wxData = arr[1] = new engine.Vector3(); break;
                case "quat": wxData = arr[1] = new engine.Quaternion(); break;
                default: wxData = null;
            }
            isDirty = true;
        }

        //set
        isDirty = !wxData.equal(rawData);
        if (isDirty) {
            switch (type) {
                case "v3":
                    gameMathUtil.Ivec3Clone(rawData, gdData);
                    gameMathUtil.Ivec3Clone(rawData, wxData);
                    break;
                case "v3_pos":
                    gameMathUtil.Ivec3Clone(rawData, gdData);
                    gameMathUtil.Ivec3Clone(rawData, wxData);
                    gdData.x *= -1;
                    break;
                case "quat":
                    gameMathUtil.IquatClone(rawData, gdData);
                    gameMathUtil.IquatClone(rawData, wxData);
                    gdData.x *= -1;
                    gdData.w *= -1;
                    break;
                default: gdData.x = 0, gdData.y = 0;
            }
        }

        return gdData;
    }

    /**
     * 查找第一个对象，通过节点树以下
     * @param rootNode 节点对象
     * @param nodeName 
     */
    private findNodeFirst(rootNode: engine.Transform3D, nodeName: string): engine.Transform3D {
        if (!rootNode) { return; }
        let temp = rootNode.findChildByName(nodeName) as engine.Transform3D;
        if (temp) { return temp; }

        let children = rootNode.children;
        if (children != null) {
            let len1 = children.length;
            for (let i = 0; i < len1; i++) {
                let result = this.findNodeFirst(children[i] as engine.Transform3D, nodeName);
                if (result) { return result; }
            }
        }

    }
    private getWorldTranslate() {
        return this.getWorldPosition();
    }

}

/**
     * clone 矩阵数据 通过 微信格式 到 m4m 格式
     * @param src 
     * @param out 
     */
function matrixCloneFromWX(src: engine.Matrix4, out: m4m.math.matrix) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            out.rawData[count] = src.getValue(i, j);
            count++;
        }
    }
}

/**
 * clone 矩阵数据 通过 m4m 到 微信格式 格式
 * @param src 
 * @param out 
 */
function matrixCloneToWX(src: m4m.math.matrix, out: engine.Matrix4) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            out.setValue(src.rawData[count], j, i);
            count++;
        }
    }
}