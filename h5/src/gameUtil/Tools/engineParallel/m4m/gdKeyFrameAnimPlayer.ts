import { FrameMgr } from "../../FrameMgr";
import { AnimTimeEventHandle, AnimTimeEventNode } from "../AnimTimeEventHandle";
import { m4mGO } from "../spGameObject";
import { spComponentType, ISpAnimPlayer, ISpAnimPlayerHandle } from "../spInterface";

/** m4m 关键帧差值非蒙皮动画组件 ISpAnimPlayer 封装  */
// tslint:disable-next-line: class-name
export class gdKeyFrameAnimPlayer implements ISpAnimPlayer, ISpAnimPlayerHandle {
    public id: string;
    public rawHandle: m4m.framework.keyFrameAniPlayer;
    public gameObject: m4mGO;
    public compType: spComponentType = spComponentType.animPlayer;
    constructor(raw: m4m.framework.keyFrameAniPlayer, go: m4mGO) {
        this.id = `${go.getID()}_${this.compType}`;
        this.rawHandle = raw;
        this.gameObject = go;
    }
    private static readonly suffix = ".keyframeAniclip.json";
    private static animTimeEventHD: AnimTimeEventHandle = new AnimTimeEventHandle();   //动画时间轴事件HD
    private static hasSetUpdate = false;

    private animTimeEventNode: AnimTimeEventNode = new AnimTimeEventNode(this);

    //ISpAnimPlayerHandle API
    public currClipTotalTime(): number {
        if (!this.rawHandle) { return 0; }
        let clip = this.rawHandle.getClip(this.rawHandle.currClipName);
        if (!clip) { return 0; }
        return clip.time;
    }

    public getCurrClipName(): string {
        if (!this.rawHandle) { return ""; }
        return this.rawHandle.currClipName;
    }
    public getClipTotalTime(simpleClipName: string): number {
        if (!this.rawHandle) { return 0; }
        let clip = this.rawHandle.getClip(simpleClipName);
        if (!clip) { return 0; }
        return clip.time;
    }
    public setCurrClipNormalizedTime(normalLizedTime: number) {
        if (!this.rawHandle) { return; }
        let clip = this.rawHandle.getClip(this.rawHandle.currClipName);
        if (!clip) { return; }
        return this.rawHandle["_nowTime"] = clip.time * normalLizedTime;
    }
    public getCurrClipNormalizedTime(): number {
        if (!this.rawHandle) { return 0; }
        let clip = this.rawHandle.getClip(this.rawHandle.currClipName);
        if (!clip) { return 0; }
        return this.rawHandle.nowTime / clip.time;
    }
    public isPlay(): boolean {
        if (!this.rawHandle) { return; }
        return this.rawHandle.isPlaying();
    }
    public hasClip(clipName: string) {
        if (!this.rawHandle) { return; }
        let clip = this.rawHandle.getClip(clipName);
        return clip != null;
    }
    public regTimeEventCallbackObj(eventActObj: object) {
        this.animTimeEventNode.regTimeEventCallbackObj(eventActObj);
    }
    public setTimeEvent(simpleClipName: string, timePoint: number, _actFunName: string, val: string) {
        let realClipName = `${simpleClipName}${gdKeyFrameAnimPlayer.suffix}`;
        this.animTimeEventNode.setTimeEvent(gdKeyFrameAnimPlayer.animTimeEventHD, realClipName, timePoint, _actFunName, val);
    }

    //ISpAnimPlayer API
    public stop() {
        this.rawHandle.stop();
    }

    public playAnimByName(clipName: string, onPlayend?: () => any, blendTime?: number, endframe?: number, speed?: number, beRevert?: boolean) {
        if (!clipName || !this.rawHandle) { return; }
        // this.rawHandle.playCross(clipName, blendTime, onPlayend, speed, beRevert);
        let _realClipName = `${clipName}${gdKeyFrameAnimPlayer.suffix}`;
        let clip = this.rawHandle.getClip(_realClipName);
        if (!clip) { return; }
        this.rawHandle.speed = speed;
        let endNormalizedTime = null;
        if (endframe != null && clip.frameCount) {
            let _endframe = endframe % clip.frameCount;
            endNormalizedTime = _endframe / clip.frameCount;
        }
        this.rawHandle.play(_realClipName, onPlayend, endNormalizedTime);

        //
        let id = this.rawHandle.gameObject.transform.insId.getInsID();
        let availReg = this.animTimeEventNode.ckRegUpdate(gdKeyFrameAnimPlayer.animTimeEventHD, _realClipName, id.toString());
        if (availReg) {
            gdKeyFrameAnimPlayer.activeUpdate();
        }
    }

    public dispose() {
        if (this.animTimeEventNode) { this.animTimeEventNode.dispose(); }
        this.rawHandle = null;
        this.gameObject = null;
        this.animTimeEventNode = null;
    }

    private static activeUpdate() {
        if (this.hasSetUpdate) { return; }
        this.hasSetUpdate = true;
        FrameMgr.Add(this.update, this);
    }

    private static update(dt: number) {
        let eventHD = gdKeyFrameAnimPlayer.animTimeEventHD;
        eventHD.updateDic.forEach((n) => {
            let p = n.playerObj as gdKeyFrameAnimPlayer;
            let ap = p.rawHandle;
            if (!ap) { return; }
            let clip = ap.getClip(ap.currClipName);
            if (!clip) { return; }
            let cName = clip.getName();
            n.ckTimeEventUpdate(eventHD, cName, p.rawHandle.nowTime, p.currClipTotalTime());
        });
    }

}