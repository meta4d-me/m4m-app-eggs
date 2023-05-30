import { commTool } from "../commTool";
import { gameMathUtil } from "../gameMathUtil";
import { PBREnvSettings } from "./PBREnvSettings";

/**
 * PBR 环境 管理器
 */
export class PBREnvMgr {
    private static _isZipTex = false;
    private static _skyboxShader = "skybox.shader.json";
    private static _skyBoxTexPath = ``;
    private static _currEnv: PBREnvSettings;
    private static _skyBox: m4m.framework.meshRenderer;
    private static _lights: m4m.framework.light[] = [];
    private static _enableSkyBox: boolean = false;
    private static _SpecEnvMap: m4m.framework.texture;
    private static _DiffEnvMap: m4m.framework.texture;
    /** 间接照明 镜面反射环境图（IBL） */
    public static get SpecEnvMap() { return this._SpecEnvMap; }
    /** 间接照明 漫反射环境图（IBL） */
    public static get DiffEnvMap() { return this._DiffEnvMap; }
    /** 曝光度 >= 0 */
    public static get Exposure() { return this._currEnv ? this._currEnv.exposure : 1; }
    /** pbr是否使用间接环境光照图 */
    public static get PBRUseEnvMap() { return this._currEnv ? this._currEnv.pbrUseEnvMap : false; }

    /** 天空盒 */
    private static get skyBox() {
        if (!this._skyBox) {
            let app = m4m.framework.sceneMgr.app;
            let assetMgr = app.getAssetMgr();
            let node = m4m.framework.TransformUtil.CreatePrimitive(m4m.framework.PrimitiveType.Cube, app);
            node.enableCulling = false;     //skybox 不会被视锥剔除
            this._skyBox = node.gameObject.getFirstComponentInChildren("meshRenderer") as m4m.framework.meshRenderer;
            let sh = assetMgr.getShader(this._skyboxShader);
            if (sh) {
                let mat = new m4m.framework.material("skyboxMat");
                this._skyBox.materials[0] = mat;
                mat.setShader(sh);
            } else {
                console.error(`天空盒shader 资源未加载 : ${this._skyboxShader}`);
            }
        }
        return this._skyBox;
    }
    /** 当前的环境设置 */
    public static get currEnv() { return this._currEnv; }
    /** 天空盒shader */
    public static get skyboxShader() { return this._skyboxShader; }
    public static set skyboxShader(val) { this._skyboxShader = val; }
    /** 是否开启天空盒子 */
    public static get enableSkyBox() { return this._enableSkyBox; }
    public static set enableSkyBox(val) {
        if (val == this._enableSkyBox) { return; }
        this._enableSkyBox = val;
        if (val) {
            let scene = m4m.framework.sceneMgr.scene;
            scene.addChild(this.skyBox.gameObject.transform);
        } else {
            if (!this._skyBox) { return; }
            let node = this._skyBox.gameObject.transform;
            if (!node.parent) { return; }
            node.parent.removeChild(node);
        }
    }

    /**
     * 初始化
     * @param skyBoxPath 天空盒路径
     */
    public static init(skyBoxPath: string) {
        this._skyBoxTexPath = skyBoxPath;
    }

    /**
     * 设置PBR环境
     * @param env 环境设置实例
     */
    public static async setEnv(env: PBREnvSettings) {
        if (!env || env == this._currEnv) { return; }
        this._currEnv = env;

        if (env.skyBox) {
            //天空盒
            await this.loadTexRes(env.skyBox);
            //天空盒设置
            this.setSkyBox();
        }
    }

