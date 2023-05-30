/**
 * 游戏 辅助工具类
 */
// tslint:disable-next-line: class-name
export class gameMathUtil {
    //重力
    public static G = 9.8;
    //----------------------------------------------------------------------------
    // game functions
    //----------------------------------------------------------------------------
    /** 计算墙面反射  , 返回 新的角度*/
    public static calcReboundWall(bulletAngle: number, wallBody, hitPoint: m4m.math.Ivec2) {
        if (!hitPoint || !wallBody) { return bulletAngle; }

        let bound = wallBody.bounds;
        let wHalf = (bound.max.x - bound.min.x) * 0.5;
        let hHalf = (bound.max.y - bound.min.y) * 0.5;
        let cPos = wallBody.position as m4m.math.Ivec2;
        if (hitPoint.y <= - hHalf + cPos.y) {
            return 180 - bulletAngle;
        } else
            if (hitPoint.x >= wHalf + cPos.x) {
                return 0 - bulletAngle;
            } else
                if (hitPoint.y >= hHalf + cPos.y) {
                    return 180 - bulletAngle;
                }
        return 0 - bulletAngle;
    }

    //----------------------------------------------------------------------------
    // other functions
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Angle functions
    //----------------------------------------------------------------------------
    /**
     * 计算角度 通过 二维向量
     * @param x 向量x
     * @param y 向量y
     * @param isRadian angle 是否是弧度
     */
    public static calcAngleByVec(x, y, isRadian = false) {
        let r = y > 0 ? this.TwoPi - Math.acos(x) : Math.acos(x);
        if (!isRadian) {
            return r * this.toDeg;
        }
        return r;
    }

    /**
     * 计算二维向量 通过 指定角度
     * @param angle 向量x
     * @param out 向量y
     * @param isRadian angle 是否是弧度
     */
    public static calcVec2ByAngle(angle: number, out: m4m.math.vector2, isRadian = false) {
        if (!out) { return; }
        out.x = Math.cos(isRadian ? angle : angle * this.toRadian);
        out.y = -Math.sin(isRadian ? angle : angle * this.toRadian);
    }

    /**
     * Get an angle into -180 to +180 range
     */
    public static FixAnglePlusMinusDegrees(ang: number) {
        let _ang = ang;
        while (_ang >= 180) {
            _ang -= 360;
        }
        while (_ang < -180) {
            _ang += 360;
        }
        return _ang;
    }

    /**
     * Get an angle into 0-360 range
     */
    public static FixAngleDegrees(ang: number) {
        // Is this really the best way to do this?
        let _ang = ang;
        while (_ang >= 360) {
            _ang -= 360;
        }
        while (_ang < 0) {
            _ang += 360;
        }
        return _ang;
    }

    /** As above, in radians */
    public static FixAngleRadians(ang: number) {
        let _ang = ang;
        while (_ang >= this.TwoPi) {
            _ang -= this.TwoPi;
        }
        while (_ang < 0) {
            _ang += this.TwoPi;
        }
        return _ang;
    }

    /** As above, in radians */
    public static FixAnglePlusMinusRadians(ang: number) {
        let _ang = ang;
        while (_ang >= Math.PI) {
            _ang -= this.TwoPi;
        }
        while (_ang < -Math.PI) {
            _ang += this.TwoPi;
        }
        return _ang;
    }

    public static MoveTowardsAngle(current: number, target: number, maxDelta: number): number {
        let _target = target;
        let num = this.DeltaAngle(current, _target);
        if ((-maxDelta < num) && (num < maxDelta)) {
            return _target;
        }
        _target = current + num;
        return this.MoveToward(current, _target, maxDelta);
    }
    public static MoveToward(current: number, target: number, maxDelta: number) {
        if (Math.abs(target - current) <= maxDelta) {
            return target;
        }
        return (current + (Math.sign(target - current) * maxDelta));
    }

