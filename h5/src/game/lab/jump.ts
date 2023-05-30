
@m4m.reflect.nodeComponent
export class jump extends m4m.framework.behaviour
{
    private g = -9.8;
    public v = 0;
    private baseHeight = 0;
    public onPlay() {
        this.baseHeight = this.gameObject.transform.localTranslate.y;
        this.v = 2;
    }
    public update(delta: number) {
        this.v += this.g * delta;
        let tran = this.gameObject.transform;
        let cur = tran.localTranslate.y + this.v;
        if(cur > this.baseHeight) {
            tran.localTranslate.y += this.v;
            tran.localTranslate = tran.localTranslate;
        } else {
            this.v = -this.v * 0.5;
            if(this.v < 0.1) {
                this.v = 0;
                this.g = 0;
            }
            tran.localTranslate.y = this.baseHeight;            
        }

    }
    public jump(v) {
        this.g = -9.8;
        this.v = v;
    }
    public remove()
    {
        
    }
}    
