import engine from "engine";
import { spAPP } from "../parallelEngineTool";
import { engineParallelType, IDispose } from "../spInterface";

type IMats = {
    materialCount: number;
    getSharedMaterialAtIndex(idx: number): engine.Material;
    setMaterialAtIndex(mat: engine.Material, idx: number): void;
};

/**
 * 材质处理器
 */
// tslint:disable-next-line: class-name
export class wxMaterialcacher implements IDispose {
    private static get shaderName2IDMap() {
        if (!this._shaderName2IDMap) {
            for (let i = 0, len = this.addSuffixList.length; i < len; i++) {
                this.addSuffixMap[this.addSuffixList[i]] = true;
            }
            this._shaderName2IDMap = {};
            this._shaderm4mName2WxNameMap = {};
            for (let i = 0, len = this.m4mShaderNames.length; i < len; i++) {
                let key = this.m4mShaderNames[i];
                let idx = key.lastIndexOf(".shader.json");
                let shName = key.substring(0, idx);
                let otherSuffix = this.addSuffixMap[shName] ? ".shader" : "";
                // this._shaderName2IDMap[key] = GameMgr.shaderPath_WXEngine + shName + otherSuffix + ".effect";   //ID
                this._shaderName2IDMap[key] = this.wxShaderPath + shName + otherSuffix + ".effect";   //ID
                this._shaderm4mName2WxNameMap[key] = shName; //名字
            }
        }
        return this._shaderName2IDMap;
    }
    private static get wxShaderNameMap() {
        if (!this._wxShaderNameMap) {
            this._wxShaderNameMap = {};
            let map = this.shaderName2IDMap;
            if (map) {
                for (let key in this._shaderm4mName2WxNameMap) {
                    this._wxShaderNameMap[this._shaderm4mName2WxNameMap[key]] = key;
                }
            }
        }
        return this._wxShaderNameMap;
    }

    /**
     * 初始化
     * @param m4mShaderNames shader 名字
     * @param wxShaderPath  微信shader路径
     * @param addSuffixList wxShader ID 名需要增加 .shader 后缀的列表
     */
    public static init(m4mShaderNames: string[], wxShaderPath: string, addSuffixList?: string[]) {
        this.m4mShaderNames = m4mShaderNames;
        this.wxShaderPath = wxShaderPath;
        this.addSuffixList = addSuffixList;
    }

    constructor(rawHandle: IMats) {
        this.rawHandle = rawHandle;
    }
    // tslint:disable-next-line: max-line-length
    // private static m4mShaderNames = [ResurlManager.RimLitSurfaceCausticsshader ,ResurlManager.RimLitUnderwaterCausticsshader , ResurlManager.CloakingDeviceshader, ResurlManager.PreZCloakingDeviceshader, ResurlManager.SphereMapAdditiveshader, ResurlManager.transparentshader, ResurlManager.trailerShader , ResurlManager.outLineShader , ResurlManager.RimLitshader , ResurlManager.RimLitAlphashader];
    // tslint:disable-next-line: max-line-length
    // private static addSuffixList = ["Background","CloakingDevice","GodRays","RimLitUnderwaterCaustics","SkyPlaneBackground","SphereMapAdditive","Water","RimLit_Alpha"];
    private static wxShaderPath: string;
    private static m4mShaderNames = [];
    private static addSuffixList = [];
    private static readonly addSuffixMap: { [key: string]: boolean } = {};
    private static _shaderName2IDMap: { [baseKey: string]: string };
    private static _shaderm4mName2WxNameMap: { [m4mName: string]: string };
    private static _wxShaderNameMap: { [wxKey: string]: string };

    private rawHandle: IMats;
    private cacheIdCount = 0;
    private cacheMatsMap: { [id: number]: engine.Material[] } = {};

    private _lastRestoreID: number = -1;

    public getMaterialID(matIdx: number = 0): number {
        let currMat = this.rawHandle.getSharedMaterialAtIndex(matIdx);
        if (!currMat) { return; }
        return currMat.id;
    }

