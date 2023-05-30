import { roleHandle } from "./roleHandle";
import { GameMgr } from "../GameMgr";
import { Ress } from "../Ress";
import { uiMgr } from "../uiMgr";
import { MatMgr } from "../MatMgr";
import { roleData } from "./roleData";
import { stageMgr } from '../stageMgr';
import { skinMgr } from '../skinMgr';
import { playerMgr } from './playerMgr';
import { Trailer } from "../lab/Trailer";
import { wxTool } from "../Tool/wxTool";
import { joinTool } from "../Tool/joinTool";
import { commTool } from "../Tool/commTool";
import { PhotoSceneManager } from "../Manager/PhotoSceneManager";
import { AudioMgr } from "audio/AudioMgr";

let help_v2 = new m4m.math.vector2();
let help_v3 = new m4m.math.vector3();
let help_v3_1 = new m4m.math.vector3();
let help_v4 = new m4m.math.vector4();
let help_v4_1 = new m4m.math.vector4();
let help_v4_2 = new m4m.math.vector4();
let help_mtx = new m4m.math.matrix();
export class role {
    godMode = false
    roleD: roleData;
    lastBoost_z: number = -1;
    lastDiamond_z: number = -1;
    root: roleHandle;
    ball: m4m.framework.transform;  // 用来放置 shadow & trailer
    instance: m4m.framework.transform;   // 用来被渲染以及旋转
    mat: m4m.framework.material;
    taril: Trailer;
    boomFx: m4m.framework.f14EffectSystem;
    godFx: m4m.framework.f14EffectSystem;
    shadow: m4m.framework.transform;
    //headBoard: headBoardHandle;
    rankingLable: m4m.framework.label;
    // nameLable : m4m.framework.label;
    private _rankNum: number = -1; //当前名次
    /** 当前名次 */
    get rankNum() { return this._rankNum; };
    mr: m4m.framework.meshRenderer;
    private static tempRoleID = 0;
    constructor(mat: m4m.framework.material, data: roleData) {
        if (!roleHandle.funVibrateShort) {
            roleHandle.funVibrateShort = this.onThouchGround.bind(this);
        }

        this.mat = mat;

        // Create ball
        let ball = new m4m.framework.transform();  // 用来放置 shadow & trailer
        let ballInstance = Ress.character.clone();  // 用来被渲染以及旋转
        // let ballInstance = new m4m.framework.transform();  // 用来被渲染以及旋转
        // ballInstance.localScale.x = ballInstance.localScale.y = ballInstance.localScale.z = 0.5;
        // let mf = ballInstance.gameObject.addComponent('meshFilter') as m4m.framework.meshFilter;
        // mf.mesh = GameMgr.assetMgr.getDefaultMesh("sphere");
        let ballMeshRenderer = ballInstance.gameObject.getComponent('meshRenderer') as m4m.framework.meshRenderer;
        this.mr = ballMeshRenderer;
        ballMeshRenderer.materials[0] = this.mat;
        let collider = ball.gameObject.addComponent('spherecollider') as m4m.framework.spherecollider;
        ball.addChild(ballInstance);


        this.instance = ballInstance;

        this.roleD = data;
        //root
        let rootTran = new m4m.framework.transform();
        this.root = rootTran.gameObject.addComponent(roleHandle.name) as roleHandle;
        m4m.math.vec3Clone(m4m.math.pool.vector3_zero, this.root.gameObject.transform.localTranslate);

        //ball
        this.ball = ball;
        rootTran.name = "role";
        rootTran.addChild(this.ball);
        this.root.ball = ball;
        this.root.realBall = ballInstance;  // which will be rotate
        //add taril
        let tartran = Ress.trail.clone();
        tartran.localTranslate.y -= 0.4;
        this.taril = tartran.gameObject.getComponent(Trailer.name) as Trailer;
        this.taril.play();
        this.taril.mat = MatMgr.Trail_mat;
        this.ball.addChild(tartran);

        //add shadow
        let stran = new m4m.framework.transform();
        stran.name = "shadow_plane";
        stran.localTranslate.y = -0.45;
        stran.localScale.x = stran.localScale.z = 0.13;
        let smf = stran.gameObject.addComponent("meshFilter") as m4m.framework.meshFilter;
        smf.mesh = GameMgr.assetMgr.getDefaultMesh("plane");
        let smr = stran.gameObject.addComponent("meshRenderer") as m4m.framework.meshRenderer;
        smr.materials[0] = MatMgr.shadow_mat;
        this.ball.addChild(stran);
        this.shadow = stran;

        //set collider
        // let c = this.ball.gameObject.getComponent("boxcollider") as m4m.framework.boxcollider;
        // let len = 4;
        // c.center = new m4m.math.vector3(0, 0, len - 1);
        // c.size = new m4m.math.vector3(1, 1, len);

        let c = this.ball.gameObject.getComponent("spherecollider") as m4m.framework.spherecollider;
        let len = 2;
        c.center = new m4m.math.vector3(0, 0, len);

        // c.colliderVisible = true;

        //UI headBoardHandle
        // this.headBoard = uiMgr.genHeadBoardOne();
        // this.headBoard.Obj3d = this.ball;

        //canvasRander
        var t = new m4m.framework.transform();
        var c2d = t.gameObject.addComponent("canvasRenderer") as m4m.framework.canvasRenderer;
        t.localTranslate.y = 1;
        t.localTranslate.x = 0;
        this.ball.addChild(t);
        let opt = m4m.framework.layoutOption;
        //img
        // let ttt =  new m4m.framework.transform2D();
        // let img = ttt.addComponent( "rawImage2D") as  m4m.framework.rawImage2D;
        // ttt.layoutState = opt.H_CENTER | opt.V_CENTER;
        // img.image = GameMgr.assetMgr.getDefaultTexture("white");
        // c2d.addChild(ttt);
        // ttt.width =100;
        // ttt.height =  100;

        //lable
        let t2D = new m4m.framework.transform2D();
        t2D.layoutState = opt.H_CENTER | opt.V_CENTER;
        t2D.setLayoutValue(opt.V_CENTER, 30);
        // t2D.setLayoutValue(opt.V_CENTER,-80);
        let lab = t2D.addComponent("label") as m4m.framework.label;
        t2D.name = `role haed info ${role.tempRoleID++}`;
        //GD3DCreateTool.mountDefFont(lab, assetMgr);
        lab.horizontalType = m4m.framework.HorizontalType.Center;
        lab.fontsize = 150;
        lab.text = "100th";
        lab.horizontalOverflow = true;
        // lab.color = new m4m.math.color(0.2, 0.2, 0.2, 1);
        lab.color = new m4m.math.color(0, 0, 0, 1);
        lab.color2 = new m4m.math.color(0, 0, 0, 0.5);
        t2D.width = 400; t2D.height = 30;
        c2d.addChild(t2D);
        this.rankingLable = lab;
        MatMgr.setHudMat(lab);

        //FX


        this.initialAI();
        let tarns = PhotoSceneManager.createPrimitive();
        stageMgr.stageRoot.addChild(rootTran);
        stageMgr.stageRoot.addChild(tarns);
        // GameMgr.app.getScene().addChild(rootTran);
    }

