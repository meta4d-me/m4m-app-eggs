import { engineParallelType } from "./engineParallel/spInterface";
import { GameInfoUtil } from "./GameInfoUtil";

// tslint:disable-next-line: max-line-length
type SocketTask = { send(p): any, close(p): any, onOpen(cb: Function): any, onClose(cb: Function): any, onError(cb: Function): any, onMessage(cb: Function): any };
// tslint:disable-next-line: max-line-length
type socketConnectOption = { url: string, protocols?: string[], timeout?: number, success?: Function, fail?: Function, complete?: Function, header?: object, tcpNoDelay?: boolean, perMessageDeflate?: boolean };

export enum miniAPIType {
    none,
    wechat,
    qq,
    tikTok,
    vivo,
    oppo,
}

/**
 *  小游戏平台API 
 */
// tslint:disable-next-line: class-name
export class miniGame {
    /** 引擎并行类型(m4mH5 , 微信牛肉丸 ， qq性能引擎) */
    public static engineParallel: engineParallelType = engineParallelType.none;

    /** 账号凭证 */
    public static token = "";
    /** 获取小游戏启动时的参数 
        scene	number	启动小游戏的场景值
        query	Object	启动小游戏的 query 参数
        shareTicket	string	shareTicket，详见获取更多转发信息
        referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}。(参见后文注意)
    */
    public static LaunchOptions;
    /** 自己的用户信息 */
    public static myUserInfo;
    /** 小游戏平台类型 */
    public static miniType: miniAPIType = miniAPIType.none;
    /**系统信息 */
    public static wxSystemInfo;

    // static login_invite: boolean = false;
    public static AuthorizeButton: any;

    //离线功能 ID
    public static lxstr: string = "6NxisNRDY4SEblxA_9Oqz8KiRq8Zh4xmiO0JP6nwSlc";
    //版本更新提示 ID
    public static versionUpDateStr: string = "M3NPYUW97o6EhBjkpHVuH07Ejm2BEIC02-zM_2svU5s";

    // //限时抢购结束提醒
    // static flashSaleEndStr: string = "yYVVksMBajbNu9fnisWlAXfXNQUcpYTumfLEARGaCgc";

    //限时抢购开启提醒
    public static flashSaleStartStr: string = "_vNQOaQCmHEbvg4x0c497PU4OzEsd-lvW2ObYOrws_I";

    //是否已订阅 活动提醒
    public static isActivitySubscribe: boolean = false;

    //是否已订阅 版本更新
    public static isVersionUpDateSubscribe: boolean = false;

    public static isSubscribe: boolean = false;
    private static uiMgr;   //UI 管理器对象

    private static miniObj: IMiniAPIStruct;
    private static readonly scopeUif = "scope.userInfo";
    private static sharedCanvas;

    /** miniGame 初始化 */
    private static PreInit() {
        if (m4m["__wx__"]) {
            this.miniType = miniAPIType.wechat;
            this.miniObj = new WxMiniApi(m4m["__wx__"]);
        } else if (m4m["__qq__"]) {
            this.miniType = miniAPIType.qq;
            this.miniObj = new QQMiniApi(m4m["__qq__"]);
        } else if (m4m["__TT__"]) {
            this.miniType = miniAPIType.tikTok;
        } else if (m4m["__qg_vivo__"]) {
            this.miniType = miniAPIType.vivo;
            this.miniObj = new VivoMiniApi(m4m["__qg_vivo__"]);
        } else if (m4m["__qg_oppo__"]) {
            this.miniType = miniAPIType.oppo;
            console.error("暂未支持 oppo  API");
        } else {
            console.warn("当前不处于小游戏环境 ");
        }

        //取特有API
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            this.wxSystemInfo = this.miniObj.handle.getSystemInfoSync();
            this.LaunchOptions = this.miniObj.handle.getLaunchOptionsSync();
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        } else if (this.miniType == miniAPIType.vivo) {
            let data = this.miniObj.handle.getSystemInfoSync();
            //向微信接口对齐
            this.wxSystemInfo = {
                brand: data.brand,
                model: data.model,
                platform: `${data.platformVersionName} ${data.platformVersionCode}`,
            };
        }

