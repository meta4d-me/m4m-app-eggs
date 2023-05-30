import { cMap } from "src/gameUtil/Data/Map";
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { mapUniInfo } from "./mapUniInfo";

export class Mat extends AssetBundleFileInfo {
    public static classType = m4m["Mat"] = Mat;
    public shader: string = "";
    public srcshader: string = "";
    public queue: number = 0;
    public mapUniform: cMap<mapUniInfo> = new cMap<mapUniInfo>();
    public InstanceID: string = "";

}
