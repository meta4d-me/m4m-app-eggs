
/**
 * UI 事件 全屏蔽 组件
 */
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiEventDiscard extends m4m.framework.behaviour2d implements m4m.framework.I2DPointListener {
    /** 强制要命中UI 矩形 才隔断事件 */
    public foucsHited = false;
    private static readonly helpV2 = new m4m.math.vector2();
    public onPointEvent(canvas: m4m.framework.canvas, ev: m4m.framework.PointEvent, oncap: boolean) {
        if (oncap) { return; }
        let v2 = uiEventDiscard.helpV2;
        m4m.math.vec2Set(v2, ev.x, ev.y);
        if (this.foucsHited && !this.transform.ContainsCanvasPoint(v2)) { return; }
        ev.eated = true;

    }
}