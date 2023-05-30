export enum engineParallelType {
    /** 纯源引擎 */
    none,
    /** 微信引擎 */
    wxEngine,
    /** qq引擎 */
    qqEngine,
    /** 抖音引擎 */
    ttEngine,
}

export enum spComponentType {
    /** 相机组件 */
    camera,
    /** 模型渲染组件 */
    meshRenderer,
    /** 蒙皮模型渲染 组件 */
    skinMeshRenderer,
    /** 粒子系统 组件 */
    particleSystem,
    /** 拖尾 */
    trailRenderer,
    /** 动画播放 */
    animPlayer,
}

/** 销毁接口 */
export interface IDispose {
    dispose();
}

/** 重置接口 */
export interface IReset {
    reset();
}

/** 简配 gameObject 节点 接口 */
export interface ISpGameObject extends IDispose {

    /** 是否是静态 */
    isStatic: boolean;
    /** 层 */
    layer: number;
    /** 标签信息 */
    tag: string;
    /** 可见性 */
    visible: boolean;
    /** raw 数据 */
    rawHandle: any;
    /** transform */
    transform: ISpTransform;
    /** name */
    name: string;
    /** 获取节点ID */
    getID(): number;
    /** 场景transform 根节点 */
    getRootNode(): ISpTransform;
    /** 获得组件 */
    getFirstComponent(type: spComponentType): ISpComponent;
    /** 获取全部组件 */
    getComponents(type: spComponentType): ISpComponent[];
    /** 添加组件通过类型 */
    addComponent(type: spComponentType): ISpComponent;
    /** 清理 */
    dispose();
}

//--------------------------------------------接口--------------------------------------------------------

/**
 * 简配 组件接口
 */
export interface ISpComponent extends IDispose {
    /** 全局识别ID , 初始化时被赋予*/
    id: string;
    /** 原始数据 */
    rawHandle: any;
    /** go 对象引用 */
    gameObject: ISpGameObject;
    /** 组件类型 */
    compType: spComponentType;
}

export interface ISPRenderer extends ISpComponent {
    /** 获取材质ID */
    getMaterialID(matIdx?: number): number;
    /** 获取当前的 材质数量 */
    getMaterialsCount(): number;
    /**
     * 设置材质 float 值
     * @param key 
     * @param value 
     * @param matIdx 材质的索引
     */
    setMaterialFloat(key: string, value: number, matIdx?: number);
    /**
     * 设置材质 vector4 值 
     * @param key 
     * @param value 
     * @param matIdx 材质的索引
     */
    setMaterialVector4(key: string, value: m4m.math.vector4, matIdx?: number);
    /**
     * 设置贴图 
     * @param key 材质key 
     * @param valueTex 贴图值
     * @param matIdx 材质索引
     */
    setTexture(key: string, valueTex: any, matIdx?: number);
    /** shader 名字 */
    getShaderName(matIdx?: number): string;
    /**
     * 设置 shader
     * @param shaderSrc  shader 标识字符串
     * @param matIdx 材质的索引
     */
    setShader(shaderSrc: string, matIdx?: number): Promise<void>;

    /** 缓存了的数量 */
    cachedCount(): number;

    /**
     * 缓存当前的 材质状态
     * @param globalMatKey 全局共享 材质key 
     */
    cacheCurrMaterial(globalMatKey?: string): number;

    /** 恢复当前材质状态到指定ID */
    restoreMaterial(cacheID: number);

    /** 最后恢复的缓存材质ID ， 默认 -1 */
    getLastRestoreID(): number;
}

/**
 * 简配 相机组件
 */
export interface ISpCamera extends ISpComponent {
    /** fov 值 */
    fov: number;
    /** 相机远剪裁面 */
    far: number;
    /** 相机近剪裁面 */
    near: number;
}

/**
 * 简配 模型渲染组件
 */
export interface ISpMeshRenderer extends ISPRenderer {

    /** 渲染 队列优先级值 */
    queue: number;
    /** 开启 gpuInstanceing  */
    enableGpuInstancing: boolean;
}

