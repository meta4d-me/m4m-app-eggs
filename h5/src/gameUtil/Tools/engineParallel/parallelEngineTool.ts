import { wxEngineGO, gdTransform, wxTransform } from "./spGameObject";
import { spComponentType, ISpTransform, ISpCustomComp, ISpCamera, ISpAnimPlayer, ISpAnimPlayerHandle, ISpCustomCompAdapter, engineParallelType, ISPRenderer, ISpMeshRenderer } from "./spInterface";
import { wxCamera } from "./wxEngine/wxCamera";
import { gdCustomCompAdapter } from "./m4m/gdCustomCompAdapter";
import { gdAnimPlayer } from "./m4m/gdAnimPlayer";
import { wxAnimPlayer } from "./wxEngine/wxAnimPlayer";
import { wxCustomCompAdapter } from "./wxEngine/wxCustomCompAdapter";
import engine from "engine";
import { LateUpdateMgr } from "Tools/LateUpdateMgr";
import { cMap } from "Data/Map";
import { AnimLoadPlayer } from "animation/animLoadPlayer";
import { wxMaterialcacher } from "./wxEngine/wxMaterialcacher";

/**
 * 创建 一个原生transform 对象，通过引擎类型
 * @param eType 引擎类型
 */
export function createRawTransform(eType: engineParallelType) {
    switch (eType) {
        case engineParallelType.none: return new m4m.framework.transform();
        case engineParallelType.wxEngine: return engine.game.createEntity3D().transform;
        default: return;
    }
}

/**
 * 获取 SP transfrom
 * @param rawTran 原始 Trans对象
 * @param forceType 强制指定引擎类型
 */
export function getSpTransform(rawTran: m4m.framework.transform | engine.Transform3D): ISpTransform {
    if (!rawTran) { return; }
    if ((rawTran as any).rawHandle) {
        console.error(` getSpTransform 失败 , 当前对象已经是一个  ISpTransform 了 , 不需要再次 getSpTransform 。`);
        return;
    }
    // let _type = forceType == null ? this.engineParallel : forceType;
    let _type = rawTran instanceof m4m.framework.transform ? engineParallelType.none : engineParallelType.wxEngine;

    if (_type == engineParallelType.none) {
        let gdRawTran: m4m.framework.transform = rawTran as any;
        let cache = gdTransform.IDMap[gdRawTran.insId.getInsID()];
        if (cache) { return cache; }
        return new gdTransform(gdRawTran);
    } else if (_type == engineParallelType.wxEngine) {
        let wxRawTran: engine.Transform3D = rawTran as any;
        let cache = wxTransform.IDMap[wxRawTran.id];
        if (cache) { return cache; }
        return new wxTransform(wxRawTran);
    }
}

/**
 * 添加 自定义组件
 * @param _trans 节点对象
 * @param _customCompClass T 类对象
 */
export function addSpCustomComp<T extends ISpCustomComp>(_trans: ISpTransform, _customCompClass: any): T {
    if (!_trans || !_customCompClass) { return; }
    let _cComp: T;
    let _type = _trans.engineType == null ? this.engineParallel : _trans.engineType;

    let adapter: ISpCustomCompAdapter;
    switch (_type) {
        case engineParallelType.none:
            adapter = (_trans.rawHandle as m4m.framework.transform).gameObject.addComponent("gdCustomCompAdapter") as gdCustomCompAdapter;
            _cComp = new _customCompClass();
            adapter.addCompToGO(_cComp);
            break;
        case engineParallelType.wxEngine:
            adapter = (_trans.rawHandle as engine.Transform3D).entity.addComponent<wxCustomCompAdapter>(wxCustomCompAdapter) as wxCustomCompAdapter;
            _cComp = new _customCompClass();
            adapter.addCompToGO(_cComp);
            break;
        default: adapter = null;
    }

    return _cComp;
}

/**
 * 获取 自定义组件第一个 
 * @param _trans 节点对象
 * @param _customCompClass T 类对象
 */
export function getFirstSpCustomComp<T extends ISpCustomComp>(_trans: ISpTransform, _customCompClass: any): T {
    if (!_trans || !_customCompClass) { return; }
    let adapters: ISpCustomCompAdapter[] = getSpCustomCompAdapters(_trans);
    let result: T;
    for (let i = 0, len = adapters.length; i < len; i++) {
        let adapter = adapters[i];
        let comp = adapter.getComp();
        if (comp && comp.constructor && comp.constructor == _customCompClass) {
            result = comp;
            break; //需要匹配类型
        }
    }

    return result;
}

