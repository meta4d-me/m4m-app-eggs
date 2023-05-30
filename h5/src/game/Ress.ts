import { loadMgr } from "Loader/loadMgr";
import { ThemeBase } from "ThemeBase";
import { GameMgr } from "./GameMgr";
// import { loadMgr } from "./Loader/loadMgr";

export class Ress {
    //shader
    static disShader: m4m.framework.shader;
    static disShaderUnlight: m4m.framework.shader;
    static ballShader: m4m.framework.shader;
    static ballPBRShader: m4m.framework.shader;
    static trailShader: m4m.framework.shader;
    static fontShader: m4m.framework.shader;
    static fxAdd: m4m.framework.shader;
    static fxBlen: m4m.framework.shader;

    //trans
    static lego1: m4m.framework.transform;
    static lego2: m4m.framework.transform;
    static floor: m4m.framework.transform;
    static decoraion1: m4m.framework.transform;
    static character: m4m.framework.transform;
    static boost: m4m.framework.transform;
    static trail: m4m.framework.transform;
    static jinbi: m4m.framework.transform;
    //tex
    static arrowTex: m4m.framework.texture;
    static cgrayTex: m4m.framework.texture;
    static finishLine: m4m.framework.texture;
    static brdfLUT: m4m.framework.texture;
    static shadowTex: m4m.framework.texture;

    //新 UI
    //首页
    static home_page: m4m.framework.prefab;
    //设置
    static setting_page: m4m.framework.prefab;
    static unlock_page: m4m.framework.prefab;
    static continue_page: m4m.framework.prefab;
    static skinShop_page: m4m.framework.prefab;
    static gameOver_page: m4m.framework.prefab;
    static inGame_page: m4m.framework.prefab;
    static invite_page: m4m.framework.prefab;
    static videoPrize_page: m4m.framework.prefab;
    static rank_page: m4m.framework.prefab;
    static code_page: m4m.framework.prefab;
    static prize_page: m4m.framework.prefab;
    static victory_page: m4m.framework.prefab;
    static newYear_page: m4m.framework.prefab;

    //fx
    // static fx_die_qiu: m4m.framework.transform;  //死亡boom
    static get fx_die_qiu() { return Ress.assetmgr.getAssetByName("fx_die_qiu.prefab.json", `fx_die_qiu.assetbundle.json`) as m4m.framework.prefab; };  //死亡boom
    // static fx_wd: m4m.framework.transform; //无敌new
    static get fx_wd() { return Ress.assetmgr.getAssetByName("fx_wd.prefab.json", `fx_wd.assetbundle.json`) as m4m.framework.prefab; }; //无敌new
    // static fx_js: m4m.framework.transform; //加速特效
    static get fx_js() { return Ress.assetmgr.getAssetByName("fx_js.prefab.json", `fx_js.assetbundle.json`) as m4m.framework.prefab; }; //加速特效

    static fx_gx: m4m.framework.transform; //过关特效
    static fx_sl: m4m.framework.transform; //撒花效果
    //config
    static mainConfig: any;
    static skinConfig: any;
    static themeConfig: any;
    static levelConfig: any;
    static inviteConfig: string;

