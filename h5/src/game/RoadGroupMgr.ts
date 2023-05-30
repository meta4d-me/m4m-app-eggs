import { obsStyle } from "./obsCreateMgr";
import { PoolMgr } from "./PoolMgr";
import { HMoveHandle } from "./Scripts/HMoveHandle";
import { configMgr } from "./configMgr";

enum RoadType {
    /** 空 */
    T_Null,
    /** 坡道 */  
    T_Ramp,
    /** 单方块组合类型 （不会动） */
    T_singe,
    /** 单方块组合类型 (会动) */
    T_singe_move,
    /** 拱门组合类型 */
    T_gate,
    /** 道路两边组合类型 */
    T_Border,
    /** 随机单方块 （是否运动、摆放位置 随机）*/
    T_cellCube,
    maxLen
}

export class RoadGroupMgr {
    private static cacheList: number[][] = [];
    private static groupsMap: {[rtype:number]:any[]} = {};
    static baseGenRate : {[rtype:number]:number} = {};
    private static funlist: Function[] = [];
    private static os = obsStyle;
    static init() {
        this.baseGenRate[RoadType.T_Null] = 1;
        this.baseGenRate[RoadType.T_Ramp] = 0;
        this.baseGenRate[RoadType.T_singe] = 0;
        this.baseGenRate[RoadType.T_singe_move] = 0;
        this.baseGenRate[RoadType.T_gate] = 0;
        this.baseGenRate[RoadType.T_Border] = 0;
        this.baseGenRate[RoadType.T_cellCube] = 0;

        for(let i = 0;i< RoadType.maxLen;i++){
            this.groupsMap[i] = [];
            this.cupRMap[i] = 0;
        }

        this.fullGroups();
        this.initState();
    }

    static initState(){
        this.totalKcount = 0;
        this.currStyle = this.lastStyle = -1;
        this.cacheList.length = 0;
        this.cacheList = this.cacheList.concat(this.groupsMap[RoadType.T_Null][0]);
    }

    private static fullGroups() {
        //funs
        for (let i = 0; i < obsStyle.maxLen; i++) {
            this.funlist[i] = this.fun_comm.bind(this);
        }
        //funRgs
        this.funsFull();

        //障碍 段落 模式配置设置
        //[obsStyle,参数...]
        let os = obsStyle;
        let k = -1; //空数据
        let ramp = 1; //斜坡 
        //null
        this.groupsMap[RoadType.T_Null].push([[k], [k], [k], [k], [k], [k]]);
        //坡道
        this.groupsMap[RoadType.T_Ramp].push([[k], [k], [ramp], [k] , [k]]);
        //活动块
        this.groupsMap[RoadType.T_singe_move].push([[k], [os.singe, 1, 0], [k], [os.singe, 1, 1], [k], [os.singe, 1, 0], [k]]);

        this.groupsMap[RoadType.T_singe_move].push([[k], [os.singe, 1, 0], [k], [os.singe, 0, 0], [k], [os.singe, 1, 1], [k], [os.singe, 3], [k]]);

        this.groupsMap[RoadType.T_singe_move].push([[k], [os.singe, 1, 0], [k], [os.singe, 0, 0], [k], [os.singe,2], [k], [os.singe, 1, 1], [k]]);

        this.groupsMap[RoadType.T_singe_move].push([[k], [os.singe, 0 ,1], [k], [os.singe, 3], [k], [os.singe, 0], [k]]);

        this.groupsMap[RoadType.T_singe_move].push([[k], [os.singe, 1], [k], [os.singe, 0 , 1], [k], [os.gateH_0, 3], [k]]);

        this.groupsMap[RoadType.T_singe_move].push([[k], [os.singe, 2], [k], [os.singe, 0, 0], [k], [os.singe, 0], [k]]);

        //不动块
        this.groupsMap[RoadType.T_singe].push([[k], [os.singe, 2], [k], [os.singe, 3], [k], [os.singe, 0], [k]]);

        this.groupsMap[RoadType.T_singe].push([[k], [os.singe, 3], [k], [os.singe, 1], [k], [os.singe, 5], [k]]);

        this.groupsMap[RoadType.T_singe].push([[k], [os.singe, 5], [k], [os.singe, 2], [k]]);

        this.groupsMap[RoadType.T_singe].push([[k], [os.singe, 2], [k], [os.singe, 0], [k]]);

        //边缘块组
        this.groupsMap[RoadType.T_Border].push([[k], [os.L_0, 0], [k], [os.T_2, 1], [k], [os.L_1, 0], [k] , [k]]);

        this.groupsMap[RoadType.T_Border].push([[k], [os.L_0, 1], [k], [os.L_2, 0], [k], [os.T_1, 1], [k] , [k]]);

        this.groupsMap[RoadType.T_Border].push([[k], [os.Y_0, 0], [k], [os.Y_2, 1], [k], [os.L_1, 0], [k], [os.Y_4, 1], [k]]);

        this.groupsMap[RoadType.T_Border].push([[k], [os.T_0, 1], [k], [os.L_0, 0], [k], [os.Y_1, 1], [k], [os.T_3, 1], [k]]);

        this.groupsMap[RoadType.T_Border].push([[k], [os.T_1, 0], [k], [os.T_0, 1], [k], [os.Y_1, 0], [k], [os.T_2, 1], [k]]);

        this.groupsMap[RoadType.T_Border].push([[k], [os.Y_0, 1], [k], [os.Y_1, 0], [k], [os.T_0, 1], [k], [os.T_3, 0], [k]]);

        //门 (1)
        this.groupsMap[RoadType.T_gate].push([[k], [os.gate_0], [k], [os.gate_1], [k], [os.gate_2], [k], [os.L_2, 0], [k]]);

        this.groupsMap[RoadType.T_gate].push([[k], [os.gate_2], [k], [os.gateH_2, 1], [k], [os.gateH_1, 1], [k], [os.gateH_2, 0], [k]]);

        this.groupsMap[RoadType.T_gate].push([[k], [os.gateH_1, 0], [k], [os.gate_1], [k], [os.gateH_2, 0], [k], [os.gate_2], [k]]);

        this.groupsMap[RoadType.T_gate].push([[k], [os.Y_1, 0], [k], [os.gateH_0], [k], [os.gateH_2, 1], [k], [os.Y_4, 0], [k]]);

        this.groupsMap[RoadType.T_gate].push([[k], [os.Y_0, 0], [k], [os.gate_0], [k], [os.gateH_2, 1], [k], [os.Y_4, 0], [k]]);
    }

