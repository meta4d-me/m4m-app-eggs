import { loadMgr } from "../Loader/loadMgr";
import { cMap } from "../Data/Map";
import engine from "engine";
import { engineParallelType, ISpAnimPlayerHandle, ISpCamera, ISpPrefab, ISpTransform } from "./engineParallel/spInterface";
import { gdPrefab } from "./engineParallel/m4m/gdPrefab";
import { wxPrefab } from "./engineParallel/wxEngine/wxPrefab";
import { testCreat } from "../Loader/otherPlan/testCreat";
import { miniGame } from "./miniGame";
import { imgNum } from "../UIBase/imgNum";
import { sequenceFrame } from "../UIBase/sequenceFrame";
import { gdCamera } from "./engineParallel/m4m/gdCamera";
import { metaUIManager } from "../UIBase/metaUIManager";
import { imgSpriteArrange } from "../UIBase/imgSpriteArrange";
import { AnimLoadPlayer } from "../animation/animLoadPlayer";
import { uiEventDiscard } from "../UIBase/uiEventDiscard";
import { ZIPTool } from "./ZIPTool";

/** 通用 Tool */
// tslint:disable-next-line: class-name
export class commTool {
    //常量系数
    public static readonly toDeg = 57.29578; // Rad2Deg
    public static readonly toRadian = 0.0174532924;   // Deg2Rad
    public static readonly cachLayerTag = "__cachLayerTag__";
    public static readonly hasCachLayerTag = "__hasCachLayer__";
    //------------ load -----------------
    /** 加载过的prefab 存放Map */
    // static PrefebMap: cMap<m4m.framework.prefab> = new cMap();
    public static PrefebMap: cMap<ISpPrefab> = new cMap();
    //--------------------------------------------------------  文本加载   ----------------------------------------------------------------------------

    public static loadedTextsMap: cMap<string> = new cMap<string>();
    private static readonly helpV2 = new m4m.math.vector2();
    private static readonly helpV2v1 = new m4m.math.vector2();
    private static readonly helpV3 = new m4m.math.vector3();
    private static readonly helpV3v1 = new m4m.math.vector3();
    private static readonly helpQuat = new m4m.math.quaternion();

    private static readonly AttachSubToSceneTag = "_AttachSubToSceneTag_";

    // 类型排查列表
    private static readonly careTypeList = [engineParallelType.wxEngine, engineParallelType.none];
    private static setUIShaderCount = 0;
    //------------------------------------------------------------------------------------------------------------------------------------

    //--------------------------------------------------------  贴图方法   ----------------------------------------------------------------------------
    /** 图面 id 极速器 */
    private static imgIdCounter = 0;

    /** 加载 的贴图缓存容器 */
    private static loadedTexsDic: cMap<m4m.framework.texture> = new cMap();

    /** wx 加载 的贴图缓存容器 */
    private static loadedTexsDicWX: cMap<engine.Texture2D> = new cMap();

    //------------ other -----------------

    /**
     * 改变层级（递归）
     * @param tran 
     * @returns 
     */
    public static changeLayerGUI(tran: ISpTransform, targetLayer: number) {
        let r = tran.gameObject.rawHandle.renderer;
        if (r) {
            r[this.cachLayerTag] = tran.gameObject.layer;
            // tran.gameObject.layer = metaUIManager.ActiveSelf.layerIndexOverUI3d;
            tran.gameObject.layer = targetLayer;
        }

        // let len = tran.children.length;
        let len = tran.childrenCount;

        if (!tran.rawHandle.hasRendererCompChild) { return; }
        for (let i = 0; i < len; i++) {
            // let sub = tran.children[i];
            let sub = tran.getChildByIdx(i);
            this.changeLayerGUI(sub, targetLayer);
        }
    }

    /**
     * 等待 全屏点击了一下
     */
    public static waitFullScreenOnceDown() {
        let ipt = m4m.framework.sceneMgr.app.getInputMgr();
        let cb: Function;
        let obj = {
            onDown: () => {
                ipt.removePointListener(m4m.event.PointEventEnum.PointDown, obj.onDown, obj);
                cb();
            },
        };

        let _p = new Promise<any>((resolve) => {
            cb = resolve;
            ipt.addPointListener(m4m.event.PointEventEnum.PointDown, obj.onDown, obj);
        });
        return _p;
    }

    /**
     * 对组件 进行点击模拟 
     * @param compObj   组件对象（必须实现I2DPointListener接口的组件 ）
     * @param _uiPointX  输入的 坐标点X
     * @param _uiPointY  输入的 坐标点Y
     */
    // tslint:disable-next-line: max-line-length
    public static clickSimulation<T extends m4m.framework.I2DPointListener & m4m.framework.I2DComponent>(compObj: T, uiPointX?: number, uiPointY?: number) {
        //模拟按钮点击
        let _uiPointX = uiPointX;
        let _uiPointY = uiPointY;
        let trans = compObj.transform;
        if (_uiPointX == null || _uiPointY == null) {
            let wpos = trans.getWorldTranslate();
            let w = trans.width;
            let h = trans.height;
            let p = trans.pivot;
            //确保点中自己 的中心位置
            _uiPointX = _uiPointX == null ? wpos.x + (0.5 - p.x) * w : _uiPointX;
            _uiPointY = _uiPointY == null ? wpos.y + (0.5 - p.y) * h : _uiPointY;
        }
        let uipoint = commTool.helpV2;
        m4m.math.vec2Set(uipoint, _uiPointX, _uiPointY);
        let mPos = commTool.helpV2v1;
        let pEv = new m4m.framework.PointEvent();
        pEv.eated = false;
        trans.canvas.CanvasPosToModelPos(uipoint, mPos);
        pEv.x = mPos.x;
        pEv.y = mPos.y;
        pEv.type = m4m.event.PointEventEnum.PointDown;
        compObj.onPointEvent(null, pEv, false);
        pEv.type = m4m.event.PointEventEnum.PointUp;
        compObj.onPointEvent(null, pEv, false);
    }

