
/** 调试 线条绘制工具 */
export class DebugLineTool2d {
    public static init(rootNode: m4m.framework.transform2D) {
        if (!rootNode) { return; }
        this.lineQueue = [];
        this.lineRoot = new m4m.framework.transform2D();
        this.lineRoot.name = "DebugLineTool2d_root";

        rootNode.addChild(this.lineRoot);

        let col = m4m.math.color;
        //color
        this.colors = [
            new col(1, 0, 0, 1),
            new col(1, 0.498, 0.152, 1),
            new col(1, 0.941, 0, 1),
            new col(0, 1, 0, 1),
            new col(0, 0.9, 0.878, 1),
            new col(0.419, 0.454, 0.847, 1),
            new col(0.972, 0, 0.996, 1),
            new col(1, 1, 1, 1),
            new col(0, 0, 0, 1),
            new col(0.6, 0.6, 0.6, 1),
        ];

        //templata
        let ass = m4m.framework.sceneMgr.app.getAssetMgr();
        //初始化模板
        let tempT = new m4m.framework.transform2D();
        tempT.pivot.y = 0.5;
        tempT.height = 3;
        tempT.name = "line";
        this.template = tempT.addComponent("rawImage2D") as m4m.framework.rawImage2D;
        this.template.image = ass.getDefaultTexture(m4m.framework.defTexture.white);
        this.template.color = this.colors[0];
        this.inited = true;
    }

    /**
     * 绘制线段
     * @param start 起始点  
     * @param end 结束点
     * @param thickness 线段宽度
     * @param colorId 线段颜色[0:红 , 1:橙  ,2:黄 ,3:绿 ,4:青 ,5:蓝 ,6:紫 ,7:白,8:黑 ,9:灰]
     * @param alpha 透明值 0 - 1 
     */
    public static drawLine(start: m4m.math.Ivec2, end: m4m.math.Ivec2, thickness: number = 3, colorId: number = 0, alpha: number = 1) {
        if (!this.inited || !start || !end) { return; }
        //尝试从队列获取一个线段
        //没有 =》 创建一个
        this.currIndex++;
        if (this.currIndex >= this.lineQueue.length) {
            let lienTran = this.template.transform.clone();
            lienTran.name = `DebugLine_${this.currIndex}`;
            this.lineRoot.addChild(lienTran);
            let _line = lienTran.getComponent("rawImage2D") as m4m.framework.rawImage2D;
            this.lineQueue.push(_line);
        }

        let line = this.lineQueue[this.currIndex];
        //颜色
        m4m.math.colorClone(this.colors[colorId], line.color);
        line.color.a = alpha;
        //设置位置、旋转
        //pos
        let dir = m4m.poolv2();
        // m4m.math.vec2Clone(start, line.transform.localTranslate);
        line.transform.localTranslate.x = start.x;
        line.transform.localTranslate.y = start.y;
        // m4m.math.vec2Subtract(end, start, dir);
        dir.x = end.x - start.x;
        dir.y = end.y - start.y;

        //长度
        line.transform.width = m4m.math.vec2Length(dir);
        //厚度
        line.transform.height = thickness;
        //旋转
        m4m.math.vec2Normalize(dir, dir);
        let dot = m4m.math.vec2Dot(this.right, dir);
        let angle = Math.acos(Math.abs(dot));
        if (dir.x < 0) {
            if (dir.y < 0) {
                angle = angle + this.toRad * 180;
            } else {
                angle = this.toRad * 180 - angle;
            }
        } else {
            if (dir.y < 0) {
                angle = this.toRad * 360 - angle;
            }
        }
        line.transform.localRotate = angle;
        line.transform.visible = true;
        line.transform.markDirty();
        m4m.poolv2_del(dir);
    }

    /**
     * 绘制几何图形 通过 所有点
     * @param points 路径点
     * @param thickness 线段宽度
     * @param colorId 线段颜色[0:红 , 1:橙  ,2:黄 ,3:绿 ,4:青 ,5:蓝 ,6:紫 ,7:白,8:黑 ,9:灰]
     * @param isSeal 是否封闭
     * @param alpha 透明值 0 - 1 
     */
    public static drawPoints(points: m4m.math.Ivec2[], thickness: number = 3, colorId: number = 0, alpha: number = 1, needClose = true) {
        for (let i = 1; i < points.length; i++) {
            this.drawLine(points[i - 1], points[i], thickness, colorId, alpha);
        }
        if (needClose && points.length > 2) {
            this.drawLine(points[points.length - 1], points[0], thickness, colorId, alpha);
        }
    }

