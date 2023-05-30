import LoadContextBrowser from "engine/assets/load-contexts/load-context-browser";
import { TaskManager } from "./TaskManager";

/** 引导配置的类型定义 */
type guideBase = { id: number, guideID: number, stepID: number, desc: string, actions: string };

/**
 * 引导功能 管理器 
 * 使用 1. init()  2.guideRun(id)
 */
export class GuideMgr {
    /** 需要打印 步骤信息 */
    public static DebugPrint: boolean = false;

    /** 引导 类型 */
    private static typeStepFunsMap: { [typeID: number]: ((cb: Function) => any)[] } = {};
    /** excel 配置的 action 函数map  */
    private static actFunMap: { [action: string]: [Function, object] } = {};
    /**  */
    private static tempClassNameStepFunsMap: { [calssName: string]: ((cb: Function) => any)[] } = {};
    /** 当前激活的单元实例队列 */
    private static activeGuides: [number, Function][] = [];
    /** 当前 单元 */
    private static currGuide: number = null;
    /** 引导配置的 类对象 */
    private static GuideBaseClassObj: any;

    /**
     * <装饰 类 对象>
     * 绑定 当前类到指定 GuideTypeID ，该类 绑定bindStep 的静态函数，归为该引导。
     * 使用方式 ：@GuideMgr.bindType([引导ID]])
     * @param _guideID 引导类型的ID
     */
    public static bindType(_guideID: number) {
        return (constructor: any) => {
            let className = constructor.name;
            let _CMap = this.tempClassNameStepFunsMap;
            let _TMap = this.typeStepFunsMap;
            let stepListC = _CMap[className];
            let stepListT = _TMap[_guideID];
            if (!stepListT) { stepListT = _TMap[_guideID] = []; }
            if (!stepListC || stepListC.length < 1) { return; }
            for (let i = 0, len = stepListC.length; i < len; i++) {
                stepListT[i] = stepListC[i];
            }

            //清理
            delete _CMap[className];
            stepListC.length = 0;
        };
    }

    /**
     * <装饰 函数 对象>
     * 绑定 引导单步的执行函数 (被标记的函数 必须是一个 static (cb:Function)=>void )
     * 使用方式 ：@GuideMgr.bindStep([步骤号])
     * @param stepID 执行步ID （标记第几步执行 ，ID 从1 开始计数）
     */
    public static bindStep(stepID: number) {
        let _step = Math.floor(Math.abs(stepID));
        let _map = this.tempClassNameStepFunsMap;
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            let className = target.name;
            let _stepList = _map[className];
            if (!_stepList) { _stepList = _map[className] = []; }
            _stepList[_step] = target[propertyKey];
        };
    }

    /**
     * <装饰 函数 对象>
     * 绑定 引导Action 函数
     * 使用方式 ： @GuideMgr.bindActFun
     */
    public static bindActFun(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        /** 绑定 到 actFunsMap */
        GuideMgr.actFunMap[propertyKey] = [target[propertyKey], target];
    }

    public static init(GuideBaseClassObj) {
        this.GuideBaseClassObj = GuideBaseClassObj;
        //表格解析
        this.excelParse();
    }

    /**
     * 开始跑 引导 ，返回一个 Promise
     * @param GuideID 引导的ID
     * @returns Promise,完成时则 引导完成。 
     */
    public static async guideRun(GuideID: number) {
        if (GuideID == null) { return; }
        let stepList = this.typeStepFunsMap[GuideID];
        if (!stepList || stepList.length < 1) {
            console.error(`执行 ID [${GuideID}] 引导失败,步骤数据为 空 。`);
            return;
        }

        console.log(`==> 引导开始`);

        let _p = new Promise((resolve) => {
            //等待 引导完成 调用 resolve
            this.activeGuides.push([GuideID, resolve]);
            if (this.currGuide == null) {
                this.nextGuide();
            }
        });

        return _p;
    }

    //从表格解析 配置的数据
    private static excelParse() {
        this.GuideBaseClassObj.list.forEach((val, key) => {
            let _guideB: guideBase = val;
            let _map = this.typeStepFunsMap;
            let stepList = _map[_guideB.guideID];
            if (!stepList) {
                stepList = _map[_guideB.guideID] = [];
            }

            // stepList[_guideB.stepID];
            let jsonStr = `[${_guideB.actions}]`;
            let pList = JSON.parse(jsonStr);
            let _actmap = this.actFunMap;
            let acts = [];
            for (let i = 0, len = pList.length; i < len; i++) {
                let p = pList[i];
                if (p.length < 1) { continue; }
                let actName = p[0];
                let actParam = p[1] ? p[1] : [];
                //
                if (!_actmap[actName]) {
                    console.error(`action 函数 "${actName}" ， 获取失败，请检查配置或者实现绑定该函数。`);
                    continue;
                }
                let fun: Function;
                let thisObj;
                [fun, thisObj] = _actmap[actName];
                if (!fun || !thisObj) {
                    console.warn(`action 函数 “${actName}” 没找到具体实现！`);
                    continue;
                }
                acts.push((cb: Function) => {
                    let result: Promise<any> = fun.apply(thisObj, actParam);
                    if (!result || !result.then) {
                        cb();
                    } else {
                        //返回值是一个promise,  异步函数步骤
                        result.then(cb as any);
                    }
                });
            }
            if (acts.length > 0 && _guideB.desc) {
                //打印 描述
                acts.unshift((cb: Function) => {
                    if (GuideMgr.DebugPrint) { console.log(`步骤描述：${_guideB.desc}`); }
                    cb();
                });
            }

            let _step = Math.floor(Math.abs(_guideB.stepID));
            stepList[_step] = (cb) => {
                let combFun = TaskManager.serialArray(acts);
                combFun(cb);
            };
        });
    }

    private static nextGuide() {
        if (this.activeGuides.length < 1) { return; }
        let guide: number;
        let endCB: Function;
        [guide, endCB] = this.activeGuides.shift();
        if (guide == null) {
            this.guideEnd();
            return;
        }

        //运行 guide流程
        this.currGuide = guide;
        let stepList = this.typeStepFunsMap[guide];

        //检查打印 空步骤 函数
        for (let i = 0, len = stepList.length; i < len; i++) {
            if (!stepList[i]) { console.warn(`引导ID [${guide}] , 步骤 [${i}] 为空,该步将会中断不往下执行,请检查配置！`); }
        }

        //添加 步骤打印信息
        if (this.DebugPrint) {
            let arr = [];
            for (let i = 0, len = stepList.length; i < len; i++) {
                let _fun = stepList[i];
                if (!_fun) { continue; }
                arr.push((cb) => {
                    // tslint:disable-next-line: newline-per-chained-call
                    console.log(`==> 引导ID [${guide}] 步骤(${i})`);
                    _fun(cb);
                });
            }
            stepList = arr;
        }

        //组织 步骤
        let fun = TaskManager.serialArray(stepList);
        //开始执行 引导 , 结束后回调 guideEnd
        fun(() => {
            endCB();
            this.guideEnd();
        });
    }

    private static guideEnd() {
        console.log(`==> 引导结束`);
        this.currGuide = null;
        this.nextGuide();
    }

}