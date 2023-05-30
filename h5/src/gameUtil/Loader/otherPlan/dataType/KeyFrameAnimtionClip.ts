import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { curve } from "./curve";

export class KeyFrameAnimtionClip extends AssetBundleFileInfo {
    public static classType = m4m["KeyFrameAnimtionClip"] = KeyFrameAnimtionClip;
    public tag: string = "";
    public frameRate: number = 0;
    public KeyFrameAnimtionlength: number = 0;
    public wrapMode: number = 0;
    public curves: curve[] = [];

}
