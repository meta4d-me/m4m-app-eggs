import { IDispose, ISpAnimPlayerHandle } from "Tools/engineParallel/spInterface";

//配置 模板
/**
{
    "states":{
        "show":{"clipName":"" , "speed":1 , "normalizeTime":1 , "mirror":false },
        "showidle":{"clipName":"showidle" , "speed":1 , "normalizeTime":1 , "mirror":false },
        "dead":{"clipName":"dead" , "speed":1 , "normalizeTime":1 , "mirror":false },
        "idle":{"clipName":"idle" , "speed":1 , "normalizeTime":1 , "mirror":false },
    },
    "transitions":[
        {"from":"__entry__","to":"idle"},
        {"from":"__anyState__","to":"show"},
        {"from":"__anyState__","to":"showidle"},
        {"from":"__anyState__","to":"dead"},
        {"from":"__anyState__","to":"idle"},
        {"from":"show","to":"showidle"},
        {"from":"hit1","to":"idle"},
    ]
}

 */

class AnimStatePlayEvent {
    public stateName: string = "";
}
class EventTypes {
    /** 状态开始播放 */
    public "onStatePlay": AnimStatePlayEvent;
    /** 状态播放结束 */
    public "onStatePlayEnd": AnimStatePlayEvent;
}

/**
 * 动画 状态 过渡对象
 */
class AnimationStateTransition {
    public fromState: string = "";
    public toState: string = "";
    constructor(from: string, to: string) {
        this.fromState = from;
        this.toState = to;
    }
}

/**
 * 动画 状态节点对象
 */
class AnimationStateNode {
    /** 最后添加的目标地点 */
    public lastToState: string = "";
    constructor(stateName: string, clipName?: string, normalizeTime?: number, speed?: number, mirror?: boolean) {
        this._stateName = stateName;
        this._clipName = clipName;
        this._normalizeTime = normalizeTime;
        this._speed = speed;
        this._mirror = mirror;
    }
    private _speed: number;
    private _normalizeTime: number;
    private _clipName: string;
    private _mirror: boolean;
    private _stateName: string;
    private _transitionMap: { [stateName: string]: AnimationStateTransition } = {};
    /** 过渡 Map*/
    public get transitionMap() { return this._transitionMap; }
    /** 状态名 */
    public get stateName() { return this._stateName; }
    /** 播放速度 */
    public get speed() { return this._speed; }
    /** 是否反转动画 */
    public get mirror() { return this._mirror; }
    /** 播放到 指定单位化时间 */
    public get normalizeTime() { return this._normalizeTime; }
    /** 动画片段名 */
    public get clipName() { return this._clipName; }

    /** 添加过渡 */
    public addTransition(transition: AnimationStateTransition) {
        this._transitionMap[transition.toState] = transition;
        this.lastToState = transition.toState;
    }
}
/**
 * 动画控制 状态机
 */
export class AnimationController extends m4m.AEvent implements IDispose {
    /** 动画片段 后缀 */
    private static ANYSTATE = "__anyState__";
    private static ENTRY = "__entry__";
    private static EXIT = "__exit__";
    private _animPlayer: ISpAnimPlayerHandle;
    /** 任何状态 */
    private anyState: AnimationStateNode;
    /** 进入状态 */
    private entry: AnimationStateNode;
    /** 退出状态 */
    private exit: AnimationStateNode;
    /** 状态map */
    private stateMap: { [stateName: string]: AnimationStateNode } = {};
    private currentState: AnimationStateNode;
    private playEvent: AnimStatePlayEvent;
    /** 动画播放器 */
    public get animPlayer() { return this._animPlayer; }
    public dispose() {
        //throw new Error("Method not implemented.");
        this.RemoveListenerAll();
        this._animPlayer = null;
        this.anyState = null;
        this.entry = null;
        this.exit = null;
        this.currentState = null;
        this.playEvent = null;
        if (this.stateMap) {
            let mapKeys = Object.keys(this.stateMap);
            mapKeys.forEach((val) => {
                delete this.stateMap[val];
            });
        }
        this.stateMap = null;
    }
    /** 初始化设置 */
    public init(animPlayer: ISpAnimPlayerHandle, stateConf: object) {
        this.playEvent = new AnimStatePlayEvent();
        this._animPlayer = animPlayer;
        //def state
        this.anyState = new AnimationStateNode(AnimationController.ANYSTATE);
        this.entry = new AnimationStateNode(AnimationController.ENTRY);
        this.exit = new AnimationStateNode(AnimationController.EXIT);
        this.addToMap(this.anyState);
        this.addToMap(this.entry);
        this.addToMap(this.exit);
        //custom state
        let states = stateConf["states"];
        let csKeys = Object.keys(states);
        for (let i = 0, len = csKeys.length; i < len; i++) {
            let sName = csKeys[i];
            let val = states[sName];
            let _state = new AnimationStateNode(sName, val.clipName, val.normalizeTime, val.speed, val.mirror);
            this.addToMap(_state);
        }
        //创建 过渡设置
        let transitionArr = stateConf["transitions"] as { from: string, to: string }[];
        for (let i = 0, len = transitionArr.length; i < len; i++) {
            let val = transitionArr[i];
            this.makeTransition(this.stateMap[val.from], this.stateMap[val.to]);
        }

        //entry
        this._playNext(this.entry);
    }

