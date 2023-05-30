import { FrameMgr } from "Tools/FrameMgr";
import { ReuseArray } from "Data/ReuseArray";
import { gameMathUtil } from "Tools/gameMathUtil";
import { DebugLineTool2d } from "Tools/DebugLineTool2d";
import { commTool } from "./commTool";

interface IGridRegion {
    id: string;
    startCol: number;
    endCol: number;
    startRow: number;
    endRow: number;
}

interface IRaycastResult{
    hited : boolean;
    hitPoint : m4m.math.Ivec2;
    hitedBody : any;
}
/**
 * 2d 物理拓展 工具
 */
// tslint:disable-next-line: class-name
export class physics2dExpandsTool {
    static get Bounds(){
        if (!this._Bounds) { this._Bounds = m4m.framework.physics2D.Matter.Bounds; }
        return this._Bounds;
    }
    static get SAT(){
        if (!this._SAT) { this._SAT = m4m.framework.physics2D.Matter.SAT; }
        return this._SAT;
    }
    static get Bodies(){
        if (!this._Bodies) { this._Bodies = m4m.framework.physics2D.Matter.Bodies; }
        return this._Bodies;
    }
    static get Vertices(){
        if (!this._Vertices) { this._Vertices = m4m.framework.physics2D.Matter.Vertices; }
        return this._Vertices;
    }
    static get Body(){
        if (!this._Body) { this._Body = m4m.framework.physics2D.Matter.Body; }
        return this._Body;
    }
    static get Axes(){
        if (!this._Axes) { this._Axes = m4m.framework.physics2D.Matter.Axes; }
        return this._Axes;
    }

    //测试-------------------------------
    //测试 圆形相交检测
    private static testCircleIntersect(tran2d : m4m.framework.transform2D , layerMask = 0xFFFFFFFF) {
        if (!tran2d) { return; }
        let tepms: ReuseArray<number> = new ReuseArray<number>();
        let obj = {
            update: () => {
                //测试 更随到玩家身上
                // let p = player.Instance;
                if (tran2d) {
                    let pTran = tran2d;
                    // this.circleBody.setPosition(pTran.localTranslate);

                    tepms.length = 0;
                    let r = 100;
                    if (this.Draw2dDebug) {
                        let pos = pTran.localTranslate;
                        DebugLineTool2d.drawCircle(pos, r, 2, 2);

                    }

                    //展示圆形 选中
                    // physicsExpandsTool.queryCircle(pTran.localTranslate,r,tepms , GameLogic.layerBitDefault);
                    physics2dExpandsTool.queryCircle(pTran.localTranslate, r, tepms, layerMask);
                    if (tepms.length) {
                        let len = tepms.length;
                        for (let i = 0; i < len; i++) {
                            let b = m4m.framework.physics2D.getBody(tepms.get(i));
                        }
                    }

                    //点选中 （0,0） 点
                    let v2 = m4m.poolv2();
                    if (this.queryPoint(pTran.physicsBody , v2)) {
                        console.error(`点：${v2}  , 在玩家内部！`);
                    }
                    m4m.poolv2_del(v2);
                }
            },
        };
        FrameMgr.Add(obj.update, obj);
    }
    /**
     * 设置 2d 物理物体 碰撞 开 或 关
     * @param pBody 2d 物理物体实例
     * @param enable 
     */
    public static SetPhyCollision(pBody: m4m.framework.I2DPhysicsBody, enable: boolean) {
        if (!pBody || !pBody.body || !pBody.body.collisionFilter) { return; }
        let tag = physics2dExpandsTool.PhyCollisionTag;
        let cFilter = pBody.body.collisionFilter;

        let org: m4m.framework.collisionFilter;
        if (!pBody[tag]) {
            org = {};
            pBody[tag] = org;
            this.cloneFilter(cFilter, org);
        } else {
            org = pBody[tag];
        }

        if (enable) {
            this.cloneFilter(org, cFilter);
        } else {
            this.cloneFilter(this.disbleFilter, cFilter);
        }
    }

    private static cloneFilter(data: m4m.framework.collisionFilter, out: m4m.framework.collisionFilter) {
        if (!data || !out) { return; }
        out.category = data.category;
        out.group = data.group;
        out.mask = data.mask;
    }

