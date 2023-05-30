import { UiTools } from "../PSDUI/UiTools";
import { Cell } from "./Cell";
import { CellData } from "./CellData";
import { GridData } from "./GridData";
import { ListModel } from "./ListModel";

export class Grid {
    public set visible(value: boolean) {
        for (let i = 0; i < this._list.length; i++) {
            let cell: Cell = this._list[i];
            cell.transform.visible = value;
        }
    }
    public get girdData(): GridData {
        return this.baseData;
    }

    public set SelectIndex(value: number) {
        let selectCell = this._list[value];
        if (selectCell.cellData.enabled == false) {
            return;
        }
        this._selectIndex = value;
        // console.error("选中格子 " + value);
        for (let i = 0; i < this._list.length; i++) {
            let cell: Cell = this._list[i];
            let selectBool = value == cell.index;
            cell.selectFun(selectBool);
            if (selectBool) {
                if (this.selectCallBackFun) {
                    this.selectCallBackFun(cell.cellData.data, cell.cellData.index);
                }
            }
        }

        // super.dispatchEvent(new CUIEvent(CUIEvent.TAB_SELECT_CHANGE, value));
    }
    public get SelectIndex(): number {
        return this._selectIndex;
    }
    //listModel 事件侦听 (默认不开启)
    public listModelEvent: boolean = false;
    //选中 回调
    public selectCallBackFun: Function;
    public name: string = "Gird";
    public constructor(base: GridData) {
        this.baseData = base;
        this._list = new Array<Cell>();
        this.create();
    }
    private _selectIndex: number = 0;
    private baseData: GridData;
    private _list: Cell[];

    private downFun: any;

    private addEventFun: any;
    private removeEventFun: any;
    private clearEventFun: any;
    private _listModel: ListModel<any>;

    private _width: number = 0;
    private _height: number = 0;

    public getCellList(): Cell[] {
        return this._list;
    }
    public create(): void {
        //初始化gird组件的格子
        let offsetX = this.girdData.offsetX;
        let offsetY = this.girdData.offsetY;
        let cellWidth = this.girdData.cellData.width;
        let cellHeight = this.girdData.cellData.height;
        let layoutOptX = this.girdData.cellLayoutX;
        let layoutOptY = this.girdData.cellLayoutY;
        let x: number = this.girdData.initXPlace;
        let y: number = this.girdData.initYPlace;
        if (this.downFun == null) {
            this.downFun = this.cell_singleClickHandler.bind(this);
        }
        let cellName: string = "Cell";
        if (this.girdData.cellName) {
            cellName = this.girdData.cellName;
        }
        let index: number = 0;
        for (let i = 0; i < this.girdData.rows; i++) {
            for (let ig = 0; ig < this.girdData.columns; ig++) {
                let cellData: CellData = this.girdData.cellData.Clone();
                cellData.index = index;
                // let cellTrans: m4m.framework.transform2D = this.girdData.cell.clone();

                let cellClass: any = UiTools.cloneUi(this.girdData.cell);
                let cellTrans: m4m.framework.transform2D = cellClass.transform;

                let cell = cellTrans.addComponent(cellName) as Cell;
                cell.cellData = cellData;
                cell.clickCallBackFun = this.downFun;
                cell.setCellClass(cellClass);
                if (layoutOptX != null || layoutOptY != null) {
                    //
                    if (layoutOptX) {
                        cellTrans.setLayoutValue(layoutOptX, x);
                    }
                    if (layoutOptY) {
                        cellTrans.setLayoutValue(layoutOptY, y);
                    }
                } else {
                    //如果没有使用布局设置
                    cellTrans.localTranslate.x = x;
                    cellTrans.localTranslate.y = y;
                    cellTrans.localTranslate = cellTrans.localTranslate;

                }
                // console.error("添加格子 " + i);
                this.girdData.parentTrans.addChild(cellTrans);
                cellTrans.markDirty();
                // let btn = cellTrans.getComponent("button") as m4m.framework.button;
                // if (btn == null) {
                //     btn = cellTrans.addComponent("button") as m4m.framework.button;
                //     btn.addListener(m4m.event.UIEventEnum.PointerClick, cell.PointerClick, cell);
                // }
                this._list.push(cell);

                index++;
                x += cellWidth + offsetX;
            }
            x = this.girdData.initXPlace;
            y += cellHeight + offsetY;
        }
        // this.width = this.girdData.columns * (cellSize + offsetX) - offsetX;
        // this.height = y + cellSize;
    }
    public setListModel(itemListModel: ListModel<any>) {
        if (itemListModel == null) {
            return;
        }
        if (this.listModelEvent) {
            if (this._listModel != null) {
                this._listModel.removeListener("ADD", this.addEventFun, this);
                this._listModel.removeListener("REMOVE", this.removeEventFun, this);
                this._listModel.removeListener("CLEAR", this.clearEventFun, this);
            }
            this._listModel = itemListModel;
            this.addEventFun = this.AddEventHandler;
            this._listModel.addListener("ADD", this.addEventFun, this);
            this.removeEventFun = this.RemoveEventHandler;
            this._listModel.addListener("REMOVE", this.removeEventFun, this);
            this.clearEventFun = this.ClearEventHandler;
            this._listModel.addListener("CLEAR", this.clearEventFun, this);
        }
        let cellWidth = this.girdData.cellData.width;
        let offsetX = this.girdData.offsetX;
        let cellHeight = this.girdData.cellData.height;
        let offsetY = this.girdData.offsetY;
        this._width = 0;
        this._height = 0;
        for (let i = 0; i < this._list.length; i++) {
            if (i < itemListModel.count) {
                let data: any = itemListModel.getValue(i);
                this._list[i].setData(data);
                // if (data) {
                if (i < this.girdData.columns) {
                    this._width += cellWidth + offsetX;
                }
                if (i % this.girdData.columns == 0) {
                    this._height += cellHeight + offsetY;
                }
                // }
            } else {
                this._list[i].setData(null);
            }
            // this._width += cellWidth + offsetX;
        }
    }
    public getWidth(): number {
        return this._width;//- this.girdData.offsetX;
    }

