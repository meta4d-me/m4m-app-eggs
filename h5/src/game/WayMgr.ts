import { GameMgr } from "./GameMgr";
import { PoolMgr } from "./PoolMgr";
import { MatMgr } from "./MatMgr";
import { RoadGroupMgr } from "./RoadGroupMgr";
import { roleHandle } from "./role/roleHandle";
import { stageMgr } from "./stageMgr";
import { mixMesh } from "./Tool/mixMesh";
import { LateUpdateMgr } from "Tools/LateUpdateMgr";

//道路 管理器
export class WayMgr {

    private static obsMap: { [step: number]: m4m.framework.transform } = {};
    private static buildingMap: { [step: number]: m4m.framework.transform[] } = {};
    private static floorMap: m4m.framework.transform[];
    private static plane_h = 5;
    private static plane_w = 10;
    static roleSteepNum = 0;
    private static tailSteepNum;
    private static headSteepNum;
    private static floorY = -0.6;
    //角色的位置
    //预先铺设量
    private static readonly maxNum = 23;
    private static raodRoot: m4m.framework.transform;
    private static combindedRoadRoot: m4m.framework.transform;
    private static buildRoot: m4m.framework.transform;
    private static buildSliceRoot: m4m.framework.transform;
    private static finalLineTag = "finalLineTag";

    static preInit() {
        this.raodRoot = new m4m.framework.transform();
        this.buildRoot = new m4m.framework.transform();
        this.combindedRoadRoot = new m4m.framework.transform();
        this.buildSliceRoot = new m4m.framework.transform();
        let sRoot = stageMgr.stageRoot;
        sRoot.addChild(this.raodRoot);
        sRoot.addChild(this.buildRoot);
        sRoot.addChild(this.combindedRoadRoot);
        sRoot.addChild(this.buildSliceRoot);

        //this.combinedBuilding();
        //this.createFloor();//
        this.oneFloor();
    }

    static init() {

        this.combinedBuilding();

        this.initState(); //

        // 初始化终点线
        this.finalLine = PoolMgr.createSingleRoad(false);
        this.finalLine[this.finalLineTag] = true;
        let mr = this.finalLine.gameObject.getComponent('meshRenderer') as m4m.framework.meshRenderer;
        this.finalLineOldMat = mr.materials[0];
        mr.materials[0] = MatMgr.finishLine;

        //FrameMgr.Add(this.varUpdate,this); //帧监听
        LateUpdateMgr.Add(this.varUpdate, this); //帧监听
    }

    static initState() {
        this.totalStepAmount = Math.floor(stageMgr.currentLevel.length / this.plane_h);

        this.headSteepNum = -2;
        this.tailSteepNum = this.roleSteepNum = this.inCount = 0;
        this.floorCombinedHeadSteepNum = -2;
        this.floorCombinedTailSteepNum = -2;
        //buildingMap to pool
        this.buildingMap = {};
        this.obsMap = {};
        this.floorMap = [];
        let blen = 0;
        if (this.buildRoot.children)
            blen = this.buildRoot.children.length;
        for (let i = 0; i < blen; i++) {
            let b = this.buildRoot.children[i];
            if (b)
                PoolMgr.delete_building(b);
        }

        for (let road of this.combindedRoadRoot.children) {
            PoolMgr.delete_floo(road);
        }
        for (let building of this.buildSliceRoot.children) {
            PoolMgr.delete_buildingslice(building);
        }
        //obs to pool
        let len = 0;
        if (this.raodRoot.children)
            len = this.raodRoot.children.length;
        for (let i = 0; i < len; i++) {
            this.desFloorOne();
        }

        // reset 终点线
        // if(this.finalLine) {
        //     let mr = this.finalLine.gameObject.getComponent('meshRenderer') as m4m.framework.meshRenderer;
        //     mr.materials[0] = this.finalLineOldMat;
        // }

        // PoolMgr.wayAdditionCounter = GameMgr.WayBunchLength; // 初始化计数器

        // this.combinedBuilding();
        //初始生成一段
        for (let i = 0; i < this.maxNum; i++) {
            this.genOne();
        }
        this.createFloor();

    }

    static totalStepAmount: number = 0; // 本局总长度
    static safeAreaStep: number = 10;    // 终点线前的无障碍区域阶数

    //get obs by stepnum
    static getObs(stepNum: number) {
        return this.obsMap[stepNum];
    }

