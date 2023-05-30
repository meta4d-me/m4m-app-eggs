import { uiMgr } from "./uiMgr"
import { GameMgr } from "./GameMgr"
import { launchPage } from "./ui/pages/launchPage";
import { loadMgr } from "Loader/loadMgr";
export class loadingUIMgr {
    private static root: m4m.framework.transform2D;

    static assetmgr: m4m.framework.assetMgr;
    static launch_page: m4m.framework.prefab;
    static init() {
        let opt = m4m.framework.layoutOption;
        let uiRoot = uiMgr.highlayer;
        loadingUIMgr.assetmgr = GameMgr.app.getAssetMgr();
        //显示的 loading ui
        this.root = new m4m.framework.transform2D();
        uiRoot.addChild(this.root);
        this.root.layoutState = opt.LEFT | opt.RIGHT | opt.TOP | opt.BOTTOM;

        let atlasUrl = `${GameMgr.atlasPath}launch/launch.assetbundle.json`;
        let prefaburl = `${GameMgr.UIPath}launch_page/launch_page.assetbundle.json`;

        //
        let ps: Promise<any>[] = [];
        ps.push(loadMgr.Instance.syncLoad(atlasUrl));
        ps.push(loadMgr.Instance.syncLoad(prefaburl));

        Promise.all(ps).then(() => {
            this.launch_page = (this.assetmgr.getAssetByName("launch_page.prefab.json" , `launch_page.assetbundle.json`) as m4m.framework.prefab);
            launchPage.Instance.show();
        });
    }
    static hide() {
        if (this.root)
            this.root.visible = false;
    }
}