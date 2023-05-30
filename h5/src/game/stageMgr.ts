import { WayMgr } from "./WayMgr"
import { Ress } from "./Ress"
import { playerMgr } from "./role/playerMgr"
import { role } from "./role/role"
import { CameraFollowCtrBR } from "./CameraFollowCtr"
import { GameMgr } from "./GameMgr"
import { MatMgr } from "./MatMgr"
import { uiMgr } from "./uiMgr"
import { headMgr } from "./headMgr"
import { RoadGroupMgr } from "./RoadGroupMgr"
import { PoolMgr } from "./PoolMgr";
import { inviteMgr } from "./inviteMgr";
import { obsCreateMgr, obsStyle } from "./obsCreateMgr"
import { robotMgr } from "./role/robotMgr"
import { homePage } from "./ui/pages/homePage"
import { inGamePage } from "./ui/pages/inGamePage"
import { continuePage } from "./ui/pages/continuePage"
import { levelMgr, level } from "./levelMgr"
import { gameOverPage } from "./ui/pages/gameOverPage"
import { prizePage } from "./ui/pages/prizePage"
import { victoryPage } from "./ui/pages/victoryPage"
import { videoPrizePage } from "./ui/pages/videoPrizePage"
import { victoryPagehandle } from "./ui/victoryPagehandle"
import { joinTool } from "./Tool/joinTool"
import { tdTool } from "./Tool/tdTool"
import { wxTool } from "./Tool/wxTool"
import { saveTool } from "./Tool/saveTool"
import { coin } from "./lab/coin"
import { HMoveHandle } from "./Scripts/HMoveHandle"
import { FrameMgr } from "Tools/FrameMgr"
import { LateUpdateMgr } from "Tools/LateUpdateMgr"
import { GameArchiveManager } from "./Manager/GameArchiveManager"
import { GameArchiveManagerRequest } from "./AutoCode/Net/ClientRequest/GameArchiveManagerRequest"
import { ViewModeChangeMgr } from "./Manager/ViewModeChangeMgr"
import { AudioMgr } from "audio/AudioMgr"

export class stageMgr {
    static camCtr: CameraFollowCtrBR;
    private static camLpos: m4m.math.vector3;  //相机 localpos
    private static readonly camBaseYg = 10;
    //private static readonly camBaseYg = 30;
    public static scene: m4m.framework.scene;
    private static pRole: role; //player role
    static stageRoot: m4m.framework.transform;
    static visibleRobotNum: number = 0;//可见的机器人的数量
    //超前init
    static preInit() {
        let scene = GameMgr.app.getScene();
        this.scene = scene;
        this.stageRoot = new m4m.framework.transform();
        this.stageRoot.name = "stageRoot";
        this.scene.addChild(this.stageRoot);

        //waymgr 预初始
        WayMgr.preInit();
        //初始化 玩家
        playerMgr.preInit();
        this.pRole = playerMgr.getRole();
        //相机
        this.cam_Light_Init();
        //视角模式切换 管理器
        ViewModeChangeMgr.Init();
        //雾效
        scene.fog = new m4m.framework.Fog();
        scene.fog._Start = 10;
        scene.fog._End = 100;
        scene.fog._Color = new m4m.math.vector4(1, 0, 0, 1);

        // //UI 显示
        // // inGamePage.Instance.show();
        // inGamePage.Instance().then((ins) => {
        //     ins.show();

        //     homePage.Instance().then((ins) => {
        //         ins.showAndCgInGame();
        //     });
        // });


    }

    static inited = false;
    //初始化
    static init() {
        let scene = this.scene;

        playerMgr.init();
        playerMgr.regStepBC(this.onPlayerStep.bind(this));

        //障碍modeData
        RoadGroupMgr.init();

        GameMgr.currentLevel = Number(GameArchiveManager.Instance.GameArchiveData.Currentlevel.id) - 1;
        // 初始化当前关卡数据
        let level = GameMgr.currentLevel;
        //
        this.selectLevel(level);

        //初始化 舞台
        WayMgr.init();

        // //初始化 玩家
        // playerMgr.init();
        // playerMgr.regStepBC(this.onPlayerStep.bind(this));
        // this.pRole = playerMgr.getRole();
        // //相机
        // this.cam_Light_Init();
        //机器人
        robotMgr.placeRobots();
        //加载一些 路人的数据
        //路人头像
        headMgr.AddOnce(() => {
            headMgr.setIconUrls(robotMgr.robotPool); //设置 头像url
        });
        this.needFristUpd = true;
        this.ckRobotInvisibleAll();

        // //雾效
        // scene.fog = new m4m.framework.Fog();
        // scene.fog._Start = 10;
        // scene.fog._End = 100;
        // scene.fog._Color = new m4m.math.vector4(1, 0, 0, 1);


        //比赛 状态修改
        FrameMgr.Add(this.update, this);

        // //UI 显示
        // // inGamePage.Instance.show();
        // inGamePage.Instance().then((ins)=>{
        //     ins.show();
        //     homePage.Instance.showAndCgInGame();
        // });

        //lateupdate
        scene.onLateUpdate = LateUpdateMgr.onUpdate.bind(LateUpdateMgr);

        // //robot
        // playerMgr.onRealSpeed = robotMgr.dynamicAddRobot.bind(robotMgr);

        // GameMgr.app.showFps();
        // GameMgr.app.showDrawCall();

        //胜利结束回调
        victoryPagehandle.call_back = this.playCall.bind(this);
        this.runLevel = GameMgr.currentLevel;

        //ScreenAsp 更新关闭 （减少计算）
        GameMgr.app["updateScreenAsp"] = () => { };

        //开始按钮显示
        homePage.Instance().then((ins) => {
            ins.setShowStartBtn();
            //加载完毕
            if (GameMgr.isNewAuth) {
                joinTool.tdcustomEvent(tdTool.Finished_model_loading, tdTool.Finished_model_loading);  //数据埋点
            }
        });

        //UI 显示
        // inGamePage.Instance.show();
        //每日分享奖励 面板弹出 
        if (videoPrizePage.hasShareCP) {
            videoPrizePage.Instance().then(ins => {
                ins.show();
                let l = inviteMgr.gold[0];
                if (wxTool.isNewPlayer) {
                    l = l * 2;
                }
                ins.setInfo(l);
                saveTool.save(null, null);
            });
        }

        this.inited = true;
    }

