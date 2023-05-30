import engine from "engine";
import { wxEngineGO } from "../spGameObject";
import { ISpMeshRenderer, spComponentType } from "../spInterface";
import { wxMaterialcacher } from "./wxMaterialcacher";

/** 简配 gdMeshRenderer 组件  */
// tslint:disable-next-line: class-name
export class wxMeshRenderer implements ISpMeshRenderer {
    public id: string;
    public rawHandle: engine.MeshRenderer;
    public gameObject: wxEngineGO;
    public compType: spComponentType = spComponentType.skinMeshRenderer;
    public queue: number = 0;
    public enableGpuInstancing: boolean;

    constructor(raw: engine.MeshRenderer, go: wxEngineGO) {
        this.id = raw.id.toString();
        this.rawHandle = raw;
        this.gameObject = go;
        this.matHandle = new wxMaterialcacher(raw);
    }
    private matHandle: wxMaterialcacher;
    public getLastRestoreID(): number {
        return this.matHandle.getLastRestoreID();
    }

    public getMaterialsCount(): number {
        return this.rawHandle.materialCount;
    }

    public getMaterialID(matIdx: number = 0): number {
        return this.matHandle.getMaterialID(matIdx);
    }

    public setMaterialFloat(key: string, value: number, matIdx: number = 0) {
        this.matHandle.setMaterialFloat(key, value, matIdx);
    }

    public setMaterialVector4(key: string, value: m4m.math.vector4, matIdx: number = 0) {
        this.matHandle.setMaterialVector4(key, value, matIdx);
    }

    public setTexture(key: string, valueTex: engine.Texture2D, matIdx: number = 0) {
        this.matHandle.setTexture(key, valueTex, matIdx);
    }
    public getShaderName(matIdx: number = 0): string {
        return this.matHandle.getShaderName(matIdx);
    }

    public setShader(shaderID: string, matIdx: number = 0) {
        return this.matHandle.setShader(shaderID, matIdx);
    }

    public cachedCount(): number {
        return this.matHandle.cachedCount();
    }
    public cacheCurrMaterial(globalMatKey?: string): number {
        return this.matHandle.cacheCurrMaterial(globalMatKey);
    }
    public restoreMaterial(cacheID: number) {
        this.matHandle.restoreMaterial(cacheID);
    }
    public dispose() {
        this.matHandle.dispose();
        this.rawHandle = null;
        this.gameObject = null;
    }
}