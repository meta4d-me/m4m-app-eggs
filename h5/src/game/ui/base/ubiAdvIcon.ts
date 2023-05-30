import { commTool } from "../../Tool/commTool";
import { wxTool } from "../../Tool/wxTool";

//ubi 广告icon
@m4m.reflect.node2DComponent
export class ubiAdvIcon extends m4m.framework.behaviour2d
{
    static readonly adv_W = 142; //统一尺寸
    static readonly adv_H = 156;
    private icon : m4m.framework.rawImage2D; 
    private intervals : number = 1/24;//24f/s
    private imglist : string[] = [];
    private imgTexs : m4m.framework.texture[] = [];  //序列帧贴图
    private jumptargetAppid : string = ""; //跳转的目标id
    /** 设置icon 通过获取 的数据
     * res.id   跳转的appID 
     * res.frames  序列图存放CDN URL
     * res.name  帧图 序列前缀
     * res.count 帧数量
     * 
     * delay 延迟执行
     */
    setIcon(res:any , delay :number = 0){
        if(!res)return;
        setTimeout(()=>{
            this.dosetIcon(res);
        },delay);
    }

    private dosetIcon(res:any){
        if(!res)return;
        this.playIdx = 0;
        this.currAnimFun = this.swFrame_shake;
        // this.imglist = res.data.imglist;
        this.imglist.length = 0;
        let len = res.count;
        for(let i=0 ;i< len ;i++ ){
            let idx = i <= 9 ? `0${i}`: `${i}`;
            this.imglist.push(`${res.frames}${res.name}${idx}.png`);
        }
        this.jumptargetAppid = res.id;
        this.loadImg();
        //旋转复位
        this.transform.localRotate = 0;
    }

    private loadImg(){
        this.imgTexs.length = 0;
        let count = 0;
        this.imglist.forEach((url,idx)=>{
            wxTool.ImgLoad(url,(tex)=>{
                count++;
                this.imgTexs[idx] = tex;
                if(count >= this.imglist.length){
                    this.chageIconF();
                }
            });
        });
    }

    private currAnimFun : (delta: number)=>any;

    private isShake = true;
    private waitCount = 0;
    private shakeCount = 0;
    private shakeTime = 1;
    private shakeSpeed = 2; //拍动速度
    private tp = 0;
    private angleRange = 30 * Math.PI/180;
    //摇晃动画
    private shakeAnim(delta: number){
        if(this.isShake){
            this.tp += delta * this.shakeSpeed;
            this.tp = this.tp > 1 ? this.tp - 1 : this.tp;
            let angle = 0;
            let tMethod = m4m.framework.tweenMethod;
            if (this.tp <= 0.5) {
                angle = commTool.tweenInOut(this.tp * 2, this.angleRange, tMethod.QuadEaseIn , tMethod.QuadEaseOut);
            } else {
                angle = commTool.tweenInOut((2 - this.tp * 2), this.angleRange , tMethod.QuadEaseIn , tMethod.QuadEaseOut);
            }

            let half = this.angleRange/2;
            let fTemp = angle <= half ? angle - half :  angle - half  ;
            this.shakeCount += delta;
            if(this.shakeCount >= this.shakeTime) {
                this.shakeCount = 0;
                this.tp = 0;
                this.isShake = false;
                fTemp = 0;
            }
            this.transform.localRotate = fTemp;
            this.transform.markDirty();
        }else{
            this.waitCount += delta;
            if(this.waitCount >= this.shakeTime) {
                this.waitCount = 0;
                this.isShake = true;
            }
        }
    }

    private ranimCount = 0;
    //序列帧切换动画
    private swFrameAnim(delta: number){
        this.ranimCount += delta;
        if(this.ranimCount >= this.intervals){
            this.ranimCount = 0;
            this.chageIconF();
        }
    }

    //序列帧切换 + 摇晃动画
    private swFrame_shake(delta: number){
        this.swFrameAnim(delta);
        this.shakeAnim(delta);
    }

    private playIdx = 0;
    //改变icon
    private chageIconF(){
        if(this.imgTexs.length < 1 || !this.icon)return;
        
        let tex = this.imgTexs[this.playIdx];
        this.icon.image = tex;
        this.playIdx ++;
        this.playIdx = this.playIdx % this.imgTexs.length;
    }

    /** icon点击事件回调 */
    onClickIcon : Function;
    public onPlay() {
        //icon init
        let opt = m4m.framework.layoutOption;
        let tran = new m4m.framework.transform2D();
        this.transform.addChild(tran);
        tran.name = "ubi_advert_Img";
        tran.layoutState = opt.TOP | opt.BOTTOM | opt.RIGHT | opt.LEFT;
        this.icon = tran.transform.addComponent("rawImage2D") as m4m.framework.rawImage2D;
        //click
        let btn = this.transform.addComponent("button") as m4m.framework.button;
        btn.addListener(m4m.event.UIEventEnum.PointerDown,()=>{
            wxTool.openMiniPrograme(this.jumptargetAppid,"");
            if(this.onClickIcon){
                this.onClickIcon();
            }
        },this);

    }
    public update(delta: number) {
        if(!this.transform.visible)return;

        if(this.currAnimFun){
            this.currAnimFun(delta);
        }

    }
    public remove() {
        
    }
}    
