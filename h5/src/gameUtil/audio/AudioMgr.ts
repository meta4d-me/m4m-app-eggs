import { cMap } from "../Data/Map";
import { miniAPIType, miniGame } from "../Tools/miniGame";
import { H5AudioHandle } from "./H5AudioHandle";
import { WXAudioHandle } from "./WXAudioHandle";

/** 声音handle 接口 */
export interface IAudioHandle {
    /** 资源基础路径 */
    urlBasePath: string;
    /** 遍历所有 已经加载的音效 */
    forEach(fn: (resName: string) => void);
    /** 添加音效 */
    addAudio(resName: string);
    /** 移除 已经加载的音效*/
    removeAudio(resName: string);
    /** 获取音量 */
    getVolume(resName: string): number;
    /**设置单个音量 */
    setVolume(resName: string, volume: number);
    /** 播放指定音源 */
    play(resName: string, isloop?: boolean, volume?: number);
    /** 停止播放 */
    stop(resName: string);
    /**
     * 跳到指定进度位置
     * @param resName 
     * @param position 单位化（0-1）的进度位置
     */
    seek(resName: string, position: number);
    /**暂停 某个声音 */
    pause(resName: string);
    /**是否暂停或 播完了 */
    ispaused(resName: string): boolean;
    /**监听音频自然播放至结束的事件*/
    onEnded(fun: Function);
}

export class AudioMgr {
    private static _recordVolumeMap: cMap<number> = new cMap();
    /** 音频的基础路径 */
    private static _urlBasePath: string;
    //是否静音
    private static _isMute = false;
    /** 是否静音 */
    static get IsMute() { return this._isMute; }
    /** 音频 handle对象 */
    private static audioHandle: IAudioHandle;
    /**
     * 初始化
     * @param urlBasePath 音频的基础路径
     */
    public static init(urlBasePath: string) {
        this._urlBasePath = urlBasePath;
        switch (miniGame.miniType) {
            case miniAPIType.none: this.audioHandle = new H5AudioHandle(); break;
            case miniAPIType.wechat: this.audioHandle = new WXAudioHandle(); break;
            case miniAPIType.qq: this.audioHandle = new WXAudioHandle(); break;
            // case miniAPIType.oppo: this.audioHandle = new WXAudioHandle(); break;
            // case miniAPIType.vivo: this.audioHandle = new WXAudioHandle(); break;
            // case miniAPIType.tikTok: this.audioHandle = new WXAudioHandle(); break;
            default:
        }

        this.audioHandle.urlBasePath = this._urlBasePath;
    }

    /**
     * 静音操作
     * @param isMute 是否静音（true 静音 ，false 恢复之前播放音量） 
     */
    public static setMute(isMute: boolean) {
        this._isMute = isMute;
        let aHandle = this.audioHandle;
        let _map = this._recordVolumeMap;
        if (isMute) {
            //记录 现有音频的全部音量
            aHandle.forEach((resName) => {
                _map.set(resName, aHandle.getVolume(resName));
                aHandle.setVolume(resName, 0);
            });

        } else {
            //恢复到之前的音量
            aHandle.forEach((resName) => {
                let v = _map.get(resName);
                if (isNaN(v) || v == null) { v = 1; }
                aHandle.setVolume(resName, v);
            });

            _map.clear();
        }
    }

    //设置音量 特殊 处理 区分背影音乐和音效  以后改掉
    public static setSpecialVolume(volume: number, audioResList: string[], bgm: boolean) {
        let aHandle = this.audioHandle;
        //记录 现有音频的全部音量
        aHandle.forEach((resName) => {
            if (bgm && audioResList.indexOf(resName) != -1) {
                aHandle.setVolume(resName, volume);
            } else {
                aHandle.setVolume(resName, volume);
            }
        });
    }

    //设置音量
    public static setVolume(resName: string, volume: number): void {
        if (this._isMute) {
            this._recordVolumeMap[resName] = volume;
            return;
        }
        this.audioHandle.setVolume(resName, volume);
    }

    /** 播放指定音源 */
    public static Play(resName: string, isloop = false, volume = 1) {
        let v = volume;
        if (this._isMute) {
            this._recordVolumeMap[resName] = volume;
            v = 0;
        }
        this.audioHandle.play(resName, isloop, v);
    }

    /** 停止播放 */
    public static Stop(resName: string) {
        this.audioHandle.stop(resName);
    }

    /** 停播全部 */
    public static stopAll() {
        this.audioHandle.forEach((resName: string) => {
            this.audioHandle.stop(resName);
        });
    }

    /** 跳到指定进度位置 */
    public static Seek(resName: string, position: number) {
        this.audioHandle.seek(resName, position);
    }

    /** 暂停播放 */
    public static pause(resName: string) {
        this.audioHandle.pause(resName);
    }

    /**是否暂停或 播完了 */
    public static ispaused(resName: string): boolean {
        return this.audioHandle.ispaused(resName);
    }

    /** 删除销毁 音频 */
    public static removeAudio(resName: string) {
        this.audioHandle.removeAudio(resName);
    }

    /** 监听音频自然播放至结束的事件 */
    public static onEnded(fun: Function) {
        this.audioHandle.onEnded(fun);
    }
}