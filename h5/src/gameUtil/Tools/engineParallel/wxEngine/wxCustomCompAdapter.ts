import { wxEngineGO } from "../spGameObject";
import { ISpCustomCompAdapter, ISpCustomComp } from "../spInterface";

/**
 * 自定义组件 连接
 */
@engine.decorators.serialize("wxCustomCompAdapter")
// tslint:disable-next-line: class-name
export class wxCustomCompAdapter extends engine.Script implements ISpCustomCompAdapter {
    private spCustomComp: ISpCustomComp;
    private _enabled = true;

    public getComp() {
        return this.spCustomComp;
    }

    /** 设置激活状态 */
    public setEnabled(enabled: boolean) {
        this._enabled = enabled;
        if (this.spCustomComp) { this.spCustomComp.enabled = enabled; }
    }
    /** 获取激活状态 */
    public getEnabled(): boolean {
        return this._enabled;
    }

    public addCompToGO(_customComp: ISpCustomComp) {
        this.spCustomComp = _customComp;
        this.spCustomComp.gameObject = new wxEngineGO(this.entity);
        this.setEnabled(this._enabled);
    }

    public onAwake() {
        if (this.spCustomComp.start) {
            this.spCustomComp.start();
        }
    }

    /** 初始化使用 在start 之后 */
    public onStart() {
        if (this.spCustomComp.onPlay) {
            this.spCustomComp.onPlay();
        }
    }

    /** 每帧调用一次 */
    public onUpdate(delta: number) {
        if (this.spCustomComp.update) {
            this.spCustomComp.update(delta);
        }
    }

    /** 组件被清理时调用 */
    public onDestroy() {
        if (this.spCustomComp.remove) {
            this.spCustomComp.remove();
        }

        this.spCustomComp = null;
    }

}