function getSpCustomCompAdapters(_trans: ISpTransform) {
    let _type = _trans.engineType == null ? this.engineParallel : _trans.engineType;
    let adapters: ISpCustomCompAdapter[];
    switch (_type) {
        case engineParallelType.none:
            adapters = (_trans.rawHandle as m4m.framework.transform).gameObject
                .getComponentsInChildren("gdCustomCompAdapter") as gdCustomCompAdapter[];
            break;
        case engineParallelType.wxEngine:
            adapters = [];
            let go = _trans.gameObject;
            (go as wxEngineGO)["getNodeComponentsInChildren"](go.rawHandle, wxCustomCompAdapter.prototype["__typeName"], adapters as any);
            break;
        default: let temp;
    }
    return adapters;
}

export function getSpAnimPlayerHandle(player: ISpAnimPlayer, prefabName: string = "") {
    let pH: ISpAnimPlayerHandle;
    let trans = player.gameObject.transform;
    switch (trans.engineType) {
        case engineParallelType.none:
            let clip: string[] = [];
            AnimLoadPlayer.getClipNames((player as gdAnimPlayer).rawHandle, clip, prefabName + "_");
            pH = new AnimLoadPlayer(prefabName, clip, (player as gdAnimPlayer).rawHandle, spAPP.rolePath);
            break;
        case engineParallelType.wxEngine:
            pH = player as wxAnimPlayer;
            break;
        default: let temp;
    }

    return pH;
}

/**
 * 多引擎并行接入处理工具类
 */
export function wxEngineEnvSet() {
    let hasWxEngine = window["engine"] != null;
    if (!hasWxEngine) { return; }
    // wx mat
    // tslint:disable-next-line: max-line-length
    // let shArr = [ResurlManager.RimLitSurfaceCausticsshader ,ResurlManager.RimLitUnderwaterCausticsshader , ResurlManager.CloakingDeviceshader, ResurlManager.PreZCloakingDeviceshader, ResurlManager.SphereMapAdditiveshader, ResurlManager.transparentshader, ResurlManager.trailerShader , ResurlManager.outLineShader , ResurlManager.RimLitshader , ResurlManager.RimLitAlphashader];
    let shArr = [];
    let shPath = "";
    let suttixList = ["Background", "CloakingDevice", "GodRays", "RimLitUnderwaterCaustics", "SkyPlaneBackground",
        "SphereMapAdditive", "Water", "RimLit_Alpha"];
    wxMaterialcacher.init(shArr, shPath, suttixList);
    spAPP.engineParallel = 0;
    spAPP.syncParallelEngineCamera = null;
    // AnimLoadPlayer.extendCreatClipOption = null;

    // this.engineParallel = engineParallelType.wxEngine;
    if (!spAPP.syncParallelEngineCamera) {
        let scene = m4m.framework.sceneMgr.scene;
        // let t = new wxTransform();
        // t.gameObject.name = "syncParallelEngineCamera";
        // this.syncParallelEngineCamera =  t.gameObject.addComponent(spComponentType.camera) as wxCamera;

        let trans = engine.game.sceneRoot.transform.children[0].findChildByName("cam");
        let wxGo = new wxEngineGO(trans.entity);
        let cam = spAPP.syncParallelEngineCamera = wxGo.getFirstComponent(spComponentType.camera) as wxCamera;
        cam.rawHandle.clearColor = new engine.Color(0, 98, 144, 255);
        cam.far = scene.mainCamera.far;
        cam.near = scene.mainCamera.near;
    }

    //test 切换到 微信显示
    m4m.framework.sceneMgr.scene.fog = null;
    //m4m.framework.sceneMgr.scene["rootNode"].children[3].gameObject.visible = false;    //m4m 场景特效层
    // m4m.framework.sceneMgr.scene["rootNode"].children[4].gameObject.visible = false;    //m4m 场景背景层

    //wx 动画检测接口
    LateUpdateMgr.Add(wxAnimPlayer.update, wxAnimPlayer);

    //test setting ----------
    // player["_isGodMode"] = true;
    // setTimeout(() => {
    //     var a = m4m["__consTool"].datGUITool.runGameGUI();
    //     m4m["dat"] = a;
    //     a.switchDebugLineShow()
    //     m4m["__consTool"].stageMgr.camCtr.distance = 45;   //相机距离
    //     sceneSpawnerMgr["_disableSpawn"] = true;    //关闭刷怪
    // }, 5000);
    // -------------------------
}

// tslint:disable-next-line: class-name
export class spAPP {

    /** 获取webglcontext */
    public static getWebglCtx() {
        switch (this.engineParallel) {
            case engineParallelType.none: return m4m.framework.sceneMgr.app.webgl;
            case engineParallelType.wxEngine: return null;
            default: return;
        }
    }