    /**
     * 查询 2d物理物体是否与指定点发生了碰撞
     * @param phyBody 2d物理对象
     * @param point 2d的点
     * @param isExact 是否高精度检测 （粗进度只检测bounds）
     */
    public static queryPoint(phyBody: m4m.framework.I2DPhysicsBody, point: m4m.math.Ivec2, isExact = false): boolean {
        let result = false;
        if (!phyBody || !phyBody.body || !point) { return result; }
        result = this.boundsContains(phyBody.body.bounds, point);
        if (result && isExact) {
            //matter SAT 不支持 ，后续再找找算法
        }
        return result;
    }

    /**
     * 查询 所有的bodie 通过指定的圆形区域内
     * @param pos 圆形位置
     * @param radius 圆半径
     * @param outlist 输出bodie ID 列表
     * @param layerMask 挑选的层级
     */
    public static queryCircle(pos: m4m.math.Ivec2, radius: number, outlist: ReuseArray<number>, layerMask: number = 0xFFFFFF) {
        if (!outlist) { return; }
        outlist.length = 0;
        if (!pos || layerMask == 0) { return; }
        let bs = this.cupBodies;
        bs.clear();
        this.gridFilterBycircle(pos, radius, bs);
        let blen = bs.length;
        // if(this.Draw2dDebug && this.drawBound){
        //     this.debugDrawBoundsList(bs);
        // }
        // let squareRadius = Math.pow(radius,2);
        for (let i = 0; i < blen; i++) {
            // let bodyA = bs[i];
            let bodyA = bs.get(i);
            if (!(bodyA.collisionFilter.category & layerMask)) {  //类型过滤
                continue;
            }
            if (this.fastBoundVSCircle(bodyA.bounds, pos, radius)) {
                for (let j = bodyA.parts.length === 1 ? 0 : 1; j < bodyA.parts.length; j++) {
                    let part = bodyA.parts[j];
                    if (this.fastBoundVSCircle(part.bounds, pos, radius)) {
                        if (this.Draw2dDebug && this.drawBound) {
                            this.debugDrawBounds(part, true);
                        }
                        outlist.push(bodyA.id);
                        break;
                    }
                }
            }
        }
    }

    //高效版 覆盖检测 边界框 和 圆形 
    private static fastBoundVSCircle(bound: { max: any, min: any }, pos: m4m.math.Ivec2, radius: number) {
        let halfw = (bound.max.x - bound.min.x) * 0.5;
        let halfh = (bound.max.y - bound.min.y) * 0.5;
        let circleDisX = Math.abs(Math.abs(pos.x) - Math.abs(bound.min.x + halfw));
        let circleDisY = Math.abs(Math.abs(pos.y) - Math.abs(bound.min.y + halfh));

        if (circleDisX > (halfw + radius)) { return false; }
        if (circleDisY > (halfh + radius)) { return false; }
        if (circleDisX <= (halfw)) { return true; }
        if (circleDisY <= (halfh)) { return true; }
        let cxW = circleDisX - halfw;
        let cyH = circleDisY - halfh;
        let squareDistance = cxW * cxW + cyH * cyH;

        return squareDistance <= radius * radius;
    }

    private static gridFilter(grid, region: IGridRegion, outBodies: ReuseArray<m4m.framework.Ibody> , repeatTestMap : {} = null) {
        let r = region;
        //筛选出 区域内的 bodie 
        for (let col = r.startCol; col <= r.endCol; col++) {
            for (let row = r.startRow; row <= r.endRow; row++) {
                // let bucketId = this.getGridBucketId(col, row);
                let bucketId = col << 16 | row; // bucketId 计算方式有问题， 当 col 或 row 都为负时计算不唯一
                let bucket = grid.buckets[bucketId];
                if (!bucket) { continue; }
                if (this.Draw2dDebug && this.drawbucketGird) {
                    this.debugDrawGrid(col, row, grid);
                }
                let len = bucket.length;
                for (let i = 0; i < len; i++) {
                    let bodyB = bucket[i] as m4m.framework.Ibody;
                    if (repeatTestMap){
                        if (repeatTestMap[bodyB.id]) {     continue; }
                        repeatTestMap[bodyB.id] = true;
                    }
                    outBodies.push(bodyB);
                }
            }
        }
    }

    private static debugDrawBounds(body: m4m.framework.Ibody, isSelect = false) {
        if (!this.Draw2dDebug || !this.drawBound || !body) { return; }
        let b = body.bounds;
        if (isSelect) {
            DebugLineTool2d.drawRect(b.min.x, b.min.y, b.max.x - b.min.x, b.max.y - b.min.y, 3, 7);
        } else {
            DebugLineTool2d.drawRect(b.min.x, b.min.y, b.max.x - b.min.x, b.max.y - b.min.y, 2, 7, 0.5);
        }
    }

