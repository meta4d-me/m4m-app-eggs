import { configMgr } from "../configMgr";
import { stageMgr } from "../stageMgr";
import { GameMgr } from "../GameMgr";

//角色 handle
@m4m.reflect.nodeComponent
export class roleHandle extends m4m.framework.behaviour {
    static funVibrateShort: Function; //震动方法
    isPlayer = false;
    ball: m4m.framework.transform;
    realBall: m4m.framework.transform;
    raelSpeed = 0;
    private readonly edge_w = 4.5;
    private readonly edge_h = 5;
    public currSpeed: number = configMgr.roleBspeed;
    public stop = true;
    private _stepNum: number;
    lowMode = false; //低消耗模式
    get stepNum() { return this._stepNum };
    onStepCg: (step: number) => any;
    public lastObs = -1;

    public onPlay() {
        this.initstate();
    }

    static headSteepNum = 0;
    static tailSteepNum = 0;

    private readonly ckCD = 1;
    private ckDcount = 0;
    private isCooling = false;
    private lastLowMode = false;
    //强制隐藏检查
    private ckDropout(d: number) {
        if (this.isPlayer) return;

        if (this.isCooling) {
            this.ckDcount += d;
            if (this.ckDcount < this.ckCD) return;
            this.lastLowMode = false;  //保证 cd结束 可以再次 检测
            this.ckDcount = 0;
            this.isCooling = false;
        }

        //避免连续触发
        if (!this.lastLowMode && this.lowMode && stageMgr.camCtr.gameObject.transform.localPosition.z > this.gameObject.transform.localRotate.z) {
            let isBeyond = this.tryBeyond();
            if (isBeyond) {

                this.isCooling = true;
            } else {
                this.doDropout();
            }
        }
        this.lastLowMode = this.lowMode;

        // if(roleHandle.headSteepNum == roleHandle.tailSteepNum)   return;
        // if(this.stepNum < roleHandle.tailSteepNum ) {
        // }
    }

    //尝试反超 加速
    private tryBeyond() {
        let result = false;
        if (this.isPlayer || stageMgr.visibleRobotNum > configMgr.robotReSurpassLimit) return result;
        let level = stageMgr.currentLevel;
        if (Math.random() < level.beyondRate) {
            let rand = Math.random();
            if (rand < level.bootsRates[0]) {
                // console.log('加速X1');
                this.boost();
            } else if (rand < level.bootsRates[0] + level.bootsRates[1]) {
                // console.log('加速X2');
                this.boost();
                this.boost();
            } else {
                // console.log('加速X3');
                this.boost();
                this.boost();
                this.boost();
            }
            console.warn(`tryBeyond ${rand} `);
            result = true;
        }
        return result;
    }

    /** 已经掉队 */
    isDropout = false;
    //执行 掉队处理
    private doDropout() {
        console.warn(`doDropout ${this.gameObject.transform.insId.getInsID()} `);
        //
        this.isDropout = true;
    }

    /** 关闭更新 */
    closeUpdate() {
        if (!this.isPlayer)
            this.gameObject.visible = false; //update 不再更新
    }

    public update(delta: number) {
        if (this.stop) return;
        this.H_MovingLimit();
        this.ckAttenuation(delta);
        this.run(delta);
        this.ckSlowing(delta);
        this.ckDropout(delta);

        if (this.lowMode) return;
        this.ckStep();
        this.jumping(delta);
        if (this.isPlayer) {
            this.rolling();
        } else {
            this.moveToTarget(delta);
        }
    }

    initstate() {
        this.isJumping = this.isDropout = this.lastLowMode = this.lowMode = this._isSlowing = false;
        this._stepNum = this.raelSpeed = this.boostNum = this.boostSpeed = this.addTime = 0;
        // this.currSpeed = 40;
        // this.currSpeed =  configMgr.roleBspeed;
        let tran = this.gameObject.transform;
        tran.gameObject.visible = true;
        //tran.localTranslate.x = tran.localTranslate.z = 0;
        this.v = 0;
        this.g = 0;
        this.horizV = 0;
        roleHandle.headSteepNum = roleHandle.tailSteepNum = 0;
        if (this.ball)
            this.ball.localTranslate.y = 0;
    }

    //水平移动 缓动过滤 限制裁剪
    private H_MovingLimit() {
        if (Math.abs(this.horizV) > 0.1) {
            this.horizV *= 0.65;
            let x = this.gameObject.transform.localTranslate.x + this.horizV;
            x = x < -this.edge_w ? -this.edge_w : x > this.edge_w ? this.edge_w : x; //限制裁剪
            this.gameObject.transform.localTranslate.x = x;
            //this.eular[2] += this.getRollingAngleFromDistance(this.horizV);
            this.gameObject.transform.localTranslate = this.gameObject.transform.localTranslate;
        }
    }

