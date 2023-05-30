
// tslint:disable-next-line: class-name
export class tPoseInfo {
    public static classType = m4m["tPoseInfo"] = tPoseInfo;
    public tranName: string = "";
    public tposeq: m4m.math.quaternion = m4m.poolquat();
    public tposep: m4m.math.vector3 = m4m.poolv3();

}
