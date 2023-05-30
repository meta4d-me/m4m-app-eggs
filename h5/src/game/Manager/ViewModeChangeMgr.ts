import { commTool } from "Tools/commTool";
import { gameMathUtil } from "Tools/gameMathUtil";
import { StageMgr } from "../Core/StageMgr";
import { role } from "../role/role";
import { stageMgr } from "../stageMgr";

export enum ViewModeType {
    /** 普通视角 */
    Normal,
    /** 换装视角 */
    PartChange,
}

/** 视角选项 */
export type ViewOpt = {
    /** 相机 距离 */
    camDist?: number,
    /** 相机 FOV */
    camFOV?: number,
    /** 相机 Y轴偏移点 */
    camYOffset?: number,
};
/** 视角模式切换 管理器 */
export class ViewModeChangeMgr {
    private static readonly helpV3 = new m4m.math.vector3();

    private static currMode: ViewModeType = ViewModeType.Normal;
    private static viewOptMap: { [mode: number]: ViewOpt } = {};
    public static Init() {
        //Normal
        this.viewOptMap[ViewModeType.Normal] = { camDist: 0, camFOV: 0, camYOffset: 0 };
        //PartChange
        this.viewOptMap[ViewModeType.PartChange] = { camDist: 6, camFOV: 25, camYOffset: 0.4 };
    }

    /**
     * 设置指定模式的 选项
     * @param mode view模式
     * @param opt 选项数据
     */
    public static setViewOpt(mode: ViewModeType, opt: ViewOpt) {
        if (!opt || mode == null) { return; }
        let useOpt = this.viewOptMap[mode];
        if (!useOpt) {
            console.warn(`没有 mode ：${ViewModeType[mode]}.`);
            return;
        }
        for (let key in opt) {
            useOpt[key] = opt[key];
        }
    }

    /**
     * 模式改变
     * @param mode 视角模式
     * @param vOpt 强行指定选项
     */
    public static change(mode: ViewModeType, vOpt?: ViewOpt) {
        if (mode == this.currMode) { return; }
        this.currMode = mode;
        // tslint:disable-next-line: no-parameter-reassignment
        if (!vOpt) { vOpt = {}; }
        if (mode != ViewModeType.Normal) {
            this.capNormalOpt();
        }
        if (mode == ViewModeType.PartChange) {
            this.calcaFrontPAngle(mode);
        }
        //set opt
        let opt = this.viewOptMap[mode];
        let camCtr = stageMgr.camCtr;
        let cam = m4m.framework.sceneMgr.scene.mainCamera;
        // console.log(opt.pAngle);
        // console.log(opt.tAngle);
        //to set
        camCtr.distance = vOpt.camDist ?? opt.camDist;
        cam.fov = (vOpt.camFOV ?? opt.camFOV) * commTool.toRadian;
        let offset = camCtr["_targetOffset"];
        camCtr.setTargetOffset(offset.x, vOpt.camYOffset ?? opt.camYOffset, offset.z);
    }

    //计算朝向角色 正前方的P角度
    private static calcaFrontPAngle(mode: ViewModeType) {
        // let angle = 0;
        // // let role = RoleMgr.getRoleByGUID(StageMgr.PlayerGUID);
        // let role = role
        // if (role && role.roleDoll && role.roleDoll.model) {
        //     let node = role.roleDoll.model.rawHandle as m4m.framework.transform;
        //     let v3 = this.helpV3;
        //     node.getForwardInWorld(v3);
        //     angle = gameMathUtil.calcAngleByVec(v3.x, v3.z) + 90;
        // }
        // let opt = this.viewOptMap[mode];
    }

    //记录普通状态
    private static capNormalOpt() {
        let camCtr = stageMgr.camCtr;
        let cam = m4m.framework.sceneMgr.scene.mainCamera;
        let opt = this.viewOptMap[ViewModeType.Normal];
        opt.camDist = camCtr.distance;
        opt.camFOV = cam.fov * commTool.toDeg;
        opt.camYOffset = camCtr["_targetOffset"].y;
    }
}