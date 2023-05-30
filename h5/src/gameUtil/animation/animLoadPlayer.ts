import { cMap } from "../Data/Map";
import { AnimTimeEventHandle, AnimTimeEventNode } from "../Tools/engineParallel/AnimTimeEventHandle";
import { ISpAnimPlayerHandle } from "../Tools/engineParallel/spInterface";
import { FrameMgr } from "../Tools/FrameMgr";
type animTimeData = { [time: number]: { actFunName: string, value: any } };
/** 动画加载播放控制组件 */
export class AnimLoadPlayer implements ISpAnimPlayerHandle {

    /** 清理字典容器中指定url的数据  */
    public static clearDic(url: string) {
        this.animClipDic.delete(url);
        this.clipLoadingDic.delete(url);
        this.clipWaitLoadDic.delete(url);
    }

    /** 已经加载所有 动画片段 */
    get isLoadedAll() { return this._isLoadedAll; }

    /** 通过aniplayer 组件获取 clipnames  */
    public static getClipNames(aplayer: m4m.framework.aniplayer, outClipNames: string[], cutString: string = "") {
        if (!aplayer || !outClipNames) { return; }
        outClipNames.length = 0;
        if (!aplayer.clips) { return; }
        aplayer.clips.forEach((clip) => {
            if (clip) {
                let fname = clip.getName();
                let idx = fname.indexOf(".FBAni.aniclip.bin");
                fname = fname.substr(0, idx);
                if (cutString) {
                    fname = fname.replace(cutString, "");
                }
                outClipNames.push(fname);
            }
        });
    }

    private static activeUpdate() {
        if (this.hasSetUpdate) { return; }
        this.hasSetUpdate = true;
        FrameMgr.Add(this.update, this);
    }

    private static update(dt: number) {
        let eventHD = AnimLoadPlayer.animTimeEventHD;
        eventHD.updateDic.forEach((n) => {
            let p = n.playerObj as AnimLoadPlayer;
            let ap = p.aplayer;
            if (!ap) { return; }
            let clip = ap.currentAniclip;
            if (!clip) { return; }
            let cName = clip.getName();
            n.ckTimeEventUpdate(eventHD, cName, p.getCurrClipTime(), p.currClipTotalTime());
        });
    }

    public static extendCreatClipOption: { matchStr: string, attachSuffix: string, creatFun(url: string): Promise<m4m.framework.animationClip>; };
    public aplayer: m4m.framework.aniplayer;
    public onLoadedClips: (ap: AnimLoadPlayer) => any;
    /**
     * 动画加载播放控制组件
     * @param prefabName 预设体资源名
     * @param clips 需要加载的动画片段列表
     * @param aplayer 引擎 aniplayer 组件实例
     * @param loadPath 加载文件路径
     */
    constructor(prefabName: string, clips: string[], aplayer: m4m.framework.aniplayer, loadPath: string = "", outUrls: string[] = null) {
        this.prefabName = prefabName;
        let urls: string[] = [];
        clips.forEach((_c, idx) => {
            let clip = _c;
            clip = clip.replace(`${prefabName}_`, "");
            this.clipNameMap.set(clip, idx);
            clip = clip.lastIndexOf(AnimLoadPlayer.suffix) == -1 ? clip + AnimLoadPlayer.suffix : clip;
            let str = clip.indexOf(`${this.prefabName}_`) != -1 ? clip : `${this.prefabName}_${clip}`;
            this.clips.push(str);
            urls.push(`${loadPath}${this.prefabName}/resources/${clip}`);
            if (outUrls) { //向外复制
                urls.forEach((v) => {
                    outUrls.push(v);
                });
            }
        });
        this.aplayer = aplayer;
        if (!prefabName || !clips || !aplayer) {
            let info = !prefabName ? `prefabName` : !clips ? `clips` : `aplayer`;
            console.warn(`animLoadPlayer 构造参数异常 , ${info} 为空 !`);
            return;
        }
        this.loadAnims(urls);
    }
    private static readonly suffix = ".FBAni.aniclip.bin";
    private static animTimeEventHD: AnimTimeEventHandle = new AnimTimeEventHandle();   //动画时间轴事件HD
    private static animClipDic: cMap<m4m.framework.animationClip> = new cMap(); //已经加载完毕的clip 集合
    private static clipLoadingDic: cMap<boolean> = new cMap(); //加载中的集合
    private static clipWaitLoadDic: cMap<Function[]> = new cMap();  //等待加载完回调的 集合
    private static hasSetUpdate = false;
    private animTimeEventNode: AnimTimeEventNode = new AnimTimeEventNode(this);
    private lastWaitIdx = -1;
    private lastwaitOnPlayend: any = null;
    private lastBlendTime = 0;
    private lastEndframe = 0;
    private lastSpeed = 1;
    private lastbeRevert = false;
    private prefabName: string;
    private clips: string[] = [];
    private clipNameMap: cMap<number> = new cMap();
    private loadLen = 0;
    private loadingCount = 0;
    private _isLoadedAll = false;
    public getCurrClipName(): string {
        if (!this.aplayer || !this.aplayer.currentAniclip) { return ""; }
        return this.aplayer.currentAniclipName;
    }