    public static DeltaAngle(current: number, target: number) {
        let num = this.Repeat(target - current, 360);
        if (num > 180) {
            num -= 360;
        }
        return num;
    }

    public static Repeat(t: number, length: number) {
        return (t - (Math.floor(t / length) * length));
    }

    public static ToAngleDegreesXY(v: m4m.math.vector3): number {
        return Math.atan2(v.y, v.x) * 57.29578;
    }

    /** 角度 angle sin */
    public static sin(angle: number) {
        return Math.sin(angle * Math.PI / 180);
    }

    /** 角度 angle cos*/
    public static cos(angle: number) {
        return Math.cos(angle * Math.PI / 180);
    }

    /**
     * 获取指定向量的角度值
     * @param x 向量x值
     * @param y 向量y值
     * @param isRadian 是否是弧度制
     */
    public static getAngle(x: number, y: number, isRadian = false) {
        return Math.atan2(y, x) * (isRadian ? 1 : 57.29578);
    }

    //----------------------------------------------------------------------------
    // Blending and damping functions (混合和阻尼功能 )
    //----------------------------------------------------------------------------

    /**
     * Remap a value from one range (in0 -> in1, CLAMPED) to a different range (out0 -> out1).
     * Use this to interpolate between 2 values (out0, out1) based on where some other number (value) sits
     * between two other values (in0, in1).
     */
    public static Remap(value: number, in0: number, in1: number, out0: number, out1: number) {
        let num = in1 - in0;
        let num2 = (value - in0) / num;
        num2 = Math.max(0, Math.min(1, num2));
        return m4m.math.numberLerp(out0, out1, num2);
        // return out0 + (out1 - out0) * num2;
    }

    //----------------------------------------------------------------------------
    // Random functions（随机功能）
    //----------------------------------------------------------------------------

    // RandRange function that returns an int between rmin and rmax inclusive, compatible with the old skool engine convention.
    // Unity's Random.Range is not inclusive of the max value.
    // public static RandRange(int rmin, int rmax)
    // {
    // 	return (rmin==rmax) ? rmin : Random.Range(rmin, rmax+1);
    // }

    // Float version, this just calls the Unity one, just there for consistency so you can call Util.RandRange on either ints or floats

    /** 获取随机数 ， isInteger 为true 是返回 整数 (注：rmax 值是取不到的 ) */
    public static RandRange(rmin: number, rmax: number, isInteger = false) {
        let randNum = m4m.math.numberLerp(rmin, rmax, Math.random());
        return !isInteger ? randNum : Math.floor(randNum);
    }

    // return a random float between 0 and 1 inclusive
    // update: is this necessary?  think Random.value does this
    public static Rand01() {
        return Math.random();
    }

    public static RandMinus1To1() {
        return this.RandRange(-1, 1);
    }

    public static RandAngleDegrees() {
        let r = this.RandRange(0, 360);
        return (r == 360) ? 0 : r;
    }

    public static RandAngleRadians() {
        let r = this.RandRange(0, this.TwoPi);
        return (r == this.TwoPi) ? 0 : r;
    }

    public static RandBool() {
        return Math.random() < 0.5;
    }

    /**
     * 噪音缩放系数
     * @param noiseRange 波动噪音范围（不能为负数数）
     */
    public static noiseScale(noiseRange: number) {
        let halfNum = noiseRange * 0.5;
        return gameMathUtil.RandRange(1 - halfNum, halfNum + 1);
    }

    /** 单位圆内随机 */
    public static RandInsideUnitCircle(out: m4m.math.vector3) {
        let x = Math.random() * 2 - 1;
        let y = Math.sqrt(1 - x * x);
        y *= (Math.random() * 2 - 1);
        m4m.math.vec3Set(out, x, y, 0);
    }

    /** 单位球内随机 */
    public static RandInsideUnitSphere(out: m4m.math.vector3) {
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        let z = Math.random() * 2 - 1;
        m4m.math.vec3Set(out, x, y, z);
    }