        let nullFun = () => null;
        //如果不是小游戏平台 ， 清理相关函数
        if (this.miniType != miniAPIType.none) { return; }
        for (let key in miniGame) {
            if (typeof (miniGame[key]) === "function") {
                miniGame[key] = nullFun;
            }
        }
    }

    /** 初始化 */
    public static init(uiMgr) {
        this.uiMgr = uiMgr;
        //微信报错 收集上传到统计服务器
        if (this.miniObj && this.miniObj.handle.onError) {
            this.miniObj.handle.onError((res) => {
                let errM: string = "message:" + res.message + "__stack:" + res.stack;
                console.error(errM);
                //jsManager.ErrorMessageSendFun(errM);
            });
        }
        m4m["_loadImgFun"] = this._loadImgFun.bind(this);
        // m4m["refSharedCanvas"] = this.refSharedCanvas.bind(this);

        //取特有API
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            this.ckInitSCanvas();
            this.setfullMode();
            // this.wxSystemInfo = this.miniObj.handle.getSystemInfoSync();
            // this.LaunchOptions = this.miniObj.handle.getLaunchOptionsSync();
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        this.getUserInfo(null);//为了获取用户信息
    }

    /**
     * 刷新SystemInfo
     * @param callBackFun 结束回调
     */
    public static refreshSystemInfo(callBackFun: (err) => any) {
        this.miniObj.handle.getSystemInfo({
            success: (res) => {
                miniGame.wxSystemInfo = res;
                if (callBackFun) { callBackFun(null); }
            },
            fail: (err) => {
                callBackFun(err);
            },
        });
    }

    // /** 屏幕 状态条高度（刘海屏处理）*/
    // static getStatusBarHeight() {
    //     if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
    //         return this.wxSystemInfo.statusBarHeight;
    //     }
    //     return 0;
    // }

    // /** 屏幕 高度*/
    // static getScreenHeight() {
    //     if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
    //         return this.wxSystemInfo.screenHeight;
    //     }
    //     return 0;
    // }

    /** 获取API 版本 */
    public static getAPIVersion() {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            return this.wxSystemInfo.version;
        }
        return 0;
    }

    /** 短震动 */
    public static vibrateShort() {
        this.miniObj.vibrateShort();
    }

    /** 长震动 */
    public static vibrateLong() {
        this.miniObj.vibrateLong();
    }

    //打开
    public static openMiniPrograme(appid: string, path: string) {
        this.miniObj.navigateToMiniProgram({
            appId: appid,
            path,
            extraDate: {
                foo: "bar",
            },
            envVersion: "release",
            success(res) {
                //打开成功
                console.warn("openMiniPrograme ok");
            },
        });
    }

    /** 刷新SharedCanvas */
    public static refSharedCanvas() {
        if (!this.sharedCanvas) { return; }
        let sharedCanvas = this.sharedCanvas;
        let gl = m4m.framework.sceneMgr.app.webgl;
        let rawImg = this.uiMgr.shareCanvasImg;
        if (!rawImg) { return; }
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);   //不启用的话 ios 会出现绘制翻转bug
        //刷新 sharedCanvas 的图片
        let _tex = rawImg.image.glTexture;
        gl.bindTexture(gl.TEXTURE_2D, _tex.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sharedCanvas);
    }

    /** 设置 头像Icon跟随 或者 全屏 画板模式 */
    public static setHeadFollowMode(isHFollow: boolean, portrailFollowMgr) {
        if (!this.sharedCanvas) { return; }
        if (isHFollow == this.uiMgr.sCanvIconMode) { return; }
        console.log(`setHeadFollowMode isHFollow :${isHFollow}`);
        this.uiMgr.sCanvIconMode = isHFollow;
        if (isHFollow) {
            // this.setSCanvasWH(this.fIconSize.x, this.fIconSize.y);
            let iPixel = portrailFollowMgr.iconPixel;
            this.setSCanvasWH(iPixel * portrailFollowMgr.iconCount, iPixel);
            // this.setSCanvasWH(1280,720);
        } else {
            this.setfullMode();
        }
    }

    /** 获取用户info */
    public static getUserInfo(callback: Function) {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            return new Promise((resolve, reject) => {
                // tslint:disable-next-line: no-this-assignment
                let self = this;
                this.miniObj.handle.getUserInfo({
                    success(res) {
                        // wxTool.userInfoRes = res;
                        GameInfoUtil.avatarUrl = res.userInfo.avatarUrl;
                        GameInfoUtil.wxName = res.userInfo.nickName;
                        GameInfoUtil.province = res.userInfo.province;
                        GameInfoUtil.city = res.userInfo.city;
                        GameInfoUtil.gender = res.userInfo.gender;
                        self.myUserInfo = res.userInfo;

                        if (callback) { callback(); }
                        resolve(res);
                    },
                });

            });
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        if (callback) { callback(); }
        return;
    }
    // static show_button: boolean = false;
    /** 显示用户授权按钮 */
    public static showUserAuthorizeBtn(callback: Function, onTapFun?: Function, onckUserInfoScope?: Function) {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            let l = this.wxSystemInfo;
            let button = this.miniObj.handle.createUserInfoButton({
                type: "image", //按钮类型
                // text: "",
                image: "",
                //resource/shouquan_btn.png
                style: {  //按钮样式
                    left: l.screenWidth / 2 - (100),
                    top: l.screenHeight / 2 + (l.screenHeight / 5) - 5,
                    width: 230,
                    height: 62,
                },
            });
            console.log("微信授权登录的按钮显示");
            button.show();
            this.AuthorizeButton = button;
            // this.show_button = true;
            //点击授权按钮
            button.onTap((res) => {
                //授权按钮的点击的回调
                if (onTapFun) { onTapFun(); }
                let callBackFun = async (isok) => {
                    if (isok) {
                        //获取用户信息
                        let _res = await this.getUserInfo(callback);
                        //隐藏按钮
                        button.hide();
                        //摧毁按钮
                        button.destroy();
                        if (onckUserInfoScope) {
                            onckUserInfoScope(_res);
                        }
                        // //把用户信息保存到服务器
                        // saveTool.sava_tawData(_res["rawData"]);

                        // GameMgr.isNewAuth = true;
                    }
                };
                //检查授权情况
                this.ckUserInfoScope(callBackFun);
            });

            return;
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        if (callback) { callback(); }
        return;
    }

    /**
     * 创建用户信息按钮
     * @param p 参数
     */
    public static createUserInfoButton(p: {}) {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            return this.miniObj.handle.createUserInfoButton(p);
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        return {};
    }
    //检查 用户信息获取 授权是否完成
    public static ckUserInfoScope(callback: (isOk: boolean) => any) {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            // tslint:disable-next-line: no-this-assignment
            let self = this;
            this.miniObj.handle.getSetting({
                withSubscriptions: true,
                success(res) {
                    let isad = false;
                    if (res.authSetting) {
                        isad = res.authSetting[self.scopeUif];
                        console.log(` 用户信息授权 : ${isad} `);
                        if (res.subscriptionsSetting) {
                            let dy = res.subscriptionsSetting["itemSettings"];
                            if (dy) {
                                miniGame.isSubscribe = dy[miniGame.lxstr] == "accept";
                                miniGame.isVersionUpDateSubscribe = dy[miniGame.versionUpDateStr] == "accept";
                                miniGame.isActivitySubscribe = dy[miniGame.flashSaleStartStr] == "accept";
                            }
                            // res.subscriptionsSetting["mainSwitch"];
                            console.log("是否已订阅离线提醒  " + miniGame.isSubscribe);
                        }
                    }
                    if (callback) {
                        callback(isad);
                    }
                },
            });
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

    }

    /** 触发GC */
    public static triggerGC() {
        this.miniObj.triggerGC();
    }

    //加载 方法
    public static loadFun(url, callBack, fail) {
        this.miniObj.request({
            url, //仅为示例，并非真实的接口地址
            data: {
                y: 0,
                x: 0,
            },
            header: {
                "content-type": "application/json", // 默认值
            },
            success(res) {
                if (res.statusCode === 200) {
                    if (callBack) { callBack(res); }
                }
            },
            fail(res) {
                if (fail) { fail(); }
            },
        });
    }

    /**
     * http request 接口
     * @param p 参数
     */
    public static request(p: {}) {
        this.miniObj.request(p);
    }

    /**
     * http request 接口 , Simple 接口
     * dataType 固定为 json
     * 回调函数返回参 data == res.data
     * @param method 
     * @param url 
     * @param data 
     * @param success 成功回调函数
     * @param complete 完成回调函数
     * @param fail 失败回调函数
     */
    public static requestSimple(method, url: string, data: any, success?: (data) => any, complete?: (data) => any, fail?: (data) => any) {
        this.miniObj.request({
            data,
            method,
            dataType: "json",
            url,
            success(res) {
                if (success) { success(res.data); }
            },
            fail(res) {
                console.log("request fail:" + res.message);
                if (fail) { fail(res.data); }
            },
            complete(res) {
                if (complete) { complete(res.data); }
            },
        });
    }

    /** 保存图片到相册 */
    public static saveImageToPhotosAlbum(filePath: string) {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            this.miniObj.saveImageToPhotosAlbum({
                filePath,
                success(res) {
                    //  console.log("保存成功!");
                },
                fail() {
                    //    console.log("保存失败!");
                },
            });
        }
    }

    /**存个人数据*/
    public static saveData(fName: string, _data: object, callBack: Function, _fial: Function) {
        if (this.miniType == miniAPIType.none) {
            if (_fial) { _fial(); }
            return;
        }
        this.miniObj.setStorage({
            key: fName,
            data: _data,
            success: callBack,
            fail: _fial,
        });
    }

    /** 请求获取 保存的数据*/
    public static reqData(fName: string, callBack: (data) => any, _fial: Function) {
        if (this.miniType == miniAPIType.none) {
            if (_fial) { _fial(); }
            return;
        }
        this.miniObj.getStorage({
            key: fName,
            success: callBack,
            fail: _fial,
        });
        return;
    }

    /**显示模态对话框*/
    public static showModal(p: {}) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.showModal(p);
    }

    /** 调用接口获取登录凭证 */
    public static login(p: {}) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.login(p);
    }

    /**
     * 获取小游戏启动时的参数
     */
    public static getLaunchOptionsSync() {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            return this.miniObj.handle.getLaunchOptionsSync();
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        return {};
    }

    /**
     * 获取转发详细信息
     * @param p 参数
     */
    public static getShareInfo(p: {}) {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            this.miniObj.handle.getShareInfo(p);
            return;
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        return;
    }

    /**
     * 调起客户端小游戏订阅消息界面
     * @param p 参数
     */
    public static requestSubscribeMessage(p: {}) {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            this.miniObj.handle.requestSubscribeMessage(p);
            return;
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        return;
    }

    /**
     *  创建内部 audio 上下文 InnerAudioContext 对象。
     */
    public static createInnerAudioContext() {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            return this.miniObj.createInnerAudioContext();
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        return;
    }

    /**
     * 监听内存不足告警事件
     * @param f 内存不足告警事件的回调函数
     */
    public static onMemoryWarning(f: Function) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.onMemoryWarning(f);
    }

    /**
     * 可以修改渲染帧率。默认渲染帧率为 60 帧每秒。修改后，requestAnimationFrame 的回调频率会发生改变。
     * @param fps 帧率，有效范围 1 - 60。
     */
    public static setPreferredFramesPerSecond(fps: number) {
        if (this.miniType == miniAPIType.wechat || this.miniType == miniAPIType.qq) {
            return this.miniObj.handle.setPreferredFramesPerSecond(fps);
        } else if (this.miniType == miniAPIType.tikTok) {
            let temp;
        }

        return;
    }
    /**
     * 监听小游戏隐藏到后台事件
     * @param f 
     */
    public static onHide(f: Function) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.onHide(f);
    }

    /**
     * 监听小游戏回到前台的事件
     * @param f 
     */
    public static onShow(f: Function) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.onShow(f);
    }

    /**
     * 监听鼠标按键按下事件
     * @param f
     */
    public static onMouseDown(f: (p: {}) => any) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.onMouseDown(f);
    }
    /**
     * 监听鼠标按键弹起事件
     * @param f
     */
    public static onMouseUp(f: (p: {}) => any) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.onMouseUp(f);
    }

    /**
    * 显示键盘
    */
    public static showKeyboard(keyBoardObj: {}) {
        if (this.miniType == miniAPIType.none) { return; }

        this.miniObj.showKeyboard(keyBoardObj);
    }

    /**
     * 监听键盘输入事件
     * @param f
     */
    public static onKeyboardInput(f: (p: {}) => any) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.onKeyboardInput(f);
    }

    /**
     * 取消监听键盘输入事件
     * @param f
     */
    public static offKeyboardInput(f: (p: {}) => any) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.offKeyboardInput(f);
    }

    /**
    * 监听用户点击键盘 Confirm 按钮时的事件
    */
    public static onKeyboardConfirm(keyBoardObj: {}) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.onKeyboardConfirm(keyBoardObj);
    }

    /**
    * 取消监听用户点击键盘 Confirm 按钮时的事件
    */
    public static offKeyboardConfirm(keyBoardObj: {}) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.offKeyboardConfirm(keyBoardObj);
    }

    /**
    * 发起米大师支付
    */
    public static requestMidasPayment(fun: {}) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.requestMidasPayment(fun);
    }

    /**
     * 隐藏键盘
     * @param f
     */
    public static hideKeyboard(obj: {}) {
        if (this.miniType == miniAPIType.none) { return; }
        this.miniObj.hideKeyboard(obj);
    }

    /**
     * 统计 场景分析上报
     */
    public static reportUserBehaviorBranchAnalytics(branchId: string, branchDim: number, eventType: number) {
        if (this.miniType == miniAPIType.none) { return; }
        // if (!GameInfoUtil.compareSDKVersion('2.12.1', false)) {
        //     console.error("reportUserBehaviorBranchAnalytics 当前SDK 版本过低！ " + GameInfoUtil.SDKVersion);
        //     return;
        // }
        let branchDimStr: string = branchDim.toString();
        // if (eventType == null) {
        //     this.miniObj.reportUserBehaviorBranchAnalytics({
        //         branchId: branchId,
        //         branchDim: branchDimStr
        //     });
        // } else {
        this.miniObj.reportUserBehaviorBranchAnalytics({
            branchId,
            branchDim: branchDimStr,
            eventType,
        });
        // }
    }
    /**
     * 获取 离屏canvas
     * @param customID 
     */
    public static getOffScreenCanvas(customID: string): HTMLCanvasElement {
        if (this.miniType == miniAPIType.none) { return; }
        return this.miniObj.getOffScreenCanvas(customID);
    }

    /**
     * 加载分包
     * @param p 
     */
    public static loadSubpackage(p: { name: string, fail?(res): any; success?(res): any; }): { onProgressUpdate(res): any; } {
        if (this.miniType == miniAPIType.none) { return; }
        let result;
        result = this.miniObj.loadSubpackage(p);
        return result;
    }
    /**
     * 连接 webSocket
     * @param p 选项
     * @returns Socket任务对象
     */
    public static connectSocket(p: socketConnectOption): SocketTask {
        if (this.miniType == miniAPIType.none) { return; }
        let result;
        result = this.miniObj.connectSocket(p);
        return result;
    }

    //---------------------------------private function---------------------------------------------------
    private static _loadImgFun(url, callBack) {
        this.miniObj.downloadFile({
            url, //仅为示例，并非真实的资源
            success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    if (callBack) {
                        callBack(res.tempFilePath);
                    }
                }
            },
        });
    }

    //检查 sharedCanvas 初始化
    private static ckInitSCanvas() {
        if (m4m["sharedCanvas"]) { return; }
        let openDataContext = this.miniObj.handle.getOpenDataContext();
        this.sharedCanvas = m4m["sharedCanvas"] = openDataContext.canvas;//canvas
    }

    //检查 宽高设置
    private static setSCanvasWH(w: number, h: number) {
        this.sharedCanvas.width = Math.floor(w);
        this.sharedCanvas.height = Math.floor(h);
    }

    private static setfullMode() {
        let c = this.uiMgr.overlay.canvas;
        this.setSCanvasWH(c.pixelWidth, c.pixelHeight);
    }
}

