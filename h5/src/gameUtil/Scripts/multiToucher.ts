//多点触控 触摸器（响应多点触摸的交互事件）
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class multiToucher extends m4m.framework.behaviour2d {
    private static regId(id: number) {
        if (isNaN(id) || id < 0) { return; }
        this.useIdMap[id] = true;
    }
    private static unregId(id: number) {
        if (isNaN(id) || id < 0) { return; }
        this.useIdMap[id] = false;
    }
    /** 初始化设置 overlay2D */
    public static init(ol2d: m4m.framework.overlay2D, app: m4m.framework.application) {
        if (!ol2d || !app) { return; }
        this._ol2d = ol2d;
        this.app = app;
        this.iptMgr = app.getInputMgr();
        this.inited = true;
    }
    /** 全局启用 多点触控的功能 */
    public static enable: boolean = true;
    /** 是否吃事件（阻止事件穿透） */
    public eatEvent: boolean = false;

    private static helpv2 = new m4m.math.vector2();
    private static helpv2v1 = new m4m.math.vector2();

    private static useIdMap: { [id: number]: boolean } = {};

    private static _ol2d: m4m.framework.overlay2D;
    private static iptMgr: m4m.framework.inputMgr;
    private static app: m4m.framework.application;
    private static inited = false;

    private eventer = new m4m.event.InputEvent(); //事件播报对象
    private touchId = -1; //touch 的id
    private hasPointDown = false; //有被点击
    private lastTouchDic: { [id: number]: boolean } = {};  // 结构 {id:是否点击}

    private ids: number[] = [];

    private readonly moveTolerance = 6;  //move 状态容忍值
    private lastTouch = false;
    private hasPointUP = false;
    private lastPoint = new m4m.math.vector2();
    private downPoint = new m4m.math.vector2();

    /**
    * 添加point事件监听者
    * @param eventEnum 事件类型
    * @param func 事件触发回调方法 (Warn: 不要使用 func.bind() , 它会导致相等判断失败)
    * @param thisArg 回调方法执行者
    */
    public addPointListener(eventEnum: m4m.event.PointEventEnum, func: (...args: any[]) => void, thisArg: any) {
        this.eventer.OnEnum_point(eventEnum, func, thisArg);
    }
    /**
     * 移除point事件监听者
     * @param eventEnum 事件类型
     * @param func 事件触发回调方法
     * @param thisArg 回调方法执行者
     */
    public removePointListener(eventEnum: m4m.event.PointEventEnum, func: (...args: any[]) => void, thisArg: any) {
        this.eventer.RemoveListener(m4m.event.PointEventEnum[eventEnum], func, thisArg);
    }
    public onPlay() {
    }

    public update(delta: number) {

    }

    public onPointEvent(canvas: m4m.framework.canvas, ev: m4m.framework.PointEvent, oncap: boolean) {
        //注 ： ev.eated 在该组件中不能正常使用，因为事件触发 和 UI事件流不对称 

        //oncap==true 是捕获阶段，一般的行为，只在pop阶段处理
        if (!multiToucher.enable || oncap) { return; }
        if (!this.transform.visible || !multiToucher.inited) { return; }
        //检查是否有点击进入
        if (!this.hasPointDown) {
            this.ckStratHit();
        }
        //进入状态更新流
        this.updateState(ev);

        let ipt = multiToucher.iptMgr;
        //同步 lastdic
        for (let key in ipt.touches) {
            let id = Number(key);
            let pt = ipt.touches[id];
            if (pt) {
                // this.lastTouchDic.set(id,pt.touch);
                this.lastTouchDic[id] = pt.touch;
            }
        }
    }

    /** 重置状态 */
    public resetSate() {
        this.hasPointDown = false;
        multiToucher.unregId(this.touchId);
        this.lastTouchDic[this.touchId] = false;
        this.touchId = -1;
    }

    public remove() {

    }
    //检查 是否有 新touch 击中 自己
    //是否 有新增touch
    private ckHaveNewTouch(newTs: number[]) {
        if (!newTs) { return; }
        newTs.length = 0;
        let result = false;
        let ipt = multiToucher.iptMgr;
        for (let key in ipt.touches) {
            let id = Number(key);
            let pt = ipt.touches[id];
            if (pt) {
                if (!pt.touch) { continue; } //当前没有点击
                if (!this.lastTouchDic[id] && !multiToucher.useIdMap[id]) {  //新的点击 或者 上一次没有点击， 这次被点击了 ,且没被占用
                    result = true;
                    newTs.push(id);
                }
            }
        }
        return result;
    }
    //判断是有否有击中
    private ckStratHit() {
        this.ckHaveNewTouch(this.ids);

        while (this.ids.length > 0) {
            let id = this.ids.shift();
            let pinfo = multiToucher.iptMgr.touches[id];
            if (pinfo && this.tryHit(pinfo)) {
                this.touchId = id;
                multiToucher.regId(id);
                this.hasPointDown = true;
                this.lastTouch = false;
                this.hasPointUP = false;
                this.downPoint.x = pinfo.x;
                this.downPoint.y = pinfo.y;
                break;
            }
        }
    }

    //检查是否击中
    private tryHit(pInfo: m4m.framework.pointinfo): boolean {
        if (!pInfo) { return false; }
        let result = false;
        multiToucher.helpv2.x = pInfo.x;
        multiToucher.helpv2.y = pInfo.y;
        multiToucher._ol2d.calScreenPosToModelPos(multiToucher.helpv2, multiToucher.helpv2v1);
        result = this.transform.ContainsCanvasPoint(multiToucher.helpv2v1);
        return result;
    }
    //跟踪击中自己的touch 、 更新交互状态 (对外抛送事件)
    // tslint:disable-next-line: cyclomatic-complexity
    private updateState(ev: m4m.framework.PointEvent) {
        if (!this.hasPointDown || this.touchId == -1) {
            return;
        }
        let pt = multiToucher.iptMgr.touches[this.touchId];
        if (!pt) {
            this.hasPointDown = false;
            this.lastTouch = false;
            return;
        }

        let needMove = false;
        if (this.lastPoint.x != pt.x || this.lastPoint.y != pt.y) {
            //on move
            needMove = true;
        }
        let pEnum: m4m.event.PointEventEnum;
        if (!this.lastTouch && pt.touch) {
            //on down
            this.downPoint.x = pt.x;
            this.downPoint.y = pt.y;
            pEnum = m4m.event.PointEventEnum.PointDown;
            // console.error(`down this.touchId : ${this.touchId}`);
            if (this.eventer.listenerCount(m4m.event.PointEventEnum[pEnum]) > 0) {
                //有监听
                this.eventer.EmitEnum_point(pEnum, pt.x, pt.y, ev);
                if (this.eatEvent) { ev.eated = true; }
            }
        } else if (this.lastTouch && !pt.touch) {
            //on up
            this.hasPointUP = true;
            // console.error(`up this.touchId : ${this.touchId}`);
            pEnum = m4m.event.PointEventEnum.PointUp;
            if (this.eventer.listenerCount(m4m.event.PointEventEnum[pEnum]) > 0) {
                //有监听
                this.eventer.EmitEnum_point(pEnum, pt.x, pt.y, ev);
                if (this.eatEvent) { ev.eated = true; }
            }

        } else if (this.lastTouch && pt.touch) {
            //on hold
            pEnum = m4m.event.PointEventEnum.PointHold;
            if (this.eventer.listenerCount(m4m.event.PointEventEnum[pEnum]) > 0) {
                //有监听
                this.eventer.EmitEnum_point(pEnum, pt.x, pt.y, ev);
                if (this.eatEvent) { ev.eated = true; }
            }
        }

        if (needMove) {
            pEnum = m4m.event.PointEventEnum.PointMove;
            if (this.eventer.listenerCount(m4m.event.PointEventEnum[pEnum]) > 0) {
                //有监听
                this.eventer.EmitEnum_point(pEnum, pt.x, pt.y, ev);
                if (this.eatEvent) { ev.eated = true; }
            }
        }

        if (this.hasPointUP && this.hasPointDown) {
            //let isMoveTolerance = (Math.abs(this.downPoint.x - pt.x)> this.moveTolerance || Math.abs(this.downPoint.y - pt.y)> this.moveTolerance)
            let isMoveTolerance = (Math.abs(this.downPoint.x - pt.x) > this.moveTolerance || Math.abs(this.downPoint.y - pt.y) > this.moveTolerance);
            if (!isMoveTolerance) {
                //on click
                pEnum = m4m.event.PointEventEnum.PointClick;
                if (this.eventer.listenerCount(m4m.event.PointEventEnum[pEnum]) > 0) {
                    //有监听
                    this.eventer.EmitEnum_point(pEnum, pt.x, pt.y, ev);
                    if (this.eatEvent) { ev.eated = true; }
                }
            }
        }

        if (!pt.touch) {
            this.resetSate();
        }

        this.lastTouch = pt.touch;
        this.lastPoint.x = pt.x;
        this.lastPoint.y = pt.y;
    }
}
