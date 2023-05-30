@m4m.reflect.node2DComponent
export class ScrollRectExtend extends m4m.framework.behaviour2d {
    public scrollRect: m4m.framework.scrollRect;
    public offsetUpY: number = 0;
    public offsetDownY: number = 0;
    private _list: any[];
    private worldPos: m4m.math.vector2;
    private worldEndPos: m4m.math.vector2;
    public onPlay() {
        //
        this.scrollRect = this.transform.getComponent("scrollRect") as m4m.framework.scrollRect;
        if (this.scrollRect == null) {
            console.error("当前scrollRect 组件未找到！");
            return;
        }
        this.scrollRect.onMoveFun = this.onMoveFun.bind(this);
        this.worldPos = this.transform.getWorldTranslate();
        if (this.scrollRect.horizontal) {//水平
            this.worldEndPos = new m4m.math.vector2(this.worldPos.x + this.transform.width, this.worldPos.y);
        } else {
            this.worldEndPos = new m4m.math.vector2(this.worldPos.x, this.worldPos.y + this.transform.height);
        }
        this.upDateTrans();
    }

    public setList(list: any[]) {
        this._list = list;
    }

    public upDateTrans() {
        this.onMoveFun();
    }
    private onMoveFun() {
        // console.error("滑动 " + x + "   " + y);
        if (this._list != null && this.worldPos) {
            for (let i = 0; i < this._list.length; i++) {
                let cell = this._list[i];
                let cellTrans: m4m.framework.transform2D = cell.transform;
                let cellPos: m4m.math.vector2 = cellTrans.getWorldTranslate();
                if (this.scrollRect.horizontal) {//水平
                    if ((cellPos.x + this.offsetUpY) > this.worldPos.x && (cellPos.x - this.offsetDownY) < this.worldEndPos.x) {
                        cellTrans.visible = true;
                    } else {
                        cellTrans.visible = false;
                    }
                } else {
                    if ((cellPos.y + this.offsetUpY) > this.worldPos.y && (cellPos.y - this.offsetDownY) < this.worldEndPos.y) {
                        cellTrans.visible = true;
                    } else {
                        cellTrans.visible = false;
                    }
                }
            }
        }
    }
}