//-----------------------------------------------------------各平台处理-----------------------------------------------------------------------
interface IMiniAPIStruct {
    /** 平台对象 */
    handle;
    /** 短震动 */
    vibrateShort();
    /** 长震动 */
    vibrateLong();
    /**
     * http 请求
     * @param p 参数
     */
    request(p: {});
    /** 跳转小程序 */
    navigateToMiniProgram(p: {});
    /**
     * 下载文件
     * @param p 参数 
     */
    downloadFile(p: {});
    /** 触发GC */
    triggerGC();
    /**
     * 保存图片到相册
     * @param p 参数
     */
    saveImageToPhotosAlbum(p: {});
    /**
     * 读取 Storage 数据
     * @param p 参数
     */
    getStorage(p: {});
    /**
     * 设置 Storage 数据
     * @param p 参数
     */
    setStorage(p: {});
    /**
     * 显示模态对话框
     * @param p 参数
     */
    showModal(p: {});
    /**
     * 调用接口获取登录凭证
     * @param p 参数
     */
    login(p: {});

    /**
     * 创建内部 audio 上下文 InnerAudioContext 对象
     */
    createInnerAudioContext(): any;
    /**
     * 监听内存不足告警事件。
     * @param f 内存不足告警事件的回调函数
     */
    onMemoryWarning(f: Function);