    private targetSpeed = 0;    // 移动到目标的速度
    private timeRemain = 0;
    private lastRandomMission = null;
    setAim(pos: number, timeScale = 1) {
        pos = Math.max(-this.edge_w, Math.min(this.edge_w, pos)); // Limit
        this.timeRemain = (0.15 - this.boostNum * 0.03) * timeScale;
        let dis = pos - this.gameObject.transform.localTranslate.x;
        // console.log(pos, dis, this.edge_w);
        this.targetSpeed = dis / this.timeRemain;
        if (this.lastRandomMission != null) {
            clearTimeout(this.lastRandomMission);
            this.lastRandomMission == null;
        }
        // this.lastRandomMission = setTimeout(() => this.randomMission(), 1000 + Math.random() * 1000);

    }
    private moveToTarget(delta) {
        if (this.timeRemain > 0) {
            let x = Math.max(-this.edge_w, Math.min(this.edge_w, this.gameObject.transform.localTranslate.x + this.targetSpeed * delta));
            this.gameObject.transform.localTranslate.x = x;
            this.gameObject.transform.localTranslate = this.gameObject.transform.localTranslate;
            this.timeRemain -= delta;
        }
    }
    private randomMission() {
        this.setAim(this.gameObject.transform.localTranslate.x + (Math.random() * 3 - 1.5), 3);
    }

    private befSlowSpeed = 0;
    private _isSlowing = false;
    /** 减速 到停止*/
    doSlowing() {
        if (this._isSlowing) return;
        let round = (1 - this.eular[0] / 360 % 1) + 3; // 需要旋转的圈数
        let dis = round * Math.PI / 0.16; // 行走的位移
        this.boostSpeed = 0;
        this.slowS = this.currSpeed / (dis * 2 / this.currSpeed);   // 减速的加速度
        this._isSlowing = true;
        this.befSlowSpeed = this.currSpeed;
    }
    get isSlowing() {
        return this._isSlowing;
    }

    /** 减速恢复到正常 */
    slowReNormal() {
        if (!this._isSlowing) return;
        this._isSlowing = false;
        this.currSpeed = this.befSlowSpeed;
    }


    private slowS = 30;
    /** 减速 结束 */
    onSlowEnd: Function;
    //减速 动作更新
    private ckSlowing(delta) {
        if (this._isSlowing) {
            if (this.currSpeed < 0) {
                this.stop = true;
                // this._isSlowing = false;
                this.slowReNormal();
                if (this.onSlowEnd) //结束回调
                    this.onSlowEnd();
                // this.currSpeed = configMgr.roleBspeed;
                // stageMgr.gameOverConsole();
                return;
            }
            this.currSpeed -= this.slowS * delta;
        }
    }

    /** 检查 步阶的变化 ，一小条路面为一步 */
    private ckStep() {
        let lpos = this.gameObject.transform.localTranslate;
        let t = (this._stepNum + 1) * this.edge_h;
        if (lpos.z < t) return;
        this._stepNum = Math.floor(lpos.z / this.edge_h);
        if (this.onStepCg) {
            this.onStepCg(this._stepNum);
        }
        //console.error(`---- : ${this._stepNum}`);
    }

    //水平移动
    private horizV = 0;
    public horizMove(xLen: number) {
        if (this.stop) return;
        this.horizV += xLen * 0.45;
    }

    /** 行走奔跑 */
    private run(delta: number) {
        let boostSp = this.boostSpeed * this.stepSpeed;
        // let t = Math.floor(this.gameObject.transform.localTranslate.z/configMgr.speedAddDistance);
        // let baseSp = this.currSpeed + this.currSpeed * configMgr.speedAddRate * t;  //加上每x米增益速度
        let baseSp = this.currSpeed;
        if (this.isPlayer) {  //玩家自己的最大速度限制
            // baseSp = baseSp > configMgr.playerMaxSpeed ? configMgr.playerMaxSpeed : baseSp ;  //增益限制

        }
        this.raelSpeed = baseSp + boostSp;
        delta = delta > GameMgr.limitDtime ? GameMgr.limitDtime : delta; //限制最低 计算delta time

        let len = this.raelSpeed * delta;
        this.gameObject.transform.localTranslate.z += len;
        this.eular[0] += this.getRollingAngleFromDistance(len * 0.16);
    }

    /** 基础的行走 */
    baseRun(delta: number) {
        delta = delta > GameMgr.limitDtime ? GameMgr.limitDtime : delta; //限制最低 计算delta time

        let len = this.currSpeed * delta;
        this.gameObject.transform.localTranslate.z += len;
    }

    private eular = [0, 0, 0];
    //滚动 更新
    private rolling() {
        m4m.math.quatFromEulerAngles(this.eular[0], this.eular[1], this.eular[2], this.realBall.localRotate);
        this.realBall.localRotate = this.realBall.localRotate;
    }
    private edgeLength = Math.PI;
    private getRollingAngleFromDistance(dis: number) {
        return dis / this.edgeLength * 360;
    }

