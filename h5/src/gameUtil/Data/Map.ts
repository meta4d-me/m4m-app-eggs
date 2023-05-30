
/**   
 * 清空Map 
 */
// tslint:disable-next-line: class-name
export class cMap<V>
{
    constructor(obj: object = null) {
        if (!obj) { return; }
        for (let key in obj) {
            this.data[key] = obj[key];
        }
    }

    /** 存放数据 */
    private data = {};
    /**   
     * 清空Map
     */
    public clear() {
        this.data = {};
    }

    /**   
     * 判断是否包含指定Key   
     * @param key
     */
    public has(key: number | string) {
        return key in this.data;
    }

    /**   
     * 放入一个键值对   
     * @param key   
     * @param value   
     */
    public set(key: number | string, value: V) {
        this.data[key] = value;
        return this;
    }

    /**   
     * 获取某键对应的值   
     * @param  key   
     * @return  value   
     */
    public get(key: number | string): V {
        return this.data[key];
    }

    /**   
     * 删除一个键值对   
     * @param  key   
     */
    public delete(key: number | string): boolean {
        if (this.has(key)) {
            delete this.data[key];
            return true;
        }
        return false;
    }

    /**   
     * 遍历Map,执行处理函数   
     * @param fn  回调函数 function(key,value){..}
     */
    public forEach(fn: (value: V, key: number | string) => void) {
        if (!fn) { return; }
        for (let key in this.data) {
            fn(this.data[key], key);
        }
    }

    /**   
     * 异步遍历Map,执行处理函数   
     * @param fn  回调函数 function(key,value){..}
     */
    public async forEachAsync(fn: (value: V, key: number | string) => Promise<void>) {
        if (!fn) { return; }
        for (let key in this.data) {
            await fn(this.data[key], key);
        }
    }
    /**   
     * 克隆Map,返回克隆Map   
     */
    public clone() {
        let newObj = new cMap<V>();
        for (let key in this.data) {
            newObj.set(key, this.data[key]);
        }
        return newObj;
    }
    /**   
     * 获取键值对数量   
     */
    get size() {
        return Object.keys(this.data).length;
    }

}

//注册 excel 解析使用工具类
if (!m4m["__ExcDate__"]) {
    m4m["__ExcDate__"] = {};
}
m4m["__ExcDate__"].cMap = cMap;