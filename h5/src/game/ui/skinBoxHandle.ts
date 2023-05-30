import { skinMgr, skinChunk } from "../skinMgr"
import { GameMgr } from "../GameMgr"
import { homePage } from "./pages/homePage"
import { inviteFriendsPage } from "./pages/inviteFriendsPage"
import { unlockPage } from "./pages/unlockPage"
import { playerMgr } from "../role/playerMgr"
import { Dictionary } from "../Data/Dictionary"
import { saveTool } from "../Tool/saveTool"
import { commTool } from "../Tool/commTool"
import { AudioMgr } from "audio/AudioMgr"

@m4m.reflect.node2DComponent
export class skinBoxHandle extends m4m.framework.behaviour2d {
  static useSkinBox: skinBoxHandle;
  static yearSkinBox: skinBoxHandle;
  static shareSkinBoxs: Dictionary = new Dictionary();
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

  skin: skinChunk;
  setDate(skin: skinChunk) {
    this.setIcon(skin.headPortrait);
    this.skin = skin;
    if (this.skin.deblocking[0] == 3) {
      skinBoxHandle.yearSkinBox = this;
    } else if (this.skin.deblocking[0] == 2) {
      skinBoxHandle.shareSkinBoxs.Add(this.skin.id, this)
    }
    this.refresh();
  }
  /**
   * 解锁条件
   * @param type_ 解锁条件
   */
  setType(type_: number[]) {

    if (type_[0] == 1 || type_[0] == 3) { //钻石购买
      this.price.text = type_[1] + "";
      this.click.addListener(m4m.event.UIEventEnum.PointerClick, this.onPurchaseAndWatchCVideoClick, this);
    } else if (type_[0] == 4) { //看视频
      this.condition.sprite = GameMgr.assetMgr.getAssetByName("shop.atlas.json_shop_btn_shipin") as m4m.framework.sprite;
      this.click.addListener(m4m.event.UIEventEnum.PointerClick, this.onPurchaseAndWatchCVideoClick, this);
      let num_ = saveTool.videoSkin_num[this.skin.id];
      let num = num_ == null ? 0 : num_;
      this.price.text = num + "/" + this.skin.deblocking[1];


    } else { //分享
      this.price.transform.visible = false;
      this.condition.sprite = GameMgr.assetMgr.getAssetByName("shop.atlas.json_shop_btn_fenxiaohuode") as m4m.framework.sprite;
      this.click.addListener(m4m.event.UIEventEnum.PointerClick, this.onShareClick, this);
    }

  }
  refresh() {
    this.price.horizontalOverflow = true;

    if (!GameMgr.unlockSkins[this.skin.id]) {
      this.setType(this.skin.deblocking);
    } else {
      this.click.addListener(m4m.event.UIEventEnum.PointerClick, this.onUseClick, this);
      this.price.transform.visible = false;

      this.condition.transform.visible = false;
    }
    if (this.skin.id != GameMgr.currUseSkin) {
      this.use.visible = false;
    } else {
      this.use.visible = true;
      skinBoxHandle.useSkinBox = this;
    }

  }

  /**
   * 分享
   */
  onShareClick([ev]) {
    this.onClick([ev]);
    //播放按钮声音
    AudioMgr.Play("touch.mp3");


    homePage.Instance().then(ins => {
      ins.showAndCgInGame();
    })
    inviteFriendsPage.Instance().then(ins => {
      ins.show();
    });

    console.log("分享");
  }



  /**
   * 购买或者看视频
   */
  onPurchaseAndWatchCVideoClick([ev]) {
    this.onClick([ev]);
    //播放按钮声音
    AudioMgr.Play("touch.mp3");
    console.log("购买或者看视频!");
    unlockPage.Instance().then(ins => {
      ins.show();
      ins.setSkinfo(this.skin, this);
    });

  }
  /**
   * 使用
   */
  onUseClick([ev]) {
    if (ev != null)
      this.onClick([ev]);
    if (GameMgr.currUseSkin == this.skin.id && this.skin.id != 0) {
      //  homePage.Instance.show();
      unlockPage.Instance().then(ins => {
        ins.show();
        ins.setSkinfo(this.skin, this);
      });
      return;
    }

    //  console.log("使用");
    this.nowUse();

  }
  nowUse() {
    GameMgr.currUseSkin = this.skin.id;
    playerMgr.changeSkin(this.skin.id);
    if (skinBoxHandle.useSkinBox != null)
      skinBoxHandle.useSkinBox.refresh();
    skinBoxHandle.useSkinBox = this;
    skinBoxHandle.useSkinBox.refresh();
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

    src = skinMgr.iconPath + src;
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