    /**
     * 监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件.
     * @param f 小游戏隐藏到后台事件的回调函数
     */
    onHide(f: Function);
    /**
     * 监听小游戏回到前台的事件
     * @param f 小游戏回到前台的事件的回调函数 
     */
    onShow(f: Function);

    /**
     * 监听鼠标按键按下事件
     * @param f
     */
    onMouseDown(f: (p: {}) => any);

    /**
     * 监听鼠标按键弹起事件
     * @param f
     */
    onMouseUp(f: (p: {}) => any);

    /**
     * 统计 场景分析上报
     */
    reportUserBehaviorBranchAnalytics(obj: {});

    /**
    * 获取 离屏 2dCanvas
    * @param customID 自定义标识ID
    */
    getOffScreenCanvas(customID: string);

    /**
     * 加载分包
     * @param p 
     */
    loadSubpackage(p: { name: string, fail?(res): any; success?(res): any; }): { onProgressUpdate(res): any; };

    /**
     * 创建一个 WebSocket 连接。
     * @param p 参数对象
     * @returns SocketTask
     */
    // tslint:disable-next-line: max-line-length
    connectSocket(p: socketConnectOption): SocketTask;

    /**
     * 显示键盘
     */
    showKeyboard(obj: {});

    /**
     * 监听键盘输入事件
     */
    onKeyboardInput(obj: {});

