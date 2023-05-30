import { cMap } from "../Data/Map";
import { TimeUtil } from "../Time/TimeUtil";
import { PlatformUtil } from "../Tools/PlatformUtil";
import { IAudioHandle } from "./AudioMgr";

// tslint:disable-next-line: class-name
class audioEventer extends m4m.AEvent {

}

/**
 * html5 环境 音频handle
 */
export class H5AudioHandle implements IAudioHandle {
    public urlBasePath: string;
    private static readonly ON_LOAD_BUFFER = "onLoadBuffer";
    private _eventer: audioEventer = new audioEventer();
    private audioContextMap: cMap<m4m.framework.AudioChannel> = new cMap();
    //需要清理声源  可设置清理方法
    private audioBufferMap: cMap<AudioBuffer> = new cMap();
    private _pauseMap: cMap<number> = new cMap();
    private _startTimeMap: cMap<number> = new cMap();
    private onEndedCallBackFun: Function;

    // tslint:disable-next-line: member-ordering
    constructor() {
        if (PlatformUtil.isIPhoneX) {
            m4m.framework.AudioEx.instance()
                .clickInit();
        }
    }
    public onEnded(fun: Function) {
        this.onEndedCallBackFun = fun;
    }

    //清除某个声音资源
    public clearAudioBuffer(resName: string) {
        let url = `${this.urlBasePath}${resName}`;
        // this.audioBufferMap.delete();
    }

