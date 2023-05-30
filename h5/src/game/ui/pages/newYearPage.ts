import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { newYearPageHandle } from "../newYearPageHandle";
import { homePage } from "./homePage";
import { GameMgr } from "../../GameMgr";
import { skinMgr } from "../../skinMgr";
import { themeMgr } from "../../themeMgr";
import { playerMgr } from "../../role/playerMgr";
import { themeBoxHandle } from "../themeBoxHandle";
import { skinBoxHandle } from "../skinBoxHandle";
import { skinShopPage } from "./skinShopPage";
import { joinTool } from "../../Tool/joinTool";
import { wxTool } from "../../Tool/wxTool";
import { tdTool } from "../../Tool/tdTool";
import { saveTool } from "../../Tool/saveTool";
import { commTool } from "../../Tool/commTool";
import { AudioMgr } from "audio/AudioMgr";
//新年
export class newYearPage implements IPageBase {

    private static _instance: newYearPage;
    //
    static prefabName: string = `newYear_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["newyear"]; //依赖的 图集资源

    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);
            await loadTool.loadAtlas(this.atlasList);
            if (this._instance) return this._instance;  //别的流中可能已经加载完成
            this._instance = new newYearPage();
            this._instance.init();
        }
        return this._instance;
    }
    handle: newYearPageHandle;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(newYearPage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("newYearPageHandle") as newYearPageHandle;
        //事件
        this.handle.close.addListener(m4m.event.UIEventEnum.PointerClick, this.onCloseClick, this);
        this.handle.bt.addListener(m4m.event.UIEventEnum.PointerDown, function () { }, this);
        this.handle.invite.addListener(m4m.event.UIEventEnum.PointerClick, this.onInviteClick, this);
        this.handle.use.addListener(m4m.event.UIEventEnum.PointerClick, this.onUse, this);
        this.handle.againInvite.addListener(m4m.event.UIEventEnum.PointerClick, this.onInvite, this);
        this.handle.againGive.addListener(m4m.event.UIEventEnum.PointerClick, this.onInvite, this);
        //   this.loadRwaImg2D(this.handle.skin, GameMgr.newYearIconPath + "jinzhu.png");
        //  this.loadRwaImg2D(this.handle.theme, GameMgr.newYearIconPath + "xinnian_pic_saidao.png");

        this.handle.onUpdate = this.onUpdate.bind(this);
        this.inited = true;

    }


    private onUpdate(d: number) {

        this.countDown(d);
    }

    private readonly cd = 30;
    private cdCount = 30;
    //倒计时
    private countDown(d: number) {
        this.cdCount += d;
        if (this.cdCount < this.cd) return;
        this.cdCount = 0;
        this.handle.countDown.text = homePage.getNewYearCDText_minute();
    }

    /**
     * 关闭
     */
    private onCloseClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("关闭!");
        this.hide();
    }
    // onShare


    /**
     *  新年邀请
     */
    onInviteClick() {
        GameMgr.newYear_invite = true;
        this.onInvite();

        setTimeout(()=>{
            if (GameMgr.newYear_inviteSucceed) {
                //  this.handle.use.transform.visible = false;
                // this.handle.give.transform.visible = true;
                //  bu = this.handle.give;
                this.setShowBT(false, false, false, false, true);
            } else {
                this.setShowBT(false, true, false, false, false);
                let url = "newyear.atlas.json_xinnian_pic_yaoqing2";
                this.handle.state.sprite = GameMgr.assetMgr.getAssetByName(url) as m4m.framework.sprite;
            }
        },1000);

    }

    private onInvite() {
        joinTool.newYearInvitation(wxTool.token);
        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.InviteNow]: 26 });  //数据埋点
    }

    onUse() {
        this.onCloseClick();
    }
    Pageurl = `${GameMgr.atlasPath}${newYearPage.atlasList[0]}/res/art/${newYearPage.atlasList[0]}.atlas.json`;

    //领取
    prize(info: any) {

        this.handle.title.transform.visible = false;
        this.handle.title2.transform.visible = true;
        //  homePage.Instance.handle.newYear.transform.visible = false;
        // homePage.Instance.handle.newYear.transform.markDirty();
        let parent = this.handle.friend.transform.parent;
        parent.visible = true;
        this.loadRwaImg2D(this.handle.friend, info.avataUrl);
        let stateSrc;
        let H_CENTER_value;
        //   
        if (info.isbeInvited) {//被邀请的
            stateSrc = "newyear.atlas.json_xinnian_pic_huode";
            H_CENTER_value = -10;
        } else { //主动邀请的
            stateSrc = "newyear.atlas.json_xinnian_pic_jieshou";
            H_CENTER_value = -72;
        }

        this.handle.state.sprite = GameMgr.assetMgr.getAssetByName(stateSrc) as m4m.framework.sprite;
        parent.setLayoutValue(m4m.framework.layoutOption.H_CENTER, H_CENTER_value);
        this.setShowBT(false, false, true, false, false);

        skinShopPage.Instance().then((ins) => {
            //领取奖品
            saveTool.unlockSkins[skinMgr.newYearSkin.id] = true;
            saveTool.unlockTheme[themeMgr.newYearThemes.id] = true;
            GameMgr.newYear_inviteSucceed = true;
            ins.createThemeBox(true);
            ins.createBox(true);
            console.log(skinBoxHandle.yearSkinBox);
            console.log(themeBoxHandle.yearThmeBox);
            if (skinBoxHandle.yearSkinBox) {
                skinBoxHandle.yearSkinBox.nowUse();
            } else {
                playerMgr.getRole().changeSkin(skinMgr.newYearSkin.id);
                GameMgr.currUseSkin = skinMgr.newYearSkin.id;
            }
            if (themeBoxHandle.yearThmeBox) {
                themeBoxHandle.yearThmeBox.nowUse();
            } else {
                themeMgr.changeTheme(themeMgr.newYearThemes.id);
                GameMgr.currUseTheme = themeMgr.newYearThemes.id;
            }
            parent.markDirty();
            saveTool.save(null, null);
        });

    }
    setShowBT(invite: boolean, againInvite: boolean, use: boolean, give: boolean, againGive: boolean) {
        this.handle.invite.transform.visible = invite;
        this.handle.againInvite.transform.visible = againInvite;
        this.handle.use.transform.visible = use;
        this.handle.give.transform.visible = give;
        this.handle.againGive.transform.visible = againGive;
    }


    /**
      * 加载外部图片
      *  @param rwaImg 需要加载外部图片的组件0
      */
    loadRwaImg2D(rwaImg: m4m.framework.rawImage2D, src: string) {

        if (commTool.loadedTexsDic.ContainsKey(src)) {
            rwaImg.image = commTool.loadedTexsDic.GetValue(src);
        } else {
            commTool.ImgByLoad(src, (_tex) => {
                if (_tex) {
                    commTool.loadedTexsDic.Add(src, _tex);
                    rwaImg.image = _tex;
                }
            });
        }

    }
    show() {

        if (GameMgr.newYear_inviteSucceed) {
            //     this.handle.state.sprite = GameMgr.assetMgr.getAssetByName("newyear.atlas.json_xinnian_pic_yaoqing2") as m4m.framework.sprite;
            this.handle.state.transform.visible = false;
            this.handle.info2.visible = true;
            this.handle.title.transform.visible = true;
            this.handle.title2.transform.visible = false;
            this.handle.friend.transform.parent.visible = false;
            this.setShowBT(true, false, false, true, false);
        } else
            this.setShowBT(!GameMgr.newYear_invite, GameMgr.newYear_invite, false, false, false);
        if (GameMgr.newYear_invite) {
            this.handle.state.sprite = GameMgr.assetMgr.getAssetByName("newyear.atlas.json_xinnian_pic_yaoqing2") as m4m.framework.sprite;
        }
        this.handle.show();
    }

    hide() {
        this.handle.hide();
    }
}