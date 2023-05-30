import { cMap } from "../Data/Map";
import { miniGame } from "../Tools/miniGame";
import { IAudioHandle } from "./AudioMgr";

/**
 * 微信 声音handle
 */
export class WXAudioHandle implements IAudioHandle {
    public urlBasePath: string = "";
    private audioContextMap: cMap<any> = new cMap();
    private onEndedCallBackFun: Function;
    public onEnded(fun: Function) {
        //
        this.onEndedCallBackFun = fun;
    }

    public removeAudio(resName: string) {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        _context.onError = null;
        _context.onEnded = null;
        _context.destroy();
        this.audioContextMap.delete(resName);
    }

    public forEach(fn: (resName: string) => void) {
        if (!fn) { return; }
        this.audioContextMap.forEach((val, key) => {
            fn(key as string);
        });
    }

    public addAudio(resName: string): boolean {
        let resUrl = `${this.urlBasePath}${resName}`;
        let _context = this.audioContextMap.get(resName);
        if (_context) { return false; }
        _context = miniGame.createInnerAudioContext();
        this.audioContextMap.set(resName, _context);
        _context.src = resUrl;
        _context.onError((res) => {
            console.error(`音频 :${resName} , errCode : ${res.errMsg} , errMsg : ${res.errCode}`);
        });
        _context.onEnded((res) => {
            if (this.onEndedCallBackFun) {
                this.onEndedCallBackFun(resName);
            }
        });
        return true;
    }

    public getVolume(resName: string): number {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return NaN; }
        return _context.volume;
    }

    public setVolume(resName: string, volume: number) {
        let _context = this.audioContextMap.get(resName);
        if (!_context || isNaN(volume)) { return; }
        _context.volume = volume;
    }

    public play(resName: string, isloop?: boolean, volume?: number) {
        let isNew = this.addAudio(resName);
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        if (isNew) {
            // tslint:disable-next-line: no-parameter-reassignment
            isloop = isloop == null ? false : isloop;
            // tslint:disable-next-line: no-parameter-reassignment
            volume = volume == null ? 1 : volume;
        }
        if (isloop != null) {
            _context.loop = isloop;
        }
        if (!isNaN(volume)) {
            _context.volume = volume;
        }
        _context.play();
    }

    public seek(resName: string, position: number) {
        let _context = this.audioContextMap.get(resName);
        if (!_context || isNaN(position)) { return; }
        _context.seek(position);
    }

    public stop(resName: string) {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        _context.stop();
    }

    public pause(resName: string) {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        _context.pause();
    }

    public ispaused(resName: string): boolean {
        let _context = this.audioContextMap.get(resName);
        if (!_context) { return; }
        return _context.paused;
    }

}