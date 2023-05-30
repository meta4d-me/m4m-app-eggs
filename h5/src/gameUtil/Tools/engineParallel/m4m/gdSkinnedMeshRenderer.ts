import { m4mGO } from "../spGameObject";
import { ISpSkinnedMeshRenderer , spComponentType } from "../spInterface";
import { gdMaterialcacher } from "./gdMaterialcacher";

// tslint:disable-next-line: class-name
export class gdSkinnedMeshRenderer implements ISpSkinnedMeshRenderer{
    private static get assetMgr () {
        if (!this._assetMgr){
            this._assetMgr = m4m.framework.assetMgr.Instance;
        }
        return this._assetMgr;
    }

    public readonly isSkinnedMeshRenderer: boolean = true;
    public id: string;
    public rawHandle: m4m.framework.skinnedMeshRenderer;
    public compType: spComponentType = spComponentType.meshRenderer;
    public gameObject: m4mGO;
    constructor(raw : m4m.framework.skinnedMeshRenderer , go : m4mGO){
        this.id = `${go.getID()}_${this.compType}`;
        this.rawHandle = raw;
        this.gameObject = go;
        this.matHandle = new gdMaterialcacher(raw);
    }

    private static _assetMgr : m4m.framework.assetMgr;
    private matHandle : gdMaterialcacher ;
    public getLastRestoreID(): number {
        return this.matHandle.getLastRestoreID();
    }
    public getMaterialID(matIdx: number = 0): number {
        if (!this.rawHandle.materials[matIdx]) { return; }
        return this.rawHandle.materials[matIdx].getGUID();
    }
    public getMaterialsCount(): number {
        return this.rawHandle.materials.length;
    }
    public setMaterialFloat(key: string, value: number, matIdx: number = 0) {
        if (!this.rawHandle.materials[matIdx]) { return; }
        this.rawHandle.materials[matIdx].setFloat(key, value);
    }
    public setMaterialVector4(key: string, value: m4m.math.vector4, matIdx: number = 0) {
        if (!this.rawHandle.materials[matIdx]) { return; }
        this.rawHandle.materials[matIdx].setVector4(key , value);
    }
    public setTexture(key: string, valueTex: m4m.framework.texture, matIdx: number = 0) {
        if (!this.rawHandle.materials[matIdx]) { return; }
        this.rawHandle.materials[matIdx].setTexture(key , valueTex);
    }
    public getShaderName(matIdx: number = 0): string {
        return this.rawHandle.materials[matIdx].getShader()
        .getName();
    }
    public setShader(shaderSrc: string, idx: number = 0) {
        return new Promise<void>((resolve) => {
            if (!this.rawHandle.materials[idx]) { return; }
            this.rawHandle.materials[idx].setShader(gdSkinnedMeshRenderer.assetMgr.getShader(shaderSrc));
            resolve();
        });

        // if(!this.rawHandle.materials[matIdx]) return;
        // this.rawHandle.materials[matIdx].setShader( gdSkinnedMeshRenderer.assetMgr.getShader(shaderSrc));
    }
    public cacheCurrMaterial(globalMatKey? : string): number {
        return this.matHandle.cacheCurrMaterial(globalMatKey);

    }
    public restoreMaterial(cacheID: number) {
        return this.matHandle.restoreMaterial(cacheID);

    }
    public cachedCount(): number {
        return this.matHandle.cachedCount();
    }

    public dispose() {
        this.matHandle.dispose();
        this.rawHandle = null;
        this.gameObject = null;
    }
}