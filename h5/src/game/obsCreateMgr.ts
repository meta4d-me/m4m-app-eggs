import {Ress} from "./Ress";
import {MatMgr} from "./MatMgr";
import {GameMgr} from "./GameMgr";
import {HMoveHandle} from "./Scripts/HMoveHandle";
import { mixMesh } from "./Tool/mixMesh";
export enum obsStyle{
    singe,
    ramp_0,ramp_1,ramp_2,ramp_3,ramp_4,ramp_5, //坡道
    gate_0,gate_1,gate_2,  //门 
    gateH_0,gateH_1,gateH_2,  //半门
    L_0,L_1,L_2,  //I 、 L （3）
    T_0,T_1,T_2,T_3, //(4)
    Y_0,Y_1,Y_2,Y_3,Y_4, //(5)
    maxLen //全长
}
export class obsCreateMgr
{

    private static readonly Tag_ramp = "ramp";
    static readonly Tag_lowGate = "Tag_lowGate";
    private static posBlock = [
        [0, 0], [2, 0], [4, 0], [6, 0], [8, 0],
        [0, 2], [2, 2], [4, 2], [6, 2], [8, 2],
        [0, 4], [2, 4], [4, 4], [6, 4], [8, 4],
        [0, 6], [2, 6], [4, 6], [6, 6], [8, 6],
    ];
    // static safetyLUT = [
    //     [-4.5, 4.5],
    //     [-0.5, 0.5],    //1 中间的一个格子
    //     [-0.5, 2.5],    //2 两个格子
    //     [-2.5, 2.5],    //3 中间三个格子
    //     [1.5, 4.5],     //4 右边边缘两个格子
    //     // 反向翻转
    //     [-2.5, 0.5],    //5 靠左两个格子
    //     [-4.5, -1.5],   //6 左边边缘两个格子
    // ];
    static safetyLUT = [
        [-4.5, 4.5],
        [-0.4, 0.4],    //1 中间的一个格子
        [0, 2],    //2 两个格子
        [-2, 2],    //3 中间三个格子
        [2, 4.5],     //4 右边边缘两个格子
        // 反向翻转
        [-2, 0],    //5 靠左两个格子
        [-4.5, -2],   //6 左边边缘两个格子
    ];  
    static obsSafety = [
        0,
        0,
        3,
        4,
        2,
        5,                
        6,

        3,
        3,
        3,

        3,
        3,
        3,

        3,
        1,
        3,
        3,
        1,
        3,
        3,
        3,
        1,
        3,
        3,
        3
    ];
    private static obsChunk = [
        [[0]],
        // ramp
        [[0, 1], [1, 1], [2, 0], [3, 1], [4, 1]],
        [[0, 0], [1, 1], [2, 1], [3, 1], [4, 0]],
        [[0, 0], [1, 0], [2, 0], [3, 1], [4, 1]],
        [[0, 0], [1, 0], [2, 1], [3, 1], [4, 0]],
        [[0, 0], [1, 1], [2, 1], [3, 0], [4, 0]],
        [[0, 1], [1, 1], [2, 0], [3, 0], [4, 0]],
        //tetris
        [[0], [5], [6], [7], [8], [9], [4]],
        [[0], [5], [10], [11], [12], [13], [14], [9], [4]],
        [[0], [5], [10], [15], [16], [17], [18], [19], [14], [9], [4]],
        //gate
        [[0], [5], [10], [15], [16], [17], [18], [19]],
        [[0], [5], [10], [11], [12], [13], [14]],
        [[0], [5], [6], [7], [8], [9]],
        //gate half
        [[0], [5]],
        [[0], [5], [1]],
        [[0], [5], [6]],
        //
        [[0], [5], [10]],
        [[0], [5], [10], [1]],
        [[0], [5], [10], [6]],
        [[0], [5], [10], [11]],
        //
        [[0], [5], [10], [15]],
        [[0], [5], [10], [15], [1]],
        [[0], [5], [10], [15], [6]],
        [[0], [5], [10], [15], [11]],
        [[0], [5], [10], [15], [16]],
    ];

    private static ModleMap:{[style:number]:m4m.framework.transform} = {};

    static init(ramp:m4m.framework.transform = null ,cube2:m4m.framework.transform = null){
        if(!ramp && !cube2) {
            let temp_0 = Ress.lego1.clone();
            let mr = temp_0.gameObject.getComponentsInChildren("meshRenderer")[0] as m4m.framework.meshRenderer;
            let temp_1 = Ress.lego2.clone();
            let mr_ = temp_1.gameObject.getComponentsInChildren("meshRenderer")[0] as m4m.framework.meshRenderer;
            mr.materials[0] = MatMgr.box_mat;
            mr_.materials[0] = MatMgr.ramp_mat_0;
            this.origin = [temp_0,  temp_1];
        }else{
            // let empty = new m4m.framework.transform();
            this.origin = [cube2, ramp];
        }
        if(this.mixedMeshes == null) {
            this.mixObsMesh();
        }
        //预创建 所有模板
        let len = obsStyle.maxLen;
        for(let i=0; i< len ;i++){
            let temp = this.genObs(i);
            this.ModleMap[i] = temp;
        }
        
    }
    private static origin = null;

