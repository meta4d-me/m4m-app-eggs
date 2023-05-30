export class Dictionary {

    public _keys: any[] = new Array<any>();
    public _values: any[] = new Array<any>();

    constructor(init: { key: any; value: any; }[] = null) {

        if (init) {
            for (let x = 0; x < init.length; x++) {
                //this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
    }

    public Add(key: any, value: any) {
        //this[key] = value;
        let index = this._keys.indexOf(key);//indexOf 查找会丢失精度  比如存入一个Number.MAX_VALUE 再用indexOf查找 (Number.MAX_VALUE-1)是否存在数组中  会返回存在  index不为-1
        if (index != -1) {
            this._values[index] = value;
        } else {
            this._keys.push(key);
            this._values.push(value);
        }
    }

    public Remove(key: any) {
        let index = this._keys.indexOf(key);
        if (index != -1) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            //delete this[key];
        } else {
            console.error(key + " The Key not in Dictionary");
        }
    }

    public GetValue(key: any): any {
        let index = this._keys.indexOf(key);
        if (index != -1) {
            return this._values[index];
        }
        console.error("Get:" + key + " The Key not in Dictionary");
        return null;
    }

    public GetKey(value: any): any {
        let index = this._values.indexOf(value);
        if (index != -1) {
            return this._keys[index];
        }
        console.error("Get:" + value + " The value not in Dictionary");

        return null;
    }

    get keys(): any[] {
        return this._keys;
    }

    get values(): any[] {
        return this._values;
    }

    public ContainsKey(key: any) {
        //if(typeof this[key] === "undefined") {
        if (this._keys.indexOf(key) == -1) {
            return false;
        }
        return true;
    }

    get count(): number {
        return this._keys.length;
    }

    public Clear(): void {
        this._keys.length = 0;
        this._values.length = 0;
    }
}