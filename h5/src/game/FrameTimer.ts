import { FrameMgr } from "Tools/FrameMgr";

class timerNode{
    private static idCount = 0;
    private static getId(){
        this.idCount++;
        return this.idCount;
    }
    CallFun : (delat:number , isEnd:boolean , tick:boolean)=>any;
    time : number = 0;
    timeCount : number = 0;
    isLoop : boolean ;
    isStop = false;
    readonly id: number;
    constructor(CallFun:(delat:number , isEnd:boolean , tick:boolean)=>any,time:number,isLoop = false){
        this.CallFun = CallFun;
        this.time = time;
        this.isLoop = isLoop;
        this.id = timerNode.getId();
    }
}

//FrameMgr 帧调用 计时器
//方便 用FrameMgr 设置动画计时
export class FrameTimer
{            
    private static _instance : FrameTimer;
    static get Instance(){
        if(!this._instance){
            this._instance = new FrameTimer();
            this.init();
        }
        return this._instance;
    }

    private static init(){
        FrameMgr.Add(this._instance.update,this._instance);
    }

    private nodeDic : {[id:number]: timerNode} = {};

    private removeList = [];
    private update(delat:number){
        this.removeList.length = 0;        
        for(let key in this.nodeDic){
            let node = this.nodeDic[key];
            if(node){
                let tick = false;
                let isEnd = false;
                let needCall = true;
                node.timeCount += delat;
                let outDelat = node.timeCount;
                //是否强制停止
                if(node.isStop){
                    this.removeList.push(key);
                    isEnd = true;
                }else if(node.timeCount > node.time){ //是否到点
                    //是否loop
                    if(node.isLoop){
                        node.timeCount = 0;
                        tick = true;
                    }else{
                        isEnd = true;
                        this.removeList.push(key);
                    }
                }else{
                    needCall = false;
                }

                if(needCall && node.CallFun){
                    node.CallFun(outDelat,isEnd,tick);
                }
            }
        }

        this.removeList.forEach(key=>{
            let node =this.nodeDic[key];
            if(node){
                delete this.nodeDic[key];
            }
        });
    }

    /** 暂停计时 */
    stop(timeId:number){
        let node = this.nodeDic[timeId];
        if(node){
            node.isStop = true;
        }
    }

    /** 计时一次  
     * time 等待时间
     * DoFun delat 帧间隔时间 、isEnd 是否是结束 、tick 间隔滴答（loop 模式才有）
     */
    once(endTime:number ,DoFun:(delat:number , isEnd:boolean , tick:boolean)=>any ){
        if(endTime < 0 || !DoFun)return -1;
        let node = new timerNode(DoFun,endTime,false);
        this.nodeDic[node.id] = node;
        return node.id;
    }

    /** 计时一次  
     * time 循环时间间隔
     * DoFun delat 帧间隔时间 、isEnd 是否是结束 、tick 间隔滴答（loop 模式才有）
     */
    loop(tickTime:number ,DoFun:(delat:number , isEnd:boolean , tick:boolean)=>any){
        if(tickTime < 0 || !DoFun)return -1;
        let node = new timerNode(DoFun,tickTime,true);
        this.nodeDic[node.id] = node;
        return node.id;
    }
}