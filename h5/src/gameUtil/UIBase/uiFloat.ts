@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiFloat extends m4m.framework.behaviour2d {
    //浮动的图标
    @m4m.reflect.Field("reference", null, "rawImage2D")
    public floatIcon: m4m.framework.rawImage2D;

    //点击按钮
    @m4m.reflect.Field("reference", null, "button")
    public clickBtn: m4m.framework.button;
    private clickTime: number = 0;

    public onPlay() {
        // this.floatIcon.transform.setLayoutValue(m4m.framework.layoutOption.H_CENTER, -640);
        // this.floatIcon.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -200);
        // this.floatIcon.transform.markDirty();
        // this.clickBtn.transform.setLayoutValue(m4m.framework.layoutOption.H_CENTER, -640);
        // this.clickBtn.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -200);
        // this.clickBtn.transform.markDirty();
        // this.clickBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.onClick, this);

        // this.timeCount = 15;
    }

    public update(delta: number) {
        // if (this.testBool) {
        //     this.createBox();
        // } else {
        //     this.clickTime += delta;
        //     // console.error(`[开始计算时间：]   ${this.clickTime}`);
        //     if (this.clickTime <= this.timeCount) {//超过多少5秒

        //         this.floatIcon.transform.visible = false;
        //         this.floatIcon.transform.setLayoutValue(m4m.framework.layoutOption.H_CENTER, -640);
        //         this.floatIcon.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -200);
        //         this.floatIcon.transform.markDirty();

        //         this.clickBtn.transform.visible = false;
        //         this.clickBtn.transform.setLayoutValue(m4m.framework.layoutOption.H_CENTER, -640);
        //         this.clickBtn.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -200);
        //         this.clickBtn.transform.markDirty();
        //     } else {
        //         this.createBox();
        //     }
        // }
    }
    public testFun() {
        // this.testBool = true;
    }

    public setBG() {
        // //设置背景图片
        // this.setIcon(GameMgr.iconPath + "shoppresent.png", this.floatIcon);
    }
    //生成宝箱
    private createBox() {
        // if (this.moveX > 0 && this.moveX < 1) {

        // }

        // this.floatIcon.transform.visible = true;
        // this.clickBtn.transform.visible = true;
        // this.movePosx = this.moveSpeed * this.moveX;
        // this.moveX += 0.5;
        // if (this.moveY < 8) {
        //     this.moveY += 0.5;
        //     this.movePosy = 2;
        // } else if (this.moveY >= 8 && this.moveY < 16) {
        //     this.movePosy = -2;
        //     this.moveY += 0.5;
        // } else {
        //     this.moveY = 0;
        //     this.movePosy = 0;
        // }

        // this.movePosy += this.movePosy;
        // this.floatIcon.transform.setLayoutValue(m4m.framework.layoutOption.H_CENTER, -640 + this.moveSpeed * this.moveX);
        // this.floatIcon.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -200 + this.movePosy);
        // this.floatIcon.transform.markDirty();

        // this.clickBtn.transform.setLayoutValue(m4m.framework.layoutOption.H_CENTER, -640 + this.moveSpeed * this.moveX);
        // this.clickBtn.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -200 + this.movePosy);
        // this.clickBtn.transform.markDirty();

        // if (this.movePosx > 1280) {
        //     // console.error(`[宝箱：]超出屏幕隐藏`);
        //     this.floatIcon.transform.visible = false;

        //     this.floatIcon.transform.setLayoutValue(m4m.framework.layoutOption.H_CENTER, -640);
        //     this.floatIcon.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -200);
        //     this.floatIcon.transform.markDirty();

        //     this.clickBtn.transform.visible = false;

        //     this.clickBtn.transform.setLayoutValue(m4m.framework.layoutOption.H_CENTER, -640);
        //     this.clickBtn.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -200);
        //     this.clickBtn.transform.markDirty();
        //     this.clickTime = 0;
        //     this.movePosx = 0;
        //     this.moveX = 0;
        //     // console.error(`[计时时间：]${this.clickTime}`);
        // }
    }
    //点击了图标
    private onClick() {

        // this.timeCount = hsUtil.RandRange(15, 25, true);//从15-25之间取一个随机整数
        // console.error(`[刷宝箱时间间隔：]${this.timeCount}`);
        // TryUseTool.BuildTryUse();
        // // treasureChestPage.setluckyIconShow(false);//礼包屏蔽
        // // treasureChestPage.playAnimation();
        // this.floatIcon.transform.visible = false;
        // this.clickBtn.transform.visible = false;
        // this.clickTime = 0;
        // this.movePosx = 0;
        // this.moveX = 0;

    }

    private setIcon(src: string, icon: m4m.framework.rawImage2D) {
        // commTool.loaderTextureFun(src, (_tex) => {
        //     icon.image = _tex;
        //     icon.transform.markDirty();
        //     // icon.color = new m4m.math.color(1, 1, 1, 1);
        // });
    }
}
