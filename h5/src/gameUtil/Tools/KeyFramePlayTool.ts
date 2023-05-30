import { FrameTimer } from "../Time/FrameTimer";
/** 关键帧数据 */
type kfData = [number, number];
/**  关键帧 回调函数，会在生命周期内 每帧回调一次 */
type kfCallBack = (/** 值 */value: number, /** 是否结束 */isEnd: boolean) => any;

class KFPool {
    public static _isInPool = "__isInPool__";
    public static _poolArr: KFPlayer[] = [];
    public static new_Obj(): KFPlayer {
        let result: KFPlayer;
        result = this._poolArr.pop();
        if (!result) {
            result = new KFPlayer();
        }
        delete result[this._isInPool];
        return result;
    }

    public static delete_Obj(player: KFPlayer) {
        if (player || player[this._isInPool]) { return; }
        player.reset();
        player[this._isInPool] = true;
        this._poolArr.push(player);
    }
}

class KFPlayer {
    private _keyFrameData: kfData[];
    private _callback: kfCallBack;
    private _currIndex: number = 0;
    private _playTime: number = 0;
    private _timeID: number = -1;
    public setData(keyFrameData: kfData[], callback: kfCallBack) {
        this._keyFrameData = keyFrameData;
        this._callback = callback;
        this.playKeyFrame();
        this.ckTimeOver(0, false);//先跑一次
    }

    public reset() {
        this.stop();
        this._currIndex = this._playTime = 0;
        this._keyFrameData = null;
        this._callback = null;
        this._timeID = -1;
    }

    public stop() {
        FrameTimer.Instance.stop(this._timeID);
    }

    private ckTimeOver(delat: number, isEnd: boolean) {
        let _pt = this._playTime += delat;
        let kfd = this._keyFrameData;
        if (!isEnd) {
            let _from = kfd[this._currIndex];
            let _to = kfd[this._currIndex + 1];
            let rate = (_pt - _from[0]) / (_to[0] - _from[0]);
            let linerVal = m4m.math.numberLerp(_from[1], _to[1], rate);    // 计算线性差值
            this._callback(linerVal, false);
        } else {
            this._currIndex++;
            let _isEnd = this._currIndex >= kfd.length - 1;
            this._callback(kfd[this._currIndex][1], _isEnd);
            if (_isEnd) { return; }    //所有帧都播完了
            //下一帧
            this.playKeyFrame();
        }
    }

    /** 从当前帧播放 */
    private playKeyFrame() {
        let kfd = this._keyFrameData;
        let currIdx = this._currIndex;
        let nextIdx = currIdx + 1;
        let timeLen = kfd[nextIdx][0] - kfd[currIdx][0];
        this._timeID = FrameTimer.Instance.once(timeLen, this.ckTimeOver.bind(this));
    }
}

/**
 * 关键帧 播放工具
 */
export class KeyFramePlayTool {
    private static _playIDCount = 0;
    private static _playIdMap: { [playId: number]: KFPlayer } = {};

    /**
     * 播放线性关键帧
     * @param keyFrameData 关键帧数据数组 (kfData : [时间点,数值])
     * @param callback 回调函数
     * @returns 播放ID
     */
    public static playLinear(keyFrameData: kfData[], callback: kfCallBack): number {
        if (!keyFrameData || !callback || keyFrameData.length < 2) { return -1; }
        this._playIDCount++;
        let result = this._playIDCount;
        let _p = KFPool.new_Obj();
        this._playIdMap[result] = _p;
        _p.setData(keyFrameData, (dt: number, isEnd: boolean) => {
            callback(dt, isEnd);
            if (isEnd) {
                this.stop(result);
            }
        });
        return result;
    }

    /**
     * 停止播放
     * @param playId 播放ID 
     */
    public static stop(playId: number) {
        let _kfp = this._playIdMap[playId];
        if (!_kfp) { return; }
        KFPool.delete_Obj(_kfp);
        delete this._playIdMap[playId];
    }

    private static test() {
        let count = 0;
        FrameTimer.Instance.once(5, (dt, isend) => {
            count += dt;
            console.log(`********** dt:${dt} , isend : ${isend} `);
        });
    }
}