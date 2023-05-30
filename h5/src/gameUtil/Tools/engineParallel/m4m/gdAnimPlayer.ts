import { m4mGO } from "../spGameObject";
import { spComponentType, ISpAnimPlayer } from "../spInterface";

/** m4m录制帧蒙皮动画组件 ISpAnimPlayer 封装  */
// tslint:disable-next-line: class-name
export class gdAnimPlayer implements ISpAnimPlayer {
    public id: string;
    public rawHandle: m4m.framework.aniplayer;
    public gameObject: m4mGO;
    public compType: spComponentType = spComponentType.animPlayer;
    constructor(raw: m4m.framework.aniplayer, go: m4mGO) {
        this.id = `${go.getID()}_${this.compType}`;
        this.rawHandle = raw;
        this.gameObject = go;
    }
    public stop() {
        this.rawHandle.stop();
    }

    public playAnimByName(clipName: string, onPlayend?: () => any, blendTime?: number, endframe?: number, speed?: number, beRevert?: boolean) {
        this.rawHandle.playCross(clipName, blendTime, onPlayend, speed, beRevert);
    }

    public dispose() {
        this.rawHandle = null;
        this.gameObject = null;
    }

}