    private static funsFull() {
        
        this.funlist[obsStyle.singe] = this.fun_singe.bind(this); //
        this.funlist[obsStyle.ramp_0] = this.fun_ramp.bind(this); //
    }

    //斜坡 随机
    private static fun_ramp(data: number[]) {
        let style = data[0];
        if (style == -1) return null;
        let pos = 0; //默认靠左
        style = Math.floor(Math.random() * 6);
        style = style >= 6 ? 5 : style;
        style = style + obsStyle.ramp_0;

        //let temp = obsCreateMgr.getObs(style).clone();
        let temp = PoolMgr.new_obs(style);
        temp.localTranslate.x = this.getXbyNum(pos);
        return temp;
    }

    //通用
    private static fun_comm(data: number[]) {
        let style = data[0];
        let pos = 0; //默认靠左

        //let temp = obsCreateMgr.getObs(style).clone();
        let temp = PoolMgr.new_obs(style);
        if (data[1]) {
            pos = 4; //右边
            m4m.math.quatFromEulerAngles(0, 180, 0, temp.localRotate);
        }
        temp.localTranslate.x = this.getXbyNum(pos);
        return temp;
    }

    //单个方块 （带移动）
    private static fun_singe(data: number[]) {
        let style = data[0];
        //let temp = obsCreateMgr.getObs(style).clone();
        let temp = PoolMgr.new_obs(style);
        let hm = temp.gameObject.getComponent(HMoveHandle.name) as HMoveHandle;
        if (data.length == 2) {
            let pos = data[1];
            temp.localTranslate.x = this.getXbyNum(pos);
            hm.stop = true;
        } else {
            let mode = data[1];
            let isrevert = data[2] ? true : false;
            hm.init(mode, isrevert);
            hm.stop = false;
        }
        return temp;
    }

    private static gDCount = 0;
    //随机 创建一个钻石(金币)
    private static tryRGenOneCoin(rate){
        this.gDCount ++;
        // if(this.lastStyle == RoadType.T_Ramp ) return;
        if(this.lastStyle == RoadType.T_Ramp && rate < 0.6 ) return;// 避免被坡道挡住 捡不到
        if(rate < 0.2 )    return; //避免太靠近墙，易撞死
        if(this.gDCount < configMgr.DiamonGenSpeed / configMgr.obsBaseGap)  return;
        this.gDCount = 0;
        let pos = Math.floor( Math.random() * 5);
        pos = pos>= 5 ? 4: pos;
        let temp = PoolMgr.new_Coin();
        temp.localTranslate.x = this.getXbyNum(pos);
        
        return temp;
    }

