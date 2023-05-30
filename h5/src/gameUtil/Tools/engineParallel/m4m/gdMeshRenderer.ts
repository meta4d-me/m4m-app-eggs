import { m4mGO } from "../spGameObject";
import { spComponentType, ISpMeshRenderer } from "../spInterface";
import { gdMaterialcacher } from "./gdMaterialcacher";

/** 简配 camera 组件  */
// tslint:disable-next-line: class-name
export class gdMeshRenderer implements ISpMeshRenderer {
    private static get assetMgr() {
        if (!this._assetMgr) {
            this._assetMgr = m4m.framework.assetMgr.Instance;
        }
        return this._assetMgr;
    }

    get enableGpuInstancing() { return this.rawHandle.materials[0].enableGpuInstancing; }
    set enableGpuInstancing(v) { this.rawHandle.materials[0].enableGpuInstancing = v; }

    get queue() { return this.rawHandle.queue; }
    set queue(v) { this.rawHandle.queue = v; }
    public id: string;
    public rawHandle: m4m.framework.meshRenderer;
    public compType: spComponentType = spComponentType.meshRenderer;
    public gameObject: m4mGO;

    constructor(rawCam: m4m.framework.meshRenderer, go: m4mGO) {
        this.id = `${go.getID()}_${this.compType}`;
        this.rawHandle = rawCam;
        this.gameObject = go;
        this.matHandle = new gdMaterialcacher(rawCam);
    }

    private static _assetMgr: m4m.framework.assetMgr;
    private matHandle: gdMaterialcacher;
    public getLastRestoreID(): number {
        throw this.matHandle.getLastRestoreID();
    }
    public getMaterialsCount(): number {
        return this.rawHandle.materials.length;
    }

    public cacheCurrMaterial(globalMatKey?: string): number {
        return this.matHandle.cacheCurrMaterial(globalMatKey);
    }

    public cachedCount(): number {
        return this.matHandle.cachedCount();
    }

    public restoreMaterial(cacheID: number) {
        return this.matHandle.restoreMaterial(cacheID);
    }

    public getShaderName(matIdx: number = 0) {
        return this.rawHandle.materials[matIdx].getShader()
        .getName();
    }

    public getMaterialID(idx: number = 0): number {
        if (!this.rawHandle.materials[idx]) { return; }
        return this.rawHandle.materials[idx].getGUID();
    }

    public setShader(shaderSrc: string, idx: number = 0) {
        return new Promise<void>((resolve) => {
            if (!this.rawHandle.materials[idx]) { return; }
            this.rawHandle.materials[idx].setShader(gdMeshRenderer.assetMgr.getShader(shaderSrc));
            resolve();
        });
    }

    public setMaterialFloat(key: string, value: number, idx: number = 0) {
        if (!this.rawHandle.materials[idx]) { return; }
        this.rawHandle.materials[idx].setFloat(key, value);
    }

    public setMaterialVector4(key: string, value: m4m.math.vector4, idx: number = 0) {
        if (!this.rawHandle.materials[idx]) { return; }

        this.rawHandle.materials[idx].setVector4(key, value);
    }

    public setTexture(key: string, valueTex: m4m.framework.texture, matIdx: number = 0) {
        if (!this.rawHandle.materials[matIdx]) { return; }
        this.rawHandle.materials[matIdx].setTexture(key, valueTex);
    }

    public dispose() {
        this.rawHandle = null;
        this.gameObject = null;
    }
}