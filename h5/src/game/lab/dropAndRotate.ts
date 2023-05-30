
@m4m.reflect.node2DComponent
export class dropAndRotate extends m4m.framework.behaviour2d
{
    //金币
    @m4m.reflect.Field("reference", null, "image2D")
    coin: m4m.framework.image2D;

    baseValue = 0;
    vCenterOffset = 0;

    public onPlay() {
        // 获取初始值
        this.baseValue = this.coin.transform.getLayoutValue(m4m.framework.layoutOption.V_CENTER);
        this.play();

    }
    public update(delta: number) {
        this.falling(delta);
        this.rotate(delta);
        this.scale(delta);
    }
    public remove() {
        
    }

    timeRange = [500, 2000];
    play() {
        this.isFalling = true;
        this.v = 0;
        this.vCenterOffset = 0;
    }

    lastCircle = null;

    private isFalling = false;
    private g = 10000;
    private maxV = 10000;
    private v = 0;
    private falling(delta: number) {
        if(!this.isFalling) return;
        this.v += this.g * delta;
        // this.v = Math.min(this.v, this.maxV);
        let coin = this.coin.transform;
        this.vCenterOffset += this.v * delta;
        if(this.baseValue + this.vCenterOffset > 0) {
            // 下落结束
            this.isFalling = false;
            this.vCenterOffset = -this.baseValue;
            this.isRotating = true;
            this.isScale = true;
        }
        coin.setLayoutValue(m4m.framework.layoutOption.V_CENTER, this.baseValue + this.vCenterOffset);
    }

    private isRotating = false;
    private rotateTimer = 0;
    private rotationSpeed = 30;
    private rotate(delta: number) {
        if(!this.isRotating) return;
        this.rotateTimer += delta * this.rotationSpeed;
        if(this.rotateTimer > Math.PI * 3) {
            // 旋转结束
            this.isRotating = false;
            this.rotateTimer = 0;
            if(this.lastCircle) {
                clearTimeout(this.lastCircle);
            }
            this.lastCircle = setTimeout(() => {
                this.play();
            }, this.timeRange[0] + Math.random() * (this.timeRange[1] - this.timeRange[0]));
        }
        this.transform.localRotate = Math.sin(this.rotateTimer) * 0.5;
        this.transform.markDirty();

    }

    private isScale = false;
    private scaleTimer = 0;
    scale(delta: number) {
        if(!this.isScale) return;
        this.scaleTimer += delta * 10;        
        this.transform.localScale.x = this.transform.localScale.y = Math.sin(this.scaleTimer) * 0.2 + 1;
        if(this.scaleTimer > Math.PI) {
            this.isScale = false;
            this.scaleTimer = 0;
        }
    }


}
