import { ScreenshotMgr } from "Tools/ScreenshotMgr";
import { SDKWebsokectTool } from "../Net/SDKWebsokectTool";
import { stageMgr } from "../stageMgr";
import { ViewModeChangeMgr, ViewModeType, ViewOpt } from "./ViewModeChangeMgr";

export class PhotoSceneManager {
    public static get Instance(): PhotoSceneManager {
        if (this._instance == null) {
            this._instance = new PhotoSceneManager();
        }
        return this._instance;
    }
    private static _instance: PhotoSceneManager;

    private static sShotCuttingX: number = 0;
    private static sShotCuttingY: number = 0;
    private static sShotCuttingW: number = 0;
    private static sShotCuttingH: number = 0;
    private static b64Str: any;

    //////////////////////////////设置拍照场景//////////////////////////

    // tslint:disable-next-line: member-ordering
    public static PartBOOL = true;
    /**
     *设置相机模式
     * @static
     * @memberof ShowroomUIManager
     */
    public static PartChange() {
        this.Normal();
        let camDist = 10;
        let camYOffset = -0.035;
        let fOpt: ViewOpt = { camDist, camYOffset };
        setTimeout(() => {
            ViewModeChangeMgr.change(ViewModeType.PartChange, fOpt);
        }, 50);
    }
    /**
     *
     *截图
     * @static
     * @static
     * @memberof PhotoSceneManager
     */
    public static ChangeScen() {
        if (!this.PartBOOL) {
            return;
        }
        setTimeout(() => {
            this.PartChange();
            this.Trans3DVisible(true);
            this.sceneVisible(false);
            setTimeout(() => {
                this.screenshot();
            }, 50);
        }, 50);
    }

    /**
     *转为普通模式
     * @static
     * @memberof ShowroomUIManager
     */
    public static Normal() {
        ViewModeChangeMgr.change(ViewModeType.Normal);
    }

    /**
     *显示隐藏天空盒
     *
     * @static
     * @param {boolean} v
     * @memberof ShowroomUIManager
     */
    public static ShowSkyBox(v: boolean) {
        // PBREnvMgr.enableSkyBox = v;
    }

    /**
     *显示隐藏场景
     * @static
     * @param {boolean} val
     * @memberof ShowroomUIManager
     */
    public static sceneVisible(val: boolean) {
        // stageMgr.sceneRoot.gameObject.visible = val;
        for (const iterator of stageMgr.stageRoot.children) {
            if (iterator.name != "role" && iterator.name != "Primitive") {
                iterator.gameObject.visible = val;
            } else {
                iterator.gameObject.visible = true;
                if (iterator.name == "role") {
                    for (const res of iterator.children[0].children) {
                        if (res.name == "shadow_plane") {
                            res.gameObject.visible = val;
                        }
                    }
                }
            }
        }
    }
    /**
     * 是否显示3D对象
     * @param v 是否显示3D对象
     */
    public static Trans3DVisible(v: boolean) {
        this.Trans3D.gameObject.visible = v;
    }
    /**
     *截图
     * @static
     * @memberof ShowroomUIManager
     */
    public static screenshot() {
        ScreenshotMgr.Screenshot();
        let needCut = this.sShotCuttingW != 0 && this.sShotCuttingH != 0;
        if (needCut) {
            ScreenshotMgr.Cutting(this.sShotCuttingX, this.sShotCuttingY, this.sShotCuttingW, this.sShotCuttingH);
        }
        this.b64Str = ScreenshotMgr.SaveToBase64();
        this.downloadIamge();
        setTimeout(() => {
            // this.ShowSkyBox(true);
            this.sceneVisible(true);
            this.Trans3DVisible(false);
            this.Normal();
        }, 1000);
    }
    /**
     * 下载截图
     * @static
     * @memberof ShowroomUIManager
     */
    public static downloadIamge() {
        // 将图片的src属性作为URL地址
        if (this.b64Str) {
            let url = this.b64Str;

            //create html element 
            let a = document.createElement("a");
            let event = new MouseEvent("click");
            a.download = "下载图片名称";
            a.href = url;
            //派发点击下载事件
            // let buffer: ArrayBuffer = url.buffer;
            SDKWebsokectTool.Instance.IPFSManager_IPFSImageJsonData(url);
            // a.dispatchEvent(event);
            this.b64Str = null;
        }
    }

    /**
     * 初始化3D对象
     * @returns 
     */
    // tslint:disable-next-line: member-ordering
    public static Trans3D: m4m.framework.transform;
    public static createPrimitive() {
        if (!this.Trans3D) {
            let Quad = 5;
            let trans = m4m.framework.TransformUtil.CreatePrimitive(Quad, stageMgr.scene.app);
            let renderer: m4m.framework.meshRenderer = trans.gameObject.getComponent("meshRenderer") as m4m.framework.meshRenderer;
            let materials: m4m.framework.material = renderer.materials[0];
            let asset = stageMgr.scene.app.getAssetMgr();
            materials.setShader(asset.getShader("diffuse.shader.json"));
            materials.setFloat("_AlphaCut", 1);
            materials.setVector4("_MainColor", new m4m.math.vector4(0.25, 0.55, 0.7, 1));
            trans.localScale = new m4m.math.vector3(14, 7, 1);
            trans.gameObject.visible = false;
            trans.name = "Primitive";
            this.Trans3D = trans;
        }
        return this.Trans3D;
    }
}