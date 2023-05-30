import { metaUIManager } from "./metaUIManager";

// tslint:disable-next-line: class-name
export class uiMgr extends metaUIManager {
    /** 给 子域分享画布 使用 */
    public static shareCanvasImg: m4m.framework.rawImage2D;
    /** 全屏尺寸 img容器 */
    public static scFullImg: m4m.framework.rawImage2D;
    /** 头像尺寸 img容器  */
    public static scIconImg: m4m.framework.rawImage2D;

    /** 上层相机的 overLay , UI 上模型模式使用*/
    public static topOverlay: m4m.framework.overlay2D;

    protected static uiRoot: m4m.framework.transform2D;

    public static init(uiWidth: number, uiHeight: number, screenMatchRate: number, uiPrefabPath: string, atlasPath: string) {
        if (this.isInited) { return; }
        metaUIManager._ActiveSelf = this;
        super.init(uiWidth, uiHeight, screenMatchRate, uiPrefabPath, atlasPath);
    }
}