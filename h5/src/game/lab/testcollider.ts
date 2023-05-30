
@m4m.reflect.nodeComponent
export class testcollider extends m4m.framework.behaviour
{
    @m4m.reflect.Field("reference",null,"boxcollider")
    collider:m4m.framework.boxcollider;

    MyC:m4m.framework.boxcollider;

    isstrat = false;
    public start (){
        this.isstrat = true;
    }
    public onPlay() {
        this.isstrat;
        debugger;
        let c = this.gameObject.getComponent("boxcollider") as m4m.framework.boxcollider;
        if(!c){
            this.gameObject.addComponent("boxcollider");
        }
        this.MyC = c;

        if(this.MyC && this.collider){
            this.MyC.colliderVisible = true;
            this.collider.colliderVisible = true;
            // console.error(`collider ${this.collider.size.toString()}  MyC ${this.MyC.size.toString()}`)
        }

    }
    public update(delta: number) {
        if(!this.collider || !this.MyC) return;

        if(this.collider.intersectsTransform(this.gameObject.transform)){
            console.error(` 碰到了 ${this.collider.gameObject.transform.name} !!!`);
        }
    }
    public remove()
    {
        
    }
}    