    //接触地面
    private onThouchGround() {
        wxTool.vibrateShort();
        AudioMgr.Play("touch.mp3");
    }

    private lastRank = -1;
    /** 设置 排名名次 */
    setRank(rank: number) {
        this._rankNum = rank;
        if (!this.ball.gameObject.visible || this.lastRank == rank) return;
        this.lastRank = rank;
        this.rankingLable.text = `${rank}`;
    }

    private lastCgSkinId = 0;  //最后一次 请求换皮肤的id( 避免贴图加载 异步问题 导致显示错误)
    changeSkin(skinId) {
        this.lastCgSkinId = skinId;

        // let info = skinMgr.getSkinInfo(skinId);
        let info = skinMgr.skins_map.get(skinId);
        if (!info) return;

        if (!info.skinSticker || info.skinSticker == "") {
            //没贴图的颜色
            this.mr.materials[0] = this.mat;
            this.mat.setTexture('_MainTex', null);
        } else {
            //有贴图
            if (info.isPBR) {
                skinMgr.getPBRTexture(skinId).then(tex => {
                    let [base, normal] = tex;
                    if (skinId != this.lastCgSkinId) return;
                    this.mr.materials[0] = MatMgr.Role_PBRmat;
                    MatMgr.Role_PBRmat.setTexture('_MainTex', base);
                    MatMgr.Role_PBRmat.setTexture('_NormalTex', normal);
                    MatMgr.Role_PBRmat.setTexture('brdfLUT', Ress.brdfLUT);
                    skinMgr.getCubetex().then(cube => {
                        MatMgr.Role_PBRmat.setCubeTexture('envTex', cube);
                    })
                });
            } else {
                skinMgr.getSkinTexture(skinId).then(tex => {
                    if (skinId != this.lastCgSkinId) return;
                    this.mr.materials[0] = this.mat;
                    this.mat.setTexture('_MainTex', tex);
                });
            }
        }
    }