    //生成一段
    private static finalLine: m4m.framework.transform;
    private static finalLineOldMat: m4m.framework.material;
    private static genOne() {
        let Z = this.headSteepNum * this.plane_h;

        // let floor = new m4m.framework.transform(); // 创建一个空物体来存放当前的障碍物
        let floor = PoolMgr.new_transform(); // 创建一个空物体来存放当前的障碍物
        this.raodRoot.addChild(floor); // 把当前道路放在场景里的roadRoot
        floor.localTranslate.y = this.floorY; // 初始化位置 NOTE: prefab的位置
        floor.localTranslate.x = 0;
        floor.localTranslate.z = Z; // 位置偏移
        floor.localTranslate = floor.localTranslate;
        //地面
        // let floorCombined =  this.createFloor(); // 从池里创建地面
        // if (floorCombined != null) {
        //     this.FloorBunchsRoot = floorCombined;
        //     this.combindedRoadRoot.addChild(floorCombined); // 保存合并mesh后的长条地面
        //     m4m.math.vec3Clone(floor.localTranslate, floorCombined.localTranslate);
        //     floorCombined.markDirty();

        //     let buildingSlice = PoolMgr.new_buildingSlice();
        //     buildingSlice.localTranslate.z = Z;
        //     this.buildSliceRoot.addChild(buildingSlice);


        //     // this.floorMap.push(floor);
        // }

        if (this.headSteepNum == this.totalStepAmount) { // 终点线 叠加在道路上
            this.finalLine.localTranslate.y = this.floorY + 0.1;
            this.finalLine.localTranslate.x = 0;
            this.finalLine.localTranslate.z = Z;
            this.finalLine.localTranslate = this.finalLine.localTranslate;
            this.raodRoot.addChild(this.finalLine);
        }
        //障碍物
        if (this.headSteepNum < this.totalStepAmount - this.safeAreaStep) {  // 终点线前无障碍
            let obs = this.createObs();
            if (obs) {
                this.obsMap[this.headSteepNum] = obs;
                // obs.localTranslate.z = Z;
                obs.markDirty();
                floor.addChild(obs);
            }
        }
        //建筑物
        // this.createBuilding(Z);
        roleHandle.headSteepNum = ++this.headSteepNum;
    }

    //销毁一段
    private static desOne() {
        //    // delete this.obsMap[this.tailSteepNum];
        //     let barr = this.buildingMap[this.tailSteepNum];
        //     if(barr && barr.length > 0){  //d building
        //         barr.forEach(sub=>{
        //             if(sub) PoolMgr.delete_building(sub);
        //         });
        //     }
        //     delete this.buildingMap[this.tailSteepNum];
        roleHandle.tailSteepNum = ++this.tailSteepNum;

        this.desFloorOne();
    }

    //销毁一段 地面 & 地面上的物体
    private static desFloorOne() {
        let fcs = this.raodRoot.children;
        if (!fcs || fcs.length < 1) return;
        let ftemp = fcs.shift();
        if (ftemp[this.finalLineTag]) return;
        //obs des
        let ftempArr = ftemp.children;
        if (ftempArr)
            for (let i = 0; i < ftempArr.length; i++) {
                let temp = ftempArr[i];
                ftemp.removeChild(temp);
                if (temp[PoolMgr.styleTag] !== undefined) { //obs
                    PoolMgr.delete_obs(temp);
                }
                if (temp.gameObject.tag == GameMgr.BoostTag) {
                    //boost
                    PoolMgr.delete_Boost(temp);
                } else if (temp.gameObject.tag == GameMgr.CoinTag) {
                    PoolMgr.delete_Coin(temp);
                }
            }

        PoolMgr.delete_transform(ftemp);
    }

    private static isGrey = false;
    private static floorCombinedHeadSteepNum: number;
    private static floorCombinedTailSteepNum: number;
    private static createFloor() {
        this.oneFloor();
        this.oneBuildingSlice();
        this.floorCombinedTailSteepNum += GameMgr.WayBunchLength;


        // let floorCombined = PoolMgr.new_floor();
        // //let temp = new m4m.framework.transform();
        // let Z = this.floorCombinedTailSteepNum * this.plane_h;
        // this.floorCombinedTailSteepNum+=GameMgr.WayBunchLength;

        // // if(this.raodRoot.children)
        // //console.error(` num ${this.raodRoot.children.length} `);
        // this.combindedRoadRoot.addChild(floorCombined); // 保存合并mesh后的长条地面
        // //floorCombined.localTranslate.y = - 0.5; // 初始化位置 NOTE: prefab的位置
        // floorCombined.localTranslate.y = this.floorY; // 初始化位置 NOTE: prefab的位置
        // floorCombined.localTranslate.x = 0;
        // floorCombined.localTranslate.z = Z;
        // floorCombined.markDirty();

        // let buildingSlice = PoolMgr.new_buildingSlice();
        // buildingSlice.localTranslate.z = Z;
        // this.buildSliceRoot.addChild(buildingSlice);

    }
    //一个地板。。
    private static oneFloor() {
        let floorCombined = PoolMgr.new_floor();
        let Z = this.floorCombinedTailSteepNum * this.plane_h;
        this.combindedRoadRoot.addChild(floorCombined); // 保存合并mesh后的长条地面
        floorCombined.localTranslate.y = this.floorY; // 初始化位置 NOTE: prefab的位置
        floorCombined.localTranslate.x = 0;
        floorCombined.localTranslate.z = Z;
        floorCombined.localTranslate = floorCombined.localTranslate;
    }

