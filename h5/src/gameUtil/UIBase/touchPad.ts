/**
 * UI 触控板组件
 * 有效区域为当前transform2d 的实际矩形区域
 * 模拟连续的滑动信息输出（类似于 笔记本电脑 上的触摸板鼠标输入设备）
 */
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class touchPad extends m4m.framework.behaviour2d {
    /**
     * 输入值改变时，回调函数
     * 需要用户对接该函数对象
     */
    public onValueChange: (x, y) => any;
    /**
     * 点下时 回调函数
     */
    public onPointDown: (x, y) => any;
    /**
     * 释放点下时 回调函数
     */
    public onPointUp: (x, y) => any;

    private static readonly helpV2 = new m4m.math.vector2();
    private hasPointDown: boolean = false;
    private startPoint = new m4m.math.vector2();
    private lastPoint = new m4m.math.vector2();

    public onPointEvent(canvas: m4m.framework.canvas, ev: m4m.framework.PointEvent, oncap: boolean) {
        //注 ： ev.eated 在该组件中不能正常使用，因为事件触发 和 UI事件流不对称 
        //oncap==true 是捕获阶段，一般的行为，只在pop阶段处理
        if (!this.enabled || !this.transform.visible || oncap) { return; }
        //检查是否有点击进入
        m4m.math.vec2Set(touchPad.helpV2, ev.x, ev.y);
        let isPointContains = false;
        if (this.transform.ContainsCanvasPoint(touchPad.helpV2)) {
            isPointContains = true;
        }

        let lastHasPointDown = this.hasPointDown;
        //进入状态更新流
        // this.updateState(ev);
        let pEnum = m4m.event.PointEventEnum;
        let hasMove = false;
        switch (ev.type) {
            case pEnum.PointDown:
                if (isPointContains) {
                    this.hasPointDown = true;
                    if (this.onPointDown) {
                        this.onPointDown(ev.c_x, ev.c_y);
                    }
                }
                break;
            case pEnum.PointUp:
                this.hasPointDown = false;
                if (this.onPointUp) {
                    this.onPointUp(ev.c_x, ev.c_y);
                }
                break;
            case pEnum.PointHold:
                if (this.lastPoint.x != ev.c_x || this.lastPoint.y != ev.c_y) {
                    m4m.math.vec2Set(this.lastPoint, ev.c_x, ev.c_y);
                    hasMove = true;
                }
                break;
            default:
        }

        if (!lastHasPointDown && this.hasPointDown) {
            m4m.math.vec2Set(this.startPoint, ev.c_x, ev.c_y);
        }

        if (lastHasPointDown && hasMove) {
            if (this.onValueChange) {
                this.onValueChange(ev.c_x - this.startPoint.x, ev.c_y - this.startPoint.y);
            }
        }

    }

}