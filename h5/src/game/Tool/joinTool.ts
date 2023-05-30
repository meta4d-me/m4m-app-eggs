import { wxTool } from "./wxTool";
import { tdTool } from "./tdTool";
import { uiMgr } from "../uiMgr";
import { FrameMgr } from "Tools/FrameMgr";
// import { rankPage } from "../Game/ui/pages/rankPage";

//对接 类
export class joinTool {
    static preInit() {
        this.coordinator = m4m["__join"];
        if (!this.coordinator) {
            this.coordinator = {};
        }
        //加载完毕事件 追踪
        joinTool.tdcustomEvent(tdTool.FirstTimeFunnelEvent, tdTool.FirstTimeFunnelEvent, { [tdTool.Loading_done]: 1 });

        //
        this.regFun("refSharedCanvas", () => { }); //避免提前调用报错
        this.regFun("shareCanvasShow", () => { }); //避免提前调用报错
        this.regFun("shareCanvasHide", () => { }); //避免提前调用报错
        this.regFun("setReliveMode", () => { }); //避免提前调用报错
        this.regFun("setBottomADGap", () => { }); //避免提前调用报错
    }

    private static coordinator;
    static init() {
        //子域大小设置
        let c = uiMgr.overlay.canvas;
        this.setShareCanvasSize(c.pixelWidth, c.pixelHeight);
        //注册
        this.regFun("onShareSuccess", () => { });
        this.regFun("token", () => wxTool.token);

        this.regFun("refSharedCanvas", () => {
            if (wxTool.wx) {
                wxTool.refSharedCanvas();
            }
        });
        this.regFun("shareCanvasShow", () => {
            if (uiMgr.shareCanvasImg) {
                uiMgr.shareCanvasImg.transform.visible = true;
            }
        });
        this.regFun("shareCanvasHide", () => {
            if (uiMgr.shareCanvasImg) {
                uiMgr.shareCanvasImg.transform.visible = false;
            }
        });

        this.regFun("setReliveMode", (isReliveMode: boolean) => {

        });

        //显示 群排行榜 
        this.regFun("groupRankingPageShow", () => {
            // runingPage.Instance.setRankingType(true);

        });

        //获取 用户自己的信息
        this.regFun("getMyInfo", () => {
            return wxTool.myinfo;
        });

        this.callFun("inited");

        //update start
        FrameMgr.Add(this.update, this);
        // LateUpdateMgr.Add(this.update,this);
    }

    static test() {
        this.callFun("test");
    }

    private static update(d: number) {
        this.callFun("update", d);
    }


    /** 注册方法 */
    static regFun(funName: string, fun: Function) {
        if (this.coordinator) {
            this.coordinator[funName] = fun.bind(this);
        }
    }

    /** 调用外部方法 */
    private static callFun(funName: string, ...args: any[]) {
        if (this.coordinator && this.coordinator[funName]) {
            // this.coordinator[funName](parameter);
            this.coordinator[funName].apply(this.coordinator, args);
        }
    }

    //-------------------

    //隐藏游戏结算界面的排行榜
    static hide_item_Ranks() {
        this.callFun("hide_item_Ranks");
    }
    //隐藏下一个超越对象的
    static hide_nextSurpass() {
        this.callFun("hide_nextSurpass");
    }
    //显示完整好友排行榜
    static showRanks() {
        this.callFun("showRanks");
    }

    //隐藏完整排行榜
    static hideRankings() {
        this.callFun("hideRankings");
    }
    //排行榜分享
    static shareRankBoard() {
        this.callFun("shareRankBoard");
    }

    //分享个人
    static shareGame() {
        this.callFun("shareGame");
    }
    //分享到群
    static shareToGroup(SuccessCallBack: Function) {
        this.callFun("shareToGroup", SuccessCallBack);
    }
    //皮肤炫耀一下 （给皮肤id）
    static showBestSkin(iconUrl, id) {
        this.callFun("showBestSkin", iconUrl, id);
    }
    //主题炫耀一下 （给皮肤id）
    static showBestTheme(id) {
        this.callFun("showBestTheme", id);
    }
    //发起挑战
    static challengeFriend(score: number) {
        this.callFun("challengeFriend", score);
    }
    //得分炫耀一下
    static showOffScore(score: number) {
        this.callFun("showOffScore", score);
    }
    //每日邀请分享
    static invitation(token: string) {
        this.callFun("invitation", token);
    }
    //新年邀请分享
    static newYearInvitation(token: string) {
        this.callFun("newYearInvitation", token);
    }
    //更多玩法 游戏盒子
    static gameBox() {
        this.callFun("gameBox");
    }
    //游戏结算 保存数据
    static settlement(score) {
        this.callFun("settlement", score);
    }
    /** 视频复活 */
    static watchVideo(SuccessCallBack: Function) {
        //提示
        
        let skipWxVideo = true;
        if (skipWxVideo) {
            alert(`跳过 播放视频`);
            SuccessCallBack(true);
            return;
        }

        this.coordinator['watchVideo'](r => SuccessCallBack(r));
        // this.callFun("videoRelive", SuccessCallBack);

    }
    /** 分享复活 */
    static shareRelive(SuccessCallBack: Function) {
        this.callFun("shareRelive", SuccessCallBack);
    }
    /** 排行榜 上一页 */
    static lastPage() {
        this.callFun("lastPage");
    }
    /** 排行榜 下一页 */
    static nextPage() {
        this.callFun("nextPage");
    }

    /** 显示 底部广告 */
    static showBottomAd(bannerId: string) {
        // console.error("底部广告");
        this.callFun("showBottomAd", bannerId);
    }

    /** 重新构建 所有banner */
    static reMakeBottomAds() {
        this.callFun("reMakeBottomAds");
    }

    /** 隐藏 底部广告 */
    static hideBottomAd() {
        this.callFun("hideBottomAd");
    }

    /** 检查 超过的好友 */
    static ckOverFriend(score: number, x: number, y: number) {
        this.callFun("ckOverFriend", score, x, y);
    }
    /** 下一个可以 超过的好友 */
    static nextSurpass(score: number) {
        this.callFun("nextSurpass", score);
    }
    /** 爱微游 广告icon 点击触发*/
    static onIwyAdvIconClick() {
        this.callFun("onIwyAdvIconClick");
    }

    /** 关注按钮 点击*/
    static onFocusClick() {
        this.callFun("onFocusClick");
    }

    /** 领取双份 钻石*/
    static receiveDoubeDiamond(SuccessCallBack: Function) {
        this.callFun("receiveDoubeDiamond", SuccessCallBack);
    }
    /**游戏结算的排行榜 */
    static show_item_Ranks() {
        this.callFun("show_item_Ranks");
    }

    //更随头像 打开 open
    static openFollowHead(insId: number) {
        this.callFun("openFollowHead", insId);
    }

    //更随头像 关闭
    static closeFollowHead() {
        this.callFun("closeFollowHead");
    }

    //开始比赛 ，准备安置好友头像
    static placeFriendIcon(ranks: number[], level: number) {
        this.callFun("placeFriendIcon", ranks, level);
    }

    //ShareCanvas 大小设置
    static setShareCanvasSize(w: number, h: number) {
        this.callFun("setShareCanvasSize", w, h);
    }

    //ShareCanvas 大小设置
    static tdcustomEvent(id: string, label: string, params: {} = { "default": 1 }) {
        this.callFun("tdcustomEvent", id, label, params);
    }

    //分享图 绘制canvas 初始化  
    static screenshotcanvasInit() {
        this.callFun("screenshotcanvasInit");
    }
}