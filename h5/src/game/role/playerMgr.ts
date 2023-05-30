import { Ress } from "../Ress";
import { MatMgr } from "../MatMgr";
import { GameMgr } from "../GameMgr";
import { role } from "./role";
import { configMgr } from "../configMgr";
import { roleData } from "./roleData";
import { Inputer } from "../Inputer";
import { windHandle } from "../Scripts/windHandle";
import { inGamePage } from "../ui/pages/inGamePage";
import { stageMgr } from "../stageMgr"
import { themeChunk, themeMgr } from "../themeMgr"
import { robotMgr } from "./robotMgr"
import { continuePage } from "../ui/pages/continuePage";
import { prizePage } from "../ui/pages/prizePage";
import { Trailer } from "../lab/Trailer";
import { wxTool } from "../Tool/wxTool";
import { HMoveHandle } from "../Scripts/HMoveHandle";
import { tdTool } from "../Tool/tdTool";
import { joinTool } from "../Tool/joinTool";
import { FrameMgr } from "Tools/FrameMgr";
import { LateUpdateMgr } from "Tools/LateUpdateMgr";
import { GameArchiveManager } from "../Manager/GameArchiveManager";
import { AudioMgr } from "audio/AudioMgr";
export class playerMgr {
    //玩家速度
    static get RoleSpeed() {
        if (!this._role) return 0;
        return this._role.root.raelSpeed;
    }
    static reached: boolean;    // 到达终点
    private static moveSpeed: number;
    private static _role: role;
    private static wind: windHandle;
    static getRole() { return this._role; };
    private static fx_js: m4m.framework.f14EffectSystem; //特效系统
    static preInit() {
        let testRoleD = new roleData();
        // // Create ball
        this._role = new role(MatMgr.Role_mat, testRoleD);
        MatMgr.unSetHudMat(this._role.rankingLable);
        this._role.rankingLable.transform.visible = false;
        this._role.root.isPlayer = true;
        MatMgr.Role_mat.setVector4("_MainColor", new m4m.math.vector4(0.9, 0.9, 0.9, 1));
    }

    static init() {
        //start
        Trailer.LateUpdateMgr = LateUpdateMgr;
        //wind
        windHandle.mat = MatMgr.wind_mat;
        this.wind = this._role.root.gameObject.addComponent(windHandle.name) as windHandle;
        this.wind.stop = false;

        //水平move
        Inputer.onHorizTouch = this.onHorizTouch.bind(this);

        //加速监听
        this._role.root.onBoostLevelCg = this.onBoostLevelCg.bind(this);

        //减速 结束监听
        this._role.root.onSlowEnd = this.onSlowend.bind(this);


        //默认皮肤 & 默认主题
        // this.changeSkin(0);
        // themeMgr.changeTheme(0);
        let game = GameArchiveManager.Instance.GameArchiveData
        this.changeSkin(game.baseData.id);
        playerMgr.changeTheme();

        //切换到 历史保存 皮肤 和 主题
        // if (GameMgr.currUseSkin != 0) {
        //     this.changeSkin(GameMgr.currUseSkin);
        // }

        // if (GameMgr.currUseTheme != 0) {
        //     themeMgr.changeTheme(GameMgr.currUseTheme);
        // }
    }

    static changeTheme() {
        let index = this.random(themeMgr.themes);
        themeMgr.changeTheme(index);
    }

    /** 改皮肤 */
    static changeSkin(skinId: number) {
        this._role.changeSkin(skinId);
    }

    private static raceStartTime = 0;
    static racePlay() {

        let r = this._role;
        this.reached = false;
        r.root.stop = false;
        r.rankingLable.text = "30";
        r.taril.play();
        this.raceTime = 0;

        FrameMgr.Add(this.palyerInfoUpd, this);


        // //fix playermgr ranking ui text show problen
        // let tran = this._role.root.gameObject.transform;
        // let parent = this._role.root.gameObject.transform.parent;
        // parent.removeChild(tran);
        // parent.addChild(tran);
    }

    private static cacheIngamePage: inGamePage;
    private static raceTime = 0;
    static getRaceTime() { return this.raceTime };
    // 信息更新
    private static palyerInfoUpd(dt) {
        this.raceTime += dt;
        let runLen = this._role.root.gameObject.transform.localTranslate.z;

        if (!this.reached && runLen >= stageMgr.currentLevel.length) {
            //抵达终点
            this.reached = true;
            wxTool.setHeadFollowMode(false);  //关闭 头像跟随子域画布模式
            this.getRole().toSlowdown();
            //其他机器人停下来
            // robotMgr.stopAll();
            robotMgr.toSlowdownAll();
            // stageMgr.gameOverConsole();
        }

        // 进度条
        let prate = Math.min(runLen / stageMgr.currentLevel.length, 1);
        if (this.cacheIngamePage) {
            this.cacheIngamePage.setValue(prate);
        } else {
            inGamePage.Instance().then((ins) => {
                this.cacheIngamePage = ins;
                this.cacheIngamePage.setValue(prate);
            });
        }
        //移动块的速度控制
        let l = stageMgr.currentLevel;
        HMoveHandle.moveSpeed = m4m.math.numberLerp(l.cubeSpeedRange[0], l.cubeSpeedRange[1], prate);
    }

