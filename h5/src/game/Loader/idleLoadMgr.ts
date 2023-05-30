import { loadMgr } from "Loader/loadMgr";
import { FrameMgr } from "Tools/FrameMgr";
import { GameMgr } from "../GameMgr";

//空闲时加载管理器
export class idleLoadMgr
{
    private static loadList : string [] = [];
    static init(){
        this.addToList();
        this.start();
    }

    private static addToList(){
        let hasNY = true;
        //添加URL  到待加载列表中
        // [ 复活page、结算page、过关烟花 、金币领取 、视频领取、 新春 、每日分享 、商店 、皮肤主题 领取弹出 、设置 、 排行榜 、 code ]
        let l = this.loadList;
        l.push(`${GameMgr.UIPath}continue_page/continue_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}continue/continue.assetbundle.json`);
        l.push(`${GameMgr.UIPath}gameOver_page/gameOver_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}gameover/gameover.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}common/common.assetbundle.json`);
        l.push(`${GameMgr.UIPath}victory_page/victory_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}victory/victory.assetbundle.json`);
        l.push(`${GameMgr.UIPath}prize_page/prize_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}prize/prize.assetbundle.json`);
        l.push(`${GameMgr.UIPath}videoPrize_page/videoPrize_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}videoPrize/videoPrize.assetbundle.json`);
        if(hasNY){//有新春 加载新春页面资源
            l.push(`${GameMgr.UIPath}newYear_page/newYear_page.assetbundle.json`);
            l.push(`${GameMgr.atlasPath}newyear/newyear.assetbundle.json`);
        }
        l.push(`${GameMgr.UIPath}invite_page/invite_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}invite/invite.assetbundle.json`);
        l.push(`${GameMgr.UIPath}skinShop_page/skinShop_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}shop/shop.assetbundle.json`);
        l.push(`${GameMgr.UIPath}unlock_page/unlock_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}unlock/unlock.assetbundle.json`);
        l.push(`${GameMgr.UIPath}setting_page/setting_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}setting/setting.assetbundle.json`);
        l.push(`${GameMgr.UIPath}rank_page/rank_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}rank/rank.assetbundle.json`);
        l.push(`${GameMgr.UIPath}code_page/code_page.assetbundle.json`);
        l.push(`${GameMgr.atlasPath}QRcode/QRcode.assetbundle.json`);
    }

    private static start(){
        //注册update
        FrameMgr.Add(this.loop,this);
    }

    private static gapTime = 0.5;
    private static count =0;
    private static loop(d:number){
        //游戏进行的状态停止加载 
        if(GameMgr.raceStage != 0) return;
        this.count += d;
        if(this.count < this.gapTime) return;
        this.count =0;

        //检查是否已经结束
        if(!this.loadEnd ) return;
        //切换加载
        this.loadNext();
    }

    private static loadEnd = true;

    //加载下一个
    private static loadNext(){
        if(this.loadList.length <= 0){
            FrameMgr.Remove(this.loop,this); //队列加载结束
            return;
        }
        this.loadEnd = false;
        let url = this.loadList.shift();
        loadMgr.Instance.load(url,this.onloaded.bind(this));
    }

    private static onloaded(){
        this.loadEnd = true;
    }
}