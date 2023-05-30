import { m4mGO } from "../spGameObject";
import { ISpParticleSystem as ISpParticleSystem, spComponentType } from "../spInterface";

/** 简配 camera 组件  */
// tslint:disable-next-line: class-name
export class gdParticleSystem implements ISpParticleSystem {
    public id: string;
    public rawHandle: m4m.framework.f14EffectSystem;
    public gameObject: m4mGO;
    public compType: spComponentType = spComponentType.particleSystem;
    constructor(raw: m4m.framework.f14EffectSystem, go: m4mGO) {
        this.id = `${go.getID()}_${this.compType}`;
        this.rawHandle = raw;
        this.gameObject = go;
    }
    public setColor(_color: m4m.math.color) {
        this.rawHandle.changeColor(_color);
    }

    public getLastRestoreID(): number {
        throw new Error("Method not implemented.");
    }

    get beloop() { return this.rawHandle.data.beloop; }
    set beloop(v: boolean) { this.rawHandle.data.beloop = v; }

    public stop() {
        this.rawHandle.stop();
    }
    public play(onPlayEnd?: () => void) {
        this.rawHandle.play(onPlayEnd);
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
        this.rawHandle.remove();

        this.gameObject = null;
        this.rawHandle = null;
    }

}