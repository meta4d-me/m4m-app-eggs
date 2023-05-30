import { AudioMgr } from "audio/AudioMgr";
import { GameMgr } from "../GameMgr"
import { saveTool } from "../Tool/saveTool";

@m4m.reflect.node2DComponent
export class audioHandle extends m4m.framework.behaviour2d {
    static get IsOff() { return !GameMgr.swSound };
    private onImg = "home.atlas.json_shezhi_btn_yinxiao";
    private offImg = "home.atlas.json_shezhi_btn_yinxiao0";
    private img: m4m.framework.image2D;
    private btn: m4m.framework.button;
    private _assetMgr: m4m.framework.assetMgr;
    private get assetMgr() {
        if (!this._assetMgr) {
            this._assetMgr = m4m.framework.sceneMgr.app.getAssetMgr();
        }
        return this._assetMgr;
    }

    private static AhArr: audioHandle[] = [];//存放所有的 声音按钮

    private isInArr = false;
    public onPlay() {
        if(!this.isInArr){
            audioHandle.AhArr.push(this);
            this.isInArr = true;
        }

        this.img = this.transform.getComponent("image2D") as m4m.framework.image2D;
        this.btn = this.transform.getComponent("button") as m4m.framework.button;

        if (!this.img || !this.btn) return;
        this.btn.addListener(m4m.event.UIEventEnum.PointerClick, this.onClick, this);
        this.refreashIcon();
    }

    onClickFun : any;
    private onClick() {

        GameMgr.swSound = !GameMgr.swSound;
        // AudioMgr.setMute(!GameMgr.swSound);
        if (GameMgr.swSound) {
            //播放按钮声音
            AudioMgr.Play("touch.mp3");
        }
        saveTool.save(null, null);
        audioHandle.refreashAll();

        if(this.onClickFun){
            this.onClickFun();
        }
    }

    //刷新 喇叭 按钮
    refreashIcon() {
        if (!this.img) return;
        if (!GameMgr.swSound) {
            this.img.sprite = this.assetMgr.getAssetByName(this.offImg) as m4m.framework.sprite;
        } else {
            this.img.sprite = this.assetMgr.getAssetByName(this.onImg) as m4m.framework.sprite;
        }
    }

    //刷新所有icon
    protected static refreashAll() {
        this.AhArr.forEach(ah => {
            if (ah) {
                ah.refreashIcon();
            }
        });

    }

    public update(delta: number) {

    }

    public remove() {

    }
}
