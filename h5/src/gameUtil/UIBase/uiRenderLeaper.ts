import { metaUIManager } from "./metaUIManager";

/** UI层级渲染 跳跃器  (用来实现 覆盖在模型上的UI)*/
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiRenderLeaper extends m4m.framework.behaviour2d {
    /** 跳跃 层级 */
    @m4m.reflect.Field("number")
    public leapLayer: number = 0;
    private readonly leapRenderTag = "__tagLeapRender__";  //避免重复计算
    private readonly leapedTag = "__tagLeaped__";  //已经处理了 标签
    /**跃迁显示 状态 */
    private _isLeap: boolean;

    public onPlay() {
        if (metaUIManager.ActiveSelf.registerLeapRender) { //默认 uilayerMgr 指定层
            metaUIManager.ActiveSelf.registerLeapRender(this.transform.insId.getInsID(), this.onLeapRender.bind(this)
                , this.onFrontBefRender.bind(this), this.leapLayer);

            this.swLeapDisplay(true);
        }
    }

    public update(delta: number) {

    }
    /**
     * 切换跳跃显示设置
     * @param isLeap 是否跃迁显示
     */
    public swLeapDisplay(isLeap: boolean) {
        if (this._isLeap == isLeap) { return; }
        this._isLeap = isLeap;
        if (!isLeap) {
            this.moveRenderer(this.transform, isLeap);
        }
    }

    public remove() {
        if (metaUIManager.ActiveSelf.unregisterLeapRender) {
            metaUIManager.ActiveSelf.unregisterLeapRender(this.transform.insId.getInsID());
        }
    }
    private onFrontBefRender() {
        if (!this._isLeap) { return; }
        this.FrontUpdateTran(this.transform);
    }

    private onLeapRender(canvas) {
        if (!this._isLeap) { return; }
        this.renderRecursion(this.transform, canvas);
    }

    private renderRecursion(trans: m4m.framework.transform2D, canvas) {
        if (!trans || !trans.visible) { return; }
        if (!trans[this.leapedTag]) {
            //自动处理 后面加到节点上的trans
            this.moveRenderer(trans, true);
        }

        if (trans[this.leapRenderTag]) {
            trans.renderer = trans[this.leapRenderTag];
            trans.renderer.render(canvas);
            trans.renderer = null;
        }

        if (trans.children) {
            for (let i = 0; i < trans.children.length; i++) {
                let temp2d = trans.children[i];
                if (!temp2d) { continue; }
                this.renderRecursion(temp2d, canvas);
            }
        }
    }

    //更新 rander 的 updatetran
    private FrontUpdateTran(trans: m4m.framework.transform2D) {
        if (!trans) { return; }
        if (trans[this.leapRenderTag]) {
            trans.renderer = trans[this.leapRenderTag];
            trans.renderer.updateTran();
            trans.renderer = null;
        }
        if (trans.children) {
            for (let i = 0; i < trans.children.length; i++) {
                let temp2d = trans.children[i];
                if (!temp2d) { continue; }
                this.FrontUpdateTran(temp2d);
            }
        }
    }

    //renderer 移花接木 top_overLay 或者 overLay
    private moveRenderer(trans: m4m.framework.transform2D, isLeap: boolean) {
        if (!trans) { return; }
        if (isLeap) {
            //leaped
            trans[this.leapedTag] = true;
            //renderer
            if (!trans[this.leapRenderTag] && trans.renderer) {
                trans[this.leapRenderTag] = trans.renderer;
                trans.renderer = null;
            }
        } else {
            //leaped
            delete trans[this.leapedTag];
            //renderer
            if (trans[this.leapRenderTag]) {
                trans.renderer = trans[this.leapRenderTag];
            }
        }

        if (trans.children) {
            for (let i = 0; i < trans.children.length; i++) {
                let temp2d = trans.children[i];
                if (!temp2d) { continue; }
                this.moveRenderer(temp2d, isLeap);
            }
        }
    }
}
