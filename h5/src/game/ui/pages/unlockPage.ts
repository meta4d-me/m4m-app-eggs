import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { Ress } from "../../Ress";
import { unlockPageHandle } from "../unlockPageHandle";
import { skinMgr, skinChunk } from "../../skinMgr";
import { themeMgr, themeChunk } from "../../themeMgr";
import { skinBoxHandle } from "../skinBoxHandle";
import { themeBoxHandle } from "../themeBoxHandle";
import { stringMgr } from "../../stringMgr"
import { inGamePage } from "./inGamePage"
import { skinShopPage } from "./skinShopPage";
import { GameMgr } from "../../GameMgr"
import { homePage } from "./homePage"
import { videoPrizePage } from "./videoPrizePage";
import { configMgr } from "../../configMgr";
import { saveTool } from "../../Tool/saveTool";
import { commTool } from "../../Tool/commTool";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { AudioMgr } from "audio/AudioMgr";

//皮肤 和 主题 解锁弹出面板
export class unlockPage implements IPageBase {

    private static _instance: unlockPage;
    static prefabName: string = `unlock_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["unlock"]; //依赖的 图集资源

    static async Instance() {
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);
            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new unlockPage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: unlockPageHandle;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(unlockPage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("unlockPageHandle") as unlockPageHandle;
        //事件
        this.handle.close.addListener(m4m.event.UIEventEnum.PointerClick, this.onCloseClick, this);
        this.handle.purchase_bt.addListener(m4m.event.UIEventEnum.PointerClick, this.onPurchaseClick, this);
        this.handle.share_bt.addListener(m4m.event.UIEventEnum.PointerClick, this.onShareClick, this);
        this.handle.video_bt.addListener(m4m.event.UIEventEnum.PointerClick, this.onVideoClick, this);
        this.handle.canBuy_bt.addListener(m4m.event.UIEventEnum.PointerClick, this.onToShopClick, this);
        this.handle.bt.addListener(m4m.event.UIEventEnum.PointerDown, function () { }, this);
        this.handle.seeVideo.addListener(m4m.event.UIEventEnum.PointerClick, this.onWatchVideoClick, this);

        this.inited = true;


    }
    //是否是皮肤
    isSkin: boolean = true;
    skinInfo: skinChunk;
    themeInfo: themeChunk;
    skinBox: skinBoxHandle;
    setSkinfo(skin: skinChunk, skinBox: skinBoxHandle) {
        this.handle.skin.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -60);
        this.skinBox = skinBox;
        this.handle.skin.transform.visible = true;
        this.setIcon(this.handle.skin_icon, GameMgr.skinIconPath + skin.headPortrait);
        //   this.handle.skin_icon
        this.isSkin = true;
        this.skinInfo = skin;

        if (GameMgr.currUseSkin == skin.id) {
            this.handle.acquisition.visible = true;
            this.handle.skinInfo.text = this.skinInfo.name;
        } else if (skin.deblocking[0] == 4) {  //看视频得皮肤
            this.setWatchVideo();
        } else {
            this.setPrice(skin.deblocking[1]);
        }

        //        
    }
    themeBox: themeBoxHandle;
    setTheme(theme: themeChunk, themeBox: themeBoxHandle) {
        this.handle.theme.visible = true;
        this.setIcon(this.handle.theme_icon, GameMgr.themeIconPath + theme.icon);

        this.isSkin = false;
        this.themeInfo = theme;
        this.themeBox = themeBox;
        if (GameMgr.currUseTheme == theme.id) {
            this.handle.acquisition.visible = true;
            this.handle.skinInfo.text = this.themeInfo.name;
        } else {
            this.setPrice(theme.deblocking[1]);
        }


    }
    //是否不可以显示
    static isCanBuy_noCanShow: boolean = false;
    setCanBuy(skin: skinChunk) {

        this.setIcon(this.handle.skin_icon, GameMgr.skinIconPath + skin.headPortrait);
        this.handle.skin.setLayoutValue(m4m.framework.layoutOption.V_CENTER, 0);
        unlockPage.isCanBuy_noCanShow = true;
        this.handle.canBuy.visible = true;
        this.handle.skin.visible = true;
    }
    /**
     * 设置价格
     * @param price 价格
     * @param isV  是否看视频刷新价格的
     */
    private setPrice(price: number) {
        //   console.log(saveTool.diamond+"???????????"+price);

        if (saveTool.diamond >= price) {
            this.handle.purchase.visible = true;
            this.handle.price.text = price + stringMgr.buy;
        } else {
            this.handle.insufficient.visible = true;
        }
    }
    private setWatchVideo() {
        this.handle.purchase.visible = false;
        this.handle.video.visible = true;
        //  
        let num_ = saveTool.videoSkin_num[this.skinInfo.id];
        let num = num_ == null ? 0 : num_;
        this.handle.seeVideoNum.text = num + "/" + this.skinInfo.deblocking[1];
        this.handle.video_pd.value = (1 / this.skinInfo.deblocking[1]) * num;
    }
    private setIcon(icon: m4m.framework.rawImage2D, src: string) {
        if (commTool.loadedTexsDic.ContainsKey(src)) {
            icon.image = commTool.loadedTexsDic.GetValue(src);
        } else {
            commTool.ImgByLoad(src, (_tex) => {
                if (_tex) {
                    commTool.loadedTexsDic.Add(src, _tex);
                    icon.image = _tex;
                }
            });
        }
    }
    /**
     * 关闭
     */
    private onCloseClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");

        this.hide();
    }

    private Vtrigger = false;
    /**
     * 钻石不足时可以看视频
     */
    private onVideoClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        let sef = this;
        this.Vtrigger = false;
        joinTool.watchVideo(success => {
            if (!success) return;
            if (this.Vtrigger) return;
            this.Vtrigger = true;

            //皮肤  or  主题
            if (this.handle.skin.visible) {
                joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.FailedToBuySkinWatchToGetGems]: 24 });  //数据埋点
            } else if (this.handle.theme.visible) {
                joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.FailedToBuyThemeWatchToGetGems]: 25 });  //数据埋点
            }
            videoPrizePage.Instance().then(ins => {
                this.handle.insufficient.visible = false;
                this.handle.insufficient.markDirty();
                inGamePage.collectCoinsAnim_callfun = sef.refresh_bt.bind(sef);

                ins.setInfo(configMgr.watchVideo);


            });

            //开始 视频广告
            //看完结束后回调 
        });


    }
    refresh_bt() {
        if (this.isSkin) {
            this.setPrice(this.skinInfo.deblocking[1]);
        } else {
            this.setPrice(this.themeInfo.deblocking[1]);
        }
    }


    /**
     * 去商场按钮
     */
    private onToShopClick() {
        this.hide();
        if (GameMgr.raceStage == 1) return;
        skinShopPage.Instance().then((ins) => {
            ins.show();
        });


    }
    /**
     * 购买
     */
    private onPurchaseClick() {
        let str;
        if (this.isSkin) {
            saveTool.diamond -= this.skinInfo.deblocking[1];
            saveTool.unlockSkins[this.skinInfo.id] = true;
            str = stringMgr.getSkin + this.skinInfo.name + "!";

            this.skinBox.click.removeListener(m4m.event.UIEventEnum.PointerClick, this.skinBox.onPurchaseAndWatchCVideoClick, this.skinBox);
            this.skinBox.nowUse();
            this.skinBox.refresh();

        } else {
            saveTool.diamond -= this.themeInfo.deblocking[1];
            saveTool.unlockTheme[this.themeInfo.id] = true;
            str = stringMgr.getTheme + this.themeInfo.name + "!";
            this.themeBox.click.removeListener(m4m.event.UIEventEnum.PointerClick, this.themeBox.onPurchaseClick, this.themeBox);
            this.themeBox.nowUse();
            this.themeBox.refresh();

        }
        this.handle.purchase.visible = false;
        this.handle.skinInfo.text = str;
        this.handle.acquisition.visible = true;
        this.isCanBuyNewSkin();
        // inGamePage.Instance.updateData();
        inGamePage.Instance().then((ins) => {
            ins.updateData();
        });

    }
    /**
     * 看视频解锁皮肤
     */
    private onWatchVideoClick() {
        this.Vtrigger = false;
        joinTool.watchVideo(success => {
            if (!success) return;
            if (this.Vtrigger) return;
            this.Vtrigger = true;

            //看完结束后回调 
            joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.watchAdToGetSkin]: 28 });  //数据埋点

            //看视频完视频后...
            let num_ = saveTool.videoSkin_num[this.skinInfo.id];
            let num = num_ == null ? 0 : num_;
            num++;
            saveTool.videoSkin_num[this.skinInfo.id] = num;
            console.log(saveTool.videoSkin_num);
            if (num >= this.skinInfo.deblocking[1]) {  //解锁皮肤
                saveTool.unlockSkins[this.skinInfo.id] = true;
                this.handle.skinInfo.text = stringMgr.getSkin + this.skinInfo.name + "!";
                this.skinBox.click.removeListener(m4m.event.UIEventEnum.PointerClick, this.skinBox.onPurchaseAndWatchCVideoClick, this.skinBox);
                this.skinBox.nowUse();
                this.handle.video.visible = false;
                this.handle.acquisition.visible = true;
            } else {
                this.setWatchVideo();
            }
            //刷新状态
            this.skinBox.refresh();

            //保存信息
            saveTool.save(null, null);
        });

    }
    //分享领取皮肤时使用
    setShareSkinfo(skin: skinChunk, skinBox: skinBoxHandle) {
        this.handle.skin.setLayoutValue(m4m.framework.layoutOption.V_CENTER, -60);
        this.skinBox = skinBox;
        this.skinInfo = skin;
        debugger;
        this.handle.skin.transform.visible = true;
        this.setIcon(this.handle.skin_icon, GameMgr.skinIconPath + skin.headPortrait);
        this.isSkin = true;
        saveTool.unlockSkins[skin.id] = true;
        let str = stringMgr.getSkin + skin.name + "!";
        this.handle.purchase.visible = false;
        this.handle.skinInfo.text = str;
        this.handle.acquisition.visible = true;
        if (skinBox) {
            this.skinBox.click.removeListener(m4m.event.UIEventEnum.PointerClick, this.skinBox.onPurchaseAndWatchCVideoClick, this.skinBox);
            this.skinBox.nowUse();
            this.skinBox.refresh();
        }

    }
    /**
     * 分享
     */
    private onShareClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("分享!");
        if (this.isSkin) {
            let info = skinMgr.skins_map.get(this.skinInfo.id);
            let iconUrl = `${GameMgr.skinIconPath}${info.headPortrait}`;
            joinTool.showBestSkin(iconUrl, this.skinInfo.id);
        } else {
            joinTool.showBestTheme(this.themeInfo.id);
        }
    }

    show() {
        this.handle.show();
    }

    hide() {
        this.handle.skin.visible = false;
        this.handle.theme.visible = false;
        this.handle.insufficient.visible = false;
        this.handle.purchase.visible = false;
        this.handle.video.visible = false;
        this.handle.acquisition.visible = false;
        this.handle.canBuy.visible = false;
        this.handle.hide();
    }

    /**
     * 是否有钱买新皮肤
     */
    private isCanBuyNewSkin() {
        skinMgr.skins.forEach(skin => {
            //     skin.deblocking[0]
            if (!GameMgr.unlockSkins[skin.id]) {
                if (skin.deblocking[0] == 1 && skin.deblocking[1] <= GameMgr.diamond) {
                    return;
                }
            }
        }
        );
        themeMgr.themes.forEach(theme => {
            //     skin.deblocking[0]
            if (!GameMgr.unlockTheme[theme.id]) {
                if (theme.deblocking[0] == 1 && theme.deblocking[1] <= GameMgr.diamond) {
                    return;
                }
            }
        }
        );

        homePage.Instance().then(ins => {
            ins.isShowNewIcon(false);
        })
    }

}