    // private g = -9.8;
    private isJumping = false;
    jump() {
        if (!this.ball) return;
        if (this.isJumping == true) return;    // 防止多次触发
        this.isJumping = true;
        this.g = -980;

        this.riseTime = 2.2 / this.raelSpeed;
        this.v = this.raelSpeed;
        this.energy = this.v * 2;
        // console.log(`jump aa `);
    }
    private g = -4.8;
    private v = 0;
    private baseHeight = 0;
    private jumped = true;
    private riseTime = 0;
    private vCost = 75; // 速度损耗
    private energy = 0;
    //跳跃检查
    private jumping(delta: number) {
        if (!this.isJumping || !this.ball) return;
        // delta = delta > GameMgr.limitDtime ? GameMgr.limitDtime : delta; //限制最低 计算delta time
        let tran = this.ball;
        this.riseTime -= delta;

        let height = tran.localTranslate.y += this.v * delta;
        if (this.riseTime < 0) { // 自由落体
            this.v += this.g * delta;
        }
        if (height < 0) {    // 触地
            if (this.isPlayer) {
                roleHandle.funVibrateShort();//震动
            }

            tran.localTranslate.y = 0;
            // this.v = -this.v - this.vCost;
            this.energy -= this.vCost;
            this.v = this.energy / 2;

            if (this.v < 0) {
                this.v = 0;
                this.isJumping = false;
            }
        }


        // this.v += this.g * delta;
        // //let tran = this.gameObject.transform;
        // let cur = tran.localTranslate.y + this.v * delta;
        // if(cur > this.baseHeight) {
        //     tran.localTranslate.y += this.v;
        // } else {
        //     this.v = -this.v * 0.4;
        //     if(this.isPlayer && roleHandle.funVibrateShort){
        //         roleHandle.funVibrateShort();//震动
        //     }
        //     if(this.v < 0.1) {
        //         this.v = 0;
        //         this.g = 0;
        //         // tran.localTranslate.y = 0;
        //         // this.jumped = true;
        //     }
        // }
        //     // tran.localTranslate.y = this.baseHeight;
        tran.localTranslate = tran.localTranslate;
    }
    // private jumping(delta:number){
    //     if(this.jumped || !this.ball) return;
    //     delta = delta > GameMgr.limitDtime ? GameMgr.limitDtime : delta; //限制最低 计算delta time

    //     this.v += this.g * delta;
    //     //let tran = this.gameObject.transform;
    //     let tran = this.ball;
    //     let cur = tran.localTranslate.y + this.v * delta;
    //     if(cur > this.baseHeight) {
    //         tran.localTranslate.y += this.v;
    //     } else {
    //         this.v = -this.v * 0.4;
    //         if(this.isPlayer && roleHandle.funVibrateShort){
    //             roleHandle.funVibrateShort();//震动
    //         }
    //         if(this.v < 0.1) {
    //             this.v = 0;
    //             this.g = 0;
    //             tran.localTranslate.y = 0;
    //             this.jumped = true;
    //         }
    //         tran.localTranslate.y = this.baseHeight;
    //     }
    //     tran.markDirty();
    // }

    //died boom
    private boom() {

    }

    //jump
    // jump(){
    //     if(!this.ball) return;
    //     this.jumped = false;
    //     this.g = -9.8;
    //     this.v = 1.2;
    // }

    onRealSpeed: (dist: number, offset: number) => any;
    onBoostLevelCg: (level: number) => any;

    private readonly stepSpeed = configMgr.roleStepSpeed;  //每阶增加的速度
    // private readonly maxBoostNum = 3; //最高三阶速度
    private boostNum = 0;
    private boostSpeed = 0;
    boost() {
        this.addTime = 0;
        if (this.boostNum >= configMgr.addMaxStepNum) return;
        this.boostNum++;
        this.boostSpeed = this.boostNum;
        if (this.onBoostLevelCg) this.onBoostLevelCg(this.boostNum);
    }

    private addTime = 0;
    // private readonly attenTime = 2; // 2/s
    //加速的衰减 检查
    private ckAttenuation(delta: number) {
        delta = delta > GameMgr.limitDtime ? GameMgr.limitDtime : delta; //限制最低 计算delta time

        if (this.boostSpeed > this.boostNum) {
            this.boostSpeed -= delta;
            this.boostSpeed = this.boostSpeed < this.boostNum ? this.boostNum : this.boostSpeed;
        }

        if (this.boostNum < 1) return;
        this.addTime += delta;
        if (this.addTime >= configMgr.stepTimeLength) {
            this.boostNum--;
            this.addTime = 0;
            if (this.onBoostLevelCg) this.onBoostLevelCg(this.boostNum);
        }
    }


    public remove() {

    }
}
