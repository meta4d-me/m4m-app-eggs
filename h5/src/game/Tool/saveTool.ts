import { GameMgr } from "../GameMgr";
import { wxTool } from "./wxTool";
//保存工具
export class saveTool {
    private static readonly Fname = "playerDate";
    static swSound = true; //声音开关
    static swHighEffect = false; //高特效
    static swVibrate = true; //震动开关
    static diamond: number = 0; //钻石数量
    static currentLevel: number = 0;    // 当前关卡
    static unlockSkins = { 0: true, 23: true }; //解锁的皮肤 {1：true,2:true,3:true} （toSever ）
    static currUseSkin: number = 0; //当前使用的皮肤 id  （toSever ）
    static lastLoginTime = 0; //上一次登录时间
    static unlockTheme = { 0: true, 6: true }; //解锁的主题 {1：true,2:true,3:true} （toSever ）
    static currUseTheme: number = 0; //当前使用的主题 id  （toSever ）
    static newRecord = 0;//新纪录  历史最高分 （toSever ）xx关[bestScore >> 16] 、 xx名[bestScore & 65535] 
    static newYear_invite = false;//新年活动是否已经邀请过好友
    static newYear_inviteSucceed = false; //新年活动是否已经领取了?
    static shareActivity: number = 0; //每日分享领取了多少次最后的奖励
    static videoSkin_num = {};//看视频解锁的皮肤看视频的数量
    static rests = {};
    //上一次弹窗时间--->
    static win_time: string = "1970-1-1";
    //user_imgs[0].avatarUrl 
    static user_imgs: any[];

    //示例
    //同步数据
    //   saveTool.requestData("http://192.168.88.247:9001");
    //同步服务器的数据到本地
    private static requestData(url_, token, callBack: Function, fial: Function) {
        if (!wxTool.token || wxTool.token == "undefined") return;

        //   fial();

        let url = url_ + `/getattr?token=${token}`

        //console.log(url);
        wxTool._loadFun(url, (res) => {
            let data = res.data;
            console.log(data);
            if (data.message != "success") {
                console.log(data.message);
                // console.log(url);
                //请求数据失败后 再请求一次login 流程 （客户端登录过 缓存了token ， 服务器找不到 对应token的数据）
                setTimeout(() => {
                    wxTool.loginToWX(() => {
                        saveTool.requestData(url_, wxTool.token, callBack, fial);  //重新尝试
                    });
                }, 100);
            } else {
                let body = data.body;
                try {
                    saveTool.diamond = body.diamond;
                    saveTool.currUseSkin = parseInt(body.currUseSkin);
                    saveTool.currUseTheme = parseInt(body.currUseTheme);
                    saveTool.unlockSkins = body.unlockSkins;
                    saveTool.unlockTheme = body.unlockTheme;
                    saveTool.currentLevel = parseInt(body.currentLevel);
                    saveTool.newRecord = parseInt(body.newRecord);
                    saveTool.shareActivity = parseInt(body.shareActivity);
                    saveTool.newYear_invite = body.newYear_invite;
                    saveTool.newYear_inviteSucceed = body.newYear_inviteSucceed;
                    saveTool.swSound = body.swSound;
                    saveTool.swHighEffect = body.swHighEffect;
                    saveTool.swVibrate = body.swVibrate;
                    saveTool.videoSkin_num = body.videoSkin_num;
                    console.log(saveTool.videoSkin_num);
                    console.log("saveTool.videoSkin_num");
                    console.log(saveTool.unlockSkins);
                    console.log("saveTool.unlockSkins");
                    saveTool.rests = body.rests;
                    saveTool.unlockSkins[0] = true;
                    saveTool.unlockTheme[0] = true;
                    console.log("同步服务器的数据到本地");
                    callBack();
                } catch (e) {
                    setTimeout(() => {
                        saveTool.requestData(url_, token, callBack, fial); //重新尝试
                    }, 100);
                    console.log("同步服务器的数据到本地失败");
                    console.log(e);
                }

                //console.log(body);

            }

        }, () => {
            setTimeout(() => {
                saveTool.requestData(url_, token, callBack, fial); //重新尝试
            }, 100);
            // saveTool.downLoad(null, null);
        });

    }
    //示例
    //  saveTool.syncData("http://192.168.88.247:9001");
    //同步本地的数据到服务器
    private static syncData(url, token, callBack: Function, fial: Function) {
        if (wxTool.token == "" && wxTool.token == undefined || wxTool.token == "undefined") return;

        url = url + `/syncattr?token=${token}&diamond=${this.diamond}&currUseSkin=${this.currUseSkin}&currUseTheme=${this.currUseTheme}&unlockSkins=${JSON.stringify(this.unlockSkins)}&unlockTheme=${JSON.stringify(this.unlockTheme)}&newRecord=${this.newRecord}&currentLevel=${this.currentLevel}`;
        url = url + `&shareActivity=${saveTool.shareActivity}&newYear_invite=${saveTool.newYear_invite}&newYear_inviteSucceed=${saveTool.newYear_inviteSucceed}&swSound=${saveTool.swSound}&swHighEffect=${saveTool.swHighEffect}&swVibrate=${saveTool.swVibrate}&videoSkin_num=${JSON.stringify(saveTool.videoSkin_num)}&rests=${JSON.stringify(saveTool.rests)}`

        wxTool._loadFun(url, function (res) {

            console.log("同步本地的数据到服务器!");
            if (callBack)
                callBack();
        }, function () {
            saveTool.save(null, null);
        });
    }




