import { cMap } from "../Data/Map";

/** 图片拼接数值 控件 */
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class imgNum extends m4m.framework.behaviour2d {
    public static NumsMap: { [name: string]: cMap<m4m.framework.sprite> } = {};

    /** 素材的模板对象 */
    @m4m.reflect.Field("reference", null, "image2D")
    public template: m4m.framework.image2D;

    /** 排列间隔 （默认23 ，一般取 0-9 中像素最宽的值） */
    @m4m.reflect.Field("number")
    public gap = 23;
    public shellLayoutState = m4m.framework.layoutOption.V_CENTER | m4m.framework.layoutOption.LEFT;
    public tranLayoutState = m4m.framework.layoutOption.V_CENTER | m4m.framework.layoutOption.H_CENTER;
    private static iconSprStr: string = ".atlas.json_";

    private assetBundleName: string = "";
    private ImgArr: m4m.framework.image2D[] = [];
    private baseName = "";

    private cacheColor: m4m.math.color = new m4m.math.color(1, 1, 1, 1);

    private inited = false;
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
    private extSupArr: string[] = ["x", "j", "n", "d", "b", "k", "m", "f", "z", "c", "i", "s","o"];
    //                              x    +    -    .    %    k    m    /   折扣   层   第   :   名
    /** 设置 模板对象 sprite 的AssetBundleName （默认情况不用处理 , 读取不到 再考虑设置） */
    public setSpriteAssetBundleName(abName: string) {
        this.assetBundleName = abName;
    }

    /** 设置 值 */
    public setNum(num: number) {
        this.init();
        if (num == undefined || isNaN(num)) { return; }
        // tslint:disable-next-line: newline-per-chained-call
        let str = Math.floor(num).toString();
        this.ckGenimg(str.length);
        this.refreshImgs(str);
    }

    /** 设置 string值 */
    public setStr(str: string) {

        this.init();
        if (str == undefined) { return; }
        // tslint:disable-next-line: newline-per-chained-call
        this.ckGenimg(str.length);
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
        this.template.transform.visible = false;
        //this.setNum(1234567890);
    }

    public update(delta: number) {

    }
    public remove() {
        if (this.ImgArr) {
            this.ImgArr.length = 0;
            this.ImgArr = null;
        }
    }

    private subsIconParse() {
        //后续修改 
        // this.template.transform.name  再用 下面  _spriteName 拼成一个正确的图片集名
        let nameArr = this.template.transform.name.split("_");
        let iconName = nameArr[0];
        //.atlas.json
        this.baseName = (this.template["_spriteName"] as string);
        let index = this.baseName.indexOf(imgNum.iconSprStr);
        if (index != -1) {
            let uiName = this.baseName.substring(0, index + imgNum.iconSprStr.length);
            this.baseName = uiName + iconName;
            // console.error(a);
            // console.error(a + iconName);
        } else {
            console.error("imgNum 组件取图片名出错！");
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
        let numArr = imgNum.NumsMap[`${this.baseName}`] = new cMap();
        if (this.assetBundleName == null) {
            console.error(" atlas 未设置 asset 路径！！");
            return;
        }
        for (let i = 0; i < 10; i++) {
            let sp = assetmgr.getAssetByName(`${this.baseName}${i}`, this.assetBundleName);
            if (!sp) {
                // console.error(`imgNum 组件 sprite 无法获取 : ${this.baseName}${i} ,请检查 模板的配套资源`);
                continue;
            }
            numArr.set(i, sp as m4m.framework.sprite);
        }

        for (let i = 0; i < this.extSupArr.length; i++) {
            let str: string = this.extSupArr[i];
            let sp = assetmgr.getAssetByName(`${this.baseName}${str}`, this.assetBundleName);
            if (!sp) {
                // console.error(`imgNum 组件 sprite 无法获取 : ${this.baseName}${str} ,请检查 模板的配套资源`);
                continue;
            }
            numArr.set(str, sp as m4m.framework.sprite);
        }
    }

    private refreshImgs(str: string) {
        let len = str.length;
        this.ImgArr.forEach((img) => {
            img.transform.visible = false;
        });

        let num = Math.min(len, this.ImgArr.length);
        let www: number = 0;
        for (let i = 0; i < num; i++) {
            let val = str[i];
            let img = this.ImgArr[i];
            img.transform.visible = true;
            if (!img.sprite || img.sprite.getName() != `${this.baseName}${val}`) {
                // console.log(this.baseName);
                let spt = imgNum.NumsMap[`${this.baseName}`].get(val);
                if (!spt || !spt.texture) {
                    img.transform.visible = false;
                    continue;
                }
                img.sprite = spt;
                img.transform.width = img.sprite.rect.w;
                img.transform.height = img.sprite.rect.h;//余群枝新增
                // console.error(`${this.baseName}${val}` + "   " + img.sprite.rect.w + "  :  " + img.sprite.rect.h);
                www += img.transform.width;
                img.transform.markDirty();
            }
        }
        // console.error(str + "   " + len + "   " + (len * this.gap));
        this.transform.width = len * this.gap;
        this.transform.markDirty();
    }

    private ckGenimg(len: number) {
        //暂时处理 后续优化 余群枝
        if (this.ImgArr) {
            this.ImgArr.forEach((img) => {
                img.transform.visible = false;
            });
            this.ImgArr.length = 0;
            this.transform.removeAllChild();
        }
        let needlen = len - this.ImgArr.length;
        if (needlen < 0) { return; }
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
        shell.layoutState = this.shellLayoutState;//opt.V_CENTER | opt.LEFT;
        tran.layoutState = this.tranLayoutState;//opt.V_CENTER | opt.H_CENTER;
        shell.transform.setLayoutValue(opt.LEFT, this.gap * pos);
        shell.addChild(tran);
        return shell;
    }
}