    /** 获取主相机 */
    public static getMainCamera(): ISpCamera {
        switch (this.engineParallel) {
            case engineParallelType.none:
                let t = getSpTransform(m4m.framework.sceneMgr.scene.mainCamera.gameObject.transform);
                return t.gameObject.getFirstComponent(spComponentType.camera) as ISpCamera;
            case engineParallelType.wxEngine:
                return spAPP.syncParallelEngineCamera;
            default: return;
        }
    }

    /**
     * 是否已经有全局材质
     * @param matKey 材质标识Key
     */
    public static hasGlobalMaterial(matKey: string): boolean {
        let result = false;
        switch (this.engineParallel) {
            case engineParallelType.none: return this.m4mGlobalMats.has(matKey);
            case engineParallelType.wxEngine: return this.wxGlobalMats.has(matKey);
            default: return;
        }
    }

    /**
     * 设置全局材质，通过制定的现有材质
     * @param matKey 材质标识Key
     * @param _renderer 渲染对象(meshRenderer)
     * @param matIdx 渲染对象中的材质队列中的索引（默认0）
     * @returns 是否成功
     */
    public static setGlobalMaterial(matKey: string , _renderer : ISpMeshRenderer , matIdx : number = 0) : boolean{
        if (!_renderer || _renderer.getMaterialsCount() < 1 || matIdx >= _renderer.getMaterialsCount()) { return false; }
        let _etype = _renderer.gameObject.transform.engineType;
        switch (_etype) {
            case engineParallelType.none:
                let _r = _renderer.rawHandle as m4m.framework.meshRenderer;
                let mat = _r.materials[matIdx];
                this.m4mGlobalMats.set(matKey, mat.clone());
                break;
            case engineParallelType.wxEngine:
                let _r1 = _renderer.rawHandle as engine.MeshRenderer;
                let mat1 = _r1.getSharedMaterialAtIndex(matIdx);
                this.wxGlobalMats.set(matKey, mat1.clone());
                break;
            default: return false;
        }
        return true;
    }

    /**
     * 获取 全局材质 
     * @param matKey 材质指定key
     * @param forceCreate 为空 强制创建一个
     * @param etype 引擎类型 ， 默认指定 全局引擎状态
     */
    public static getGlobalMaterial(matKey: string, forceCreate: boolean = false, etype?: engineParallelType): any {
        let _etype = etype != null ? etype : this.engineParallel;
        switch (_etype) {
            case engineParallelType.none:
                if (forceCreate && !this.m4mGlobalMats.has(matKey)) {
                    this.m4mGlobalMats.set(matKey, new m4m.framework.material(matKey));
                }
                return this.m4mGlobalMats.get(matKey);
            case engineParallelType.wxEngine:
                if (forceCreate && !this.wxGlobalMats.has(matKey)) {
                    let mat = new engine.Material();
                    this.wxGlobalMats.set(matKey, mat);
                }
                return this.wxGlobalMats.get(matKey);
            default: return;
        }
    }

    /**
     * 设置无效
     * @param enable 
     */
    public static setEnableFog(enable: boolean) {
        let fogTag = "__fogTag__";
        let etype = this.engineParallel;
        if (etype == engineParallelType.wxEngine && engine.game.activeScene.settings[fogTag] == null) {
            engine.game.activeScene.settings[fogTag] = engine.game.activeScene.settings.fogRange;
        }

        if (enable) {
            switch (etype) {
                case engineParallelType.wxEngine:
                    engine.game.activeScene.settings.fogRange = engine.game.activeScene.settings[fogTag];
                    break;
                case engineParallelType.none:
                    //雾效
                    let scene = m4m.framework.sceneMgr.app.getScene();
                    scene.fog = new m4m.framework.Fog();
                    scene.fog._Start = 1;
                    scene.fog._End = 150;
                    scene.fog._Color = new m4m.math.vector4(5 / 255, 166 / 255, 182 / 255, 1);
                    break;
                default: let temp;
            }
        } else {
            switch (etype) {
                case engineParallelType.wxEngine:
                    engine.game.activeScene.settings.fogRange = 99999;//微信处理,拉远距离 雾就淡了
                    break;
                case engineParallelType.none:
                    m4m.framework.sceneMgr.app.getScene().fog = null;
                    break;
                default: let temp;
            }
        }
    }
    /** 性能引擎 类型 */
    public static engineParallel: engineParallelType = engineParallelType.none;
    /** 性能引擎同步相机 */
    public static syncParallelEngineCamera: ISpCamera;
    /** 角色资源路径 */
    public static rolePath: string;
    private static readonly m4mGlobalMats: cMap<m4m.framework.material> = new cMap();
    private static readonly wxGlobalMats: cMap<any> = new cMap();
}