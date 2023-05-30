import { GameMgr } from "./GameMgr";
import { wxTool } from "./Tool/wxTool";
import { ubiAdvIcon } from "./ui/base/ubiAdvIcon";

/** 内部广告 管理器 */
export class advMgr {
    static ubiAdv: ubiAdvIcon;

    static advUrl = "https://umc-static-content.upaidui.com/crosspromotion/cp_config.json";
    static sequenceAdvD; //序列帧动画数据
    private static inited = false;
    static init() {
        if (this.inited || !wxTool.wx) return;
        this.inited = true;
        wxTool.request("GET", this.advUrl, null, (res) => {
            if (!res || !res.cross) return;
            let tarArr = res.cross[`${GameMgr.gameName}`] as string[];
            if (!tarArr) return;
            let len = tarArr.length;
            let ridx = Math.floor(Math.random() * len);
            let tarStr = tarArr[ridx];
            let tarObj = res[`${tarStr}`];
            if (!tarObj) return;
            this.sequenceAdvD = tarObj;

            if (this.ubiAdv)
                this.ubiAdv.setIcon(this.sequenceAdvD, 5000);

            this.settingAdvData = [];
            if (!res.popup) return;
            tarArr = res.popup[`${GameMgr.gameName}`] as string[];
            len = tarArr.length;
            let MaxNum = 2; // 只取两个数据
            //获取icon
            for (let i = 0; i < len; i++) {
                if (i >= MaxNum) break;
                let tarStr = tarArr[i];
                let tarObj = res[`${tarStr}`];
                let appid_ = `${tarObj.id}`;
                let imgUrl_ = `${tarObj.frames}${tarObj.icon}`;
                this.settingAdvData.push({ appid: appid_, imgurl: imgUrl_ });
            }
        });
    }

    //设置面板的 小游戏跳转 数据
    static settingAdvData: any[];
}