    /**
     * 取消监听键盘输入事件
     */
    offKeyboardInput(obj: {});

    /**
     * 监听用户点击键盘 Confirm 按钮时的事件
     */
    onKeyboardConfirm(obj: {});
    /**
     * 取消监听用户点击键盘 Confirm 按钮时的事件
     */
    offKeyboardConfirm(obj: {});

    /**
     * 隐藏键盘
     */
    hideKeyboard(obj: {});

    /**
    * 米大师支付
    */
    requestMidasPayment(obj: {});
}
/** wx 小游戏API*/
class WxMiniApi implements IMiniAPIStruct {
    public handle;
    constructor(miniHandle) {
        this.handle = miniHandle;
        //handle 同名API 直接替换
        for (let i = 0, len = WxMiniApi.sameInterfaceList.length; i < len; i++) {
            let key = WxMiniApi.sameInterfaceList[i];
            if (!this.handle[key]) {
                console.error(` miniAPI  ${key} 没找到`);
                continue;
            }
            this[key] = (this.handle[key] as Function).bind(this.handle);
        }
    }

    // tslint:disable-next-line: max-line-length
    private static readonly sameInterfaceList = ["saveImageToPhotosAlbum", "triggerGC", "downloadFile", "navigateToMiniProgram", "vibrateShort", "vibrateLong", "request"
        , "getStorage", "setStorage", "showModal", "login", "createInnerAudioContext", "onMemoryWarning", "onHide", "onShow", "onMouseDown",
        "onMouseUp", "reportUserBehaviorBranchAnalytics", "loadSubpackage", "connectSocket", "showKeyboard", "onKeyboardInput", "offKeyboardInput",
        "onKeyboardConfirm", "hideKeyboard", "requestMidasPayment"];