    public loadAudioBuffer(resName: string, fun: (buf: AudioBuffer, _err: Error) => void): void {
        let url = `${this.urlBasePath}${resName}`;
        if (this.audioBufferMap.has(url)) {
            let buff = this.audioBufferMap.get(url);
            fun(buff, null);
        } else {
            m4m.io.loadArrayBuffer(url, (_buf, _err, isFail) => {
                if (_err || isFail) {
                    fun(null, _err);
                    console.error(`加载 audioBuffer error ： ${_err}`);
                } else {
                    m4m.framework.AudioEx.instance().audioContext
                        .decodeAudioData(_buf, (audiobuffer) => {
                            this.audioBufferMap.set(url, audiobuffer);
                            fun(audiobuffer, null);
                        },
                        );
                }
            });
        }
    }
    public forEach(fn: (resName: string) => void) {
        if (!fn) { return; }
        this.audioContextMap.forEach((val, key) => {
            fn(key as string);
        });
    }
    public addAudio(resName: string) {
        let _context = this.audioContextMap.get(resName);
        if (_context) {
            this.stop(resName);
        }
        _context = m4m.framework.AudioEx.instance()
            .createAudioChannel(false);
        this.audioContextMap.set(resName, _context);

        //查看是否有缓存
        this.loadAudioBuffer(resName, (buf, _err) => {
            let contextObj = this.audioContextMap.get(resName);
            if (!contextObj || !contextObj.source) { return; }
            if (_err) {
                console.error(`加载Audio buffer失败 ERROR： ${_err}`);
                return;
            }
            // console.error(contextObj.source.buffer);
            if (contextObj.source.buffer == null) {
                contextObj.source.buffer = buf;
            }
            this.audioContextMap.set(resName, contextObj);
            this._eventer.Emit(H5AudioHandle.ON_LOAD_BUFFER, resName);
        });
        return true;
    }
    public removeAudio(resName: string) {
        this.stop(resName);
    }
    public getVolume(resName: string): number {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return NaN; }
        return _context.volume;
    }
    public setVolume(resName: string, volume: number) {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        _context.volume = volume;
    }
    public play(resName: string, isloop?: boolean, volume?: number) {
        let _context = this.audioContextMap.get(resName);
        if (_context) {
            //有在播放的先停掉
            this.stop(resName);
        }
        let isNew = this.addAudio(resName);
        _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        if (isNew) {
            // tslint:disable-next-line: no-parameter-reassignment
            isloop = isloop == null ? false : isloop;
            // tslint:disable-next-line: no-parameter-reassignment
            volume = volume == null ? 1 : volume;
        }
        if (isloop != null) {
            _context.source.loop = isloop;
        }
        if (volume != null) {
            _context.volume = volume;
        }
        let pMap = this._pauseMap;
        if (pMap.has(resName)) {
            //有暂停的
            _context.source.loop = isloop;
            _context.volume = volume;
            this.seek(resName, pMap.get(resName));
            pMap.delete(resName);
            return;
        }
        //记录 开始播放时间
        let stMap = this._startTimeMap;
        //
        let playFun = () => {
            if (_context && _context.source && _context.source.start) {
                // console.error("开始播声音 **START ", TimeUtil.realtimeSinceStartup);
                _context.source.start(0);
            }
            if (_context) {
                _context.isplay = true;
            }
            this.regAudioPlayEnd(resName);
            stMap.set(resName, TimeUtil.time);
        };
        let buf = _context.source.buffer;
        if (buf) {
            playFun();
        } else {
            let pObj = {
                pFun: () => {
                    playFun();
                    this._eventer.RemoveListener(H5AudioHandle.ON_LOAD_BUFFER, pObj.pFun, pObj);
                },
            };
            this._eventer.On(H5AudioHandle.ON_LOAD_BUFFER, pObj.pFun, pObj);
        }
    }
    public stop(resName: string) {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        if (_context.source) {
            _context.source.onended = null;
        }
        if (_context.isplay) {
            _context.stop();
        }
        _context.isplay = false;
        this.disposeAudioChannel(_context);
        this._pauseMap.delete(resName);
        this._startTimeMap.delete(resName);
        this.audioContextMap.delete(resName);
    }
    public seek(resName: string, position: number) {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        let volume = 1;
        if (volume != null) { volume = _context.volume; }
        let isloop = false;
        if (_context.source != null) { isloop = _context.source.loop; }
        //有在播放的先停掉
        this.stop(resName);

        this.addAudio(resName);
        _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        let buf = _context.source.buffer;
        let stMap = this._startTimeMap;
        let pMap = this._pauseMap;
        let playFun = (_buf) => {
            let pos = position < 0 ? 0 : position;
            pos %= _buf.duration;
            _context.volume = volume;
            _context.source.loop = isloop;
            _context.source.start(0, pos);
            _context.isplay = true;
            this.regAudioPlayEnd(resName);
            stMap.set(resName, TimeUtil.time - position * 1000);
            pMap.delete(resName);
        };
        if (buf) {
            playFun(buf);
        } else {
            let pObj = {
                pFun: () => {
                    playFun(_context.source.buffer);
                    this._eventer.RemoveListener(H5AudioHandle.ON_LOAD_BUFFER, pObj.pFun, pObj);
                },
            };
            this._eventer.On(H5AudioHandle.ON_LOAD_BUFFER, pObj.pFun, pObj);
        }

    }
    public pause(resName: string) {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        let stMap = this._startTimeMap;
        let startTime = stMap.has(resName) ? stMap.get(resName) : TimeUtil.time;
        let dtTime = (TimeUtil.time - startTime) * 0.001;
        this._pauseMap.set(resName, dtTime);
        //
        if (_context.isplay) {
            _context.stop();
        }
        this.disposeAudioChannel(_context);
        this.audioContextMap.delete(resName);
    }
    public ispaused(resName: string): boolean {
        let _pMap = this._pauseMap;
        return _pMap.has(resName);
    }

    private disposeAudioChannel(_context: m4m.framework.AudioChannel) {
        if (!_context) { return; }
        if (_context.source) {
            _context.source.buffer = null;
            _context.source.disconnect();
        }
        if (_context.gainNode) {
            _context.gainNode.disconnect();
        }
        if (_context.pannerNode) {
            _context.pannerNode.disconnect();
            _context.pannerNode = null;
        }
        _context.source = null;
        _context.gainNode = null;
    }

    private regAudioPlayEnd(resName: string) {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        let source = _context.source;
        source.onended = () => {
            this.stop(resName);
            if (this.onEndedCallBackFun) {
                this.onEndedCallBackFun(resName);
            }
        };
    }

}