    //清理数据
    static clearData() {
        let clear = {};
        clear["swSound"] = true;
        clear["swHighEffect"] = false;
        clear["swVibrate"] = true;
        clear["diamond"] = 0;
        clear["currentLevel"] = 0;
        clear["unlockSkins"] = {};
        clear["currUseSkin"] = 0;
        clear["lastLoginTime"] = 0;
        clear["newRecord"] = 0;
        wxTool.saveData(this.Fname, clear, () => {
            console.error(`init date to server Success`);
        }, null);
    }

    private static jsonObj = {};
    static save(callBack: Function, fial: Function) {

        if (GameMgr.netMode) {
            this.syncData(GameMgr.DNS_AND_PORT, wxTool.token, callBack, fial);
        }
        else {
            this.jsonObj["swSound"] = this.swSound;
            this.jsonObj["swHighEffect"] = this.swHighEffect;
            this.jsonObj["swVibrate"] = this.swVibrate;
            this.jsonObj["diamond"] = this.diamond;
            this.jsonObj["currentLevel"] = this.currentLevel;
            this.jsonObj["unlockSkins"] = this.unlockSkins;
            this.jsonObj["currUseSkin"] = this.currUseSkin;
            this.jsonObj["lastLoginTime"] = this.lastLoginTime;
            this.jsonObj["newRecord"] = this.newRecord;
            wxTool.saveData(this.Fname, this.jsonObj, () => {
                if (callBack) {
                    callBack();
                }
                console.error(`save date to server Success`);
            }, fial);
        }

        /*  
    */

    }

    /** 下载同步数据 */
    static downLoad(callBack: Function, fial: Function) {

        if (GameMgr.netMode) {
            this.requestData(GameMgr.DNS_AND_PORT, wxTool.token, callBack, fial);
        } else {
            wxTool.reqData(this.Fname, (obj) => {
                this.setConf(obj.data);

                console.error(`downLoad date Success`);
                if (callBack) {
                    callBack();
                }
            }, fial);
        }


    }

    private static setConf(obj: object) {
        for (let k in obj) {
            saveTool[k] = obj[k];
        }
    }

    //获取好友头像
    static headPortrait() {
        let token = wxTool.token;
        if (wxTool.token == "" || wxTool.token == undefined || wxTool.token == "undefined") return;
        let url = GameMgr.DNS_AND_PORT + "/headPortrait?token=" + token;
        wxTool._loadFun(url, function (res) {
            saveTool.user_imgs = res.data.body;
        }, null);
    }


    //保存到本地
    static savaToNative(callBack: Function, fial: Function) {
        this.jsonObj["win_time"] = this.win_time;
        wxTool.saveData(this.Fname, this.jsonObj, () => {
            if (callBack) {
                callBack();
            }
            console.error(`save date to server Success`);
        }, fial);
    }
    //读取本地信息
    static downLoaodNative(callBack: Function, fial: Function) {
        wxTool.reqData(this.Fname, (obj) => {
            saveTool.setConf(obj.data);
            console.error(`downLoad date Success`);
            if (callBack) {
                callBack();
            }
        }, fial);

    }
    /**
     * 统计数据存储
     * @info  统计内内容串
     * @targetId  统计目标id
     */
    static sava_statistics(info: string, targetId: number) {
        //http://192.168.88.144:9001/Statistics?token=5465&info=%22info%22&targetId=1
        /*let url = `${wxTool.STATISTICS_DNS_AND_PORT}/Statistics?token=${wxTool.token}&info=${info}&targetId=${targetId}`
        wxTool._loadFun(url, function (res) {
    
            let data = res.data;
            console.log(data);
            if (data.message != "success" || data.body != "同步失败!") {
                console.error("统计数据保存失败!");
            } else {
                console.error("统计数据保存成功!");
            }
    
        }, function () {
            saveTool.downLoad(null, null);
        });*/
    }
}