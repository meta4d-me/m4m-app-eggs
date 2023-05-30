import engine from "engine";
import { wxEngineGO } from "../spGameObject";
import { ISpParticleSystem as ISpParticleSystem, spComponentType } from "../spInterface";

/** 简配 camera 组件  */
// tslint:disable-next-line: class-name
export class wxParticleSystemt implements ISpParticleSystem {
    public id: string;
    public rawHandle: engine.Particle;
    public gameObject: wxEngineGO;
    public compType: spComponentType = spComponentType.particleSystem;
    constructor(raw: engine.Particle, go: wxEngineGO) {
        this.id = raw.id.toString();
        this.rawHandle = raw;
        this.gameObject = go;
    }
    public setColor(_color: m4m.math.color) {
        //设置
        // let _c = this.rawHandle.common.startColor;
    }
    public getLastRestoreID(): number {
        throw new Error("Method not implemented.");
    }

    get beloop() { return this.rawHandle.emitter.looping; }
    set beloop(v: boolean) { this.rawHandle.emitter.looping = v; }

    public stop() {
        this.rawHandle.emitter.start = false;
    }
    public play(onPlayEnd?: () => void) {
        // this.rawHandle.play(onPlayEnd);
        this.rawHandle.emitter.start = true;
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
    public setShader(shaderSrc: string, matIdx?: number) {
        return null;
        // throw new Error("Method not implemented.");
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

        this.gameObject = null;
        this.rawHandle = null;
    }

}