    /**
     * 通过 UI全局路径 获取 UI对象 
     * @param UICanvas ui的canvas 对象
     * @param uiPath UI全局路径
     */
    public static getUIByPath(UICanvas: m4m.framework.canvas, uiPath: string): m4m.framework.transform2D {
        return this.getTransByPath(UICanvas.getRoot(), uiPath) as m4m.framework.transform2D;
    }

    /**
     * 通过 3D节点全局路径 获取 节点对象 
     * @param nodePath 节点全局路径
     */
    public static get3DNodeByPath(nodePath: string): m4m.framework.transform {
        return this.getTransByPath(m4m.framework.sceneMgr.scene.getRoot(), nodePath) as m4m.framework.transform;
    }

    /**
     * 通过 节点全局路径 获取 节点对象 
     * @param nodeRoot root 节点
     * @param nodePath 全局路径
     */
    private static getTransByPath(nodeRoot: m4m.framework.transform | m4m.framework.transform2D, nodePath: string) {
        let nodes = nodePath.split(";");
        nodes.shift();
        let currNode = nodeRoot;
        for (let i = 0, len = nodes.length; i < len; i++) {
            let str = nodes[i];
            let repeatIdx = 0;
            let uiName = str;
            let idx = str.lastIndexOf(" ");
            if (idx != -1) {
                repeatIdx = Number(str.substr(idx + 1));  //节点在同层级有 重名对象，需要用索引来定位
                if (!isNaN(repeatIdx)) {
                    uiName = str.substr(0, idx);
                } else {
                    repeatIdx = 0;
                }
            }

            currNode = this.getTransByArr(currNode.children, uiName, repeatIdx);
            if (!currNode) { break; }
        }

        return currNode;
    }

    /**
     * 获取 节点 通过 path
     * @param arr 
     * @param uiName 
     * @param repeatIdx 
     */
    private static getTransByArr(arr: (m4m.framework.transform | m4m.framework.transform2D)[], uiName: string, repeatIdx: number) {
        let result: m4m.framework.transform | m4m.framework.transform2D;
        let repeatCount = -1;
        for (let i = 0, len = arr.length; i < len; i++) {
            let ui = arr[i];
            if (ui.name == uiName) {
                result = ui;
                repeatCount++;
            }
            if (repeatCount == repeatIdx) { break; }
        }
        return result;
    }

    /**
     * 获取 UI 的全局路径(字符串)
     * @param ui 
     */
    public static getUIPathStr(ui: m4m.framework.transform2D) {
        return this.getTransPathStr(ui);
    }

    /**
     * 获取 3d节点 的全局路径(字符串)
     * @param ui 
     */
    public static get3DPathStr(node: m4m.framework.transform) {
        return this.getTransPathStr(node);
    }

    /**
     * 获取 trans 的全局路径(字符串)
     * @param TransNode trans节点
     */
    private static getTransPathStr(TransNode: m4m.framework.transform2D | m4m.framework.transform) {
        let path = this.getTransPath(TransNode);
        let pathStr = "";
        path.forEach((v, i) => {
            if (v) {
                pathStr += v[0];
                if (v[1] != null) {
                    pathStr += ` ${v[1]}`;
                }
                if (i < path.length - 1) {
                    pathStr += ";";
                }
            }
        });

        return pathStr;
    }

    /**
     * 获取 节点 的全局路径
     * @param TransNode trans对象节点
     */
    private static getTransPath(TransNode: m4m.framework.transform2D | m4m.framework.transform) {
        let pathArr = [];
        let curr = TransNode;
        while (true) {
            if (!curr) { break; }
            let parent = curr.parent;
            let idx = -1;
            if (parent) {
                let children = parent.children;
                //是否 有同名对象在 parent 中
                if (children.length > 1) {
                    let has = false;
                    let _idx = 0;
                    for (let i = 0, len = children.length; i < len; i++) {
                        let v = children[i];
                        if (v.name != curr.name) { continue; }
                        if (curr == v) { break; }
                        has = true;
                        _idx++;
                    }

                    if (has) {
                        idx = _idx;
                    }
                }
            }

            let node: any[] = [curr.name];
            if (idx != -1) {
                node.push(idx);
            }

            pathArr.unshift(node);
            curr = parent;
        }

        return pathArr;
    }

    /**
     * 将节点 改造成 UI事件屏蔽节点
     * @param trans UI节点对象
     * @param foucsHited 是否强制 点中UI才屏蔽
     * @returns 
     */
    public static makeUIEventDiscard(trans: m4m.framework.transform2D, foucsHited: boolean = false) {
        let uied = trans.getComponent("uiEventDiscard") as uiEventDiscard;
        if (!uied) {
            uied = trans.addComponent("uiEventDiscard") as uiEventDiscard;
        }
        uied.foucsHited = foucsHited;
    }

    /**
     * 屏幕坐标转换到UI 世界坐标
     * @param x screenPos.x
     * @param y screenPos.y
     * @param outUiPos ui世界坐标
     */
    public static screenPosToUIpos(x: number, y: number, outUiPos: m4m.math.vector2) {
        if (isNaN(x) || isNaN(y) || !outUiPos) { return; }
        m4m.math.vec2Set(outUiPos, x, y);
        metaUIManager.ActiveSelf.overlay.calScreenPosToCanvasPos(outUiPos, outUiPos);
    }

    /**
     * UI 世界坐标转换到 屏幕坐标
     * @param x UIPos.x
     * @param y UIPos.y
     * @param outScreenPos 屏幕坐标
     */
    public static UIPosToScreenPos(x: number, y: number, outScreenPos: m4m.math.vector2) {
        if (isNaN(x) || isNaN(y) || !outScreenPos) { return; }
        m4m.math.vec2Set(outScreenPos, x, y);
        metaUIManager.ActiveSelf.overlay.calCanvasPosToScreenPos(outScreenPos, outScreenPos);
    }

