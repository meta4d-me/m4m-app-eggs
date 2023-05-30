import { SliderComponent } from "Data/SliderComponent";
import { InputManager } from "../Manager/InputManager";

//滑动组件
@m4m.reflect.node2DComponent
export class SliderComponentExtend extends SliderComponent {
    public offsetPercent: number = 0.6;
    public offsetWidth: number = 0;
    public callBackFun: Function;
    //最大阶段值
    public maxNum: number = -1;
    protected get transWidth(): number {
        if (this._transWidth == null) {
            this._transWidth = this.progressbar.transform.width - this.btn.transform.width + this.offsetWidth;
        }
        return this._transWidth;
    }
    //按钮 按下
    public btnDown_event() {
        // console.error("按钮 按下");
        InputManager.onHorizTouch = this.onHorizTouchFun.bind(this);
    }

    /****设置值
     * maxNum 如果有设置值 需传入小于等于maxNum的值  
     * maxNum 默认值 -1   需传入百分比值 0.x
    */
    public setValue(value) {
        let percentValue;
        if (this.maxNum == -1) {
            if (value > 1) {
                console.error("SliderComponentExtend 当前需设置百分比值 " + value);
                return;
            }
            percentValue = value;
        } else {
            percentValue = value / this.maxNum;
        }
        if (percentValue < 0) {
            percentValue = 0;
        } else if (percentValue > 1) {
            percentValue = 1;
        }
        let setX = percentValue * this.transWidth;
        this.reshPosFun(setX);
    }

    private reshPosFun(setX) {
        this.btn.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, setX);
        let sliderVale = setX / this.transWidth;
        // console.error("滑动 ", sliderVale);
        this.progressbar.value = sliderVale;
        if (this.callBackFun) {
            this.callBackFun(sliderVale);
        }
    }

    private onHorizTouchFun(moveX: number) {
        // console.error("滑动 ", moveX);
        let xx = this.btn.transform.getLayoutValue(m4m.framework.layoutOption.LEFT);
        let setX = xx - moveX * this.offsetPercent;
        if (setX < 0) {
            setX = 0;
        } else if (setX > this.transWidth) {
            setX = this.transWidth;
        }

        this.reshPosFun(setX);
    }
}