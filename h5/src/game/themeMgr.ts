import { GameMgr } from "./GameMgr";
import { MatMgr } from "./MatMgr";
import { Ress } from "./Ress";
import { commTool } from "./Tool/commTool";

export class themeMgr {
    static resoucesPath: string;
    static themes: themeChunk[] = [];
    static newYearThemes: themeChunk;
    static currentTheme = 0;
    static themes_map: Map<number, themeChunk> = new Map();
    static init() {
        let themes = Ress.themeConfig
        // this.themes = themes.map(info => new themeChunk(info));
        for (const key in themes) {
            const element = themes[key];
            this.themes.push(new themeChunk(element));
        }
        this.resoucesPath = GameMgr.themeTexPath;
        //this.changeTheme(0);
        this.themes.forEach(theme => {
            this.themes_map.set(Number(theme.id), theme);
        });

    }

    static async getThemeTexture(id) {    // 获取皮肤贴图
        console.log("获取皮肤贴图", id)
        let theme = this.themes_map.get(id);
        if (theme.textures.length == 0) {    // 如果贴图缓存为空, 则下载贴图
            let { image1, image2 } = theme;
            if (image1 == image2) { // 如果两张贴图相同
                let tex = await commTool.getTexture(`${this.resoucesPath}${image1}`);
                theme.textures = [tex, tex];
            } else {
                // 加载两张贴图
                theme.textures = await Promise.all([image1, image2].map(img => commTool.getTexture(`${this.resoucesPath}${img}`)));
            }
        }
        return theme.textures;
    }
    static async getCubeTexture(id) {
        let theme = this.themes_map.get(id);
        if (theme.cubeTexture == null) {
            theme.cubeTexture = await commTool.getTexture(`${this.resoucesPath}${theme.cubeImage}`);
        }
        return theme.cubeTexture;
    }
    private static lastCgSkinId = 0;  //最后一次 请求换皮肤的id( 避免贴图加载 异步问题 导致显示错误)
    /** 切换主题 */
    static async changeTheme(id = 1) {
        this.lastCgSkinId = id;
        let [tex1, tex2] = await this.getThemeTexture(id);
        let cube = await this.getCubeTexture(id);

        if (id != this.lastCgSkinId) return;
        this.currentTheme = id;
        MatMgr.Floor_mat_0.setTexture('_MainTex', tex1);
        MatMgr.Floor_mat_1.setTexture('_MainTex', tex2);
        MatMgr.box_mat.setTexture('_MainTex', cube);

        let theme = this.themes_map.get(id);
        let { isDynamicColor, hRange, sFactor, vFactor } = theme;
        //设置 是否自动变色
        MatMgr.setDynamicColorAll(isDynamicColor);

        // Set up HSV limit
        MatMgr.setHrange(hRange[0], hRange[1]);
        MatMgr._s = sFactor / 100;
        MatMgr._v = vFactor / 100;

        //坡道颜色修改
        let isDynamic = theme.color == null;
        MatMgr.setRampColor(isDynamic, theme.color);
    }
}

export class themeChunk {
    id: number;
    name: string;
    image1: string;
    image2: string;
    deblocking: number[] = [];     // unlock 条件
    color: m4m.math.vector4;// 颜色
    textures: m4m.framework.texture[] = []; // texture cache
    cubeImage: m4m.framework.texture;
    cubeTexture: m4m.framework.texture;
    isDynamicColor: boolean;

    hRange = [0, 1];
    sFactor = 1;
    vFactor = 1;

    icon: string;

    constructor({ id, sceneName, image1, image2, deblocking, color, cubeImage, icon, isDynamicColor = true, hRange, sFactor, vFactor }) {
        this.id = id;
        this.name = sceneName;
        this.image1 = image1;
        this.image2 = image2;
        this.cubeImage = cubeImage;
        this.icon = icon;
        this.isDynamicColor = isDynamicColor;
        this.hRange = hRange.map(h => h / 360);
        this.sFactor = sFactor;
        this.vFactor = vFactor;

        // this.color = color;
        if (color && color != "") {
            this.color = new m4m.math.vector4();
            commTool.color16To10(color, this.color);
        }
        // let locks = (deblocking as string).split(":");
        // locks.forEach(sub => {
        //     let num = Number(sub);
        //     num = isNaN(num) ? 0 : num;
        //     this.deblocking.push(num);
        // });
        // if (this.deblocking[0] == 3) {

        //     console.log(this)
        //     themeMgr.newYearThemes = this;
        // }
    }

}