    //相机 灯光 初始化设置
    private static cam_Light_Init() {
        let scene = this.scene;
        let role = this.pRole;
        //相机
        if (!scene.mainCamera.gameObject.getComponent(CameraFollowCtrBR.name)) {
            scene.mainCamera.fov = 60 * Math.PI / 180;
            // scene.mainCamera.far = 120;
            scene.mainCamera.far = 10000;
            var camCtr = scene.mainCamera.gameObject.addComponent(CameraFollowCtrBR.name) as CameraFollowCtrBR;
            camCtr.setTarget(role.root.gameObject.transform);
            //role.ball.camCtr = camCtr;
            //late update ( 拖尾 和 相机 )
            //抖动问题
            LateUpdateMgr.Add(camCtr.ckYGMove, camCtr);
            LateUpdateMgr.Add(camCtr["calCameraPos"], camCtr);

            camCtr.setTargetOffset(0, 1.6, 0);
            camCtr.Yangle = this.camBaseYg;

            //camCtr.elevationAngle = -135;
            camCtr.distance = 10;
            this.camCtr = camCtr;
            this.camLpos = camCtr.gameObject.transform.localPosition;
        }

        // //灯光
        // let ltran = new m4m.framework.transform();
        // let light = ltran.gameObject.addComponent("light") as m4m.framework.light;
        // light.type = m4m.framework.LightTypeEnum.Direction;
        // //light.intensity = 0.3;
        // m4m.math.quatFromEulerAngles(90, 0, 0, ltran.localRotate);
        // ltran.localEulerAngles = ltran.localEulerAngles;
        // scene.addChild(ltran);
    }

    private static readonly waitTime = 3.2;
    private static waitCount = 0;
    //等待 xx秒 后开始比赛
    private static waitlateBeginRace() {
        if (this.waitCount == 0) {
            // runingPage.Instance.show();
            // inGamePage.Instance().then((ins) => {
            //     ins.show();
            // });
        }
        //倒计时逻辑
        // runingPage.Instance.setRanking(configMgr.playerCount);//排名
        // runingPage.Instance.setDisNum(0);//排名


        // this.waitCount += Time.DeltaTime;
        // runingPage.Instance.setCountDown(this.waitTime - this.waitCount); //计时

        // if (this.waitCount < this.waitTime) return;
        // runingPage.Instance.setCountDown(0);//计时

        FrameMgr.Remove(this.waitlateBeginRace, this);
        playerMgr.racePlay();

        GameMgr.raceStage = 1;
        this.waitCount = 0;


        // 机器人
        robotMgr.startGame();
        //audio play
        AudioMgr.Seek("environment.mp3", 0);
        AudioMgr.Play("environment.mp3", true);
        //告诉子域 ，准备跟随的好友头像
        let instIds: number[] = [];
        robotMgr.robotPool.forEach(r => {
            if (r) {
                instIds.unshift(r.root.gameObject.transform.insId.getInsID()); //名次排序 [1,2,3.. ]
            }
        });
        joinTool.placeFriendIcon(instIds, this.currentLevel.id + 1);

        //子域画板设置成 头像模式
        wxTool.setHeadFollowMode(true);

        // //路人头像
        // headMgr.setIconUrls(robotMgr.robotPool); //设置 头像url
        this.needFristUpd = false;

        if (GameMgr.developModel) { //打印 平均速度
            this.raceStartTime = Date.now();
        }
    }

    private static raceStartTime = 0;

    static onPlayerStep(step: number) {
        WayMgr.roleSteepNum = step;
    }

    //重玩游戏
    static replay() {
        FrameMgr.Add(stageMgr.waitlateBeginRace, stageMgr);
        this.reState();
    }

    //update
    static update(delta: number) {
        // this.waitlateBeginRace();
        this.playerCollision();
        this.robotUpdate(delta);
        this.rankingCalculate(delta);
        this.homePageFristIcon(delta);
    }

