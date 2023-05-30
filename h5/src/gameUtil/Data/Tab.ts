import { TabData } from "./TabData";

@m4m.reflect.node2DComponent
export class Tab extends m4m.framework.behaviour2d {
    protected baseData: TabData;
    public get tabData(): TabData {
        return this.baseData;
    }
    public set tabData(value: TabData) {
        this.baseData = value;
    }

    public get index(): number {
        return this.tabData.index;
    }
    public name: string = "Tab";
    //点击回调
    public clickCallBackFun: Function;
    //克隆生成的UI带引用关系对象
    private tabClass: any;
    protected btn: m4m.framework.button;
    public onPlay() {
        // console.error(this.transform.name + "   " + this.transform.width);
        this.btn = this.transform.getComponent("button") as m4m.framework.button;
        if (this.btn == null) {
            this.btn = this.transform.addComponent("button") as m4m.framework.button;
        } else {
            console.error("当前tab已加 button 组件 不需要添加！");
        }
        // this.btn.addListener(m4m.event.UIEventEnum.PointerClick, this.pointerClickFun, this);
        this.btn.addListener(m4m.event.UIEventEnum.PointerDown, this.pointerClickFun, this);
    }
    //克隆生成的UI带引用关系对象
    public setTabClass(value: any) {
        // this.tabClass = value;
    }

    //选中当前Tab 时的fun
    public selectFun(selectbool: boolean) {
        if (this.baseData) {
            if (this.baseData.selectIcon) {
                this.baseData.selectIcon.visible = selectbool;
            }
            // console.log(selectbool);
        } else {
            console.error("CellData 未赋值！");
        }
    }

    //初始化
    public initData(value: any): void {
        //
    }

    public setData(value: any): void {
        //
    }

    public dispose() {
        //removeListener
        this.btn.removeListener(m4m.event.UIEventEnum.PointerDown, this.pointerClickFun, this);
    }
    protected pointerClickFun() {
        if (this.clickCallBackFun) { this.clickCallBackFun(this.index); }
    }
}