    /** 单位圆上的随机 */
    public static RandOnUnitCircle(out: m4m.math.vector3) {
        this.RandInUnitSquare(out);
        m4m.math.vec2Normalize(out, out);
    }
    /** 单位正方形内的随机 */
    public static RandInUnitSquare(out: m4m.math.vector3) {
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        out.x = x;
        out.y = y;
    }
    /** 单位正方形上的随机 */
    public static RandOnUnitSquare(out: m4m.math.vector3) {
        let onX = this.RandBool();
        if (onX) {
            out.x = this.RandBool() ? 1 : -1;
            out.y = Math.random() * 2 - 1;
        } else {
            out.y = this.RandBool() ? 1 : -1;
            out.x = Math.random() * 2 - 1;
        }
    }
    /** 单位球面上随机 */
    public static RandOnUnitSphere(out: m4m.math.vector3) {
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        let z = Math.random() * 2 - 1;
        out.x = x;
        out.y = y;
        out.z = z;
        m4m.math.vec3Normalize(out, out);

    }
    //反差值
    public static InverseLerp(a: number, b: number, c: number) {
        if ((c - a) / (b - a) <= 0) {
            return 0;
        }
        return (c - a) / (b - a);
    }

    //圆点到接点
    public static DotFacingPoint(objectPos: m4m.math.vector3, objectVel: m4m.math.vector3, targetPos: m4m.math.vector3) {
        let dirToTarget = m4m.poolv3();
        m4m.math.vec3Subtract(targetPos, objectPos, dirToTarget);
        m4m.math.vec3Normalize(dirToTarget, dirToTarget);
        let dirVel = m4m.poolv3();
        m4m.math.vec3Normalize(objectVel, dirVel);
        let dot = m4m.math.vec3Dot(dirToTarget, dirVel);
        m4m.poolv3_del(dirToTarget);
        m4m.poolv3_del(dirVel);
        return dot;
    }

    //两个坐标距离的平方（比较用）
    public static vec3DisSqr(a: m4m.math.vector3, b: m4m.math.vector3): number {
        let x = a.x - b.x;
        let y = a.y - b.y;
        let z = a.z - b.z;
        return x * x + y * y + z * z;
    }

    //两个坐标距离的平方（比较用）
    public static vec2DisSqr(a: m4m.math.Ivec2, b: m4m.math.Ivec2): number {
        let x = a.x - b.x;
        let y = a.y - b.y;
        return x * x + y * y;
    }

    //v2长度平方（比较用）
    public static vec2SqrLength(src: m4m.math.Ivec2): number {
        return src.x * src.x + src.y * src.y;
    }

    // 其大裁剪为maxLength。 
    public static vec3ClampMagnitude(src: m4m.math.vector3, maxLength: number, outV3: m4m.math.vector3) {
        if (m4m.math.vec3SqrLength(src) > (maxLength * maxLength)) {
            m4m.math.vec3Normalize(src, outV3);
            m4m.math.vec3ScaleByNum(outV3, maxLength, outV3);
        }
    }

    /** Ivec2 接口克隆 */
    public static Ivec2Clone(src: m4m.math.Ivec2, out: m4m.math.Ivec2) {
        out.x = src.x;
        out.y = src.y;
    }

    /** Ivec3 接口克隆 */
    public static Ivec3Clone(src: m4m.math.Ivec3, out: m4m.math.Ivec3) {
        out.x = src.x;
        out.y = src.y;
        out.z = src.z;
    }

    /** Iquat 接口克隆 */
    public static IquatClone(src: m4m.math.Iquat, out: m4m.math.Iquat) {
        out.x = src.x;
        out.y = src.y;
        out.z = src.z;
        out.w = src.w;
    }

    //----------------------------------------------------------------------------
    // Vector/math functions（向量方法）
    //----------------------------------------------------------------------------

