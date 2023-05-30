@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiSpring extends m4m.framework.behaviour2d {

    private num: number = 0;
    private addNum: number = 0;
    private isright = true;
    public onPlay() {
        this.addNum = 1;
    }
    public update(delta: number) {
        if (this.transform == null || !this.transform.visible) { return; }
        this.transform.localTranslate.x += this.addNum;
        this.transform.markDirty();
        this.num += this.addNum;
        // if (this.isright) {
        if (this.num >= 30) {
            this.addNum = -1;
        } else if (this.num <= 0) {
            this.addNum = 1;
        }
        // } else {
        //     if (this.num <= -30) {
        //         this.addNum = 1;
        //     } else if (this.num >= 0) {
        //         this.addNum = -1;
        //     }
        // }
    }
    public setLeft() {
        this.isright = false;
        this.num = 0;
    }
    public remove() {
    }
}
