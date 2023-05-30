import { uiPage } from "./base/uiPage";

@m4m.reflect.node2DComponent
export class gameOverPageHandle extends uiPage {

    //分享
    @m4m.reflect.Field("reference", null, "button")
    share: m4m.framework.button;
    //下一关
    @m4m.reflect.Field("reference", null, "button")
    next: m4m.framework.button;
    //发起挑战
    @m4m.reflect.Field("reference", null, "button")
    challenge: m4m.framework.button;
    //再来一次
    @m4m.reflect.Field("reference", null, "button")
    again: m4m.framework.button;


    //名次
    @m4m.reflect.Field("reference", null, "label")
    ranking: m4m.framework.label;

    //当前关卡
    @m4m.reflect.Field("reference", null, "label")
    customsNum: m4m.framework.label;
    //下一个球球数量
    @m4m.reflect.Field("reference", null, "label")
    ballNum: m4m.framework.label;
    //下一个球球数量
    @m4m.reflect.Field("reference", null, "label")
    nextBallNum: m4m.framework.label;
    //新纪录
    @m4m.reflect.Field("reference", null, "transform2D")
    newRecord: m4m.framework.transform2D;
    //看视频得金币
    @m4m.reflect.Field("reference", null, "button")
    video: m4m.framework.button;

    @m4m.reflect.Field("reference", null, "label")
    video_goldNun: m4m.framework.label;

    public onPlay() {

    }


    public update(delta: number) {

    }
    public remove() {

    }
}    