    /**
     * 通过屏幕坐标 获取 3D 空间坐标
     * @param x screenPos.x
     * @param y screenPos.y
     * @param out3DPos 3D 空间坐标
     * @param watchCam 观察相机
     * @param zDepth 相对于相机观察平面的距离(相机Z 深度)
     */
    public static calcu3DPosByScreenPos(x: number, y: number, out3DPos: m4m.math.vector3, watchCam: ISpCamera, zDepth: number = 5) {
        if (isNaN(x) || isNaN(y) || !out3DPos || !watchCam) { return; }
        let sPos = this.helpV2;
        m4m.math.vec2Set(sPos, x, y);
        let camTrans = watchCam.gameObject.transform;
        let eType = camTrans.engineType;
        //相机
        //射线
        //射线接触平面
        switch (eType) {
            case engineParallelType.none:
                let app = m4m.framework.sceneMgr.app;
                let rawCam: m4m.framework.camera = watchCam.rawHandle;
                let planePoint = this.helpV3;
                let planeN = this.helpV3v1;
                rawCam.gameObject.transform.getForwardInWorld(planeN);
                m4m.math.vec3ScaleByNum(planeN, zDepth, planePoint);
                m4m.math.vec3Add(planePoint, camTrans.getWorldPosition(), planePoint);
                let ray = rawCam.creatRayByScreen(sPos, app);
                ray.intersectPlane(planePoint, planeN, out3DPos);
                break;
            case engineParallelType.wxEngine:
                //
                break;
            default:
        }
    }

    /**
     * 通过给定UI 坐标计算3D空间 坐标
     * @param cam 相机
     * @param canvas UI的canvas
     * @param _3DPos 3d 空间坐标
     * @param outUIPos ui坐标
     */
    // tslint:disable-next-line: max-line-length
    public static calcuUIPosBy3DPos(cam: m4m.framework.camera, canvas: m4m.framework.canvas, _3DPos: m4m.math.vector3, outUIPos: m4m.math.vector2) {
        let clipP = this.helpV3;
        let _cam = m4m.framework.sceneMgr.scene.mainCamera;
        _cam.calcClipPosFromWorldPos(m4m.framework.sceneMgr.app, _3DPos, clipP);
        //clipP 当做 vec2，不做转换 节省性能。
        canvas.clipPosToCanvasPos(clipP, outUIPos);
    }

    /**
     * 设置UI 渲染组件的 shader
     * @param shaderResName 
     * @param renderer 渲染组件对象（image2D、rawImage、label..）
     * @param needNewMaterial 切换成新的材质,替换老的材质
     */
    public static setUIShader(shaderResName: string, renderer: m4m.framework.IRectRenderer, needNewMaterial: boolean = false) {
        if (!shaderResName || !renderer) { return; }
        let r: any = renderer;
        if (!r.setShaderByName || !r.getMaterial) { return; }
        let mat: m4m.framework.material = r.getMaterial();
        r.setShaderByName(shaderResName);
        if (mat && r._uimat && needNewMaterial) {
            r._uimat = mat = mat.clone();
        }
        // tslint:disable-next-line: newline-per-chained-call
        if (!mat || mat.getShader().getName() == shaderResName) { return; }
        let assetMgr = m4m.framework.sceneMgr.app.getAssetMgr();
        let sh = assetMgr.getShader(shaderResName);
        if (sh) {
            mat.setShader(sh);
        }
    }

    /**
     * 获取2d组件 通过指定类(帮助获取组件的父类)
     * @param classType 类 
     * @param gameObj 游戏对象，组件容器
     */
    public static getComponentByType2d(classType: any, gameObj: m4m.framework.transform2D) {
        return this._getComponentByType(classType, gameObj);
    }

    /**
     * 获取组件 通过指定类(帮助获取组件的父类)
     * @param classType 类 
     * @param gameObj 游戏对象，组件容器
     */
    public static getComponentByType(classType: any, gameObj: m4m.framework.gameObject) {
        return this._getComponentByType(classType, gameObj);
    }

    private static _getComponentByType(classType: any, gameObj: m4m.framework.gameObject | m4m.framework.transform2D) {
        if (!classType || !gameObj) { return; }
        let comps = gameObj.components;
        if (!comps) { return; }
        let len = comps.length;
        for (let i = 0; i < len; i++) {
            let comp = comps[i].comp;
            // if(comp instanceof classType){
            if (this.instanceof_proto(classType, comp)) {
                return comp;
            }
        }
    }

    private static instanceof_proto(classType: any, instance: Object) {
        if (!classType || !classType.name || !instance || !instance.constructor) { return false; }
        let insP = instance.constructor;
        while (insP && insP.name) {
            if (classType.name == insP.name) {
                return true;
            }
            insP = Object.getPrototypeOf(insP);
        }
        return false;
    }

    /**
     * 克隆aabb 数据
     * @param traget 目标transom 节点对象 
     * @param outAABB aabb 对象
     */
    public static cloneAABB(traget: ISpTransform, outAABB: m4m.framework.aabb) {
        if (!traget || !outAABB) { return; }
        m4m.math.vec3Clone(traget.getAabbMax(), outAABB.maximum);
        m4m.math.vec3Clone(traget.getAabbMin(), outAABB.minimum);
        m4m.math.vec3Clone(traget.getAabbCenter(), outAABB.center);
    }