    static initState() {
        this._role.initState();
        // this._role.rankingLable.text = "30";
        // this._role.rankingLable.transform.markDirty()
        this.wind.boostlevel = 0;
        let tran = this._role.root.gameObject.transform;
        tran.localTranslate.x = tran.localTranslate.z = 0;
        //旋转
        let rotate = this._role.instance.localRotate;
        rotate.x = rotate.y = rotate.z = 0;
        rotate.w = 1;
        this._role.instance.localRotate = rotate;

        this._role.instance.localPosition.y = 0;
        this._role.instance.localPosition = this._role.instance.localPosition;

        this.lastRank = -1;
        this.reached = false;
    }

    private static sacle = 0.03;
    //水平move
    private static onHorizTouch(delta: number) {
        if (!this._role) return;
        let root = this._role.root;
        root.horizMove(delta * this.sacle);
    }

    static regStepBC(callBack: (step: number) => any) {
        if (!this._role) return;

        this._role.root.onStepCg = callBack;
    }

    private static dieCount = 0;
    //死亡
    static toDie() {
        if (this._role.godMode) return; //无敌状态 退出

        //子域画板设置成 全屏模式
        wxTool.setHeadFollowMode(false);
        GameMgr.raceStage = -1;
        stageMgr.closeHeadFollow(); //头像跟随关闭
        AudioMgr.Play("character.mp3");
        wxTool.vibrateLong();
        //this.getRole().toStop();
        this.getRole().die();
        stageMgr.gameOverConsole();

        this.dieCount++;
        if (this.dieCount == 1) {
            joinTool.tdcustomEvent(tdTool.FirstTimeFunnelEvent, tdTool.FirstTimeFunnelEvent, { [tdTool.Player_lose]: 1 });  //数据埋点
        }

        if (continuePage.recoverCount >= stageMgr.currentLevel.reviveCount) { //真死
            FrameMgr.Remove(this.palyerInfoUpd, this);
            prizePage.Instance().then((ins) => {
                ins.show();
                ins.setInfo(stageMgr.gameDiamond, false);
            });

        }


        if (this.fx_js) {
            this.fx_js.gameObject.visible = false;
            this.fx_js.stop();
        }

        console.error(" you die ,game over ");

    }

    //跳起
    static toJump() {
        this._role.root.jump();
    }

    //加速
    static toBoost() {
        this._role.root.boost();

        if (!this.fx_js && Ress.fx_js) {  //复活特效 initialization
            let tran = Ress.fx_js.getCloneTrans();
            MatMgr.setFxMat(tran);
            let s = 0.5;
            tran.localScale = new m4m.math.vector3(s, s, s);
            let f14 = tran.gameObject.getComponent("f14EffectSystem") as m4m.framework.f14EffectSystem;
            this.fx_js = f14;
            this._role.ball.gameObject.transform.addChild(tran);
        }

        if (this.fx_js) {
            this.fx_js.gameObject.visible = true;
            this.fx_js.play();
        }
    }

    private static onBoostLevelCg(level: number) {
        //UI 速度线
        //uiMgr.showSpeedLine(level== 0 ? true: false , level);
        this.wind.boostlevel = level;

        if (level <= 0) {
            if (this.fx_js) {
                this.fx_js.gameObject.visible = false;
                this.fx_js.stop();
            }
        }
    }

    static toRaceCount = 0;
    /** 复活 */
    static relive() {
        this.toRaceCount++;
        if (this.toRaceCount == 2) {
            joinTool.tdcustomEvent(tdTool.FirstTimeFunnelEvent, tdTool.FirstTimeFunnelEvent, { [tdTool.Tap_to_restart]: 1 });  //数据埋点
        }

        // this._role.relive();
        this._role.recover();
        robotMgr.SlowReNormalAll();
        robotMgr.unStopAll();
        //子域画板设置成 头像模式
        wxTool.setHeadFollowMode(true);
    }

    private static lastRank;
    /** 检查自己超越 其他对手*/
    static ckOverOpponent(rank: number, opponent: role) {
        if (this.lastRank == -1) {
            this.lastRank = rank;
            return;
        }

        if (this.lastRank == rank) return;

        //发生超越
        if (this.lastRank > rank) {
            let pos_x = 0;
            let limit_w = 4.5;
            if (opponent) {
                pos_x = opponent.root.gameObject.transform.localTranslate.x;
                pos_x += limit_w;
                pos_x = pos_x / (limit_w * 2); //单位化
            }
            joinTool.ckOverFriend(rank, pos_x, 300);

            console.log(`rank:${rank} : 超过对手.. `);
        } else {
            //发生倒退

        }

        this.lastRank = rank;
    }

    //减速 完毕
    private static onSlowend() {
        this._role.root.currSpeed = configMgr.roleBspeed;
        stageMgr.gameOverConsole();
    }

    private static random(_lsit: themeChunk[]) {
        const random = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1) + min);
        let ran = random(0, _lsit.length);
        let id: number;
        if (_lsit[ran]) {
            id = Number(_lsit[ran].id);
        }
        if (id == 0 || id > 7) {
            id = 1;
        }
        return id;
    }
}