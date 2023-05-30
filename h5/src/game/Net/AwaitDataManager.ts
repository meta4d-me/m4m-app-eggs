
export class AwaitDataManager {

    private static _map: Map<string, { success: Function, error?: Function }> = new Map();

    //等待某条消息返回
    public static awaitFor(name: string, success: Function, error?: Function): void {
        //console.log("--awaitFor", name);
        if (this._map.has(name)) {
            throw new Error("awaitFor存在重复的key:" + name);
        }
        this._map.set(name, { success, error });
    }
    //发送消息
    public static dispatchSuccess(name: string, params: any[]) {
        let data = this._map.get(name);
        if (data) {
            data.success(params);
            this._map.delete(name);
        }
    }
    //发送异常消息
    public static dispatchError(name: string, params: any[]) {
        let data = this._map.get(name);
        if (data) {
            if (data.error) {
                data.error(params);
            } else {
                console.error(`接到一条未经处理的异常消息, ${name}: ${params[1]}`);
            }
            this._map.delete(name);
        }
    }
}