    /**
     * 绘制圆形
     * @param pos 圆中心点
     * @param radius 圆半径
     * @param thickness 线段宽度
     * @param colorId 线段颜色[0:红 , 1:橙  ,2:黄 ,3:绿 ,4:青 ,5:蓝 ,6:紫 ,7:白,8:黑 ,9:灰]
     * @param alpha 透明值 0 - 1 
     * @param sidesNum 边的数量
     */
    public static drawCircle(pos: m4m.math.Ivec2, radius: number, thickness: number = 3, colorId: number = 0, alpha: number = 1, sidesNum = 16) {
        let _sidesNum = sidesNum < 3 ? 3 : sidesNum;
        let len = _sidesNum;
        let deltaDeg = Math.PI * 1 * 2 / _sidesNum;
        let pA = m4m.poolv2();
        let pB = m4m.poolv2();
        for (let i = 1; i < len; i++) {
            let _deg = deltaDeg * (i - 1);
            let _deg1 = deltaDeg * i;
            this.setPointCircle(pos, radius, _deg, pA);
            this.setPointCircle(pos, radius, _deg1, pB);
            this.drawLine(pA, pB, thickness, colorId, alpha);
        }

        //最后一线
        let deg = deltaDeg * (len - 1);
        let deg1 = 0;
        this.setPointCircle(pos, radius, deg, pA);
        this.setPointCircle(pos, radius, deg1, pB);
        this.drawLine(pA, pB, thickness, colorId, alpha);

        m4m.poolv2_del(pA);
        m4m.poolv2_del(pB);
    }

    private static setPointCircle(pos: m4m.math.Ivec2, radius: number, Deg: number, p: m4m.math.vector2) {
        if (!p) { return; }
        p.x = Math.sin(Deg);
        p.y = Math.cos(Deg);
        m4m.math.vec2ScaleByNum(p, radius, p);
        p.x += pos.x;
        p.y += pos.y;
    }

    /**
     * 绘制矩形
     * @param x 位置x
     * @param y 位置x
     * @param w 宽度
     * @param h 高度
     * @param thickness  线段宽度
     * @param colorId 线段颜色[0:红 , 1:橙  ,2:黄 ,3:绿 ,4:青 ,5:蓝 ,6:紫 ,7:白,8:黑 ,9:灰]
     * @param alpha 透明值 0 - 1 
     */
    public static drawRect(x: number, y: number, w: number, h: number, thickness: number = 3, colorId: number = 0, alpha: number = 1) {
        let p = m4m.poolv2(); let p1 = m4m.poolv2(); let p2 = m4m.poolv2(); let p3 = m4m.poolv2();
        m4m.math.vec2Set(p, x, y);
        m4m.math.vec2Set(p1, x + w, y);
        m4m.math.vec2Set(p2, x + w, y + h);
        m4m.math.vec2Set(p3, x, y + h);

        //
        this.drawLine(p, p1, thickness, colorId, alpha);
        this.drawLine(p1, p2, thickness, colorId, alpha);
        this.drawLine(p2, p3, thickness, colorId, alpha);
        this.drawLine(p3, p, thickness, colorId, alpha);

        m4m.poolv2_del(p); m4m.poolv2_del(p1); m4m.poolv2_del(p2); m4m.poolv2_del(p3);
    }

    public static update() {
        if (this.currIndex == -1) { return; }
        //隐藏所有的线
        for (let i = 0; i < this.currIndex + 1; i++) {
            let line = this.lineQueue[i];
            if (line) {
                line.transform.visible = false;
            }
        }
        this.currIndex = -1;

        // console.error(` lineQueue len : ${this.lineQueue.length}`);
    }

    public static remove() {
        this.lineQueue.length = 0;
    }

    public static colors: m4m.math.color[];
    private static readonly right = new m4m.math.vector2(1, 0);
    private static readonly toAngle = 57.29577951308232;
    private static readonly toRad = 1 / 180 * Math.PI;
    private static inited = false;
    private static lineRoot: m4m.framework.transform2D;
    private static lineQueue: m4m.framework.rawImage2D[];
    private static currIndex: number = -1;
    private static template: m4m.framework.rawImage2D;

}