/**
 * 简配 skin meshRenderer
 */
export interface ISpSkinnedMeshRenderer extends ISPRenderer {
    /**  */
    isSkinnedMeshRenderer: boolean;
}

/**
 * 简配 effect
 */
export interface ISpParticleSystem extends ISPRenderer {

    /** 是循环播放 */
    beloop: boolean;
    /**
     * 播放粒子系统
     * @param onPlayEnd 播放结束回调
     */
    play(onPlayEnd?: () => void);

    /** 停止播放 */
    stop();
    /** 设置基础颜色 */
    setColor(_color: m4m.math.color);
}

/**
 * 简配 TrailRender
 */
export interface ISpTrailRender extends ISPRenderer {
    /** 拖尾颜色 */
    color: m4m.math.color;
    /** 播放拖尾 */
    play();
    /** 停止播放 */
    stop();
    /**
     * 设置速度
     * @param speed 
     */
    setSpeed(speed: number);
    /**
     * 设置拖尾宽度
     * @param Width  
     */
    setWidth(Width: number);
}

export interface IPlayAnim {
    /** 停止播放 */
    stop();

    /**
     * 播放动画通过 片段名
     * @param clipName 片段名
     * @param onPlayend 播放完毕回调函数
     * @param blendTime 融合时间
     * @param endframe  播放到 指定 帧 
     * @param speed     播放速度
     * @param beRevert  是否反向播
     */
    playAnimByName(clipName: string, onPlayend?: () => any, blendTime?: number, endframe?: number, speed?: number, beRevert?: boolean);
}

/**
 *   简配 动画播放组件
 */
export interface ISpAnimPlayer extends ISpComponent, IPlayAnim {
    // /** 停止播放 */
    // stop();
}

/**
 * 简配 transform组件
 */
export interface ISpTransform extends IDispose {
    /** 引擎平台类型 */
    engineType: engineParallelType;
    /** 开启 使用Instanceing */
    needGpuInstancBatcher: boolean;
    /** 视锥剔除开关 */
    enableCulling: boolean;
    /** name */
    name: string;
    /** raw 数据 */
    rawHandle: any;
    /** gameObject */
    gameObject: ISpGameObject;
    /** 本地旋转四元数 */
    localRotate: m4m.math.quaternion;
    /**本地位移*/
    localPosition: m4m.math.vector3;
    /** 本地缩放*/
    localScale: m4m.math.vector3;
    /** 本地旋转的欧拉角*/
    localEulerAngles: m4m.math.vector3;
    /** 子数量 */
    childrenCount: number;
    /** 获取子节点通过索引 */
    getChildByIdx(childIdx: number): ISpTransform;
    /**
     * 添加子物体实例
     * @param node 子物体实例
     */
    addChild(node: ISpTransform): void;
    /**
     * 移除所有子物体
     */
    removeAllChild(needDispose?: boolean): void;
    /**
     * 移除指定子物体
     * @param node 子物体实例
     */
    removeChild(node: ISpTransform): void;
    /**
     * 查找自己以及子物体中是否有指定名称的transform
     * @param name
     */
    find(name: string): ISpTransform;
    /** 获取世界坐标系下的旋转 */
    getWorldRotate(): m4m.math.quaternion;
    /** 设置transform世界空间下的旋转 */
    setWorldRotate(rotate: m4m.math.quaternion): void;
    /** 获取世界坐标系下的位移 */
    getWorldPosition(): m4m.math.vector3;
    /** 设置transform世界空间下的位移 */
    setWorldPosition(pos: m4m.math.vector3): void;
    /** 获取世界坐标系下的缩放 */
    getWorldScale(): m4m.math.vector3;
    /** 设置世界坐标系下的缩放 */
    setWorldScale(scale: m4m.math.vector3): void;
    /**
     * 设置transform的世界矩阵 通过计算得到本地矩阵实现
     * @param mat 世界空间下矩阵
     */
    setWorldMatrix(mat: m4m.math.matrix): void;
    /** 获取世界矩阵 */
    getWorldMatrix(): m4m.math.matrix;
    /** 获取本地矩阵 */
    getLocalMatrix(): m4m.math.matrix;
    /**旋转当前transform到z轴指向给定坐标
     * @param point 给定的坐标
     */
    lookatPoint(point: m4m.math.vector3): void;
    /**public
    * 获取世界坐标系下当前z轴的朝向
    */
    getForwardInWorld(out: m4m.math.vector3): void;
    /**
     * 获取世界坐标系下当前x轴的朝向
     */
    getRightInWorld(out: m4m.math.vector3): void;
    /**
     * 获取世界坐标系下y轴的朝向
     */
    getUpInWorld(out: m4m.math.vector3): void;
    /** 获取父节点 */
    getParent(): ISpTransform;
    /** 获取 aabb 的max */
    getAabbMax(): m4m.math.vector3;
    /** 获取 aabb 的min */
    getAabbMin(): m4m.math.vector3;
    /** 获取 aabb 的中心点 */
    getAabbCenter(): m4m.math.vector3;
    /** 释放当前transform */
    dispose(): void;
}

