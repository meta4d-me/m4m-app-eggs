import { MatMgr } from "../MatMgr";
import { role } from "./role";
import { PoolMgr } from "../PoolMgr";

import { configMgr } from "../configMgr"

import { stageMgr } from "../stageMgr"
import { roleData } from "./roleData";


export class robotMgr {
    //玩家速度
    static get RoleSpeed() {
        if (!this._role) return 0;
        return this._role.root.raelSpeed;
    }
    private static moveSpeed: number;
    private static _role: role;
    static getRole(id) { return this.robotPool[id]; };

    static createInstance() {
        let randomMatIndex = Math.floor(Math.random() * MatMgr.Robot_mats.length);
        //let _role = new role(MatMgr.Robot_mats[randomMatIndex], roleData.list[this.robotPool.length]);
        let _role = new role(MatMgr.Robot_mats[randomMatIndex], new roleData());
        // _role.root.currSpeed = this.robotSpeed;
        // let gm = _role.root.ball.gameObject;
        // gm.transform.localTranslate.z = offset;
        // gm.transform.markDirty();
        // let mr = gm.getComponent("meshRenderer") as m4m.framework.meshRenderer;
        // MatMgr.Role_mat.setVector4("_MainColor",new m4m.math.vector4(Math.random(),Math.random(),Math.random(),1));
        // MatMgr.Role_mat.setVector4("_MainColor",new m4m.math.vector4(0.9,0.9,0.9,1));
        // mr.materials[0] = MatMgr.Robot_mats[randomMatIndex];

        //水平move
        // Inputer.onHorizTouch = this.onHorizTouch.bind(this);
        return _role;
    }

    static robotPool: role[] = [];

    /** 场景添加机器人 */
    static addRobot(offset = 0) {
        let _role = PoolMgr.new_robot();
        this.robotPool.push(_role);
        this.setRobotStage(offset);
        _role.root.currSpeed = configMgr.robotBSpeed;
        // this.toRace();
    }
    /**删除机器人 */
    static removeRobot(id) {
        PoolMgr.delete_robot(this.robotPool[id]);
        // this.robotPool.splice(id, 1)
        this.robotPool[id] = null;
    }

    //
    static setRobotStage(offset, id = robotMgr.robotPool.length - 1) {
        //this.getRole(id).roleD = roleData.list[this.robotPool.length]; // FIX: roleData
        let gm = this.robotPool[id].root.gameObject;
        gm.transform.localTranslate.z = offset;
        gm.transform.localTranslate.x = Math.random() * 10 - 5;
        gm.transform.localTranslate = gm.transform.localTranslate;
    }

    // static initState(){
    //     this._role.ball.initstate();
    // }

    private static sacle = 0.03;
    //水平move
    // private static onHorizTouch(delta:number){
    //     if(!this._role) return;
    //     let ball = this._role.ball;
    //     ball.horizMove(delta * this.sacle);
    // }

    // static regStepBC(callBack:(step:number)=>any){
    //     if(!this._role)return;

    //     this._role.ball.onStepCg = callBack;
    // }

    //死亡
    static toDie(id, isSpec = false) {
        // if(isSpec == false && this.getRole(id).roleD != null)

        // else
        // runingPage.Instance.tipMessage(`玩家${this.getRole(id).roleD.name}非正常死亡`);

        // GameMgr.raceStage = -1;
        //this.getRole(id).toStop();
        this.getRole(id).die();
        this.removeRobot(id);
        this.remain--;
        // uiMgr.showRootUI();
        // console.error(" you die ,game over ");
        // 如果当前机器人是最后一个
        // if(this.remain == 1 && isSpec == false) {
        //     stageMgr.gameOverConsole();
        // }        
    }

    //跳起
    static toJump(id) {
        this.getRole(id).root.jump();
    }

    //加速
    static toBoost(id) {
        this.getRole(id).root.boost();
    }

    static toRace(id = robotMgr.robotPool.length - 1) {
        // this.getRole(id).root.currSpeed = 50;
        let role = this.getRole(id);
        role.root.stop = false;
        role.taril.play();

    }

    // static placeRobots() {
    //             // 添加 机器人
    //     // debugger;
    //     // this.addRobot(-15);
    //     // this.addRobot(-10);
    //     // this.addRobot(-5);

    //     for(let i = 0; i < 30; i++) {
    //         this.addRobot(i*50);            
    //     }
    // }

    static deleteAll() {
        this.allAct((id) => {
            this.toDie(id, true);
        });

        this.robotPool = [];
    }

    /** 全员停止 */
    static stopAll() {
        this.allAct((id) => {
            this.getRole(id).root.stop = true;
        });
    }

