import { PlatformUtil, SystemQualityType } from "../Tools/PlatformUtil";

@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiBtnDown extends m4m.framework.behaviour2d {
    public scaleList: m4m.framework.transform2D[] = [];

    //当前点到的Trans停下的时间
    public currentPauseTime: number = 0;
    // 当前点到的Trans暂停
    public currentIspause: boolean = false;
    public currentScalNum: number = 0.5;
    //当前点到的trans
    public currentTrans: m4m.framework.transform2D;
    public pauseTime: number = 0;
    // 暂停
    public ispause: boolean = false;
    public ScalNum: number = 0.12;
    public maxScaleNum: number = 1.05;
    private scaleUp: boolean = true;
    //当前缩放比例
    private nowScaleNum: number = 1;
    public onPlay() {
    }
    public update(delta: number) {
        if (PlatformUtil.systemQuality == SystemQualityType.low) {
            //低端机无动画
            return;
        }
        if (this.currentTrans) {
            if (this.currentIspause) {
                this.currentPauseTime += delta;
                if (this.currentPauseTime >= 0.12) {
                    this.currentPauseTime = 0;
                    this.currentIspause = false;
                }
            } else {
                let _deltaNum = this.currentScalNum * delta;
                if (_deltaNum > 0.04) {
                    _deltaNum = 0.04;
                }
                this.currentTrans.localScale.x -= _deltaNum;
                this.currentTrans.localScale.y -= _deltaNum;
                this.currentTrans.markDirty();
                if (this.currentTrans.localScale.x <= 1) {
                    this.currentTrans.localScale.x = 1;
                    this.currentTrans.localScale.y = 1;
                    this.currentTrans.markDirty();
                    if (this.scaleUp) {
                        this.currentTrans = null;
                    }
                }
            }
        }
        if (this.scaleList == null || this.scaleList.length == 0 || this.transform.visible == false) { return; }
        if (this.ispause) {
            this.pauseTime += delta;
            if (this.pauseTime >= 0.15) {
                this.pauseTime = 0;
                this.ispause = false;
            }
            return;
        }

        let deltaNum = this.ScalNum * delta;
        if (deltaNum > 0.04) {
            deltaNum = 0.04;
        }

        if (this.scaleUp) {
            this.nowScaleNum += deltaNum;
            if (this.nowScaleNum >= this.maxScaleNum) {
                this.scaleUp = false;
                this.nowScaleNum = this.maxScaleNum;
                this.ispause = true;
            }
        } else {
            this.nowScaleNum -= deltaNum;
            if (this.nowScaleNum <= 1) {
                this.scaleUp = true;
                this.nowScaleNum = 1;
                this.ispause = true;
            }
        }

        for (let i: number = 0; i < this.scaleList.length; ++i) {
            let trans: m4m.framework.transform2D = this.scaleList[i];
            if (this.currentTrans == trans) {
                //如果当前点到的目标  不做处理
                continue;
            }
            if (trans) {
                trans.localScale.x = this.nowScaleNum;
                trans.localScale.y = this.nowScaleNum;
                trans.markDirty();
            }
        }

    }
    public remove() {

    }
}
