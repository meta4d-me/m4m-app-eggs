import { tdTool } from "../Tool/tdTool"
import { joinTool } from "../Tool/joinTool"
import { GameMgr } from "../GameMgr";
import { uiMgr } from "../uiMgr";
import { videoPrizePage } from "../ui/pages/videoPrizePage";
export class wxTool {

    static wx = m4m["__wx__"];
    static init() {
        if (!this.wx) {
            console.warn(`__wx__ not find `);
            return;
        }
        m4m["_loadImgFun"] = this._loadImgFun.bind(this);
        // m4m["refSharedCanvas"] = this.refSharedCanvas.bind(this);

        this.ckInitSCanvas();
        this.setfullMode();
        this.wxSystemInfo = this.wx.getSystemInfoSync();
    }

    private static wxSystemInfo;
    static getStatusBarHeight() {
        if (!this.wx || !this.wxSystemInfo) return 0;
        return this.wxSystemInfo.statusBarHeight;
    }
    
    static getScreenHeightHeight() {
        if (!this.wx || !this.wxSystemInfo) return 0;
        return this.wxSystemInfo.screenHeight;
    }

    static _loadImgFun(url, callBack) {
        this.wx.downloadFile({
            url: url, //仅为示例，并非真实的资源
            success: function (res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    res.tempFilePath;
                    if (callBack) {
                        callBack(res.tempFilePath);
                    }
                }
            }
        })
    }

    //加载 方法
    static _loadFun(url, callBack, fail) {
        if (!this.wx) return;
        this.wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: {
                y: 0,
                x: 0
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (res.statusCode === 200) {
                    if (callBack) {
                        callBack(res);
                    }
                }
            },
            fail: function (res) {
                if (fail)
                    fail();
            }

        });
    }
    static login_invite: boolean = false;
    static myinfo = null;
    /** 显示用户授权按钮 */
    static showUserInfoBtn(callback: Function) {
        if (!wxTool.wx) {
            if (callback) callback();
            return;
        }
        let dPR = window.devicePixelRatio;
        let self = this;
        let sizeRate = 0.5;
        let sca = window.innerWidth / 720;
        // let _w = 273 * dPR ;
        // let _h = 77  * dPR;
        let _w = 160;
        let _h = 45;
        let _top = (window.innerHeight - _h) / 2;
        let _left = (window.innerWidth - _w) / 2;
        let offset_h = 160 * sca;

        let getUInfoFun = ()=>{
            wxTool.getUserInfo(callback);
            joinTool.tdcustomEvent(tdTool.Clicked_login_button, tdTool.Clicked_login_button);  //数据埋点
            joinTool.tdcustomEvent(tdTool.Clicked_approve_button, tdTool.Clicked_approve_button);  //数据埋点
        }

        if(!this.wx.createUserInfoButton){ //检测到 createUserInfoButton 有 undefined 的情况 版本过低
            getUInfoFun(); //2.0.1 以下的库 走old 兼容接口
            return;
        }

        let button = this.wx.createUserInfoButton({
            type: 'image',
            image: 'resource/login_bt.png',
            style: {
                left: _left,
                top: _top + offset_h,
                width: _w,
                height: _h
            }
        });
        button.onTap((res) => {
            console.warn(`button.onTap`, res);
            this.wx.getSetting({
                success(res) {
                    console.warn(`button.onTap +> getSetting`, res);
                }
            });
            this.ckUserInfoScope((isok) => {
                if (isok) {
                    getUInfoFun();
                    button.hide();
                    button.destroy();
                    GameMgr.isNewAuth = true;
                }
            });

        })
    }

    private static sharedCanvas;
    //检查 sharedCanvas 初始化
    private static ckInitSCanvas() {
        if (m4m["sharedCanvas"]) return;
        let openDataContext = this.wx.getOpenDataContext();
        this.sharedCanvas = m4m["sharedCanvas"] = openDataContext.canvas;//canvas
    }
    //检查 宽高设置
    private static setSCanvasWH(w: number, h: number) {
        this.sharedCanvas.width = w;
        this.sharedCanvas.height = h;
    }
    private static fIconSize = new m4m.math.vector2(32, 32); //跟随头像的 尺寸
    /** 设置 头像Icon跟随 或者 全屏 画板模式 */
    static setHeadFollowMode(isHFollow: boolean) {
        if (!this.wx) return;
        if (isHFollow == uiMgr.sCanvIconMode) return;
        uiMgr.sCanvIconMode = isHFollow;
        if (isHFollow) {
            this.setSCanvasWH(this.fIconSize.x, this.fIconSize.y);
        } else {
            this.setfullMode();
        }
    }

    private static setfullMode() {
        let c = uiMgr.overlay.canvas;
        this.setSCanvasWH(c.pixelWidth, c.pixelHeight);
    }

    private static texCount = 0;
    /** 刷新SharedCanvas */
    static refSharedCanvas() {
        let sharedCanvas = this.sharedCanvas;
        let gl = m4m.framework.sceneMgr.app.webgl;
        let rawImg = uiMgr.shareCanvasImg;
        if (!rawImg) return;
        //初始
        if (!rawImg["__initTag__"]) {
            //rawImg = window["frontPage"].handle.transform.children[5].getComponent("rawImage2D");

            let _texture = new m4m.framework.texture(`canvasTex_${this.texCount}`);
            this.texCount++;
            var _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
            //var t2d = new m4m.render.glTexture2D(assetMgr.webgl, _textureFormat);
            var t2d = new m4m.render.glTexture2D(gl, _textureFormat);
            t2d.uploadImage(sharedCanvas, false, true, false, false);
            _texture.glTexture = t2d;
            uiMgr.shareCanvasImg.image = _texture;

            rawImg["__initTag__"] = true;
        } else {
            //刷新 sharedCanvas 的图片
            let _tex = rawImg.image.glTexture;
            //_tex.uploadImage(sharedCanvas, false, true, false, false);
            gl.bindTexture(gl.TEXTURE_2D, _tex.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sharedCanvas);
        }
    }


    //打开
    static openMiniPrograme(appid: string, path: string) {
        if (!this.wx) return;
        this.wx.navigateToMiniProgram({
            appId: appid,
            path: path,
            extraDate: {
                foo: "bar"
            },
            envVersion: "release",
            success(res) {
                //打开成功
                console.warn("openMiniPrograme ok");
            }
        });
    }

    //微信 request
    static request(method, url, data = null, success = null, complete = null, fail = null) {
        console.log("request:", url, data);
        this.wx.request({
            data: data,
            method: method,
            dataType: "json",
            url: url,
            success: function (e) {
                console.log("request succ:", e);
                if (success) {
                    success(e.data);
                }
            },
            fail: function (e) {
                console.log("request fail:", e);
                if (fail) {
                    fail(e.data);
                }
            },
            complete: function (e) {
                if (complete) {
                    complete(e.data);
                }
            }
        });
    }

    private static loadTexIdx = 0;
    //加载 url texture 资源
    static ImgLoad(FilePath: string, backFun: (tex: m4m.framework.texture) => any) {
        //构建 img
        let img = new Image();
        img.src = FilePath;
        img.onload = () => {
            if (img.complete) {
                this.loadTexIdx++;
                let _texture = new m4m.framework.texture(`loadTex_${this.loadTexIdx}`);
                var _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
                var t2d = new m4m.render.glTexture2D(m4m.framework.sceneMgr.app.webgl, _textureFormat);
                t2d.uploadImage(img, false, true, false, false, false); //非2次幂 图 不能显示设置repeat
                _texture.glTexture = t2d;
                _texture.use();
                if (backFun)
                    backFun(_texture);
            }
        }
    }

    //获取音频组件
    static overAudio() {

    }

    //获取 audioContext
    private static createAUD(url: string, volume: number) {
        let actx = this.wx.createInnerAudioContext();
        actx.src = url;
        actx.volume = volume;
        actx.loop = false;
        actx.autoplay = true;
        return actx;
    }

    //存取个人数据
    static saveData(fName: string, data_: object, callBack: Function, fial_: Function) {
        if (!this.wx) {
            if (fial_) {
                fial_();
            }
            return;
        }
        this.wx.setStorage({
            key: fName,
            data: data_,
            success: callBack,
            fail: fial_
        });
    }

    //请求获取 保存的数据
    static reqData(fName: string, callBack: (data) => any, fial_: Function) {
        if (!this.wx) {
            if (fial_) {
                fial_();
            }
            return;
        }
        this.wx.getStorage({
            key: fName,
            success: callBack,
            fail: fial_
        });
    }

    //震动短
    static vibrateShort() {
        if (!this.wx || !GameMgr.swVibrate) return;
        this.wx.vibrateShort();
    }

    //震动长
    static vibrateLong() {
        if (!this.wx || !GameMgr.swVibrate) return;
        this.wx.vibrateLong();
    }

    static saveImageToPhotosAlbum(filePath: string) {
        if (!this.wx || !GameMgr.swVibrate) return;
        this.wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success(res) {
                console.log("保存成功!");
            },
            fail() {
                console.log("保存失败!");
            }

        })
    }

    private static readonly scopeUif = "scope.userInfo";
    static appid = "wx0d8834040cfabdf5";
    /** 用户授权设置 */
    static userSetings(callback: Function, ckEnd: (isAuthed: boolean) => any = null) {
        if (!this.wx) {
            callback();
            return;
        }

        this.ckUserInfoScope((isok: boolean) => {
            if (isok) {
                wxTool.getUserInfo(callback);

            } else {
                wxTool.showUserInfoBtn(callback);
            }

            if (ckEnd) {
                ckEnd(isok);
            }
        });
    }

    //检查 用户信息获取 授权是否完成
    static ckUserInfoScope(callback: (isOk: boolean) => any) {
        let self = this;
        this.wx.getSetting({
            success(res) {
                let isad = res.authSetting[self.scopeUif];
                console.log(` 用户信息授权 : ${isad} `);

                if (callback)
                    callback(isad);
            }
        });

    }

    // //检查 是否授权 ， 授权完毕 后 回调
    // static ckAuthorize(callback: Function) {
    //     wxTool.wx.authorize({
    //         scope: "scope.userInfo",
    //         success: function () {
    //             wxTool.getUserInfo(callback);
    //         },
    //         fail: function () {
    //             console.log("拒绝授权");
    //         }

    //     });
    // }

    private static userInfoRes;
    /** 获取用户info */
    private static getUserInfo(callback: Function) {
        if (!this.wx) {
            if (callback) callback();
            return;
        }
        let self = this;
        wxTool.wx.getUserInfo({
            success(res) {
                wxTool.userInfoRes = res;
                // console.log(res);
                self.myinfo = res.userInfo;
                if (GameMgr.netMode) {
                    wxTool.wxLogin(callback);
                }
                else {
                    if (callback) callback();
                }

            }
        })
    }
    static token = "";
    // static DNS_AND_PORT = "https://dev-ballrace.upaidui.com";   //育碧测试服
    // static DNS_AND_PORT = "https://wd.h5game.live:6002";    
    //内网虚拟机---144
    //static STATISTICS_DNS_AND_PORT = "http://192.168.88.144:9001";


    // static DNS_AND_PORT = "https://wq.h5game.live:9006";    //外网测试服

    //static DNS_AND_PORT = "http://192.168.88.247:9001";
    //  static DNS_AND_PORT = "https://prod-ballrace.upaidui.com"; //育碧正式服
    //是否是新用户
    static isNewPlayer: boolean = false;
    //邀请成功?
    static youqingcg: boolean = false;

    private static readonly Fname = "playerToken";
    static wxLogin(callback: Function) {
        if (!this.wx) return;
        GameMgr.onGameShow = this.ckReAct.bind(this);
        //启动参数
        let params = wxTool.wx.getLaunchOptionsSync();
        //每日分享状态 检查
        console.log(params);
        console.log(params.query);

        let onGetToken = () => {
            wxTool.CKShareCardParams(params.query);
            if (callback) callback();
        }

        //检查 历史保存的自定义登录状态数据
        //没有数据 向服务器请求
        wxTool.reqData(this.Fname, (obj) => {
            if (obj.data && obj.data.token) {
                wxTool.token = obj.data.token;
                if (onGetToken) onGetToken();
                console.log(`获取 openid 通过本地`);
            } else {
                wxTool.loginToWX(onGetToken);
            }
        }, () => {
            wxTool.loginToWX(onGetToken);
        });
    }

    //请求登录到微信
    static loginToWX(callback: Function) {
        console.log(`获取 openid 通过服务器`);
        this.login_invite = true;
        this.wx.login({
            success(res) {
                if(wxTool.isFristLogin) return; //以及处理过了

                wxTool.loginToServer(res, callback);
                wxTool.ckLoginTimeOut(callback);  //自定义超时检测 秒后超时
            },
            fail(res) {
                if(wxTool.isFristLogin) return; //以及处理过了
                
                setTimeout(()=>{
                    wxTool.loginToWX(callback); //尝试重新 调用loginToWX
                },500);
                console.warn(`wx.login 失败，再次尝试`);
            }
        })
    }

    /** 初次登录 用户 */
    static isFristLogin = false;
    //请求 登录到 服务器
    private static loginToServer(res, callback: Function) {
        if (res.code) {
            //appid=${wxTool.appid}&secret=${wxTool.appSecret}&
            // let url = `${GameMgr.DNS_AND_PORT}/wxlogin?js_code=${res.code}&dawdata=${res.rawData}&invitationData=${wxTool.invitationData}`;
            let tRes = wxTool.userInfoRes;
            let rawData = tRes ? tRes.rawData : null;
            let url = `${GameMgr.DNS_AND_PORT}/wxlogin?js_code=${res.code}&dawdata=${rawData}`;
            // 发起网络请求
            console.log(`开始请求登录。。。 `+url);
            wxTool.wx.request({
                url: url,
                success: function (res) {
                    if(wxTool.isFristLogin) return; //以及处理过了

                    if(res.data && res.data.openid != null){
                        wxTool.token = res.data.openid;
                        wxTool.isNewPlayer = res.data.isNewPlayer;
                    }

                    wxTool.youqingcg = res.data.invite;
                    if (wxTool.token && wxTool.token != "undefined") {
                         console.log('登录成功!' + wxTool.token);
                        //保存数据到本地
                        let obj = { token: wxTool.token }
                        wxTool.saveData(wxTool.Fname, obj, null, null);
                        wxTool.isFristLogin = true;
                        if (callback) callback();
                    } else {
                        setTimeout(()=>{
                            wxTool.loginToWX(callback); //尝试重新 调用loginToWX
                        },500);
                    }

                    if (res.data && res.data.errcode != null) {
                        if( res.data.errcode == 40163){
                            console.error(`这个错误是 40163  `);
                        }
                        console.error(`onerr : ${res.data.errcode}`,res);
                    }
                },
                fail: function (res) {
                    if(wxTool.isFristLogin) return; //以及处理过了
                    console.log('登录失败！')
                    console.log(res);
                    setTimeout(()=>{
                        wxTool.loginToWX(callback); //尝试重新 调用loginToWX
                    },500);
                }
            })
        } else {
            console.log('登录失败！' + res.errMsg)
        }
    }

    private static ckTime = 3000;
    //检查网络超时 避免卡在loading 状态
    private static ckLoginTimeOut( callback: Function){
        setTimeout(()=>{
            if(!wxTool.isFristLogin){
                wxTool.loginToWX(callback);
            }
        },wxTool.ckTime);
    }

    // static OnInvitation(params) {
    //     // console.log("成功被邀请");
    //     params.query["formAppID"] = params.referrerInfo.appId;
    //     let str = JSON.stringify(params.query);
    //     ///  console.log(`启动参数:${str}`);
    //     let shareType = this.viaShare(params.query);
    //     if (!(shareType == 2 || shareType == 3))
    //         return;
    //     wxTool.invitationData = str;
    // }

    //卡片点击 进入 事件上传
    private static viaShare(query) {
        // 分享入口埋点
        let { shareType, subID, abTag } = query;
        let tdpar = {};
        if (subID == null)
            subID = 0;
        tdpar['shareType_' + shareType] = 'id_' + subID;
        let label = tdTool.viaShare + abTag;
        joinTool.tdcustomEvent(label, label, tdpar);
        return shareType;
    }

    //检测  每日邀请 或 新年邀请 游戏不关闭点击, 链接 回调
    private static ckReAct(params) {
        if (params) {
           
            wxTool.CKShareCardParams(params.query);
            console.log("分享卡片数据 开始进库了");
        }
    }

    //检查 每日邀请 、新年邀请 
    private static CKShareCardParams(query) {
        if (!query) return;
        let shareType = this.viaShare(query);
        if (!(shareType == 2 || shareType == 3)) return;  //过滤 非 每日分享 & 新春活动

        let str = JSON.stringify(query);
        if (!str || !wxTool.token || str == "{}") return;

        let url = `${GameMgr.DNS_AND_PORT}/invitationData?token=${wxTool.token}&invitationData=${str}&isNewPlayer=${wxTool.isNewPlayer}`;
        wxTool.wx.request({
            url: url,
            success: function (res) {
                if (res.data && res.data.body && res.data.body.isC) { //我自己点击了别人的每日分享的链接 ， 获取奖励金币
                    videoPrizePage.shareCardParams();
                }
            },
            fail: function (res) {
                console.error(res);
            }
        })
    }

}