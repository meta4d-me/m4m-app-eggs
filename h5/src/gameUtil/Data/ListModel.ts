
/** 收缩列表容器
 * （常用包裹数据容器）
 */
export class ListModel<T> extends m4m.AEvent {
    /** 容器名字 */
    get listName() { return this._listName; }
    /** 所属位置标记*/
    get place() { return this._place; }
    /** 容器的数组 */
    get list() { return this._list; }

    /** 二分插入法 */
    private static insertSortWithBinarySearch(insertNum: number, arr: number[]) {
        let low = 0;
        let high = arr.length;
        let mid = -1;
        while (low <= high) {
            mid = low + Math.floor((high - low) * 0.5);
            if (arr[mid] > insertNum) {
                high = mid - 1;
            } else { // 元素相同时，也插入在后面的位置
                low = mid + 1;
            }
        }
        arr.splice(mid, 0, insertNum);
        // console.log("idx :" + mid);
    }
    /** 容器最大值 */
    public get Max(): number {
        if (this._max != this.count) {
            this._max = this.count;
        }
        return this._max;
    }
    public set Max(value: number) {
        // this._max = value;
        // this._list.length = 0;
        // for (var i = 0; i < this._max; i++) {
        //     this._list.push(null);
        // }
        // // super.dispatchEvent(CUIEvent.MAX_CHANGE, this._max, this.bagName, this.place);
        // this.eventData.set(-1,  null);
        // this.Emit("MAX_CHANGE",this.eventData);
        // tslint:disable-next-line: no-parameter-reassignment
        if (value < 0) { value = 0; }
        if (value == this._max) { return; }

        let len: number = this._list.length;
        if (value >= len) {
            for (let i = len; i < value; i++) {
                this._list.push(null);
            }
        } else {
            this._list.splice(value - 1);
        }
        this._max = this._list.length;

        this.refreshEmptyIdxs();
        this.eventData.set(-1, null);
        this.Emit("MAX_CHANGE", this.eventData);
    }

    // /** 容器尺寸 */
    // public get size(): number {
    //     return this._list.length;
    // }

    /** 容器尺寸 */
    public get count(): number {
        return this._list.length;
    }

    /** 存放东西的数量 */
    get HaveCount() {
        // let Num1: number = 0;
        // let len: number = this._list.length;
        // for (let i = 0; i < len; i++) {
        //     if (this._list[i] != null) {
        //         Num1++;
        //     }
        // }
        // return Num1;

        return this._list.length - this._emptyIdxArr.length;
    }
    /**
     * 收缩列表容器
     * @param listName 容器名字标记
     * @param place 所属位置标记
     */
    public constructor(listName: string = "", place: number = -1) {
        super();
        this._place = place;
        this._listName = listName;
        this.eventData = new ListModelEventData<T>(this, this.listName);
    }
    private eventData: ListModelEventData<T>;
    private _listName: string = "";
    private _place: number = -1;

    private _list: T[] = new Array<T>();

    private _emptyIdxArr: number[] = [];

    private _max: number = -1;

    /**
     * 获取指定索引位置的元素
     * @param index 索引
     */
    public getValue(index: number): T {
        if (index < 0 || index > this.Max - 1) {
            console.warn(`ListModel  name: ${this.listName} place :${this.place}  , on getValue index range error`);
            return null;
        }
        return this._list[index];
    }

    /**
     * 设置指定位置的元素(成功：true 失败 ： false)
     * @param index 索引
     * @param value 元素
     */
    public setValue(index: number, value: T): boolean {
        if (index < 0 || index > this.Max - 1) {
            console.warn(`ListModel  name: ${this.listName} place :${this.place}  , on setValue index range error`);
            return false;
        }
        // if (value == this._list[index]) {//如果是同一个对象改了数据更新 会不成功
        //     console.warn(`ListModel  name: ${this.listName} place :${this.place}  ,on setValue 设置的数据与现有数据相同`);
        //     return false;
        // }

        this._list[index] = value;
        if (this._list[index]) {
            this.deleteOfEmpytIdxs(index);
        } else {
            this.insertToEmpytIdxs(index);
        }

        // this.refreshEmptyIdxs();
        //抛事件
        // super.dispatchEvent(CUIEvent.ADD, CUIEvent.ADD, index, value, this.bagName, this.place);
        this.eventData.set(index, value);
        this.Emit("ADD", this.eventData);

        return true;
    }

    // /**
    //  * 扩充容器尺寸
    //  */
    // private set upDateMax(value: number) {
    //     this._max = this._list.length;
    //     if (value > this._max) {
    //         for (var i = this._max; i < value; i++) {
    //             this._list.push(null);
    //         }
    //     }
    //     else {
    //         this._list.splice(value - 1);
    //     }
    //     this._max = value;

    //     this.eventData.set(-1,  null);
    //     this.Emit("MAX_CHANGE",this.eventData);
    // }

    /**
     * 添加到空位 (成功：true 失败 ： false)
     * @param obj 被添加对象
     */
    public add(obj: T): boolean {
        let useIndex = this.freeIndex();
        if (useIndex == -1) { return false; }

        this.setValue(useIndex, obj);
        return true;
    }

    // /**
    //  * 获取指定索引位置的元素
    //  * @param index 索引
    //  */
    // public getAt(index: number): T {
    //     return this.list[index];
    // }