    initState() {
        this.lastFollowed = false;
        this._rankNum = -1;
        this.godMode = false;
        if (this.boomFx) {
            this.boomFx.stop();
            this.boomFx.gameObject.visible = false;
        }

        this.setVisible(true);
        this.root.initstate();

        //角色名显示
        // if(!this.root.isPlayer && this.roleD ){
        //     if(this.roleD.name.length > 4){
        //         this.nameLable.text = `${this.roleD.name.substring(0,4)}...`;
        //     }else{
        //         this.nameLable.text = `${this.roleD.name}`;
        //     }
        // }
    }

    die() {
        if (!this.boomFx && Ress.fx_die_qiu) {
            let tran = Ress.fx_die_qiu.getCloneTrans();
            MatMgr.setFxMat(tran);

            tran.localTranslate.y = -0.3;
            let f14 = tran.gameObject.getComponent("f14EffectSystem") as m4m.framework.f14EffectSystem;
            this.boomFx = f14;
            this.root.gameObject.transform.addChild(tran);
            this.boomFx.gameObject.visible = false;
        }


        if (this.lastSV && this.boomFx) {
            this.boomFx.gameObject.visible = true;
            this.boomFx.play(this.root.closeUpdate.bind(this.root));
        } else {
            this.root.closeUpdate();
        }
        //头像跟随 关闭
        if (this.lastFollowed) {
            stageMgr.closeHeadFollow();
        }

        this.setVisible(false);
        this.toStop();
    }

    recover() {
        stageMgr.backTrackPlay();
        this.relive();
        setTimeout(() => {
            this.root.stop = false;
        }, (stageMgr.tracingTime + stageMgr.ballEntrytimer) * 1000);
    }

    /** 复活 */
    relive() {
        GameMgr.raceStage = 1;
        if (this.boomFx) {
            this.boomFx.stop();
            this.boomFx.gameObject.visible = false;
        }

        if (!this.godFx && Ress.fx_wd) {  //复活特效 initialization
            let tran = Ress.fx_wd.getCloneTrans();
            MatMgr.setFxMat(tran);
            let s = 0.5;
            tran.localScale = new m4m.math.vector3(s, s, s);
            let f14 = tran.gameObject.getComponent("f14EffectSystem") as m4m.framework.f14EffectSystem;
            this.godFx = f14;
            this.ball.gameObject.transform.addChild(tran);
        }

        if (this.godFx) {
            this.godFx.gameObject.visible = true;
            this.godFx.play();
        }

        this.setVisible(true);
        this.godMode = true;
        // this.root.stop = false;
        this.taril.play();
        setTimeout(() => {
            if (this.godFx) {
                this.godFx.stop();
                this.godFx.gameObject.visible = false;
            }
            this.godMode = false;
        }, 4000);
    }

    /** 减速到0 */
    toSlowdown() {
        this.root.doSlowing();
    }

    /** 减速恢复正常 */
    slowReNormal() {
        this.root.slowReNormal();
    }

    toStop() {
        this.root.stop = true;
        this.taril.stop();
    }

    sensor: m4m.framework.transform = null;

    AIisEnabled = false;
    initialAI() {
        this.AIisEnabled = true;
        let trans = new m4m.framework.transform();
        // trans.localTranslate.z = 5;
        trans.localTranslate.z = 15;
        // trans.localTranslate.y = -2;
        // Create sensor instance

        // let sensor = trans.gameObject.addComponent("boxcollider") as m4m.framework.boxcollider;
        // sensor.center = new m4m.math.vector3(0, 0, 0);
        // sensor.size = new m4m.math.vector3(1.2, 6, 10);

        let sensor = trans.gameObject.addComponent("spherecollider") as m4m.framework.spherecollider;
        sensor.center = new m4m.math.vector3(0, 0, 0);
        sensor.radius = 0.6;
        // sensor.colliderVisible = true;

        // sensor.colliderVisible = true;
        this.sensor = trans;
        this.root.gameObject.transform.addChild(trans);
    }

    //好友头像调整位置
    private adjustHeadIconPos(x, y) {
        //头像跟随 icon
        // let iTrans = uiMgr.scIconImg.transform;
        let iTrans = uiMgr.headIcon;
        iTrans.localTranslate.x = x;
        iTrans.localTranslate.y = y;
        iTrans.markDirty();
    }

    //打开 头像 跟随显示
    private openHeadFollow() {
        //刷新一次 sc （提前保证 需要的头像已加载 ，进游戏时、关卡变化 、好友排行榜数据变化 加载）
        let insId = this.root.gameObject.transform.insId.getInsID();
        if (GameMgr.raceStage == 1) {  //游戏中才绘制子域头像 
            joinTool.openFollowHead(insId);
        }
        //othericon 显示
        uiMgr.otherIconImg.transform.visible = true;
        //加载路人头像
        this.loadPasserbyIcon();
    }

    private iconMap: Map<string, m4m.framework.texture> = new Map();

