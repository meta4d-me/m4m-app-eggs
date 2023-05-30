
export class PoseBoneMatrix {
    public static classType = m4m["PoseBoneMatrix"] = PoseBoneMatrix;
    public r: m4m.math.quaternion = m4m.poolquat();
    public t: m4m.math.vector3 = m4m.poolv3();

}