    static currentLevel: level;
    //选择指定关卡
    static selectLevel(index: number) {
        let len_ = levelMgr.levels.length
        index = index >= len_ ? len_ - 1 : index;
        // if (index >= levelMgr.levels.length)
        //return;
        this.currentLevel = levelMgr.levels[index];
        //关卡移动 块的 移动速度

        // 更新UI
        //  homePage.Instance.setInfo(this.currentLevel.id + 1, 0);
        // inGamePage.Instance.setCustoms(this.currentLevel.id + 1);
        inGamePage.Instance().then((ins) => {
            ins.setCustoms(this.currentLevel);
        });
        let len = this.currentLevel.weight.length;
        let bgObj = RoadGroupMgr.baseGenRate;
        let bgLen = 0;
        for (let key in bgObj) {
            if (typeof (bgObj[key]) == "number") {
                bgLen++;
            }
        }
        if (len != bgLen) {
            console.error(`level(${index}), levelConfig error on change ：weightlist length wrong`);
        }
        for (let i = 0; i < len; i++) {
            bgObj[i] = this.currentLevel.weight[i];
        }
        // console.log(bgObj);
        // console.log(this.currentLevel.weight);
    }

    // 复活动画

    static backTrackMovement = new m4m.math.vector3();
    static backTrack(delta: number) {
        if (this.tracingTime <= 0) {
            FrameMgr.Remove(this.backTrack, this);
            this.ballEntryPlay(); // Next stage
            return;
        }
        let player: m4m.framework.transform = this.pRole.root.gameObject.transform;
        m4m.math.vec3ScaleByNum(this.tracingVec, delta, this.backTrackMovement);
        m4m.math.vec3Add(player.localTranslate, this.backTrackMovement, player.localTranslate);
        this.tracingTime -= delta;
    }

    static tracingDistance = 35;
    static tracingVec = new m4m.math.vector3();
    static tracingTime: number;
    static backTrackPlay() {
        this.tracingTime = 1;
        let player: m4m.framework.transform = this.pRole.root.gameObject.transform;
        let pos = player.getWorldPosition();
        // Set up target position
        m4m.math.vec3Clone(pos, this.tracingVec);
        this.tracingVec.x = 0;
        this.tracingVec.z -= this.tracingDistance;
        // Calculat speed vector
        m4m.math.vec3Subtract(this.tracingVec, pos, this.tracingVec);
        m4m.math.vec3ScaleByNum(this.tracingVec, 1 / this.tracingTime, this.tracingVec);

        FrameMgr.Add(stageMgr.backTrack, stageMgr);
        this.pRole.ball.gameObject.transform.localTranslate.z = -this.ballEntryOffset;
    }

    static ballEntryOffset: number = 20;
    static ballEntrytimer: number = 0.3;
    static ballEntrySpeed: number = stageMgr.ballEntryOffset / stageMgr.ballEntrytimer;
    static ballEntry(delta: number) {
        let ball = this.pRole.ball.gameObject.transform;
        if (this.ballEntrytimer <= 0) {
            this.ballEntrytimer = 0.3;  // reset for next round
            FrameMgr.Remove(this.ballEntry, this);
            m4m.math.vec3Reset(ball.localTranslate);
            return;
        }
        ball.localTranslate.z += this.ballEntrySpeed * delta;
        ball.localTranslate = ball.localTranslate;
        this.ballEntrytimer -= delta;
    }
    static ballEntryPlay() {
        this.ballEntrytimer = 0.3;
        FrameMgr.Add(stageMgr.ballEntry, stageMgr);
    }

    private static runLevel = 0;
    //重置状态
    static reState() {
        if (GameMgr.raceStage == 0) return;
        let level = stageMgr.runLevel = GameMgr.currentLevel;
        stageMgr.selectLevel(level);
        GameMgr.raceStage = 0;
        stageMgr.gameDiamond = 0;
        stageMgr.dieRanking = -1;
        RoadGroupMgr.initState();
        WayMgr.initState();
        playerMgr.initState();
        MatMgr.initState();
        robotMgr.placeRobots();
        //路人头像
        headMgr.setIconUrls(robotMgr.robotPool); //设置 头像url
        setTimeout(() => {
            stageMgr.camCtr["calCameraPos"]();
            stageMgr.ckRobotInvisibleAll();
            stageMgr.rankingCalculate(0);
        }, 0);

        //加载一些 路人的数据
        headMgr.AddOnce();
        this.needFristUpd = true;
    }

    private static needFristUpd = false;
    private static ckTimeLen = 0.3;
    private static fCkCount = 0;
    private static homePageFristIcon(d: number) {
        if (!this.needFristUpd) return;
        this.fCkCount += d;
        if (this.fCkCount < this.ckTimeLen) return;
        this.fCkCount = 0;

        this.tryShowFristIcon();
    }

    //在首页 展示 最近的一个路人
    private static tryShowFristIcon() {
        let fRole = robotMgr.getRole(0);
        if (fRole) {
            fRole.lastFollowed = false;
            fRole.ckHeadIconFollow(1);
        }
    }

