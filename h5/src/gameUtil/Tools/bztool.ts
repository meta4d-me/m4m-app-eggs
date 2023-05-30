//贝塞尔计算工具
export class BezierCurveTool {
    private static readonly helpV2 = new m4m.math.vector2();
    private static readonly helpV2v1 = new m4m.math.vector2();
    private static readonly helpV2v2 = new m4m.math.vector2();
    private static readonly helpV2v3 = new m4m.math.vector2();
    private static readonly helpV2v4 = new m4m.math.vector2();
    private static readonly helpV2v5 = new m4m.math.vector2();

    private static cupV2 = new m4m.math.vector2();

    /**
     * 评估值
     * @param kfs 所有的关键帧对象
     * @param _time normal 时间 （0 - 1）
     */
    public static evaluate(kfs: m4m.framework.keyFrame[], _time: number) {
        if (kfs.length < 2) { return 0; }
        let time = _time;
        if (_time > 1) { time = 1; }
        let kfL: m4m.framework.keyFrame;
        let kfR: m4m.framework.keyFrame;
        if (kfs.length == 2) {
            kfL = kfs[0];
            kfR = kfs[1];
        } else {
            let tIdx = 0;
            kfR = kfs[tIdx];
            while (kfR.time < time) {
                tIdx++;
                kfR = kfs[tIdx];
            }
            kfL = kfs[tIdx - 1];
        }
        return this.calcValue(kfL, kfR, time);
    }

    /**
     * 计算 曲线的值
     * @param kfL 左边帧对象
     * @param kfR 右边帧对象
     * @param playTime 时间值
     */
    public static calcValue(kfL: m4m.framework.keyFrame, kfR: m4m.framework.keyFrame, playTime: number) {
        //是否 是常量
        if (kfL.outTangent == Infinity || kfR.inTangent == Infinity) { return kfL.value; }
        let rate = (playTime - kfL.time) / (kfR.time - kfL.time);
        let v2 = BezierCurveTool.converCalc(kfL.value, kfR.value, kfL.time, kfR.time, kfL.inTangent, kfR.outTangent, rate);
        return v2.y;
    }

    private static converCalc(inV: number, outV: number, inTime: number, outTime: number, inTangent: number, outTangent: number, t: number) {
        let p0 = this.helpV2;
        let p1 = this.helpV2v1;
        let p2 = this.helpV2v2;
        let p3 = this.helpV2v3;
        m4m.math.vec2Set(p0, inTime, inV);
        m4m.math.vec2Set(p3, outTime, outV);

        let dir1 = this.helpV2v4;
        m4m.math.vec2Set(dir1, inTangent < 0 ? -1 : 1, Math.sqrt(inTangent * inTangent + 1));
        let dir2 = this.helpV2v5;
        m4m.math.vec2Set(dir2, outTangent < 0 ? -1 : 1, Math.sqrt(outTangent * outTangent + 1));

        m4m.math.vec2Add(p0, dir1, p1);
        m4m.math.vec2Add(p3, dir2, p2);
        BezierCurveTool.calcCurve(t, p0, p1, p2, p3, BezierCurveTool.cupV2);

        return BezierCurveTool.cupV2;
    }

    //三阶 贝塞尔曲线
    private static calcCurve(t: number, P0: m4m.math.vector2, P1: m4m.math.vector2, P2: m4m.math.vector2,
                             P3: m4m.math.vector2, out: m4m.math.vector2) {
        out.x = this.CurveEquation(t, P0.x, P1.x, P2.x, P3.x);
        out.y = this.CurveEquation(t, P0.y, P1.y, P2.y, P3.y);
        return out;
    }

    private static CurveEquation(t: number, val0: number, val1: number, val2: number, val3: number) {
        // tslint:disable-next-line: max-line-length
        // var res = (1.0 - t) * (1.0 - t) * (1.0 - t) * val0 + 3.0 * t * (1.0 - t) * (1.0 - t) * val1 + 3.0 * t * t * (1.0 - t) * val2 + t * t * t * val3;
        let res = (1 - t) * (1 - t) * (1 - t) * val0 + t * (1 - t) * (1 - t) * val1 * 2 + t * t * (1 - t) * val2 * 2 + t * t * t * val3;
        return res;
    }
}