    private static clone(pos, model = 0) {
        if(!this.origin)
            return null;
        let temp: m4m.framework.transform = this.origin[model].clone();
        temp.localTranslate.x = this.posBlock[pos][0];
        temp.localTranslate.y = this.posBlock[pos][1];
        temp.localTranslate.z = 0;
        //set collider
        let cs = temp.gameObject.getComponentsInChildren("boxcollider") as m4m.framework.boxcollider[];
        let isLowGate = false;
        cs.forEach(c=>{
            if(pos>4)
                c.gameObject.removeComponent(c);  //顶部方块不需要 碰撞盒
            else{
                c.center = new m4m.math.vector3(0,1,0);
                c.size = new m4m.math.vector3(1.8,1.8,1.8);
            }
            
        });

        return temp;
    }

    static meshCompressor: mixMesh;
    static mixedMeshes = null;
    private static mixObsMesh() {
        let scene = GameMgr.app.getScene();
        // this.meshCompressor.resetDic();

        this.mixedMeshes = this.obsChunk.map((obs, style) => {  // 每一种障碍物
            let isLowGate = false;
            this.meshCompressor = new mixMesh();
            
            let obsRoot = new m4m.framework.transform();
            let obsCollect = new m4m.framework.transform();
            // obsRoot.localTranslate.z = 20 +style * 5;
            // obsRoot.localTranslate.y = style * 5;
            let hasRamp = false;
            for(let cube of obs) {  // 障碍物的每一个方块

                let temp = this.clone(cube[0], cube[1]);
                switch(style){
                    case obsStyle.singe:
                        obsRoot.gameObject.addComponent(HMoveHandle.name);
                        break;
                    case obsStyle.ramp_0:
                    case obsStyle.ramp_1:
                    case obsStyle.ramp_2:
                    case obsStyle.ramp_3:
                    case obsStyle.ramp_4:
                    case obsStyle.ramp_5:
                        if(temp.gameObject.tag == this.Tag_ramp){
                            temp.gameObject.tag = GameMgr.RampTag;
                            hasRamp = true;
                        }
                        break;
                }
                // if(cube[1] == 0)
                //     temp.gameObject.visible = true;
                // else
                    temp.gameObject.visible = false;
                obsCollect.addChild(temp);
                if(!isLowGate && ( cube[0] == 7 || cube[0] == 12 )){
                    isLowGate = true;
                }
            }
            obsRoot.addChild(obsCollect);            
            if(isLowGate) obsRoot.gameObject.tag = this.Tag_lowGate;

            let meshRenders = obsCollect.gameObject.getComponentsInChildren("meshRenderer");
            let picker = meshRenders.filter(mr => mr.gameObject.transform.name != "boxcollider").map(mr => mr.gameObject.transform);
            if(picker.length > 1 && !hasRamp) {

                let mixed = new m4m.framework.transform();
                obsRoot.addChild(mixed);
                // obsCollect.localTranslate.y = 5;

                // obsCollect.gameObject.visible = false;
                
                // mixed.localTranslate.z = 20 +style * 5;
                // mixed.localTranslate.y = style * 5;
                // mixed.localTranslate.z = 50;
                scene.addChild(obsRoot);    // 添加到场景里计算世界坐标
                this.meshCompressor.resetDic();
                scene.update(0);
                let { nobatch, batch, mixMeshId } = this.meshCompressor.mixMesh(picker);
                // // Built
                for (let id of mixMeshId) {
                    let {mesh, mat} = this.meshCompressor.mixmeshDic[id];
                    let trans = new m4m.framework.transform();
                    let mf = trans.gameObject.addComponent("meshFilter") as m4m.framework.meshFilter;
                    mf.mesh = mesh;
                    let meshRender = trans.gameObject.addComponent("meshRenderer") as m4m.framework.meshRenderer;
                    meshRender.materials = [mat];
                    mixed.addChild(trans);
                }
                scene.getRoot().removeChild(obsRoot);
                for(let p of picker) {
                    if(p.name != 'arrow') {
                        p.gameObject.removeComponentByTypeName("meshRenderer");
                        p.gameObject.removeComponentByTypeName("meshFilter");
                    }
                    p.gameObject.visible = true;
                }

            } else {
                // fix
                for(let single of obsCollect.children) {
                    single.gameObject.visible = true;
                }
            }

            return obsRoot;
            // return mixed;
            // return mixed.clone();
        });
        
    }

    private static genObs(style: obsStyle) :m4m.framework.transform {
        // if(this.mixedMeshes == null) {
        //     this.mixObsMesh();
        // }
        // let empty = new m4m.framework.transform();
        // let isLowGate = false;
        // for(let p of this.obsChunk[style]) {
        //     let temp = this.clone(p[0], p[1]);
        //     switch(style){
        //         case obsStyle.singe:
        //             empty.gameObject.addComponent(HMoveHandle.name);
        //         break;
        //         case obsStyle.ramp_0:
        //         case obsStyle.ramp_1:
        //         case obsStyle.ramp_2:
        //         case obsStyle.ramp_3:
        //         case obsStyle.ramp_4:
        //         case obsStyle.ramp_5:
        //             if(temp.gameObject.tag == this.Tag_ramp){
        //                 temp.gameObject.tag = GameMgr.RampTag;
        //             }
        //         break;
        //     }
        //     empty.addChild(temp);
        //     if(!isLowGate && ( p[0] == 7 || p[0] == 12 )){
        //         isLowGate = true;
        //     }
        // }
        
        // if(isLowGate)   empty.gameObject.tag = this.Tag_lowGate;
        // return empty; 
        return this.mixedMeshes[style];
    }

    static getObs(style: obsStyle) :m4m.framework.transform{
        if(this.ModleMap[style]){
            return this.ModleMap[style].clone();
        }
    }

}