import { keyFrame } from "./keyFrame";

// tslint:disable-next-line: class-name
export class curve {
    public static classType = m4m["curve"] = curve;
    public path: string = "";
    public type: string = "";
    public propertyName: string = "";
    public keyFrames: keyFrame[] = [];

}
