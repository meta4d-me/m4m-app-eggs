import {GameMgr} from "./GameMgr";
import { role } from "./role/role";
import { wxTool } from "./Tool/wxTool";

//路人头像 管理器
export class headMgr
{
    private static user_imgs : string [] = [];
    private static filterNet = {};

    private static recc = 0;
    //补充一次数据
    static AddOnce( callBack : Function = null){
        if(!wxTool.wx) return;
        let token = wxTool.token;
        if (wxTool.token == "" || wxTool.token == undefined || wxTool.token == "undefined") return;
        let url = GameMgr.DNS_AND_PORT + "/headPortrait?token=" + token;
        wxTool._loadFun(url,  (res)=> {
            if(res && res.data && res.data.body && res.data.body.length != null){
                (res.data.body as any[]).forEach(obj=>{
                    if(obj.avatarUrl){
                        let url = obj.avatarUrl;
                        //过滤 重复
                        if(this.filterNet[url] ) {
                            this.recc++
                            console.warn (` url 重复  ${this.recc}`);
                        }else if(wxTool.myinfo && wxTool.myinfo.avatarUrl && wxTool.myinfo.avatarUrl == url){
                            console.warn (`获取到 自己的头像 `);
                        }else{
                            this.filterNet[url] = true;
                            this.user_imgs.push(url);  //取头像数据
                        }
                    }
                });
                if(callBack) callBack();
            }
        }, null );
    }

    // private static fullRate = 0.4;
    // private static HeadCount = 20;
    // /** 尝试填充 所需要的 小球数量*/
    // static tryfull(ballNum : number){
    //     let len = this.user_imgs.length;
    //     let times = 1;
    //     if(len < ballNum * this.fullRate){
    //         let temp = ballNum * this.fullRate - len;
    //         temp = temp < 0 ? 0: temp;
    //         times = Math.ceil(temp / this.HeadCount);
    //     }

    //     for(let i = 0; i < times ;i++){
    //         this.AddOnce();
    //     }
    // }

    private static tempArr : number[] = [];
    //随机筛选数据 
    private static randomURLs(count:number , outArr : string[]){
        outArr.length = 0;
        this.tempArr.length = 0;
        if(count <= 0 || !outArr || this.user_imgs.length <= 0)return;
        this.user_imgs.forEach((url,idx)=>{
            this.tempArr.push(idx);
        });
        
        let len = Math.min(this.user_imgs.length,count);

        //取随机位置
        for(let i=0 ; i < len ; i++){
            let idx = Math.floor( Math.random() * this.tempArr.length);
            let pos = this.tempArr[idx];
            outArr.push(this.user_imgs[pos]);
            this.tempArr.splice(idx,1);
        }
    }

    private static tempUrls : string[] = [];
    private static maxRate = 1/3; //大概 三个人 刷一次头像
    //分配数据 到balls
    static setIconUrls(rs:role[]){
        if(!rs || rs.length <= 0) return;
        let len = rs.length;
        this.randomURLs(len , this.tempUrls); //获取随机数据

        let rate = this.tempUrls.length / len;
        rate = rate > this.maxRate ? this.maxRate: rate; //过滤最大值

        for(let i=0;i < len ;i++){
            let r = rs[i];
            if(!r || !r.roleD)continue;
            r.roleD.iconUrl = "";
            if(i != 0 && Math.random() > rate)continue;  //第一个必加
            let url =  this.tempUrls.pop();
            if(!url) continue;
            r.roleD.iconUrl = url;
        }

    }

    //
    
    
}