    //游戏结束 接口
    static gameOverConsole() {
        GameMgr.raceStage = -1;
        let prole = this.pRole;
        prole.toStop();
        robotMgr.toSlowdownAll();
        let current = this.currentLevel.id; // 当前关卡 (1 indexed)
        if (playerMgr.reached) {
            //抵达终点 
            this.settlement(current, prole.rankNum);
        } else if (continuePage.recoverCount == this.currentLevel.reviveCount) {
            //不可复活（第二次 、跳过复活）
            this.settlement(current, this.dieRanking);
        } else {
            //可复活

            continuePage.Instance().then(ins => {
                ins.show();
            });
        }

        if (GameMgr.developModel) {  //打印平均速度
            let time = Date.now() - this.raceStartTime;
            time = time / 1000;
            let sp = stageMgr.currentLevel.length / time;
            console.warn(` 本局平局速度 ： ${sp} m/s  ,用时 : ${time} s ,距离:${stageMgr.currentLevel.length} m`);
        }

        if (playerMgr.reached) {
            // // settlementPage.Instance.recoverCount = 2;
            // //  gameOverPage.Instance.show();
            // this.closeHeadFollow();
            // prizePage.Instance.show();
            // prizePage.Instance.setInfo(GameMgr.currentLevel);
            // GameMgr.currentLevel++;

            this.levelComplete();
        }


        let nextAmount = 0;
        let nextLevel = levelMgr.levels[current];
        if (nextLevel != null)
            nextAmount = nextLevel.amount;

        gameOverPage.Instance().then((ins) => {
            ins.setInfo(prole.rankNum, current, this.currentLevel.amount, nextAmount);
            if (playerMgr.toRaceCount == 1 && GameMgr.isNewAuth) {
                joinTool.tdcustomEvent(tdTool.finished_1st_game, tdTool.finished_1st_game);  //数据埋点
            }
        });
        // this.selectLevel(current);


        //  settlementPage.Instance.setRanking(robotMgr.remain);
        // let dropOut = robotMgr.AITotalAmount + 1 - robotMgr.remain;
        //  settlementPage.Instance.setSelfInfo(playerMgr.getRaceTime(), this.pRole.root.gameObject.transform.localTranslate.z, dropOut, robotMgr.remain);
    }

    /** 获取分数 通过 关卡和 排名 信息 */
    static getScore(level: number, ranking: number) {
        //保存 得分 (xx关xx名)
        let score = level << 16;
        let _rank = 65535 - ranking;  //方便 排序
        score += _rank & (Math.pow(2, 16) - 1); //后16位 排名

        return score;
    }

    //结算
    static settlement(level: number, ranking: number) {
        let score = this.getScore(level, ranking);
        console.log(level + "关" + ranking + "名--分");
        //是否是-->新纪录
        if (score > GameMgr.newRecord) {
            GameMgr.newRecord = score;

            gameOverPage.Instance().then((ins) => {
                ins.setIsNewRecord(true);
            });
        } else {
            gameOverPage.Instance().then((ins) => {
                ins.setIsNewRecord(false);
            });
        }

        //保存数据
        saveTool.save(null, null);

        //上传微信排行榜
        joinTool.settlement(score);

        // 记录数据
        this.dataTracing([
            // PID
            // UsrID
            // Version
            Date.now(), // 当前时间
            this.currentLevel.id, // 关卡ID
            ranking,    // 关卡名次
            playerMgr.reached ? 1 : 0,
            this.gameDiamond,   // 本关卡获取得金币
            GameMgr.diamond,    // 当前金币总数据量
            0,                  // 统计目标ID
        ]);
    }

    private static _rankingSort(a, b) {
        return b[0].root.gameObject.transform.localTranslate.z - a[0].root.gameObject.transform.localTranslate.z;
    }

    private static cacheIngamePage: inGamePage;
    private static rankRefTime = 0.02; //
    private static rankRefCount = 0;
    private static lastPRank = -1;
    //计算排名信息
    static rankingCache = [];
    static rankingCalculate(d: number) {
        if (playerMgr.reached) return; //玩家到达终点后不再排名计算
        this.rankRefCount += d;
        if (this.rankRefCount < this.rankRefTime) return;  //优化点 、 降低刷新频率
        this.rankRefCount = 0;

        //名次修改
        if (this.pRole.rankNum != this.lastPRank) {
            // inGamePage.Instance.setSurpassNum(this.pRole.rankNum);
            if (this.cacheIngamePage) {
                this.cacheIngamePage.setSurpassNum(this.pRole.rankNum);
            } else {
                inGamePage.Instance().then((ins) => {
                    this.cacheIngamePage = ins;
                    this.cacheIngamePage.setSurpassNum(this.pRole.rankNum);
                });

            }

            this.lastPRank = this.pRole.rankNum;
        }

        this.rankingCache.length = 0;
        this.rankingCache.push([this.pRole, -1])
        let existAI = robotMgr.robotPool.length;
        let frontNum = 0;
        for (let i = 0; i < existAI; i++) {
            let agent = robotMgr.getRole(i);
            if (agent) {
                if (agent[this.frontTag]) {
                    frontNum++;
                    continue;
                }
                this.rankingCache.push([agent, i]);
            }
        }
        this.rankingCache.sort(this._rankingSort);

        // Update UI
        for (let i = 0; i < this.rankingCache.length; i++) {
            let curID = this.rankingCache[i][1];
            let num = i + 1 + frontNum;
            (this.rankingCache[i][0] as role).setRank(num);
            if (curID == -1) {
                // //检查玩家 超越
                // //超越 分数增加 、提示图标
                // let backRole = cache[i + 1] ? cache[i + 1][0] : null;
                // playerMgr.ckOverOpponent(num, backRole);
            }
        }
    }

