import { cMap } from "Data/Map";
import { commTool } from "Tools/commTool";
import { imgSpriteArrange } from "UIBase/imgSpriteArrange";
import { GameMgr } from "../GameMgr";

type layoutOption = m4m.framework.layoutOption;

export class CommonUIUtils {
    public static uiRepUrl: string = "ui://";
    public static specialIconDic: cMap<any>;
    public static showAmounts = [];
    public static skinAmounts = [];
    public static _spellIconDic: cMap<any>;
    public static replaceUIUrl(icon) {
        let trueIcon: string = icon;
        if (icon.indexOf(CommonUIUtils.uiRepUrl) != -1) {
            trueIcon = icon.replace(CommonUIUtils.uiRepUrl, "res/art/");
        }
        return trueIcon;
    }

    public static getSprite(spriteStr: string) {
        let spriteIcon = GameMgr.assetMgr.getAssetByName(spriteStr) as m4m.framework.sprite;
        return spriteIcon;
    }

    /** 快速创建一个 imgSpriteArrange 对象 */
    public static getImgSpriteArrange(img: m4m.framework.image2D,
                                      hlayout: layoutOption = m4m.framework.layoutOption.LEFT,
                                      vlayout: layoutOption = m4m.framework.layoutOption.V_CENTER): imgSpriteArrange {
        let imgNum = commTool.makeImgSpriteArrange(img);
        img.transform.visible = false;
        let initX = img.transform.getLayoutValue(hlayout);
        imgNum.transform.layoutState = vlayout | hlayout;
        imgNum.transform.setLayoutValue(hlayout, initX);
        return imgNum;
    }
}