    public currClipTotalTime(): number {
        if (!this.aplayer || !this.aplayer.currentAniclip) { return 0; }
        let clip = this.aplayer.currentAniclip;
        return clip.frameCount / clip.fps;
    }
    public getClipTotalTime(simpleClipName: string) {
        if (!this.aplayer) {
            console.error(`player 为空`);
            return 0;
        }
        let realClipName = `${this.prefabName}_${simpleClipName}${AnimLoadPlayer.suffix}`;
        let clip = this.aplayer.getClip(realClipName);
        if (!clip) {
            console.warn(`player 中没找到 clip${realClipName} `);
            return 0;
        }
        return clip.frameCount / clip.fps;
    }
    public getCurrClipNormalizedTime(): number {
        let ap = this.aplayer;
        if (!ap) { return 0; }
        let clip = ap.currentAniclip;
        if (!clip) { return 0; }
        return ap.PlayFrameID / clip.frameCount;
    }
    public setCurrClipNormalizedTime(normalLizedTime: number) {
        if (!this.aplayer) { return; }
        this.aplayer["_playTimer"] = this.currClipTotalTime() * normalLizedTime;
    }
    public isPlay(): boolean {
        if (!this.aplayer) { return false; }
        return this.aplayer.isPlay();
    }
    public stop() {
        if (!this.aplayer) { return; }
        this.aplayer.stop();
    }

    /** 播放动画通过 传入的clip索引 */
    public playAnimByIdx(idx: number, onPlayend: () => any = null, blendTime = 0, endframe = 0, speed = 1, beRevert = false) {
        if (!this._isLoadedAll) {
            this.lastWaitIdx = idx;
            this.lastwaitOnPlayend = onPlayend;
            this.lastBlendTime = blendTime;
            this.lastEndframe = endframe;
            this.lastSpeed = speed;
            this.lastbeRevert = beRevert;
            return;
        }
        let str = this.clips[idx];
        if (!str) {
            console.warn(`索引 [${idx}] 播放失败 : 未找到对应animtionClip `);
            return;
        }
        if (endframe != 0) {
            this.aplayer.playToXFrame(str, endframe, blendTime, onPlayend, speed);
        } else {
            if (blendTime == 0) {
                this.aplayer.play(str, onPlayend, speed, beRevert);
            } else {
                this.aplayer.playCross(str, blendTime, onPlayend, speed, beRevert);
            }
        }
        //检查 upadte 注册
        // this.ckRegUpdate(str);
        let id = this.aplayer.gameObject.transform.insId.getInsID();
        let availReg = this.animTimeEventNode.ckRegUpdate(AnimLoadPlayer.animTimeEventHD, str, id.toString());
        if (availReg) {
            AnimLoadPlayer.activeUpdate();
        }

        //
        if (this.onLoadedClips) {
            this.onLoadedClips(this);
            this.onLoadedClips = null;
        }
    }

    /** 播放动画通过 clip 名 */
    public playAnimByName(simpleClipName: string, onPlayend: () => any = null, blendTime = 0, endframe = 0, speed = 1, beRevert = false) {

        let _realClipName = `${simpleClipName}${AnimLoadPlayer.suffix}`;
        if (!simpleClipName || !this.clipNameMap.has(_realClipName)) {
            console.warn(` 动画片段[${_realClipName}]播放失败 : 未找到对应animtionClip `);
            return;
        }
        //console.error(`m4mAnimPlayer.playAnimByName ${clipName}`);
        let index: number = this.clipNameMap.get(_realClipName);
        if (index == undefined) {
            console.error("取到的动画片断所引出错！！！！    " + _realClipName);
        }
        this.playAnimByIdx(index, onPlayend, blendTime, endframe, speed, beRevert);
    }
    /** 停止播放 的动画 */
    public stopAnim() {
        this.aplayer.stop();
    }

    /** 是否有 clipName 动画*/
    public hasClip(simpleClipName: string) {
        let _realClipName = `${simpleClipName}${AnimLoadPlayer.suffix}`;
        return this.clipNameMap.has(_realClipName);
    }

    public dispose() {
        if (this.animTimeEventNode) { this.animTimeEventNode.dispose(); }
        this.aplayer = null;
        this.lastwaitOnPlayend = null;
        this.animTimeEventNode = null;
    }

    public regTimeEventCallbackObj(eventActObj: object) {
        this.animTimeEventNode.regTimeEventCallbackObj(eventActObj);
    }

