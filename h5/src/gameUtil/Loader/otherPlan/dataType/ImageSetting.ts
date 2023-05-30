import { AssetBundleFileInfo } from "./AssetBundleFileInfo";

export class ImageSetting extends AssetBundleFileInfo {
    public static classType = m4m["ImageSetting"] = ImageSetting;
    public imageName: string = "";
    public filterMode: string = "";
    public format: string = "";
    public mipmap: boolean = false;
    public wrap: string = "";
    public premultiplyAlpha: boolean = false;
    public imageGuid: string = "";

}
