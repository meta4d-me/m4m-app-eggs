import { GameMgr } from "./GameMgr";
import { Ress } from "./Ress";
import { commTool } from "./Tool/commTool";

export class skinMgr {
    static skinPath: string;
    static iconPath: string;
    static skins: skinChunk[] = [];
    static skins_map: Map<number, skinChunk> = new Map();
    static shareSkins: skinChunk[] = [];
    static newYearSkin: skinChunk;
    static init() {
        let skins = Ress.skinConfig;
        this.skinPath = GameMgr.skinTexPath;
        this.iconPath = GameMgr.skinIconPath;
        for (const key in skins) {
            const element = skins[key];
            this.skins.push(new skinChunk(element));
        }
        this.skins.forEach((skin) => {
            skinMgr.skins_map.set(skin.id, skin);
        })
    }

    /** 获取皮肤 info 通过 id */
    static getSkinInfo(id: number) {
        return this.skins_map.get(id);;
    }

    /** 获取皮肤贴图 */
    static async getPBRTexture(id) {
        let skin = this.skins_map.get(id);
        console.log(skin);
        console.log("获取皮肤贴图");
        if (skin.basecolor == null || skin.normal == null) {
            let { basecolorImage, normalImage } = skin;
            skin.basecolor = await commTool.getTexture(`${this.skinPath}${basecolorImage}`);
            skin.normal = await commTool.getTexture(`${this.skinPath}${normalImage}`);
        }
        return [skin.basecolor, skin.normal];
    }
    static async getSkinTexture(id) {

        let skin = this.skins_map.get(id);
        if (!skin.skinTexture) {    // 如果贴图缓存为空, 则下载贴图
            let { skinSticker } = skin;
            skin.skinTexture = await commTool.getTexture(`${this.skinPath}${skinSticker}`);
        }
        return skin.skinTexture;
    }

    static cubeTexture: m4m.framework.texture = null;
    static async getCubetex() {
        if (this.cubeTexture == null) {
            let negx = await commTool.getTexture(`${this.skinPath}env/negx.jpg`);
            let negy = await commTool.getTexture(`${this.skinPath}env/negy.jpg`);
            let negz = await commTool.getTexture(`${this.skinPath}env/negz.jpg`);
            let posx = await commTool.getTexture(`${this.skinPath}env/posx.jpg`);
            let posy = await commTool.getTexture(`${this.skinPath}env/posy.jpg`);
            let posz = await commTool.getTexture(`${this.skinPath}env/posz.jpg`);
            this.cubeTexture = new m4m.framework.texture('box');
            this.cubeTexture.glTexture = new m4m.render.glTextureCube(GameMgr.app.webgl);
            this.cubeTexture.use();
            (this.cubeTexture.glTexture as m4m.render.glTextureCube).uploadImages(negx, negy, negz, posx, posy, posz);
        }
        return this.cubeTexture;
    }

    /** 获取皮肤icon */
    static async getSkinIcon(id) {   // 获取皮肤icon
        let skin = this.skins_map.get(id);
        if (!skin.skinIcon) {    // 如果贴图缓存为空, 则下载贴图
            let { headPortrait } = skin;
            skin.skinIcon = await commTool.getTexture(`${this.skinPath}${headPortrait}`);
        }
        return skin.skinIcon;
    }
}

export class skinChunk {
    id: number;
    name: string;
    headPortrait: string;   // icon
    skinSticker: string;    // texture
    deblocking: number[] = [];     // unlock 条件
    color: string;          // 颜色
    skinTexture: m4m.framework.texture = null; // texture cache
    skinIcon: m4m.framework.texture = null;    // icon cache

    basecolorImage: string;
    normalImage: string;
    basecolor: m4m.framework.texture = null;
    normal: m4m.framework.texture = null;
    renderType = false;
    isPBR = false;
    constructor({ id, skinName, headPortrait, skinSticker, deblocking, color, basecolor, normal, renderType }) {
        this.id = id;
        this.name = skinName;
        this.headPortrait = headPortrait;
        this.skinSticker = skinSticker;

        this.color = color;
        // deblocking
        // let locks = (deblocking as string).split(":");
        for (const key in deblocking) {
            const element = deblocking[key];
            this.deblocking.push(element);
        }
        // if (this.deblocking[0] == 2) {
        //     skinMgr.shareSkins.push(this);
        // } else if (this.deblocking[0] == 3) {
        //     skinMgr.newYearSkin = this;
        // }
        this.renderType = renderType;
        if (renderType == 1) {
            this.basecolorImage = basecolor;
            this.normalImage = normal;
            this.isPBR = true;
        }

    }

}