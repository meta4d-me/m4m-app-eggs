
@m4m.reflect.nodeComponent
export class coin extends m4m.framework.behaviour
{
    trans: m4m.framework.transform;
    baseHeight: number;
    public onPlay() {
        this.gameObject.visible = true;        
        this.trans = this.gameObject.transform;
        this.baseHeight = this.trans.localTranslate.y;
    }
    public update(delta: number) {
        this.roll(delta);
        if(this.isFlying)
            this.fly(delta);
    }

    rollingSpeed = 0.6; // RPS
    rollingTheta = this.rollingSpeed * 360;
    eular = 180;
    roll(delta: number) {
        this.eular += this.rollingTheta * delta;
        m4m.math.quatFromEulerAngles(-90, this.eular, 180, this.trans.localRotate);
        this.trans.localRotate = this.trans.localRotate;
    }

    flyDistance = 8;
    flyTime = 0.2;
    flySpeed = this.flyDistance / this.flyTime;
    flyTimer = 0;
    isFlying = false;
    fly(delta: number) {
        if(this.flyTimer < this.flyTime) {
            this.trans.localTranslate.y += this.flySpeed * delta;
            this.flyTimer += delta;
        } else {
            // reset
            this.gameObject.visible = false;
            this.isFlying = false;
            this.flyTimer = 0;
            this.trans.localTranslate.y = this.baseHeight;
        }
    }
    public remove()
    {

    }
}