    public setTimeEvent(simpleClipName: string, timePoint: number, _actFunName: string, val: string) {
        let realClipName = `${simpleClipName}${AnimLoadPlayer.suffix}`;
        this.animTimeEventNode.setTimeEvent(AnimLoadPlayer.animTimeEventHD, realClipName, timePoint, _actFunName, val);
    }

    private getIsExtend(url: string) {
        let cOpt = AnimLoadPlayer.extendCreatClipOption;
        return cOpt && cOpt.matchStr && cOpt.creatFun && url.indexOf(cOpt.matchStr) != -1;
    }

    private loadAnims(urls: string[]) {
        this.loadLen = urls.length;
        urls.forEach((url, idx) => {
            let animClipName = this.clips[idx];
            let cOpt = AnimLoadPlayer.extendCreatClipOption;
            let isExtend = this.getIsExtend(url);
            let realUrl = isExtend ? url + cOpt.attachSuffix : url;
            if (!AnimLoadPlayer.animClipDic.has(animClipName) && url) {
                this.doLoad(realUrl, animClipName);
            } else {
                this.onloadOne(realUrl);
            }
        });
    }

    private doLoad(url: string, animClipName: string) {
        if (!AnimLoadPlayer.clipLoadingDic.has(url)) {  //检查是否在加载中
            AnimLoadPlayer.clipLoadingDic.set(url, true);
            let cOpt = AnimLoadPlayer.extendCreatClipOption;
            // if(cOpt && cOpt.matchStr && cOpt.creatFun && url.indexOf("/TESTAsset/") != -1){
            if (this.getIsExtend(url)) {
                //使用拓展 创建 方式 
                return cOpt.creatFun(url)
                    .then((_clip) => {
                        if (_clip) {
                            _clip["name"].name = animClipName;
                            AnimLoadPlayer.animClipDic.set(animClipName, _clip);
                        }
                        this.onloadOne(url);
                        this.doWaitLoadFun(url);
                    });
                // tslint:disable-next-line: unnecessary-else
            } else {
                m4m.io.loadArrayBuffer(url, (_buffer, _err, islfail) => {
                    if (_err) {
                        console.error(_err);
                        return;
                    }
                    let _clip = new m4m.framework.animationClip(animClipName);
                    AnimLoadPlayer.animClipDic.set(animClipName, _clip);
                    // AssetFactoryTools.useAsset(assetMgr, onstate, state, _clip, url);
                    return _clip.Parse(_buffer)
                        .then(() => {
                            this.onloadOne(url);
                            this.doWaitLoadFun(url);
                        });
                }, null);
            }
        } else {
            let arr = AnimLoadPlayer.clipWaitLoadDic.get(url);
            if (!arr) {
                arr = [];
                AnimLoadPlayer.clipWaitLoadDic.set(url, arr);
            }
            arr.push(this.onloadOne.bind(this));
        }
    }

    private doWaitLoadFun(url: string) {
        let arr = AnimLoadPlayer.clipWaitLoadDic.get(url);
        if (!arr) { return; }
        arr.forEach((fun) => {
            if (fun) { fun(url); }
        });

        //清理
        arr.length = 0;
        AnimLoadPlayer.clipLoadingDic.delete(url);
    }

    private onloadOne(url: string) {
        if (this._isLoadedAll || this.aplayer == null) { return; }

        let clipname: string;
        for (let i = 0; i < this.clips.length; i++) {
            let cut = "/" + this.clips[i].slice(this.prefabName.length + 1, this.clips[i].length);
            if (url.indexOf(cut) != -1) {
                clipname = this.clips[i];
                break;
            }
        }
        this.loadingCount++;
        //add to player 
        if (AnimLoadPlayer.animClipDic.has(clipname)) {
            if (this.aplayer) {
                let aniClip = AnimLoadPlayer.animClipDic.get(clipname) as m4m.framework.animationClip;
                this.aplayer.addClip(aniClip);
            } else {
                console.error("错误！！！！！！！！    动作组件为null");
                return;
            }
        }
        if (this.loadingCount >= this.loadLen) {
            this._isLoadedAll = true;
            if (this.lastWaitIdx != -1) {
                if (this.lastWaitIdx == undefined) {
                    console.error("lastWaitIdx 取到的动画片断所引出错！！！！    " + clipname);
                }
                this.playAnimByIdx(this.lastWaitIdx, this.lastwaitOnPlayend, this.lastBlendTime,
                    this.lastEndframe, this.lastSpeed, this.lastbeRevert);
            } else {
                if (this.onLoadedClips) {
                    this.onLoadedClips(this);
                    this.onLoadedClips = null;
                }
            }
        }
    }

    /**
     * 获取 当前在播放动画到的时间点
     */
    private getCurrClipTime(): number {
        let ap = this.aplayer;
        if (!ap) { return 0; }
        let clip = ap.currentAniclip;
        if (!clip) { return 0; }
        return ap.PlayFrameID / clip.fps;
    }
}