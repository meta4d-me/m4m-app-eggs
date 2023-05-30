import { commTool } from "./commTool";

/**
 *  模型 材质shader切换器
 *  来回切换各种材质
 */
// tslint:disable-next-line: class-name
export class materialchanger {
    private static get assetMgr() {
        if (!this._assetMgr) {
            this._assetMgr = m4m.framework.sceneMgr.app.getAssetMgr();
        }
        return this._assetMgr;
    }

    /**
     * 模型 材质shader切换器
     * @param ignoreIRenders 排除的渲染组件
     */
    constructor(ignoreIRenders: string[] = null) {
        if (!ignoreIRenders) { return; }
        for (let i = 0, len = ignoreIRenders.length; i < len; i++) {
            let str = ignoreIRenders[i];
            this.limitIRenderNameMap[str] = true;
        }
    }
    private static _assetMgr: m4m.framework.assetMgr;
    private static changeMatTag = "__changeMatTag__";
    private limitIRenderNameMap: { [key: string]: boolean } = {};

    /**
     * 获取 matSetting
     * @param tran 渲染模型对象
     * @param matConfig matSetting对象
     */
    public getSetting(tran: m4m.framework.transform, matConfig: IMatConfig) {
        let rimSetting = tran[materialchanger.changeMatTag] as IMatSetting;
        if (!rimSetting) {
            tran[materialchanger.changeMatTag] = rimSetting = { configMap: {}, currChangedShaderName: matConfig.shaderName };
        }

        if (rimSetting.configMap[matConfig.shaderName]) { return rimSetting; }

        //mat set
        this.matSetTo(tran, matConfig);

        return rimSetting;
    }

    /**
     * 改变材质
     * @param tran 渲染模型对象
     * @param matConfig matSetting对象
     * @param toOrig 是否是设置成源初材质
     */
    public changeMat(tran: m4m.framework.transform, matConfig: IMatConfig, toOrig: boolean) {
        let setting = tran[materialchanger.changeMatTag] as IMatSetting;
        setting.currChangedShaderName = toOrig ? "" : matConfig.shaderName;

        let shName = matConfig.shaderName;
        let configVal: IMatConfigVal = setting.configMap[shName];
        let skinMrs = configVal.hasMatsRenders;

        // let skinMrs = rimSetting.rimSkinMR;
        for (let i = 0, len = skinMrs.length; i < len; i++) {
            let skin = skinMrs[i];
            let _setting = skin[materialchanger.changeMatTag] as any;
            skin.materials = toOrig ? _setting.originalMats : _setting[shName];
        }
    }

    /**
     * 设置材质 数值通过参数对象
     * @param mat 材质对象
     * @param valObj 设置参数
     */
    public setMatValue(mat: m4m.framework.material, valObj: matParameter) {
        for (let key in valObj) {
            let val = valObj[key];
            if (typeof (val) == "number") {
                mat.setFloat(key, val);
            } else if (val instanceof m4m.math.vector4) {
                mat.setVector4(key, val);
            }
        }
    }

    private getShaderFullName(shName: string) {
        if (!shName) { return ""; }
        return `${shName}.shader.json`;
    }

    private matSetTo(tran: m4m.framework.transform, matConfig: IMatConfig) {
        let mrs: IMaterials[] = [];
        commTool.ergodicTranNode(tran, (subTran) => {
            let rcomp = subTran.gameObject.renderer as any;
            if (rcomp && (rcomp as IMaterials).materials != null) {
                let className = (rcomp as Object).constructor.name;
                if (!this.limitIRenderNameMap[className]) {
                    mrs.push(rcomp);
                }
            }
        });

        let rimSetting = tran[materialchanger.changeMatTag] as IMatSetting;
        let configVal: IMatConfigVal = rimSetting.configMap[matConfig.shaderName];
        if (configVal) { return; }
        (configVal as any) = {};
        let shName = matConfig.shaderName;
        rimSetting.configMap[shName] = configVal;

        //
        configVal.hasMatsRenders = mrs;
        let outRimMats = configVal.mats = [];
        configVal.parameterVal = {};
        this.parameterToClone(matConfig.parameter, configVal.parameterVal);

        //删除
        let map = {};
        //去重 mat
        for (let i = 0, len = mrs.length; i < len; i++) {
            let skinmr = mrs[i];
            let _otherMats: m4m.framework.material[] = [];
            let _originalMats: m4m.framework.material[];

            let cacheMats: { originalMats: m4m.framework.material[] } = skinmr[materialchanger.changeMatTag];
            let cachedOriginalMats = cacheMats != null;
            _originalMats = cachedOriginalMats ? cacheMats.originalMats : skinmr.materials;
            if (!cacheMats) {
                cacheMats = skinmr[materialchanger.changeMatTag] = {} as any;
            }

            for (let j = 0, len1 = _originalMats.length; j < len1; j++) {
                let mat = _originalMats[j];
                let _cmat = map[mat.getGUID()];
                if (!_cmat) {
                    _cmat = mat.clone();
                    _cmat.setShader(materialchanger.assetMgr.getShader(this.getShaderFullName(shName)));
                    map[mat.getGUID()] = _cmat;
                    outRimMats.push(_cmat);
                }
                _otherMats.push(_cmat);
            }

            cacheMats.originalMats = _originalMats;
            cacheMats[shName] = _otherMats;
            //设置成 xx shader
            skinmr.materials = _otherMats;
        }
    }

    private parameterToClone(parameters: matParameter, outVal: matParameter) {

        for (let key in parameters) {
            let val = parameters[key];
            let pname = key;
            let newVal;
            if (typeof (val) == "number") {
                newVal = val;
            } else if (val instanceof m4m.math.vector4) {
                newVal = new m4m.math.vector4();
                m4m.math.vec4Clone(val, newVal);
            }
            outVal[pname] = newVal;
        }

        // for (let i = 0, len = parameters.length; i < len; i++) {
        //     let p = parameters[i];
        //     let pname = p.pName;
        //     let val = p.value;
        //     let newVal;
        //     if (typeof (val) == "number") {
        //         newVal = val;
        //     } else if (val instanceof m4m.math.vector4) {
        //         newVal = new m4m.math.vector4();
        //         m4m.math.vec4Clone(val, newVal);
        //     }
        //     outVal[p.pName] = newVal;
        // }
    }
}

type matParameter = { [pName: string]: number | m4m.math.vector4 };

interface IMaterials {
    materials: m4m.framework.material[];
}

interface IMatConfigVal {
    parameterVal: matParameter;
    mats: m4m.framework.material[];
    hasMatsRenders: IMaterials[];
}

interface IMatSetting {
    currChangedShaderName: string;
    configMap: { [key: string]: IMatConfigVal };
}

interface IMatConfig {
    shaderName: string;
    parameter: matParameter;
}