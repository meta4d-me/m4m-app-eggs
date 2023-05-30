import { alphaKey } from "./alphaKey";
import { colorKey } from "./colorKey";

export class Gradient {
    public static classType = m4m["Gradient"] = Gradient;
    public mode: number = 0;
    public alphaKeys: alphaKey[] = [];
    public colorKeys: colorKey[] = [];

}