    private static lcallBack: Function;
    static seconedLcallBack: Function;
    private static lReslist: string[] = [];
    private static isInit = true;
    static assetmgr: m4m.framework.assetMgr;
    private static setList() {

        //shader 必须优先加载完成
        let shaderURL = `res/shaders/customShader/customShader.assetbundle.json`;
        loadMgr.Instance.load(shaderURL, () => {
            //字体
            // this.lReslist.push(`${GameMgr.fontPath}defFont/defFont.assetbundle.json`);

            this.lReslist.push(`${GameMgr.TexPath}texs_basePre/texs_basePre.assetbundle.json`);
            this.lReslist.push(`${GameMgr.propsPath}qiu/qiu.assetbundle.json`);
            this.lReslist.push(`${GameMgr.propsPath}floor/floor.assetbundle.json`);
            this.lReslist.push(`${GameMgr.propsPath}trail/trail.assetbundle.json`);

            //----------

            //     //物体
            //     this.lReslist.push(`${GameMgr.propsPath}boost/boost.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.propsPath}jinbi/jinbi.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.propsPath}decoraion1/decoraion1.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.propsPath}box001/box001.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.propsPath}lego2/lego2.assetbundle.json`);

            //     //单图

            //     //特效
            //     // this.lReslist.push(`${GameMgr.atlasPath}speedLine/speedLine.assetbundle.json`);
            //     // this.lReslist.push(`${GameMgr.UIPath}speed_line/speed_line.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.fxPath}fx_die_qiu/fx_die_qiu.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.fxPath}fx_wd/fx_wd.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.fxPath}fx_js/fx_js.assetbundle.json`);
            //     // this.lReslist.push(`${GameMgr.fxPath}fx_gx/fx_gx.assetbundle.json`);
            //     // this.lReslist.push(`${GameMgr.fxPath}fx_sl/fx_sl.assetbundle.json`);

            //     //new 图集
            this.lReslist.push(`${GameMgr.atlasPath}home/home.assetbundle.json`);
            this.lReslist.push(`${GameMgr.atlasPath}common/common.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}continue/continue.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}gameover/gameover.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}ingame/ingame.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}invite/invite.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}newyear/newyear.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}prize/prize.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}QRcode/QRcode.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}rank/rank.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}setting/setting.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}shop/shop.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}unlock/unlock.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}victory/victory.assetbundle.json`);
            //     this.lReslist.push(`${GameMgr.atlasPath}videoPrize/videoPrize.assetbundle.json`);


            //     //ui
            this.lReslist.push(`${GameMgr.UIPath}home_page/home_page.assetbundle.json`);
            // this.lReslist.push(`${GameMgr.UIPath}setting_page/setting_page.assetbundle.json`);
            // this.lReslist.push(`${GameMgr.UIPath}continue_page/continue_page.assetbundle.json`);

            let ps: Promise<any>[] = [];
            for (let i = 0; i < Ress.lReslist.length; i++) {
                ps.push(loadMgr.Instance.syncLoad(Ress.lReslist[i]));
            }

            Promise.all(ps).then(() => {
                this.loadConfigJson().then(() => {
                    Ress.lReslist.length = 0;
                    this.Lend();
                    this.secondLoading();
                })
            });


        });
    }

    static init() {
        return new m4m.threading.gdPromise((resolve, reject) => {
            // if (!Ress.isInit) {
            //     resolve();
            // }

            Ress.assetmgr = GameMgr.app.getAssetMgr();
            Ress.setList();
            Ress.isInit = false;
            Ress.lcallBack = () => {
                resolve();
            };
        });
    }

    private static dis_num = 0;
    /** 获取去一个 distortion 材质 */
    static getDistortionMat() {
        let sh = this.assetmgr.getShader("distortion.shader.json");
        let mat = new m4m.framework.material(`distortion_${this.dis_num}`);
        mat.setShader(sh);
        this.dis_num++;
        return mat;
    }

    private static loadText(path) {
        return new Promise((res: ((_: string) => void), rej) => {
            m4m.io.loadText(path, txt => {
                res(txt);
            });
        });
    }

