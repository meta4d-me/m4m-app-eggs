
@m4m.reflect.nodeComponent
export class Trailer extends m4m.framework.behaviour
{
    static LateUpdateMgr : any;
    private texName = "t.png";
    mat:m4m.framework.material;
    private rePlay = false;
    private trailrender : m4m.framework.trailRender; 
    private isOnplay = false;
    private Cupdate : (d:number) => any;
    public onPlay() {
        if(!this.mat){
            console.error(`Trailer comp init error mat is null`);
            return;
        }
        let trailrender = this.gameObject.addComponent("trailRender") as m4m.framework.trailRender;
        let app = m4m.framework.sceneMgr.app;
        trailrender.setspeed(0.56);
        trailrender.setWidth(0.3);
        trailrender.material = this.mat;
        trailrender.lookAtCamera=false;
        trailrender.extenedOneSide=false;
        trailrender.color = new m4m.math.color(1,1,1,1);
        trailrender.isAlphaGradual = true;
         this.isOnplay = true;
        // this.Cupdate = trailrender.update;
        // trailrender.update = (d:number)=>{ };
        // if(Trailer.LateUpdateMgr && this.Cupdate){
        //     Trailer.LateUpdateMgr.Add(this.Cupdate,trailrender);
        // }
        this.trailrender = trailrender;
    }
    play(){
        this.rePlay = true;
    }

    stop(){
        if(this.trailrender)
            this.trailrender.stop();
    }

    public update(delta: number) {
        if(this.rePlay && this.isOnplay){
            this.trailrender.play();
            this.rePlay = false;
        }
    }
    public remove()
    {
        //
        if(Trailer.LateUpdateMgr && this.Cupdate){
            Trailer.LateUpdateMgr.Remove(this.Cupdate,this.trailrender);
        }
    }
}    