    private static readonly frontTag = "frontTag";
    //机器人逻辑更新
    private static robotUpdate(delta: number) {
        if (GameMgr.raceStage != 1) return;
        let amount = robotMgr.robotPool.length;
        this.visibleRobotNum = 0;
        for (let id = 0; id < amount; id++) {
            let robot = robotMgr.getRole(id);
            if (robot != null) {
                robot[this.frontTag] = false;
                let isV = this.ckRobotInvisible(robot);
                robot.root.lowMode = !this.ckHasInActRange(robot);
                if (!robot.root.lowMode) {
                    robot.root.gameObject.visible = true;
                    this.AI(robot);
                    this.robotCKCollision(id);

                } else if (this.ckRobotOnFront(robot)) {
                    robot[this.frontTag] = true;
                    robot.root.gameObject.visible = false; //避免 sceneupdate 消耗
                    robot.root.baseRun(delta);
                }
                if (isV) {
                    this.visibleRobotNum++;
                    robot.ckHeadIconFollow(delta);
                }

                if (robot.root.isDropout) {
                    robotMgr.toDie(id);
                }

            }
        }
    }

    //机器人AI
    private static AI(r: role) {
        if (!r) return;
        // if(GameMgr.raceStage != 1) return;
        let ball = r.root;
        let agent = ball.gameObject.transform;
        //球 和 障碍的 碰撞检测
        let btran = r.sensor.gameObject.transform;
        // Adjust z offset of sensor
        let zoffset = ball.raelSpeed / 10; // Realspeed / 10
        zoffset = 15;
        if (btran.localTranslate.z != zoffset) {
            btran.localTranslate.z = zoffset;
            btran.localTranslate = btran.localTranslate;
        }
        let observeOffset = zoffset / 5;
        let curStep = ball.stepNum;

        let output = ball;

        let movingObserve = WayMgr.getObs(curStep + 3);
        const randomFactor = 2;
        if (movingObserve) {
            let move = movingObserve.gameObject.getComponent(HMoveHandle.name) as HMoveHandle;
            if (move) {
                let pos = movingObserve.gameObject.transform.localTranslate.x;
                // if(Math.abs(pos) >= 2.2) {
                //     output.horizMove(-pos-agent.localTranslate.x * (1.7 - Math.random() * 0));
                // } else {
                //     output.horizMove(agent.localTranslate.x * (-pos * 14 - Math.random() * 0));
                //     // output.horizMove(agent.localTranslate.x * (10 + pos) * (1.4 - Math.random() * 0));
                //     console.error('Attention @ ' + pos);
                // }
                let expect = 0;
                if (Math.abs(pos) >= 2.2) {
                    expect = -pos;
                } else {
                    expect = pos + 5;
                }
                // output.horizMove(expect - agent.localTranslate.x * (1.4 - Math.random() * 0));
                // output.horizMove((expect - agent.localTranslate.x) * (1.4 - Math.random() * 0));
                output.setAim(expect - agent.localTranslate.x);

                output.lastObs = -1;
            }

        }

        let obs4 = WayMgr.getObs(curStep + 3)
        if (obs4) {
            let style = obs4['style'];
            if (style != null) {   // 已知安全区域
                let styleName = obsStyle[style];
                let safe = obsCreateMgr.safetyLUT[obsCreateMgr.obsSafety[style]];
                if (style != 0 && style != 1 && output.lastObs != style) {
                    let randomPos = safe[0] + Math.random() * (safe[1] - safe[0]);
                    output.setAim(randomPos);
                    output.lastObs = style;
                } else {    // 碰撞检测

                    let obs = WayMgr.getObs(curStep + observeOffset);
                    let obs1 = WayMgr.getObs(curStep + 2);
                    let obs2 = WayMgr.getObs(curStep + 1);
                    let cs: m4m.framework.boxcollider[];
                    if (!obs) return;
                    cs = [];
                    if (obs)
                        cs = cs.concat(obs.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);
                    if (obs1)
                        cs = cs.concat(obs1.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);
                    if (obs2)
                        cs = cs.concat(obs2.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);

                    if (!cs || cs.length < 1) return;
                    let len = cs.length;
                    for (let i = 0; i < len; i++) {
                        let c = cs[i];
                        if (c.intersectsTransform(btran)) {
                            let cTag = c.gameObject.tag;
                            if (cTag != GameMgr.BoostTag && cTag != GameMgr.RampTag && cTag != GameMgr.CoinTag) {
                                let style = obs[PoolMgr.styleTag];
                                if (output.lastObs == style)
                                    return;
                                output.lastObs = style;
                                //die
                                if (Math.abs(agent.localTranslate.x) >= 0.8) {
                                    let factor = 0;
                                    if (style == 6 || style == 3) {
                                        factor = 1;
                                    }
                                    // output.horizMove(-agent.localTranslate.x * (factor + Math.random() * 0.8));
                                    output.setAim(-agent.localTranslate.x * (factor + Math.random() * 0));
                                } else {
                                    let flag = Math.random() - 0.5;
                                    // flag /= Math.abs(flag);
                                    flag = - Math.sign(agent.localTranslate.x);
                                    if (style == 6) {
                                        flag = -1;
                                    } else if (style == 3) {
                                        flag = 1;
                                    }
                                    // output.horizMove((10 - Math.abs(agent.localTranslate.x)) * flag * (0.5 + Math.random() * 0.9));
                                    output.setAim(8 - Math.abs(agent.localTranslate.x) * (flag));

                                }

                                break;
                            }

                        }
                    }


                }

            }
        }


        // // else {
        // let obs = WayMgr.getObs(curStep + observeOffset);
        // let obs1 = WayMgr.getObs(curStep + 2);
        // let obs2 = WayMgr.getObs(curStep + 1);
        // let cs: m4m.framework.boxcollider[];
        // if (!obs) return;
        // cs = [];
        // if (obs)
        //     cs = cs.concat(obs.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);
        // if (obs1)
        //     cs = cs.concat(obs1.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);
        // if (obs2)
        //     cs = cs.concat(obs2.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);

        // if (!cs || cs.length < 1) return;
        // let len = cs.length;
        // for (let i = 0; i < len; i++) {
        //     let c = cs[i];
        //     if (c.intersectsTransform(btran)) {
        //         let cTag = c.gameObject.tag;
        //         if (cTag != GameMgr.BoostTag && cTag != GameMgr.RampTag && cTag != GameMgr.CoinTag) {
        //             let style = obs[PoolMgr.styleTag];
        //             if (output.lastObs == style)
        //                 return;
        //             output.lastObs = style;
        //             //die
        //             if (Math.abs(agent.localTranslate.x) >= 0.8) {
        //                 let factor = 0;
        //                 if (style == 6 || style == 3) {
        //                     factor = 1;
        //                 }
        //                 // output.horizMove(-agent.localTranslate.x * (factor + Math.random() * 0.8));
        //                 output.setAim(-agent.localTranslate.x * (factor + Math.random()*0.5));
        //             } else {
        //                 let flag = Math.random() - 0.5;
        //                 // flag /= Math.abs(flag);
        //                 flag = - Math.sign(agent.localTranslate.x);
        //                 if (style == 6) {
        //                     flag = -1;
        //                 } else if (style == 3) {
        //                     flag = 1;
        //                 }
        //                 // output.horizMove((10 - Math.abs(agent.localTranslate.x)) * flag * (0.5 + Math.random() * 0.9));
        //                 output.setAim(8 - Math.abs(agent.localTranslate.x) * (flag + Math.random()));

        //             }

        //             break;
        //         }

        //         // } else if(Math.random() < 0.1) {
        //         //     output.horizMove(agent.localTranslate.x * (1+ Math.random() * 0.1));
        //     }
        // }
    }
    // //机器人AI
    // private static AI(r: role) {
    //     if (!r) return;
    //     // if(GameMgr.raceStage != 1) return;
    //     let ball = r.root;
    //     let agent = ball.gameObject.transform;
    //     //球 和 障碍的 碰撞检测
    //     let btran = r.sensor.gameObject.transform;
    //     // Adjust z offset of sensor
    //     let zoffset = ball.raelSpeed / 10; // Realspeed / 10
    //     zoffset = 15;
    //     if (btran.localTranslate.z != zoffset) {
    //         btran.localTranslate.z = zoffset;
    //         btran.markDirty();
    //     }
    //     let observeOffset = zoffset / 5;
    //     let curStep = ball.stepNum;