    private static gbCount = 0;
    //private static readonly genLen = configMgr.obsBaseGap;
    //生成加速带
    private static rGenBoost(){
        this.gbCount ++;
        if(this.gbCount < configMgr.BoostGenSpeed / configMgr.obsBaseGap)  return;
        this.gbCount = 0;

        let pos = Math.floor( Math.random() * 5);
        pos = pos>= 5 ? 4: pos;
        let temp = PoolMgr.new_Boost();
        temp.localTranslate.x = this.getXbyNum(pos);
        
        console.error(` 生成加速带`);
        return temp;
    }

    private static Kcount = 0;
    private static isK = false; //是否为空地板
    private static totalKcount :number;
    private static lastStyle :number; //上一个类型
    private static currStyle :number; //当前类型
    /** 获取一个障碍物体 */
    static getOne() {
        this.ckAdd();
        if (this.isK) {
            this.totalKcount ++;
            this.Kcount++;
            if(this.totalKcount < 5){ //前xx 段不创建 金币 & 加速带
                return null;
            } 
            let tNum =  configMgr.obsBaseGap -1;
            if (this.Kcount >= tNum) {
                this.Kcount = 0;
                this.isK = false;
            }

            if(this.Kcount == Math.floor(configMgr.obsBaseGap /2)){
                return this.rGenBoost();  //尝试 创建一个加速带
            }
            
            //避免 放置金币太靠近障碍 
            return this.tryRGenOneCoin( this.Kcount/tNum ); //尝试 创建一个钻石(金币)
        }
        let data = this.cacheList.shift();
        let style = data[0];
        this.lastStyle = this.currStyle;
        this.currStyle = style;
        if (style == -1) {
            this.isK = true;
            return null;
        }
        let fun = this.funlist[style];
        if (fun) {
            return fun(data);
        }
    }

    /** 检查补充道路队列 数据 */
    private static ckAdd() {
        if (this.cacheList.length < 2) {
            let rtype = this.getRTypeOne(); //获取一个大类型
            let arr = this.getSubModes(rtype);
            this.cacheList = this.cacheList.concat(arr);
        }
    }

    //随机一个小类型
    private static getSubModes(rtype : RoadType ) : any[]{
        let r = Math.random();
        let arr = [];
        if(rtype == RoadType.T_cellCube){
            arr = this.cellCubeMode();
        }else{
            let temp = this.groupsMap[rtype];  //随机取小类型
            let mode = Math.floor(r * temp.length);
            mode = mode >= temp.length ? temp.length - 1 : mode;
            arr = temp[mode];
        }
        return arr;
    }

    //单方块的随机创建mode
    private static cellCubeMode(){
        let k = -1;
        let arr = [];
        let len = Math.ceil(Math.random() * 2);
        while(len>=0){
            arr.push( [k]);
            if(Math.random() < 0.5){ //是否运动 概率50%
                let pos = Math.floor(Math.random() * 5);
                arr.push([obsStyle.singe, pos]);
            }else{
                let ctype = Math.round( Math.random());
                let mode = Math.round( Math.random());
                arr.push([obsStyle.singe, ctype, mode]);
            }
            len --;
        }
        return arr;
    }

    /**按照权重  获取一种 RoadType 类型 */
    private static getRTypeOne(){
        return this.rTypeOne();
        // return this.rTypeOneLimit();
    }

    private static cupRMap : {[rtype:number]:number} = {};
    //禁止连续出现 不再 
    private static rTypeOneLimit(){
        let len = RoadType.maxLen;
        let all = 0;
        for(let i=0; i < len ;i++){
            all += this.cupRMap[i];
        }
        let rtype = 0;
        let r = Math.random() * all;

        if(all != 0){
            let count = 0;
            for(let i=0; i < len ;i++){
                count += this.cupRMap[i];
                if(r < count){ //fined it
                    rtype = i;
                    break;
                }
            }
        }

        for(let i=0; i < len ;i++){
            if(i == rtype){
                //每次出现后 动态权重值置为0
                this.cupRMap[i] = 0;
            }else{
                //每次倍所有权重
                if(isNaN(this.baseGenRate[i] )){
                    debugger;
                }
                this.cupRMap[i] += this.baseGenRate[i];
            }
        }
        return rtype;
    }

    //正常随机一个类型
    private static rTypeOne(){
        let len = RoadType.maxLen;
        let all = 0;
        for(let i=0; i < len ;i++){
            all += this.baseGenRate[i];
        }
        let rtype = 0;
        let r = Math.random() * all;

        if(all != 0){
            let count = 0;
            for(let i=0; i < len ;i++){
                count += this.baseGenRate[i];
                if(r < count){ //fined it
                    rtype = i;
                    break;
                }
            }
        }

        return rtype;
    }

    private static getXbyNum(num: number) {
        num = num < 0 ? 0 : num > 4 ? 4 : num; //limit
        return num * 2 - 4;
    }
}