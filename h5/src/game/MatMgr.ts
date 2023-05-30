import { Ress } from "./Ress";
import { GameMgr } from "./GameMgr";
import { playerMgr } from "./role/playerMgr";
import { configMgr } from "./configMgr";
import { themeMgr } from "./themeMgr";
import { FrameMgr } from "Tools/FrameMgr";

//材质 对象管理器
export class MatMgr {
    private static scene: m4m.framework.scene;
    private static cacheColor: m4m.math.vector4 = new m4m.math.vector4(1, 1, 1, 1);
    private static defaultColor = new m4m.math.vector4(1, 1, 1, 1);
    private static rampColor = new m4m.math.vector4(1, 1, 1, 1);
    static cacheDistortion: m4m.math.vector4 = new m4m.math.vector4(1, 1, 1, 1);

    private static colorMs: m4m.math.vector4[] = [];
    //材质
    private static tag_onlyGrey = "tag_onlyGrey"; //只变灰色
    private static tag_unColorCg = "tag_unColorCg"; //不变色
    private static mats: m4m.framework.material[] = [];
    private static CgColorMats: m4m.framework.material[] = [];  //变色队列
    private static onlyGreyMats: m4m.framework.material[] = [];  //只变灰色队列
    //static Floor_mat_0: m4m.framework.material;
    static Floor_mat_0: m4m.framework.material;
    static Floor_mat_1: m4m.framework.material;
    static finishLine: m4m.framework.material;
    static Comm_mat_0: m4m.framework.material;
    static ramp_mat_0: m4m.framework.material;
    static box_mat: m4m.framework.material;
    static boost_mat_0: m4m.framework.material;
    static coin_mat: m4m.framework.material;
    static Role_mat: m4m.framework.material;
    static Role_PBRmat: m4m.framework.material;
    static Robot_mats: m4m.framework.material[] = [];
    static Trail_mat: m4m.framework.material;
    static wind_mat: m4m.framework.material;
    static redArrow_mat: m4m.framework.material;
    static shadow_mat: m4m.framework.material;
    static hud_mat: m4m.framework.material;

    //fx
    static Fx1_mat: m4m.framework.material;

    static preInit() {
        this.colorSp = configMgr.colorSpeed;
        this.distorSpeed = configMgr.DistorSpeed;
        this.disRange_x = configMgr.DistorHrange
        this.disRange_y = configMgr.DistorVrange

        this.colorPGap = configMgr.sceneColorHGap / 360 / 2;
        this.firstP = configMgr.firstColorH / 360 / 2; //开始界面配置取固定颜色
        this._s = configMgr.firstColorS / 100;
        this._v = configMgr.firstColorV / 100;

        this.preInitMats();

        //Distortion
        this.initState();
        FrameMgr.Add(this.update, this);
    }

    static init() {
        //mat
        this.initMats();
        // //Distortion
        // this.initState();
        // FrameMgr.Add(this.update, this);
    }

    static isGaped = false;
    static colorPGap; //0.08;
    static firstP; // 0.27;
    static initState() {
        this.firstP = Math.random();  //开始界面随机颜色
        this._colorP = this.firstP;
        this._colorP_0 = this.firstP;

        this.mats.forEach(mat => {
            mat.setVector4("OFFSET", this.cacheDistortion);
        });
        this.setDistortion(0, 0);
        this.targetDisC = new m4m.math.vector4();
        this.distortionP = 1;
        this.reBsaeSet();
        this.stepOnec = true;
    }

    static relive() {
        this.reBsaeSet();
    }

    private static reBsaeSet() {
        this.greyP = 1;
        this.initColor();
        this.toGreying = false;

        let t = themeMgr.themes_map.get(themeMgr.currentTheme);
        if (t) {
            this.setDynamicColorAll(t.isDynamicColor);
            let isDynamic = t.color == null;
            this.setRampColor(isDynamic, t.color);
        }
    }

