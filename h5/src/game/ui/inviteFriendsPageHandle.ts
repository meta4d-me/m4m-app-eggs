import { uiPop } from "./base/uiPage";
@m4m.reflect.node2DComponent
export class inviteFriendsPageHandle extends uiPop {
    //关闭
    @m4m.reflect.Field("reference", null, "button")
    close: m4m.framework.button;
    //邀请
    @m4m.reflect.Field("reference", null, "button")
    invite: m4m.framework.button;
    //奖励信息
    @m4m.reflect.Field("reference", null, "transform2D")
    info: m4m.framework.transform2D;
    //头像
    @m4m.reflect.Field("reference", null, "transform2D")
    head: m4m.framework.transform2D;
    //奖品
    @m4m.reflect.Field("reference", null, "rawImage2D")
    prize: m4m.framework.rawImage2D;
    //白色的条
    @m4m.reflect.Field("reference", null, "transform2D")
    line: m4m.framework.transform2D;
    //还需邀请....
    @m4m.reflect.Field("reference", null, "label")
    num: m4m.framework.label;
    //防止按钮穿透
    @m4m.reflect.Field("reference", null, "button")
    bt: m4m.framework.button;
    public onPlay() {

    }


    public update(delta: number) {

    }
    public remove() {

    }
}    
