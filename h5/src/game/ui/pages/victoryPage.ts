import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { victoryPagehandle } from "../victoryPagehandle";

//加载loading页面  page
export class victoryPage implements IPageBase {
    private static _instance: victoryPage;

    static prefabName: string = `victory_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["victory"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);

            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new victoryPage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }
    handle: victoryPagehandle;

    private animation: any;
    private inited = false;
    private init() {
      

        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(victoryPage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("victoryPagehandle") as victoryPagehandle;
        // this.handle.call_back = this.call_back.bind(this);
        this.animation = this.handle.Image.transform.getComponent("uiScaleAnimation") as any;
        this.inited = true;
    }
    /*  call_back(call: Function) {
         if(  this.handle.isc&&this.handle.ctime>=this.handle.time){
              call();
         }
      }*/
    show() {
        this.handle.ctime = 0;
        this.handle.isc = true;
        this.handle.show();
        this.playAnimation();
    }

    public playAnimation() {
        console.log(this.animation);
        if (this.animation) {
            this.animation.play();
        }
    }
    hide() {
        this.handle.hide();
    }
}