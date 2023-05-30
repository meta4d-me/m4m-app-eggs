export class consTool
{            
    private static tag = "__consTool";
    private static userCode = /__usercode__/;
    static init(){
        m4m[this.tag] = consTool;
        //this.scanAllUsercode();
        this.scan_new();
    }

    private static scanAllUsercode(){
        let symbolkey = Reflect.ownKeys(globalThis.System.registry)[1]; //固定位置
        let missObj = globalThis.System.registry[symbolkey];
        for(var key in missObj){
            if(typeof(key) == "string"){
                let test = this.userCode.test(key);
                if(test){
                    let arr = key.split("/");
                    let endStr = arr[arr.length -1]
                    let temp = missObj[key][endStr];
                    if(temp)
                        m4m[this.tag][temp.name] = temp;
                }
            }
        }
    }

    private static scan_new(){
        let missObj = globalThis.System.models;
        for(var key in missObj){
            let arr = key.split("/");
            let endStr = arr[arr.length -1];
            let classObj = missObj[key][endStr];
            if(classObj){
                m4m[this.tag][endStr] = classObj;
            }
        }
    }
}