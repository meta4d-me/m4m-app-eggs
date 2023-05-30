import { Aniclip } from "./Aniclip";
import { tPoseInfo } from "./tPoseInfo";
import { PoseBoneMatrix } from "./PoseBoneMatrix";
import { KeyFrameAnimtionClip } from "./KeyFrameAnimtionClip";

// tslint:disable-next-line: class-name
export class nodeComponent {
    public static classType = m4m["nodeComponent"] = nodeComponent;
    public cmop: string = "";

}
// tslint:disable-next-line: class-name
export class boxcollider extends nodeComponent {
    public static classType = m4m["boxcollider"] = boxcollider;
    public cmop = "boxcollider";
    public center: m4m.math.vector3 = m4m.poolv3();
    public size: m4m.math.vector3 = m4m.poolv3();

}

// tslint:disable-next-line: class-name
export class aniplayer extends nodeComponent {
    public static classType = m4m["aniplayer"] = aniplayer;
    public cmop = "aniplayer";
    public clips: Aniclip[] = [];
    public bones: tPoseInfo[] = [];
    public startPos: PoseBoneMatrix[] = [];
    public animNames: string[] = [];

}

// tslint:disable-next-line: class-name
export class skinnedMeshRenderer extends nodeComponent {
    public static classType = m4m["skinnedMeshRenderer"] = skinnedMeshRenderer;
    public cmop = "skinnedMeshRenderer";
    public materials: string[] = [];
    public center: m4m.math.vector3 = m4m.poolv3();
    public size: m4m.math.vector3 = m4m.poolv3();
    public mesh: string = "";
    public rootBone: number = 0;
    public bones: number[] = [];
    public player: number = 0;

}

// tslint:disable-next-line: class-name
export class meshFilter extends nodeComponent {
    public static classType = m4m["meshFilter"] = meshFilter;
    public cmop = "meshFilter";
    public mesh: string = "";

}

// tslint:disable-next-line: max-classes-per-file class-name
export class meshRenderer extends nodeComponent {
    public static classType = m4m["meshRenderer"] = meshRenderer;
    public cmop = "meshRenderer";
    public materials: string[] = [];
    public lightmapIndex: number = 0;
    public lightmapScaleOffset: m4m.math.quaternion = m4m.poolquat();
    public layer: number = 0;

}

// tslint:disable-next-line: max-classes-per-file class-name
export class meshcollider extends nodeComponent {
    public static classType = m4m["meshcollider"] = meshcollider;
    public cmop = "meshcollider";

}

// tslint:disable-next-line: max-classes-per-file class-name
export class asbone extends nodeComponent {
    public static classType = m4m["asbone"] = asbone;
    public cmop = "asbone";

}

// tslint:disable-next-line: max-classes-per-file class-name
export class particlesystem extends nodeComponent {
    public static classType = m4m["particlesystem"] = particlesystem;
    public cmop = "particlesystem";
    public particleSystemData: string = "";
    public material: string = "";
    public mesh: string = "";
    public sortingFudge: number = 0;
    public pivot: m4m.math.vector3 = m4m.poolv3();

}

// tslint:disable-next-line: max-classes-per-file class-name
export class f14effCmop extends nodeComponent {
    public static classType = m4m["f14effCmop"] = f14effCmop;
    public cmop = "f14effCmop";
    public f14eff: string = "";
    public delay: number = 0;

}
// tslint:disable-next-line: max-classes-per-file class-name
export class linerendererCmop extends nodeComponent {
    public static classType = m4m["linerendererCmop"] = linerendererCmop;
    public cmop = "linerendererCmop";
    public lineRendererData: string = "";
    public material: string = "";

}
// tslint:disable-next-line: max-classes-per-file class-name
export class keyFrameAniPlayer extends nodeComponent {
    public static classType = m4m["keyFrameAniPlayer"] = keyFrameAniPlayer;
    public cmop = "keyFrameAniPlayer";
    public clips: KeyFrameAnimtionClip[] = [];

}
// tslint:disable-next-line: max-classes-per-file class-name
export class spherecollider extends nodeComponent {
    public static classType = m4m["spherecollider"] = spherecollider;
    public cmop = "spherecollider";
    public center: m4m.math.vector3 = m4m.poolv3();
    public radius: number = 0;

}
// tslint:disable-next-line: max-classes-per-file class-name
export class godray extends nodeComponent {
    public static classType = m4m["godray"] = godray;
    public cmop = "godray";

}
// tslint:disable-next-line: max-classes-per-file class-name
export class waterComp extends nodeComponent {
    public static classType = m4m["water"] = waterComp;
    public cmop = "water";
    public copyFrom: number = 0;
    public defNumVertsPerRow: number = 0;

}