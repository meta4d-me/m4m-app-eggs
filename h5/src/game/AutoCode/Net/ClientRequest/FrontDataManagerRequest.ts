import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class FrontDataManagerRequest {
    public static get Instance(): FrontDataManagerRequest {
        if (this._instance == null) {
            this._instance = new FrontDataManagerRequest();
        }

        return this._instance;
    }
    private static _instance: FrontDataManagerRequest;


    /***
     * callService
     */
    public callService(className, funcName, args) {
        let paramJsons =`"a0":${JSON.stringify(className)},"a1":${JSON.stringify(funcName)},"a2":${JSON.stringify(args)},`;
        let mess = WebsocketTool.Instance.getMsg("FrontDataManager","callService",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * callFunc
     */
    public callFunc(tableName, funcName, args) {
        let paramJsons =`"a0":${JSON.stringify(tableName)},"a1":${JSON.stringify(funcName)},"a2":${JSON.stringify(args)},`;
        let mess = WebsocketTool.Instance.getMsg("FrontDataManager","callFunc",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}