import { CDManage } from "Time/CDManage";
import { StageMgr } from "../Core/StageMgr";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { UserDataBaseEvent } from "../AutoCode/Net/DataEvents/UserDataBaseEvent";
import { UserDataBase } from "UserDataBase";

//玩家账号数据
export class UserDataManager {
    public static get Instance(): UserDataManager {
        if (this._instance == null) {
            this._instance = new UserDataManager();
        }
        return this._instance;
    }
    private static _instance: UserDataManager;
    //初始化
    public init() {
        WsDataManager.UserDataBaseData.addEventListener(UserDataBaseEvent.All, this.userInfoFun.bind(this));
    }

    public userInfoFun(data) {
        console.log("玩家信息：", data);
        let serverTime = WsDataManager.UserDataBaseData.loginTime;
        CDManage.Instance.setServerTime(serverTime);
        StageMgr.onLoginServerSuccess();
    }
}