    public getHeight(): number {
        return this._height;//- this.girdData.offsetY;
    }

    //加上初始位置值 的宽度  一般用于 设置 滑动区域宽
    public getAddOffsetWidth(): number {
        return this._width + this.girdData.offsetX;
    }

    //加上初始位置值 的高度  一般用于 设置 滑动区域高
    public getAddOffsetHeight(): number {
        return this._height + this.girdData.offsetY;
    }

    public reshUIPosFun() {
        let offsetX = this.girdData.offsetX;
        let offsetY = this.girdData.offsetY;
        let cellWidth = this.girdData.cellData.width;
        let cellHeight = this.girdData.cellData.height;
        let layoutOptX = this.girdData.cellLayoutX;
        let layoutOptY = this.girdData.cellLayoutY;
        let x: number = this.girdData.initXPlace;
        let y: number = this.girdData.initYPlace;
        let index: number = 0;
        for (let i = 0; i < this.girdData.rows; i++) {
            for (let ig = 0; ig < this.girdData.columns; ig++) {
                let cell = this._list[index];
                let cellTrans: m4m.framework.transform2D = cell.transform;
                if (layoutOptX != null || layoutOptY != null) {
                    //
                    if (layoutOptX) {
                        cellTrans.setLayoutValue(layoutOptX, x);
                    }
                    if (layoutOptY) {
                        cellTrans.setLayoutValue(layoutOptY, y);
                    }
                } else {
                    //如果没有使用布局设置
                    cellTrans.localTranslate.x = x;
                    cellTrans.localTranslate.y = y;
                    cellTrans.localTranslate = cellTrans.localTranslate;
                }
                cellTrans.markDirty();

                index++;
                x += cellWidth + offsetX;
            }
            x = this.girdData.initXPlace;
            y += cellHeight + offsetY;
        }
    }

    public dispose() {
        if (this.listModelEvent) {
            if (this._listModel != null) {
                this._listModel.removeListener("ADD", this.addEventFun, this);
                this._listModel.removeListener("REMOVE", this.removeEventFun, this);
                this._listModel.removeListener("CLEAR", this.clearEventFun, this);
            }
        }
        for (let i = 0; i < this._list.length; i++) {
            let cell: Cell = this._list[i];
            cell.dispose();
            cell = null;
        }
        this._list.length = 0;
        this._list = null;
    }

    private cell_singleClickHandler(index: number): void {
        if (index < 0 || index >= this._list.length) {
            console.error("当前点击的对象所引未取到！" + index);
            return;
        }

        this.SelectIndex = index;
    }

    private AddEventHandler(event: any) {
        // console.error("AddEventHandler");
        let index = event.index;
        let data: any = event.obj;
        if (this._list[index] != null) {
            this._list[index].setData(data);
        }
    }

    private RemoveEventHandler(event: any) {
        // console.error("RemoveEventHandler");
        let index = event.index;
        this.setNullFun(index);
    }

    private setNullFun(index: number) {
        if (this._list[index] != null) {
            this._list[index].setData(null);
        }
    }

    private ClearEventHandler(event: any) {
        // console.error("ClearEventHandler");
        for (let i = 0; i < this._list.length; i++) {
            this.setNullFun(i);
        }
    }
}