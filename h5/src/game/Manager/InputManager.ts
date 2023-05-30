import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "../Data/BindKeyName";
import { GameMgr } from "../GameMgr";
export class InputManager {
    public static init() {
        GameMgr.inputMgr.addPointListener(m4m.event.PointEventEnum.PointMove, this.onMove, this);
        GameMgr.inputMgr.addPointListener(m4m.event.PointEventEnum.PointDown, this.onDown, this);
        GameMgr.inputMgr.addPointListener(m4m.event.PointEventEnum.PointUp, this.onUp, this);

    }
    //横向滑动
    public static onHorizTouch: Function;
    //竖向滑动
    public static onDragTouch: Function;
    // tslint:disable-next-line: variable-name
    public static lastPoint_x = -1;
    // tslint:disable-next-line: variable-name
    public static lastPoint_y = 0;
    //按下的起点
    public static downPointX = -1;
    public static downPointY = 0;
    //弹起的坐标点
    public static upPointX = -1;
    public static upPointY = 0;
    private static CallBackList: Function[] = new Array();
    private static isDonw = false;
    private static lastPos = new m4m.math.vector3();
    public static addUpCallBackFun(callBackFun: Function) {
        this.CallBackList.push(callBackFun);
    }

    public static removeUpCallBackFun(callBackFun: Function) {
        let index = this.CallBackList.indexOf(callBackFun);
        if (index != -1) {
            this.CallBackList.splice(index, 1);
        }
    }
    private static moveCallBackList: Function[] = new Array();
    public static addMoveCallBackFun(callBackFun: Function) {
        this.moveCallBackList.push(callBackFun);
    }
    public static removeMoveCallBackFun(callBackFun: Function) {
        let index = this.moveCallBackList.indexOf(callBackFun);
        if (index != -1) {
            this.moveCallBackList.splice(index, 1);
        }
    }
    private static onDown([x, y]) {
        this.isDonw = true;
        this.lastPoint_x = x;
        this.lastPoint_y = y;
        this.downPointX = x;
        this.downPointY = y;
        this.lastPos.x = x;
        this.lastPos.y = y;
    }
    private static onUp([x, y]) {
        this.isDonw = false;
        this.upPointX = x;
        this.upPointY = y;
        // console.error("弹起坐标", x, y);
        this.onHorizTouch = null;
        this.onDragTouch = null;
        UiDataManager.changeFunctionData(BindKeyName.clickSlide, { upPointX: this.upPointX, upPointY: this.upPointY, downPointX: this.downPointX, downPointY: this.downPointY });
        this.CallBackList.forEach((callBackFun) => {
            if (callBackFun) {
                callBackFun();
            }
        });
    }
    private static onMove([x, y]) {
        // // console.error("移动--- ", x, y)
        this.moveCallBackList.forEach((callBackFun) => {
            if (callBackFun) {
                callBackFun(x, y);
            }
        });
        if (!this.isDonw) {
            return;
        }

        if (this.onHorizTouch) {//横向滑动
            let len = Math.abs(this.lastPoint_x - x);
            if (len > 0.1) {
                let dir = Math.sign(this.lastPoint_x - x);
                this.onHorizTouch(dir * len);
                // console.error("滑动 ", dir * len);
            }
        }

        if (this.onDragTouch) {//竖向滑动
            let foo = this.lastPoint_y - y;
            if (Math.abs(foo) > 0.1) {
                this.onDragTouch(foo);
            }
        }

        this.lastPoint_x = x;
        this.lastPoint_y = y;
    }
}