    //     let output = ball;

    //     let movingObserve = WayMgr.getObs(curStep + 3);
    //     const randomFactor = 2;
    //     if (movingObserve) {
    //         let move = movingObserve.gameObject.getComponent(HMoveHandle.name) as HMoveHandle;
    //         if (move) {
    //             let pos = movingObserve.gameObject.transform.localTranslate.x;
    //             // if(Math.abs(pos) >= 2.2) {
    //             //     output.horizMove(-pos-agent.localTranslate.x * (1.7 - Math.random() * 0));
    //             // } else {
    //             //     output.horizMove(agent.localTranslate.x * (-pos * 14 - Math.random() * 0));
    //             //     // output.horizMove(agent.localTranslate.x * (10 + pos) * (1.4 - Math.random() * 0));
    //             //     console.error('Attention @ ' + pos);
    //             // }
    //             let expect = 0;
    //             if (Math.abs(pos) >= 2.2) {
    //                 expect = -pos;
    //             } else {
    //                 expect = pos + 5;
    //             }
    //             // output.horizMove(expect - agent.localTranslate.x * (1.4 - Math.random() * 0));
    //             // output.horizMove((expect - agent.localTranslate.x) * (1.4 - Math.random() * 0));
    //             output.setAim(expect - agent.localTranslate.x);

    //             output.lastObs = -1;
    //         }

    //     }
    //     // else {
    //     let obs = WayMgr.getObs(curStep + observeOffset);
    //     let obs1 = WayMgr.getObs(curStep + 2);
    //     let obs2 = WayMgr.getObs(curStep + 1);
    //     let cs: m4m.framework.boxcollider[];
    //     if (!obs) return;
    //     cs = [];
    //     if (obs)
    //         cs = cs.concat(obs.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);
    //     if (obs1)
    //         cs = cs.concat(obs1.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);
    //     if (obs2)
    //         cs = cs.concat(obs2.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);

