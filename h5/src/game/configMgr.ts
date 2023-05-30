import { skinMgr } from './skinMgr';
import { themeMgr } from './themeMgr';
import { levelMgr } from './levelMgr';
import { inviteMgr } from './inviteMgr';
import { Ress } from './Ress';
export class configMgr {
    static roleBspeed: number; //基础速度
    static roleStepSpeed: number; //加速带每阶增益速度
    static colorSpeed: number; //颜色变化速度
    static DistorSpeed: number; //道路扭曲变化速度
    static DistorVrange: number; //扭曲 纵向范围
    static DistorHrange: number; //扭曲 横向范围
    static obsBaseGap: number; //阻挡物的基础间隔 （原为3 整数）
    static BoostGenSpeed: number;  //加速带新增速度
    static singleCubeGenRate: number;  //单方块出现随机率

    static sceneColorHGap: number;   //场景颜色1（天空） 和 场景颜色2（建筑物） 两者 H 值的 间隔
    static firstColorH: number;    //场景初始色 H (色调) 值 0~360 
    static firstColorS: number;    //场景初始色 S (饱和度) 值 0~100 
    static firstColorV: number;    //场景初始色 V (明度) 值 0~100 
    static speedAddDistance: number; //X 米 后速度增加
    static speedAddRate: number;  //每米增加基础速度 x% ,1+（1*X%)+（1*X%)+（1*X%)...
    static playerMaxSpeed: number; //玩家自己的最大移动速度
    static addMaxStepNum: number; //加速带 叠加 的最大层数
    static stepTimeLength: number; //加速带 加速持续时间

    static DiamonGenSpeed: number;  //钻石新增速度
    static robotBSpeed: number;  //机器人的基础速度
    static robotReSurpassLimit: number;  //限制机器人反超 玩家能看到 大于xx数量的球 时停止反超触发
    static watchVideo: number;  //看视频得金币的数量
    static needRefreshADBanner : boolean; //每一局游戏完后刷新 底部广告

    static PreInit() {
        let conf = Ress.mainConfig;
        // let obj = JSON.parse(conf);
        this.setConf(conf["1"]);
        themeMgr.init();
        inviteMgr.init();
    }

    /** 其他配置初始化 */
    static init(){
        skinMgr.init();
        levelMgr.init();
    }

    private static setConf(obj) {
        for (let k in obj) {
            configMgr[k] = obj[k];
        }
    }

    static print() {
        let c = {};
        for (let k in configMgr) {
            c[k] = configMgr[k];
        }
        console.error(`${JSON.stringify(c)}`);
    }
}