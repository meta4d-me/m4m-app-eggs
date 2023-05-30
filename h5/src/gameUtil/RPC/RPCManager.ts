import { RPCMethods } from "./RPCApi";
import { RpcServerCall } from "./RpcServerCall";
export interface IRPCCallRsult {
    IsSuccess: boolean;
    message: string;
    result: any;
}

/**
 * 同步对象装饰器 
 * 实现此装饰器的对象会附加 sync[从服务器同步到本地],save[保存到服务器] 这两个方法
 * @param constructor 
 */
export function SyncObject(constructor) {
    constructor.prototype.sync = function (fields: string[]) {
        return RPCManager.SyncObject(this, fields);
    };
    constructor.prototype.save = function (fields: string[]) {
        return RPCManager.SaveObject(this, fields);
    };
    constructor.getlistCount = () => {
        return RPCManager.GetlistCount(constructor.name);
    };
    constructor.getlist = (offset, count) => {
        return RPCManager.Getlist(constructor, offset, count);
    };
}

export class RPCManager {
    public static Init() {
        window["cpi"] = RPCMethods;
        this.ptlHandles[1] = this.RPCSCallHandle.bind(this);
        this.ptlHandles[2] = this.RPCCallResultHandle.bind(this);
        this.ptlHandles[4] = this.SyncResultHandle.bind(this);
        this.ptlHandles[6] = this.SaveResultHandle.bind(this);
        this.ptlHandles[8] = this.ListCountHandle.bind(this);
        this.ptlHandles[10] = this.ListHandle.bind(this);
        RpcServerCall.Init();
    }

    public static sock: WebSocket;
    public static pidIndex: number = 0;
    public static syncPidIndex: number = 0;

    /**
     * 调用RPC超时时间
     */
    public static timeOut: number = 8000;
    public static httpApi: string;
    public static callMap: { [pid: number]: { cleanID: number, resolve(value?: any): void; reject(reason?: any): void; } } = {};
    public static syncMap: { [pid: number]: { cleanID: number, obj: any, resolve(value?: any): void; reject(reason?: any): void; } } = {};
    public static ptlHandles: { [ptplNum: number]: Function } = {};
    public static serverCallMap: { [key: string]: Function } = {};

    public static RegHandle(key: string, func: Function) {

        this.serverCallMap[key] = func;
    }
    public static Send<T>(method: string, ...params): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            if (!this.sock || this.sock.readyState != WebSocket.OPEN) {
                return reject("[错误]未连接服务器");
            }

            if (++this.pidIndex >= Number.MAX_SAFE_INTEGER) {
                this.pidIndex = 1;
            }

            let pid = this.pidIndex;

