import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class ErrorInfoManagerRequest {
    public static get Instance(): ErrorInfoManagerRequest {
        if (this._instance == null) {
            this._instance = new ErrorInfoManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ErrorInfoManagerRequest;


    /***
     * 记录客户端异常消息
     */
    public CreateErrorInfo(message, modelType) {
        let paramJsons =`"a0":${JSON.stringify(message)},"a1":${JSON.stringify(modelType)},`;
        let mess = WebsocketTool.Instance.getMsg("ErrorInfoManager","CreateErrorInfo",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}