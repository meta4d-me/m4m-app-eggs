import { nodeComponent } from "./nodeComponent";

// tslint:disable-next-line: class-name
export class gameObjectInfo {
    public static classType = m4m["gameObjectInfo"] = gameObjectInfo;
    public layer: number = 0;
    public tag: string = "";
    public components: nodeComponent[] = [];

}