    /**
     * 获取 指定动画状态 的播放时长
     * @param stateName 动画状态名
     */
    public getStateTimeLength(stateName: string) {
        let timeLen = 0;
        let sta = this.stateMap[stateName];
        if (!sta) {
            console.warn(`getStateTimeLenght , 不存在 stateName ：${stateName}.`);
            return timeLen;
        }
        let clipName = sta.clipName;
        timeLen = this._animPlayer.getClipTotalTime(clipName);
        return timeLen;
    }

    /**
     * 获取 当前在播放的状态名字
     */
    public getCurrentStateName() {
        let result = "";
        if (this.currentState) {
            result = this.currentState.stateName;
        }
        return result;
    }

    /**
     * 播放 动画（指定的动画状态名）
     * @param stateName 动画状态名
     */
    public play(stateName: string) {
        let t = this.anyState.transitionMap[stateName];
        if (!t) {
            console.warn(`没有设置 动画过渡 从：<${t.fromState}> 到：<${t.toState}>`);
            return;
        }

        this._playByTransition(t);
    }

    /**
     * 停止播放 动画
     */
    public stop() {
        this._animPlayer.stop();
    }

    /**
     * 添加事件监听
     * @param eventType 
     * @param listener 
     * @param thisArg 
     */
    public On<K extends keyof EventTypes>(eventType: K, listener: (ev: EventTypes[K]) => any, thisArg: any) {
        super.On(eventType, listener, thisArg);
    }

    /**
     * 添加一次性事件监听(指定 state 对象)
     * @param eventType 事件类型
     * @param stateName 触发的state名
     * @param listener 监听触发函数
     * @param thisArg this对象
     */
    public OnStateOnce<K extends keyof EventTypes>(eventType: K, stateName: string, listener: (ev: EventTypes[K]) => any, thisArg: any) {
        let staName = stateName;
        let obj = {
            cb: (ev: AnimStatePlayEvent) => {
                if (ev.stateName != staName) { return; }
                listener.apply(thisArg, ev);
                this.RemoveListener(eventType, obj.cb, obj);
            },
        };
        this.On(eventType, obj.cb, obj);
    }

    /**
     * 移除事件监听
     * @param eventType 
     * @param listener 
     * @param thisArg 
     */
    public RemoveListener<K extends keyof EventTypes>(eventType: K, listener: Function, thisArg: any) {
        super.RemoveListener(eventType, listener, thisArg);
    }

    /**
     * 派发事件
     * @param eventType
     * @param ev
     */
    public Emit<K extends keyof EventTypes>(eventType: K, ev: EventTypes[K]) {
        super.Emit(eventType, ev);
    }

    private _playByTransition(t: AnimationStateTransition) {
        let target = t.toState;
        let sta = this.stateMap[target];
        if (!sta.clipName) {
            this._playNext(sta);
            return;
        }
        let bindTime = 0.2; //之后 可能 从AnimationStateTransition 中 获取
        this._animPlayer.playAnimByName(sta.clipName,
            this._onPlayEnd.bind(this), bindTime, 0, sta.speed, sta.mirror);
        if (sta.normalizeTime != 1) {
            this._animPlayer.setCurrClipNormalizedTime(sta.normalizeTime);  //设置 播放结束的时间（单位化的时间 0-1）
        }
        this.playEvent.stateName = target;
        this.currentState = sta;
        this.Emit("onStatePlay", this.playEvent);

    }

    private _playNext(state: AnimationStateNode) {
        let t = state.transitionMap[state.lastToState];
        if (!t) {
            return;
        }
        this._playByTransition(t);
    }

    /** 播放结束 */
    private _onPlayEnd() {
        if (!this.currentState) { return; }
        this.playEvent.stateName = this.currentState.stateName;
        this.Emit("onStatePlayEnd", this.playEvent);
        this._playNext(this.currentState);
    }

    /** 创建 过渡 */
    private makeTransition(from: AnimationStateNode, to: AnimationStateNode) {
        let transition = new AnimationStateTransition(from.stateName, to.stateName);
        from.addTransition(transition);
    }

    /** 添加到 map */
    private addToMap(state: AnimationStateNode) {
        this.stateMap[state.stateName] = state;
    }

    // private test() {
    //     this.OnStateOnce("onStatePlayEnd", "hit1",() => {
    //         console.error(`onStatePlayEnd : ${99999}`);
    //     }, this);

    //     this.OnStateOnce("onStatePlay", "hit1",() => {
    //         console.error(`onStatePlayEnd : ${99999}`);
    //     }, this);
    // }
}