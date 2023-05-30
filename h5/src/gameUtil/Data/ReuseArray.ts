/**
 * 复用数组 ，用于频繁重复创建数组容器的场景(减少GC消耗)
 */
export class ReuseArray<T>{
    private arr : T[]= [];
    private buoy = -1 ;

    /** 获取 Array 对象 */
    public getArray(){
        return this.arr;
    }

    /** 获取当前长度 */
    get length(){ return this.buoy + 1; }
    set length(val){ this.buoy = val - 1;}

    public push(val : T){
        this.buoy++;
        this.arr[this.buoy] = val;
    }

    /** 获取指定索引的值 */
    public get(index: number){
        if (index > this.buoy) { return null; }
        return this.arr[index];
    }

    /** 数组所有值置为null  */
    public clear(){
        let len = this.arr.length;
        for (let i=0; i < len ;i++){
            if (this.arr[i] == null && i >= this.buoy) { break; }
            this.arr[i] = null;
        }
        this.buoy = -1;
    }
}