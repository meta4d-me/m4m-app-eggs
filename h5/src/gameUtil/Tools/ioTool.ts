// tslint:disable-next-line: class-name
export class ioTool extends m4m.io.binTool {
    constructor() {
        super();
    }

    public readVector3(): m4m.math.vector3 {
        let x = this.readFloat();
        let y = this.readFloat();
        let z = this.readFloat();
        return new m4m.math.vector3(x, y, z);
    }

    public readVector4(): m4m.math.vector4 {
        let w = this.readFloat();
        let x = this.readFloat();
        let y = this.readFloat();
        let z = this.readFloat();
        return new m4m.math.vector4(w, x, y, z);
    }

    public readVector3Array(): m4m.math.vector3[] {
        let arr: m4m.math.vector3[] = new Array<m4m.math.vector3>();
        let num = this.readByte();
        for (let i: number = 0; i < num; i++) {
            let v3 = this.readVector3();
            arr.push(v3);
        }
        return arr;
    }
    public readReshsArray(): number[][] {
        let arr: number[][] = new Array<number[]>();
        let num = this.readByte();
        for (let i: number = 0; i < num; i++) {
            let len = this.readByte();
            let nums = new Array<number>();
            for (let j: number = 0; j < len; j++) {
                let nn = this.readInt32();
                nums.push(nn);
            }
            arr.push(nums);
        }
        //let str = this.readUTFBytes();
        // console.error(str);
        // if (!str||str=="") {
        //    return null;
        // }
        // var strArr = str.split("|");
        // for(let i=0,len=strArr.length;i<len;++i){
        //    var newstrArr =  strArr[i].split(",");
        //    var num = new Array<number>();
        //    for(let j=0,len=strArr.length;j<len;++j){
        //     var ii =Number(strArr[i]);
        //     num.push(ii);
        //    }
        //    arr.push(num);
        // }
        return arr;
    }
    public readNumArray(): number[] {
        let arr: number[] = new Array<number>();
        let num = this.readByte();
        for (let i: number = 0; i < num; i++) {
            //var len = this.readByte();
            let nn = this.readInt32();
            arr.push(nn);
        }
        return arr;
    }
}