            let rpcptl = JSON.stringify({
                __ptlNum__: 1,
                pid,
                m: method,
                p: params,
            });
            let tid: any | number = setTimeout(() => {
                delete this.callMap[pid];
                reject(`[错误]PRC 调用:${method}超时 `);
            }, this.timeOut);
            this.callMap[pid] = { resolve, reject, cleanID: tid };
            this.sock.send(rpcptl);
        });
    }
    public static SendHttp<T>(method: string, ...params): Promise<T> {
        return new Promise((resolve, reject) => {

            this.SendHttpSimple(`${this.httpApi}/rpc`, "POST", {
                m: method,
                p: params,
            })
                .then((text) => {
                    try {
                        let json = JSON.parse(text);
                        let cret = json as IRPCCallRsult;
                        if (!cret.IsSuccess) {
                            reject(cret.message);
                        } else {
                            resolve(cret.result);
                        }
                    } catch
                    {
                        reject(`[错误]SendHttp 解析失败:${text}`);
                    }
                })
                .catch((e) => {
                    reject(e);
                });

            // let xhr = new XMLHttpRequest();
            // xhr.open("POST", `${this.httpApi}/prc`);
            // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            // xhr.timeout = this.timeOut;
            // xhr.ontimeout = () => {
            //     reject(`[错误]SendHttp ${this.httpApi}/rpc ${method} 调用超时`);
            // };
            // xhr.onload = () => {
            //     try {
            //         let json = JSON.parse(xhr.responseText);
            //         let cret = json as RPCCallRsult;
            //         if (!cret.IsSuccess)
            //             reject(cret.message);
            //         else
            //             resolve(cret.result);
            //     } catch
            //     {
            //         reject(`[错误]SendHttp 解析失败:${xhr.responseText}`);
            //     }
            // };
            // xhr.onerror = (e) => {
            //     reject(`[错误]SendHttp ${this.httpApi}/rpc调用失败:${xhr.status}`);
            // };
            // xhr.send(JSON.stringify({
            //     m: method,
            //     p: params
            // }));
        });
    }
    public static SendHttpSimple(url: string, method: string, params: any = null) {
        return new Promise<any>((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.timeout = this.timeOut;
            xhr.ontimeout = () => {
                reject(`[错误]SendHttp ${url} ${method} 调用超时`);
            };
            xhr.onload = () => {
                resolve(xhr.responseText);
            };
            xhr.onerror = (e) => {
                reject(`[错误]SendHttp ${url}调用失败:${xhr.status}`);
            };
            let str = null;
            if (params) {
                str = JSON.stringify(params);
            }
            xhr.send(str);
        });

    }
    public static Filter(e): boolean {
        let ptl = JSON.parse(e.data);
        let handle = this.ptlHandles[ptl.PtlNum];
        if (handle) {
            handle(ptl);
            return true;
        }
        return false;
    }

    //rpc被调用处理
    private static RPCSCallHandle(ptl) {
        if (this.serverCallMap[ptl.m]) {
            this.serverCallMap[ptl.m].apply(this, ptl.p);
        }
    }
    //rpc返回处理
    private static RPCCallResultHandle(ptl) {
        let info = this.callMap[ptl.pid];
        if (info) {
            delete this.callMap[ptl.pid];
            clearTimeout(info.cleanID);

            let cret = ptl.data as IRPCCallRsult;
            if (!cret.IsSuccess) {
                info.reject(cret.message);
            } else {
                info.resolve(cret.result);
            }
        }
    }
    //同步数据返回处理
    private static SyncResultHandle(ptl) {
        let info = this.syncMap[ptl.pid];
        if (info) {
            delete this.syncMap[ptl.pid];
            clearTimeout(info.cleanID);
            if (ptl.message) {
                return info.reject(ptl.message);
            }
            for (let key in ptl.data) {
                info.obj[key] = ptl.data[key];
            }
            info.resolve();
        }
    }
    //保存数据返回处理
    private static SaveResultHandle(ptl) {
        let info = this.syncMap[ptl.pid];
        if (info) {
            delete this.syncMap[ptl.pid];
            clearTimeout(info.cleanID);
            if (ptl.message) {
                return info.reject(ptl.message);
            }
            info.resolve();
        }
    }
    //列表长度返回处理
    private static ListCountHandle(ptl) {
        let info = this.syncMap[ptl.pid];
        if (info) {
            delete this.syncMap[ptl.pid];
            clearTimeout(info.cleanID);
            if (ptl.message) {
                return info.reject(ptl.message);
            }
            info.resolve(ptl.data);
        }
    }
    //列表返回处理
    private static ListHandle(ptl) {
        let info = this.syncMap[ptl.pid];
        if (info) {
            delete this.syncMap[ptl.pid];
            clearTimeout(info.cleanID);
            if (ptl.message) {
                return info.reject(ptl.message);
            }
            let ctor = info.obj;
            let list = [];
            for (let item of ptl.data) {
                let inst = new ctor();
                for (let key in item) {
                    inst[key] = item[key];
                }
                list.push(inst);
            }
            info.resolve(list);
        }
    }
    /**
     * 请求和服务器同步数据
     * @param obj 需要同步的对象
     * @param fields 需要同步的字段
     */
    public static SyncObject(obj: any, fields: string[]): Promise<void> {
        if (this.sock == null) {
            return this.SyncObjectHttp(obj, fields);
        }
        return this.SyncObjectWS(obj, fields);
    }
    public static SyncObjectWS(obj: any, fields: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.sock && this.sock.readyState != WebSocket.OPEN) {
                return reject("[错误]同步对象失败 未连接服务器!!");
            }
            if (!obj.id) {
                return reject(`[错误]同步对象失败 ${obj.constructor.name} 缺少id字段!!`);
            }

            if (++this.syncPidIndex >= Number.MAX_SAFE_INTEGER) {
                this.syncPidIndex = 1;
            }

            let pid = this.syncPidIndex;

            let rpcptl = JSON.stringify({
                __ptlNum__: 3,
                pid,
                id: obj.id,
                fields,
                name: obj.constructor.name,
            });
            let tid: any | number = setTimeout(() => {
                delete this.syncMap[pid];
                reject(`[错误]同步对象失败 同步超时!!`);
            }, this.timeOut);
            this.syncMap[pid] = { resolve, reject, cleanID: tid, obj };
            this.sock.send(rpcptl);
        });
    }
    public static SyncObjectHttp(obj: any, fields: string[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                let text = await this.SendHttpSimple(`${this.httpApi}/syncobj`, "POST", {
                    id: obj.id, name: obj.constructor.name, fields,
                });

                let json = JSON.parse(text);

                if (json.message) {
                    return reject(json.message);
                }

                for (let key in json.data) {
                    obj[key] = json.data[key];
                }
                resolve();
            } catch (e) {
                reject(e.stack);
            }

        });
    }

    /**
     * 保存数据到服务器
     * @param obj 需要保存的对象
     * @param fields 需要保存的字段
     */
    public static SaveObject(obj: any, fields: string[]): Promise<void> {
        if (this.sock == null) {
            return this.SaveObjectHttp(obj, fields);
        }
        return this.SaveObjectWS(obj, fields);
    }

    public static SaveObjectWS(obj: any, fields: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.sock && this.sock.readyState != WebSocket.OPEN) {
                return reject("[错误]保存对象失败 未连接服务器!!");
            }
            if (!obj.id) {
                return reject(`[错误]保存对象失败 ${obj.constructor.name} 缺少id字段!!`);
            }

            if (++this.syncPidIndex >= Number.MAX_SAFE_INTEGER) {
                this.syncPidIndex = 1;
            }

            let data = null;
            if (fields && fields.length > 0) {
                data = {};
                for (let i = 0, len = fields.length; i < len; ++i) {
                    data[fields[i]] = obj[fields[i]];
                }
            } else {
                data = obj;
            }

            let pid = this.syncPidIndex;
            let rpcptl = JSON.stringify({
                __ptlNum__: 5,
                pid,
                id: obj.id,
                data,
                name: obj.constructor.name,
            });
            let tid: any | number = setTimeout(() => {
                delete this.syncMap[pid];
                reject(`[错误]保存对象失败 同步超时!!`);
            }, this.timeOut);
            this.syncMap[pid] = { resolve, reject, cleanID: tid, obj: null };
            this.sock.send(rpcptl);
        });

    }
    public static SaveObjectHttp(obj: any, fields: string[]): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                let data = null;
                if (fields && fields.length > 0) {
                    data = {};
                    for (let i = 0, len = fields.length; i < len; ++i) {
                        data[fields[i]] = obj[fields[i]];
                    }
                } else {
                    data = obj;
                }
                let text = await this.SendHttpSimple(`${this.httpApi}/syncsave`, "POST", {
                    id: obj.id,
                    name: obj.constructor.name,
                    data,
                });
                let json = JSON.parse(text);
                if (json.message) {
                    return reject(json.message);
                }
                resolve();
            } catch (error) {
                reject(error.stack);
            }
        });
    }

    /** 
    * 获取数据数量
    */
    public static GetlistCount(name: string): Promise<number> {
        if (this.sock == null) {
            return this.GetlistCountHttp(name);
        }
        return this.GetlistCountWS(name);
    }
    public static GetlistCountWS(name: string) {
        return new Promise<number>((resolve, reject) => {
            if (!this.sock && this.sock.readyState != WebSocket.OPEN) {
                return reject("[错误]获取列表长度失败 未连接服务器!!");
            }

            if (++this.syncPidIndex >= Number.MAX_SAFE_INTEGER) {
                this.syncPidIndex = 1;
            }
            let pid = this.syncPidIndex;
            let rpcptl = JSON.stringify({
                __ptlNum__: 7,
                pid,
                name,
            });
            let tid: any | number = setTimeout(() => {
                delete this.syncMap[pid];
                reject(`[错误]获取列表长度失败 同步超时!!`);
            }, this.timeOut);
            this.syncMap[pid] = { resolve, reject, cleanID: tid, obj: null };
            this.sock.send(rpcptl);
        });
    }
    public static GetlistCountHttp(name: string) {
        return new Promise<number>(async (resolve, reject) => {
            try {
                let text = await this.SendHttpSimple(`${this.httpApi}/synccount`, "POST", { name });
                let json = JSON.parse(text);
                if (json.message) {
                    return reject(json.message);
                }
                resolve(json.data);
            } catch (error) {
                reject(error.stack);
            }
        });
    }

    /** 
    * 获取列表数据
    * @param offset 从什么位置获取 默认值:0
    * @param count 指定需要保存的字段 例如["name","desc"]
    */
    public static Getlist(ctor: any, offset: number = 0, count: number = 100): Promise<any> {
        if (this.sock == null) {
            return this.GetlistHttp(ctor, offset, count);
        }
        return this.GetlistWS(ctor, offset, count);
    }
    public static GetlistWS(ctor: any, offset: number = 0, count: number = 100) {
        return new Promise((resolve, reject) => {
            if (!this.sock && this.sock.readyState != WebSocket.OPEN) {
                return reject("[错误]保存对象失败 未连接服务器!!");
            }

            if (++this.syncPidIndex >= Number.MAX_SAFE_INTEGER) {
                this.syncPidIndex = 1;
            }
            let pid = this.syncPidIndex;
            let rpcptl = JSON.stringify({
                __ptlNum__: 9,
                pid,
                name: ctor.name,
                offset,
                count,
            });
            let tid: any | number = setTimeout(() => {
                delete this.syncMap[pid];
                reject(`[错误]获取列表长度失败 同步超时!!`);
            }, this.timeOut);
            this.syncMap[pid] = { resolve, reject, cleanID: tid, obj: ctor };
            this.sock.send(rpcptl);
        });
    }
    public static GetlistHttp<T>(ctor: any, offset: number = 0, count: number = 100) {
        return new Promise<T[]>(async (resolve, reject) => {
            try {
                let text = await this.SendHttpSimple(`${this.httpApi}/synclist`, "POST", {
                    name: ctor.name, offset, count,
                });
                let json = JSON.parse(text);
                if (json.message) {
                    return reject(json.message);
                }
                let list = [];
                for (let item of json.data) {
                    let inst = new ctor();
                    for (let key in item) {
                        inst[key] = item[key];
                    }
                    list.push(inst);
                }
                resolve(list);
            } catch (error) {
                reject(error.stack);
            }
        });

    }
}

//注册 excel 解析使用工具类
if (!m4m["__ExcDate__"]) {
    m4m["__ExcDate__"] = {};
}
m4m["__ExcDate__"].SyncObject = SyncObject;