    //     if (!cs || cs.length < 1) return;
    //     let len = cs.length;
    //     for (let i = 0; i < len; i++) {
    //         let c = cs[i];
    //         if (c.intersectsTransform(btran)) {
    //             let cTag = c.gameObject.tag;
    //             if (cTag != GameMgr.BoostTag && cTag != GameMgr.RampTag && cTag != GameMgr.CoinTag) {
    //                 let style = obs[PoolMgr.styleTag];
    //                 if (output.lastObs == style)
    //                     return;
    //                 output.lastObs = style;
    //                 //die
    //                 if (Math.abs(agent.localTranslate.x) >= 0.8) {
    //                     let factor = 0;
    //                     if (style == 6 || style == 3) {
    //                         factor = 1;
    //                     }
    //                     // output.horizMove(-agent.localTranslate.x * (factor + Math.random() * 0.8));
    //                     output.setAim(-agent.localTranslate.x * (factor + Math.random()*0.5));
    //                 } else {
    //                     let flag = Math.random() - 0.5;
    //                     // flag /= Math.abs(flag);
    //                     flag = - Math.sign(agent.localTranslate.x);
    //                     if (style == 6) {
    //                         flag = -1;
    //                     } else if (style == 3) {
    //                         flag = 1;
    //                     }
    //                     // output.horizMove((10 - Math.abs(agent.localTranslate.x)) * flag * (0.5 + Math.random() * 0.9));
    //                     output.setAim(8 - Math.abs(agent.localTranslate.x) * (flag + Math.random()));

    //                 }

    //                 break;
    //             }

    //             // } else if(Math.random() < 0.1) {
    //             //     output.horizMove(agent.localTranslate.x * (1+ Math.random() * 0.1));
    //         }
    //     }
    // }

    //机器人不可见剔除
    private static ckRobotInvisible(r: role) {
        let far = 100;
        let isIn = this.robotInRange(r, far);
        r.setVisible(isIn);
        return isIn;
        // r.root.gameObject.transform.gameObject.visible = isIn;
    }

    //机器人不可见剔除 all
    private static ckRobotInvisibleAll() {
        let amount = robotMgr.robotPool.length;
        for (let id = 0; id < amount; id++) {
            let robot = robotMgr.getRole(id);
            if (robot != null) {
                this.ckRobotInvisible(robot);
                robot[this.frontTag] = false;
            }
        }
    }

    private static r_front = 130; //前面的位置
    private static r_back = 10;  //后面的位置
    //检查是否在 全逻辑工作开放 范围内
    private static ckHasInActRange(r: role) {
        return this.robotInRange(r, this.r_front, this.r_back);
    }

    //检查机器人是否在指定范围
    private static robotInRange(r: role, front: number, back: number = 0) {
        let pos = r.root.gameObject.transform.localPosition;
        let cpos = this.camLpos;
        return !(pos.z < cpos.z - back || pos.z > cpos.z + front);
    }

    //机器人是否在前方
    private static ckRobotOnFront(r: role) {
        let pos = r.root.gameObject.transform.localPosition;
        let cpos = this.camLpos;
        return pos.z > cpos.z;
    }

    // 机器人碰撞检测
    private static robotCKCollision(id) {
        // if(GameMgr.raceStage != 1) return;
        //球 和 障碍的 碰撞检测
        let role = robotMgr.getRole(id);
        let state = this.CKRoleCollision(role);
        if (state & 1) {
            robotMgr.toDie(id);

            AudioMgr.Play("ball.mp3");
            return;
        }
        if (state & 2) {
            //jump
            robotMgr.toJump(id);
        }
        if (state & 4) {
            //boost
            robotMgr.toBoost(id);
        }
        if (state & 8) {
            //钻石

        }
    }

    private static late_low_z = -1;
    private static cacheFun: Function;
    //相机下降
    private static downCam() {
        if (!this.cacheFun)
            this.cacheFun = this.reUpcam.bind(this);
        this.camCtr.setLToYangle(4, this.cacheFun);
    }
    //相机回升
    private static reUpcam() {
        this.camCtr.setLToYangle(this.camBaseYg);
    }

    /**
     * 检查角色的碰撞
     * 0：没碰到 、1:死亡 、2：坡道 、4：加速带 8：钻石
     */
    private static CKRoleCollision(r: role): number {
        let reslut = 0;
        if (GameMgr.raceStage != 1 || !r) return reslut;

        //球 和 障碍的 碰撞检测
        let btran = r.ball.gameObject.transform;
        let curStep = r.root.stepNum;
        let obs = WayMgr.getObs(curStep);
        let obs_1 = WayMgr.getObs(curStep + 1);
        let cs: m4m.framework.boxcollider[];
        if (obs || obs_1) {
            cs = [];
            if (obs)
                cs = cs.concat(obs.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);
            if (obs_1)
                cs = cs.concat(obs_1.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[]);
        } else {
            return;
        }

        if (!cs || cs.length < 1) return;
        let len = cs.length;
        for (let i = 0; i < len; i++) {
            let c = cs[i];
            if (!c.gameObject.visible || !c.intersectsTransform(btran)) continue;
            if (c.gameObject.tag == GameMgr.CoinTag) {
                // hasDiamond = true;
                let z = c.gameObject.transform.getWorldTranslate().z;
                if (z != r.lastDiamond_z) {
                    reslut |= 8;
                    r.lastDiamond_z = z;
                    if (r.root.isPlayer) {
                        //动画
                        //let ctr = c.gameObject.getComponent('coin') as coin;
                        let ctr = c.gameObject.transform.children[0].gameObject.getComponent('coin') as coin;
                        ctr.isFlying = true;
                    }
                    // c.gameObject.visible = false;
                }
            } else if (c.gameObject.tag == GameMgr.BoostTag) {
                let z = c.gameObject.transform.getWorldTranslate().z;
                if (z != r.lastBoost_z) {
                    // hasboost = true;
                    reslut |= 4;
                    r.lastBoost_z = z;
                }
            } else if (c.gameObject.tag == GameMgr.RampTag) {
                // hasjump = true;
                reslut |= 2;
            }
            else {
                //die
                reslut |= 1;
                break;
            }
        }

        return reslut;
    }

