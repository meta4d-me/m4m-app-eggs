import { Dictionary } from "../Data/Dictionary";

// import {Dictionary} from "../Data/base/Dictionary";

export class LateUpdateMgr {
    public static Add(callback: Function, thisObj) {
        if (!callback || !thisObj) { return; }
        this.funDic.Add(callback, thisObj);
        // if(this.funDic.values.indexOf(thisObj) == -1){
        // }
    }

    public static Remove(callback: Function, thisObj) {
        if (!callback || !thisObj) { return; }
        if (this.funDic.values.indexOf(thisObj) != -1 && this.funDic.keys.indexOf(callback) != -1) {
            this.removeDic.Add(callback, thisObj);
        }
    }
    public static onUpdate(delta: number) //在入口中直接被掉用
    {
        let len: number = this.funDic.count;
        let fkeys = this.funDic.keys;
        for (let i = 0; i < len; i++) {
            let key = fkeys[i];
            let value = this.funDic.GetValue(key);
            let tfname = (key as Function).name;

            if (value) {
                (key as Function).call(value, delta);
            }
        }

        let rvalues = this.removeDic.values;
        let relen: number = this.removeDic.count;
        for (let i = 0; i < relen; i++) {
            let val = rvalues[i];
            this.idxs.length = 0;
            this.funDic.values.forEach((temp, idx) => {
                if (temp && temp == val) { this.idxs.push(idx); }
            });
            this.idxs.forEach((idx) => {
                let k = this.funDic.keys[idx];
                if (idx != -1 && k && k == this.removeDic.keys[i]) {
                    this.funDic.keys.splice(idx, 1);
                    this.funDic.values.splice(idx, 1);
                }
            });
        }

        if (relen > 0) {
            this.removeDic.Clear();
        }
    }
    public static idxs = [];
    private static funDic = new Dictionary();
    private static removeDic = new Dictionary();

    private static funList: Function[] = [];
    private static removeList: Function[] = [];
}