    /**
     * 将transform 的世界方向向量 ， 转换到 本地 方向向量
     * @param targetTran transform对象
     * @param srcDir 世界方向向量
     * @param outDir 本地方向向量
     */
    public static InverseTransformDirection(targetTran: m4m.framework.transform, srcDir: m4m.math.vector3, outDir: m4m.math.vector3) {
        let p = targetTran.parent;
        if (!p || !p.parent) {
            m4m.math.vec3Clone(srcDir, outDir);
        } else {
            //targetTran.wpos => 0,0,0
            let tmtx = this.helpMtx;
            let tarLocalTran = this.helpVec3;
            let pWorldMtx = targetTran.parent.getWorldMatrix();
            m4m.math.matrixInverse(pWorldMtx, tmtx);
            m4m.math.matrixTransformVector3(this.vector3Zero, tmtx, tarLocalTran);

            let localMtx = this.helpMtx1;
            m4m.math.matrixClone(targetTran.getLocalMatrix(), localMtx);
            localMtx.rawData[12] = tarLocalTran.x;
            localMtx.rawData[13] = tarLocalTran.y;
            localMtx.rawData[14] = tarLocalTran.z;
            localMtx.rawData[15] = 1;

            //srcPoint.wpos => add to targetTran
            let worldMtx = this.helpMtx2;
            m4m.math.matrixMultiply(pWorldMtx, localMtx, worldMtx);

            let _tmtx = this.helpMtx3;
            m4m.math.matrixInverse(worldMtx, _tmtx);
            m4m.math.matrixTransformVector3(srcDir, _tmtx, outDir);
        }

        m4m.math.vec3Normalize(outDir, outDir);
    }

    // Function to calculate the launch direction for a projectile so it will try to intercept a moving target.
    // Does not currently solve this properly, just gives an improved direction versus aiming straight at the target.
    // This is nicked from Grabatron.  Adapted for 2D XY only, using Vector3.
    // tslint:disable-next-line: max-line-length
    public static GetInterceptDirectionXY(from: m4m.math.vector3, speed: number,destPos: m4m.math.vector3, destVel: m4m.math.vector3, outV3: m4m.math.vector3) {
        // FGAssert.Assert(speed > 0.0f);

        // only interested in 2D XY pos
        from.z = 0;
        destPos.z = 0;
        destVel.z = 0;
        // figure out time taken if we shoot straight at target point
        let t = 1 / m4m.math.vec3Distance(destPos, from);

        // see where the target would end up if it moved for that much time without changing speed/dir
        let _destVel = gameMathUtil.helpVec3;
        let guessPos = gameMathUtil.helpVec3v1;
        m4m.math.vec3ScaleByNum(destVel, t, _destVel);
        m4m.math.vec3Add(destPos, _destVel, guessPos);

        // aim at that point instead
        m4m.math.vec3Subtract(guessPos, from, outV3);
        m4m.math.vec3Normalize(outV3, outV3);
    }