    /**
     * 添加 相机到场景
     * @param cam 
     */
    public static addCameraToscene(cam: ISpCamera) {
        let tran = cam.gameObject.transform;
        switch (tran.engineType) {
            case engineParallelType.none:
                let gdCam = (cam as gdCamera).rawHandle;
                if (gdCam) {
                    let _s = m4m.framework.sceneMgr.scene;
                    if (_s.renderCameras.indexOf(gdCam) != -1) { return; }
                    _s.renderCameras.push(gdCam);
                    _s.renderContext.push(new m4m.framework.renderContext(_s.webgl));
                }
                break;
            default:
        }
    }

    /**
     * 删除 场景中 相机
     * @param cam 
     */
    public static removeCameraFromScene(cam: ISpCamera) {
        let tran = cam.gameObject.transform;
        switch (tran.engineType) {
            case engineParallelType.none:
                let gdCam = (cam as gdCamera).rawHandle;
                if (gdCam) {
                    let _s = m4m.framework.sceneMgr.scene;
                    let idx = _s.renderCameras.indexOf(gdCam);
                    if (idx == -1) { return; }
                    _s.renderCameras.splice(idx, 1);
                    _s.renderContext.splice(idx, 1);
                }
                break;
            default:
        }
    }

    /**
     * 收集指定对象节点层级下的 所有 目标名 的节点
     * @param tran3d 指定对象节点
     * @param targetName 目标名
     * @param outFindList 收集的节点列表
     */
    public static finds(tran3d: ISpTransform, targetName: string, outFindList: ISpTransform[]) {
        if (!tran3d || targetName == null) { return; }
        if (tran3d.name == targetName) {
            outFindList.push(tran3d);
        }

        // let len = tran3d.children.length;
        let len = tran3d.childrenCount;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                this.finds(tran3d.getChildByIdx(i), targetName, outFindList);
            }
        }
    }

    /**
     * 收集指定对象节点层级下的 所有 目标名 的节点
     * @param tran2d 指定对象节点
     * @param targetName 目标名
     * @param outFindList 收集的节点列表
     */
    public static finds_2d(tran2d: m4m.framework.transform2D, targetName: string, outFindList: m4m.framework.transform2D[]) {
        if (!tran2d || targetName == null) { return; }
        if (tran2d.name == targetName) {
            outFindList.push(tran2d);
        }

        // let len = tran3d.children.length;
        let len = tran2d.children.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                this.finds_2d(tran2d.children[i], targetName, outFindList);
            }
        }
    }

    /**
     * 搜索指定对象节点层级下的 目标名 的节点
     * @param tran2d 指定对象节点
     * @param targetName 目标名
     */
    public static find_2d(tran2d: m4m.framework.transform2D, targetName: string): m4m.framework.transform2D {
        if (tran2d.name == targetName) {
            return tran2d;
        }

        if (tran2d.children) {
            for (let val of tran2d.children) {
                let res = this.find_2d(val, targetName);
                if (res != null) {
                    return res;
                }
            }
        }
        return null;
    }

    /**
     * 遍历 transfrom 所有子节点
     * @param t transform对象
     * @param fn 遍历检测方法 (函数 返回值 true ，中断遍历)
     * @returns 
     */
    public static forEachTransformTree(t: ISpTransform, fn: (value: ISpTransform) => any): any {
        if (!t || !fn) { return; }
        let needBreak = fn(t);
        if (needBreak) { return true; }

        if (t.childrenCount > 0) {
            for (let i = 0, len = t.childrenCount; i < len; i++) {
                let _needBreak = this.forEachTransformTree(t.getChildByIdx(i), fn);
                if (_needBreak) { return true; }
            }
        }
    }

    /**
     * 遍历 transfrom2D 所有子节点
     * @param t transfrom2D 对象
     * @param fn 遍历检测方法 (函数 返回值 true ，中断遍历)
     * @returns 
     */
    public static forEachTransform2DTree(t: m4m.framework.transform2D, fn: (value: m4m.framework.transform2D) => any): any {
        if (!t || !fn) { return; }
        let needBreak = fn(t);
        if (needBreak) { return true; }

        if (t.children.length > 0) {
            for (let i = 0, len = t.children.length; i < len; i++) {
                let _needBreak = this.forEachTransform2DTree(t.children[i], fn);
                if (_needBreak) { return true; }
            }
        }
    }

    /**
     * 解析 动画时间轴事件 
     * @param data json 格式 ，{动画名:{时间点:[触发函数名,函数传参1,...]}}
     */
    public static parseAnimTimeEvent(_animPlayH: ISpAnimPlayerHandle, data: string) {
        if (!data) { return; }
        let obj = JSON.parse(data);
        for (let key in obj) {
            let _clip = obj[key];
            for (let time in _clip) {
                let temp = _clip[time] as string[];
                let actFunName = temp[0];
                let valStr = temp[1];
                _animPlayH.setTimeEvent(key, Number(time), actFunName, valStr);
            }
        }
    }

    /**
     * 构造一个 ImgNum 对象
     * @param templete 数值 模板对象
     */
    public static makeImgNum(templete: m4m.framework.image2D, shellLayoutState: number = null, tranLayoutState: number = null): imgNum {
        let result: imgNum;
        let numTran = templete.transform.clone();
        templete.transform.parent.addChild(numTran);
        numTran.name = "imgNum_compTran";
        numTran.removeAllChild();
        numTran.removeAllComponents();
        result = numTran.addComponent("imgNum") as imgNum;
        result.template = templete;
        if (shellLayoutState) {
            result.shellLayoutState = shellLayoutState;
        }
        if (tranLayoutState) {
            result.tranLayoutState = tranLayoutState;
        }
        return result;
    }

    /**
     * 构造一个 ImgNum 对象
     * @param templete 数值 模板对象
     */
    // tslint:disable-next-line: max-line-length
    public static makeImgSpriteArrange(templete: m4m.framework.image2D): imgSpriteArrange {
        let result: imgSpriteArrange;
        let numTran = new m4m.framework.transform2D();
        templete.transform.parent.addChild(numTran);
        numTran.name = "imgNum_compTran";
        //图片容器 布局 默认居中显示
        numTran.layoutState = m4m.framework.layoutOption.V_CENTER | m4m.framework.layoutOption.H_CENTER;
        result = numTran.addComponent("imgSpriteArrange") as imgSpriteArrange;
        result.template = templete;
        return result;
    }

    /**
     * 构造一个 SequenceFrame 序列帧 对象
     * @param sfTran  最后一帧模板对象
     */
    public static makeSequenceFrame(sfTran: m4m.framework.image2D) {
        let result: sequenceFrame;
        result = sfTran.transform.addComponent("sequenceFrame") as sequenceFrame;
        return result;
    }

    /**
     * 获取字典中的K-V 的数量
     * @param dic 字典对象
     */
    public static getDicSubSize(dic: object) {
        let len = 0;
        for (let key in dic) {
            len++;
        }
        return len;
    }

    /**
     * 将相对 “当前游戏对象” 的坐标转化为基于世界坐标系的坐标
     * @param target 当前对象
     * @param point 以当前对象为基坐标的位置点
     * @param resultV3 场景世界坐标
     */
    //Transforms position from local space to world space.
    public static TransformPoint(target: ISpTransform, point: m4m.math.vector3, resultV3: m4m.math.vector3) {
        if (!target || !point) { return; }
        let mtx = target.getWorldMatrix();
        m4m.math.matrixTransformVector3(point, mtx, resultV3);
    }
    /**
     * 异步加载预设体
     * @param dirPath 文件路径
     * @param prefabName 预设体资源名
     * @param priority 优先级 默认0
     */
    public static async loadPrefeb(dirPath: string, prefabName: string, priority: number = 0): Promise<ISpPrefab> {
        if (!dirPath || !prefabName) { return; }
        let url = "";
        let isTestCreatMode = false;
        let testPath = testCreat.pathReplaceMap[dirPath];
        let realPath = dirPath;
        if (testPath) {
            realPath = testPath;
            isTestCreatMode = true;
        }
        let pfb: m4m.framework.prefab;
        if (isTestCreatMode) {
            url = `${realPath}${prefabName}/resources/` + prefabName;
            let testUrl = realPath;
            let isUIPath = url.indexOf("/ui/") == -1;
            if (isUIPath) {
                pfb = await testCreat.createPfb(testUrl, prefabName);
            } else {
                pfb = await testCreat.createPfb2D(testUrl, prefabName);
            }
        } else {
            url = `${realPath}${prefabName}/${prefabName}.assetbundle.json`;
            // let assetUrl = url.replace("Resources/", "");
            let assetUrl = url.replace(m4m.framework.assetMgr.cdnRoot, "");
            if (this.PrefebMap.get(url)) { return this.PrefebMap.get(url); }
            await loadMgr.Instance.syncLoad(url, priority);
            pfb = (m4m.framework.sceneMgr.app.getAssetMgr()
                .getAssetByName(`${prefabName}.prefab.json`, assetUrl) as m4m.framework.prefab);
        }

        if (!pfb) { return; }

        let Ipfb = new gdPrefab(pfb);
        this.PrefebMap.set(url, Ipfb);
        return Ipfb;
    }

    /**
     * 异步加载预设体 （微信引擎加载）
     * @param url 文件url
     */
    public static loadPrefebURLWXEngin(url: string) {
        return new Promise<wxPrefab>((resolveFun, rejectFun) => {
            let wxP: wxPrefab = this.PrefebMap.get(url);
            if (wxP) {
                resolveFun(wxP);
                return;
            }

            //加载逻辑
            engine.loader.load(url).promise
                .then((p) => {
                    //加载完毕
                    wxP = new wxPrefab(p);
                    this.PrefebMap.set(url, wxP);
                    resolveFun(wxP);

                }, rejectFun);
        });
    }

    /**
     * 异步加载预设体, 通过路径 + 资源名 （微信引擎加载）
     * @param dirPath 
     * @param prefabName 
     */
    public static loadPrefebWXEngin(dirPath: string, prefabName: string) {
        return this.loadPrefebURLWXEngin(`${dirPath}${prefabName}.prefab`);
    }

    //获取m4m的cache prefab
    private static getCachePfbm4m(prefabKey: string, isTest = true) {
        let pfabe = testCreat.pfbList.get(prefabKey) as m4m.framework.prefab;
        if (pfabe) {
            return new gdPrefab(pfabe);
        }
    }

    private static getCachePrefabKeyType(prefabKey: string, eType: engineParallelType) {
        switch (eType) {
            case engineParallelType.none: return this.getCachePfbm4m(prefabKey);
            case engineParallelType.wxEngine: return this.PrefebMap.get(prefabKey);
            default: return this.PrefebMap.get(prefabKey);
        }
    }
    /**
     * 获取已经缓存了的 prefab资源
     * @param prefabKey 取值key
     */
    public static getCachePrefabKey(prefabKey: string, eType: engineParallelType = null): ISpPrefab {
        let result: ISpPrefab;
        if (eType == null) {
            //没有指定类型 ，逐类型查找
            let idx = 0;
            let len = this.careTypeList.length;
            while (!result && idx < len) {
                let currEtype = this.careTypeList[idx];
                result = this.getCachePrefabKeyType(prefabKey, currEtype);
                idx++;
            }
        } else {
            result = this.getCachePrefabKeyType(prefabKey, eType);
        }
        return result;
    }

    //获取prefab key通过制定类型
    private static getPrefabKeyType(dirPath: string, prefabName: string, eType: engineParallelType) {
        switch (eType) {
            case engineParallelType.none: return `${dirPath}${prefabName}/`;
            case engineParallelType.wxEngine: return `${dirPath}${prefabName}.prefab`;
            default: return "";
        }
    }

    /**
     * 异步加载预设体, 通过路径 + 资源名 （微信引擎加载）
     * @param dirPath 文件路径
     * @param prefabName prefab名字
     */
    public static getCachePrefab(dirPath: string, prefabName: string, eType: engineParallelType = null): ISpPrefab {
        let result: ISpPrefab;
        if (eType == null) {
            //没有指定类型 ，逐类型查找
            let idx = 0;
            let len = this.careTypeList.length;
            while (!result && idx < len) {
                let currEtype = this.careTypeList[idx];
                let prefabKey = this.getPrefabKeyType(dirPath, prefabName, currEtype);
                result = this.getCachePrefabKeyType(prefabKey, currEtype);
                idx++;
            }
        } else {
            let prefabKey = this.getPrefabKeyType(dirPath, prefabName, eType);
            result = this.getCachePrefabKeyType(prefabKey, eType);
        }

        return result;
    }

    // private static limitColliders = ["spherecollider", "meshcollider", "boxcollider"];
    //清理 多余 collder
    // private static remove3dCollider(pfb: m4m.framework.prefab) {
    //     if (!pfb) return;
    //     let orgTrans = pfb["trans"] as ISpTransform;
    //     if (!orgTrans) return;
    //     if (orgTrans instanceof m4m.framework.transform2D) return;

    //     let colliders: m4m.framework.ICollider[] = [];
    //     let len = commTool.limitColliders.length;
    //     for (let i = 0; i < len; i++) {
    //         let cType = commTool.limitColliders[i];
    //         let cc = orgTrans.gameObject.rawHandle.getComponentsInChildren(cType) as any;
    //         if (cc && cc.length) {
    //             colliders = cc;
    //             break;
    //         }
    //     }

    //     //删除 不需要的 collider
    //     let cLen = colliders.length;
    //     for (let i = 0; i < cLen; i++) {
    //         let c = colliders[i];
    //         if (c && c.gameObject) {
    //             // console.error(`removeComponent c${c.gameObject.transform.name}`);
    //             c.gameObject.removeComponent(c as any);
    //         }
    //     }
    // }

    /**
     * 异步加载预设体 资源URL
     * @param prefabURL 
     * @param priority 
     */
    public static async loadPrefebURL(prefabURL: string, priority: number = 0) {
        if (!prefabURL) { return; }
        // console.error(`开始 loadPrefebURL :${prefabURL} , this.getABPathByURL`);
        let dirPath = this.getABPathByURL(prefabURL);
        if (!dirPath) { return; }
        // console.error(`开始 loadPrefebURL :${prefabURL} , this.getResNameByURL`);
        let prefabName = this.getResNameByURL(prefabURL);
        if (!prefabName) { return; }
        // console.error(`开始 loadPrefebURL :${prefabURL} , this.loadPrefeb`);
        return this.loadPrefeb(dirPath, prefabName, priority);
    }

    /**
     * 获取AB包资源路径 通过URL
     * @param URL 
     */
    public static getABPathByURL(URL: string) {
        if (!URL) { return; }
        let pIdx = URL.lastIndexOf("/");
        if (pIdx == -1) { return; }
        let str = URL.substring(0, pIdx);
        pIdx = str.lastIndexOf("/");
        return str.substring(0, pIdx + 1);
    }

    /**
     * 获取资源名 通过URL
     * @param URL 
     */
    public static getResNameByURL(URL: string) {
        if (!URL) { return; }
        let pIdx = URL.lastIndexOf("/");
        if (pIdx == -1) { return; }
        let str = URL.substring(pIdx + 1);
        let _pIdx = str.indexOf(".");
        return str.substring(0, _pIdx);
    }

    /**
     * 同步加载 文本数据
     * @param url 
     */
    public static async syncloadText(url: string) {
        let _text = this.loadedTextsMap.get(url);
        if (_text) { return _text; }

        let loadP = new Promise<string>((resolve) => {
            m4m.io.loadText(url, (_txt, _err, isfail) => {
                resolve(_txt);
            });
        });

        _text = await loadP;
        this.loadedTextsMap.set(url, _text);
        return _text;
    }
    private static ImgByLoad(url: string, backFun: (tex: m4m.framework.texture, err?) => any) {
        m4m.io.loadImg(url, (_tex, err) => {
            if (err) {
                console.error(err);
                if (backFun) {
                    backFun(null, err);
                }
            } else {
                this.imgIdCounter++;
                //构建 img
                let _texture = new m4m.framework.texture(`_loadTex_${this.imgIdCounter}`);
                let _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
                let t2d = new m4m.render.glTexture2D(m4m.framework.sceneMgr.app.webgl, _textureFormat);
                t2d.uploadImage(_tex, false, true, false, false, false); //非2次幂 图 不能显示设置repeat
                _texture.glTexture = t2d;
                _texture.use();

                //清理 HTMLImageElement 的缓存
                // let guid = (_tex as any).guid;
                // if (guid != null) {
                delete m4m.framework.assetMgr.mapImage[url];
                delete m4m.framework.assetMgr.mapLoading[url];
                // }

                if (backFun) {
                    backFun(_texture);
                }
            }
        });
    }

    /** 微信性能引擎版贴图 */
    private static ImgByLoadWX(url: string, backFun: (tex: engine.Texture2D, err?) => any) {
        m4m.io.loadImg(url, (_tex, err) => {
            if (err) {
                console.error(err);
                if (backFun) {
                    backFun(null, err);
                }
            } else {
                let _texture = new engine.Texture2D({ filterMode: 1, wrapU: 2, wrapV: 2 });
                _texture.initWithImage(_tex, false, false);

                if (backFun) {
                    backFun(_texture);
                }
            }
        });
    }

    /**
     * 加载贴图
     * @param url 资源RUL
     * @param callBack 
     * @param needCache 是否缓存贴图对象（频繁加载的贴图推荐使用） 
     */
    public static loaderTextureFun(url: string, callBack: (_tex: m4m.framework.texture, _err?) => any, needCache = false) {
        // tslint:disable-next-line: no-parameter-reassignment
        // url = encodeURI(url);
        if (commTool.loadedTexsDic.has(url)) {
            if (callBack) {
                let textu = commTool.loadedTexsDic.get(url);
                callBack(textu);
            }
        } else {
            commTool.ImgByLoad(url, (_tex, _err) => {
                if (_err) {
                    if (callBack) {
                        callBack(_tex, _err);
                    }
                    console.error("H5加载  " + url + "  出错！！！！");
                } else {
                    if (_tex) {
                        if (needCache) { commTool.loadedTexsDic.set(url, _tex); }
                        if (callBack) {
                            callBack(_tex, _err);
                        }
                    }
                }
            });
        }
    }

    /** 加载贴图 wx接口 */
    private static loaderTextureFunWX(url: string, callBack: (_tex: engine.Texture2D, _err?) => any, needCache = false) {
        // tslint:disable-next-line: no-parameter-reassignment
        // url = encodeURI(url);
        if (commTool.loadedTexsDicWX.has(url)) {
            if (callBack) {
                let textu = commTool.loadedTexsDicWX.get(url);
                callBack(textu);
            }
        } else {
            commTool.ImgByLoadWX(url, (_tex, _err) => {
                if (_err || !_tex) {
                    console.error("wx加载  " + url + "  出错！！！！");
                    return;
                }
                if (needCache) { commTool.loadedTexsDicWX.set(url, _tex); }
                if (callBack) {
                    callBack(_tex, _err);
                }
            });
        }
    }

    /**
     * 加载指定类型的贴图
     * @param url 地址
     * @param callBack 回调方法
     * @param needCache 是否需要缓存
     * @param _etype 引擎类型
     */
    public static loaderTextureByType(url: string, callBack: (_tex: any, _err?) => any, needCache = false, etype: engineParallelType = null) {
        let _etype = etype == null ? miniGame.engineParallel : etype;
        switch (_etype) {
            case engineParallelType.none: this.loaderTextureFun(url, callBack, needCache); break;
            case engineParallelType.wxEngine: this.loaderTextureFunWX(url, callBack, needCache); break;
            default: let temp;
        }
    }

    /**
     * 加载 的贴图缓存容器 , sync 版
     * @param rul 
     * @param needCache 是否缓存贴图对象（频繁加载的贴图推荐使用）  
     */
    public static syncLoadTexture(rul: string, needCache = false) {
        return new Promise<m4m.framework.texture>((resolve, rej) => {
            this.loaderTextureFun(rul, (_tex, _err) => {
                if (_err) {
                    rej(_err);
                } else {
                    resolve(_tex);
                }
            }, needCache);
        });
    }

    /**
    * 加载gltf 资源
    * @param gltfFolder  gltf 资源目录
    * @param file gltf 资源文件
    * @param IBLSettings IBL 的参数设置
    * @returns 
    */
    // tslint:disable-next-line: max-line-length
    public static async loadGLTF(gltfFolder: string, file: string, IBLSettings: { exposure: number, specularIntensity: number, diffuseIntensity: number } = null) {
        let app = m4m.framework.sceneMgr.app;
        let IBL = IBLSettings;
        let exposure = IBL && IBL.exposure != null ? IBL.exposure : 1;
        let specularIntensity = IBL && IBL.specularIntensity != null ? IBL.specularIntensity : 1;
        let diffuseIntensity = IBL && IBL.diffuseIntensity != null ? IBL.diffuseIntensity : 1;
        const gltf = await loadMgr.Instance.syncLoadGain<m4m.framework.gltf>(`${gltfFolder}${file}`);
        // tslint:disable-next-line: max-line-length
        const node = await gltf.load(app.getAssetMgr(), app.webgl, gltfFolder, null, null, null, exposure, specularIntensity, diffuseIntensity);
        node.localScale.x *= -1;
        return node;
    }

    /**
     * 获取gltf模型对象
     * @param gltf gltf模型资源对象
     * @param gltfFolder gltf 资源文件所在目录
     * @param IBLSettings IBL 的参数设置
     */
    // tslint:disable-next-line: max-line-length
    public static async getGLTFModel(gltf: m4m.framework.gltf, gltfFolder: string, IBLSettings: { exposure: number, specularIntensity: number, diffuseIntensity: number } = null) {
        let app = m4m.framework.sceneMgr.app;
        let IBL = IBLSettings;
        let exposure = IBL && IBL.exposure != null ? IBL.exposure : 4;
        let specularIntensity = IBL && IBL.specularIntensity != null ? IBL.specularIntensity : 1;
        let diffuseIntensity = IBL && IBL.diffuseIntensity != null ? IBL.diffuseIntensity : 1;
        // const gltf = await loadMgr.Instance.syncLoadGain<m4m.framework.gltf>(`${gltfFolder}${file}`);
        // tslint:disable-next-line: max-line-length
        const node = await gltf.load(app.getAssetMgr(), app.webgl, gltfFolder, null, null, null, exposure, specularIntensity, diffuseIntensity);
        node.localScale.x *= -1;
        return node;
    }

    /**
     *  卸载清理 贴图
     * @param url 需卸载原Url
     */
    public static unLoadTexture(url: string) {
        let _tex = this.loadedTexsDic.get(url);
        if (!_tex) { return; }
        _tex.unuse(true);
        this.loadedTexsDic.delete(url);
    }

    /**
     * 加载 cube 纹理
     * @param folder 
     * @param images 
     * @returns 
     */
    public static async loadCubeTexture(folder: string, images = ["negx.hdr", "negy.hdr", "negz.hdr", "posx.hdr", "posy.hdr", "posz.hdr"]) {
        if (this.loadedTexsDic.has(folder)) {
            return this.loadedTexsDic.get(folder);
        }
        // tslint:disable-next-line: max-line-length
        const tex: m4m.framework.texture[] = await Promise.all(images.map((n) => loadMgr.Instance.syncLoadGain<m4m.framework.texture>(`${folder}${n}`)));
        const cubeTex = this.makeCubeTex(tex, folder.split("/")
            .pop());
        if (!cubeTex) { return; }
        this.loadedTexsDic.set(folder, cubeTex);
        return cubeTex;
    }

    /**
     * 加载 cube 纹理 通过zip包
     * @param filePath zip文件完全路径
     * @param images 子图名
     * @returns 
     */
    public static async loadCubeTextureZip(filePath: string, images = ["negx.hdr", "negy.hdr", "negz.hdr", "posx.hdr", "posy.hdr", "posz.hdr"]) {
        if (this.loadedTexsDic.has(filePath)) {
            return this.loadedTexsDic.get(filePath);
        }
        //
        const texs: m4m.framework.texture[] = [];
        let zipP = await ZIPTool.loadZip(filePath);
        let webgl = m4m.framework.sceneMgr.app.webgl;
        let files = zipP.files;
        for (let i = 0, len = images.length; i < len; i++) {
            let imgStr = images[i];
            let f = files[imgStr];
            if (!f) {
                console.error(`zip 包 :${filePath} 中不存在图 ： ${imgStr}，请检查`);
                return;
            }
            let bytes = await f.async("arraybuffer");
            let _texture = new m4m.framework.texture(imgStr);
            _texture.glTexture = new HdrParser(webgl).get2DTexture(bytes);
            _texture.use();
            texs.push(_texture);
        }
        let cubeTex = this.makeCubeTex(texs, filePath.split("/")
            .pop());

        if (!cubeTex) { return; }

        this.loadedTexsDic.set(filePath, cubeTex);
        return cubeTex;
    }

    private static makeCubeTex(subTexs: m4m.framework.texture[], cubeTexName: string = "cubeTex"): m4m.framework.texture {
        if (!subTexs) { return; }
        if (subTexs.length != 6) {
            console.error(`组成 cubeTexture 必须有6张子图`);
            return;
        }
        let cubeTex = new m4m.framework.texture(cubeTexName);
        cubeTex.glTexture = new m4m.render.glTextureCube(m4m.framework.sceneMgr.app.webgl, m4m.render.TextureFormatEnum.RGBA, true, true);
        cubeTex.use();
        (cubeTex.glTexture as m4m.render.glTextureCube).uploadImages(
            subTexs[0],
            subTexs[1],
            subTexs[2],
            subTexs[3],
            subTexs[4],
            subTexs[5],
            WebGLRenderingContext.LINEAR_MIPMAP_LINEAR, WebGLRenderingContext.LINEAR, WebGLRenderingContext.TEXTURE_CUBE_MAP,
        );
        return cubeTex;
    }

    /**
     * 从当前 transform 遍历所有节点
     * @param tran transform对象
     * @param ergodicFun 遍历时回调方法
     */
    public static ergodicTranNode<T extends m4m.framework.transform2D | m4m.framework.transform>(tran: T, ergodicFun: (tran: T) => void) {
        if (!tran || !ergodicFun) { return; }
        let len = tran.children.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let c: any = tran.children[i];
                ergodicFun(c);
                this.ergodicTranNode<T>(c, ergodicFun);
            }
        }
    }

    /**
     * 开启 test Asset animclip 资源模式
     * @param matchStr url 识别匹配的字符串
     */
    public static enableAnimclipAssetVerTest(matchStr: string) {
        AnimLoadPlayer.extendCreatClipOption = {
            matchStr,
            attachSuffix: `.js`,
            creatFun: testCreat.creatAimClip,
        };
    }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //卡片点击 进入 事件上传
    public static viaShare(query, tdTool, joinTool) {
        if (!query) { return -1; }
        // 分享入口埋点
        let { shareType, subID, abTag } = query;

        if (shareType == null && abTag == null) {
            console.warn(`viaShare 分享卡片点击失败 shareType：${shareType}  abTag : ${abTag}`);
            return -1;
        }

        let tdpar = {};
        if (subID == null) {
            subID = 0;
        }
        let key = `shareType_${shareType}`;
        tdpar[key] = "id_" + subID;
        let label = tdTool.viaShare + abTag;
        joinTool.tdcustomEvent(label, label, tdpar);
        console.log(`卡片点击 进入 事件上传 viaShare : ${key}`);
        return shareType;
    }

    //------------ tween -----------------

    /** 缓动方法 IN => Out 
     * p : 过程进度
     * MaxVal : 过程的最大值
     * mathIn : in 过程的 tween方法
     * mathOut : out 过程的 tween方法
    */
    public static tweenInOut(p: number, MaxVal: number, methodIn: m4m.framework.tweenMethod, methodOut: m4m.framework.tweenMethod) {
        let mth;
        let tp;
        if (p <= 0.5) {
            mth = methodIn;
            tp = p * 2;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * MaxVal / 2;
        }
        mth = methodOut;
        tp = p * 2 - 1;
        return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * MaxVal / 2 + MaxVal / 2;
    }

    //------------ color -----------------
    //16进制颜色转10进制
    public static color16To10(str: string, out: m4m.math.color | m4m.math.vector4) {
        if (!out) { return; }
        if (out instanceof m4m.math.color) {
            out.r = parseInt(str.substring(0, 2), 16) / 255;
            out.g = parseInt(str.substring(2, 4), 16) / 255;
            out.b = parseInt(str.substring(4, 6), 16) / 255;
            out.a = 1;
        } else {
            out.x = parseInt(str.substring(0, 2), 16) / 255;
            out.y = parseInt(str.substring(2, 4), 16) / 255;
            out.z = parseInt(str.substring(4, 6), 16) / 255;
            out.w = 1;
        }
    }
}