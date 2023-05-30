import { TabData } from "./TabData";
import { DirectionType } from "./UIComponentBaseData";

export class TabListData {
    //默认竖排
    public layoutType: DirectionType = DirectionType.Vertical;
    public offset: number = 10;
    public initXPlace: number = 0;
    public initYPlace: number = 0;
    public tabLayoutX: m4m.framework.layoutOption;
    public tabLayoutY: m4m.framework.layoutOption;
    public tabData: TabData;
    public tab: any;
    public parentTrans: m4m.framework.transform2D;
    public tabName: string;
    public list: any[];
}