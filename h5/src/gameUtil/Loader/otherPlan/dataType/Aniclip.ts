import { cMap } from "src/gameUtil/Data/Map";
import { subClip } from "./subClip";
export class Aniclip {
    public static classType = m4m["Aniclip"] = Aniclip;
    public fileName: string = "";
    public aniclipName: string = "";
    public fps: number = 0;
    public hasScaled: boolean = false;
    public loop: boolean = false;
    public boneCount: number = 0;
    public bones: string[] = [];
    public indexDic: cMap<number> = new cMap<number>(); public subclipCount: number = 0;
    public subclips: subClip[] = [];
    public frameCount: number = 0;
    public frames: cMap<Float32Array> = new cMap<Float32Array>();
}
