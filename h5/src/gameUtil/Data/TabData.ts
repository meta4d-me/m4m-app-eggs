import { UIComponentBaseData } from "./UIComponentBaseData";

export class TabData extends UIComponentBaseData {
    public selectIcon: m4m.framework.transform2D;
    public enabled: boolean = true;
    public Clone(): TabData {
        let data: TabData = new TabData();
        data.width = this.width;
        data.height = this.height;
        data.selectIcon = this.selectIcon;
        return data;
    }
}