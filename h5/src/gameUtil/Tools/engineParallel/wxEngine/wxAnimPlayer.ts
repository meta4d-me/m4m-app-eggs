import { ReuseArray } from "Data/ReuseArray";
import engine from "engine";
import { cMap } from "src/gameUtil/Data/Map";
import { TimeUtil } from "Time/TimeUtil";
import { AnimTimeEventHandle, AnimTimeEventNode } from "../AnimTimeEventHandle";
import { wxEngineGO } from "../spGameObject";
import { IReset, ISpAnimPlayer, ISpAnimPlayerHandle, ISpGameObject, spComponentType } from "../spInterface";
type animTimeData = { [time: number]: { actFunName: string, value: any } };
type animInfo = { length: number, normalizedTime: number, startTime: number, ckEndNormalizedTime: number };
// tslint:disable-next-line: class-name
export class wxAnimPlayer implements ISpAnimPlayerHandle, ISpAnimPlayer, IReset {

    public static update(dt: number) {
        this.TimeEventUpdate(dt);
        this.chcekPlayend(dt);
    }

    private static TimeEventUpdate(dt: number) {
        let eventHD = wxAnimPlayer.animTimeEventHD;
        eventHD.updateDic.forEach((n) => {
            let p = n.playerObj as wxAnimPlayer;
            let ap = p.rawHandle;
            if (!ap) { return; }
            let clip = ap.getCurrentAnimatorState().motion as engine.AnimationClip;
            if (!clip) { return; }
            let resId = clip.resourceID;
            n.ckTimeEventUpdate(eventHD, resId, p.getCurrClipTime(), p.currClipTotalTime());
        });
    }

    private static chcekPlayend(dt: number) {
        for (let nodeID in this.waitePlayEndMap) {
            this.removeArr.length = 0;
            let idMap = this.waitePlayEndMap[nodeID];
            for (let clipName in idMap) {
                let [info, callBack] = idMap[clipName];
                this.calcNormalizedTime(info);
                if (info.normalizedTime >= info.ckEndNormalizedTime) {
                    this.removeArr.push(nodeID);
                    callBack(); //动画播放完毕 回调函数
                }
            }

            for (let i = 0, len = this.removeArr.length; i < len; i++) {
                delete this.waitePlayEndMap[this.removeArr.get(i)];
            }
        }
    }

    private static calcNormalizedTime(info: animInfo) {
        info.normalizedTime = (TimeUtil.time - info.startTime) * 0.001 / info.length;
    }

    public id: string;
    public rawHandle: engine.Animator;
    public gameObject: wxEngineGO;
    public compType: spComponentType;

    constructor(raw: engine.Animator, go: wxEngineGO) {
        this.id = raw.id.toString();
        this.rawHandle = raw;
        this.gameObject = go;
    }
    private static waitePlayEndMap: { [nodeID: string]: { [clipName: string]: [animInfo, Function] } } = {};
    private static removeArr: ReuseArray<string> = new ReuseArray();
    private static animTimeEventHD: AnimTimeEventHandle = new AnimTimeEventHandle();   //动画时间轴事件HD
    private animTimeEventNode: AnimTimeEventNode = new AnimTimeEventNode(this);

    private _isPlaying = true;
    private stateInfoMap: { [key: string]: animInfo } = {};
    private clipTimeLenMap: { [key: string]: number } = {};
    private currClipName: string = "";
    public getCurrClipName(): string {
        return this.currClipName;
    }

    public stop() {
        this.rawHandle.speed = 0;
        this._isPlaying = false;
    }

    public playAnimByName(simpleClipName: string, onPlayend?: () => any, blendTime?: number, endframe?: number, speed?: number, beRevert?: boolean) {
        if (!this.rawHandle) {
            return;
        }

        this.ensureStateInit();
        this._playAnimByName(simpleClipName, onPlayend, blendTime, endframe, speed, beRevert);
    }

    public currClipTotalTime(): number {
        return this.getClipTotalTime(this.currClipName);
    }

    public getClipTotalTime(simpleClipName: string) {
        let time = this.clipTimeLenMap[simpleClipName];
        return time == null ? 0 : time;
    }

    public setCurrClipNormalizedTime(normalLizedTime: number) {
        let info = this.stateInfoMap[this.currClipName];
        if (!info) { return; }
        info.startTime = -info.normalizedTime * info.length * 1000 + TimeUtil.time; //startTime 修改
        info.normalizedTime = normalLizedTime;
    }
    public getCurrClipNormalizedTime(): number {
        let info = this.stateInfoMap[this.currClipName];
        if (!info) { return 0; }
        wxAnimPlayer.calcNormalizedTime(info);
        return info.normalizedTime;
    }
    public isPlay(): boolean {
        if (!this._isPlaying) { return false; }

        let info = this.stateInfoMap[this.currClipName];
        if (info) {
            wxAnimPlayer.calcNormalizedTime(info);
            this.rawHandle.getCurrentAnimatorStateInfo(0, info as any);
            this._isPlaying = info.normalizedTime < 0.999999;
        }
        return this._isPlaying;
    }
    public hasClip(simpleClipName: string) {
        return this.rawHandle.hasState(0, simpleClipName);
    }
    public dispose(): void {
        if (this.animTimeEventNode) { this.animTimeEventNode.dispose(); }
        this.clearPlayEndFuns();
        // throw new Error("Method not implemented.");
        this.stateInfoMap = null;
        this.clipTimeLenMap = null;

        this.rawHandle = null;
        this.gameObject = null;
        this.animTimeEventNode = null;
    }

    public reset() {
        this.clearPlayEndFuns();

    }

