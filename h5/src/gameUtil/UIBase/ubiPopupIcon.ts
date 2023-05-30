import { advMgr } from "../Tools/advMgr";
import { commTool } from "../Tools/commTool";
import { CrossPromotionEntity } from "../Tools/CrossPromotion";

/**
 * ubi 游戏盒子推荐 icon
 */
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class ubiPopupIcon extends m4m.framework.behaviour2d {
    public static language: string = "";

    //icon
    @m4m.reflect.FieldRef("rawImage2D")
    public icon: m4m.framework.rawImage2D;

    //label
    @m4m.reflect.FieldRef("label")
    public lab: m4m.framework.label;

    private data: CrossPromotionEntity;
    private inited = false;
    //展示
    public init(_data: CrossPromotionEntity, scale = 1) {
        if (!_data || !_data.appId || !this.icon || !this.lab) { return; }
        this.data = _data;
        if (scale != 1) {
            if (this.transform) {
                m4m.math.vec2SetAll(this.transform.localScale, scale);
            }
            this.transform.markDirty();
        }

        //图片
        commTool.syncLoadTexture(_data.icon)
            .then((img) => {
                this.icon.image = img;
                this.transform.visible = true;
            });

        this.lab.text = _data.displayName[ubiPopupIcon.language];
        //点击事件
        let btn = this.transform.addComponent("button") as m4m.framework.button;
        btn.addListener(m4m.event.UIEventEnum.PointerClick, () => {
            console.log(`click of ${this.lab.text} icon`);
            if (!this.data) { return; }
            advMgr.crossPromotion.navigateToMiniProgram(this.data, "popup");
            // this.data.
        }, this);

        this.inited = true;
    }
}