    public setMaterialFloat(key: string, value: number, matIdx: number = 0) {
        let currMat = this.rawHandle.getSharedMaterialAtIndex(matIdx);
        if (!currMat) { return; }
        currMat.setFloat(key, value);
    }

    public setMaterialVector4(key: string, value: m4m.math.vector4, matIdx: number = 0) {
        let currMat = this.rawHandle.getSharedMaterialAtIndex(matIdx);
        if (!currMat) { return; }
        let v4 = new engine.Vector4();
        v4.x = value.x; v4.y = value.y; v4.z = value.z; v4.w = value.w;
        currMat.setVector(key, v4);
    }

    public setTexture(key: string, valueTex: engine.Texture2D, matIdx: number = 0) {
        if (!(valueTex instanceof engine.Texture2D)) {
            console.error(` 纹理[${key}] 资源错误 , 纹理对象不是 engine.Texture2D 类型！！`);
        }
        let currMat = this.rawHandle.getSharedMaterialAtIndex(matIdx);
        if (!currMat) { return; }
        currMat.setTexture(key, valueTex);
    }
    public getShaderName(matIdx: number = 0): string {
        let currMat = this.rawHandle.getSharedMaterialAtIndex(matIdx);
        if (!currMat) { return; }
        return wxMaterialcacher.wxShaderNameMap[currMat.effect.name];
    }

    public setShader(shaderID: string, matIdx: number = 0): Promise<void> {
        return new Promise((resolve, reject) => {
            let wxShaderID = wxMaterialcacher.shaderName2IDMap[shaderID];
            let currMat = this.rawHandle.getSharedMaterialAtIndex(matIdx);
            if (!currMat) { return; }
            engine.loader.load<engine.Effect>(wxShaderID).promise
            .then((effect) => {
                if (!effect) {
                    reject();
                    return;
                }
                //同名贴图切换过来
                let imgMap;
                if (currMat.effect) {
                    let tempMap = currMat.effect["_shaderImageIndexMap"];
                    if (tempMap) {
                        imgMap = {};
                        for (let key in tempMap) {
                            imgMap[key] = currMat.getTexture(key);
                        }
                    }
                }
                currMat.effect = effect;

                if (imgMap) {
                    for (let key in imgMap) {
                        currMat.setTexture(key, imgMap[key]);
                    }
                }

                resolve();
            });
        });
    }

    public cacheCurrMaterial(globalMatKey?: string): number {
        this.cacheIdCount++;
        let currId = this.cacheIdCount;
        let cacheMats: engine.Material[] = [];
        // let srcMats = this.rawHandle.materials; 
        let srcMats: engine.Material[] = [];
        let matCount = this.rawHandle.materialCount;
        for (let i = 0; i < matCount; i++) {
            srcMats.push(this.rawHandle.getSharedMaterialAtIndex(i));
        }

        let len = srcMats.length;
        let globalMat;
        if (globalMatKey != null) {
            globalMat = spAPP.getGlobalMaterial(globalMatKey, false, engineParallelType.wxEngine);
        }
        for (let i = 0; i < len; i++) {
            let cachemat;
            //
            if (!globalMat) {
                cachemat = srcMats[i].clone(); //new 材质
            } else {
                cachemat = globalMat; //全局共享材质
            }
            cacheMats.push(cachemat);
        }

        this.cacheMatsMap[currId] = cacheMats;
        return currId;
    }

    public cachedCount(): number {
        return Object.keys(this.cacheMatsMap).length;
    }

    public restoreMaterial(cacheID: number) {
        let cacheMats = this.cacheMatsMap[cacheID];
        if (!cacheMats) {
            console.warn(` cacheID ${cacheID} not find ! `);
            return;
        }
        this._lastRestoreID = cacheID;
        for (let i = 0, len = cacheMats.length; i < len; i++) {
            this.rawHandle.setMaterialAtIndex(cacheMats[i], i);
        }
    }

    public getLastRestoreID() {
        return this._lastRestoreID;
    }

    public dispose() {
        this.rawHandle = null;
        this.cacheMatsMap = null;
    }
}
