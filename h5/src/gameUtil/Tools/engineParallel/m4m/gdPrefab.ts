import { getSpTransform } from "../parallelEngineTool";
import { ISpPrefab, ISpTransform } from "../spInterface";

// tslint:disable-next-line: class-name
export class gdPrefab implements ISpPrefab{
    public rawHandle: m4m.framework.prefab;
    constructor(rawHandle : m4m.framework.prefab){
        this.rawHandle = rawHandle;
    }

    public getCloneTrans() : ISpTransform{
        return getSpTransform(this.rawHandle.getCloneTrans());
    }

    public getGUID() : number{
        return this.rawHandle.getGUID();
    }

}