    private static initColor() {
        if (this.redArrow_mat) this.redArrow_mat.setVector4("_MainColor", new m4m.math.vector4(1, 0.2, 0.2, 1));

        this.boost_mat_0.setVector4("_MainColor", new m4m.math.vector4(1, 1, 0, 1));
        this.coin_mat.setVector4("_MainColor", new m4m.math.vector4(1, 1, 1, 1));
        this.Trail_mat.setVector4("_MainColor", new m4m.math.vector4(1, 1, 1, 1));
        this.wind_mat.setVector4("_MainColor", new m4m.math.vector4(1, 1, 1, 1));
        this.Role_mat.setVector4("_MainColor", new m4m.math.vector4(1, 1, 1, 1));
        this.Role_PBRmat.setVector4("_MainColor", new m4m.math.vector4(1, 1, 1, 1));
        this.shadow_mat.setVector4("_MainColor", new m4m.math.vector4(1, 1, 1, 1));

        for (let i = 0; i < this.Robot_mats.length; i++) {
            this.Robot_mats[i].setVector4("_MainColor", new m4m.math.vector4(Math.random(), Math.random(), Math.random(), 1));
        }
    }

    //预初始化材质
    private static preInitMats() {
        this.scene = GameMgr.app.getScene();
        this.scene.mainCamera.backgroundColor = new m4m.math.color(1, 1, 1, 1);
        // this.FullModels();

        this.Floor_mat_0 = this.getAMat();
        this.Floor_mat_1 = this.getAMat();  //this.cgrayTex

        this.finishLine = this.getAMat();  //this.cgrayTex
        this.finishLine[this.tag_unColorCg] = true;

        this.Comm_mat_0 = this.getAMat();
        this.ramp_mat_0 = this.getAMat();
        this.box_mat = this.getAMat();

        this.coin_mat = this.getAMat(null, Ress.ballShader); //钻石的贴图
        this.coin_mat[this.tag_onlyGrey] = true;

        this.boost_mat_0 = this.getAMat();
        this.boost_mat_0[this.tag_onlyGrey] = true;

        this.Role_mat = this.getAMat();
        this.Role_mat.setShader(Ress.ballShader);
        this.Role_mat[this.tag_onlyGrey] = true;

        this.Role_PBRmat = this.getAMat();
        this.Role_PBRmat.setShader(Ress.ballPBRShader);
        this.Role_PBRmat[this.tag_onlyGrey] = true;

        let count = 20;  //固定20个 敌人的球材质
        for (let i = 0; i < count; i++) {
            let rmat = this.getAMat();
            rmat[this.tag_onlyGrey] = true;
            rmat.setShader(Ress.ballShader);
            this.Robot_mats.push(rmat);
        }

        this.Trail_mat = this.getAMat(null, Ress.trailShader);
        this.Trail_mat[this.tag_onlyGrey] = true;

        this.shadow_mat = this.getAMat(Ress.shadowTex, Ress.trailShader);
        this.shadow_mat[this.tag_onlyGrey] = true;

        this.wind_mat = this.getAMat(null, Ress.trailShader);
        this.wind_mat[this.tag_onlyGrey] = true;

        //-----------------------------------汇总----------------------------------------------
        let list = [this.box_mat, this.finishLine, this.Comm_mat_0, this.ramp_mat_0, this.boost_mat_0, this.coin_mat, this.Floor_mat_0, this.Floor_mat_1,
        this.Role_mat, this.Trail_mat, this.shadow_mat, this.Role_PBRmat, this.wind_mat];

        this.mats = this.mats.concat(list);
        // this.mats = this.mats.concat(fx_mats);
        this.mats = this.mats.concat(this.Robot_mats);

        if (this.redArrow_mat)
            this.mats.push(this.redArrow_mat);

        //筛选出 变色的mat
        this.mats.forEach(mat => {
            if (!mat[this.tag_unColorCg]) {
                this.CgColorMats.push(mat);
                mat.setVector4("_MainColor", this.cacheColor);
            }
            if (mat[this.tag_onlyGrey]) {
                this.onlyGreyMats.push(mat);
            }

        });
    }

