import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { rankPageHandle } from "../rankPageHandle";
import { inGamePage, showItem } from "./inGamePage";
import { joinTool } from "../../Tool/joinTool";
import { AudioMgr } from "audio/AudioMgr";
//排行榜

export class rankPag implements IPageBase {

    private static _instance: rankPag;
    static prefabName: string = `rank_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["rank"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new rankPag();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }

    handle: rankPageHandle;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(rankPag.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("rankPageHandle") as rankPageHandle;
        //事件

        this.handle.next.addListener(m4m.event.UIEventEnum.PointerClick, this.onNextClick, this);
        this.handle.per.addListener(m4m.event.UIEventEnum.PointerClick, this.onPerClick, this);
        this.handle.share.addListener(m4m.event.UIEventEnum.PointerClick, this.onShareClick, this);

        this.inited = true;
    }

    /**
     * 分享
     */
    private onShareClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("再来一次!");
        console.log("分享");
        joinTool.shareRankBoard();
    }
    /**
     * 下一页
     */
    private onNextClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("再来一次!");
        console.log("下一页");
        joinTool.nextPage();
    }
    /**
     * 上一页
     */
    private onPerClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        console.log("再来一次!");
        console.log("上一页");
        joinTool.lastPage();
    }


    hide() {

        this.handle.hide();
    }

    show() {
        // inGamePage.Instance.setShowItem(showItem.shopAndRank);
        // inGamePage.Instance().then((ins) => {
        //     ins.setShowItem(showItem.Rank);
        // });
        joinTool.showRanks();

        this.handle.show();
    }

}