import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { skinShopPageHandle } from "../skinShopPageHandle";
import { skinBoxHandle } from "../skinBoxHandle";
import { themeBoxHandle } from "../themeBoxHandle";
import { inGamePage, showItem } from "./inGamePage";
import { homePage } from "./homePage";
import { skinMgr } from "../../skinMgr";
import { stageMgr } from "../../stageMgr";
import { themeMgr } from "../../themeMgr";
import { GameMgr } from "../../GameMgr";
import { configMgr } from "../../configMgr";
import { videoPrizePage } from "./videoPrizePage";
import { wxTool } from "../../Tool/wxTool";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { saveTool } from "../../Tool/saveTool";
import { FrameMgr } from "Tools/FrameMgr";
import { AudioMgr } from "audio/AudioMgr";
//排行榜

export class skinShopPage implements IPageBase {

    private static _instance: skinShopPage;
    static prefabName: string = `skinShop_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["shop"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new skinShopPage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: skinShopPageHandle;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(skinShopPage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("skinShopPageHandle") as skinShopPageHandle;
        this.inited = true;
        this.boxHeight = this.handle.box.transform.height;
        this.boxWidth = this.handle.box.transform.width;
        this.pageHeight = this.handle.transform.height;
        this.themeBoxWidth = this.handle.themeBox.transform.width;
        this.themeBoxHeight = this.handle.themeBox.transform.height;;
        //事件
        this.handle.bt.addListener(m4m.event.UIEventEnum.PointerDown, () => { }, this);
        this.handle.close.addListener(m4m.event.UIEventEnum.PointerClick, this.onCloseClick, this);
        this.handle.skinButton.addListener(m4m.event.UIEventEnum.PointerDown, this.onClickSkin, this)
        this.handle.themeButton.addListener(m4m.event.UIEventEnum.PointerDown, this.onClickTheme, this)
        this.handle.diamond_bt.addListener(m4m.event.UIEventEnum.PointerClick, this.onClickDiamond, this)
        //this.handle.dial_bt.addListener(m4m.event.UIEventEnum.PointerClick, this.onClickDiamond, this)
        this.themeimg_bt = this.handle.themeButton.transform.getComponent("image2D") as m4m.framework.image2D;
        this.skinimg_bt = this.handle.skinButton.transform.getComponent("image2D") as m4m.framework.image2D;
        this.handle.video_goldNun.text = "+" + configMgr.watchVideo + "";
        FrameMgr.Add(this.update, this);

        this.handle.onHide = () => {
            if (stageMgr.stageRoot)
                stageMgr.stageRoot.gameObject.visible = true;
        }
        /* if (wxTool.getStatusBarHeight() >= 40) {
 
         }*/
        this.handle.top.setLayoutValue(m4m.framework.layoutOption.TOP, wxTool.getStatusBarHeight());
    }
    //打开的是否是皮肤
    private isOpenSkin: boolean = true;
    private themeimg_bt: m4m.framework.image2D;
    private skinimg_bt: m4m.framework.image2D;
    /**
     * 点击皮肤
     */
    private onClickSkin() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("点击皮肤!");
        this.isOpenSkin = true;
        this.handle.skin.visible = true;
        this.handle.theme.visible = false;
        this.themeimg_bt.color.a = 0;
        this.skinimg_bt.color.a = 1;
        this.handle.transform.markDirty();
    }
    /**
     * 点击主题
     */
    private onClickTheme() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("点击主题!");
        this.isOpenSkin = false;
        this.handle.skin.visible = false;
        this.handle.theme.visible = true;
        this.themeimg_bt.color.a = 1;
        this.skinimg_bt.color.a = 0;
        this.handle.transform.markDirty();
    }
    /**
     * 点击关闭
     */
    private onCloseClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("点击关闭!");
        // this.hide();

        homePage.Instance().then(ins => {
            ins.showAndCgInGame();
        })
    }
    /**
     * 点击转盘
     */
    private onClickDial() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("点击转盘!");
        //dialPage.Instance.show();
    }

    private Vtrigger = false;  
    /**
     * 看视频
     */
    private onClickDiamond() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("播放按钮声音!");
        this.Vtrigger = false;   
        joinTool.watchVideo(success => {
            if (!success) return;
            if(this.Vtrigger ) return;
            this.Vtrigger = true;
            
            //看视频获得的金币
            //configMgr.watchVideo  
            //开始 视频广告 
            //看完结束后回调 
            joinTool.tdcustomEvent(tdTool.ClickEvent,tdTool.ClickEvent,{[tdTool.WatchAdToGetFreeGems]:23});  //数据埋点
            videoPrizePage.Instance().then(ins => {

                ins.show();
                ins.setInfo(configMgr.watchVideo);
            });

        })


    }

    /**          皮肤的东西       */
    //小框高度
    private boxHeight: number = 0;
    //小框宽度
    private boxWidth: number = 0;
    private   //小框间距
    private boxInterval: number = 15;
    //每行多少框
    private lineNumber: number = 3;
    private createIndex: number = 0;
    private createIndexxxx: number = 0;
    private createBoxY: number = 80.00;
    private createBoxX: number = 0;
    private pageHeight: number = 0;
    private opt = m4m.framework.layoutOption;
    createBox(isYear: boolean = false) {
        let tran = this.handle.box.clone();
        let data = tran.getComponent("skinBoxHandle") as skinBoxHandle;

        let the;
        if (isYear) {
            //如果没打开过就退出
            if (this.createIndexxxx <= 0) return
            the = skinMgr.newYearSkin;
        } else {
            the = skinMgr.skins[this.createIndex++];
            if (the.deblocking[0] == 3) {
                if (!saveTool.unlockSkins[the.id]) {
                    /*  if (!homePage.beforeActivitys || homePage.beforeActivitys.length == 0 || !homePage.beforeActivitys[0]) return;
                      let tbfa = homePage.beforeActivitys[0];
                      if (tbfa.end > Date.now())*/
                    return;
                }

                // if (saveTool.unlockSkins[the.id] == true) { } else
                //     if (saveTool.unlockSkins[the.id] != true && homePage.beforeActivitys == null || homePage.beforeActivitys.length == 0) {
                //         return;
                //     } else
                //         if (homePage.beforeActivitys[0]) {
                //             let a = homePage.beforeActivitys[0];
                //             let now = Date.now();
                //             if (now <= a.end) {
                //                 return;
                //             }

                //         }
            }
        }


        data.setDate(the);
        if (this.createBoxY < this.pageHeight)
            tran.visible = true;
        let parent = this.handle.box.parent;
        parent.addChild(tran);
        tran.setLayoutValue(this.opt.TOP, this.createBoxY);
        tran.setLayoutValue(this.opt.LEFT, this.createBoxX);
        this.createBoxX += this.boxWidth + this.boxInterval;

        this.createIndexxxx++;
        this.skinItems.push(tran);
        //是否换行了
        if (this.createIndexxxx % this.lineNumber == 0) {
            this.createBoxY += this.boxHeight + this.boxInterval;
            this.createBoxX = 0;
            // let parent = this.handle.box.parent;
            //parent.height = this.createBoxY;
        }
    }

    private makedAll_skin = false;
    private makedAll_theme = false;

    //用于保存皮肤框
    private skinItems: m4m.framework.transform2D[] = [];
    //用于保存主题框
    private themeItems: m4m.framework.transform2D[] = [];
    private update(d: number) {
        this.isShowItems();
        if (this.makedAll_skin && this.makedAll_theme) return;
        //判断资源加载情况
        let shopAtlas = GameMgr.assetMgr.getAssetByName(`shop.atlas.json` , `shop.assetbundle.json`);
        if (!shopAtlas) return;

        if (this.isOpenSkin) {
            if (this.makedAll_skin || !skinMgr.skins) return;
            //创建皮肤
            if (this.createIndex < skinMgr.skins.length)

                this.createBox();
            else {
                let parent = this.handle.box.parent;
                parent.height = this.createBoxY + 500;

                this.makedAll_skin = true;
            }
        } else {
            if (this.makedAll_theme || !themeMgr.themes) return;
            //创建主题
            if (this.themeCreateIndex < themeMgr.themes.length)
                this.createThemeBox();
            else {
                let parent = this.handle.themeBox.parent;
                parent.height = this.themeCreateBoxY + 500;
                this.makedAll_theme = true;
            }
        }
    }
    //判断是否该显示出来
    private isShowItems() {
        if (this.isOpenSkin) {
            //暂时先这样 
            this.skinItems.forEach(item => {
                this.isOughtShow(item, this.boxHeight);
            })
        } else {

            this.themeItems.forEach(item => {
                this.isOughtShow(item, this.themeBoxHeight);

            })
        }

    }
    /**
     * 是否应该显示出来
     * @patam item 需要判断的
     */
    private isOughtShow(item: m4m.framework.transform2D, boxHeight: number) {
        if (item.getWorldTranslate().y < (325.00 - boxHeight) || item.getWorldTranslate().y > 1280) {
            item.visible = false;
        } else {
            item.visible = true;
        }
    }




    //下面是主题的东西

    //小框高度
    private themeBoxHeight: number = 0;
    //小框宽度
    private themeBoxWidth: number = 0;
    //小框间距
    private themeBoxInterval: number = 15;
    //每行多少框
    private themeLineNumber: number = 1;
    private themeCreateIndex: number = 0;
    private themeCreatexxx: number = 0;
    private themeCreateBoxY: number = 80.00;
    private themeCreateBoxX: number = 0;

    //创建主题box
    createThemeBox(isYear: boolean = false) {
        let tran = this.handle.themeBox.clone();
        let data = tran.getComponent("themeBoxHandle") as themeBoxHandle;
        let the;
        if (isYear) {
            //如果没打开过就退出
            if (this.themeCreatexxx <= 0) return
            the = themeMgr.newYearThemes;
        } else {
            the = themeMgr.themes[this.themeCreateIndex++];
            if (the.deblocking[0] == 3) {
                if (!saveTool.unlockTheme[the.id]) {
                    /* if (!homePage.beforeActivitys || homePage.beforeActivitys.length == 0 || !homePage.beforeActivitys[0]) return;
                     let tbfa = homePage.beforeActivitys[0];
                     if (tbfa.end > Date.now())*/
                    return;
                }
                // if (saveTool.unlockTheme[the.id] == true) { } else
                //     if (saveTool.unlockTheme[the.id] != true && homePageHandle.beforeActivitys == null || homePageHandle.beforeActivitys.length == 0) {
                //         return;
                //     } else
                //         if (homePageHandle.beforeActivitys[0]) {
                //             let a = homePageHandle.beforeActivitys[0];
                //             let now = Date.now();
                //             if (now <= a.end) {
                //                 return;
                //             }
                //         }
            }
        }
        data.setDate(the);
        if (this.themeCreateBoxY < this.pageHeight)
            tran.visible = true;
        let parent = this.handle.themeBox.parent;
        parent.addChild(tran);
        tran.setLayoutValue(this.opt.TOP, this.themeCreateBoxY);

        this.themeCreatexxx++;
        this.themeItems.push(tran);
        //是否换行了
        if (this.themeCreatexxx % this.themeLineNumber == 0) {
            this.themeCreateBoxY += this.themeBoxHeight + this.themeBoxInterval;
            //this.createBoxX = 0;

        }
    }


    show() {
        // inGamePage.Instance.setShowItem(showItem.shopAndRank);
        // inGamePage.Instance().then((ins) => {
        //     ins.setShowItem(showItem.shop);
        // });
        if (stageMgr.stageRoot)
            stageMgr.stageRoot.gameObject.visible = false;

        this.handle.show();

    }
    hide() {
        this.handle.hide();
    }
}