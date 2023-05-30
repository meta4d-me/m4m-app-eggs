import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { gameObjectInfo } from "./gameObjectInfo";

export class Prefab extends AssetBundleFileInfo {
    public static classType = m4m["Prefab"] = Prefab;
    public tranName: string = "";
    public localRotate: m4m.math.quaternion = m4m.poolquat();
    public localTranslate: m4m.math.vector3 = m4m.poolv3();
    public localScale: m4m.math.vector3 = m4m.poolv3();
    public gameObject: gameObjectInfo = new gameObjectInfo();
    public children: Prefab[] = [];
    public insid: number = 0;

}
