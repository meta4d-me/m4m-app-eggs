import { PBREnvMgr } from "./PBREnvMgr";

/** PBR 管理类 */
export class PBRMgr {
    public static readonly carePbrShaderMap: { [k: string]: boolean } = {
        "pbr.shader.json": true,
        "pbr_blend.shader.json": true,
    };

    /**
     * 设置 pbr 节点的环境贴图
     * @param r 渲染组件
     * @param useEvnMap 是否使用间接环境光照
     * @returns 
     */
    public static attachEnv(r: m4m.framework.IRenderer, useEvnMap = true) {
        let materials = r["materials"] as m4m.framework.material[];
        if (!materials) { return; }
        materials.forEach((mat) => {
            let sh = mat.getShader();
            if (this.carePbrShaderMap[sh.getName()]) {
                mat.setFloat("u_Exposure", PBREnvMgr.Exposure);

                if (!PBREnvMgr.PBRUseEnvMap) { return; }

                if (PBREnvMgr.SpecEnvMap) {
                    mat.setCubeTexture("u_env", PBREnvMgr.SpecEnvMap);
                }
                if (PBREnvMgr.DiffEnvMap) {
                    mat.setCubeTexture("u_diffuse", PBREnvMgr.DiffEnvMap);
                }
            }
        });
    }

    /**
     * 设置 全部场景pbr节点的环境贴图
     */
    public static ckAttachEnvAll(node: m4m.framework.transform) {
        let mrs = node.gameObject.getComponentsInChildren("meshRenderer") as m4m.framework.meshRenderer[];
        mrs.forEach((mr) => { this.attachEnv(mr); });
        let skmrs = node.gameObject.getComponentsInChildren("skinnedMeshRenderer") as m4m.framework.skinnedMeshRenderer[];
        skmrs.forEach((mr) => { this.attachEnv(mr); });
    }
}