    // Thing to get a curve between 3 points.  todo: improve to work with arbitrary array of points, or whatever.
    public static GetSimpleSplinePoint(p0: m4m.math.vector3, p1: m4m.math.vector3, p2: m4m.math.vector3, t: number, outV3: m4m.math.vector3) {
        let p1Double = gameMathUtil.helpVec3;
        m4m.math.vec3ScaleByNum(p1, 2, p1Double);
        let p0P2Add = gameMathUtil.helpVec3v1;
        m4m.math.vec3Add(p0, p2, p0P2Add);
        // tslint:disable-next-line: max-line-length
        m4m.math.vec3ScaleByNum(p0P2Add, 0.5, p0P2Add);// get control point to use instead of p1, so curve will pass through p1 instead of just getting dragged part way towards it
        let pc = gameMathUtil.helpVec3v2;
        m4m.math.vec3Subtract(p1Double, p0P2Add, pc);
        let lp0 = gameMathUtil.helpVec3v3;
        let lp1 = gameMathUtil.helpVec3v4;
        m4m.math.vec3SLerp(p0, pc, t, lp0);// get lerped point between start and control point
        m4m.math.vec3SLerp(pc, p2, t, lp1);// get lerped point between control point and end

        m4m.math.vec3SLerp(lp0, lp1, t, outV3);// get final lerped point between those two

        // tslint:disable-next-line: max-line-length
        // Vector3 pc = p1 * 2.0 - ( p0 + p2 )*0.5;	// get control point to use instead of p1, so curve will pass through p1 instead of just getting dragged part way towards it
        // Vector3 lp0 = Vector3.Lerp(p0, pc, t);	// get lerped point between start and control point
        // Vector3 lp1 = Vector3.Lerp(pc, p2, t);	// get lerped point between control point and end
        // return Vector3.Lerp(lp0, lp1, t);		// get final lerped point between those two
    }

    public static rotateByAxis(trans: m4m.framework.transform, axis: m4m.math.vector3, speed: number) {
        m4m.math.quatFromAxisAngle(axis, speed, this.helpQuat);
        m4m.math.quatMultiply(trans.localRotate, this.helpQuat, trans.localRotate);
    }
    //----------------------------------------------------------------------------
    // Unity GameObject/Component helper functions 
    //----------------------------------------------------------------------------

    // tslint:disable-next-line: max-line-length
    // convert stats for gameplay accessories from percentage increase, to value to scale by (e.g. for something to increase by +5%, convert stat from 5 to 1.05)
    public static ScaleFromPerc(f: number) {
        return (f * 0.01) + 1;
    }

    public static ScaleFromPercClamped(f: number) {
        return m4m.math.floatClamp(f * 0.01, -1, 1) + 1;
    }

    //----------------------------------------------------------------------------
    // Helpers for serialization / parsing
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Helpers for rotation
    //----------------------------------------------------------------------------
    /**
     * Rotates a rotation from towards to.
     * @param from 
     * @param to 
     * @param maxDegreesDelta 
     * @param out result
     */
    public static quatRotateTowards(from: m4m.math.quaternion, to: m4m.math.quaternion, maxDegreesDelta: number, out: m4m.math.quaternion) {

        let num = this.quatAngle(from, to);
        if (num == 0) {
            return to;
        }
        let t = Math.min(1, (maxDegreesDelta / num));
        m4m.math.quatLerp(from, to, out, t);
    }
    /**
     * The dot product between two rotations.
     * @param a 
     * @param b 
     */
    public static quatDot(a: m4m.math.quaternion, b: m4m.math.quaternion) {
        return ((((a.x * b.x) + (a.y * b.y)) + (a.z * b.z)) + (a.w * b.w));
    }
    /**
     * Returns the angle in degrees between two rotations a and b.
     * @param a 
     * @param b 
     */
    public static quatAngle(a: m4m.math.quaternion, b: m4m.math.quaternion) {
        return ((Math.acos(Math.min(Math.abs(this.quatDot(a, b)), 1)) * 2) * 57.29578);
    }

    //----------------------------------------------------------------------------
    // Helpers for vector3
    //----------------------------------------------------------------------------
    public static vec3Multiplier(_in: m4m.math.vector3, v: number, out: m4m.math.vector3) {
        out.x = _in.x * v;
        out.y = _in.y * v;
        out.z = _in.z * v;
    }

