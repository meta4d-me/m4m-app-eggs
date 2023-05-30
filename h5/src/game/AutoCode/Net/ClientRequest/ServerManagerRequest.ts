import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class ServerManagerRequest {
    public static get Instance(): ServerManagerRequest {
        if (this._instance == null) {
            this._instance = new ServerManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ServerManagerRequest;


    /***
     * 修改服务器时间,count：时间便宜量，单位秒
     */
    public timePlus(count) {
        let paramJsons =`"a0":${JSON.stringify(count)},`;
        let mess = WebsocketTool.Instance.getMsg("ServerManager","timePlus",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 心跳检测
     */
    public heartBeat() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ServerManager","heartBeat",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 延迟检测
     */
    public ping() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ServerManager","ping",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取服务器时间
     */
    public servertime() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ServerManager","servertime",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}