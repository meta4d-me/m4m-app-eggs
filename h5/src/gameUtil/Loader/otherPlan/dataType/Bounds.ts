
export class Bounds {
    public static classType = m4m["Bounds"] = Bounds;
    public extents: m4m.math.vector3 = m4m.poolv3();
    public size: m4m.math.vector3 = m4m.poolv3();
    public center: m4m.math.vector3 = m4m.poolv3();
    public min: m4m.math.vector3 = m4m.poolv3();
    public max: m4m.math.vector3 = m4m.poolv3();
}
