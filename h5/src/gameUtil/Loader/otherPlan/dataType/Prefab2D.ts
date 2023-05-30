import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { exC2DComponent } from "./exC2DComponent";

export class Prefab2D extends AssetBundleFileInfo {
    public static classType = m4m["Prefab2D"] = Prefab2D;
    public className: string = "";
    public prefab: string = "";
    public layer: number = 0;
    public tag: string = "";
    public tranName: string = "";
    public isStatic: boolean = false;
    public children: Prefab2D[] = [];
    public width: number = 0;
    public height: number = 0;
    public pivot: m4m.math.vector2 = m4m.poolv2();
    public _visible: boolean = false;
    public localTranslate: m4m.math.vector2 = m4m.poolv2();
    public localScale: m4m.math.vector2 = m4m.poolv2();
    public localRotate: number = 0;
    public isMask: boolean = false;
    public layoutState: number = 0;
    public layoutPercentState: number = 0;
    public layoutValueMap: numberdic = new numberdic();
    public insid: number = 0;
    public components: exC2DComponent[] = [];

}
// tslint:disable-next-line: class-name
class numberdic {
    public static classType = m4m["numberdic"] = numberdic;
    public n1: number = 0;
    public n2: number = 0;
    public n4: number = 0;
    public n8: number = 0;
    public n16: number = 0;
    public n32: number = 0;

}
export class Border {
    public static classType = m4m["Border"] = Border;
    public l: number = 0;
    public t: number = 0;
    public r: number = 0;
    public b: number = 0;
}
