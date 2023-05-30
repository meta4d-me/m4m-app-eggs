import { spAPP } from "../parallelEngineTool";
import { engineParallelType, IDispose } from "../spInterface";

type IMats = { materials: m4m.framework.material[] };

/**
 * 材质处理器
 */
// tslint:disable-next-line: class-name
export class gdMaterialcacher implements IDispose {

    constructor(rawHandle: IMats) {
        this.rawHandle = rawHandle;
    }
    private rawHandle: IMats;
    private cacheIdCount = 0;
    private cacheMatsMap: { [id: number]: m4m.framework.material[] } = {};
    private _lastRestoreID: number = -1;

    public cacheCurrMaterial(globalMatKey?: string): number {
        this.cacheIdCount++;
        let currId = this.cacheIdCount;
        let cacheMats: m4m.framework.material[] = [];
        let srcMats = this.rawHandle.materials;
        let len = srcMats.length;
        let globalMat;
        if (globalMatKey != null) {
            globalMat = spAPP.getGlobalMaterial(globalMatKey, false, engineParallelType.none);
        }
        for (let i = 0; i < len; i++) {
            let cachemat;
            //
            if (!globalMat) {
                cachemat = srcMats[i].clone(); //new 材质
            } else {
                cachemat = globalMat; //全局共享材质
            }
            cacheMats.push(cachemat);
        }

        this.cacheMatsMap[currId] = cacheMats;
        return currId;
    }

    public cachedCount(): number {
        return Object.keys(this.cacheMatsMap).length;
    }

    public restoreMaterial(cacheID: number) {
        let cacheMats = this.cacheMatsMap[cacheID];
        if (!cacheMats) {
            console.warn(` cacheID ${cacheID} not find ! `);
            return;
        }
        this._lastRestoreID = cacheID;
        this.rawHandle.materials = cacheMats;
    }

    public getLastRestoreID() {
        return this._lastRestoreID;
    }

    public dispose() {
        this.rawHandle = null;
        this.cacheMatsMap = null;
    }
}