    //----------------------------------------------------------------------------
    // color function
    //----------------------------------------------------------------------------
    /**
    * 16进制颜色转10进制
    * @param str 16 进制rgb 颜色数据字符串（例如ffffff）
    * @param out 
    */
    public static color16To10(str: string, out: m4m.math.color | m4m.math.vector4) {
        if (!out) { return; }

        if (out instanceof m4m.math.color) {
            out.r = parseInt(str.substring(0, 2), 16) / 255;
            out.g = parseInt(str.substring(2, 4), 16) / 255;
            out.b = parseInt(str.substring(4, 6), 16) / 255;
            out.a = str.length >= 8 ? parseInt(str.substring(6, 8), 16) / 255 : 1;
        } else {
            out.x = parseInt(str.substring(0, 2), 16) / 255;
            out.y = parseInt(str.substring(2, 4), 16) / 255;
            out.z = parseInt(str.substring(4, 6), 16) / 255;
            out.w = str.length >= 8 ? parseInt(str.substring(6, 8), 16) / 255 : 1;
        }
    }

    /** 16 进制转 rgb */
    public static hexToRgb(hex: string) {
        let arr = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            , (m, r, g, b) => "#" + r + r + g + g + b + b)
            .substring(1)
            .match(/.{2}/g)
            .map((x) => parseInt(x, 16));
        return arr;
    }

    //----------------------------------------------------------------------------
    // number function
    //----------------------------------------------------------------------------

    /**
     * 计算数值队列的方差
     * @param nums 数值队列
     */
    public static variance(nums: number[]) {
        if (!nums) { return 0; }
        let totalNum = 0;
        nums.forEach((num) => {
            totalNum += num;
        });
        let averge = totalNum / nums.length;

        let defTotal = 0;
        nums.forEach((num) => {
            let def = averge - num;
            defTotal += def * def;
        });

        return defTotal / nums.length;
    }

    /**
     * 二分插入法
     * @param insertNum 要插入的数值
     * @param arr 被插入的数组
     */
    public static insertSortWithBinarySearch(insertNum: number, arr: number[]) {
        let low = 0;
        let high = arr.length;
        let mid = -1;
        while (low <= high) {
            mid = low + Math.floor((high - low) * 0.5);
            if (arr[mid] > insertNum) {
                high = mid - 1;
            } else { // 元素相同时，也插入在后面的位置                
                low = mid + 1;
            }
        }
        arr.splice(mid, 0, insertNum);
        // console.log("idx :" + mid);
    }

    //------------ tween -----------------

    /** 缓动方法 IN => Out 
     * p : 过程进度
     * MaxVal : 过程的最大值
     * mathIn : in 过程的 tween方法
     * mathOut : out 过程的 tween方法
    */
    public static tweenInOut(p: number, MaxVal: number, methodIn: m4m.framework.tweenMethod, methodOut: m4m.framework.tweenMethod) {
        let mth;
        let tp;
        if (p <= 0.5) {
            mth = methodIn;
            tp = p * 2;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * MaxVal / 2;
        }

        mth = methodOut;
        tp = p * 2 - 1;
        return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * MaxVal / 2 + MaxVal / 2;
    }

    //常量系数
    /** 变换到角度系数 */
    public static readonly toDeg = 57.29578; // Rad2Deg
    /** 变换到弧度系数 */
    public static readonly toRadian = 0.0174532924;   // Deg2Rad

    // public constants
    public static readonly TwoPi: number = Math.PI * 2;

    // default parameters
    public static readonly mDefaultMaxDampingScale = 0.125;

    private static readonly vector3Zero = new m4m.math.vector3();
    private static readonly helpVec3 = new m4m.math.vector3();
    private static readonly helpVec3v1 = new m4m.math.vector3();
    private static readonly helpVec3v2 = new m4m.math.vector3();
    private static readonly helpVec3v3 = new m4m.math.vector3();
    private static readonly helpVec3v4 = new m4m.math.vector3();

    private static readonly helpQuat = new m4m.math.quaternion();

    private static readonly helpMtx = new m4m.math.matrix();
    private static readonly helpMtx1 = new m4m.math.matrix();
    private static readonly helpMtx2 = new m4m.math.matrix();
    private static readonly helpMtx3 = new m4m.math.matrix();

}