import { getSpTransform } from "../parallelEngineTool";
import { ISpPrefab, ISpTransform } from "../spInterface";

// tslint:disable-next-line: class-name
export class wxPrefab implements ISpPrefab {
    public rawHandle: any;
    constructor(rawHandle: any) {
        this.rawHandle = rawHandle;
    }

    public getCloneTrans(): ISpTransform {
        return getSpTransform(this.rawHandle.instantiate().transform);
    }

    public getGUID(): number {
        return this.rawHandle.id;
    }

}