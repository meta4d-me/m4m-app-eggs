
/** 内部广告 管理器 */

import { ubiAdvIcon } from "../UIBase/ubiAdvIcon";
import { CrossPromotion } from "./CrossPromotion";
import { miniAPIType, miniGame } from "./miniGame";

// tslint:disable-next-line: class-name
export class advMgr {
    public static gameName : string = "";
    public static ubiAdv: ubiAdvIcon;
    public static crossPromotion: CrossPromotion = new CrossPromotion();
    public static advUrl = "https://umc-static-content.upaidui.com/crosspromotion/cp_config.json";
    public static sequenceAdvD; //序列帧动画数据
    public static inited = false;
    public static onCrossPromotionInited = () => { };
    public static init() {
        if (this.inited || miniGame.miniType == miniAPIType.none) { return; }
        this.inited = true;

        //-------------------------------交叉推广old 逻辑-----------------------
        miniGame.requestSimple("GET", this.advUrl, null, (data) => {
            if (!data || !data.cross) { return; }
            let tarArr = data.cross[`${this.gameName}`] as string[];
            if (!tarArr) { return; }
            let len = tarArr.length;
            let ridx = Math.floor(Math.random() * len);
            let tarStr = tarArr[ridx];
            let tarObj = data[`${tarStr}`];
            if (!tarObj) { return; }
            this.sequenceAdvD = tarObj;
            if (this.ubiAdv) {
                this.ubiAdv.setIcon(this.sequenceAdvD, 5000);
            }

        });
        //----------------------------------------------------------------------

        //育碧SDK
        this.crossPromotion.init(this.gameName)
        .then(() => {
            if (this.onCrossPromotionInited) { this.onCrossPromotionInited(); }
        });
    }

    //设置面板的 小游戏跳转 数据
    public static settingAdvData: any[];
}