import { m4mGO } from "../spGameObject";
import { ISpCamera, spComponentType, ISpGameObject } from "../spInterface";

/** 简配 camera 组件  */
// tslint:disable-next-line: class-name
export class gdCamera implements ISpCamera{
    get fov (){ return this.rawHandle ?  this.rawHandle.fov : 0; }
    set fov (v){ if (this.rawHandle) { this.rawHandle.fov = v; }}

    get far (){ return this.rawHandle ?  this.rawHandle.far : 0; }
    set far (v){ if (this.rawHandle) { this.rawHandle.far = v; }}

    get near (){ return this.rawHandle ?  this.rawHandle.near : 0; }
    set near (v){ if (this.rawHandle) { this.rawHandle.near = v; }}

    public rawHandle: m4m.framework.camera;
    public compType: spComponentType = spComponentType.camera;
    public gameObject: ISpGameObject;

    public id: string;

    constructor(rawCam : m4m.framework.camera , go : m4mGO){
        this.id = `${go.getID()}_${this.compType}`;
        this.rawHandle = rawCam;
        this.gameObject = go;
    }

    public dispose() {
        this.rawHandle = null;
        this.gameObject = null;
    }
}