    //一个建筑。。
    private static oneBuildingSlice() {
        let Z = this.floorCombinedTailSteepNum * this.plane_h;
        let buildingSlice = PoolMgr.new_buildingSlice();
        buildingSlice.localTranslate.z = Z;
        this.buildSliceRoot.addChild(buildingSlice);
    }

    private static deleteFloor() {
        let slice = this.combindedRoadRoot.children.shift();
        PoolMgr.delete_floo(slice);

        let building = this.buildSliceRoot.children.shift();
        building.gameObject.visible = false;
        PoolMgr.delete_buildingslice(building);
        this.floorCombinedHeadSteepNum += GameMgr.WayBunchLength;
    }

    private static createObs() {
        return RoadGroupMgr.getOne();
    }

    private static inCount = 0;
    private static createBuilding(z: number) {
        this.inCount++;
        if (this.inCount <= 5) {
            return;
        }
        this.inCount = 0;
        let sRate = 2;

        let temp_0 = PoolMgr.new_building();
        let temp_1 = PoolMgr.new_building();

        temp_1.localTranslate.z = temp_0.localTranslate.z = z;
        //y -5 - 26
        temp_1.localTranslate.y = temp_0.localTranslate.y = -5;
        temp_1.localScale.y = Math.random() * sRate + 0.1;
        temp_0.localScale.y = Math.random() * sRate + 0.1;
        //x
        temp_1.localTranslate.x = Math.random() * -6 - 11;
        temp_0.localTranslate.x = Math.random() * 6 + 11;

        this.buildingMap[this.headSteepNum] = [temp_1, temp_0];
        
        temp_1.localScale = temp_1.localScale;
        temp_1.localTranslate = temp_1.localTranslate;
        temp_0.localScale = temp_0.localScale;
        temp_0.localTranslate = temp_0.localTranslate;
        this.buildRoot.addChild(temp_0);
        this.buildRoot.addChild(temp_1);
    }
    static buildingslice: m4m.framework.transform;
    static combinedBuilding() {
        let blen = 0;
        if (this.buildRoot.children)
            blen = this.buildRoot.children.length;
        for (let i = 0; i < blen; i++) {
            let b = this.buildRoot.children[i];
            if (b)
                PoolMgr.delete_building(b);
        }

        for (let i = 0; i < GameMgr.WayBunchLength; i++) {
            this.createBuilding(i * this.plane_h);
        }
        let meshCompressor = new mixMesh();
        let meshRenders = this.buildRoot.gameObject.getComponentsInChildren("meshRenderer");
        let picker = meshRenders.map(mr => mr.gameObject.transform)
        GameMgr.app.getScene().update(0); //计算世界坐标
        this.buildingslice = new m4m.framework.transform();
        if (picker.length > 1) {
            meshCompressor.resetDic();
            let { nobatch, batch, mixMeshId } = meshCompressor.mixMesh(picker, m4m.render.VertexFormatMask.Position | m4m.render.VertexFormatMask.Normal | m4m.render.VertexFormatMask.Color);
            // // Built
            for (let id of mixMeshId) {
                let { mesh, mat } = meshCompressor.mixmeshDic[id];
                let trans = new m4m.framework.transform();
                let mf = trans.gameObject.addComponent("meshFilter") as m4m.framework.meshFilter;
                mf.mesh = mesh;
                let meshRender = trans.gameObject.addComponent("meshRenderer") as m4m.framework.meshRenderer;
                meshRender.materials = [mat];
                this.buildingslice.addChild(trans);
            }
        }

        blen = 0;
        if (this.buildRoot.children)
            blen = this.buildRoot.children.length;
        for (let i = 0; i < blen; i++) {
            let b = this.buildRoot.children[i];
            if (b)
                PoolMgr.delete_building(b);
        }
    }

    private static varUpdate() {
        if (GameMgr.raceStage != 1) return;

        if (this.roleSteepNum + this.maxNum > this.headSteepNum - 6) {
            //let len = 2;
            let len = (this.roleSteepNum + this.maxNum) - (this.headSteepNum - 6);
            while (len > 0) {
                this.genOne();
                len--;
            }
        }

        if (this.roleSteepNum > this.tailSteepNum + 10) {
            let len = 2;
            while (len > 0) {
                this.desOne();
                len--;
            }
        }
        if (this.roleSteepNum > this.floorCombinedTailSteepNum - GameMgr.WayBunchLength * 0.2) {
            this.createFloor();
        }
        if (this.roleSteepNum > this.floorCombinedHeadSteepNum + GameMgr.WayBunchLength * 1.2) {
            this.deleteFloor();
        }
    }

    //0 - 4 Num ， left to right
    private static getXbyNum(num: number) {
        num = num < 0 ? 0 : num > 4 ? 4 : num; //limit
        return num * 2 - 4;
    }

}