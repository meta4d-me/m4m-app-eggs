import { Cell } from "Data/Cell";
// import { TipsToolManager } from "Manager/TipsToolManager";
//通用Cell 可触发tips
@m4m.reflect.node2DComponent
export class CommonCell extends Cell {

    public pointerDownFun() {
        // console.error(this.cellData.data);
        if (this.cellData.showTip) {//如果需要显示
            let worldPos = this.transform.getWorldTranslate();
            // TipsToolManager.Instance.pos = worldPos;
            // TipsToolManager.Instance.cellWidth = this.cellData.width;
            // TipsToolManager.Instance.cellHeight = this.cellData.height;
            // // console.error("如果需要显示Tips");
            // TipsToolManager.Instance.ShowItemTips(this.cellData.data);
        }
    }
}