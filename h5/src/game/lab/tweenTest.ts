
@m4m.reflect.nodeComponent
export class tweenTest extends m4m.framework.behaviour
{
    public onPlay() {

    }

    private count = 0;
    dis = -10;
    over = false;
    public update(delta: number) {
        if(this.over) return;
        this.count += delta * 0.3;
        this.count = m4m.math.floatClamp(this.count,0,1);
        if(this.count > 1) 
             this.over = true;
        let  tran = this.gameObject.transform;
        // if(this.count <= 0.5){
        //     let mth = m4m.framework.tweenMethod.CubicEaseIn;
        //     tran.localTranslate.x = m4m.framework.tweenUtil.GetEaseProgress(mth,this.count *2) * this.dis/2;

        // }else{
        //     let mth = m4m.framework.tweenMethod.CubicEaseOut;
        //     tran.localTranslate.x = m4m.framework.tweenUtil.GetEaseProgress(mth, (this.count * 2) - 1 ) * this.dis/2 + this.dis/2;
        // }

        tran.localTranslate.x = this.tween(this.count , this.dis);
        tran.localTranslate = tran.localTranslate;
    }

    tween(p,dis){
        let mth, tp ,len;
        if(p <= 0.5){
            mth =  m4m.framework.tweenMethod.CubicEaseIn;
            tp = p * 2;
            return m4m.framework.tweenUtil.GetEaseProgress(mth,tp) * dis/2;
        }else{
            mth =  m4m.framework.tweenMethod.CubicEaseOut;
            tp = p * 2 -1;
            return m4m.framework.tweenUtil.GetEaseProgress(mth,tp) * dis/2 +  dis/2;
        }
    }

    public remove()
    {
        
    }
}    
