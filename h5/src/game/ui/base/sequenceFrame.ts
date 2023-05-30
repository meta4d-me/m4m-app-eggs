/** 序列帧动画 */
@m4m.reflect.node2DComponent
export class sequenceFrame extends m4m.framework.behaviour2d
{
    /** 是否循环播放 */
    isLoop = false;
    /** 播放速度 f/s (帧每秒)*/
    playSpeed = 24;
    private sps : m4m.framework.sprite[] = [];
    private isStop = true;
    private img: m4m.framework.image2D;
    private currF = 0;
    public onPlay() {
        this.init();
    }

    private inited = false;
    private init(){
        if(this.inited) return;
        let img = this.transform.getComponent("image2D") as m4m.framework.image2D;
        if(!img || !img.sprite)    return;

        let assetmgr = this.transform.canvas.assetmgr;
        if(!assetmgr) return;
        let atles_ = assetmgr.getAssetByName(img.sprite.atlas) as m4m.framework.atlas;
        for(let key in atles_.sprites){
            let sp = atles_.sprites[key];
            if(sp)
                this.sps.push(sp);
        }
        this.img = img;
        this.inited = true;
    }

    play(){
        if(!this.isStop)return;
        this.transform.visible = true;
        this.isStop = false;
    }

    stop(){
        if(this.isStop)return;
        this.transform.visible = false;
        this.isStop = true;
        this.currF = 0;
        this.Fcount = 1;
        this.allCount = 0;
    }

    private allCount = 0;
    private Fcount = 1;
    public update(delta: number) {
        if(this.isStop) return;
        this.init();
        if(!this.inited ) return;
        let num = this.playSpeed * delta;
        this.Fcount += num;
        this.allCount += num;
        if(this.Fcount < 1) return;
        this.Fcount = this.Fcount - 1;
        let sp = this.sps[this.currF % this.sps.length]
        this.img.sprite = sp;
        //检查 是否循环了一轮
        let loopNum = Math.floor(this.allCount /  this.sps.length);
        if(!this.isLoop && loopNum >= 1){
            this.stop();
        }
        this.currF ++;
    }
    
    public remove() {
        
    }
}
