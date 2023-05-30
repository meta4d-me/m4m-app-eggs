export class Dictionary {

    _keys: Array<any> = new Array<any>();
    _values: Array<any> = new Array<any>();

    constructor(init: { key: any; value: any; }[] = null) {

        if (init) {
            for (var x = 0; x < init.length; x++) {
                //this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
    }

    Add(key: any, value: any) {
        //this[key] = value;
        var index = this._keys.indexOf(key);//indexOf 查找会丢失精度  比如存入一个Number.MAX_VALUE 再用indexOf查找 (Number.MAX_VALUE-1)是否存在数组中  会返回存在  index不为-1
        if (index != -1) {
            this._values[index] = value;
        } else {
            this._keys.push(key);
            this._values.push(value);
        }
    }

    Remove(key: any) {
        var index = this._keys.indexOf(key);
        if (index != -1) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            //delete this[key];
        } else {
            console.error(key + " The Key not in Dictionary");
        }
    }

    GetValue(key: any): any {
        var index = this._keys.indexOf(key);
        if (index != -1) {
            return this._values[index];
        } else {
            console.error("Get:" + key + " The Key not in Dictionary");
        }
        return null;
    }

    GetKey(value: any): any {
        var index = this._values.indexOf(value);
        if (index != -1) {
            return this._keys[index];
        } else {
            console.error("Get:" + value + " The value not in Dictionary");
        }
        return null;
    }

    get keys(): any[] {
        return this._keys;
    }

    get values(): any[] {
        return this._values;
    }

    ContainsKey(key: any) {
        //if(typeof this[key] === "undefined") {
        if (this._keys.indexOf(key) == -1) {
            return false;
        }
        return true;
    }

    get count(): number {
        return this._keys.length;
    }

    Clear(): void {
        this._keys.length = 0;
        this._values.length = 0;
    }
}