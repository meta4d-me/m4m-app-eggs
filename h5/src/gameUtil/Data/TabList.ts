import { UiTools } from "../PSDUI/UiTools";
import { Tab } from "./Tab";
import { TabData } from "./TabData";
import { TabListData } from "./TabListData";
import { DirectionType } from "./UIComponentBaseData";

export class TabList {

    public set visible(value: boolean) {
        for (let i = 0; i < this._list.length; i++) {
            let cell: Tab = this._list[i];
            cell.transform.visible = value;
        }
    }
    public get tabListData(): TabListData {
        return this.baseData;
    }

    public set SelectIndex(value: number) {
        // console.error("选中tab " + value);
        let selectCell = this._list[value];
        if (selectCell.tabData.enabled == false) {
            return;
        }
        for (let i = 0; i < this._list.length; i++) {
            let cell: Tab = this._list[i];
            let selectBool = value == cell.index;
            cell.selectFun(selectBool);
            if (selectBool) {
                if (this.selectCallBackFun) {
                    this.selectCallBackFun(value);
                }
            }
        }
    }
    //选中 回调
    public selectCallBackFun: Function;
    public name: string = "TabList";
    public constructor(base: TabListData) {
        this.baseData = base;
        this._list = new Array<Tab>();
        this.create();
    }
    private baseData: TabListData;
    private _list: Tab[];
    private _width: number = 0;
    private _height: number = 0;

    private downFun: any;
    public create(): void {
        //初始化gird组件的格子
        let offset = this.tabListData.offset;
        let tabWidth = this.tabListData.tabData.width;
        let tabHeight = this.tabListData.tabData.height;
        let layoutOptX = this.tabListData.tabLayoutX;
        let layoutOptY = this.tabListData.tabLayoutY;
        let x: number = this.tabListData.initXPlace;
        let y: number = this.tabListData.initYPlace;
        if (this.downFun == null) {
            this.downFun = this.tab_singleClickHandler.bind(this);
        }

        let tabName: string = "Tab";
        if (this.tabListData.tabName) {
            tabName = this.tabListData.tabName;
        }
        for (let i: number = 0; i < this.tabListData.list.length; i++) {
            let str: string = this.tabListData.list[i];
            let tabData: TabData = this.tabListData.tabData.Clone();
            tabData.index = i;

            let tabClass: any = UiTools.cloneUi(this.tabListData.tab);
            let tabTrans: m4m.framework.transform2D = tabClass.transform;

            let tab = tabTrans.addComponent(tabName) as Tab;
            tab.tabData = tabData;
            tab.clickCallBackFun = this.downFun;
            tab.setTabClass(tabClass);
            tab.initData(str);
            if (layoutOptX != null || layoutOptY != null) {
                //
                if (layoutOptX) {
                    tabTrans.setLayoutValue(layoutOptX, x);
                }
                if (layoutOptY) {
                    tabTrans.setLayoutValue(layoutOptY, y);
                }
            } else {
                //如果没有使用布局设置
                tabTrans.localTranslate.x = x;
                tabTrans.localTranslate.y = y;
                tabTrans.localTranslate = tabTrans.localTranslate;

            }
            this.tabListData.parentTrans.addChild(tabTrans);
            tabTrans.markDirty();
            this._list.push(tab);

            if (this.tabListData.layoutType == DirectionType.Horizontal) {
                x += tabWidth + offset;
            } else {
                y += tabHeight + offset;
            }
        }
        this._width = x;
        this._height = y;
    }

    //
    public setList(dataList: any[]) {
        if (dataList == null) {
            return;
        }
        let tabWidth = this.tabListData.tabData.width;
        let tabHeight = this.tabListData.tabData.height;
        let offset = this.tabListData.offset;
        this._width = 0;
        this._height = 0;
        for (let i = 0; i < this._list.length; i++) {
            if (i < dataList.length) {
                let data: any = dataList[i];
                this._list[i].setData(data);
                if (this.tabListData.layoutType == DirectionType.Horizontal) {
                    this._width += tabWidth + offset;
                } else {
                    this._height += tabHeight + offset;
                }
            } else {
                this._list[i].setData(null);
            }
        }
    }

    public getWidth(): number {
        return this._width;
    }

    public getHeight(): number {
        return this._height;
    }

    public dispose() {
        for (let i = 0; i < this._list.length; i++) {
            let tab: Tab = this._list[i];
            tab.dispose();
            tab = null;
        }
        this._list.length = 0;
        this._list = null;
    }

    private tab_singleClickHandler(index: number): void {
        if (index < 0 || index >= this._list.length) {
            console.error("当前点击的对象所引未取到！" + index);
            return;
        }

        this.SelectIndex = index;
    }
}