    /**
     * 尝试添加 unity拓展灯光
     * @param _gltf gltf资源对象
     */
    public static tryAddExtLight(_gltf: m4m.framework.gltf) {
        let gltf = _gltf;
        if (!gltf) { return; }
        let lights = gltf.getRealtimeLights();
        if (!lights || lights.length < 1) { return; }

        //clear history
        this.clearLights();
        //
        let scene = m4m.framework.sceneMgr.scene;
        lights.forEach((l, i) => {
            //
            const node = new m4m.framework.transform();
            node.name = `Light_${m4m.framework.LightTypeEnum[l.type]}_${i}`;
            const comp = node.gameObject.addComponent("light") as m4m.framework.light;
            comp.type = l.type;
            //shadow
            if (l.shadowQuality != m4m.framework.ShadowQualityType.None) {
                let sq = l.shadowQuality;
            }
            if (comp.type == m4m.framework.LightTypeEnum.Spot || comp.type == m4m.framework.LightTypeEnum.Point) {
                //range
                comp.range = l.range;
                if (comp.type == m4m.framework.LightTypeEnum.Spot) {
                    //spotAngelCos
                    comp.spotAngelCos = Math.cos(l.spotAngle * 0.5 * Math.PI / 180);
                }
            }
            //intensity
            comp.intensity = l.intensity;
            //color
            m4m.math.colorSet(comp.color, l.color[0], l.color[1], l.color[2], l.color[3]);
            //RTS
            let pos = node.localPosition;
            m4m.math.vec3Set(pos, l.pos[0], l.pos[1], l.pos[2]);
            node.localPosition = pos;
            let rot = node.localRotate;
            m4m.math.quatFromEulerAngles(l.angles[0], l.angles[1], 0, rot);
            node.localRotate = rot;

            scene.addChild(node);
            scene.addLight(comp);
            this._lights.push(comp);
        });
    }

    // private static setLights(env: PBREnvSettings) {
    //     //clear history
    //     this.clearLights();

    //     let lights = [env.mainLight, env.secondaryLight, env.tertiaryLight];
    //     let scene = m4m.framework.sceneMgr.scene;

    //     for (let i = 0, len = lights.length; i < len; i++) {
    //         let light = lights[i];
    //         const lightObj = new m4m.framework.transform();
    //         lightObj.name = `Light_${i}`;
    //         const complight = lightObj.gameObject.addComponent("light") as m4m.framework.light;
    //         complight.type = m4m.framework.LightTypeEnum.Direction;
    //         m4m.math.quatFromEulerAngles(-light.alpha, -light.beta, 0, lightObj.localRotate);
    //         complight.intensity = light.intensity;
    //         const rgb = gameMathUtil.hexToRgb(light.color)
    //             .map((x) => x / 255);
    //         m4m.math.colorSet(complight.color, rgb[0], rgb[1], rgb[2], 1);
    //         scene.addChild(lightObj);
    //         scene.addLight(complight);
    //         this._lights.push(complight);
    //     }
    // }

    private static clearLights() {
        let scene = m4m.framework.sceneMgr.scene;
        for (let i = 0, len = this._lights.length; i < len; i++) {
            let l = this._lights[i];
            let node = l.gameObject.transform;
            if (node.parent) {
                node.parent.removeChild(node);
            }
            node.dispose();
        }
        scene.clearLights();
        this._lights.length = 0;
    }

    private static async loadTexRes(skyBoxRes: string) {
        if (!skyBoxRes) { return; }
        if (!this._SpecEnvMap) {
            let specCubeMap: m4m.framework.texture;
            if (!this._isZipTex) {
                specCubeMap = await commTool.loadCubeTexture(`${this._skyBoxTexPath}${skyBoxRes}/`);
            } else {
                specCubeMap = await commTool.loadCubeTextureZip(`${this._skyBoxTexPath}${skyBoxRes}/${skyBoxRes}.zip`);
            }
            this._SpecEnvMap = specCubeMap;
            this.refreshSkyBoxTex();
        }
        if (!this._DiffEnvMap) {
            let diffSbox = `${skyBoxRes}_diff`;
            let diffCubeMap: m4m.framework.texture;
            if (!this._isZipTex) {
                diffCubeMap = await commTool.loadCubeTexture(`${this._skyBoxTexPath}${diffSbox}/`);
            } else {
                diffCubeMap = await commTool.loadCubeTextureZip(`${this._skyBoxTexPath}${diffSbox}/${diffSbox}.zip`);
            }
            this._DiffEnvMap = diffCubeMap;
        }
    }

    private static setSkyBox() {
        let skyB = this.skyBox;
        let mat = skyB.materials[0];
        this.refreshSkyBoxTex();

        // let env = this._currEnv;
        // let ambientCubemapLight = env.ambientCubemapLight;
        // if (ambientCubemapLight) {
        //     let exp = ambientCubemapLight.exposure ?? 4;
        //     mat.setFloat("u_Exposure", exp);
        // }
        mat.setFloat("u_Exposure", this.Exposure);
    }

    private static refreshSkyBoxTex() {
        if (!this._SpecEnvMap || !this._skyBox) { return; }
        let mat = this._skyBox.materials[0];
        mat.setCubeTexture("u_sky", this._SpecEnvMap);
    }
}