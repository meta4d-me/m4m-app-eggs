import { GameMgr } from "./GameMgr";
import { wxTool } from "./Tool/wxTool";

export class AudioMgr {
    //---- 使用的资源
    static readonly ball: string = "ball.mp3";
    static readonly boost: string = "boost.mp3";
    static readonly character: string = "character.mp3";
    static readonly environment: string = "environment.mp3";
    static readonly touch: string = "touch.mp3";
    static readonly gold: string = "gold.mp3";
    //按钮声音
    static readonly btMusic: string = "touch.mp3";

    //----
    private static _isoff = false;
    static get IsOff() { return this._isoff; }; //是否静音
    // static sound: boolean = true;
    // static music: boolean = true;

    private static bgm_volume = 0.5; //背景音音量
    private static bgPlayer: m4m.framework.AudioPlayer;//bgm player
    private static res: { [resname: string]: AudioBuffer } = {};
    private static wxRes: { [resname: string]: any } = {}; //wxAudioContexts
    static init() {
        this._isoff = !GameMgr.swSound;

        // let bgmUrl = `${GameMgr.audioPath}bgm.mp3`;
        if (wxTool.wx) {
            // bgmUrl = m4m["CNDURL"] + bgmUrl;
            // let innerAudioContext = wxTool.wx.createInnerAudioContext();
            // //innerAudioContext.autoplay = true
            // innerAudioContext.src = bgmUrl;
            // this.wxRes[this.bgmTag] = innerAudioContext;
        }
        else {
            let sce = m4m.framework.sceneMgr.scene;
            let listener = sce.mainCamera.gameObject.addComponent("AudioListener") as m4m.framework.AudioListener;
            let tr = new m4m.framework.transform();
            sce.addChild(tr);
            this.bgPlayer = tr.gameObject.addComponent("AudioPlayer") as m4m.framework.AudioPlayer;
            this.bgPlayer.be3DSound = false;

            // //注册
            // m4m.framework.AudioEx.instance().loadAudioBuffer(bgmUrl, (buf, err) =>
            // {
            //     this.res[this.bgmTag] = buf;
            // });
        }
    }

    //添加音效
    private static ckAddAudio(resName: string, cliecbind: Function) {
        if (wxTool.wx) {
            let resUrl = `${GameMgr.CDNURL}${GameMgr.audioPath}${resName}`;
            if (this.wxRes[resName]) return;
            let innerAudioContext = wxTool.wx.createInnerAudioContext();
            //innerAudioContext.autoplay = true
            innerAudioContext.src = resUrl;
            this.wxRes[resName] = innerAudioContext;
        }
        else {
            if (this.res[resName]) { cliecbind(); return; }
            let resUrl = `${GameMgr.audioPath}${resName}`;
            //注册
            m4m.framework.AudioEx.instance().loadAudioBuffer(resUrl, (buf, err) => {
                this.res[resName] = buf;
                if (cliecbind) {
                    cliecbind();
                }
            });
        }
    }

    //静音操作
    static setMute(mute: boolean) {
        this._isoff = mute;
        let v = 0;
        if (!mute) {
            v = this.bgm_volume;
        }

        if (wxTool.wx) {
            for (let key in this.wxRes) {
                if (this.wxRes[key]) {
                    this.wxRes[key].volume = v;
                }
            }
        }
        else {
            if (this.bgPlayer)
                this.bgPlayer.volume = v;
        }
    }

    /** 播放指定音源 */
    static Play(resName = "", isloop = false) {
        this.ckAddAudio(resName, () => {
            let v = this.IsOff ? 0 : this.bgm_volume;
            if (wxTool.wx) {  //微信模式
                if (this.wxRes[resName]) {
                    this.wxRes[resName].loop = isloop;
                    this.wxRes[resName].volume = v;
                    if (v != 0) {
                        this.wxRes[resName].play();
                    }
                }
            }
            else {
                if (resName == "" || !this.res[resName]) return;
                console.log(resName, isloop)
                this.bgPlayer.play(this.res[resName], true, v);
                this.bgPlayer.beLoop = isloop;
            }
        });
    }

    /** 停止播放 */
    static Stop(resName = "") {
        if (wxTool.wx) {
            if (this.wxRes[resName]) {
                this.wxRes[resName].stop();
            }
        }
        else {
            // if(resName.indexOf(resName) != -1){
            //     this.bgPlayer.stop();
            // }
        }
    }

    /** 跳到指定进度位置 */
    static Seek(resName: string, position: number) {
        if (wxTool.wx) {
            if (this.wxRes[resName]) {
                this.wxRes[resName].seek(position);
            }
        }
    }

    static stopAll() {
        if (wxTool.wx) {
            console.error("wxRes", this.wxRes);
            for (let key in this.wxRes) {
                if (this.wxRes[key]) {
                    this.wxRes[key].stop();
                }
            }
        }
    }

    static pause(resName = "") {
        if (wxTool.wx) {
            if (this.wxRes[resName]) {
                this.wxRes[resName].pause();
            }
        } else {
            //
        }
    }

    static buttonMusic() {
        this.Play(this.btMusic);
    }

}