    private canvsMap: { [customID: string]: HTMLCanvasElement } = {};
    public requestMidasPayment(f: (p: {}) => any) {
    }
    public connectSocket(p: socketConnectOption): SocketTask {
        return null;
    }
    public loadSubpackage(p: { name: string, fail(res): any; success(res): any; }): { onProgressUpdate(res): any; } {
        return null;
    }
    public reportUserBehaviorBranchAnalytics(obj: {}) {
    }
    public onMouseUp(f: (p: {}) => any) {
    }
    public onMouseDown(f: (p: {}) => any) {

    }
    public onHide(f: Function) {
    }
    public onShow(f: Function) {
    }
    public onMemoryWarning(f: Function) {
    }
    public createInnerAudioContext() {
    }
    public login(p: {}) {
    }
    public showModal(p: {}) {
    }
    public saveImageToPhotosAlbum(p) {
    }
    public triggerGC() {
    }
    public downloadFile(p: {}) {
    }
    public navigateToMiniProgram(p: {}) {
    }
    public vibrateShort() {
    }
    public vibrateLong() {
    }
    public request(p) {
    }
    public getStorage(p) {
    }
    public setStorage(p: {}) {
    }
    public showKeyboard(obj: {}) {

    }
    public onKeyboardConfirm(obj: {}) {
    }
    public offKeyboardConfirm(obj: {}) {
    }
    public onKeyboardInput(obj: {}) {

    }
    public offKeyboardInput(obj: {}) {

    }
    public hideKeyboard(obj: {}) {

    }
    public getOffScreenCanvas(customID: string) {
        let canvas = this.canvsMap[customID];
        if (!canvas) {
            this.canvsMap[customID] = canvas = this.handle.createCanvas();
        }
        return canvas;
    }
}
/** qq 小游戏API*/
class QQMiniApi implements IMiniAPIStruct {
    public handle;
    constructor(miniHandle) {
        this.handle = miniHandle;
        //handle 同名API 直接替换
        for (let i = 0, len = QQMiniApi.sameInterfaceList.length; i < len; i++) {
            let key = QQMiniApi.sameInterfaceList[i];
            if (!this.handle[key]) {
                console.error(` miniAPI  ${key} 没找到`);
                continue;
            }
            this[key] = (this.handle[key] as Function).bind(this.handle);
        }
    }
    // tslint:disable-next-line: max-line-length
    private static readonly sameInterfaceList = ["saveImageToPhotosAlbum", "triggerGC", "downloadFile", "navigateToMiniProgram", "vibrateShort", "vibrateLong", "request"
        , "getStorage", "setStorage", "showModal", "login", "createInnerAudioContext", "onMemoryWarning", "onHide", "onShow", "onMouseDown",
        "onMouseUp", "reportUserBehaviorBranchAnalytics", "loadSubpackage", "connectSocket"];
    private canvsMap: { [customID: string]: HTMLCanvasElement } = {};
    public requestMidasPayment(f: (p: {}) => any) {
    }
    public connectSocket(p: socketConnectOption): SocketTask {
        return null;
    }
    public loadSubpackage(p: { name: string, fail(res): any; success(res): any; }): { onProgressUpdate(res): any; } {
        return null;
    }
    public reportUserBehaviorBranchAnalytics(obj: {}) {
    }
    public onMouseUp(f: (p: {}) => any) {
    }
    public onMouseDown(f: (p: {}) => any) {

    }
    public onHide(f: Function) {
    }
    public onShow(f: Function) {
    }
    public onMemoryWarning(f: Function) {
    }
    public createInnerAudioContext() {
    }
    public login(p: {}) {
    }
    public showModal(p: {}) {
    }
    public saveImageToPhotosAlbum(p) {
    }
    public triggerGC() {
    }
    public downloadFile(p: {}) {
    }
    public navigateToMiniProgram(p: {}) {
    }
    public vibrateShort() {
    }
    public vibrateLong() {
    }
    public request(p) {
    }
    public getStorage(p) {
    }
    public setStorage(p: {}) {
    }
    public showKeyboard(obj: {}) {

    }
    public onKeyboardInput(obj: {}) {

    }
    public onKeyboardConfirm(obj: {}) {
    }
    public offKeyboardConfirm(obj: {}) {
    }
    public offKeyboardInput(obj: {}) {

    }
    public hideKeyboard(obj: {}) {

    }
    public getOffScreenCanvas(customID: string) {
        let canvas = this.canvsMap[customID];
        if (!canvas) {
            this.canvsMap[customID] = canvas = this.handle.createCanvas();
        }
        return canvas;
    }
}

