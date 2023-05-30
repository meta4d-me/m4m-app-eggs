import { commTool } from "../Tools/commTool";

@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiRoll extends m4m.framework.behaviour2d {

    //波浪图
    @m4m.reflect.Field("reference", null, "transform2D")
    public bgPan1: m4m.framework.transform2D;

    @m4m.reflect.Field("reference", null, "transform2D")
    public bgPan2: m4m.framework.transform2D;

    @m4m.reflect.Field("reference", null, "rawImage2D")
    public bg1: m4m.framework.rawImage2D;

    @m4m.reflect.Field("reference", null, "rawImage2D")
    public bg2: m4m.framework.rawImage2D;
    public onLoaded: Function;
    private bgArr: m4m.framework.transform2D[];
    private moveSpeed: number = 50;

    public onPlay() {
        // debugger;
        this.bgArr = [this.bgPan1, this.bgPan2];
        //设置滚动背景宽度 
        let p = this.bgPan1.parent;
        if (this.bgPan1.width < p.width) {  //当小于 初始宽度时 
            // let rate = this.handle.bgPan1.width / p.width;
            let rate = p.width / this.bgPan1.width;
            this.bgPan1.width = p.width;
            this.bgPan2.width = p.width;
            //处理缩放 避免拉升变形
            this.bgPan1.height *= rate;
            this.bgPan2.height *= rate;
        }

        let opt = m4m.framework.layoutOption;
        this.bgPan1.setLayoutValue(opt.LEFT, 0);
        this.bgPan1.markDirty();
        this.bgPan2.setLayoutValue(opt.LEFT, this.bgArr[0].width);
        this.bgPan2.markDirty();
    }
    public update(delta: number) {
        let w = this.bgArr[0].width;
        //滚动背景
        let opt = m4m.framework.layoutOption;
        let pos = this.bgArr[0].getLayoutValue(opt.LEFT);

        // if(pos<=-1280){
        if (pos <= -w) {
            let a = this.bgArr.shift();
            this.bgArr.push(a);
            this.bgArr[0].setLayoutValue(opt.LEFT, 0);
            this.bgArr[1].setLayoutValue(opt.LEFT, w);
        }
        for (let i = 0, len = this.bgArr.length; i < len; ++i) {
            this.bgArr[i].setLayoutValue(opt.LEFT, this.bgArr[i].getLayoutValue(opt.LEFT) - this.moveSpeed * delta);
            this.bgArr[i].markDirty();
        }

    }

    public setBG(TexPath: string) {
        //设置背景图片
        // this.setBg(GameMgr.TexPath + "loadTipbg.jpg", this.bg1, this.bg2);
        this.setBg(TexPath + "loadTipbg.jpg", this.bg1, this.bg2);
    }
    public remove() {

    }
    //设置背景波浪图
    // private LoadBg() {
    //     this.setBg(GameMgr.TexPath + "loadTipbg.jpg", this.bg1,this.bg2);
    // }
    private setBg(src: string, icon: m4m.framework.rawImage2D, icon1: m4m.framework.rawImage2D) {
        commTool.loaderTextureFun(src, (_tex) => {
            icon.image = _tex;
            icon1.image = _tex;
            icon.color = new m4m.math.color(1, 1, 1, 1);
            icon1.color = new m4m.math.color(1, 1, 1, 1);
            if (this.onLoaded) {
                this.onLoaded();
            }
        });

    }

}