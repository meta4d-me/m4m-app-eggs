/** 序列帧动画 */
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class sequenceFrame extends m4m.framework.behaviour2d {
    /** 是否循环播放 */
    public isLoop = false;
    /** 播放速率 f/s (每秒播放次数)*/
    public get framerate() { return this._framerate; }
    public set framerate(v) {
        if (isNaN(v) || v < 0) { return; }
        this._framerate = v;
        this._interval = 1 / this._framerate;
    }
    /**
     * 图集资源url
     * [已经弃用 , 请使用 setAssetUrl() 接口。] 
     * @deprecated
     */
    public ssAssetUrl: string;
    /**
     * 图集名
     * @deprecated
     */
    public atlasName: string;
    /** sprite 列表 */
    private sps: m4m.framework.sprite[] = [];
    private img: m4m.framework.image2D;
    private isplay = false;

    /** 播放速率 f/s (每秒播放次数)*/
    private _framerate = 24;
    /** 是否初始化了 */
    private inited = false;
    /** 帧间隔时间 */
    private _interval: number = 1 / this._framerate;
    /** 帧间隔 delata记时 */
    private frameDelata = 0;
    /** 当前帧 */
    private currF = 0;
    /** 图集资源URL */
    private _atlasAssetUrl: string = "";
    /** 单图集模式 */
    private _isSingleAtlasMode = false;

    public onPlay() {
    }

    /**
     * 设置图集资源的路径(设置后 走单图集 初始化模式 , 非必选)
     * 例如：xxx/图集名
     * @param atlasAssetUrl 
     */
    public setAssetUrl(atlasAssetUrl: string) {
        this._atlasAssetUrl = atlasAssetUrl;
        this._isSingleAtlasMode = true;
    }

    /** 播放  */
    public play() {
        if (this.isplay) { return; }
        this.transform.visible = true;
        this.isplay = true;
        this.currF = 0;
        this.frameDelata = 0;
    }

    /** 暂停播放 */
    public stop() {
        if (!this.isplay) { return; }
        this.transform.visible = false;
        this.isplay = false;
    }
    public update(delta: number) {
        if (!this.isplay) { return; }

        this.frameDelata += delta;
        if (this.frameDelata < this._interval) { return; }
        this.frameDelata = 0;
        this.init();

        if (this.sps.length == 0) { return; }

        let sp = this.sps[this.currF];
        if (sp) {
            this.img.sprite = sp;
        }

        this.currF++;
        if (this.currF == this.sps.length) {
            this.currF = 0;
            if (!this.isLoop) {
                this.stop();
            }
        }
    }

    public remove() {
        if (this.sps) { this.sps.length = 0; }
        this.img = null;
        this.sps = null;
    }

    /** 初始化 */
    private init() {
        if (this.inited) { return; }
        this.inited = true;
        let img = this.transform.getComponent("image2D") as m4m.framework.image2D;
        if (!img) { return; }
        this.img = img;
        //init set 
        if (this._isSingleAtlasMode) {
            this.initBySingleAtlas();
        } else {
            this.initByMaxNum();
        }
    }

    /** 单图集模式 */
    private initBySingleAtlas() {
        if (!this._atlasAssetUrl) {
            console.error(" atlas 相应路径 未设置  !!！");
            return;
        }
        let atlasSuffix = ".atlas.json";
        let bundleSuffix = ".assetbundle.json";
        let atlasName: string = this.img["_spriteName"];
        if (!atlasName) {
            atlasName = this._atlasAssetUrl.substring(this._atlasAssetUrl.lastIndexOf("/"));
            atlasName += atlasSuffix;
            // atlasName = this.atlasName;
        }
        let baseAtlasName = atlasName.substring(0, atlasName.lastIndexOf(atlasSuffix));
        let bundlename = `${this._atlasAssetUrl}/${baseAtlasName}/${baseAtlasName}${bundleSuffix}`;

        let _atles = m4m.framework.sceneMgr.app.getAssetMgr()
            .getAssetByName(atlasName, bundlename) as m4m.framework.atlas;
        if (_atles == null) {
            console.error(atlasName + "     atlas 未找到  !!！");
            return;
        }
        for (let key in _atles.sprites) {
            let sp = _atles.sprites[key];
            let charAtindex = Number(key.slice(key.length - 2, key.length));
            if (sp) {
                this.sps[charAtindex] = sp;
            }
        }
    }

    /** 模板最大值 初始化模式 */
    private initByMaxNum() {
        let templateName = this.img["_spriteName"] as string;
        if (!templateName) {
            console.warn(`initByMaxNum 失败 ,image2d 的 _spriteName 是空的。`);
            return;
        }
        let arr = templateName.match(/\d*/g);
        let lastNumStr = arr[arr.length - 2];
        let baseName = templateName.split(lastNumStr)[0];
        let maxNum = Number(lastNumStr);   // name = xxx001, 或最后的 数字。

        let len = maxNum + 1;
        let assMgr = m4m.framework.sceneMgr.app.getAssetMgr();
        for (let i = 0; i < len; i++) {
            let spName = `${baseName}${this.numStrFull3(i)}`;
            let sp = assMgr.getAssetByName(spName) as m4m.framework.sprite;
            if (!sp) {
                console.warn(`sequenceFrame 初始化时 , sprite : ${spName} 获取不到。`);
            }
            this.sps.push(sp);
        }
    }

    /** 长度不够3 的补全 */
    private numStrFull3(num: number) {
        let str = num.toString();
        let defCount = 3 - str.length;
        if (defCount < 0) { defCount = 0; }
        while (defCount > 0) {
            defCount--;
            str = "0" + str;
        }
        return str;
    }
}
