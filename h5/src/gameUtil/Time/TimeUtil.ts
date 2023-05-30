export class TimeUtil {
    public static init(app: m4m.framework.application, FrameRate = 60) {
        this.app = app;
        //update delta 注册;

        let arrLen = 240;
        let tGap = 1 / FrameRate;
        for (let i = 0; i < arrLen; i++) {
            this.timeSection += tGap;
            this.ftimeSection += tGap;
            this.timeArr.push(tGap);
            this.fTimeArr.push(tGap);
        }

        //物理的 delta
        let phy = m4m.framework.physics2D;
        let lastTotalTime = app.getTotalTime();
        if (phy) {
            let timing = (phy.matterEngine as any).timing;
            phy.addEventListener(m4m.event.Physic2dEventEnum.afterUpdate, () => {
                let currTime = timing.timestamp;
                if (this.lastFixedT == -1) {
                    this.lastFixedT = currTime;
                    return;
                }
                this._fixedDeltaTime = (currTime - this.lastFixedT) * 0.001;
                this.lastFixedT = currTime;

                //计算 物理平滑更新后 ，时间长度的修正 比率
                let nowTotalTime = app.getTotalTime();
                let dt = nowTotalTime - lastTotalTime;
                lastTotalTime = nowTotalTime;

                if (timing.timeScale > 0) {
                    let fdt = this._fixedDeltaTime;
                    dt = dt > 0.1 ? 0.1 : dt; //避免卡帧 
                    fdt = fdt > 0.1 ? 0.1 : fdt;

                    this.timeSection += dt;
                    this.timeArr.push(dt);
                    this.timeSection -= this.timeArr.shift();

                    this.ftimeSection += fdt;
                    this.fTimeArr.push(fdt);
                    this.ftimeSection -= this.fTimeArr.shift();

                    let correctRatio = this.timeSection / this.ftimeSection;
                    this._fixedDeltaTime *= correctRatio;

                    // tslint:disable-next-line: max-line-length
                    // console.error(`TimeRate : ${correctRatio} , time : ${this.timeSection} , fTime :${this.ftimeSection} , fps ${Math.pow(this._fixedDeltaTime, -1 ) } `);
                }
            }, this);
        }

        //realDT
        let oldUpdate = app["update"].bind(app);
        app["update"] = (dt) => {
            oldUpdate(dt);
            this.update();
        };
    }
    /** 游戏启动时的世间  (单位 毫秒)*/
    static get appStartupTime() { return this._appStartupTime; }
    /** 从游戏启动到现在的真实时间 (单位 毫秒)*/
    static get realtimeSinceStartup(): number {
        return Date.now() - this.appStartupTime;
    }
    /** 当前间隔时间 (单位 毫秒)*/
    static get stepGapTime() {
        let result = Date.now() - this._lastStepTime;
        this._lastStepTime = Date.now();
        return result;
    }

    /**
     * 获取当前时间 (单位 毫秒)
     */
    static get time(): number {
        return Date.now();
    }

    /**
     * 完成最后一帧所用的时间（单位 秒）
     */
    static get deltaTime(): number {
        return this.app.deltaTime;
    }
    /**
     * 物理和其他固定帧速率更新的时间间隔（单位 秒）。 
     */
    static get fixedDeltaTime(): number {
        // return this.app.deltaTime;
        return TimeUtil._fixedDeltaTime * this._timeScale;
    }
    /** 全局时间缩放 */
    static get timeScale() { return this._timeScale; }
    static set timeScale(v) {
        if (v == null || isNaN(v)) { return; }
        this._timeScale = v;
        this.app.timeScale = v;
        this._inverseTimeScale = Math.pow(v, -1);
        if (v == 0) { this._inverseTimeScale = 0; }  //避免计算无穷大
        if (!m4m.framework.physics2D) { return; }
        let Phy = m4m.framework.physics2D.matterEngine;
        // Phy.timing.timeScale = v;

    }
    /** 时间缩放值的逆值 */
    static get inverseTimeScale() { return this._inverseTimeScale; }
    /** 真实不受 时间缩放影响的 DeltaTime */
    static get realDeltaTime() {
        return this._realDeltaTime;
    }
    private static update() {
        this._realDeltaTime = (Date.now() - this.lastTime) * 0.001;
        this.lastTime = Date.now();
    }
    public static _appStartupTime: number = Date.now();
    private static timeArr: number[] = [];  //真实时间数组
    private static fTimeArr: number[] = []; //物理时间数组
    private static timeSection: number = 0;  //真实时间段
    private static ftimeSection: number = 0; //物理时间段

    private static app: m4m.framework.application;

    private static _lastStepTime: number = Date.now();

    private static lastFixedT = -1;
    private static _fixedDeltaTime: number = 0;

    private static _timeScale: number = 1;

    private static _inverseTimeScale = 1;

    private static _realDeltaTime = -1;

    private static lastTime = Date.now();
}