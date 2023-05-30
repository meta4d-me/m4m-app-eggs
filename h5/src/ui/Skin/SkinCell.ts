import { CommonCell } from "../../game/Common/CommonCell"
import { skinChunk, skinMgr } from "skinMgr";
import { commTool } from "Tools/commTool";
import { ball_raw } from "./Skin";
import { GameArchiveManager } from "Manager/GameArchiveManager";
import { SkinView } from "./SkinView";

@m4m.reflect.node2DComponent
export class SkinCell extends CommonCell {
    public nowClass: ball_raw;
    public setCellClass(value: any) {
        this.nowClass = value;
        // commTool.makeUIEventDiscard(this.nowClass.lockbg_img.transform);
    }
    //选中当前cell 时的fun
    public selectFun(selectbool: boolean) {
        super.selectFun(selectbool);
        let game = GameArchiveManager.Instance.GameArchiveData;
        if (game && this.cellData.data) {
            if (!game.ism4mnft) {
                if (this.cellData.data.id != 1) {
                    let isskin = Number(game.Currentlevel.id) <= this.cellData.data.deblocking[0];
                    if (isskin) {
                        this.nowClass.frame1_img.transform.visible = false;
                        SkinView.Instance.selectCallBack();
                    } else {
                        this.nowClass.frame1_img.transform.visible = selectbool;
                    }
                } else {
                    this.nowClass.frame1_img.transform.visible = selectbool;
                }
            } else {
                let bool = this.cellData.data.id == game.baseData.id;
                this.nowClass.frame1_img.transform.visible = bool;
            }
        }
    }
    public setData(value: skinChunk): void {
        this.cellData.data = value;
        if (value) {
            let imageUrl = skinMgr.iconPath + value.headPortrait;
            commTool.loaderTextureFun(imageUrl, (_tex) => {
                this.nowClass.rawImage2D.image = _tex;
                this.nowClass.transform.markDirty();
            });
            if (GameArchiveManager.Instance.GameArchiveData) {
                if (value.id != 1) {
                    let isskin = Number(GameArchiveManager.Instance.GameArchiveData.Currentlevel.id) <= value.deblocking[0];
                    this.nowClass.namebg_img.transform.visible = isskin;
                    this.nowClass.lock_img.transform.visible = isskin;
                    this.nowClass.lockbg_img.transform.visible = isskin;
                } else {
                    this.nowClass.namebg_img.transform.visible = false;
                    this.nowClass.lock_img.transform.visible = false;
                    this.nowClass.lockbg_img.transform.visible = false;
                }
            }
            this.nowClass.namebg_img.name_lab.label.text = "Level " + value.deblocking[0];
            this.nowClass.transform.visible = true;
            this.nowClass.frame1_img.transform.visible = false;
        } else {
            this.nowClass.transform.visible = false;
        }
    }
}