    //绘制bounds
    private static debugDrawBoundsList(bodys: ReuseArray<m4m.framework.Ibody>) {
        if (!this.Draw2dDebug || !this.drawBound) { return; }
        let len = bodys.length;
        for (let i = 0; i < len; i++) {
            let body = bodys.get(i);
            this.debugDrawBounds(body);
        }
    }

    //绘制网格
    private static debugDrawGrid(col: number, row: number, grid) {
        if (!this.Draw2dDebug || !this.drawbucketGird) { return; }
        let x = col * grid.bucketWidth;
        let y = row * grid.bucketHeight;
        DebugLineTool2d.drawRect(x, y, grid.bucketWidth, grid.bucketHeight, 6, 2, 0.5);
    }

    /** 获取bodies 通过指定圆 */
    private static gridFilterBycircle(pos: m4m.math.Ivec2, radius: number, outBodies: ReuseArray<m4m.framework.Ibody>) {
        let grid = m4m.framework.physics2D.matterEngine.broadphase;
        if (!grid) { return; }
        this.gridGetRegionByCir(grid, pos, radius, this.helpRegion);
        let tempMap = {};
        this.gridFilter(grid, this.helpRegion, outBodies , tempMap);
    }

    /** 获取bodies 通过指定body的边界 */
    private static gridFilterByBodyBound(body: m4m.framework.Ibody, outBodies: ReuseArray<m4m.framework.Ibody>) {
        let grid = m4m.framework.physics2D.matterEngine.broadphase;
        if (!grid) { return; }
        this.gridGetRegion(grid, body, this.helpRegion);
        this.gridFilter(grid, this.helpRegion, outBodies);
    }

    // 获取 格子的区域 by 圆
    private static gridGetRegionByCir(grid, pos: m4m.math.Ivec2, radius: number, region: IGridRegion) {
        let startCol = Math.floor((pos.x - radius) / grid.bucketWidth);
        let endCol = Math.floor((pos.x + radius) / grid.bucketWidth);
        let startRow = Math.floor((pos.y - radius) / grid.bucketHeight);
        let endRow = Math.floor((pos.y + radius) / grid.bucketHeight);
        this.setGridRegion(startCol, endCol, startRow, endRow, region);
    }

    // 获取 格子的区域
    private static gridGetRegion(grid, body: m4m.framework.Ibody, region: IGridRegion) {
        let bounds = body.bounds;
        let startCol = Math.floor(bounds.min.x / grid.bucketWidth);
        let endCol = Math.floor(bounds.max.x / grid.bucketWidth);
        let startRow = Math.floor(bounds.min.y / grid.bucketHeight);
        let endRow = Math.floor(bounds.max.y / grid.bucketHeight);
        this.setGridRegion(startCol, endCol, startRow, endRow, region);
    }

    //设置 格子的区域
    private static setGridRegion(startCol: number, endCol: number, startRow: number, endRow: number, region: IGridRegion) {
        if (!region) { return; }
        region.id = startCol + "," + endCol + "," + startRow + "," + endRow;
        region.startCol = startCol;
        region.endCol = endCol;
        region.startRow = startRow;
        region.endRow = endRow;
    }

    // private static getGridBucketId(col, row){
    //     return 'C' + col + 'R' + row;
    // }

    /** 检测 点 是否被 bounds 包含  */
    private static boundsContains(bounds: { max: any, min: any }, point: m4m.math.Ivec2) {
        return point.x >= bounds.min.x && point.x <= bounds.max.x
            && point.y >= bounds.min.y && point.y <= bounds.max.y;
    }

    /**
     * Returns a list of collisions between `body` and `bodies`.
     * @method collides
     * @param {body} body
     * @param {body[]} bodies
     * @return {object[]} list of collisions 
     */
    public static collides(body, bodies, collisions: ReuseArray<any>) {
        let Bounds = this.Bounds;
        let SAT = this.SAT;
        if (!Bounds || !SAT || !collisions) { return; }

        collisions.clear();

        for (let i = 0; i < bodies.length; i++) {
            let bodyA = bodies[i];

            if (Bounds.overlaps(bodyA.bounds, body.bounds)) {
                for (let j = bodyA.parts.length === 1 ? 0 : 1; j < bodyA.parts.length; j++) {
                    let part = bodyA.parts[j];

                    if (Bounds.overlaps(part.bounds, body.bounds)) {
                        let collision = SAT.collides(part, body);
                        if (collision && collision.collided) {
                            collisions.push(collision);
                            break;
                        }
                    }
                }
            }
        }
    }
    static get rayHelp_rectBody(){
        if (!this._rayHelpRectBody){
            let rBody = this._rayHelpRectBody = this.Bodies.rectangle(0,0,100,100,{angle: 0});
            rBody.inertia = 100000;
            rBody.inverseInertia = 1 / rBody.inertia;
        }
        return this._rayHelpRectBody;
    }

