
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiImageSlider extends m4m.framework.behaviour2d {
    @m4m.reflect.Field("reference", null, "scrollRect")
    public scrollRect: m4m.framework.scrollRect;

    @m4m.reflect.Field("reference", null, "transform2D")
    public content: m4m.framework.transform2D;

    @m4m.reflect.Field("reference", null, "transform2D")
    public imageTrans: m4m.framework.transform2D;

    @m4m.reflect.Field("reference", null, "transform2D")
    public imageBgTrans: m4m.framework.transform2D;

    private defIconHeight: number = 0;
    private defYY: number = 0;

    //可移动区间值
    private moveInterval: number = 0;

    private imageMoveInterval: number = 0;
    public onPlay() {
        this.scrollRect.onMoveFun = this.onMoveFun.bind(this);
        this.defIconHeight = this.imageTrans.height;
        if (this.imageTrans) {
            this.defYY = this.imageTrans.localTranslate.y;
        }
    }
    //设置 滑动区域大小 完成
    public setContentEnd() {
        if (this.content) {
            this.content.localTranslate.y = 0;//便于计算 切换滑动内容时先置顶

            this.moveInterval = this.content.height - this.scrollRect.transform.height;
            if (this.moveInterval > 10) {
                this.imageTrans.visible = true;
                if (this.imageBgTrans) {
                    this.imageBgTrans.visible = true;
                }
                let percentage: number = this.scrollRect.transform.height / this.content.height;
                if (percentage < 0.2) {
                    percentage = 0.2;
                }
                this.imageTrans.height = this.defIconHeight * percentage;
                this.imageTrans.localTranslate.y = this.defYY;
                this.imageTrans.markDirty();

                this.imageMoveInterval = this.defIconHeight - this.imageTrans.height;

                this.onMoveFun(0, 1);
            } else {
                this.imageTrans.visible = false;
                if (this.imageBgTrans) {
                    this.imageBgTrans.visible = false;
                }
            }
        }

    }

    private onMoveFun(x, y) {
        // console.warn(x+"  滑动区域  "+y);
        if (y != 0) {
            if (this.moveInterval > 0) {
                if (this.content && this.imageTrans) {
                    let proNum: number = Math.abs(this.content.localTranslate.y / this.moveInterval);
                    // console.warn(proNum + "   " + this.content.localTranslate.y + "   ++  " + this.content.height);

                    this.imageTrans.localTranslate.y = this.defYY + this.imageMoveInterval * proNum;
                    this.imageTrans.markDirty();
                }
            }
        }
    }
}