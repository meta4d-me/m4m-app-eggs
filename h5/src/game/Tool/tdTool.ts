
//talkingdata 平台工具
export class tdTool
{
    static readonly FirstTimeFunnelEvent = "FirstTimeFunnel";
    static readonly ClickEvent = "Click";
    //初次转换漏斗
    // static readonly Finish_1st_loading = "Finish_1st_loading";
    static readonly Clicked_login_button = "Clicked_login_button";  //点击 微信登录 按钮
    static readonly Clicked_approve_button = "Clicked_approve_button"; //点击 授权 按钮
    static readonly Finished_model_loading = "Finished_model_loading"; //加载结束
    static readonly Started_1st_game = "Started_1st_game"; //开始第一次 游戏
    static readonly finished_1st_game = "finished_1st_game"; //第一局游戏 结束

    //参数
    //--------FirstTimeFunnel
    static readonly Loading_done = "Loading_done" //加载完毕
    static readonly Clicked_play = "Clicked_play" //初次点击 开始游戏
    static readonly Player_lose = "Player_lose" // 指玩家第一次失败出现 视频复活界面
    static readonly Tap_to_restart = "Tap_to_restart" //指玩家再次开始 操纵小球界面

    //-------Click
    static readonly Leaderboard= "Leaderboard" //点击排行榜
    static readonly QRSkin="QRSkin" //首页 二维码按钮 点击
    static readonly Store="Store" //点击商店
    static readonly Mute="Mute" //点击静音
    static readonly Othergamelink="Othergamelink" //其他游戏跳转 （点击右上角 adIcon ）
    static readonly DailyShare="DailyShare" //点击每日分享
    static readonly Setting="Setting" //点击设置
    static readonly GameStart="GameStart" //点击开始游戏
    static readonly AdClick="AdClick" //点击了底部banner 广告 的追踪 (微信没有开放banner的点击回调)
    static readonly NewYearPackage="NewYearPackage" //新春活动按钮点击 
    static readonly FirstGameIcon="FirstGameIcon" //点击 设置按面板中的第一个 按钮 
    static readonly SecondGameIcon="SecondGameIcon" //点击 设置按面板中的第二个 按钮 
    static readonly ThirdGameIcon="ThirdGameIcon"//点击 设置按面板中的第三个 按钮 
    static readonly LoseWatchAdToContinue="LoseWatchAdToContinue" //点击 死亡后 继续按钮 
    static readonly LoseNoThanks="LoseNoThanks" //点击 死亡后 不谢谢按钮 
    static readonly LoseTryonemoretime="LoseTryonemoretime" //点击 死亡后 再试一次
    static readonly LoseWatchAdToGetDouble="LoseWatchAdToGetDouble" //点击 胜利看广告领取双倍金币
    static readonly WinWatchAdToGetTriple="WinWatchAdToGetTriple" //点击 胜利看广告领取三倍金币
    static readonly WinNextlevel="WinNextlevel" //胜利 下一关 点击
    static readonly SaveQRcode="SaveQRcode" //保存 公众号二维码
    static readonly WatchAdToGetFreeGems="WatchAdToGetFreeGems" //看视频 领取金币
    static readonly FailedToBuySkinWatchToGetGems="FailedToBuySkinWatchToGetGems" //买皮肤失败后 看视频 获取金币
    static readonly FailedToBuyThemeWatchToGetGems="FailedToBuyThemeWatchToGetGems" //买主题失败后 看视频 获取金币
    static readonly InviteNow="InviteNow" //新春的 邀请按钮点击
    static readonly SettlementWatchAdGetFreeGems="SettlementWatchAdGetFreeGems" //结算界面 看视频领取金币
    static readonly watchAdToGetSkin="watchAdToGetSkin" //商店界面 看视频领取皮肤

    //------level 关卡通过事件
    static readonly Passed_level_ = "Passed_level_";

    // 分享所得用户
    static readonly viaShare = "viaShare";

    //视频广告 error
    static readonly videoADError_1004 = "videoADError_1004";

}