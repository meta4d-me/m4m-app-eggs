import { commTool } from "./commTool";

export class IconUtil {
    public static uiSahderCacheTag = `__uiSahderCacheTag__`;
    /*原UIshader
     **/
    public static defuiShaderName: string = "shaders/defui";
    /*原UIshader(mask)
     **/
    public static defMaSkUIShaderName: string = "shaders/defmaskui";
    /*图片灰白shader
    **/
    public static greyUIShaderName: string = "grey_ui.shader.json";
    /** 图片灰白  裁剪版本 */
    public static greyMaskUIShaderName: string = "grey_mask_ui.shader.json";

    /** 文本彩色流光 shader */
    public static labelMulColorShader: string = "mul_color_flow_font.shader.json";
    /*
    原字体shader
    **/
    public static defuiFontShaderName: string = "shaders/defuifont";

    private static cacheUIMat: { [id: number]: m4m.framework.material } = {};
    private static cacheUICSahderName: { [id: number]: string } = {};

    /** 清理 */
    public static clear() {
        this.cacheUIMat = {};
    }

    /**
     * 改变 ui节点树下所有 img的shader
     * @param _uiTreeRoot ui节点树 根节点 
     * @param uiShaderName shader  名
     * @param needCache 是否缓存老的 材质
     */
    public static changeImgShaderByTree(_uiTreeRoot: m4m.framework.transform2D, uiShaderName: string, needCache: boolean = false) {
        this.EachTransformImgTree(_uiTreeRoot, (r) => {
            let t = r.transform;
            if (needCache) {
                let id = t.insId.getInsID();
                this.cacheUICSahderName[id] = r["_CustomShaderName"];
                let mat = r.getMaterial();
                if (mat) {
                    this.cacheUIMat[id] = mat;
                }
                // let n = mat.getShader().getName();
                // if (n.indexOf("grey") != -1) {
                //     debugger;
                // }
            }
            commTool.setUIShader(uiShaderName, r, true);
        });
    }

    /**
     * 恢复 ui节点树下所有 之前有缓存的老 材质
     * @param _uiTreeRoot ui节点树 根节点
     */
    public static recoverImgShaderByTree(_uiTreeRoot: m4m.framework.transform2D) {
        this.EachTransformImgTree(_uiTreeRoot, (r) => {
            let t = r.transform;
            let id = t.insId.getInsID();
            let mat = this.cacheUIMat[id];
            if (mat) {
                r["_uimat"] = mat;
                delete this.cacheUIMat[id];
            }
            r["_CustomShaderName"] = this.cacheUICSahderName[id];
            delete this.cacheUICSahderName[id];
        });
    }

    private static EachTransformImgTree(_uiTreeRoot: m4m.framework.transform2D, actFun: (r: m4m.framework.IRectRenderer) => any) {
        commTool.forEachTransform2DTree(_uiTreeRoot, (t) => {
            // let a: m4m.framework.image2D;
            let r = t.renderer;
            if (r && !(r instanceof (m4m.framework.label))) {
                actFun(r);
            }
        });
    }

    //设置图片灰白
    public static setIconGrayedShader(r: m4m.framework.IRectRenderer) {
        commTool.setUIShader(this.greyUIShaderName, r, false);
    }

    //还原图片原色
    public static setIconOriginShader(r: m4m.framework.IRectRenderer) {
        commTool.setUIShader(this.defuiShaderName, r, false);
    }

    //设置字体显示彩色流光
    public static setColorWordsLabelShader(r: m4m.framework.IRectRenderer) {
        commTool.setUIShader(this.labelMulColorShader, r, true);
    }

    //还原普通字体显示
    public static setCommonLabelShader(r: m4m.framework.IRectRenderer) {
        commTool.setUIShader(this.defuiFontShaderName, r, false);
    }
}