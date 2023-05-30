import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { settingPageHandle } from "../settingPageHandle";
import { GameMgr } from "../../GameMgr";
import { advMgr } from "../../advMgr";
import { iconAdvHandle } from "../iconAdvHandle";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { commTool } from "../../Tool/commTool";
import { wxTool } from "../../Tool/wxTool";
import { saveTool } from "../../Tool/saveTool";
import { AudioMgr } from "audio/AudioMgr";
import { inGamePage, showItem } from "./inGamePage";

//排行榜

export class setingPage implements IPageBase {

    private static _instance: setingPage;
    static prefabName: string = `setting_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["setting"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new setingPage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }
    handle: settingPageHandle;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(setingPage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("settingPageHandle") as settingPageHandle;
        //事件
        this.handle.close.addListener(m4m.event.UIEventEnum.PointerClick, this.onCloseClick, this);
        this.handle.shake.addListener(m4m.event.UIEventEnum.PointerClick, this.onShakeClick, this);
        // this.handle.music.addListener(m4m.event.UIEventEnum.PointerClick, this.onSoundClick, this);
        this.handle.bt.addListener(m4m.event.UIEventEnum.PointerDown, () => { }, this);
        // this.handle.sound.addListener(m4m.event.UIEventEnum.PointerClick, this.onSoundClick, this);
        let l = this.handle.transform.getComponent("button") as m4m.framework.button;
        l.addListener(m4m.event.UIEventEnum.PointerClick, () => { }, this);
        let icons_children = this.handle.icons.children;
        for (let i = 0; i < icons_children.length; i++) {
            if (i >= advMgr.length) break;
            let tran = icons_children[i];
            let abv = advMgr.settingAdvData[i];
            let rwaImg = tran.getComponent("rawImage2D") as m4m.framework.rawImage2D;
            let button = tran.getComponent("button") as m4m.framework.button;
            //appid:"wxbc7edaaf20a9f1ca",imgurl:""
            this.setIcon(rwaImg, abv.imgurl);
            button.addListener(m4m.event.UIEventEnum.PointerClick, function () {
                //广告的点击事件
            }, this);
        }

        this.handle.sound.onClickFun = () => {
            joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.SecondGameIcon]: 12 }); //数据埋点
        }

        this.refreashVibrateIcon();
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
    private onCloseClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.error("关闭");
        this.hide();
        inGamePage.Instance().then((ins) => {
            ins.setShowItem(showItem.home);
        });
    }
    private onShakeClick() {
        AudioMgr.Play("touch.mp3");
        GameMgr.swVibrate = !GameMgr.swVibrate;
        if (GameMgr.swVibrate)
            wxTool.vibrateShort();
        this.refreashVibrateIcon();
        saveTool.save(null, null);

        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.FirstGameIcon]: 11 }); //数据埋点

    }

    //刷新 震动图标显示
    private refreashVibrateIcon() {
        let str;

        if (GameMgr.swVibrate) {
            str = "setting.atlas.json_shezhi_btn_zhendong";
            //  str = " homeAndGame.atlas.json_main_btn_shezhi";

        } else {
            str = "setting.atlas.json_shezhi_btn_zhendong0";
        }
        let img = this.handle.shakeImg;
        img.sprite = GameMgr.assetMgr.getAssetByName(str) as m4m.framework.sprite;
        img.transform.markDirty();
        this.handle.transform.markDirty();
        console.error("震动");
    }

    // onMusicClick() {
    //     //播放按钮声音
    //     AudioMgr.buttonMusic();
    //     console.error("音乐");
    // }
    // onSoundClick() {
    //     //播放按钮声音
    //     AudioMgr.buttonMusic();
    // }

    private isAdvInited = false;
    private readonly appidTag = "appidTag";
    //设置广告 icon
    setAdvIcons(datas: any[]) {
        if (this.isAdvInited) return;
        let icons_ = this.handle.icons.getComponentsInChildren("iconAdvHandle") as iconAdvHandle[];
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            if (!data) break;
            icons_[i].setIcon(data);

            icons_[i].onClick = () => {
                joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.Othergamelink]: 13 }); //数据埋点
            }
        }
        this.isAdvInited = true;
    }

    show() {
        if (advMgr.settingAdvData) { //
            this.setAdvIcons(advMgr.settingAdvData);
        }

        this.handle.show();
    }

    hide() {
        this.handle.hide();
    }



}