    //初始化材质
    private static initMats() {
        // this.Floor_mat_1.setTexture("_MainTex", Ress.cgrayTex);
        this.finishLine.setTexture("_MainTex", Ress.finishLine);
        if (Ress.lego2.children && Ress.lego2.children.length > 0) {
            let temp = Ress.lego2.children[0];
            let mr = temp.gameObject.getComponent("meshRenderer") as m4m.framework.meshRenderer;
            if (mr) {
                this.redArrow_mat = mr.materials[0];
                this.redArrow_mat[this.tag_onlyGrey] = true;
                this.redArrow_mat.setShader(Ress.disShaderUnlight);
                this.redArrow_mat.setTexture("_MainTex", Ress.arrowTex);
                this.redArrow_mat.setVector4("OFFSET", this.cacheDistortion);
                this.onlyGreyMats.push(this.redArrow_mat);
                this.mats.push(this.redArrow_mat);
            }
        }

        this.coin_mat.setTexture("_MainTex", this.getTextName("jinbi.png", `jinbi.assetbundle.json`));
        this.Trail_mat.setTexture("_MainTex", this.getTextName("t.png", `trail.assetbundle.json`));
        // this.shadow_mat.setTexture("_MainTex", this.getTextName("shadow.png"));
    }

    /** 设置特效的材质 */
    static setFxMat(fxTrans: m4m.framework.transform) {
        if (!fxTrans) return;
        let f14s = fxTrans.gameObject.getComponent("f14EffectSystem") as m4m.framework.f14EffectSystem;
        let len = f14s.f14eff.data.layers.length;
        for (let i = 0; i < len; i++) {
            let lay = f14s.f14eff.data.layers[i];
            let mat = lay.elementdata["material"] as m4m.framework.material;
            if (mat) {
                mat[this.tag_unColorCg] = true;
                this.mats.push(mat);
                mat.setVector4("OFFSET", this.cacheDistortion);
            }
        }
    }

    private static dynamicColor(mat: m4m.framework.material, isEnable = true) {
        if (isEnable) {
            mat.setVector4("_MainColor", this.cacheColor);
            mat.setShader(Ress.disShader);
        } else {
            mat.setVector4("_MainColor", this.defaultColor);
            mat.setShader(Ress.disShaderUnlight);
        }
    }

    private static lastDynamicColor = true;
    /** 材质切换成 动态变色 */
    static setDynamicColorAll(isEnable: boolean) {
        if (this.lastDynamicColor == isEnable) return;
        this.lastDynamicColor = isEnable;

        this.dynamicColor(this.Floor_mat_0, isEnable);
        this.dynamicColor(this.Floor_mat_1, isEnable);
        this.dynamicColor(this.box_mat, isEnable);
    }

    /** 设置坡道的 颜色 和 模式 */
    static setRampColor(isDynamic: boolean, fixedColor: m4m.math.vector4 = null) {
        let color = this.cacheColor;
        if (!isDynamic) {
            if (!fixedColor) return;
            m4m.math.vec4Clone(fixedColor, this.rampColor);
            color = this.rampColor;
        }
        this.ramp_mat_0.setVector4("_MainColor", color);
    }

    //检查 hud 材质的替换
    private static ckHudLabMatCg() {
        if (this.waitLabList.length < 1) return;
        let flab = this.waitLabList[0];
        let len = this.waitLabList.length;
        let removelist: number[] = [];
        for (let i = 0; i < len; i++) {
            let lab = this.waitLabList[i];
            if (!lab.font || !lab.font.texture) continue;
            // if(!lab.font){
            //     let resName = lab["_fontName"];
            //     let temp = GameMgr.assetMgr.mapNamed[resName];
            //     if(temp == undefined){
            //         resName = `${resName}.font.json`
            //         temp = GameMgr.assetMgr.mapNamed[resName];
            //     }
            //     if(temp){
            //         let ref = GameMgr.assetMgr.mapRes[temp[0]];
            //         let tfont = ref.asset as m4m.framework.font;
            //         lab.font = tfont;
            //         lab["needRefreshFont"] = true;
            //     }
            // }
            this.setHudMat(lab);
            removelist.push(i);
        }

        removelist.forEach((idx) => {
            this.waitLabList.splice(idx, 1);
        });
    }

