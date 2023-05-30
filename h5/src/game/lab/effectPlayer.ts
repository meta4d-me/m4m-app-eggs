
@m4m.reflect.nodeComponent
export class effectPlayer extends m4m.framework.behaviour
{
    public onPlay() {
        let effect = this.gameObject.getComponent(m4m.framework.f14EffectSystem.name) as m4m.framework.f14EffectSystem;
        if(effect){
            effect.play();
            console.error(`beloop : ${effect.data.beloop} `);
            effect.data.beloop = true;

        }

    }
    public update(delta: number) {

    }
    public remove()
    {
        
    }
}    
