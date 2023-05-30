import { IBindMetadataParams, IpareComponentParams } from "../Core/blockchain/ConnectWalletManager";
import { SDKWebsocket } from "./SDKWebsocket";

export class SDKWebsokectTool {
    public static get Instance(): SDKWebsokectTool {
        if (this._instance == null) {
            this._instance = new SDKWebsokectTool();
        }

        return this._instance;
    }
    private static _instance: SDKWebsokectTool;

    public getMsg(className, functionName, text) {
        let mess = `{"currentType":null,"type":null,"callTime":"0001-01-01T00:00:00","callid":0,"timeout":0,"className":"${className}","functionName":"${functionName}","argsType":null,
        "args":[${text}],"returnType":null,"returnValue":null}`;
        return mess;
    }
    /***
     * 发送消息 type:消息类型，comp:阵营，quality,content:内容,username:名字
     */
    public SDKManager_testprepareComponent(parma: IpareComponentParams) {
        // tslint:disable-next-line: max-line-length
        let paramJsons = `${JSON.stringify(parma)}`;
        let mess = this.getMsg("SDKManager", "testprepareComponent", `${paramJsons}`);
        SDKWebsocket.Instance.sendStr(mess);
    }

    public IPFSManager_IPFSImageJsonData(fileUrl) {
        // tslint:disable-next-line: max-line-length
        let paramJsons = `${JSON.stringify(fileUrl)}`;
        let mess = this.getMsg("IPFSManager", "IPFSImageJsonData", `${paramJsons}`);
        SDKWebsocket.Instance.sendStr(mess);
    }

    public IPFSManager_IPFSJsondata(fileUrl) {
        let paramJsons = `${JSON.stringify(fileUrl)}`;
        let mess = this.getMsg("IPFSManager", "IPFSJsondata", `${paramJsons}`);
        SDKWebsocket.Instance.sendStr(mess);
    }

    public SDKManager_axiaosData(parma: IBindMetadataParams) {
        let paramJsons = `${JSON.stringify(parma)}`;
        let mess = this.getMsg("SDKManager", "axiaosData", `${paramJsons}`);
        SDKWebsocket.Instance.sendStr(mess);
    }

    public SDKManager_RenewComponentData(parma: IpareComponentParams) {
        let paramJsons = `${JSON.stringify(parma)}`;
        let mess = this.getMsg("SDKManager", "RenewComponentData", `${paramJsons}`);
        SDKWebsocket.Instance.sendStr(mess);
    }
}