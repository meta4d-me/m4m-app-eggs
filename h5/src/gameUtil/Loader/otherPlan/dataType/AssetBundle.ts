import { cMap } from "src/gameUtil/Data/Map";
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
export class AssetBundlea {
    public static classType = m4m["AssetBundle"] = AssetBundlea;
    public className: string = "";
    public fileName: string = "";
    public pathName: string = "";
    public fileSize: cMap<number> = new cMap<number>(); public files: AssetBundleFileInfo[] = [];
    public totalLength: number = 0;
    public version: string = "";
    public createtime: string = "";

}