    static dieRanking = -1;  //死亡那一刻的排名数
    static gameDiamond: number = 0;
    /** 玩家 碰撞检测*/
    static playerCollision() {
        if (GameMgr.raceStage != 1) return;
        let state = this.CKRoleCollision(this.pRole);
        if (state & 1) {
            playerMgr.toDie();
            this.dieRanking = playerMgr.getRole().rankNum;
            return;
        }
        if (state & 2) {

            //jump
            playerMgr.toJump();

        }
        if (state & 4) {

            AudioMgr.Play("boost.mp3");
            //boost
            playerMgr.toBoost();

        }
        if (state & 8) {
            wxTool.vibrateShort();
            //金币
            GameMgr.diamond++;
            this.gameDiamond++;

            // inGamePage.Instance.updateData();
            // inGamePage.Instance.PlayCoinCollectAnim();

            inGamePage.Instance().then((ins) => {
                ins.updateData();
                ins.PlayCoinCollectAnim();
            });
        }

        let obs_1 = WayMgr.getObs(WayMgr.roleSteepNum + 1);
        if (obs_1) {  //相机下降
            let _z = obs_1.getWorldTranslate().z;
            if (this.late_low_z != _z && obs_1.gameObject.tag == obsCreateMgr.Tag_lowGate) {
                this.late_low_z = _z;
                this.downCam();
            }
        }
    }

    //关闭头像 跟随显示
    static closeHeadFollow() {

        //隐藏 sc , 清空 sc
        joinTool.closeFollowHead();

        //other icon 头像 隐藏
        uiMgr.otherIconImg.transform.visible = false;
    }


    /**
     * 播放完特效后
     */
    static playCall() {
        //弹出 过关奖励面板
        this.closeHeadFollow();
        prizePage.Instance().then((ins) => {
            ins.show();
            ins.setInfo(this.gameDiamond, true);
        });
        GameMgr.currentLevel = this.runLevel + 1;
        let id = GameArchiveManager.Instance.GameArchiveData.id;
        GameArchiveManagerRequest.Instance.updataGame(id, GameMgr.currentLevel + 1)
        saveTool.save(null, null);
    }
    //游戏过关
    static levelComplete() {
        let plevel = `${tdTool.Passed_level_}${this.runLevel + 1}`;
        joinTool.tdcustomEvent(plevel, plevel);  //数据埋点

        victoryPage.Instance().then(ins => {

            ins.show();
        });
        //播放特效
        this.playCPLevelFx();
    }

    private static fx_gx: m4m.framework.f14EffectSystem;
    private static fx_sl: m4m.framework.f14EffectSystem;
    //播放通关特效
    private static playCPLevelFx() {
        // if (!Ress.fx_gx && Ress.assetmgr.getAssetByName("fx_gx.prefab.json")) {
        //     Ress.fx_gx = (Ress.assetmgr.getAssetByName("fx_gx.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // }
        if (!Ress.fx_sl && Ress.assetmgr.getAssetByName("fx_sl.prefab.json", `fx_sl.assetbundle.json`)) {
            Ress.fx_sl = (Ress.assetmgr.getAssetByName("fx_sl.prefab.json", `fx_sl.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();
        }

        //挂载特效
        /*  if (!this.fx_gx && Ress.fx_gx) {
              let tran = Ress.fx_gx.clone();
              tran.localTranslate.y = 2;
              tran.localTranslate.z = 9.5;
              this.fx_gx = tran.gameObject.getComponent("f14EffectSystem") as m4m.framework.f14EffectSystem;
              this.camCtr.gameObject.transform.addChild(tran);
              this.fx_gx.data.beloop = false;
          }
  */
        if (!this.fx_sl && Ress.fx_sl) {
            let tran = Ress.fx_sl.clone();
            tran.localTranslate.y = 8;
            tran.localTranslate.x = -0.5;
            tran.localTranslate.z = 23;
            this.fx_sl = tran.gameObject.getComponent("f14EffectSystem") as m4m.framework.f14EffectSystem;
            this.camCtr.gameObject.transform.addChild(tran);
        }

        //播放特效
        if (this.fx_gx) {
            this.fx_gx.gameObject.visible = true;
            //this.fx_gx.play(onFinish);
        }

        if (this.fx_sl) {
            this.fx_sl.gameObject.visible = true;
            this.fx_sl.play();
        }
        //完成回调
    }

    /** 隐藏通关特效 */
    static hideCPLevelFx() {
        if (this.fx_gx) this.fx_gx.gameObject.visible = false;
        if (this.fx_sl) this.fx_sl.gameObject.visible = false;
    }

    static dataTracing(chunk) {
        if (!wxTool.wx) return;
        if (chunk.length) {
            const head = `${wxTool.appid}_${wxTool.token}_${GameMgr.gameVersion}_`;
            let data = head + chunk.join('_');
            console.log(data);
            saveTool.sava_statistics(data, chunk.pop());
        }
    }
}