    private static waitLabList: m4m.framework.label[] = [];
    //设置 小球 头顶字符的材质
    static setHudMat(lab: m4m.framework.label) {
        if (!lab) return;
        lab.setShaderByName("distortionFont.shader.json");
        if (!lab.font || !lab.font.texture) {
            this.waitLabList.push(lab);
            return;
        }

        lab.transform.canvas.assetmgr = GameMgr.assetMgr;
        if (!this.hud_mat) {
            //get mat
            let mat = lab["uimat"] as m4m.framework.material;
            mat.setShader(Ress.fontShader);
            mat[this.tag_unColorCg] = true;
            mat.setVector4("OFFSET", this.cacheDistortion);
            this.hud_mat = mat;
            this.mats.push(mat);

        } else {
            lab["_uimat"] = this.hud_mat;
        }
    }

    //取消设置 小球 头顶字符的材质
    static unSetHudMat(lab: m4m.framework.label) {
        if (!lab) return;
        let idx = this.waitLabList.indexOf(lab);
        if (idx != -1) {
            this.waitLabList.splice(idx, 1);
        }
    }

    private static count = 0;
    //获取一个 指定 shader & 贴图的材质
    static getAMat(tex: m4m.framework.texture = null, shader = null) {
        let mat = new m4m.framework.material(`disMat_${this.count}`);
        if (shader) mat.setShader(shader);
        else mat.setShader(Ress.disShader);

        if (tex) {
            mat.setTexture("_MainTex", tex);
        }
        this.count++;
        return mat;
    }

    //通过texName 获取tex
    static getTextName(texName: string, assetbundleName: string = null) {
        if (texName == null || texName == "") return;
        let tex = Ress.assetmgr.getDefaultTexture(texName) as m4m.framework.texture;
        if (tex == null) {
            tex = Ress.assetmgr.getAssetByName(texName, assetbundleName);
        }

        return tex;
    }

    //设置物体渐变的颜色
    static setColor(r: number, g: number, b: number, isall = false) {
        this.cacheColor.x = r;
        this.cacheColor.y = g;
        this.cacheColor.z = b;

        if (isall) {
            this.onlyGreyMats.forEach(mat => {
                mat.setVector4("_MainColor", this.cacheColor);
            });
        }
    }

    //雾效颜色
    private static setFogColor(r: number, g: number, b: number) {
        if (!this.scene.fog) return;
        let c = this.scene.fog._Color;
        c.x = r;
        c.y = g;
        c.z = b;
    }

    //设置物体扭曲的参数
    static setDistortion(x: number, y: number) {
        this.cacheDistortion.x = x;
        this.cacheDistortion.y = y;
        // this.mats.forEach(mat=>{
        //     mat.setVector4("OFFSET",this.cacheDistortion);
        // });
    }

    private static stepOnec = true;  //刷一次颜色
    private static toGreying = false;
    private static update(dt) {

        if (this.stepOnec) {
            this.gradualColor2(0.001);
            this.initColor();
            this.stepOnec = false;
            this.isGaped = false;
            return;
        }

        if (GameMgr.raceStage == 1)
            this.gradualColor2(dt);
        else if (GameMgr.raceStage == -1 && !playerMgr.reached) {
            if (!this.toGreying) {
                this.ontoGrey();
                this.toGreying = true;
            }
            this.toGrey(dt);
        }

        this.gradualDistortion(dt);

        //labMatChageCk
        this.ckHudLabMatCg();
    }

    private static ontoGrey() {
        //变灰设置
        this.setDynamicColorAll(true);
        this.setRampColor(true);
    }

