import { wxEngineGO } from "../spGameObject";
import { ISpCamera, spComponentType } from "../spInterface";
import engine from "engine";

/** 简配 camera 组件  */
// tslint:disable-next-line: class-name
export class wxCamera implements ISpCamera {
    // fov: number;
    // far: number;
    // near: number;

    get fov() { return this.rawHandle ? this.rawHandle.fieldOfView * 0.0174532924 : 0; }
    set fov(v) { if (this.rawHandle) { this.rawHandle.fieldOfView = v * 57.29578; } }

    get far() { return this.rawHandle ? this.rawHandle.farClipPlane : 0; }
    set far(v) { if (this.rawHandle) { this.rawHandle.farClipPlane = v; } }

    get near() { return this.rawHandle ? this.rawHandle.nearClipPlane : 0; }
    set near(v) { if (this.rawHandle) { this.rawHandle.nearClipPlane = v; } }
    public rawHandle: engine.Camera;
    public compType: spComponentType = spComponentType.camera;
    public gameObject: wxEngineGO;

    public id: string;

    constructor(raw: engine.Camera, go: wxEngineGO) {
        this.id = raw.id.toString();
        this.rawHandle = raw;
        this.gameObject = go;
    }
    private isWxCamera = true;
    public dispose() {

    }
}