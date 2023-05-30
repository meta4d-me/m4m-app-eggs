import { obsCreateMgr } from "../obsCreateMgr";

@m4m.reflect.nodeComponent
export class testObs extends m4m.framework.behaviour
{
    @m4m.reflect.Field('reference', null, "transform")
    public transform1: m4m.framework.transform;
    @m4m.reflect.Field('reference', null, "transform")    
    public transform2: m4m.framework.transform;    


    public onPlay() {
        obsCreateMgr.init(this.transform1, this.transform2);
        for(let i = 0; i < 25; i++) {
            let t = obsCreateMgr.getObs(i);
            this.gameObject.transform.scene.addChild(t);
        }

    }
    public update(delta: number) {

    }
    public remove()
    {
        
    }
}    
