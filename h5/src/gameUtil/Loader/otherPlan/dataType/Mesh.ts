import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { Bounds } from "./Bounds";
import { number4 } from "./number4";

export class Mesh extends AssetBundleFileInfo {
    public static classType = m4m["Mesh"] = Mesh;
    public className: string = "";
    public meshName: string = "";
    public originVF: number = 0;
    public bounds: Bounds = new Bounds();
    public posCount: number = 0;
    public position: m4m.math.vector3[] = [];
    public color: m4m.math.color[] = [];
    public colorex: m4m.math.color[] = [];
    public normal: m4m.math.vector3[] = [];
    public UV0: m4m.math.vector2[] = [];
    public UV1: m4m.math.vector2[] = [];
    public tangent: m4m.math.vector3[] = [];
    public blendIndex: number4[] = [];
    public blendWeight: number4[] = [];
    public vec10tpose: number[] = [];
    public trisindex: number[] = [];
    public subMesh: subMeshInfo[] = [];
    public tmpVArr: Float32Array;
    public minimum: m4m.math.vector3 = m4m.poolv3();
    public maximum: m4m.math.vector3 = m4m.poolv3();

}
// tslint:disable-next-line: class-name
class subMeshInfo {
    public static classType = m4m["subMeshInfo"] = subMeshInfo;
    public matIndex: number = 0;
    public useVertexIndex: number = 0;
    public line: boolean = false;
    public start: number = 0;
    public size: number = 0;

}