export interface ISpCustomComp {
    /** 是否激活 */
    enabled: boolean;
    /** go */
    gameObject: ISpGameObject;
    /** 初始化使用 */
    start(): void;
    /** 初始化使用 在start 之后 */
    onPlay(): void;
    /** 每帧调用一次 */
    update(delta: number): void;
    remove(): void;
}

export interface ISpCustomCompAdapter {
    /** 获取 自定义组件对象 */
    getComp();
    /** 设置激活状态 */
    setEnabled(enabled: boolean);
    /** 获取激活状态 */
    getEnabled(): boolean;
    /** 添加 */
    addCompToGO(_customComp: ISpCustomComp);
}

export interface ISpPrefab {
    rawHandle: any;
    /** 获取一个clone 实例 */
    getCloneTrans(): ISpTransform;

    /** 获取唯一id */
    getGUID(): number;
}

/** 动画播放 工具 */
export interface ISpAnimPlayerHandle extends IPlayAnim, IDispose {
    /** 停止播放 */
    stop();

    // /**
    //  * 播放动画通过 片段名
    //  * @param clipName 片段名
    //  * @param onPlayend 播放完毕回调函数
    //  * @param blendTime 融合时间
    //  * @param endframe  播放到 指定 帧 
    //  * @param speed     播放速度
    //  * @param beRevert  是否反向播
    //  */
    // playAnimByName(clipName: string, onPlayend?: () => any, blendTime?: number, endframe?: number, speed?: number, beRevert?: boolean);

    /** 当前片段总时长 */
    currClipTotalTime(): number;

    /** 获取当前播放的动画片段名 */
    getCurrClipName(): string;

    /**
     * 获取指定动画片段的播放时长
     * @param simpleClipName 源动画片段名（不包含后缀）
     */
    getClipTotalTime(simpleClipName: string): number;

    /** 设置当前片段播放到指定 单位化时间点 */
    setCurrClipNormalizedTime(normalLizedTime: number);

    /** 获取当前clip 的 NormalizedTime */
    getCurrClipNormalizedTime(): number;

    /** 当前是播放状态 */
    isPlay(): boolean;

    /** 是否 有指定clipName 的 片段 */
    hasClip(clipName: string);

    /**
    * 注册 动画时间轴事件 回调响应对象
    * @param eventActObj      动画时间事件 回调触发对象
    */
    regTimeEventCallbackObj(eventActObj: object);

    /**
     * 设置 动画时间轴事件 参数
     * @param simpleClipName    动画片段名 
     * @param timePoint         事件时间点
     * @param _actFunName       行为方法名
     * @param val               事件传递的参数
     */
    setTimeEvent(simpleClipName: string, timePoint: number, _actFunName: string, val: string);

    /** 释放 */
    dispose(): void;
}