import { uiPage } from "./base/uiPage";

@m4m.reflect.node2DComponent
export class skinShopPageHandle extends uiPage {
  //关闭
  @m4m.reflect.Field("reference", null, "button")
  close: m4m.framework.button;
  @m4m.reflect.Field("reference", null, "transform2D")
  top: m4m.framework.transform2D;
  //标题
  @m4m.reflect.Field("reference", null, "image2D")
  title: m4m.framework.image2D;
  @m4m.reflect.Field("reference", null, "transform2D")
  box: m4m.framework.transform2D;
  //皮肤
  @m4m.reflect.Field("reference", null, "transform2D")
  skin: m4m.framework.transform2D;
  //主题
  @m4m.reflect.Field("reference", null, "transform2D")
  theme: m4m.framework.transform2D;
  //主题box
  @m4m.reflect.Field("reference", null, "transform2D")
  themeBox: m4m.framework.transform2D;
  //打开主题按钮
  @m4m.reflect.Field("reference", null, "button")
  themeButton: m4m.framework.button;
  //皮肤主题按钮
  @m4m.reflect.Field("reference", null, "button")
  skinButton: m4m.framework.button;
  @m4m.reflect.Field("reference", null, "button")
  diamond_bt: m4m.framework.button;
  @m4m.reflect.Field("reference", null, "button")
  dial_bt: m4m.framework.button;
  //  @m4m.reflect.Field("reference", null, "label")
  //  diamond: m4m.framework.label;

  @m4m.reflect.Field("reference", null, "label")
  video_goldNun: m4m.framework.label;
  @m4m.reflect.Field("reference", null, "button")
  bt: m4m.framework.button;
  public onPlay() {

  }


  public update(delta: number) {

  }
  public remove() {

  }
}    