    public regTimeEventCallbackObj(eventActObj: object) {
        this.animTimeEventNode.regTimeEventCallbackObj(eventActObj);
    }

    public setTimeEvent(simpleClipName: string, timePoint: number, _actFunName: string, val: string) {
        let sta = this.tryGetState(simpleClipName);
        if (!sta) { return; }
        let _clip = sta.motion as engine.AnimationClip;
        if (!_clip) { return; }
        let resId = _clip.resourceID;
        this.animTimeEventNode.setTimeEvent(wxAnimPlayer.animTimeEventHD, resId, timePoint, _actFunName, val);
    }

    /**
     * 获取 当前在播放动画到的时间点
     */
    private getCurrClipTime(): number {
        let ap = this.rawHandle;
        if (!ap) { return 0; }
        let info = this.stateInfoMap[this.currClipName];
        if (!info) { return 0; }
        let timePoint = (TimeUtil.time - info.startTime) * 0.001;
        timePoint %= info.length;
        return timePoint;
    }

    private addPlayEndFun(nodeID: string, clipName: string, callBackFun: Function, info: animInfo) {
        let idMap = wxAnimPlayer.waitePlayEndMap[nodeID];
        if (!idMap) {
            idMap = wxAnimPlayer.waitePlayEndMap[nodeID] = {};
        }
        idMap[clipName] = [info, callBackFun];
    }

    //确保 播放动画前 ，stata 被初始化了 （微信组件问题 ， 初始化完全需要 awake 和 update 过）
    private ensureStateInit() {
        // let tag = "__EnsureStateTag__" ;
        // if(this.rawHandle[tag]) return;
        // this.rawHandle[tag] = true;

        let hasAwaked = this.rawHandle["_binding"] != null;

        if (!hasAwaked) {
            let oldOnAwake: Function = this.rawHandle["_onAwake"];
            // let has_onAwake = false;
            // let wFun = this.rawHandle["_onAwake"] = ()=>{
            //     if(has_onAwake) return;
            //     has_onAwake = true;
            //     old_onAwake.apply(this.rawHandle);
            // }

            // //init
            // wFun();

            oldOnAwake.apply(this.rawHandle);
        }

        // this.rawHandle["_onUpdate"](0);
    }

    private tryGetState(clipName: string) {
        if (!this.rawHandle) { return; }
        let stateTag = "__stateTag__";
        let stateMap: { [name: string]: any } = this.rawHandle[stateTag];
        if (!stateMap) {
            stateMap = this.rawHandle[stateTag] = {};
            let contr = this.rawHandle.controller;
            let layer = contr.layers[0];
            let stateM = layer.stateMachine;
            for (let i = 0, len = stateM.states.length; i < len; i++) {
                let state = stateM.states[i];
                stateMap[state.name] = state;
            }
        }

        let st = stateMap[clipName];
        if (!st) {
            console.error(` animator 中 不存在 ${clipName}!!!`);
        }
        return st;
    }

    private _playAnimByName(clipName: string, onPlayend?: () => any, blendTime?: number, endframe?: number, speed?: number, beRevert?: boolean) {
        // let sta = this.rawHandle.getCurrentAnimatorState();
        let sta = this.tryGetState(clipName);
        let frameRate: number = sta.motion["frameRate"];
        let frameLength: number = sta.motion["frameLength"];

        let endNormalizedTime = 1;
        //endframe 功能
        if (endframe != null && frameLength) {
            let _endframe = endframe % frameLength;
            endNormalizedTime = _endframe / frameLength;
        }

        this.rawHandle.play(clipName, 0);
        this.rawHandle["_onUpdate"](0); // wx 必须update 才能保证 state 正常
        // console.error(`wxAnimPlayer.playAnimByName ${clipName}`);
        // window["__he"] = this.rawHandle;
        this.currClipName = clipName;
        this._isPlaying = true;
        this.rawHandle.speed = speed != null ? speed : 1;
        if (!sta) {
            console.error(`getCurrentAnimatorState() 获取state 对象为null , Animator 组件并未初始化完全！`);
        }
        sta.mirror = beRevert == true;

        let info = this.stateInfoMap[clipName];
        if (!info) {
            info = this.rawHandle.getCurrentAnimatorStateInfo(0, {} as any) as any;
            this.stateInfoMap[clipName] = info;
        }
        (info as animInfo).normalizedTime = 0;
        (info as animInfo).startTime = TimeUtil.time;
        (info as animInfo).ckEndNormalizedTime = endNormalizedTime;

        //clip time lenght
        if (this.clipTimeLenMap[clipName] == null) {
            let currClip = sta.motion as engine.AnimationClip;
            this.clipTimeLenMap[clipName] = currClip.length;
        }

        //检查 upadte 注册
        // this.ckRegUpdate(clipName);
        if (sta && sta.motion) {
            let _clip = sta.motion as engine.AnimationClip;
            let resId = _clip.resourceID;
            // let aData = wxAnimPlayer.clipTimeEventDic.get(resId);
            // needReg = aData != null;
            let availReg = this.animTimeEventNode.ckRegUpdate(wxAnimPlayer.animTimeEventHD, resId, this.id);
        }

        if (onPlayend) {
            this.addPlayEndFun(this.id, clipName, onPlayend, info);
        }
    }

    private clearPlayEndFuns() {
        let idMap = wxAnimPlayer.waitePlayEndMap[this.id];
        if (!idMap) { return; }

        for (let nodeID in idMap) {
            delete idMap[nodeID];
        }

        delete wxAnimPlayer.waitePlayEndMap[this.id];
    }
}