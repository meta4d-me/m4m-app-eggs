import { cMap } from "../Data/Map";

/** 新图片拼接数值 控件 */
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class imgSpriteArrange extends m4m.framework.behaviour2d {
    //*****************为不影响原组件功能 新起一个组件 后续完整后替掉原组件*************************
    public NumsMap: cMap<m4m.framework.sprite> = new cMap();

    /** 素材的模板对象 */
    @m4m.reflect.Field("reference", null, "image2D")
    public template: m4m.framework.image2D;

    public gap = 0;//排列图片之间的间距 默认0
    private static iconSprStr: string = ".atlas.json_";
    /*
    s=：
    b=%
    c=层
    d=.
    x=×
    i=第
    j=+
    n=-
    k=千
    m=万
    f=/
    z=折
    */
    private static extSupArr: string[] = ["x", "j", "n", "d", "b", "k", "m", "f", "z", "c", "i", "s","o","w","t","h"];
    //                                     x    +    -    .    %    k    m    /   折扣   层   第   :   名  ~   D   H

    private assetBundleName: string = "";
    private ImgArr: m4m.framework.image2D[] = [];
    private baseName = "";

    private cacheColor: m4m.math.color = new m4m.math.color(1, 1, 1, 1);

    private inited = false;
    // /** 设置 模板对象 sprite 的AssetBundleName （默认情况不用处理 , 读取不到 再考虑设置） */
    // public setSpriteAssetBundleName(abName: string) {
    //     this.assetBundleName = abName;
    // }

    /** 设置 值 */
    public setNum(num: number) {

        this.init();
        if (num == undefined || isNaN(num)) { return; }
        // tslint:disable-next-line: newline-per-chained-call
        let str = Math.floor(num).toString();
        // this.ckGenimg(str.length);
        this.refreshImgs(str);
    }

    /** 设置 string值 */
    public setStr(str: string) {

        this.init();
        if (str == undefined) { return; }
        // tslint:disable-next-line: newline-per-chained-call
        // this.ckGenimg(str.length);
        this.refreshImgs(str);
    }
    /** 设置 颜色 */
    public setColor(color: m4m.math.color) {
        if (!color) { return; }
        m4m.math.colorClone(color, this.cacheColor);
        this.ImgArr.forEach((img) => {
            if (img) {
                m4m.math.colorClone(color, img.color);
                img.transform.markDirty();
            }
        });
    }

    public onPlay() {
        // this.template.transform.visible = false;
        //this.setNum(1234567890);
    }

    public update(delta: number) {

    }
    public remove() {
        if (this.ImgArr) {
            this.ImgArr.length = 0;
            this.ImgArr = null;
        }
        this.NumsMap.clear();
    }

    private subsIconParse() {
        let nameArr = this.template.transform.name.split("_");
        let iconName = nameArr[0];
        //.atlas.json
        this.baseName = (this.template["_spriteName"] as string);
        let index = this.baseName.indexOf(imgSpriteArrange.iconSprStr);
        if (index != -1) {
            let uiName = this.baseName.substring(0, index + imgSpriteArrange.iconSprStr.length);
            this.baseName = uiName + iconName;
            // console.error(a);
            // console.error(a + iconName);
        } else {
            console.error("imgSpriteArrange 组件取图片名出错！");
            return;
        }
        let lastOne = this.baseName[this.baseName.length - 1];
        this.baseName = isNaN(Number(lastOne)) ? this.baseName : this.baseName.substring(0, this.baseName.length - 1);
        let assetmgr = m4m.framework.sceneMgr.app.getAssetMgr();
        this.numImgToMap(assetmgr);
    }
    private init() {

        if (this.inited) { return; }
        /* this.baseName = (this.template["_spriteName"] as string);
         this.baseName = this.baseName.substring(0, this.baseName.length - 1);
 
         let assetmgr = GameMgr.assetMgr;
         this.numImgToMap(assetmgr);*/
        this.subsIconParse();
        this.inited = true;
    }

    private numImgToMap(assetmgr: m4m.framework.assetMgr) {
        if (this.baseName == "") { return; }
        // if (this.assetBundleName == null) {
        //     console.error(" atlas 未设置 asset 路径！！");
        //     return;
        // }
        this.NumsMap.clear();
        for (let i = 0; i < 10; i++) {
            let sp = assetmgr.getAssetByName(`${this.baseName}${i}`, this.assetBundleName);
            if (!sp) {
                // console.error(`imgNum 组件 sprite 无法获取 : ${this.baseName}${i} ,请检查 模板的配套资源`);
                continue;
            }
            this.NumsMap.set(i, sp as m4m.framework.sprite);
        }

        for (let i = 0; i < imgSpriteArrange.extSupArr.length; i++) {
            let str: string = imgSpriteArrange.extSupArr[i];
            let sp = assetmgr.getAssetByName(`${this.baseName}${str}`, this.assetBundleName);
            if (!sp) {
                // console.error(`imgNum 组件 sprite 无法获取 : ${this.baseName}${str} ,请检查 模板的配套资源`);
                continue;
            }
            this.NumsMap.set(str, sp as m4m.framework.sprite);
        }
    }

    private refreshImgs(str: string) {
        this.ImgArr.forEach((img) => {
            img.transform.visible = false;
        });

        // this.gap = 1;

        let num = str.length;
        let ww: number = 0;
        let hh: number = 0;//暂时用和图片一样高度处理 如果有特殊情况再修改
        let pos: number = 0;
        for (let i = 0; i < num; i++) {
            let val = str[i];
            let img = this.ImgArr[i];
            if (img == null) {
                let imgtran = this.template.transform.clone();
                imgtran.layoutState = m4m.framework.layoutOption.V_CENTER | m4m.framework.layoutOption.LEFT;
                this.transform.addChild(imgtran);
                img = imgtran.getComponent("image2D") as m4m.framework.image2D;
                this.ImgArr.push(img);
            }
            img.transform.visible = true;
            if (!img.sprite || img.sprite.getName() != `${this.baseName}${val}`) {
                // console.log(this.baseName);
                let spt = this.NumsMap.get(val);
                if (!spt || !spt.texture) {
                    console.error(`图片数据未取到！${this.baseName}${val}`);
                    continue;
                }
                img.sprite = spt;
                img.transform.width = img.sprite.rect.w;
                img.transform.height = img.sprite.rect.h;//余群枝新增
                hh = img.transform.height;
            }

            img.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, pos);
            // img.transform.setLayoutValue(m4m.framework.layoutOption.V_CENTER, 0);
            img.transform.markDirty();
            let arrangeW;
            if (i == num - 1) {
                arrangeW = img.transform.width;
            } else {
                arrangeW = img.transform.width + this.gap;
            }
            pos += arrangeW;
            ww = pos;
            // console.error(pos + ` ${this.baseName}${val}` + "   " + img.sprite.rect.w + "  :  " + img.sprite.rect.h);
        }
        // console.error(ww);
        this.transform.width = ww;
        this.transform.height = hh;
        this.transform.markDirty();
    }

    // private ckGenimg(len: number) {
    //     //暂时处理 后续优化 余群枝
    //     if (this.ImgArr) {
    //         this.ImgArr.forEach((img) => {
    //             img.transform.visible = false;
    //         });
    //         this.ImgArr.length = 0;
    //         this.transform.removeAllChild();
    //     }
    //     let needlen = len - this.ImgArr.length;
    //     if (needlen < 0) { return; }
    //     let opt = m4m.framework.layoutOption;
    //     for (let i = len - needlen; i < len; i++) {
    //         let imgtran = this.template.transform.clone();
    //         this.transform.addChild(this.addShell(imgtran, i));
    //         let img = imgtran.getComponent("image2D") as m4m.framework.image2D;
    //         m4m.math.colorClone(this.cacheColor, img.color);
    //         this.ImgArr.push(img);
    //     }
    // }

    // private addShell(tran: m4m.framework.transform2D, pos: number) {
    //     let opt = m4m.framework.layoutOption;
    //     let shell = new m4m.framework.transform2D();
    //     shell.width = this.gap;
    //     shell.layoutState = this.shellLayoutState;//opt.V_CENTER | opt.LEFT;
    //     tran.layoutState = this.tranLayoutState;//opt.V_CENTER | opt.H_CENTER;
    //     shell.transform.setLayoutValue(opt.LEFT, this.gap * pos);
    //     shell.addChild(tran);
    //     return shell;
    // }
}
