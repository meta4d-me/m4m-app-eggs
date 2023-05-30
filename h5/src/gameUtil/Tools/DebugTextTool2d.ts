import { DebugLineTool2d } from "./DebugLineTool2d";

/**
 * 调试 文本绘制工具
 */
export class DebugTextTool2d {

    private static textRoot: m4m.framework.transform2D;
    private static textQueue: m4m.framework.label[];
    private static currIndex: number = -1;
    private static template: m4m.framework.label;
    private static inited = false;
    public static init(rootNode: m4m.framework.transform2D) {
        if (!rootNode) { return; }
        this.textQueue = [];
        this.textRoot = new m4m.framework.transform2D();
        this.textRoot.name = "DebugTextTool2d_root";

        rootNode.addChild(this.textRoot);

        //templata
        let ass = m4m.framework.sceneMgr.app.getAssetMgr();
        //初始化模板
        let tempT = new m4m.framework.transform2D();
        tempT.pivot.x = 0.5;
        tempT.pivot.y = 0.5;
        tempT.width = 160;
        tempT.height = 30;
        tempT.name = "Text";
        this.template = tempT.addComponent("label") as m4m.framework.label;
        let labTemp = this.template;
        labTemp["_fontName"] = "defFont.font.json";
        labTemp.fontsize = 24;
        labTemp.text = "";
        labTemp.color = new m4m.math.color(1, 1, 1, 1);
        labTemp.horizontalOverflow = true;
        labTemp.verticalOverflow = true;
        labTemp.verticalType = m4m.framework.VerticalType.Center;
        labTemp.horizontalType = m4m.framework.HorizontalType.Center;

        this.inited = true;

    }

    /**
     * 绘制文本
     * @param centerPos 中心点位置
     * @param text 文本内容
     * @param fontSize 字体大小
     * @param colorId 线段颜色[0:红 , 1:橙  ,2:黄 ,3:绿 ,4:青 ,5:蓝 ,6:紫 ,7:白,8:黑 ,9:灰]
     * @param alpha 透明值 0 - 1 
     */
    public static drawText(centerPos: m4m.math.Ivec2, text: string, fontSize: number = 24, colorId: number = 0, alpha: number = 1) {
        this.currIndex++;
        if (this.currIndex >= this.textQueue.length) {
            let lienTran = this.template.transform.clone();
            lienTran.name = `DebugText_${this.currIndex}`;
            this.textRoot.addChild(lienTran);
            let _lab = lienTran.getComponent("label") as m4m.framework.label;
            this.textQueue.push(_lab);
        }

        let lab = this.textQueue[this.currIndex];

        //文本内容
        if (text != lab.text) {
            lab.text = text;
        }
        //字体大小
        if (fontSize != lab.fontsize) {
            lab.fontsize = fontSize;
        }

        //颜色
        if (!this.colorEqual(lab.color, DebugLineTool2d.colors[colorId])) {
            m4m.math.colorClone(DebugLineTool2d.colors[colorId], lab.color);
        }
        //透明度
        if (lab.color.a != alpha) {
            lab.color.a = alpha;
        }
        //设置位置、旋转
        //pos
        if (!m4m.math.vec2Equal(centerPos, lab.transform.localTranslate)) {
            m4m.math.vec2Clone(centerPos, lab.transform.localTranslate);
        }

        lab.transform.visible = true;
        lab.transform.markDirty();
    }

    private static colorEqual(c: m4m.math.color, c1: m4m.math.color) {
        if (c.r != c1.r) { return false; }
        if (c.g != c1.g) { return false; }
        if (c.b != c1.b) { return false; }
        return true;
    }

    public static update() {
        if (this.currIndex == -1) { return; }
        //隐藏所有的线
        for (let i = 0; i < this.currIndex + 1; i++) {
            this.textQueue[i].transform.visible = false;
        }
        this.currIndex = -1;

        // console.error(` lineQueue len : ${this.lineQueue.length}`);
    }

}