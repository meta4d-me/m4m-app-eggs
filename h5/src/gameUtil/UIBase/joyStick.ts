import { multiToucher } from "Scripts/multiToucher";
import { metaUIManager } from "./metaUIManager";

// 操纵杆
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class joyStick extends m4m.framework.behaviour2d {
    //底部框img
    @m4m.reflect.Field("reference", null, "image2D")
    public bottomImg: m4m.framework.image2D;

    //上面的按钮img
    @m4m.reflect.Field("reference", null, "image2D")
    public overImg: m4m.framework.image2D;

    //浮动按钮可移动范围
    @m4m.reflect.Field("number")
    public moveRange: number = 30;

    /** 摇晃摇杆是的回调方法 */
    public onShake: (x, y, dis) => any;
    /** 摇杆 释放松开 */
    public onRelease: () => any;

    private static readonly helpv2 = new m4m.math.vector2();
    private static readonly helpv2v1 = new m4m.math.vector2();
    private static readonly helpv2v2 = new m4m.math.vector2();
    //多点事件对象
    private mToucher: multiToucher;

    private hasDown = false;

    public onPlay() {
        let peEnum = m4m.event.PointEventEnum;
        this.mToucher = this.transform.addComponent("multiToucher") as multiToucher;
        //事件
        this.mToucher.addPointListener(peEnum.PointDown, this.onDown, this);
        this.mToucher.addPointListener(peEnum.PointMove, this.onMove, this);
        this.mToucher.addPointListener(peEnum.PointUp, this.onUp, this);
    }

    //复位
    public resetJoy() {
        this.hasDown = false;
        if (this.onRelease) {
            this.onRelease();
        }
        if (this.mToucher) {
            this.mToucher.resetSate();
        }

        if (!this.overImg) { return; }
        let tran = this.overImg.transform;
        tran.localTranslate.x = 0;
        tran.localTranslate.y = 0;
        tran.markDirty();
    }

    public update(delta: number) {

    }
    public remove() {

    }
    private onDown() {
        if (!this.enabled) { return; }
        //被点中了
        //记录 开始点
        this.hasDown = true;
    }

    private onMove([x, y]) {
        if (!this.enabled) { return; }
        if (!this.hasDown || !this.overImg) { return; }
        let Ttran = this.transform;
        if (!Ttran.parent) { return; }
        let difV2 = joyStick.helpv2;
        let point = joyStick.helpv2v1;
        metaUIManager.ActiveSelf.screenPosToUIpos(x, y, point);
        m4m.math.vec2Subtract(point, Ttran.parent.getWorldTranslate(), difV2);

        //计算 overimg 的位置
        //范围限制处理
        let currdis = m4m.math.vec2Length(difV2);
        // console.error("范围 ",currdis);
        if (currdis > this.moveRange) {
            m4m.math.vec2Normalize(difV2, difV2);
            m4m.math.vec2ScaleByNum(difV2, this.moveRange, difV2);
        }

        //设置 overimg 的位置
        let tran = this.overImg.transform;
        m4m.math.vec2Clone(difV2, tran.localTranslate);
        tran.markDirty();

        //摇晃回调
        if (this.onShake) {
            let sclNum = 1 / this.moveRange;
            this.onShake(difV2.x * sclNum, difV2.y * sclNum, currdis);
        }
    }

    private onUp() {
        if (!this.enabled) { return; }
        this.resetJoy();
        // if (this.onRelease) {
        //     this.onRelease();
        // }
        //  if(this.onShake){
        //     this.onShake(0,0);
        // }
    }
}