    private lastIconUrl = "";
    //加载路人头像
    private loadPasserbyIcon() {
        this.lastIconUrl = "";
        uiMgr.otherIconImg.image = null;
        if (!this.roleD || !this.roleD.iconUrl || this.roleD.iconUrl == "") {
            return;
        }

        let url = this.roleD.iconUrl;
        this.lastIconUrl = url;

        if (this.iconMap.has(url)) {
            let img = this.iconMap.get(url);
            uiMgr.otherIconImg.image = img;
        } else {
            commTool.ImgByLoad(url, (tex) => {
                this.iconMap.set(url, tex);
                if (url == this.lastIconUrl) {
                    uiMgr.otherIconImg.image = tex;
                }
            });
        }
    }


    static isOpenFollow = true;  //头像跟随功能开关
    private testOnce = true;
    private readonly ckLimitDis = 45; //限制前方出现头像的距离
    private readonly offsetHead = 1.2; //icon 放置点 y 方向 的偏移
    lastFollowed = false; //上一次是被跟踪的 
    /** 好友头像更随*/
    ckHeadIconFollow(delta: number) {
        if (!role.isOpenFollow) return;
        let b = this.ckCanFollow();
        let isOpen = false;
        if (this.lastFollowed && !b) {
            //执行关闭 跟随
            stageMgr.closeHeadFollow();
        } else if (!this.lastFollowed && b) {
            //开启
            isOpen = true;

        }
        this.lastFollowed = b;
        if (!b) return;

        let cPos = this.root.gameObject.transform.localTranslate;
        // let pos = 
        let pos = help_v3;
        this.calcWPosToDistort(cPos, pos);
        pos.y += this.offsetHead;
        let sen = GameMgr.app.getScene();
        //装换到屏幕坐标
        sen.mainCamera.calcScreenPosFromWorldPos(GameMgr.app, pos, help_v2);
        //转换到canvas 坐标
        uiMgr.overlay.calScreenPosToCanvasPos(help_v2, help_v2);
        if (isOpen) {
            this.openHeadFollow();
        }
        this.adjustHeadIconPos(help_v2.x, help_v2.y);


    }

    /** 检查能否跟随 */
    private ckCanFollow() {
        // if (GameMgr.raceStage != 1 || this.root.isPlayer || this._rankNum == -1) return false;
        if (this.root.isPlayer || this._rankNum == -1) return false;
        let cnum = playerMgr.getRole().rankNum - this._rankNum;
        if (cnum != 1) return false;
        //dist test
        let pPos = playerMgr.getRole().root.gameObject.transform.localTranslate;
        let cPos = this.root.gameObject.transform.localTranslate;
        if (pPos.z > cPos.z || (cPos.z - pPos.z) > this.ckLimitDis) return false;

        return true;
    }

    //计算被蜿蜒的世界坐标
    private readonly DIST = 20; //常数和shader 中对应
    private calcWPosToDistort(currPos: m4m.math.vector3, out: m4m.math.vector3) {
        let sen = GameMgr.app.getScene();
        let rct = sen.renderContext[0];
        let mtxVP = rct.matrixViewProject;
        let mvp_Pos = help_v4;
        mvp_Pos.x = currPos.x;
        mvp_Pos.y = currPos.y;
        mvp_Pos.z = currPos.z;
        mvp_Pos.w = 1;
        //m to mvp 
        m4m.math.matrixTransformVector4(mvp_Pos, mtxVP, mvp_Pos);
        let zOff = mvp_Pos.z / this.DIST;
        let addv4 = help_v4_1;
        m4m.math.vec4ScaleByNum(MatMgr.cacheDistortion, zOff * zOff, addv4);
        m4m.math.vec4Add(mvp_Pos, addv4, mvp_Pos);
        let inv_mtxVP = help_mtx;
        m4m.math.matrixInverse(mtxVP, inv_mtxVP);
        // mvp to m
        let temp = help_v4_2;
        m4m.math.matrixTransformVector4(mvp_Pos, inv_mtxVP, temp);
        out.x = temp.x;
        out.y = temp.y;
        out.z = temp.z;

    }

    private lastSV = true; //显示状态
    /** 设置渲染显示 */
    setVisible(isVisible: boolean) {
        if (isVisible == this.lastSV) return;
        this.lastSV = isVisible;
        if (isVisible) {
            this.ball.gameObject.visible = this.instance.gameObject.visible = this.rankingLable.transform.visible = this.sensor.gameObject.visible = true;
            this.taril.play();
        } else {
            this.ball.gameObject.visible = this.instance.gameObject.visible = this.rankingLable.transform.visible = this.sensor.gameObject.visible = false;
            this.taril.stop();
        }

        if (this.root.isPlayer) {
            this.rankingLable.transform.visible = false;
        }
    }

}