    /**
     * 投射一束射线检测与bodies 的碰撞结果 ，返回rayhitResult 对象
     * @param bodies 检测的对象组
     * @param rayPoint 射线的发射点
     * @param rayDir 射线的方向
     * @param rayLen 射线的长度
     * @param layerMask 挑选的层级
     * @param useCacheRayResult 返回结果是否使用共享rayResult对象
     */
    public static queryRay(bodies: any[], rayPoint: m4m.math.vector2, rayDir: m4m.math.vector2,
                           rayLen: number, layerMask: number = 0xFFFFFFFF ,useCacheRayResult = true) {
        //返回数据初始化
        let rayResult = useCacheRayResult ? this.rayHelpResult : {} as IRaycastResult;
        rayResult.hited = false;
        rayResult.hitPoint.x = 0;
        rayResult.hitPoint.y = 0;
        rayResult.hitedBody = null;

        if (layerMask == 0){
            return rayResult;
        }

        //准备好 ray 碰撞体
        let endPoint = this.rayHelpV2;
        m4m.math.vec2Clone(rayDir, endPoint);
        m4m.math.vec2ScaleByNum(endPoint, rayLen, endPoint);
        m4m.math.vec2Add(endPoint, rayPoint, endPoint);
        // let rayAngle = gameMathUtil.Vec2Angle(rayPoint, endPoint);
        // rayAngle = gameMathUtil.getAngle(rayDir.x , rayDir.y);
        let rayAngle = gameMathUtil.getAngle(rayDir.x , rayDir.y , true);
        // let subv2 = this.rayHelp_v2_1;
        // m4m.math.vec2Subtract(rayPoint, endPoint, subv2);
        // let rayLength = m4m.math.vec2Length(subv2);
        let rayX = (endPoint.x + rayPoint.x) * 0.5;
        let rayY = (endPoint.y + rayPoint.y) * 0.5;
        let rayWidth = 1e-100;
        // let raybody = this.Bodies.rectangle(rayX, rayY, rayLen, rayWidth, { angle: rayAngle });
        let raybody =  this.rayHelp_rectBody;
        this.setRectangleBody(raybody,rayX, rayY, rayLen, rayWidth , rayAngle);

        let Bounds = this.Bounds;
        let currMinLen = Number.POSITIVE_INFINITY;
        for (let i = 0; i < bodies.length; i++) {
            let bodyA = bodies[i];
            let cFilter = bodyA.collisionFilter;
            if (cFilter && cFilter.category != null){
                if (!(cFilter.category & layerMask)) {  //类型过滤
                    continue;
                }
            }
            //初步检测Bounds 
            if (Bounds.overlaps(bodyA.bounds, raybody.bounds)) {
                for (let j = bodyA.parts.length === 1 ? 0 : 1; j < bodyA.parts.length; j++) {
                    let part = bodyA.parts[j];
                    //检测parts 的 bounds
                    if (Bounds.overlaps(part.bounds, raybody.bounds)) {
                        if (part && part.vertices) {
                            let vs = part.vertices as m4m.math.Ivec2[];
                            let vlen = vs.length;
                            for (let k = 0; k < vlen; k++) {
                                let wA = vs[k];
                                let wB = vs[(k + 1) % vlen];
                                let outHitP = this.rayHelpV2v3;
                                //检测每个线段和射线的碰撞
                                let hited = this.raycast2Wall(wA, wB, rayPoint, rayDir, rayLen , outHitP);
                                if (hited){
                                    rayResult.hited = true;
                                    let len = gameMathUtil.vec2DisSqr(outHitP , rayPoint);
                                    //找到最近的点
                                    if (len < currMinLen){
                                        currMinLen = len;
                                        rayResult.hitedBody = bodyA;
                                        rayResult.hitPoint.x = outHitP.x;
                                        rayResult.hitPoint.y = outHitP.y;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return rayResult;
    }
    private static setRectangleBody(rectBody , x : number, y : number, raylen : number, width : number , rayAngle : number){
        // let v2s = rectBody.vertices as m4m.math.Ivec2 [];
        rectBody.angle = rayAngle;
        rectBody.position.x = x;
        rectBody.position.y = y;
        let vert = this.HelpRayVertices;
        vert[0].x = 0       ;   vert[0].y =     0;
        vert[1].x = raylen  ;   vert[1].y =     0;
        vert[2].x = raylen  ;   vert[2].y = width;
        vert[3].x = 0       ;   vert[3].y = width;

        //
        // this.Body.setVertices(rectBody , vert);
        {
            //rectBody.axes = this.Axes.fromVertices(vert);
            let centre = this.helpCentre;
            m4m.math.vec2Set(centre ,raylen * 0.5 , width * 0.5);
            // var centre = this.Vertices.centre(vert);
            this.Vertices.translate(vert, centre, -1);
            this.Vertices.translate(vert, rectBody.position);
        }

        this.Vertices.rotate(vert , rectBody.angle , rectBody.position);
        this.Bounds.update(rectBody.bounds , vert , this.helpVelocity);

    }

    // private static Vec2Angle(vectorA: m4m.math.Ivec2, vectorB: m4m.math.Ivec2) {
    //     return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    // }

    /**
     * 光线投射检测与墙面的碰撞 ， 碰到返回true 
     * @param wallA 墙a点
     * @param wallB 墙b点
     * @param rayPos 射线起点
     * @param rayDir 射线方向
     * @param rayLen 射线长度
     * @param outHitPoint 返回的碰撞点
     */
    private static raycast2Wall(wallA: m4m.math.Ivec2, wallB: m4m.math.Ivec2, rayPos: m4m.math.Ivec2,
                                rayDir: m4m.math.Ivec2, rayLen: number, outHitPoint: m4m.math.Ivec2) {
        // wikipedia line-line intersection
        // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        // 0 < t < 1
        // u > 0 (the ray is an "infinite line" to be checked only in the positive direction)
        const x1 = wallA.x;
        const y1 = wallA.y;
        const x2 = wallB.x;
        const y2 = wallB.y;

        const x3 = rayPos.x;
        const y3 = rayPos.y;
        const x4 = rayPos.x + rayDir.x;
        const y4 = rayPos.y + rayDir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return false; // Parallel lines
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0 && u <= rayLen) {
            const pt = outHitPoint;
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return true;
        }
        return false;
    }

    private static exampleRaytest() {
        let rp = new m4m.math.vector2();
        let wP1 = new m4m.math.vector2(-3, 0);
        let wP2 = new m4m.math.vector2(3, 0);
        let rayPos = new m4m.math.vector2(0.5, 1);
        let rayDir = new m4m.math.vector2(0.5, -0.5);
        m4m.math.vec2Normalize(rayDir, rayDir);
        let rayLen = 2;
        this.raycast2Wall(wP1, wP2, rayPos, rayDir, rayLen, rp);

        return rp;
    }
    /** 绘制debug 开关 */
    public static Draw2dDebug : boolean = false;

    public static drawBound = true; //绘制网格块中的body 的 bound
    public static drawbucketGird = true;  //绘制网格块

    private static _Bounds;

    private static _SAT;

    private static _Bodies;

    private static _Vertices;

    private static _Body;

    private static _Axes;

    //功能----------------------------------------------------
    private static readonly disbleFilter: m4m.framework.collisionFilter = { category: 0, group: 0, mask: 0 };
    private static readonly PhyCollisionTag = "_PhyCollisionTag_";
    private static helpRegion: IGridRegion = ({} as any);
    // private static cupBodies : m4m.framework.Ibody[] = [];
    private static cupBodies: ReuseArray<m4m.framework.Ibody> = new ReuseArray<m4m.framework.Ibody>();

    private static rayHelpV2 = new m4m.math.vector2();
    private static rayHelpV2v1 = new m4m.math.vector2();
    private static rayHelpV2v3 = new m4m.math.vector2();
    private static rayHelpResult : IRaycastResult = {hited: false,hitPoint : {x: 0,y: 0},hitedBody: {}};
    private static _rayHelpRectBody : m4m.framework.Ibody;

    private static helpVelocity = new m4m.math.vector2();
    private static helpCentre = new m4m.math.vector2();
    private static HelpRayVertices = [new m4m.math.vector2(),new m4m.math.vector2(),new m4m.math.vector2(),new m4m.math.vector2()];

}