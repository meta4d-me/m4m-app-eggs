import { CellData } from "./CellData";

export class GridData {
    /***列*/
    public columns: number = 5;
    /***行*/
    public rows: number = 5;
    public offsetX: number = 10;
    public offsetY: number = 10;
    public bagType: number = -1;
    public initXPlace: number = 0;
    public initYPlace: number = 0;
    public cellLayoutX: m4m.framework.layoutOption;
    public cellLayoutY: m4m.framework.layoutOption;
    public cellData: CellData;
    public cell: any;
    public parentTrans: m4m.framework.transform2D;
    public cellName: string;
}