/** vivo 小游戏API*/
class VivoMiniApi implements IMiniAPIStruct {
    public handle;
    constructor(miniHandle) {
        this.handle = miniHandle;
        //handle 同名API 直接替换
        for (let i = 0, len = VivoMiniApi.sameInterfaceList.length; i < len; i++) {
            let key = VivoMiniApi.sameInterfaceList[i];
            if (!this.handle[key]) {
                console.error(` miniAPI  ${key} 没找到`);
                continue;
            }
            this[key] = (this.handle[key] as Function).bind(this.handle);
        }
    }
    private static readonly sameInterfaceList = ["onHide", "onShow", "createInnerAudioContext", "login", "triggerGC", "vibrateShort", "vibrateLong",
        "request", "getStorage"];
    public requestMidasPayment(f: (p: {}) => any) {
    }
    public connectSocket(p: socketConnectOption): SocketTask {
        return null;
    }
    public loadSubpackage(p: { name: string, fail(res): any; success(res): any; }): { onProgressUpdate(res): any; } {
        return null;
    }
    public getOffScreenCanvas(customID: string) {
    }
    public reportUserBehaviorBranchAnalytics(obj: {}) {
        //该平台无相关接口
    }
    public onMouseUp(f: (p: {}) => any) {
        //该平台无相关接口
    }
    public onMouseDown(f: (p: {}) => any) {
        //该平台无相关接口
    }
    public onHide(f: Function) {
    }
    public onShow(f: Function) {
    }
    public onMemoryWarning(f: Function) {
        //该平台无相关接口
    }
    public createInnerAudioContext() {
    }
    public login(p: {}) {
    }
    public showModal(p: {}) {
        let _p = p as any;
        //vivo 中的差异
        _p.message = _p.content;
        this.handle.showDialog(_p);
    }
    public saveImageToPhotosAlbum(p) {
        let _p = p as any;
        _p.uri = p.filePath;
        this.handle.saveToPhotoAlbum(_p);
    }
    public triggerGC() {
    }
    public downloadFile(p: {}) {
        let _p = p as any;
        this.handle.download(_p);
    }
    public navigateToMiniProgram(p: {}) {
        //该平台无相关接口
    }
    public vibrateShort() {
    }
    public vibrateLong() {
    }
    public request(p) {
    }
    public getStorage(p) {
    }
    public showKeyboard(obj: {}) {

    }
    public onKeyboardConfirm(obj: {}) {
    }
    public offKeyboardConfirm(obj: {}) {
    }
    public onKeyboardInput(obj: {}) {

    }
    public offKeyboardInput(obj: {}) {

    }
    public hideKeyboard(obj: {}) {

    }
    public setStorage(p: {}) {
        let _p = p as any;
        _p.value = _p.data;
        this.handle.setStorage(_p);
    }
}

miniGame["PreInit"]();