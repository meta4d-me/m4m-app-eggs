import { Ress } from "./Ress"
import { MatMgr } from "./MatMgr"
import { GameMgr } from "./GameMgr"
import { obsCreateMgr, obsStyle } from "./obsCreateMgr"
import { role } from "./role/role"
import { robotMgr } from "./role/robotMgr"
import { WayMgr } from "./WayMgr";
import { mixMesh } from "./Tool/mixMesh"

let v3Zero = new m4m.math.vector3();
let v3One = new m4m.math.vector3(1, 1, 1);
let oneRota = new m4m.math.quaternion(0, 0, 0, 1);
export class PoolMgr {
    static styleTag = "style";
    static init() {
        //各对象的初始化
        for (let i = 0; i < obsStyle.maxLen; i++)
            this.obsMap[i] = [];
        this.initCombineRoad();
    }

    static combinedRoadTemp: m4m.framework.transform;
    static initCombineRoad() {
        let bunchCollect = new m4m.framework.transform();
        let isGray = true;
        for (let i = 0; i < GameMgr.WayBunchLength; i++) {
            let temp = this.createSingleRoad(isGray = !isGray);
            temp.localTranslate.y = 0;
            temp.localTranslate.x = 0;
            temp.localTranslate.z = i * 5;
            bunchCollect.addChild(temp);
        }

        // Combine
        let meshCompressor = new mixMesh();
        let meshRenders = bunchCollect.gameObject.getComponentsInChildren("meshRenderer");
        let picker = meshRenders.map(mr => mr.gameObject.transform);
        if (picker.length > 1) {
            meshCompressor.resetDic();
            GameMgr.app.getScene().update(0);
            let combinedRoot = new m4m.framework.transform();
            let { nobatch, batch, mixMeshId } = meshCompressor.mixMesh(picker);

            for (let id of mixMeshId) {
                let { mesh, mat } = meshCompressor.mixmeshDic[id];
                let trans = new m4m.framework.transform();
                let mf = trans.gameObject.addComponent("meshFilter") as m4m.framework.meshFilter;
                mf.mesh = mesh;
                let meshRender = trans.gameObject.addComponent("meshRenderer") as m4m.framework.meshRenderer;
                meshRender.materials = [mat];
                combinedRoot.addChild(trans);
            }

            return this.combinedRoadTemp = combinedRoot;
        }

        return this.combinedRoadTemp = bunchCollect;
    }

    //地面
    // static wayAdditionCounter = GameMgr.WayBunchLength;
    private static isgreyTag = "isgreyTag";
    private static floorMap: { [t: number]: m4m.framework.transform[] } = { 0: [], 1: [] };
    static createSingleRoad(isGray) {
        let temp = Ress.floor.clone();
        let mat;
        if (isGray) { // 切换黑白
            temp[this.isgreyTag] = true;
            mat = MatMgr.Floor_mat_1;
        }
        else
            mat = MatMgr.Floor_mat_0;

        let mr = temp.gameObject.getComponent("meshRenderer") as m4m.framework.meshRenderer;
        mr.materials[0] = mat;
        return temp;
    }
    static new_floor() {
        // let arr = isgrey? this.floorMap[1] : this.floorMap[0];
        let arr = this.floorMap[0];

        // if(this.wayAdditionCounter++ == GameMgr.WayBunchLength) {
        // this.wayAdditionCounter = 1;
        if (arr.length < 1) {

            return this.combinedRoadTemp.clone();
        } else {
            let temp = arr.pop();
            temp.gameObject.visible = true;
            return temp;
        }
        // } else {
        //     return null;
        // }

    }
    static delete_floo(floor: m4m.framework.transform) {
        if (!floor) return;
        this.floorMap[0].push(floor);



        // let isgrey = floor[this.isgreyTag]? true: false;
        //  if(isgrey)
        //     this.floorMap[1].push(floor);
        // else
        //     this.floorMap[0].push(floor);
    }

    //障碍
    private static obsMap: { [t: number]: m4m.framework.transform[] } = {};
    static new_obs(style: number) {
        let arr = this.obsMap[style];
        if (arr.length < 1) {
            let temp = obsCreateMgr.getObs(style).clone();
            temp[this.styleTag] = style;
            m4m.math.quatFromEulerAngles(0, 0, 0, temp.localRotate);
            return temp;
        } else {
            let temp = arr.pop();
            temp.gameObject.visible = true;
            return temp;
        }
    }

    static delete_obs(obs: m4m.framework.transform) {
        if (!obs) return;
        let style = obs[this.styleTag];
        m4m.math.vec3Clone(m4m.math.pool.vector3_zero, obs.localTranslate);
        let r = obs.localRotate;
        r.x = r.y = r.z = 0;
        r.w = 1;
        this.obsMap[style].push(obs);
    }

