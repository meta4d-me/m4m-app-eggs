import { cMap } from "../Data/Map";
import { miniGame } from "./miniGame";
export class GameInfoUtil {
    //设备品牌
    public static brand: string;
    //设备型号
    public static model: string;
    //微信版本号
    public static version: string;
    //操作系统及版本
    public static systemStr: string;
    //客户端基础库版本
    public static SDKVersion: string;
    //***********授权以后才能取到
    /** 头像URL */
    public static avatarUrl: string = "";
    //微信名
    public static wxName: string = "";
    //用户所在省份
    public static province: string = "";
    //用户所在城市
    public static city: string = "";
    //用户性别   0未知  1 男  2女
    public static gender: number = 0;

    private static dic: cMap<boolean> = new cMap();
    //对比SDK 版本号
    public static compareSDKVersion(minSDKver: string, needTip: boolean = true): boolean {
        if (this.dic.has(minSDKver)) {
            return this.dic.get(minSDKver);
        // tslint:disable-next-line: unnecessary-else
        } else {
            //当前SDK版本号
            let arr = GameInfoUtil.SDKVersion.split(".");//
            let num = Number(arr[0]) * 100 + Number(arr[1]) * 10 + Number(arr[2]);

            //最低SDK版本号
            let minarr = minSDKver.split(".");//
            let minnum = Number(minarr[0]) * 100 + Number(minarr[1]) * 10 + Number(minarr[2]);

            if (num < minnum) {
                if (needTip) {
                    miniGame.showModal({
                        title: "提示",
                        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
                    });
                }
                this.dic.set(minSDKver, false);
                return false;
            }
            this.dic.set(minSDKver, true);
            return true;
        }
    }
}