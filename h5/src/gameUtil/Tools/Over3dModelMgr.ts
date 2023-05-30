import { metaUIManager } from "../UIBase/metaUIManager";
import { ISpTransform } from "./engineParallel/spInterface";

/** UI之上 3D 渲染 管理类 */
export class Over3dModelMgr {
    private static readonly helpV2 = new m4m.math.vector2();
    private static readonly cachLayerTag = "__cachLayerTag__";
    private static readonly hasCachLayerTag = "__hasCachLayer__";
    private static _canvas: m4m.framework.canvas;
    private static asp: number;
    private static camSize: number;
    private static inited = false;

    private static tryInit() {
        if (this.inited) { return; }
        this.inited = true;
        this._canvas = metaUIManager.ActiveSelf.overlay.canvas;
        this.asp = this._canvas.pixelWidth / this._canvas.pixelHeight;
        this.camSize = metaUIManager.ActiveSelf.modelCam.size;
    }

    /**
     * 获取3d坐标通过UI坐标
     * @param UIPos UI世界坐标
     * @param outPos3d  返回的 3d空间世界坐标
     */
    public static get3dPos(UIPos: m4m.math.vector2, outPos3d: m4m.math.vector3) {
        this.tryInit();
        let mpos = this.helpV2;
        this._canvas.CanvasPosToModelPos(UIPos, mpos);
        m4m.math.vec2ScaleByNum(mpos, this.camSize * 0.5, mpos);
        m4m.math.vec3Set(outPos3d, mpos.x * this.asp, mpos.y, 0);
        outPos3d.z += 10;
    }

    /**
     * 将模型 渲染到UI上
     * @param tran 3d 模型对象
     */
    public static setModelToUI(tran: ISpTransform) {
        if (!tran) {
            console.error(`on addModelToUI , 有 参数 为 null`);
            return;
        }
        if (tran[this.hasCachLayerTag]) { return; }
        let _p = tran.getParent();
        if (!_p) {
            console.error(`on addModelToUI , 对象 不在场景中`);
            return;
        }

        tran[this.hasCachLayerTag] = true;
        this.changeLayerGUI(tran);
    }

    /**
     * 将模型 从UI渲染到上恢复
     * @param tran 3d 模型对象
     */
    public static recoveryModel(tran: ISpTransform) {
        //层级修改回来
        delete tran[this.hasCachLayerTag];
        this.resetLayerGUI(tran);
    }

    //改变层级
    private static changeLayerGUI(tran: ISpTransform) {
        let r = tran.gameObject.rawHandle.renderer;
        if (r) {
            r[this.cachLayerTag] = tran.gameObject.layer;
            tran.gameObject.layer = metaUIManager.ActiveSelf.layerIndexOverUI3d;
        }

        // let len = tran.children.length;
        let len = tran.childrenCount;

        if (!tran.rawHandle.hasRendererCompChild) { return; }
        for (let i = 0; i < len; i++) {
            // let sub = tran.children[i];
            let sub = tran.getChildByIdx(i);
            this.changeLayerGUI(sub);
        }
    }

    //恢复层级
    private static resetLayerGUI(tran: ISpTransform) {
        let r = tran.gameObject.rawHandle.renderer;
        if (r && r[this.cachLayerTag] != null) {
            tran.gameObject.layer = r[this.cachLayerTag];
            delete r[this.cachLayerTag];
        }

        // let len = tran.children.length;
        let len = tran.childrenCount;

        if (!tran.rawHandle.hasRendererCompChild) { return; }
        for (let i = 0; i < len; i++) {
            let sub = tran.getChildByIdx(i);
            this.resetLayerGUI(sub);
        }
    }
}