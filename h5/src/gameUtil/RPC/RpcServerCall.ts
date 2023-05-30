import { RPCMethods } from "./RPCApi";
import { RPCManager } from "./RPCManager";

export class RpcServerCall {
    public static uid: string;
    public static errorState: boolean = false;
    public static OnError: (e) => void;
    public static Init() {
        RPCMethods.Init();
        window["RPCMethods"] = RPCMethods;
        window["RpcServerCall"] = RpcServerCall;
    }
    public static async CallScript(path, method, ...params) {

        if (RPCManager.sock == null) {
            if (this.uid) {
                return RPCMethods.CallUserScript_http(RpcServerCall.uid, path, method, params);
            }
            return RPCMethods.CallScript_http(path, method, params);
        }
        return RPCMethods.CallScript_websocket(path, method, params);

    }

    public static async CallScriptRetCls<T>(ctor: any, path: string, method: string, ...params): Promise<T> {

        let ret = await RPCMethods.CallScript_http(path, method, params);
        if (!ret) {
            return;
        }
        ret.constructor = ctor;
        ret.save = (fields) => RPCManager.SaveObject(ret, fields);
        ret.sync = (fields) => RPCManager.SyncObject(ret, fields);
        return ret;
    }
    public static async CallScriptHttp(path, method, ...params) {
        return RPCMethods.CallScript_http(path, method, params);
    }
    public static async CallUserScriptHttp(uid, path, method, ...params) {
        return RPCMethods.CallUserScript_http(uid, path, method, params);
    }
}