    private static lastDisC: m4m.math.vector4 = new m4m.math.vector4();
    private static targetDisC: m4m.math.vector4 = new m4m.math.vector4();
    private static distortionP = 1;
    private static distorSpeed;
    //扭曲渐变 更新
    private static gradualDistortion(delta: number) {
        if (GameMgr.raceStage != 1) return;
        let roleRate = playerMgr.RoleSpeed * 0.02;
        this.distortionP += delta * this.distorSpeed * roleRate;
        if (this.distortionP >= 1) {
            m4m.math.vec4Clone(this.targetDisC, this.lastDisC);
            this.nextDis(this.targetDisC);
            this.distortionP = 0;
        }
        m4m.math.vec4SLerp(this.lastDisC, this.targetDisC, this.distortionP, this.cacheDistortion);
        this.setDistortion(this.cacheDistortion.x, this.cacheDistortion.y);
    }

    private static disRange_x;
    private static disRange_y;
    private static nextDis(disto: m4m.math.vector4) {
        let num_x = Math.random() * this.disRange_x * (Math.random() > 0.5 ? -1 : 1);
        let num_y = Math.random() * this.disRange_y;
        disto.x = num_x;
        disto.y = num_y;
    }

    private static _colorP;  //雾& 背景颜色 H进度值
    private static _colorP_0; //物体颜色 H进度值
    private static crate = 0.5;
    static _v; // = 0.96;
    static _s; //= 0.5;
    private static colorSp; //base = 0.05
    //颜色渐变更新
    private static gradualColor2(delta) {
        let realNum = delta * this.colorSp;
        this._colorP += realNum;
        this._colorP = this._colorP % 1;
        this._colorP_0 += realNum;
        this._colorP_0 = this._colorP_0 % 1;

        // let _s = 0.5;
        this.SwingHSV(this._colorP, this._s, this._v);
        this.setFogColor(this.cacheHSV.r, this.cacheHSV.g, this.cacheHSV.b);

        if (!this.isGaped) {
            if (this._colorP >= (this.firstP + this.colorPGap)) {
                this.isGaped = true;
            }
            this._colorP_0 = this.firstP;
        }
        this.SwingHSV(this._colorP_0, this._s, this._v);
        if (this._colorP_0 >= 0)
            this.setColor(this.cacheHSV.r * this.crate, this.cacheHSV.g * this.crate, this.cacheHSV.b * this.crate);
        else
            this.setColor(1, 0.6, 0.6)
    }

    private static greyP = 1;
    private static cGreyTime = 1.2;
    //渐变成灰色
    private static toGrey(delta: number) {
        if (this.greyP <= 0) {
            return;
        }
        this.greyP -= delta / this.cGreyTime;
        this.greyP = Math.min(this.greyP, this._s);
        this.greyP = this.greyP < 0 ? 0 : this.greyP;
        //物体色
        this.SwingHSV(this._colorP_0, this.greyP, this._v);
        this.setColor(this.cacheHSV.r * this.crate, this.cacheHSV.g * this.crate, this.cacheHSV.b * this.crate, true);
        //雾色
        this.SwingHSV(this._colorP, this.greyP, this._v);
        this.setFogColor(this.cacheHSV.r, this.cacheHSV.g, this.cacheHSV.b);
    }

    /* accepts parameters
    * h  Object = {h:x, s:y, v:z}
    * OR 
    * h, s, v
    */
    private static cacheHSV: { r: number, g: number, b: number } = { r: 0, g: 0, b: 0 };
    private static HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        this.cacheHSV.r = r;
        this.cacheHSV.g = g;
        this.cacheHSV.b = b;
    }


    private static hRange = new m4m.math.vector2(0, 1);
    private static hRlen = 1;
    static sFactor = 1;
    static vFactor = 1;
    private static SwingHSV(p, s, v) {
        let min = this.hRange.x;
        let _p = p < 0.5 ? p * 2 : 1 - (p - 0.5) * 2;
        let h = _p * this.hRlen + min;
        //this.HSVtoRGB(m4m.math.numberLerp(this.hRange[0], this.hRange[1], p),s,v);
        this.HSVtoRGB(h, s, v);
    }

    /** 设置H 范围 */
    static setHrange(left: number, right: number) {
        this.hRange.x = left;
        this.hRange.y = right;
        this.hRlen = Math.abs(this.hRange.y - this.hRange.x);
        // this._colorP = this._colorP_0 = this.hRange.x;
        this.stepOnec = true;
    }
}