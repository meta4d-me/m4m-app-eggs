import { Dictionary } from "../Data/Dictionary";
/** 通用 Tool */
export class commTool {
    private static cc = 0;
    static ImgByLoad(url: string, backFun: (tex: m4m.framework.texture) => any) {
        m4m.io.loadImg(url, (_tex, err) => {
            if (err) {
                console.error(err);
            } else {
                this.cc++;
                //构建 img
                let _texture = new m4m.framework.texture(`_loadTex_${this.cc}`);
                var _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
                var t2d = new m4m.render.glTexture2D(m4m.framework.sceneMgr.app.webgl, _textureFormat);
                t2d.uploadImage(_tex, false, true, false, false, false); //非2次幂 图 不能显示设置repeat
                _texture.glTexture = t2d;
                _texture.use();
                if (backFun)
                    backFun(_texture);
            }
        });
    }
    // promise version ImgByLoad
    static getTexture(path) {
        return new Promise((rev: ((_: m4m.framework.texture) => void), rej) => {
            commTool.ImgByLoad(path, (texture) => {
                rev(texture);
            });
        });
    }
    /** 加载 的贴图缓存容器 */
    static loadedTexsDic: Dictionary = new Dictionary();

    /** 缓动方法 IN => Out 
     * p : 过程进度
     * MaxVal : 过程的最大值
     * mathIn : in 过程的 tween方法
     * mathOut : out 过程的 tween方法
    */
    static tweenInOut(p: number, MaxVal: number, methodIn: m4m.framework.tweenMethod, methodOut: m4m.framework.tweenMethod) {
        let mth, tp;
        if (p <= 0.5) {
            mth = methodIn;
            tp = p * 2;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * MaxVal / 2;
        } else {
            mth = methodOut;
            tp = p * 2 - 1;
            return m4m.framework.tweenUtil.GetEaseProgress(mth, tp) * MaxVal / 2 + MaxVal / 2;
        }
    }

    //16进制颜色转10进制
    static color16To10(str: string, out: m4m.math.color | m4m.math.vector4) {
        if (!out) return;
        if (out instanceof m4m.math.color) {
            out.r = parseInt(str.substring(0, 2), 16) / 255;
            out.g = parseInt(str.substring(2, 4), 16) / 255;
            out.b = parseInt(str.substring(4, 6), 16) / 255;
            out.a = 1;
        }else{
            out.x = parseInt(str.substring(0, 2), 16) / 255;
            out.y = parseInt(str.substring(2, 4), 16) / 255;
            out.z = parseInt(str.substring(4, 6), 16) / 255;
            out.w = 1;
        }
    }
}