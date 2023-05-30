import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class LoginManagerRequest {
    public static get Instance(): LoginManagerRequest {
        if (this._instance == null) {
            this._instance = new LoginManagerRequest();
        }

        return this._instance;
    }
    private static _instance: LoginManagerRequest;


    /***
     * 玩家登录,userId:玩家ID,passWord:密码
     */
    public loginWithOutWallet(userId, passWord) {
        let paramJsons =`${JSON.stringify(userId)},${JSON.stringify(passWord)}`;
        let mess = WebsocketTool.Instance.getMsg("LoginManager","loginWithOutWallet",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 切换账号
     */
    public switchLogin() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("LoginManager","switchLogin",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}