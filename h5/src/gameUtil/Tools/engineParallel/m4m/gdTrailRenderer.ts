import { m4mGO } from "../spGameObject";
import { spComponentType, ISpTrailRender } from "../spInterface";

/** 简配 TrailRenderer 组件  */
// tslint:disable-next-line: class-name
export class gdTrailRenderer implements ISpTrailRender{
    public id: string;
    public rawHandle : m4m.framework.trailRender ;
    public gameObject: m4mGO;
    public compType: spComponentType = spComponentType.trailRenderer;
    constructor(raw : m4m.framework.trailRender , go : m4mGO){
        this.id = `${go.getID()}_${this.compType}`;
        this.rawHandle = raw;
        this.gameObject = go;
    }
    public getLastRestoreID(): number {
        throw new Error("Method not implemented.");
    }
    public setSpeed(speed: number) {
        this.rawHandle.setspeed(speed);
    }
    public setWidth(width: number) {
        this.rawHandle.setWidth(width);
    }
    get color(){ return this.rawHandle.color; }
    set color(v: m4m.math.color){ this.rawHandle.color = v; }

    public stop() {
        this.rawHandle.stop();
    }
    public play() {
        this.rawHandle.play();
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