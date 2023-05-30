import { CDManage } from "Time/CDManage";
import { LoginManagerRequest } from "../AutoCode/Net/ClientRequest/LoginManagerRequest";
import { ServerManagerRequest } from "../AutoCode/Net/ClientRequest/ServerManagerRequest";
import { WebsocketTool } from "../AutoCode/Net/WebsocketTool";
import { StageMgr } from "../Core/StageMgr";
import { TipsManager } from "../Manager/TipsManager";
import { NetData } from "./NetData";
//import { UITipManager } from "../Manager/UITipManager";
import { PingTimeManager } from "./PingTimeManager";

export class NetWebscoket {

    public static get Instance(): NetWebscoket {
        if (this._instance == null) {
            this._instance = new NetWebscoket();
        }

        return this._instance;
    }
    /**********是否需要请求 配置数据***********
    */
    public static reqconfigMes: boolean = true;
    public fuck: string = "";

    private static _instance: NetWebscoket;
    private _webscoket: WebSocket;
    //是否连接过服务器
    private _connected = false;
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

    public onmessage(e: any) {
        //MapManager.Instance.GetIntervalTime();
        // console.log("来消息了：" , e.data);
        try {
            if (typeof (e) == "string") {
                this.onmessageHandler(new NetData(e));
            } else {
                if (!e.data) {
                    this.onmessageHandler(new NetData(e));
                } else if (e.data.arrayBuffer) {
                    e.data.arrayBuffer()
                        .then((bf: ArrayBuffer) => {
                            this.onmessageHandler(new NetData(bf));
                        });
                } else {
                    this.onmessageHandler(new NetData(e.data));
                }
            }
        } catch (e) {
            console.error("NetWebscoket.onmessage异常:\n" + e.message + "\n" + e.stack);
        }
    }

    public sendMessage(buff: Uint8Array) {
        // console.error(buff.join());
        // this.rnetStream.Write(buff, 0, buff.length);
        NetWebscoket.Instance.send(buff);
    }

    public onopen(e) {
        console.log("WebSocket连接成功! 开始链接服务器onopen");
        this._connected = true;
        StageMgr.serverConnected();
        // ServerManagerRequest.Instance.servertime();
    }

    public send(bytes: Uint8Array) {
        // console.error(bytes.join());
        if (this._webscoket && this._webscoket.readyState == 1) {
            this._webscoket.send(bytes);
        } else if (this._connected) {
            TipsManager.ShowTips("Disconnected from server")
            // CommonTipsManager.Instance.ShowTips("提示", "已与服务器断开连接");
        } else {
            TipsManager.ShowTips("Not connected to server");
            // CommonTipsManager.Instance.ShowTips("提示", "未连接到服务器");
            console.error("谁的傻逼代码 服务器都还没连上就调发送了111！");
        }
    }

    public sendStr(mess: string) {
        if (this._webscoket && this._webscoket.readyState == 1) {
            this._webscoket.send(mess);
        } else if (this._connected) {
            //
        } else {
            TipsManager.ShowTips("Not connected to server");
            console.error("谁的傻逼代码 服务器都还没连上就调发送了222！");
        }
    }

    public onclose(e) {
        console.error("socket close  连接关闭连接关闭连接关闭。。。", e);
    }
    public onerror(e) {
        LoginManagerRequest.Instance.switchLogin();
        console.error(e);
    }

    // tslint:disable-next-line: cyclomatic-complexity
    private onmessageHandler(netData: NetData) {
        if (WebsocketTool.Instance.onmessage(netData)) {
            //console.log("json长度: " + netData.code.length + ", 整体用时" + MapManager.Instance.GetIntervalTime());
            return;
        }
        // console.log("netData ********* ", netData);
        if (netData.head != "[LOG]") {
            let messObjList: any[];
            messObjList = netData.GetJson();
            // console.log("messObj -----  ", messObj);
            // console.log("functionName -----", messObj.functionName);
            let len = messObjList.length;
            for (let i = 0; i < len; i++) {
                let messObj = messObjList[i];

                switch (messObj.functionName) {
                    case "ping":
                        PingTimeManager.Instance.serverBackFun();
                        break;
                    case "servertime":
                        CDManage.Instance.setServerTime(messObj.args[0]);
                        break;
                    default:
                        if (messObj.className == "Tip" && messObj.functionName == "Message") {
                            //
                            let messStr = messObj.args[0];
                            let messageObj = messStr;
                            // let context = messageObj.context;
                            let tipType = messageObj.tipType;
                            TipsManager.ShowTips(messObj.context);
                            // console.log(title);
                            // console.log(tipType);
                            // console.log(context);
                            // UiDataManager.changeFunctionData(BindKeyName.redFuck, context);
                            // if (tipType == 1) {
                            //     UITipManager.Instance.tipPanelText = context;
                            //     UIOpenOrHideManager.Instance.OpentipsView();
                            //     // if (context == "注册成功") {
                            //     //     UIOpenOrHideManager.Instance.OpensigninView();
                            //     //     return;
                            //     // }
                            // } else {
                            //     //
                            // }
                        }
                }
            }
        }
        //console.log("json长度: " + netData.code.length + ", 整体用时(code)" + MapManager.Instance.GetIntervalTime());
    }

    private Close() {
        if (this._webscoket) {
            this._webscoket.close();
        }
    }

}