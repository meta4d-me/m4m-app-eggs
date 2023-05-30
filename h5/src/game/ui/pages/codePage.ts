import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { codePageHandle } from "../codePageHandle";
import { commTool } from "../../Tool/commTool";
import { wxTool } from "../../Tool/wxTool";
import { joinTool } from "../../Tool/joinTool";
import { tdTool } from "../../Tool/tdTool";
import { AudioMgr } from "audio/AudioMgr";
export class codePage {
    private static _instance: codePage;
    static prefabName: string = `code_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["QRcode"]; //依赖的 图集资源
    static async Instance() {
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new codePage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: codePageHandle;
    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(codePage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("codePageHandle") as codePageHandle;
        //事件
        this.handle.close.addListener(m4m.event.UIEventEnum.PointerClick, this.onCloseClick, this);
        this.handle.save.addListener(m4m.event.UIEventEnum.PointerClick, this.onSavaClick, this);
        this.handle.bt.addListener(m4m.event.UIEventEnum.PointerDown, () => { }, this);
        this.loadRwaImg2D(this.handle.img, `res/code_/code.png`);
        this.inited = true;
    }

    /**
 * 加载外部图片
 *  @param rwaImg 需要加载外部图片的组件
 *  @param  src 外部图片地址
 */
    private loadRwaImg2D(rwaImg: m4m.framework.rawImage2D, src: string) {
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
    /**
   * 关闭
   */
    private onCloseClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        this.hide();
    }
    /**
      * 保存
      */
    private onSavaClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("保存到本地");
        wxTool.saveImageToPhotosAlbum("resource/code.png");

        joinTool.tdcustomEvent(tdTool.ClickEvent, tdTool.ClickEvent, { [tdTool.SaveQRcode]: 22 });
    }

    show() {
        this.handle.show();

    }

    hide() {
        this.handle.hide();
    }

}


