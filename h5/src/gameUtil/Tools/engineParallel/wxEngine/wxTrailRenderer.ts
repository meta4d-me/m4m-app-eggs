import engine from "engine";
import { wxEngineGO } from "../spGameObject";
import { ISpGameObject, ISpTrailRender, spComponentType } from "../spInterface";
import { wxMaterialcacher } from "./wxMaterialcacher";

/** 简配 gdMeshRenderer 组件  */
// tslint:disable-next-line: class-name
export class wxTrailRenderer implements ISpTrailRender {
    public color: m4m.math.color;
    public id: string;
    public rawHandle: engine.TrailRenderer;
    public gameObject: ISpGameObject;
    public compType: spComponentType;
    constructor(raw: engine.TrailRenderer, go: wxEngineGO) {
        this.id = raw.id.toString();
        this.rawHandle = raw;
        this.gameObject = go;
        this.matHandle = new wxMaterialcacher(raw);
    }
    private matHandle: wxMaterialcacher;
    public getLastRestoreID(): number {
        throw new Error("Method not implemented.");
    }

    public play() {
        this.rawHandle.active = true;
    }

    public stop() {
        this.rawHandle.active = false;
    }

    public setSpeed(speed: number) {

    }

    public setWidth(Width: number) {

    }
    public getMaterialID(matIdx?: number): number {
        throw new Error("Method not implemented.");
    }
    public getMaterialsCount(): number {
        throw new Error("Method not implemented.");
    }
    public setMaterialFloat(key: string, value: number, matIdx?: number) {
        throw new Error("Method not implemented.");
    }
    public setMaterialVector4(key: string, value: m4m.math.vector4, matIdx?: number) {
        throw new Error("Method not implemented.");
    }
    public setTexture(key: string, valueTex: any, matIdx?: number) {
        throw new Error("Method not implemented.");
    }
    public getShaderName(matIdx?: number): string {
        throw new Error("Method not implemented.");
    }
    public setShader(shaderSrc: string, matIdx?: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public cachedCount(): number {
        throw new Error("Method not implemented.");
    }
    public cacheCurrMaterial(globalMatKey?: string): number {
        throw new Error("Method not implemented.");
    }
    public restoreMaterial(cacheID: number) {
        throw new Error("Method not implemented.");
    }
    public dispose() {
        throw new Error("Method not implemented.");
    }

}