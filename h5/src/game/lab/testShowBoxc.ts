
@m4m.reflect.nodeComponent
export class testShowBoxc extends m4m.framework.behaviour
{
    bc:m4m.framework.boxcollider;
    public start(){
        this.bc = this.gameObject.getComponent("boxcollider") as m4m.framework.boxcollider;
        if( this.bc ){
             this.bc.colliderVisible = true;
        }
    }
    public onPlay() {

    }
    public update(delta: number) {

    }
    public remove()
    {
        if( this.bc ){
             this.bc.colliderVisible = false;
        }
    }
}    