    /** 取消全员停止 */
    static unStopAll() {
        this.allAct((id) => {
            this.getRole(id).root.stop = false;
        });
    }
    /** 取消全员减速*/
    static toSlowdownAll() {
        this.allAct((id) => {
            this.getRole(id).toSlowdown();
        });
    }

    /** 取消全员恢复到正常速度 */
    static SlowReNormalAll() {
        this.allAct((id) => {
            this.getRole(id).slowReNormal();
        });
    }

    private static allAct(eachFun: (id) => any) {
        let amount = this.robotPool.length;
        for (let id = 0; id < amount; id++) {
            if (this.getRole(id) != null) {
                eachFun(id);
            }
        }
    }

    static AIdistance: number;
    static visibleRange: number;
    static AITotalAmount: number;
    static playerOffset: number;
    static remain: number;
    // static nextCP: number;
    static config_CheckpointDistance: number;
    // static destroyRate: number;
    /** 场景中初始安放机器人 */
    static placeRobots() {
        this.deleteAll(); // 删除所有存活的机器人

        // 通过当前关卡配置计算机器人生成位置
        this.AITotalAmount = stageMgr.currentLevel.amount - 1;
        let offset = 1;
        let totalLength = stageMgr.currentLevel.length - offset;
        let robotEnd = totalLength - totalLength / configMgr.roleBspeed * configMgr.robotBSpeed;
        this.AIdistance = robotEnd / this.AITotalAmount;

        // this.AIdistance = configMgr.RobotsGenDistance/2 *3;
        this.visibleRange = 19 * 5;
        //this.AITotalAmount = 100 - 1;
        this.playerOffset = 0;

        // this.nextCP = this.config_CheckpointDistance = configMgr.robotsCPDistance;
        // this.destroyRate = configMgr.robotsDieRate;


        this.remain = this.AITotalAmount + 1;
        // let alreadyExistAmount = this.visibleRange / this.AIdistance;
        let minGap = 5 * configMgr.obsBaseGap;
        // this.AIdistance = this.AIdistance < minGap ? minGap : this.AIdistance;
        this.AIdistance = minGap;
        for (let i = 0; i < this.AITotalAmount; i++) {   // 创建所有robot
            this.addRobot((i + 1) * this.AIdistance);
        }

        this.stopAll();
    }

    //动态添加到场景
    // static dynamicAddRobot(dist, currentStep) {
    //     this.playerOffset += dist;
    //     let passedAI = Math.floor(this.playerOffset / this.AIdistance);        
    //     // if(dist != 0) {
    //     //     let existAI = this.robotPool.length;
    //     //     if(passedAI > existAI && existAI < this.AITotalAmount) {
    //     //         this.addRobot(currentStep * 5 + this.visibleRange);
    //     //         // this.addRobot(passedAI * this.AIdistance);
    //     //         this.toRace();
    //     //         // console.error("=== Add robot " + passedAI);
    //     //     }
    //     // }

    //     // Kill Robot
    //     for(let i = 0; i < passedAI; i++) {
    //         let agent = this.robotPool[i];
    //         if(agent && agent.root.isDropout) {
    //             agent.root.timeToLive -= 0.01;
    //             if(agent.root.timeToLive < 0) {
    //                 this.toDie(i);
    //                 // console.error('Drop out id: ' + i);
    //             }
    //         }
    //     }
    //     let currentDistance = playerMgr.getRole().root.gameObject.transform.localTranslate.z;
    //     // let currentDistance = currentStep * 5;
    //     if((currentDistance - this.nextCP) > 0) {
    //         this.nextCP += this.config_CheckpointDistance;            
    //         if(Math.random() < this.destroyRate) {
    //             if(this.robotPool.length < this.AITotalAmount) {
    //                 let id = robotMgr.robotPool.length;
    //                 this.addRobot(0);
    //                 this.toRace(id);
    //                 this.toDie(id);

    //             } else {
    //                 for(let i = 0, l = this.robotPool.length; i < l; i++) {
    //                     let cur = this.getRole(i) as role;
    //                     if(cur !== null && (cur.root.gameObject.transform.localTranslate.z - currentDistance) > this.visibleRange) {
    //                         this.toDie(i);
    //                         return;
    //                     }
    //                 }
    //             }
    //         } 
    //     }

    // }

    /** 开始游戏 */
    static startGame() {
        let amount = this.robotPool.length;
        let count = 0;
        for (let id = 0; id < amount; id++) {
            if (this.getRole(id) != null) {
                count++;
                this.toRace(id);
            }
        }
    }
}