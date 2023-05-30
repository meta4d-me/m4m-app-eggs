import { cMap } from "src/gameUtil/Data/Map";
import { IDispose } from "./spInterface";

type animTimeData = { [time: number]: { actFunName: string, value: any } };

/**
 * 动画时间轴事件控制器
 */
export class AnimTimeEventHandle {

    public clipTimeEventDic: cMap<animTimeData> = new cMap();  //动画片段时间轴事件 [key:clipName , value: animTimeData]
    public updateDic: cMap<AnimTimeEventNode> = new cMap();    //注册update的 node

    /** 注册update */
    public regUpdata(p: AnimTimeEventNode, nodeID: string): boolean {
        if (!p) { return false; }
        this.updateDic.set(nodeID, p);
        // this.activeUpdate();
        return true;
    }

    /** 注销update */
    public unregUpdate(p: AnimTimeEventNode, nodeID: string) {
        if (!p) { return; }
        this.updateDic.delete(nodeID);
    }
}

export class AnimTimeEventNode implements IDispose {
    constructor(playerObj) {
        this._playerObj = playerObj;
    }
    private _currHasTimeEvent: boolean = false;
    private _lastTimeEvnetPoint: number = 0;
    private _timeEventActObj: object;
    private _playerObj: Object;

    public dispose() {
        this._playerObj = null;
        this._timeEventActObj = null;
    }

    public get playerObj() { return this._playerObj; }

    /**
    * 注册 动画时间轴事件 回调响应对象
    * @param eventActObj      动画时间事件 回调触发对象
    */
    public regTimeEventCallbackObj(eventActObj: object) {
        this._timeEventActObj = eventActObj;
    }

    /**
     * 设置 动画时间轴事件 参数
     * @param simpleClipName    动画片段名 
     * @param timePoint         事件时间点
     * @param _actFunName       行为方法名
     * @param val               事件传递的参数
     */
    public setTimeEvent(handel: AnimTimeEventHandle, clipName: string, timePoint: number, _actFunName: string, val: string) {
        let _c = handel.clipTimeEventDic.get(clipName);
        if (!_c) {
            _c = {};
            handel.clipTimeEventDic.set(clipName, _c);
        }

        let key = `${timePoint}`;
        if (!_c[key]) {
            _c[key] = {} as any;
        }
        _c[key] = { actFunName: _actFunName, value: val };
    }

    /**
     * 检查clip是否需要注册
     * @param handel 
     * @param clipName  片段名 
     * @param nodeID    动画播放器节点ID
     */
    public ckRegUpdate(handel: AnimTimeEventHandle, clipName: string, nodeID: string): boolean {
        //重置计时
        this._lastTimeEvnetPoint = 0;
        //检查 是否需要注册 update监听
        let aData = handel.clipTimeEventDic.get(clipName);
        let needReg = aData != null && this._timeEventActObj != null;
        let availReg = false;
        if (needReg) {
            availReg = handel.regUpdata(this, nodeID);
            this._currHasTimeEvent = true;
        } else {
            handel.unregUpdate(this, nodeID);
            this._currHasTimeEvent = false;
        }
        //
        return availReg;
    }

    /**
     * 检查 时间轴事件update 检测
     * @param handel 
     * @param clipName 
     * @param currClipTime 当前片段的播放时间
     * @param currClipTotalTime 当前片段的总播放时长
     * @returns 
     */
    public ckTimeEventUpdate(handel: AnimTimeEventHandle, clipName: string, currClipTime: number, currClipTotalTime: number) {
        if (!this._currHasTimeEvent || !this._timeEventActObj) { return; }
        // let ap = this.aplayer;
        // if (!ap) { return; }
        // let clip = ap.currentAniclip;
        // if (!clip) { return; }
        // let cName = clip.getName();

        let adata = handel.clipTimeEventDic.get(clipName);
        if (!adata) {
            this._currHasTimeEvent = false;
            return;
        }

        //检查当前帧
        let lastTime: number = this._lastTimeEvnetPoint;
        let currTime: number = currClipTime;
        let isBackRound = lastTime > currTime;
        //区间判断
        if (isBackRound) {
            this.ckTimeEventRange(lastTime, currClipTotalTime, adata);
            lastTime = 0;
        }
        this.ckTimeEventRange(lastTime, currTime, adata);

        this._lastTimeEvnetPoint = currTime;
    }

    /** 检查 时间轴事件通过范围 */
    private ckTimeEventRange(left: number, right: number, _data: animTimeData) {
        //检查当前帧
        //区间判断
        for (let time in _data) {
            let _t = Number(time);
            let temp = _data[time];
            if (_t >= left && _t < right) {
                let fun = this._timeEventActObj[temp.actFunName] as Function;
                if (fun) {
                    fun.call(this._timeEventActObj, temp.value);//触发回调函数
                }
            }
        }
    }
}