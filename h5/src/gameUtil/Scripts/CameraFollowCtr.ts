import { gdAnimPlayer } from "../Tools/engineParallel/m4m/gdAnimPlayer";
import { getSpTransform } from "../Tools/engineParallel/parallelEngineTool";
import { ISpCustomComp, ISpGameObject, ISpTransform } from "../Tools/engineParallel/spInterface";

@m4m.reflect.nodeComponent
export class CameraFollowCtr implements ISpCustomComp {
    protected _target: ISpTransform;
    protected _helpPointTarget: ISpTransform = getSpTransform(new m4m.framework.transform());
    protected _lookAtPoint: m4m.math.vector3 = new m4m.math.vector3(0, 0, 0);
    protected _targetOffset: m4m.math.vector3 = new m4m.math.vector3(0, 0, 0);
    protected _distance: number = 0;

    public minPanAngle: number = -Infinity;
    public maxPanAngle: number = Infinity;
    public minTileAngle: number = -89;
    public maxTileAngle: number = 89;

    get distance() { return this._distance; }
    set distance(v: number) { this._distance = v; this.calCameraDisAndLook(); }
    protected _panAngle: number = 0;
    /** 平移角度 */
    get panAngle() { return this._panAngle; }
    set panAngle(v: number) {
        this._panAngle = Math.max(this.minPanAngle, Math.min(this.maxPanAngle, v));
        this.calCameraDisAndLook();
    }
    protected _tiltAngle = 0;
    protected _tiltRadian = 0;
    /** 倾斜角 */
    get tiltAngle() {
        return this._tiltAngle;
    }
    set tiltAngle(v: number) {
        this._tiltAngle = Math.max(this.minTileAngle, Math.min(this.maxTileAngle, v));
        // this._tiltAngle = Math.max(this.minTileAngle, v);//测试
        this._tiltRadian = v * Math.PI / 180;
        this.calCameraDisAndLook();
    }
    protected _lookDir: m4m.math.vector3 = new m4m.math.vector3();
    //暂停
    protected _pause: boolean = false;
    //public---------------------------------------------------------
    public enabled: boolean;
    public gameObject: ISpGameObject;
    public onPlay(): void {
    }
    public remove(): void {
    }

    public start() {

    }

    /**
     * 设置 相机的观察目标点
     * @param position 观察目标点
     */
    public setTargetPoint(position: m4m.math.vector3) {
        let _t = this._helpPointTarget;
        m4m.math.vec3Clone(position, _t.localPosition);
        _t.localPosition = _t.localPosition;
        this.setTarget(_t);
    }

    /**
     * 获取 实际跟随目标点
     * @param outPos 获取的目标点
     */
    public getRealLookPoint(outPos: m4m.math.vector3) {
        if (!this._target || !outPos) { return; }
        m4m.math.vec3Clone(this._target.localPosition, outPos);
        m4m.math.vec3Add(outPos, this._targetOffset, outPos);
    }

    /**
     * 设置 相机的观察目标
     * @param target 观察目标
     */
    public setTarget(target: ISpTransform) {
        this._target = target;
        this.calCameraPos();
        this.DoLookAtPoint();
    }
    /**
     * 设置 相机的观察目标的偏移量
     * @param x 坐标x
     * @param y 坐标y
     * @param z 坐标z
     */
    public setTargetOffset(x: number, y: number, z: number) {
        this._targetOffset.x = x;
        this._targetOffset.y = y;
        this._targetOffset.z = z;
        this.DoLookAtPoint();
    }

    /**
     *  暂停跟随运动 
     * @param value 
     */
    public pause(value: boolean): void {
        this._pause = value;
    }

    public update(delta: number) {
        //this.ckYGMove(delta);
        //this.calCameraPos();
    }

    /**
     * 计算一步相机的跟随。
     */
    public step() {
        if (this._pause || !this.enabled) { return; }
        this.calCameraPos();
    }

    /**
     * 计算 目标点指向相机的 方向
     * @param out 返回的方向
     */
    public calCamZDir(out: m4m.math.vector3) {
        m4m.math.vec3Set(out, 0, 0, -1);
        let qyaw = m4m.math.pool.new_quaternion();
        m4m.math.quatFromAxisAngle(m4m.math.pool.vector3_up, this._panAngle + 180, qyaw);
        let qpitch = m4m.math.pool.new_quaternion();
        m4m.math.quatFromAxisAngle(m4m.math.pool.vector3_right, this._tiltAngle, qpitch);
        m4m.math.quatMultiply(qyaw, qpitch, qyaw);
        m4m.math.quatTransformVector(qyaw, out, out);

        m4m.math.pool.delete_quaternion(qyaw);
        m4m.math.pool.delete_quaternion(qpitch);
    }

    protected calCameraDisAndLook() {
        this.calCamDis();
        this.calCameraPos();
        this.DoLookAtPoint();
    }

    protected calCamDis() {
        let forward: m4m.math.vector3 = m4m.math.pool.new_vector3();
        this.calCamZDir(forward);
        m4m.math.vec3ScaleByNum(forward, this.distance, this._lookDir);
        // this.calCameraPos();
        m4m.math.pool.delete_vector3(forward);
    }

    protected DoLookAtPoint() {
        if (!this._target) { return; }
        m4m.math.vec3Add(this._target.localPosition, this._targetOffset, this._lookAtPoint);
        let _trans = this.gameObject.transform;
        _trans.lookatPoint(this._lookAtPoint);
        _trans.localRotate = _trans.localRotate;

    }
    protected calCameraPos() {
        if (!this._target) { return; }
        let trans = this.gameObject.transform;
        m4m.math.vec3Clone(this._target.localPosition, trans.localPosition);
        m4m.math.vec3Add(this._lookDir, trans.localPosition, trans.localPosition);
        trans.localPosition = trans.localPosition;
    }
}
