import { GameMgr } from "../../GameMgr";

@m4m.reflect.node2DComponent
export class imgNum extends m4m.framework.behaviour2d {
    static NumsMap: { [name: string]: m4m.framework.sprite[] } = {};
    private ImgArr: m4m.framework.image2D[] = [];

    @m4m.reflect.Field("reference", null, "image2D")
    template: m4m.framework.image2D;

    @m4m.reflect.Field("number")
    gap = 23;
    private baseName = "";
    setNum(num: number) {
      
        this.init();
        if (num == undefined || isNaN(num)) return;
        let str = Math.floor(num).toString();
        this.ckGenimg(str.length);
        this.refreshImgs(str);
    }

    private cacheColor: m4m.math.color = new m4m.math.color(1, 1, 1, 1);
    setColor(color: m4m.math.color) {
        if (!color) return;
        m4m.math.colorClone(color, this.cacheColor);
        this.ImgArr.forEach(img => {
            if (img) {
                m4m.math.colorClone(color, img.color);
                img.transform.markDirty();
            }
        });
    }

    public onPlay() {
        this.template.transform.visible = false;
        //this.setNum(1234567890);
    }

    private inited = false;
    private init() {

        if (this.inited) return;
        /* this.baseName = (this.template["_spriteName"] as string);
         this.baseName = this.baseName.substring(0, this.baseName.length - 1);
 
         let assetmgr = GameMgr.assetMgr;
         this.numImgToMap(assetmgr);*/
        this.subsIconParse();
        this.inited = true;
    }
    public subsIconParse() {
        this.baseName = (this.template["_spriteName"] as string);
        this.baseName = this.baseName.substring(0, this.baseName.length - 1);
        let assetmgr = GameMgr.assetMgr;
        this.numImgToMap(assetmgr);
    }

    private numImgToMap(assetmgr: m4m.framework.assetMgr) {
        if (this.baseName == "") return;
        let numArr = imgNum.NumsMap[`${this.baseName}`] = [];
        for (let i = 0; i < 10; i++) {
            let sp = assetmgr.getAssetByName(`${this.baseName}${i}`);
            numArr.push(sp);
        }
    }

    private refreshImgs(str: string) {
        let len = str.length;
        this.ImgArr.forEach(img => {
            img.transform.visible = false;
        });

        let num = Math.min(len, this.ImgArr.length);
        for (let i = 0; i < num; i++) {
            let val = Number(str[i]);
            let img = this.ImgArr[i];
            img.transform.visible = true;
            if (!img.sprite || img.sprite.getName() != `${this.baseName}${val}`) {
                let spt = imgNum.NumsMap[`${this.baseName}`][val];
                if (!spt || !spt.texture) {
                    img.transform.visible = false;
                    continue;
                }
                img.sprite = spt;
                img.transform.width = img.sprite.rect.w;
                img.transform.markDirty();
            }
        }

        this.transform.width = len * this.gap;
        this.transform.markDirty();
    }

    private ckGenimg(len: number) {
        let needlen = len - this.ImgArr.length;
        if (needlen < 0) return;
        let opt = m4m.framework.layoutOption;
        for (let i = len - needlen; i < len; i++) {
            let imgtran = this.template.transform.clone();
            this.transform.addChild(this.addShell(imgtran, i));
            let img = imgtran.getComponent("image2D") as m4m.framework.image2D;
            m4m.math.colorClone(this.cacheColor, img.color);
            this.ImgArr.push(img);
        }
    }

    private addShell(tran: m4m.framework.transform2D, pos: number) {
        let opt = m4m.framework.layoutOption;
        let shell = new m4m.framework.transform2D();
        shell.width = this.gap;
        shell.layoutState = opt.V_CENTER | opt.LEFT;
        tran.layoutState = opt.V_CENTER | opt.H_CENTER;
        shell.transform.setLayoutValue(opt.LEFT, this.gap * pos);
        shell.addChild(tran);
        return shell;
    }

    public update(delta: number) {

    }
    public remove() {

    }
}    
