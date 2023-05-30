import { loadMgr } from "Loader/loadMgr";
import {GameMgr} from "../../GameMgr";
import {uiMgr} from "../../uiMgr";

/** 加载uipage工具类 */
export class loadTool{

    private static atlas_endMap : Map<string, boolean> = new Map();
    private static priority_atlas = 110; 
    //加载图集工具
    static async loadAtlas(atlas : string[]){
        if(!atlas || atlas.length < 1) return;
        let urls = [];
        let key : string = "";
        atlas.forEach(atl=>{
            //过滤无效图集
            if(typeof(atl) == "string" && atl != ""){
                key += atl + "_";
                urls.push(`${GameMgr.atlasPath}${atl}/${atl}.assetbundle.json`);
            }
        });

        if(this.atlas_endMap.has(key) && this.atlas_endMap.get(key)) return;  //已经加载完了

        // atlas.forEach(atl =>{
        //     if( typeof(atl) == "string" && atl != ""){
        //         if(!this.atlas_endMap.has(atl)){
        //             this.atlas_endMap.set(atl,true);
        //             urls.push(`${GameMgr.atlasPath}${atl}/${atl}.assetbundle.json`);
        //         }
        //     }
        // });

        while(urls.length > 0){
            let url = urls.pop();
            if(url){
                await loadMgr.Instance.syncLoad(url,loadTool.priority_atlas);
            }
        }

        this.atlas_endMap.set(key,true);

        //开始加载
        // urls.forEach(url=>{
        //     loadMgr.Instance.load(url,null);
        // });
    }

    private static priority_pagePfb = 100; 
    static PagePrefeb_map : Map<string, m4m.framework.prefab> = new Map();
    //加载预设体
    static async loadPrefeb( prefabName : string ){
        if( typeof(prefabName) != "string" || prefabName == "") return;
        if( this.PagePrefeb_map.has(prefabName) && this.PagePrefeb_map.get(prefabName) )return;

        let url = `${GameMgr.UIPath}${prefabName}/${prefabName}.assetbundle.json`;
        await loadMgr.Instance.syncLoad(url, this.priority_pagePfb);
        let pfb = (GameMgr.assetMgr.getAssetByName(`${prefabName}.prefab.json`,`${prefabName}.assetbundle.json`) as m4m.framework.prefab);
        this.PagePrefeb_map.set(prefabName,pfb);
    }
} 

/** 面板对象接口 */
export interface IPageBase {
    handle:uiPage | uiPop;
    show();
    hide();
}

/**全屏 面板handle 基组件类 */
export abstract class uiPage extends m4m.framework.behaviour2d
{
    private static pages : uiPage[] = [] ;

    uiLayer = 0; // 0: base 、1 : high    
    notHideOnOtherShow = false; //其他面板show 时 不隐藏
    private inited = false;
    private init(){
        let layTran = this.getParent();
        uiPage.pages.push(this);
        layTran.addChild(this.transform);
        this.inited = true;
    }

    private getParent(){
        let layTran : m4m.framework.transform2D;
        switch(this.uiLayer){
            case  0: layTran = uiMgr.baselayer; break;
            case  1: layTran = uiMgr.highlayer; break;
        }
        return layTran;
    }

    show() {
        if(!this.inited){
            this.init();
        }

        let layTran = this.getParent();
        layTran.addChild(this.transform);
        this.transform.visible = true;
        
        uiPage.hideAll(this);
    }
    
    hide(){
        if(!this.inited || !this.transform.visible) return;
        if(this.onHide){
            this.onHide();
        }
        this.transform.visible = false;
        if(this.transform.parent){
            this.transform.parent.removeChild(this.transform);
        }
    }

    private static hideAll(without:uiPage){
        uiPage.pages.forEach(page=>{
            if(page != without && !page.notHideOnOtherShow) 
                page.hide();
        });
    }

    onHide:()=>any;
}

/**pop 面板handle 基组件类 */
export abstract class uiPop extends m4m.framework.behaviour2d
{
    private inited = false;
    private init(){
        let layTran = uiMgr.poplayer;
        layTran.addChild(this.transform);
        this.inited = true;
    }

    show() {
        if(!this.inited){
            this.init();
        }
        this.transform.visible = true;
        uiMgr.poplayer.addChild(this.transform);
    }

    hide(){
        if(!this.inited || !this.transform.visible) return;
        if(this.onHide){
            this.onHide();
        }
        this.transform.visible = false;
        if(this.transform.parent){
            this.transform.parent.removeChild(this.transform);
        }
    }

    onHide:()=>any;
} 
