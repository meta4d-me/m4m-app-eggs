import {mixMesh} from "../Tool/mixMesh";
@m4m.reflect.nodeComponent
//mesh 合并测试 组件
export class New3dCompScript extends m4m.framework.behaviour
{
    
    meshCompressor: mixMesh;
    public onPlay() {
        let wbgl = this.gameObject.getScene().app.webgl;
        this.meshCompressor = new mixMesh(wbgl);

        // this.gameObject.getScene().update(0);
        let meshRenders = this.gameObject.getComponentsInChildren("meshRenderer");

        let obsRoot = new m4m.framework.transform();
        this.gameObject.transform.addChild(obsRoot);

        let picker = meshRenders.filter(mr => mr.gameObject.transform.name != "boxcollider").map(mr => mr.gameObject.transform);
        debugger
        if(picker.length>1) {
            let mixed = new m4m.framework.transform();
            obsRoot.addChild(mixed);
            // obsCollect.localTranslate.y = 5;
            // this.gameObject.visible = false;
            // mixed.localTranslate.z = 20 +style * 5;
            // mixed.localTranslate.y = style * 5;
            // mixed.localTranslate.z = 50;
            this.meshCompressor.resetDic();
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

        }


    }
    public update(delta: number) {

    }
    public remove()
    {

    }
}
