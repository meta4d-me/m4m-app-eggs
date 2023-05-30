
@m4m.reflect.nodeComponent
export class CameraFollowCtrBR extends m4m.framework.behaviour
{
    gameObject: m4m.framework.gameObject;

    start() {
    }

    private _target: m4m.framework.transform;
    setTarget(target: m4m.framework.transform) {
        this._target = target;
        this.calCameraPos();
        this.DoLookAtPoint();
    }

    private _lookAtPoint: m4m.math.vector3 = new m4m.math.vector3(0, 0, 0);
    private _targetOffset: m4m.math.vector3 = new m4m.math.vector3(0, 0, 0);
    setTargetOffset(x: number, y: number, z: number) {
        this._targetOffset.x = x;
        this._targetOffset.y = y;
        this._targetOffset.z = z;
        this.DoLookAtPoint();
    }

    private _distance: number = 0;
    get distance() { return this._distance; }
    set distance(v: number) { this._distance = v; this.calCameraDisAndLook(); };

    private _elevationAngle: number = 0;
    get elevationAngle() { return this._elevationAngle; }
    set elevationAngle(v: number)
    {
        this._elevationAngle = v;
        this.calCameraDisAndLook();
    }

    private _Yangle = 0;
    private _Yradian = 0;
    get Yangle() {
        return this._Yangle;
    }
    set Yangle(angle:number) {
        this._Yangle = angle;
        this._Yradian = angle * Math.PI / 180;
        this.calCameraDisAndLook();
    }
   
    private _lookDir: m4m.math.vector3 = new m4m.math.vector3(); 
    private calCameraDisAndLook() {
        this.calCamDis();
        this.DoLookAtPoint();
    }

    private calCamDis(){
        let qyaw = m4m.math.pool.new_quaternion();
        m4m.math.quatFromAxisAngle(m4m.math.pool.vector3_up, this._elevationAngle, qyaw);

        let qpitch = m4m.math.pool.new_quaternion();
        let leftVec3 = m4m.math.pool.new_vector3();
        leftVec3.x = 1;
        m4m.math.quatFromAxisAngle(leftVec3, this._Yangle, qpitch);
        m4m.math.quatMultiply(qyaw, qpitch, qyaw);

        let forward: m4m.math.vector3 = m4m.math.pool.new_vector3();
        forward.z = -1;
        m4m.math.quatTransformVector(qyaw, forward, forward);
        m4m.math.vec3ScaleByNum(forward, this.distance, this._lookDir);
        this.calCameraPos();

        m4m.math.pool.delete_vector3(leftVec3);
        m4m.math.pool.delete_vector3(forward);
        m4m.math.pool.delete_quaternion(qyaw);
        m4m.math.pool.delete_quaternion(qpitch);
    }

    private DoLookAtPoint() {
        if (!this._target) return;
        m4m.math.vec3Add(this._target.localTranslate, this._targetOffset, this._lookAtPoint);
        this.gameObject.transform.lookatPoint(this._lookAtPoint);
    }

    //暂停
    private _pause: boolean = false;
    public pause(value: boolean): void {
        this._pause = value;
    }
    private calCameraPos() {
        if (!this._target || this._pause) return;
        let trans = this.gameObject.transform;
        m4m.math.vec3Clone(this._target.localTranslate, trans.localTranslate);
        m4m.math.vec3Add(this._lookDir, trans.localTranslate, trans.localTranslate);
        trans.localTranslate = trans.localTranslate;
        trans.localRotate.z = trans.localPosition.x * Math.abs(trans.localPosition.x) / 360;
        // trans.localEulerAngles = trans.localEulerAngles;
        trans.localPosition.x *= 0.6;
        trans.localPosition = trans.localPosition;
        trans.localRotate = trans.localRotate;
    }

    //balls race need 
    private yg_moved = true;
    private yg_p = 0;
    private target_yg  = 0;
    private old_yg  = 0;
    private callback :Function;

    setLToYangle(y:number , callback = null){
        this.yg_moved = false;
        this.yg_p = 0;
        this.target_yg = y;
        this.old_yg = this._Yangle;
        this.callback = callback;
    }
    
    private readonly YGtimeLen  = 0.5;  //运动时间
    ckYGMove(delta : number){
        if(this.yg_moved) return;
        this.yg_p += delta * 1 / this.YGtimeLen;
        this.yg_p = this.yg_p >1 ? 1: this.yg_p;
        // let temp = (1-this.yg_p)  * this._Yangle + this.yg_p * this.target_yg;
        let temp =  m4m.math.numberLerp(this.old_yg,this.target_yg,this.yg_p);
        //yangle
        this._Yangle = temp;
        this._Yradian = temp * Math.PI / 180;
        this.calCamDis();

        if(this.yg_p>= 1 ){
            this.yg_moved = true; 
            if(this.callback){
                this.callback();
            }
        }
        this.calCameraPos();
    }

    update(delta: number) {
        //this.ckYGMove(delta);
        //this.calCameraPos();
    }
}  
