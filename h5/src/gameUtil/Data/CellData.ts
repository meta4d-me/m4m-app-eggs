import { UIComponentBaseData } from "./UIComponentBaseData";

export class CellData extends UIComponentBaseData {
    public selectIcon: m4m.framework.transform2D;
    //格子赋值 后数据
    public data: any;
    //是否显示tips 默认不显示
    public showTip: boolean = false;
    //
    public enabled: boolean = true;

    public Clone(): CellData {
        let data: CellData = new CellData();
        data.width = this.width;
        data.height = this.height;
        data.selectIcon = this.selectIcon;
        data.showTip = this.showTip;
        return data;
    }
}