    private static async loadConfigJson() {
        // 配置列表
        const configs = [
            // `${GameMgr.configPath}main.json`,
            // `${GameMgr.configPath}skin.json`,
            // `${GameMgr.configPath}theme.json`,
            // `${GameMgr.configPath}level.json`,
            `${GameMgr.configPath}invite.json`
        ];
        let  [invite] = await Promise.all(configs.map(p => this.loadText(p)));
        // this.mainConfig = main;
        // this.skinConfig = skin;
        // this.themeConfig = theme;
        // this.levelConfig = level;
        this.inviteConfig = invite;

        return;
    }
    //加载结束 资源处理
    private static Lend() {
        Ress.disShader = Ress.assetmgr.getShader("distortion.shader.json");
        Ress.disShaderUnlight = Ress.assetmgr.getShader("distortionUnlight.shader.json");
        Ress.ballShader = Ress.assetmgr.getShader("distortionBall.shader.json");
        Ress.ballPBRShader = Ress.assetmgr.getShader("distortionMatBall.shader.json");
        Ress.trailShader = Ress.assetmgr.getShader("distortionTrail.shader.json");
        Ress.fontShader = Ress.assetmgr.getShader("distortionFont.shader.json");

        Ress.character = (Ress.assetmgr.getAssetByName("qiu.prefab.json", `qiu.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();
        Ress.floor = (Ress.assetmgr.getAssetByName("floor.prefab.json", `floor.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();
        Ress.trail = (Ress.assetmgr.getAssetByName("trail.prefab.json", `trail.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();

        // this.home_page = (Ress.assetmgr.getAssetByName("home_page.prefab.json") as m4m.framework.prefab);
        // Ress.arrowTex = Ress.assetmgr.getAssetByName("arrow_1.png") as m4m.framework.texture;
        // Ress.brdfLUT = Ress.assetmgr.getAssetByName("brdf.png") as m4m.framework.texture;
        // Ress.finishLine = Ress.assetmgr.getAssetByName("finish-plane-texture.png") as m4m.framework.texture;

        // //装配资源

        // Ress.lego1 = (Ress.assetmgr.getAssetByName("box001.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // Ress.lego2 = (Ress.assetmgr.getAssetByName("lego2.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // Ress.boost = (Ress.assetmgr.getAssetByName("boost.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // Ress.decoraion1 = (Ress.assetmgr.getAssetByName("decoraion1.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // // Ress.jinbi = (Ress.assetmgr.getAssetByName("jinbi.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // Ress.jinbi = (Ress.assetmgr.getAssetByName("jinbi.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // this.coustomMeshCg(Ress.decoraion1);

        // //textrues
        // // this.createCgrayTex();
        // // Ress.speedLine = Ress.assetmgr.getAssetByName("speedLine.atlas.json") as m4m.framework.atlas;
        Ress.shadowTex = Ress.assetmgr.getAssetByName("shadow.png", `texs_basePre.assetbundle.json`) as m4m.framework.texture;


        // //UI

        // // Ress.ui_speedLine = ( Ress.assetmgr.getAssetByName("speed_line.prefab.json") as m4m.framework.prefab) ;

        // this.setting_page = (Ress.assetmgr.getAssetByName("setting_page.prefab.json") as m4m.framework.prefab);
        // this.continue_page = (Ress.assetmgr.getAssetByName("continue_page.prefab.json") as m4m.framework.prefab);
        // this.unlock_page = (Ress.assetmgr.getAssetByName("unlock_page.prefab.json") as m4m.framework.prefab);
        // // this.skinShop_page = (Ress.assetmgr.getAssetByName("skinShop_page.prefab.json") as m4m.framework.prefab);

        // // this.gameOver_page = (Ress.assetmgr.getAssetByName("gameOver_page.prefab.json") as m4m.framework.prefab);
        // // this.inGame_page = (Ress.assetmgr.getAssetByName("inGame_page.prefab.json") as m4m.framework.prefab);
        // // this.invite_page = (Ress.assetmgr.getAssetByName("invite_page.prefab.json") as m4m.framework.prefab);
        // // this.videoPrize_page = (Ress.assetmgr.getAssetByName("videoPrize_page.prefab.json") as m4m.framework.prefab);
        // // this.prize_page = (Ress.assetmgr.getAssetByName("prize_page.prefab.json") as m4m.framework.prefab);
        // // this.code_page = (Ress.assetmgr.getAssetByName("code_page.prefab.json") as m4m.framework.prefab);
        // // this.rank_page = (Ress.assetmgr.getAssetByName("rank_page.prefab.json") as m4m.framework.prefab);
        // // this.victory_page = (Ress.assetmgr.getAssetByName("victory_page.prefab.json") as m4m.framework.prefab);
        // // this.newYear_page = (Ress.assetmgr.getAssetByName("newYear_page.prefab.json") as m4m.framework.prefab);
        // //fx
        // Ress.fx_die_qiu = (Ress.assetmgr.getAssetByName("fx_die_qiu.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // Ress.fx_wd = (Ress.assetmgr.getAssetByName("fx_wd.prefab.json") as m4m.framework.prefab).getCloneTrans();
        // Ress.fx_js = (Ress.assetmgr.getAssetByName("fx_js.prefab.json") as m4m.framework.prefab).getCloneTrans();

        if (Ress.lcallBack)
            Ress.lcallBack();
    }

    //第二次加载 低优先级 资源 （字体、非首页 UI图集 等）
    private static secondLoading() {
        //物体
        this.lReslist.push(`${GameMgr.propsPath}boost/boost.assetbundle.json`);
        this.lReslist.push(`${GameMgr.propsPath}jinbi/jinbi.assetbundle.json`);
        this.lReslist.push(`${GameMgr.propsPath}decoraion1/decoraion1.assetbundle.json`);
        this.lReslist.push(`${GameMgr.propsPath}box001/box001.assetbundle.json`);
        this.lReslist.push(`${GameMgr.propsPath}lego2/lego2.assetbundle.json`);

        //单图
        this.lReslist.push(`${GameMgr.TexPath}texs_base/texs_base.assetbundle.json`);


        //特效
        // this.lReslist.push(`${GameMgr.fxPath}fx_die_qiu/fx_die_qiu.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.fxPath}fx_wd/fx_wd.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.fxPath}fx_js/fx_js.assetbundle.json`);

        // this.lReslist.push(`${GameMgr.fxPath}fx_gx/fx_gx.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.fxPath}fx_sl/fx_sl.assetbundle.json`);

        // //new 图集
        // this.lReslist.push(`${GameMgr.atlasPath}common/common.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}continue/continue.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}gameover/gameover.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}home/home.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}ingame/ingame.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}invite/invite.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}newyear/newyear.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}prize/prize.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}QRcode/QRcode.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}rank/rank.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}setting/setting.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}shop/shop.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}unlock/unlock.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}victory/victory.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.atlasPath}videoPrize/videoPrize.assetbundle.json`);


        //ui
        // this.lReslist.push(`${GameMgr.UIPath}home_page/home_page.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.UIPath}setting_page/setting_page.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.UIPath}continue_page/continue_page.assetbundle.json`);
        // this.lReslist.push(`${GameMgr.UIPath}unlock_page/unlock_page.assetbundle.json`);

        let ps: Promise<any>[] = [];
        for (let i = 0; i < Ress.lReslist.length; i++) {
            ps.push(loadMgr.Instance.syncLoad(Ress.lReslist[i]));
        }

        Promise.all(ps).then(() => {
            this.seconedLend();
            this.finalLoading();
        });

    }


    // //第二次加载 回调
    // private static onScLoaded(url: string) {
    //     let idx = Ress.lReslist.indexOf(url);
    //     if (idx != -1) {
    //         Ress.lReslist.splice(idx, 1);
    //     }
    //     if (Ress.lReslist.length <= 0) {
    //         this.seconedLend();
    //         this.finalLoading();
    //     }
    // }

    //第二次加载 完毕
    private static seconedLend() {
        //处理资源

        //装配资源
        Ress.lego1 = (Ress.assetmgr.getAssetByName("box001.prefab.json", `box001.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();
        Ress.lego2 = (Ress.assetmgr.getAssetByName("lego2.prefab.json", `lego2.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();
        Ress.boost = (Ress.assetmgr.getAssetByName("boost.prefab.json", `boost.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();
        Ress.decoraion1 = (Ress.assetmgr.getAssetByName("decoraion1.prefab.json", `decoraion1.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();
        // Ress.jinbi = (Ress.assetmgr.getAssetByName("jinbi.prefab.json") as m4m.framework.prefab).getCloneTrans();
        Ress.jinbi = (Ress.assetmgr.getAssetByName("jinbi.prefab.json", `jinbi.assetbundle.json`) as m4m.framework.prefab).getCloneTrans();
        this.coustomMeshCg(Ress.decoraion1);
        //textrues
        Ress.arrowTex = Ress.assetmgr.getAssetByName("arrow_1.png", `texs_base.assetbundle.json`) as m4m.framework.texture;
        Ress.brdfLUT = Ress.assetmgr.getAssetByName("brdf.png", `texs_base.assetbundle.json`) as m4m.framework.texture;
        Ress.finishLine = Ress.assetmgr.getAssetByName("finish-plane-texture.png", `texs_base.assetbundle.json`) as m4m.framework.texture;

        //UI
        //  Ress.ui_speedLine = ( Ress.assetmgr.getAssetByName("speed_line.prefab.json") as m4m.framework.prefab) ;
        //  this.home_page = (Ress.assetmgr.getAssetByName("home_page.prefab.json") as m4m.framework.prefab);
        //  this.setting_page = (Ress.assetmgr.getAssetByName("setting_page.prefab.json") as m4m.framework.prefab);
        //  this.continue_page = (Ress.assetmgr.getAssetByName("continue_page.prefab.json") as m4m.framework.prefab);
        //  this.unlock_page = (Ress.assetmgr.getAssetByName("unlock_page.prefab.json") as m4m.framework.prefab);


        //对外回调
        if (this.seconedLcallBack) {
            this.seconedLcallBack();
        }
    }

    //最后的加载 
    private static finalLoading() {
        // loadMgr.Instance.load(`${GameMgr.atlasPath}shop/shop.assetbundle.json`, null);
        // loadMgr.Instance.load(`${GameMgr.atlasPath}newyear/newyear.assetbundle.json`, null);
        // loadMgr.Instance.load(`${GameMgr.atlasPath}rank/rank.assetbundle.json`, null);

        // //字体
        // loadMgr.Instance.load(`${GameMgr.fontPath}defFont/defFont.assetbundle.json`,null);

        //特效
        loadMgr.Instance.load(`${GameMgr.fxPath}fx_die_qiu/fx_die_qiu.assetbundle.json`, null);
        loadMgr.Instance.load(`${GameMgr.fxPath}fx_wd/fx_wd.assetbundle.json`, null);
        loadMgr.Instance.load(`${GameMgr.fxPath}fx_js/fx_js.assetbundle.json`, null);
        loadMgr.Instance.load(`${GameMgr.fxPath}fx_gx/fx_gx.assetbundle.json`, null);
        loadMgr.Instance.load(`${GameMgr.fxPath}fx_sl/fx_sl.assetbundle.json`, null);
    }

    private static coustomMeshCg(tran: m4m.framework.transform) {
        if (!tran) return;
        //mesh cg add a
        let arr = [0, 2, 4, 6, 8, 10, 12, 13, 16, 17, 18, 19];
        let mf = tran.gameObject.getComponent("meshFilter") as m4m.framework.meshFilter;
        let cs = mf.mesh.data.color;
        arr.forEach(idx => {
            cs[idx].a = 0;
        });

        // let vf = mf.mesh.data.originVF;
        let vf = mf.mesh.glMesh.vertexFormat;
        let v32 = mf.mesh.data.genVertexDataArray(vf);
        mf.mesh.glMesh.uploadVertexData(GameMgr.app.webgl, v32);
    }

}