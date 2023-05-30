import { UiDataManager } from "PSDUI/UiDataManager";
import { GameArchiveManagerRequest } from "../AutoCode/Net/ClientRequest/GameArchiveManagerRequest";
import { ConnectWalletManager } from "../Core/blockchain/ConnectWalletManager";
import { BindKeyName } from "../Data/BindKeyName";
import { GameArchiveManager } from "../Manager/GameArchiveManager";
import { PingTimeManager } from "./PingTimeManager";
export class SDKWebsocket {

    public static get Instance(): SDKWebsocket {
        if (this._instance == null) {
            this._instance = new SDKWebsocket();
        }

        return this._instance;
    }
    /**********是否需要请求 配置数据***********
    */
    public static reqconfigMes: boolean = true;

    private static _instance: SDKWebsocket;
    private _webscoket: WebSocket;
    public connect(url: string) {
        // console.log("开始链接服务器*** " + url);
        // this._webscoket = new WebSocket(url);//"wss://hse-dev-qq.upaidui.com"
        if (url == null) {
            console.error("服务器 地址出错！" + url);
            return;
        }
        // url = "wss://kingzet.cn";
        console.log("开始链接服务器 " + url);
        this._webscoket = new WebSocket(url) as any;
        this._webscoket["onmessage"] = this.onmessage.bind(this);
        this._webscoket["onopen"] = this.onopen.bind(this);
        this._webscoket["onclose"] = this.onclose.bind(this);
        this._webscoket["onerror"] = this.onerror.bind(this);

    }

    public async onmessage(e: MessageEvent) {

        console.log("来消息了：" + e.data);
        // let notCode = await WebsocketTool.Instance.onmessage(e);
        // console.log(`byteLength : ${(e.data as ArrayBuffer).byteLength}` , e.data);
        // e.data.arrayBuffer()
        //     .then((buffer) => {
        //         console.error("处理 ArrayBuffer 数据的代码……");
        //     });
        // if (notCode) {
        //     return;
        // }
        let buffer: any;
        if (e.data.arrayBuffer) {
            buffer = await e.data.arrayBuffer();
        } else {
            buffer = e.data;
        }
        if (typeof (buffer) == "string") {
            if (buffer.indexOf("[LOG]") == -1) {
                let messObj = JSON.parse(buffer);
                // console.error(messObj);
                //ping Time
                if (messObj.functionName == "ping") {
                    //
                    PingTimeManager.Instance.serverBackFun();
                } else {
                    let className = messObj.className;
                    // tslint:disable-next-line: switch-default
                    switch (className) {
                        case "Tip":
                            if (messObj.functionName == "Message") {
                                //
                                let messStr = messObj.args[0];
                                let messageObj = JSON.parse(messStr);
                                let title: string = messageObj.title;
                                let tipType = messageObj.tipType;
                                let context = messageObj.context;
                                console.log(title, tipType, context);
                                if (tipType == 0) {
                                    // UITipManager.Instance.tipPanelText = "Login denied\nThe account has been logged in to another device\nPlease refresh the page and re-enter the game";
                                    // UITipManager.Instance.type = TipPanelType.mistake;
                                } else {
                                    // UITipManager.Instance.tipPanelText = context;
                                    // UITipManager.Instance.type = TipPanelType.rest;
                                }
                                // UIOpenOrHideManager.Instance.OpenTipsTCView();
                            }
                            break;
                        case "newUser":
                            // UIOpenOrHideManager.Instance.HideTloadingView();
                            // UIOpenOrHideManager.Instance.OpenCreateCharacterView();  // 进入创建角色
                            break;
                        case "ConfigManager": //获取服务器配置
                            let configName = messObj.functionName;
                            let arr = messObj.args[0];
                            break;
                        case "signWithWallet":
                            // let data = messObj.args[0];
                            ConnectWalletManager.Instance.claimLoot(messObj.args[0], messObj.args[1], messObj.args[2], () => { });
                            break;
                        case "IPFSCID":
                            let args = messObj.args[0];
                            let data = GameArchiveManager.Instance.GameArchiveData
                            GameArchiveManagerRequest.Instance.UploadData(data.baseData.headPortrait, messObj.args[1], "", args, "");
                            UiDataManager.changeFunctionData(BindKeyName.skinImage, { url: args, imageurl: messObj.args[1] });
                            break;
                        case "IPFSJSON":
                            let arg = messObj.args[0];
                            break;
                        case "axiaosData":
                            let key = messObj.args[0];
                            console.log(key);
                            break;
                        default:
                            console.error(messObj);
                    }
                    // if (messObj.functionName == "Message") {
                    //     //
                    //     let messStr = messObj.args[0];
                    //     let messageObj = JSON.parse(messStr);
                    //     let title: string = messageObj.title;
                    //     let tipType = messageObj.tipType;
                    //     let context = messageObj.context;
                    //     console.log(title, tipType, context);
                    //     if (tipType == 0) {
                    //         UITipManager.Instance.tipPanelText = "Login denied\nThe account has been logged in to another device\nPlease refresh the page and re-enter the game";
                    //         UITipManager.Instance.type = TipPanelType.mistake;
                    //     } else {
                    //         UITipManager.Instance.tipPanelText = context;
                    //         UITipManager.Instance.type = TipPanelType.rest;
                    //     }
                    //     UIOpenOrHideManager.Instance.OpenTipsTCView();
                    // } else {
                    //     console.error(messObj);
                    // }
                }
            }
        }
    }

    public sendMessage(buff: Uint8Array) {
        console.error("发送消息", buff.toString());
        // console.error(buff.join());
        // this.rnetStream.Write(buff, 0, buff.length);
        SDKWebsocket.Instance.send(buff);
    }

    public onopen(e) {
        console.log("WebSocket连接成功! 开始链接服务器onopen");
        // StageMgr.serverConnected();
    }

    public send(bytes: Uint8Array) {
        // console.error("发送");
        // console.error(bytes.join());
        if (this._webscoket && this._webscoket.readyState == 1) {
            this._webscoket.send(bytes);
        } else {
            console.error("谁的傻逼代码 服务器都还没连上就调发送了111！");
        }
    }

    public sendStr(mess: any) {
        // console.error("发送");
        if (this._webscoket && this._webscoket.readyState == 1) {
            this._webscoket.send(mess);
        } else {
            console.error("谁的傻逼代码 服务器都还没连上就调发送了222！");
        }
    }

    public onclose(e) {
        console.error("socket close  连接关闭连接关闭连接关闭。。。", e);
        // UITipManager.Instance.tipsData = 1;
        // UITipManager.Instance.tipPanelText = "Server disconnected\nPlease refresh the page and re-enter the game";
        // UITipManager.Instance.type = TipPanelType.mistake;
        // UIOpenOrHideManager.Instance.OpenTipsTCView();
    }
    public onerror(e) {
        console.error(e);
        console.log("socket error", e);
        // if (UITipManager.Instance.tipsData != 1) {
        //     UITipManager.Instance.tipPanelText = e;
        //     UITipManager.Instance.type = TipPanelType.mistake;
        //     UIOpenOrHideManager.Instance.OpenTipsTCView();
        // }

    }

    private Close() {
        if (this._webscoket) {
            this._webscoket.close();
        }
    }

}


