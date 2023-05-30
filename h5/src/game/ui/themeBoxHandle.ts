import { themeMgr, themeChunk } from "../themeMgr"
import { GameMgr } from "../GameMgr"
import { homePage } from "./pages/homePage"
import { unlockPage } from "./pages/unlockPage"
import { saveTool } from "../Tool/saveTool";
import { commTool } from "../Tool/commTool";


@m4m.reflect.node2DComponent
export class themeBoxHandle extends m4m.framework.behaviour2d {
    static useThemeBox: themeBoxHandle;
    static yearThmeBox: themeBoxHandle;
    //是否使用
    @m4m.reflect.Field("reference", null, "transform2D")
    use: m4m.framework.transform2D;
    //icon
    @m4m.reflect.Field("reference", null, "rawImage2D")
    icon: m4m.framework.rawImage2D;
    //条件图片
    @m4m.reflect.Field("reference", null, "image2D")
    condition: m4m.framework.image2D;
    //价格
    @m4m.reflect.Field("reference", null, "label")
    price: m4m.framework.label;
    //点击
    @m4m.reflect.Field("reference", null, "button")
    click: m4m.framework.button;
    @m4m.reflect.Field("reference", null, "transform2D")
    lock: m4m.framework.transform2D;
    theme: themeChunk;
    setDate(theme: themeChunk) {
        this.setIcon(theme.icon);
        this.theme = theme;
        if (this.theme.deblocking[0] == 3) {
            themeBoxHandle.yearThmeBox = this;
        }
        this.refresh();
    }
    /**
     * 解锁条件
     * @param type_ 解锁条件
     */
    setType(type_: number[]) {
        this.lock.visible = true;
        if (type_[0] == 1 || type_[0] == 3) { //钻石购买
            this.price.text = type_[1] + "";
            this.click.addListener(m4m.event.UIEventEnum.PointerClick, this.onPurchaseClick, this);
        } else { //分享
            this.price.transform.visible = false;
            this.condition.sprite = GameMgr.assetMgr.getAssetByName("shop.atlas.json_shop_btn_fenxiaohuode") as m4m.framework.sprite;
            this.click.addListener(m4m.event.UIEventEnum.PointerClick, this.onShareClick, this);
        }

    }
    refresh() {
        if (!GameMgr.unlockTheme[this.theme.id]) {
            this.setType(this.theme.deblocking);
        } else {
            this.click.addListener(m4m.event.UIEventEnum.PointerClick, this.onUseClick, this);
            this.price.transform.visible = false;
            this.condition.transform.visible = false;
            this.lock.visible = false;
        }
        if (this.theme.id != GameMgr.currUseTheme) {
            this.use.visible = false;
        } else {
            this.use.visible = true;
            themeBoxHandle.useThemeBox = this;
        }
    }

    /**
     * 分享
     */
    onShareClick([ev]) {
        this.onClick([ev]);

        homePage.Instance().then(ins => {
            ins.showAndCgInGame();
        })
        // inviteFriendsPage.Instance.show();
        console.log("分享");
    }
    /**
     * 购买
     */
    onPurchaseClick([ev]) {
        this.onClick([ev]);
        unlockPage.Instance().then(ins => {
            ins.show();
            ins.setTheme(this.theme, this);
        });

    }
    /**
     * 使用
     */
    onUseClick([ev]) {
        if (ev != null)
            this.onClick([ev]);
        if (GameMgr.currUseTheme == this.theme.id && this.theme.id != 0) {
            unlockPage.Instance().then(ins => {
                ins.show();
                ins.setTheme(this.theme, this);
            });
            return;
        }
        //  console.log("使用");
        this.nowUse();


    }
    nowUse() {
        GameMgr.currUseTheme = this.theme.id;
        themeMgr.changeTheme(this.theme.id);
        if (themeBoxHandle.useThemeBox != null)
            themeBoxHandle.useThemeBox.refresh();
        themeBoxHandle.useThemeBox = this;
        themeBoxHandle.useThemeBox.refresh();
        saveTool.save(null, null);
    }

    private onClick([ev]) {
        let pt = GameMgr.inputMgr.point;
        let h = 325.00;

        if (pt.y > h) {

        } else {
            (ev as m4m.framework.PointEvent).eated = false;  //不吃掉事件 而是往下传递
        }

    }
    setIcon(src: string) {
        src = GameMgr.themeIconPath + src;
        if (commTool.loadedTexsDic.ContainsKey(src)) {
            this.icon.image = commTool.loadedTexsDic.GetValue(src);
        } else {
            commTool.ImgByLoad(src, (_tex) => {
                if (_tex) {
                    commTool.loadedTexsDic.Add(src, _tex);
                    this.icon.image = _tex;
                }
            });
        }
    }
    public remove() {

    }
}