    /**
     * 清理容器所有的元素
     * @param reset 重置 (max 到 0)
     */
    public clear(reset: boolean = true): void {
        if (this._list.length == 0) {
            return;
        }
        let eventStr = "";
        if (reset) {
            this._list.length = 0;
            this._max = 0;
            // super.dispatchEvent(CUIEvent.RESIZE, CUIEvent.RESIZE);
            eventStr = "RESIZE";
        } else {
            for (let i = 0; i < this.Max; i++) {
                this._list[i] = null;
            }
            // super.dispatchEvent(CUIEvent.CLEAR, CUIEvent.CLEAR);
            eventStr = "CLEAR";
        }

        this.refreshEmptyIdxs();
        this.eventData.set(-1, null);
        this.Emit(eventStr, this.eventData);
    }

    /**
     * 删除指定位置的元素
     * @param index 索引位置
     */
    public RemoveAt(index: number) {
        //  RemoveAt  会删除 不是设为null
        if (this._list[index] == null) { return; }

        let obj = this._list[index];
        this._list[index] = null;

        // this.refreshEmptyIdxs();
        this.insertToEmpytIdxs(index);

        // super.dispatchEvent(CUIEvent.REMOVE, CUIEvent.REMOVE, index, null, this.bagName, this.place);
        this.eventData.set(index, obj);
        this.Emit("REMOVE", this.eventData);

        return obj;
    }

    /**
     * 删除元素
     * @param obj
     * @param index
     */
    public remove(obj: T, index: number = -1) {
        if (index == -1) {
            // tslint:disable-next-line: no-parameter-reassignment
            index = this._list.indexOf(obj);
        }
        //  RemoveAt  会删除 不是设为null
        if (this._list[index] == null) { return; }

        this._list[index] = null;

        this.insertToEmpytIdxs(index);
        // this.refreshEmptyIdxs();

        // super.dispatchEvent(CUIEvent.REMOVE, CUIEvent.REMOVE, index, obj, this.bagName, this.place);
        this.eventData.set(index, obj);
        this.Emit("REMOVE", this.eventData);

        return obj;
    }

    /**
     * 设置数据
     * @param source
     */
    public setSource(source: T[], clear: boolean = true) {
        this.clear(clear);//清理原数据
        for (let i = 0; i < source.length; i++) {
            let sou = source[i];
            this._list.push(sou);
        }
        this.Max = source.length;
        this.refreshEmptyIdxs();
    }

    /**
     * 找空格子 , 返回找到的索引值
     */
    public freeIndex(): number {
        // let len: number = this._list.length;
        // for (let i = 0; i < len; i++) {
        //     if (this._list[i] == null) {
        //         return i;
        //     }
        // }
        // return -1;

        if (this._emptyIdxArr.length < 1) { return -1; }
        return this._emptyIdxArr[0];
    }

    /**
     * 检查是否有指定数量空格子
     * @param num 数量
     */
    public FindFreeNum(num: number): boolean {
        // let Num1: number = 0;
        // let len: number = this._list.length;
        // for (let i = 0; i < len; i++) {
        //     if (this._list[i] == null) {
        //         Num1++;
        //         if (Num1 == num) return true;
        //     }
        // }
        // return false;

        return this._emptyIdxArr.length >= num;
    }

    /**
     * 添加事件监听
     * @param eventType
     * @param listener
     * @param thisArg
     */
    public addListener<K extends keyof IListModelEventMap>(eventType: K, listener: (ev: ListModelEventData<T>) => any, thisArg: any) {
        this.On(eventType, listener, thisArg);
    }

    /**
     * 移除事件监听
     * @param eventType
     * @param listener
     * @param thisArg
     */
    public removeListener<K extends keyof IListModelEventMap>(eventType: K, listener: Function, thisArg: any) {
        this.RemoveListener(eventType, listener, thisArg);
    }
    /** 刷新空索引的数组 */
    private refreshEmptyIdxs() {
        this._emptyIdxArr.length = 0;
        for (let i = 0, len = this._list.length; i < len; i++) {
            if (this._list[i] != null) { continue; }
            this._emptyIdxArr.push(i);
        }
    }

    //插入到空索引列表
    private insertToEmpytIdxs(idx: number) {
        ListModel.insertSortWithBinarySearch(idx, this._emptyIdxArr);
    }

    //删除空索引列表
    private deleteOfEmpytIdxs(idx: number) {
        let i = this._emptyIdxArr.indexOf(idx);
        if (i == -1) { return; }
        this._emptyIdxArr.splice(i, 1);
    }
}

class ListModelEventData<T>{
    /** 事件发送者 */
    public readonly dispatcher: ListModel<T>;
    /** 元素索引值 */
    public index: number;
    /** 元素对象 */
    public obj: T;
    constructor(dispatcher: ListModel<T>, listName: string) {
        this.dispatcher = dispatcher;
    }
    public set(index: number, obj: T) {
        this.index = index;
        this.obj = obj;
    }
}

interface IListModelEventMap {
    /** 添加元素 */
    "ADD": "ADD";
    /** 最大值变化 */
    "MAX_CHANGE": "MAX_CHANGE";
    /** 重设置尺寸 */
    "RESIZE": "RESIZE";
    /** 清理全部元素 */
    "CLEAR": "CLEAR";
    /** 删除元素 */
    "REMOVE": "REMOVE";
}