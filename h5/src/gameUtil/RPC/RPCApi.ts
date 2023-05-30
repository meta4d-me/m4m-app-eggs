/*
*
* 本代码由RPC生成器生成 Typescript, 2020/3/21 5:22:41
*
*/
import { RPCManager } from "./RPCManager";
//#region 数据结构

//#endregion

/**
* RPC输入输出类
*/
export class RPCMethods {
    //#region 发送部分

    /**
    * 调用脚本方法 c->s
    * @param scriptPath 
    * @param method 
    * @param args 
    * @returns any
    */
    public static CallScript_websocket(scriptPath: string, method: string, args: any[]): Promise<any> {
        return RPCManager.Send("CallScript", scriptPath, method, args);
    }
    /**
    * 调用脚本 c->s
    * @param scriptPath 
    * @param method 
    * @param args 
    * @returns any
    */
    public static CallScript_http(scriptPath: string, method: string, args: any[]): Promise<any> {
        return RPCManager.SendHttp("CallScript", scriptPath, method, args);
    }
    /**
    * 用户脚本 c->s
    * @param uid 
    * @param scriptPath 
    * @param method 
    * @param args 
    * @returns any
    */
    public static CallUserScript_http(uid: string, scriptPath: string, method: string, args: any[]): Promise<any> {
        return RPCManager.SendHttp("CallUserScript", uid, scriptPath, method, args);
    }
    /**
    * 用户变量 c->s
    * @param uid 
    * @param varname 
    * @returns any
    */
    public static GetUserVar_http(uid: string, varname: string): Promise<any> {
        return RPCManager.SendHttp("GetUserVar", uid, varname);
    }
    //#endregion

    //#region 接收部分

    public static Init() {
    }
    //#endregion

}