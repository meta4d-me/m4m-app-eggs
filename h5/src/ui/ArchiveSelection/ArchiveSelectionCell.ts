import { frame_img } from "./ArchiveSelection";
import { CommonCell } from "../../game/Common/CommonCell"
import { skinChunk, skinMgr } from "skinMgr";
import { commTool } from "Tools/commTool";
import { GameArchiveData } from "GameArchiveData";

@m4m.reflect.node2DComponent
export class ArchiveSelectionCell extends CommonCell {
    public nowClass: frame_img;
    public setCellClass(value: any) {
        this.nowClass = value;
    }
    //选中当前cell 时的fun
    public selectFun(selectbool: boolean) {
        super.selectFun(selectbool);
        // this.nowClass.frame1_img.transform.visible = selectbool;
    }
    public setData(value: GameArchiveData): void {
        this.cellData.data = value;
        if (value) {
            let imageUrl = skinMgr.iconPath + value.baseData.headPortrait;
            commTool.loaderTextureFun(imageUrl, (_tex) => {
                this.nowClass.ball_raw.rawImage2D.image = _tex;
                this.nowClass.ball_raw.transform.markDirty();
            });
            this.nowClass.level_lab.label.text = value.Currentlevel.stageName;
            this.nowClass.new_img.transform.visible = value.ism4mnft;
            this.nowClass.frame1_img.transform.visible = false;
            this.nowClass.transform.visible = true;
        } else {
            this.nowClass.transform.visible = false;
        }
    }
}