    //加速带
    private static boosts: m4m.framework.transform[] = [];
    private static cacheBoost: m4m.framework.transform;
    static new_Boost() {
        let arr = this.boosts;
        if (arr.length < 1) {
            if (!this.cacheBoost) {
                let temp = Ress.boost.clone();
                temp.gameObject.tag = GameMgr.BoostTag;
                let mr = temp.gameObject.getComponent("meshRenderer") as m4m.framework.meshRenderer;
                mr.materials[0] = MatMgr.boost_mat_0;
                let bc = temp.gameObject.getComponent("boxcollider") as m4m.framework.boxcollider;
                bc.size = new m4m.math.vector3(1, 1, 2);
                bc.center = new m4m.math.vector3(0, 1, 0);
                // bc.colliderVisible = true;
                this.cacheBoost = temp;
            }
            return this.cacheBoost.clone();
        } else {
            let temp = this.boosts.pop();
            temp.gameObject.visible = true;
            return temp;
        }
    }

    static delete_Boost(boost: m4m.framework.transform) {
        if (!boost) return;
        this.boosts.push(boost);
    }

    //建筑
    private static buildings: m4m.framework.transform[] = [];
    private static cacheBuilding: m4m.framework.transform;
    static new_building() {
        let arr = this.buildings;
        if (arr.length < 1) {
            if (!this.cacheBuilding) {
                let temp = Ress.decoraion1.clone();
                let mat = MatMgr.Comm_mat_0;
                let mr = temp.gameObject.getComponent("meshRenderer") as m4m.framework.meshRenderer;
                mr.materials[0] = mat;
                this.cacheBuilding = temp;
            }
            return this.cacheBuilding.clone();
        } else {
            let temp = arr.pop();
            temp.gameObject.visible = true;
            return temp;
        }
    }

    static delete_building(building: m4m.framework.transform) {
        if (!building) return;
        building.gameObject.visible = false;
        this.buildings.push(building);
    }

    //建筑
    private static buildingslices: m4m.framework.transform[] = [];
    static new_buildingSlice() {
        let arr = this.buildingslices;
        if (arr.length < 1) {
            return WayMgr.buildingslice.clone();
        } else {
            let temp = arr.pop();
            temp.gameObject.visible = true;
            return temp;
        }
    }

    static delete_buildingslice(building: m4m.framework.transform) {
        if (!building) return;
        building.gameObject.visible = false;
        this.buildingslices.push(building);
    }

    //机器人
    public static robots: role[] = [];
    static new_robot() {
        let arr = this.robots;
        if (arr.length < 1) {
            let instance = robotMgr.createInstance();
            return instance;
        } else {
            let temp = arr.pop();
            temp.root.gameObject.visible = true;
            temp.ball.gameObject.visible = true;
            temp.ball.localTranslate.y = 0;
            temp.ball.localTranslate = temp.ball.localTranslate;
            temp.initState();
            return temp;
        }
    }

    static delete_robot(soul: role) {
        if (!soul) return;
        soul.ball.gameObject.visible = false;
        this.robots.push(soul);
    }

    //金币
    private static coins: m4m.framework.transform[] = [];
    private static cacheCoins: m4m.framework.transform;
    static new_Coin() {
        let arr = this.coins;
        if (arr.length < 1) {
            if (!this.cacheCoins) {
                let ptran = Ress.jinbi.clone();
                ptran.gameObject.tag = GameMgr.CoinTag;
                let temp = ptran.children[0];
                let mr = temp.gameObject.getComponent("meshRenderer") as m4m.framework.meshRenderer;
                mr.materials[0] = MatMgr.coin_mat;
                // let bc = temp.gameObject.getComponent( "boxcollider") as m4m.framework.boxcollider;
                // bc.size = new m4m.math.vector3(1,1,1);
                // bc.center = new m4m.math.vector3(0,1,0);
                //bc.colliderVisible = true;
                this.cacheCoins = ptran;
            }
            return this.cacheCoins.clone();
        } else {
            let temp = this.coins.pop();
            temp.gameObject.visible = true;
            temp.children[0].gameObject.visible = true;
            return temp;
        }
    }

    static delete_Coin(diamond: m4m.framework.transform) {
        if (!diamond) return;
        this.coins.push(diamond);
    }

    //空 transform 
    private static transforms: m4m.framework.transform[] = [];
    static new_transform() {
        let arr = this.transforms;
        if (arr.length < 1) {
            return new m4m.framework.transform();
        } else {
            let temp = arr.pop();
            temp.gameObject.visible = true;
            return temp;
        }
    }

    static delete_transform(tras: m4m.framework.transform) {
        if (!tras) return;
        m4m.math.vec3Clone(v3Zero, tras.localTranslate);
        m4m.math.vec3Clone(v3One, tras.localScale);
        m4m.math.quatClone(oneRota, tras.localRotate);
        this.transforms.push(tras);
    }


}