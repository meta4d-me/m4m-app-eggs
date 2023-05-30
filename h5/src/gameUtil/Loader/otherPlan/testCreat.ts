import { testReadTool } from "./testReadTool";
import { Mesh } from "./dataType/Mesh";
import { Mat } from "./dataType/Mat";
import { Prefab } from "./dataType/Prefab";
import { ImageSetting } from "./dataType/ImageSetting";
import { loadTools } from "./loadTools";
import { Aniclip } from "./dataType/Aniclip";
import { subClip } from "./dataType/subClip";
import { boxcollider, aniplayer, skinnedMeshRenderer, meshFilter, meshRenderer } from "./dataType/nodeComponent";
import { KTXParse } from "./ktx";
import { testPvrParse } from "./pvr";
import { testLoader } from "./testLoader";
import { cMap } from "src/gameUtil/Data/Map";
import { joyStick } from "src/gameUtil/UIBase/joyStick";
import { imgNum } from "src/gameUtil/UIBase/imgNum";
import { AnimLoadPlayer } from "src/gameUtil/animation/animLoadPlayer";
import { miniGame } from "src/gameUtil/Tools/miniGame";
import { uiFloat } from "src/gameUtil/UIBase/uiFloat";
import { uiImageSlider } from "src/gameUtil/UIBase/uiImageSlider";
import { ubiPopupIcon } from "src/gameUtil/UIBase/ubiPopupIcon";
import { uiRoll } from "src/gameUtil/UIBase/uiRoll";
import { uiScaleDown } from "src/gameUtil/UIBase/uiScaleDown";
import { uiScaleAnimation } from "src/gameUtil/UIBase/uiScaleAnimation";
import { multiToucher } from "src/gameUtil/Scripts/multiToucher";
import { uiSpring } from "src/gameUtil/UIBase/uiSpring";
import { sequenceFrame } from "src/gameUtil/UIBase/sequenceFrame";
import { uiBtnDown } from "src/gameUtil/UIBase/uiBtnDown";
import { PlatformType, SystemQualityType } from "src/gameUtil/Tools/PlatformUtil";

export enum creatType {
    all = 0,
    noClip = 1,
    noMesh = 2,
}
// tslint:disable-next-line: class-name
export class testCreat {
    /** 需要截获处理的资源路径 和 重定向后新的资源路径  { 截获路径:重定向路径 }*/
    public static get pathReplaceMap() {
        return this._pathReplaceMap;
    }
    /** 项目资源 根路径 URL */
    public static get CDNURL() { return this._CDNURL; }
    /**
     * 新资源加载工具 使用类初始
     * @param CDNURL    资源CDN RUL 
     * @param systemQuality 游戏资源质量等级（高、中、低）
     * @param systemOS  OS 类型
     * @param carePathReplaceMap    设置需要截获处理的资源路径和重定向的资源路径 { 截获路径:重定向路径 }
     */
    public static init(CDNURL: string, systemQuality: SystemQualityType, systemOS: PlatformType, carePathReplaceMap: { [srcPath: string]: string }) {
        this._CDNURL = CDNURL;
        this.systemOS = systemOS;
        // this.systemOS = 7;
        this.systemQuality = systemQuality;
        if (carePathReplaceMap) {
            this._pathReplaceMap = carePathReplaceMap;
        }
    }

    private static setGetMesh() {
        // m4m.framework.F14EmissionBaseData.getMesh = (json, assetmgr, assetbundle) => {
        //     if (testCreat.meshMap.has(json.mesh)) {
        //         return testCreat.meshMap.get(json.mesh);
        //     }
        //     return null;
        // }
    }
    public static getFilesByType(path: string, fileName: string, type: creatType, callBack: Function) {
        if (!testCreat.isSetGetMesh) {
            testCreat.isSetGetMesh = true;
            testCreat.setGetMesh();
        }
        let readFileList: string[] = [];
        switch (type) {
            case creatType.noClip:
                readFileList.push(path + fileName + "/resources/" + fileName + testCreat.noClipEnd);
                break;
            case creatType.noMesh:
                readFileList.push(path + fileName + "/resources/" + fileName + testCreat.noMeshEnd);
                readFileList.push(path + fileName + "/resources/" + fileName + testCreat.meshEnd);
                break;
            default:
                readFileList.push(path + fileName + "/resources/" + fileName + testCreat.allEnd);
        }
        // console.error("开始加载   1111111111111111111111    " + fileName + "              ");
        // let resList:Array<CResBundlesData>=new Array();
        let aaa = new testLoader();
        readFileList.forEach((url) => {
            // tslint:disable-next-line: no-shadowed-variable
            let type = 0;
            if (url.endsWith("_Json.json")) {
                type = 1;
            }
            aaa.add(url, null, type);

            // let creData=new CResBundlesData();
            // creData.url=url;
            // creData.loadType=type;
            // resList.push(creData);
            // CResBundleLoaderManage.Instance.addList(path + fileName,resList,(v) => {
        });
        //     let info = []
        //     v.forEach(element => {
        //         if (element) {
        //             if (!element.length) {
        //                 let url = element["_url_"];
        //                 testReadTool.timer.set(url + 2, Date.now());
        //                 let bd = testReadTool.readInfoByBuffer(url, element);
        //                 info = info.concat(bd)
        //             } else {
        //                 info = info.concat(element)
        //             }
        //         }
        //     });
        //     callBack(info);
        // });
        // resList.length=0;
        // resList=null;

        aaa.start((v) => {
            let info = [];
            v.forEach((element) => {
                if (element) {
                    if (!element.length) {
                        let url = element["_url_"];
                        testReadTool.timer.set(url + 2, Date.now());
                        let bd = testReadTool.readInfoByBuffer(url, element);
                        // console.error(info);
                        info = info.concat(bd);
                    } else {
                        info = info.concat(element);
                    }
                }
            });
            callBack(info);
        });

    }
    public static set systemQuality(v: number) {
        switch (v) {
            case 0:
                testCreat.qualityString = "LOW_";
                break;
            case 1:
                testCreat.qualityString = "MID_";
                break;
            default:
                testCreat.qualityString = "";

        }
    }

    public static set systemOS(v: number) {
        testCreat._systemOS = v;
        switch (v) {
            case 1:
                testCreat.osString = "_10x10.astc.bin.js";
                // testCreat.osString = ".ktx.bin.js";
                break;
            case 2:
                testCreat.osString = "_10x10.astc.bin.js";
                // testCreat.osString = ".pvr.bin.js";
                break;
            default:
                testCreat.osString = "";

        }
    }
    public static disposeResByUrl(path: string) {
        if (testCreat.pfbResList.has(path)) {
            let aaa = testCreat.pfbResList.get(path);
            aaa.forEach((v) => {
                if (v.dispose) {
                    v.dispose();
                }
            });
            aaa = null;
            testCreat.pfbResList.delete(path);
        }
        if (testCreat.pfbList.has(path)) {
            testCreat.pfbList.get(path)
                .dispose();
            testCreat.pfbList.delete(path);
        }
    }
    // static test2(path: string, filePath: string, fun: (pfb) => void) {
    public static async createPfb(path: string, filePath: string) {
        let savePath = path + filePath + "/";
        if (testCreat.pfbList.get(savePath)) {
            return testCreat.pfbList.get(savePath);
        }

        let temp;
        if (!this.loadMap.get(path + filePath)) {
            temp = testCreat.creatTranByBuffer(path, filePath);
            this.loadMap.set(path + filePath, temp);
        } else {
            temp = this.loadMap.get(path + filePath);
        }
        let obj = await temp;
        // let obj = await testCreat.creatTranByBuffer(path, filePath);
        if (!obj) { return null; }
        let pfb = new m4m.framework.prefab(path);
        pfb.apply(obj);
        testCreat.pfbList.set(savePath, pfb);
        this.loadMap.delete(path + filePath);

        //替换 getCloneTrans接口 ， 稳定后移入引擎
        pfb.getCloneTrans = () => {
            let t: m4m.framework.transform;
            t = testCreat.createTran(savePath) as m4m.framework.transform;
            // let t = pfb["trans"] as m4m.framework.transform;
            let aps = t.gameObject.getComponentsInChildren("aniplayer") as m4m.framework.aniplayer[];
            if (!aps || aps.length == 0) {
                return t;
            }
            let clips: string[] = [];
            for (let index = 0; index < aps.length; index++) {
                const ap = aps[index];
                AnimLoadPlayer.getClipNames(ap, clips);
                let clipNames = ap["clipnames"] as { [key: string]: m4m.framework.animationClip };
                let cDic = AnimLoadPlayer["animClipDic"] as cMap<m4m.framework.animationClip>;
                let setClips: m4m.framework.animationClip[] = [];
                // if (clipNames.length) {
                for (let key in clipNames) {
                    let clip = clipNames[key];
                    let clipName = `${filePath}_${key}`;
                    // let clipName = key;
                    if (clip["name"]) {
                        clip["name"].name = clipName;  //
                    }
                    cDic.set(clipName, clip);
                    setClips.push(clip);
                }
                // } else {
                if (setClips.length == 0) {

                    // tslint:disable-next-line: no-for-in-array
                    for (let key in ap.clips) {
                        let clip = ap.clips[key];
                        let clipName = `${filePath}_${clip.getName()}`;
                        // let clipName = key;
                        if (clip["name"]) {
                            clip["name"].name = clipName;  //
                        }
                    }
                }
                // }

                //
                clipNames = ap["clipnames"] = {};
                setClips.forEach((clip) => {
                    if (clip) { ap.addClip(clip); }
                });

            }
            return t;
        };
        return pfb;
    }
    public static async createPfb2D(path: string, filePath: string) {

        let savePath = path + filePath + "/";
        if (testCreat.pfbList.get(savePath)) {
            return testCreat.pfbList.get(savePath);
        }

        let obj = await testCreat.creatTran2DByBuffer(path, filePath);

        if (!obj) { return null; }
        let pfb = new m4m.framework.prefab(path);
        pfb["trans"] = obj;
        testCreat.pfbList.set(savePath, pfb);
        // pfb.getCloneTrans2D = () => {

        //     let res: m4m.framework.transform2D;
        //     res = testCreat.createTran(savePath) as m4m.framework.transform2D;
        //     return res;
        // }
        return pfb;
    }
    /**
     * 加载二进制获取数据并生成生成PREFAB
     * @param path 
     * @param filePath 
     */
    // static creatPfbByBuffer(path: string, filePath: string, fun: (pfb) => void) {
    public static async creatTranByBuffer(path: string, filePath: string) {
        let dataList = [];
        let savePath = path + filePath + "/";
        let urlMap = testCreat.pfbResList.get(savePath);
        if (!urlMap) {
            urlMap = new cMap<any>();
            testCreat.pfbResList.set(savePath, urlMap);
        }

        let list = urlMap.get(savePath);
        if (!list) {
            let temp;
            // if (!this.loadMap.get(path + filePath)) {
            temp = new Promise((resolve: ((a) => void)) => {
                testCreat.getFilesByType(path, filePath, 2, resolve);
            });
            //     this.loadMap.set(path + filePath, temp);
            // } else {
            //     // tslint:disable-next-line: no-parameter-reassignment
            //     temp = this.loadMap.get(path + filePath);
            // }
            dataList = await temp;
            // this.loadMap.delete(path + filePath);
            urlMap.set(savePath, dataList);
        }
        return await testCreat.create(savePath) as m4m.framework.transform;
    }
    public static async creatTran2DByBuffer(path: string, filePath: string) {

        let dataList = [];
        let savePath = path + filePath + "/";
        if (!testCreat.pfbResList.get(savePath)) {
            testCreat.pfbResList.set(savePath, new cMap<any>());
        }
        if (!testCreat.pfbResList.get(savePath)
            .get(savePath)) {
            // console.error("    savePath    " + savePath);
            let temp = new Promise((resolve: ((a) => void)) => {
                testCreat.getFilesByType(path, filePath, 2, resolve);
            });
            dataList = await temp;
            testCreat.pfbResList.get(savePath)
                .set(savePath, dataList);
        }
        return await testCreat.create(savePath) as m4m.framework.transform2D;

    }
    // static loadImg(url: string, cb: (img,err?) => void) {
    //     // if (assetMgr.mapImage[guid])
    //     //     return cb(assetMgr.mapImage[guid]);

    //     // let loading = assetMgr.mapLoading[guid];
    //     // if (!loading)
    //     // {
    //     //     loading = { readyok: false, cbQueue: [] };
    //     //     assetMgr.setLoading(guid, loading);
    //     // }
    //     // loading.cbQueue.push(cb);
    //     testCreat._loadImg(url, (img) => {
    //         cb.bind(this, img);
    //         // if (bundle && bundle.isunload == true)
    //         // {
    //         //     console.error(`img下载取消:${url} , bundle:${bundle.name} 已释放`);
    //         //     // loading.cbQueue = [];
    //         //     return;
    //         // }
    //         // assetMgr.mapImage[guid] = img;
    //         // loading.readyok = true;
    //         // loading.data = img;
    //         // while (loading.cbQueue.length > 0)
    //         //     loading.cbQueue.shift()(img);
    //     });
    // }
    public static loadJson(url: string) {
        return new Promise((resolve: ((a) => void)) => {
            testCreat._loadJson(url, (bin, urlStr) => {
                resolve(bin);
            });
        });
    }
    // tslint:disable-next-line: max-line-length
    public static _loadJson(url: string, fun: (_txt: string, _err: Error, isloadFail?: boolean) => void, onprocess: (curLength: number, totalLength: number) => void = null): void {
        if (m4m["__wx__"]) {
            let path = this._CDNURL + url;
            miniGame.request({
                url: path,
                header: {
                },
                success(res) {
                    fun(res.data, null, false);
                },
                fail() {
                    fun(null, null, true);
                },

            });
        } else {
            loadTools.xhrLoad(url, fun, onprocess, "json", (req) => {
                fun(req.response, null);
            });
        }
    }
    //微信可复写
    public static _loadImg(url: string, cb: (img, _err) => void) {
        let img = new Image();
        //webgl跨域渲染要这样玩 [crossOrigin = ""]否则服务器允许跨域也没用
        img.crossOrigin = "";
        img.src = url;
        img.onload = () => {
            if (cb) { cb(img, null); }
        };
        img.onerror = (_err) => {
            console.error(_err);
            if (cb) { cb(img, _err); }
        };
    }
    public static loadImgMap = new cMap<any>();
    // tslint:disable-next-line: cyclomatic-complexity
    public static async create(path: string) {
        let isTran2D = false;

        if (path.indexOf("/ui") != -1) {
            isTran2D = true;
        }
        // if (testCreat.pfbList.has(path)) {
        //     return testCreat.pfbList.get(path).getCloneTrans();
        // }
        let pfbres = testCreat.pfbResList.get(path);
        let dataList = pfbres.get(path);
        if (!dataList || dataList.length <= 0) {
            console.error("加载数据出错：" + path);
        }
        // testReadTool.timer.set(path + "resources/" + filePath + 5, Date.now());
        let insidMap: { [key: number]: any } = {};
        let dataMap: { [key: string]: any[] } = {};
        // let matMap: { [key: string]: any } = {};
        // let htmlImageList: cMap<any> = new cMap<any>();
        // let wx = m4m["__wx__"];
        //分类数据
        let imgLoad = new testLoader();
        for (let i = 0; i < dataList.length; i++) {
            const element = dataList[i] as any;
            if (element.insid != null) {
                insidMap[element.insid] = element;
            }
            let cname = element.className;
            if (!dataMap[cname]) {
                dataMap[cname] = [];
            }
            if (cname == "ImageSetting") {
                //先加载好会用到的贴图文件

                dataMap["ImageSetting"].push(element as ImageSetting);
                let url = testCreat.imgPathFix(path, element.imageName);
                if (!pfbres.has(url)) {
                    // if (this.loadImgMap.get(url)) {
                    if (testCreat._systemOS == 7 || url.endsWith(".png") || url.endsWith(".jpg")) {
                        imgLoad.add(url, null, 2);
                    } else {
                        imgLoad.add(url, null, 0);
                    }
                    //     this.loadImgMap.set(url, true);
                    // }
                }
            } else {
                dataMap[cname].push(element);
            }

        }
        let temp = new Promise((resolve: ((a) => void)) => {
            imgLoad.start((v) => {
                if (v) {
                    v.forEach((element) => {
                        if (element) {
                            let url = element["_url_"];
                            if (!pfbres.has(url)) {
                                pfbres.set(url, element);
                            }
                            // if (this.loadImgMap.get(url)) {

                            //     this.loadImgMap.delete(url);
                            // }
                        }
                    });
                }
                resolve(null);
            });
        });
        await temp;
        // }

        if (!isTran2D) {
            //组装mesh
            if (dataMap["Mesh"]) {
                for (let i = 0; i < dataMap["Mesh"].length; i++) {
                    const meshdata = dataMap["Mesh"][i];
                    let meshName = meshdata.fileName.replace(".cmesh", ".mesh");
                    if (!pfbres.has(meshName)) {
                        let smesh = testCreat.createMesh(meshdata, m4m.framework.assetMgr.Instance.webgl);
                        pfbres.set(meshName, smesh);
                        if (!testCreat.meshMap.has(meshName)) {
                            testCreat.meshMap.set(meshName, smesh);
                        }
                    }
                }
            }
            if (dataMap["Mat"]) {
                for (let i = 0; i < dataMap["Mat"].length; i++) {
                    let matData: Mat = dataMap["Mat"][i];
                    if (!pfbres.has(matData.fileName)) {
                        let mat = testCreat.setMat(matData, m4m.framework.sceneMgr.app, path, dataMap);
                        pfbres.set(matData.fileName, mat);
                    }
                }
            }
            if (dataMap["ParticleSystem"]) {
                for (let i = 0; i < dataMap["ParticleSystem"].length; i++) {
                    let data = dataMap["ParticleSystem"][i];
                    let particData = dataMap["ParticleSystem"][i];
                    if (!pfbres.has(data.fileName)) {
                        // let mat = testCreat.setMat(particData, m4m.framework.sceneMgr.app, path, dataMap);
                        pfbres.set(data.fileName, particData);
                    }
                }
            }
            if (dataMap["f14EffectSystem"]) {
                for (let i = 0; i < dataMap["f14EffectSystem"].length; i++) {
                    let data = dataMap["f14EffectSystem"][i];
                    let particData = dataMap["f14EffectSystem"][i];
                    if (!pfbres.has(data.fileName)) {
                        // let mat = testCreat.setMat(particData, m4m.framework.sceneMgr.app, path, dataMap);
                        pfbres.set(data.fileName, particData);
                    }
                }
            }
        }
        if (!isTran2D) {
            //组装Prefab
            if (dataMap["Prefab"] && dataMap["Prefab"].length > 0) {
                let trans = testCreat.makeAPrefab(dataMap["Prefab"][0], insidMap);
                //组装material
                //添加Prefab上的组件
                testCreat.setCompsToTran(trans, dataMap["Prefab"][0], insidMap, path);
                dataMap = null;

                insidMap = null;

                // htmlImageList.clear();
                return trans;
                // tslint:disable-next-line: unnecessary-else
            } else {
                console.error(" dataMap[Prefab]  为空 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！ ");
                dataMap = null;

                insidMap = null;

                // htmlImageList.clear();
                return null;
            }
        } else {
            let compMap = [];
            if (dataMap["Prefab2D"] && dataMap["Prefab2D"].length > 0) {

                let trans = testCreat.makeAPrefab2D(dataMap["Prefab2D"][0], insidMap);
                testCreat.setCompsToTran2D(trans, dataMap["Prefab2D"][0], insidMap, compMap, path);
                testCreat.referenceComps(insidMap, compMap);
                dataMap = null;

                insidMap = null;

                // htmlImageList.clear();
                return trans;
                // tslint:disable-next-line: unnecessary-else
            } else {
                console.error(" dataMap[Prefab2D]  为空  ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！");
                dataMap = null;
                insidMap = null;

                // htmlImageList.clear();
                return null;
            }
        }

    }
    public static createTran(path: string) {
        let isTran2D = false;

        if (path.indexOf("/ui") != -1) {
            isTran2D = true;
        }
        // if (testCreat.pfbList.has(path)) {
        //     return testCreat.pfbList.get(path).getCloneTrans();
        // }
        let pfbres = testCreat.pfbResList.get(path);
        let dataList = pfbres.get(path);
        if (!dataList || dataList.length <= 0) {
            console.error("加载数据出错：" + path);
        }
        // testReadTool.timer.set(path + "resources/" + filePath + 5, Date.now());
        let insidMap: { [key: number]: any } = {};
        let dataMap: { [key: string]: any[] } = {};
        // let matMap: { [key: string]: any } = {};
        // let htmlImageList: cMap<any> = new cMap<any>();
        // let wx = m4m["__wx__"];
        //分类数据
        // let imgLoad = new testLoader()
        for (let i = 0; i < dataList.length; i++) {
            const element = dataList[i] as any;
            if (element.insid != null) {
                insidMap[element.insid] = element;
            }
            let cname = element.className;
            if (!dataMap[cname]) {
                dataMap[cname] = [];
            }
            if (cname == "ImageSetting") {
                // //先加载好会用到的贴图文件

                // dataMap["ImageSetting"].push(element as ImageSetting);
                // let url = testCreat.imgPathFix(path, element.imageName);
                // if (!testCreat.htmlImageList.has(url)) {
                //     if (testCreat._systemOS == 7) {
                //         imgLoad.add(url, null, 2);
                //     }
                //     else {
                //         imgLoad.add(url, null, 0);
                //     }
                // }
            } else {
                dataMap[cname].push(element);
            }

        }

        // if (!isTran2D) {
        //     //组装mesh
        //     if (dataMap["Mesh"]) {
        //         for (let i = 0; i < dataMap["Mesh"].length; i++) {
        //             const meshdata = dataMap["Mesh"][i];
        //             let meshName = meshdata.fileName.replace(".cmesh", ".mesh");
        //             if (!testCreat.meshMap.has(meshName)) {
        //                 var smesh = testCreat.createMesh(meshdata, m4m.framework.assetMgr.Instance.webgl);
        //                 testCreat.meshMap.set(meshName, smesh);
        //             }
        //         }
        //     }
        //     if (dataMap["Mat"]) {
        //         for (let i = 0; i < dataMap["Mat"].length; i++) {
        //             let matData: Mat = dataMap["Mat"][i];
        //             if (!testCreat.matMap.has(matData.fileName)) {
        //                 let mat = testCreat.setMat(matData, m4m.framework.sceneMgr.app, path, dataMap);
        //                 testCreat.matMap.set(matData.fileName, mat);
        //             }
        //         }
        //     }
        // }
        if (!isTran2D) {
            //组装Prefab
            if (dataMap["Prefab"] && dataMap["Prefab"].length > 0) {
                let trans = testCreat.makeAPrefab(dataMap["Prefab"][0], insidMap);
                //组装material
                //添加Prefab上的组件
                testCreat.setCompsToTran(trans, dataMap["Prefab"][0], insidMap, path);
                dataMap = null;

                insidMap = null;

                // htmlImageList.clear();
                return trans;
                // tslint:disable-next-line: unnecessary-else
            } else {
                console.error(" dataMap[Prefab]  为空 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！ ");
                dataMap = null;

                insidMap = null;

                // htmlImageList.clear();
                return null;
            }
        } else {
            let compMap = [];
            if (dataMap["Prefab2D"] && dataMap["Prefab2D"].length > 0) {

                let trans = testCreat.makeAPrefab2D(dataMap["Prefab2D"][0], insidMap);
                testCreat.setCompsToTran2D(trans, dataMap["Prefab2D"][0], insidMap, compMap, path);
                testCreat.referenceComps(insidMap, compMap);
                dataMap = null;

                insidMap = null;

                // htmlImageList.clear();
                return trans;
                // tslint:disable-next-line: unnecessary-else
            } else {
                console.error(" dataMap[Prefab2D]  为空  ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！");
                dataMap = null;
                insidMap = null;

                // htmlImageList.clear();
                return null;
            }
        }

    }
    private static referenceComps(insidMap, compMap) {
        for (let index = 0; index < compMap.length; index++) {
            const element = compMap[index];
            testCreat.referenceComp(element, insidMap);
        }

    }
    // tslint:disable-next-line: cyclomatic-complexity
    private static referenceComp(compInfo: any, insidMap) {
        let name = compInfo.cmop || compInfo.className;
        switch (name) {
            case "button":
                let compButton = compInfo["_comp"] as m4m.framework.button;
                if (insidMap[compInfo.targetImage]) {
                    let image = insidMap[compInfo.targetImage].getComponent("image2D") as m4m.framework.image2D;
                    compButton.targetImage = image;
                }
                break;
            case "progressbar":
                let compProgressbar = compInfo["_comp"] as m4m.framework.progressbar;
                if (insidMap[compInfo.barBg]) {
                    compProgressbar.barBg = insidMap[compInfo.barBg].getComponent("image2D") as m4m.framework.image2D;
                }
                if (insidMap[compInfo.barOverImg]) {
                    compProgressbar.barOverImg = insidMap[compInfo.barOverImg].getComponent("image2D") as m4m.framework.image2D;
                }
                break;
            case "ubiPopupIcon":
                let compUbiPopupIcon = compInfo["_comp"] as ubiPopupIcon;
                if (insidMap[compInfo.icon]) {

                    compUbiPopupIcon.icon = insidMap[compInfo.icon].getComponent("rawImage2D") as m4m.framework.rawImage2D;
                }
                if (insidMap[compInfo.lab]) {

                    compUbiPopupIcon.lab = insidMap[compInfo.lab].getComponent("label") as m4m.framework.label;
                }
                break;
            case "joyStick":
                let compJoyStick = compInfo["_comp"] as joyStick;
                if (insidMap[compInfo.bottomImg]) {

                    compJoyStick.bottomImg = insidMap[compInfo.bottomImg].getComponent("image2D") as m4m.framework.image2D;
                }
                if (insidMap[compInfo.overImg]) {

                    compJoyStick.overImg = insidMap[compInfo.overImg].getComponent("image2D") as m4m.framework.image2D;
                }
                break;
            case "imgNum":
                let compImgNum = compInfo["_comp"] as imgNum;
                if (insidMap[compInfo.template]) {

                    compImgNum.template = insidMap[compInfo.template].getComponent("image2D") as m4m.framework.image2D;
                }
                break;
            case "uiImageSlider":
                let compuiImageSlider = compInfo["_comp"] as uiImageSlider;
                if (insidMap[compInfo.scrollRect]) {

                    compuiImageSlider.scrollRect = insidMap[compInfo.scrollRect].getComponent("scrollRect") as m4m.framework.scrollRect;
                }
                break;
            case "uiFloat":
                let compUiFloat = compInfo["_comp"] as uiFloat;
                if (insidMap[compInfo.floatIcon]) {

                    compUiFloat.floatIcon = insidMap[compInfo.floatIcon].getComponent("rawImage2D") as m4m.framework.rawImage2D;
                }
                if (insidMap[compInfo.clickBtn]) {

                    compUiFloat.clickBtn = insidMap[compInfo.clickBtn].getComponent("button") as m4m.framework.button;
                }
                break;
            case "uiRoll":
                let compUiRoll = compInfo["_comp"] as uiRoll;
                if (insidMap[compInfo.bg1]) {

                    compUiRoll.bg1 = insidMap[compInfo.bg1].getComponent("rawImage2D") as m4m.framework.rawImage2D;
                }
                if (insidMap[compInfo.bg2]) {

                    compUiRoll.bg2 = insidMap[compInfo.bg2].getComponent("rawImage2D") as m4m.framework.rawImage2D;
                }

                compInfo["_comp"] = compUiRoll;
                return compUiRoll;
            default:
                if (name.indexOf("Handle") == -1) {
                    console.error("==========================未完成的2D组件解析：" + name);
                }
                let handleComp = compInfo["_comp"] as uiFloat;
                for (let index = 0; index < compInfo.referenceName.length; index++) {
                    let refName = compInfo.referenceName[index];
                    // if (refName == "imgnum") {
                    //     console.error(refName)
                    // }
                    let reType = compInfo.referenceType[index];
                    let reInsid = compInfo.referenceInsdi[index];
                    if (insidMap[reInsid]) {

                        if (reType == "transform2D") {

                            handleComp[refName] = insidMap[reInsid];
                        } else {
                            handleComp[refName] = insidMap[reInsid].getComponent(reType);
                        }
                    }
                }
        }
    }
    private static imgPathFix(path: string, imageName: string) {
        let fileName = imageName;
        if (testCreat.osString && testCreat.fileList.indexOf(imageName) == -1 && !fileName.startsWith("Lightmap")) {
            if (imageName.endsWith(".png")) {
                fileName = fileName.replace(".png", testCreat.osString);
            } else if (imageName.endsWith(".jpg")) {
                fileName = fileName.replace(".jpg", testCreat.osString);
            }
        }
        let url = "";
        if (!fileName.startsWith("Lightmap")) {
            url = path + "resources/" + testCreat.qualityString + fileName;
        } else {
            url = path + "resources/" + fileName;
        }

        return url;
    }
    // tslint:disable-next-line: cyclomatic-complexity
    private static setMat(matData: Mat, app: m4m.framework.application, path: string, dataMap) {
        let mat = new m4m.framework.material();
        let sh = m4m.framework.sceneMgr.app.getAssetMgr()
            .getShader(matData.shader);
        mat.setShader(sh);
        let mapUniform = matData.mapUniform.forEach ? matData.mapUniform["data"] : matData.mapUniform;
        for (let key in mapUniform) {
            let value = mapUniform[key];
            if (value.value == null) {
                continue;
            }
            switch (value.type) {
                case m4m.render.UniformTypeEnum.Float:
                    mat.setFloat(key.toString(), Number.parseFloat(value.value));
                    break;
                case m4m.render.UniformTypeEnum.Float4:
                    let values = value.value.match(m4m.framework.RegexpUtil.vector4Regexp);
                    try {

                        if (values != null) {
                            // tslint:disable-next-line: max-line-length
                            let _float4: m4m.math.vector4 = new m4m.math.vector4(parseFloat(values[1]), parseFloat(values[2]), parseFloat(values[3]), parseFloat(values[4]));
                            mat.setVector4(key.toString(), _float4);
                        }
                    } catch (e) {
                        //数据不合法就不提交了
                        console.error("Material Mapuniform float4 无效:value (" + value.value + ")！");
                    }
                    break;
                case m4m.render.UniformTypeEnum.Texture:
                case m4m.render.UniformTypeEnum.CubeTexture:
                    let _texture = new m4m.framework.texture(value.value);
                    let mainImgData: ImageSetting;
                    for (let j = 0; j < dataMap["ImageSetting"].length; j++) {
                        const element = dataMap["ImageSetting"][j];
                        if (element.fileName == value.value) {
                            mainImgData = element;
                            break;
                        }
                    }
                    if (!mainImgData) {
                        continue;
                    }
                    let _name: string = mainImgData.imageName;
                    let _filterMode: string = mainImgData.filterMode;
                    let _format: string = mainImgData.format;
                    let _mipmap: boolean = mainImgData.mipmap;
                    let _wrap: string = mainImgData.wrap;
                    let _premultiplyAlpha: boolean = mainImgData.premultiplyAlpha;

                    if (_premultiplyAlpha == undefined) {
                        _premultiplyAlpha = true;
                    }
                    let _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
                    if (_format == "RGB") {
                        _textureFormat = m4m.render.TextureFormatEnum.RGB;
                    } else if (_format == "Gray") {
                        _textureFormat = m4m.render.TextureFormatEnum.Gray;
                    }

                    let _linear: boolean = true;
                    if (_filterMode.indexOf("linear") < 0) {
                        _linear = false;
                    }

                    let _repeat: boolean = false;
                    if (_wrap.indexOf("Repeat") >= 0) {
                        _repeat = true;
                    }
                    _texture.realName = _name;

                    if (mainImgData) {
                        let url = testCreat.imgPathFix(path, mainImgData.imageName);
                        if (testCreat.pfbResList == null) { return; }
                        let pfbR = testCreat.pfbResList.get(path);
                        if (pfbR == null) { return; }
                        let img = pfbR.get(url);
                        let tType = testCreat.tNormal;
                        if (url.indexOf(".pvr.bin") >= 0) {
                            tType = testCreat.tPVR;
                        } else if (url.indexOf(".dds.bin") >= 0) {
                            tType = testCreat.tDDS;
                        } else if (url.indexOf(".ktx") >= 0) {
                            tType = testCreat.tKTX;
                        } else if (url.indexOf(".astc") >= 0) {
                            tType = testCreat.tASCT;
                        }
                        if (!img) {
                            return mat;
                        }
                        //构建贴图
                        // console.error("=================================   " + url);
                        // tslint:disable-next-line: switch-default
                        // if (!this.loadImgMap.get(url)) {
                        switch (tType) {
                            case testCreat.tNormal:
                                let t2d = new m4m.render.glTexture2D(app.getAssetMgr().webgl, _textureFormat);
                                t2d.uploadImage(img as HTMLImageElement, _mipmap, _linear, _premultiplyAlpha, _repeat);
                                _texture.glTexture = t2d;
                                break;
                            case testCreat.tPVR:
                                let pvr: testPvrParse = new testPvrParse(app.getAssetMgr().webgl);
                                _texture.glTexture = pvr.parse(img as ArrayBuffer);
                                break;
                            case testCreat.tKTX:
                                _texture.glTexture = KTXParse.parse(app.getAssetMgr().webgl, img as ArrayBuffer);
                                break;
                            case testCreat.tASCT:
                                _texture.glTexture = m4m.framework.ASTCParse.parse(app.getAssetMgr().webgl, img as ArrayBuffer);
                                break;
                            case testCreat.tDDS:
                                throw new Error("暂不支持DDS");
                            // assetMgr.webgl.pixelStorei(assetMgr.webgl.UNPACK_FLIP_Y_WEBGL, 1);
                            // let textureUtil = new WebGLTextureUtil(assetMgr.webgl, true);
                            // textureUtil.loadDDS(_textureSrc, null, (texture, error, stats) =>
                            // {
                            //     let t2d = new m4m.render.glTexture2D(assetMgr.webgl);
                            //     t2d.format = m4m.render.TextureFormatEnum.PVRTC2_RGB;
                            //     t2d.texture = texture;
                            //     _texture.glTexture = t2d;
                            // });
                            // break;
                            default:
                        }

                        // this.loadImgMap.set(url, _texture);
                        mat.setTexture(key.toString(), _texture);
                        // } else {
                        //     mat.setTexture(key.toString(), this.loadImgMap.get(url));
                        // }
                    }
                    break;
                default:
            }
        }
        return mat;
    }
    //组装Prefab
    private static makeAPrefab(pfInfo: Prefab, insidMap) {
        let trans = new m4m.framework.transform();
        trans.name = pfInfo.tranName;

        if (pfInfo.insid != null) {
            insidMap[pfInfo.insid] = trans;
        }
        m4m.math.vec3Clone(pfInfo.localTranslate, trans.localTranslate);
        m4m.math.vec3Clone(pfInfo.localScale, trans.localScale);
        m4m.math.quatClone(pfInfo.localRotate, trans.localRotate);
        //递归组装子对象
        if (pfInfo.children) {
            for (let i = 0; i < pfInfo.children.length; i++) {
                let childTranInfo = pfInfo.children[i];
                let childTran = testCreat.makeAPrefab(childTranInfo, insidMap);
                trans.addChild(childTran);
            }
        }
        return trans;
    }
    private static makeAPrefab2D(pfInfo, insidMap) {
        let trans = new m4m.framework.transform2D();
        trans.name = pfInfo.tranName;

        if (pfInfo.insid != null) {
            insidMap[pfInfo.insid] = trans;
        }
        trans.prefab = pfInfo.prefab;
        trans.layer = pfInfo.layer;
        trans.tag = pfInfo.tag;
        trans.isStatic = pfInfo.isStatic;
        trans.width = pfInfo.width;
        trans.height = pfInfo.height;
        m4m.math.vec2Clone(pfInfo.pivot, trans.pivot);
        trans.visible = pfInfo._visible;
        m4m.math.vec2Clone(pfInfo.localTranslate, trans.localTranslate);
        m4m.math.vec2Clone(pfInfo.localScale, trans.localScale);
        trans.localRotate = pfInfo.localRotate;
        trans.isMask = pfInfo.isMask;
        trans.layoutState = pfInfo.layoutState;
        trans.layoutPercentState = pfInfo.layoutPercentState;
        // trans["layoutValueMap"] = pfInfo.layoutValueMap;
        trans.setLayoutValue(1, pfInfo.layoutValueMap.n1);
        trans.setLayoutValue(2, pfInfo.layoutValueMap.n2);
        trans.setLayoutValue(4, pfInfo.layoutValueMap.n4);
        trans.setLayoutValue(8, pfInfo.layoutValueMap.n8);
        trans.setLayoutValue(16, pfInfo.layoutValueMap.n16);
        trans.setLayoutValue(32, pfInfo.layoutValueMap.n32);
        //递归组装子对象
        if (pfInfo.children) {
            for (let i = 0; i < pfInfo.children.length; i++) {
                let childTranInfo = pfInfo.children[i];
                let childTran = testCreat.makeAPrefab2D(childTranInfo, insidMap);
                trans.addChild(childTran);
            }
        }
        return trans;
    }
    //添加组件到Prefab
    private static setCompsToTran(trans: m4m.framework.transform, pfInfo: Prefab, insidMap, path: string) {
        trans.gameObject.tag = pfInfo.gameObject.tag;
        trans.gameObject.layer = pfInfo.gameObject.layer;

        // trans["_aabb"] = new m4m.framework.aabb(new m4m.math.vector3(-1, -1, -1), new m4m.math.vector3(1, 1, 1));
        for (let i = 0; i < pfInfo.gameObject.components.length; i++) {
            let compInfo = pfInfo.gameObject.components[i];
            let rawComp = testCreat.makeAComp(trans, compInfo, insidMap, path);
            if (rawComp) {

                trans.gameObject.addComponentDirect(rawComp);
            } else {
                console.error(compInfo.cmop + "       " + trans.name);
            }
        }

        //递归组装子对象
        for (let i = 0; i < trans.children.length; i++) {
            let childTran = trans.children[i];
            let childTranInfo = pfInfo.children[i];
            testCreat.setCompsToTran(childTran, childTranInfo, insidMap, path);
        }
    }
    private static setCompsToTran2D(trans: m4m.framework.transform2D, pfInfo, insidMap, compMap, path: string) {

        for (let i = 0; i < pfInfo.components.length; i++) {
            let compInfo = pfInfo.components[i];
            let rawComp = testCreat.makeAComp2D(trans, compInfo, insidMap, compMap, path);
            if (rawComp) {
                trans.addComponentDirect(rawComp);
            }
        }

        //递归组装子对象
        for (let i = 0; i < trans.children.length; i++) {
            let childTran = trans.children[i];
            let childTranInfo = pfInfo.children[i];
            testCreat.setCompsToTran2D(childTran, childTranInfo, insidMap, compMap, path);
        }
    }
    //组装动画片段
    private static makeAClip(element: Aniclip, pfbName: string = null, animName: string = null) {
        let animc: m4m.framework.animationClip;
        if (!element) {
            return null;
        }
        if (!animName) {
            if (!pfbName) {
                animc = new m4m.framework.animationClip(element.aniclipName + ".aniclip.bin");
            } else {
                animc = new m4m.framework.animationClip(pfbName + "_" + element.aniclipName + ".aniclip.bin");
            }
        } else {

            if (!pfbName) {
                animc = new m4m.framework.animationClip(animName);
            } else {
                animc = new m4m.framework.animationClip(pfbName + "_" + animName);
            }
        }
        // if (!animName) {
        //     animc = new m4m.framework.animationClip(pfbName + "_" + element.name + ".aniclip.bin");
        // } else {
        //     animc = new m4m.framework.animationClip(pfbName + "_" + animName);
        // }
        animc.fps = element.fps;
        animc.hasScaled = element.hasScaled;
        animc.loop = element.loop;
        animc.boneCount = element.boneCount;
        animc.bones = [];
        for (let j = 0; j < element.bones.length; j++) {
            const bone = element.bones[j];
            animc.bones.push(bone);
        }
        element.indexDic.forEach((value, key) => {
            animc.indexDic[key] = value;
        });
        animc.subclipCount = element.subclipCount;
        animc.fps = element.fps;
        animc.fps = element.fps;
        for (let j = 0; j < element.subclips.length; j++) {
            const clipC = element.subclips[j];
            if (clipC) {
                let addClip = new subClip();
                addClip.endframe = clipC.endframe;
                addClip.loop = clipC.loop;
                addClip.name = clipC.name;
                addClip.startframe = clipC.startframe;
                animc.subclips.push(addClip);
            }
        }
        animc.frameCount = element.frameCount;
        element.frames.forEach((value, key) => {
            animc.frames[key] = value;
        });
        return animc;
    }
    // tslint:disable-next-line: cyclomatic-complexity
    private static makeAComp2D(trans: m4m.framework.transform2D, compInfo: any, insidMap, compMap, path: string) {
        let name = compInfo.cmop as string || compInfo.className as string;
        switch (name) {
            case "button":
                let compButton = new m4m.framework.button();
                compButton.transition = compInfo.transition;
                compButton["_origianlSpriteName"] = compInfo._origianlSpriteName;
                compButton["_pressedSpriteName"] = compInfo._pressedSpriteName;
                m4m.math.colorClone(compInfo.normalColor, compButton.normalColor);
                m4m.math.colorClone(compInfo.pressedColor, compButton.pressedColor);
                compButton.fadeDuration = compInfo.fadeDuration;
                compInfo["_comp"] = compButton;
                compMap.push(compInfo);
                return compButton;
            case "image2D":
                let compImage2D = new m4m.framework.image2D();
                m4m.math.colorClone(compInfo.color, compImage2D.color);
                compImage2D.imageType = compInfo.imageType;
                compImage2D.fillMethod = compInfo.fillMethod;
                compImage2D.fillAmmount = compInfo.fillAmmount;
                compImage2D["_spriteName"] = compInfo._spriteName;
                compImage2D["_imageBorder"].l = compInfo._imageBorder.l;
                compImage2D["_imageBorder"].t = compInfo._imageBorder.t;
                compImage2D["_imageBorder"].r = compInfo._imageBorder.r;
                compImage2D["_imageBorder"].b = compInfo._imageBorder.b;
                return compImage2D;
            case "label":
                let compLabel = new m4m.framework.label();
                compLabel.text = compInfo.text;
                compLabel.font = new m4m.framework.font(compInfo._fontName);
                compLabel.fontsize = compInfo.fontsize;
                compLabel.linespace = compInfo.linespace;
                compLabel.horizontalType = compInfo.horizontalType;
                compLabel.verticalType = compInfo.verticalType;
                compLabel.horizontalOverflow = compInfo.horizontalOverflow;
                compLabel.verticalOverflow = compInfo.verticalOverflow;
                m4m.math.colorClone(compInfo.color, compLabel.color);

                m4m.math.colorClone(compInfo.color2, compLabel.color2);

                return compLabel;
            case "scrollRect":
                let compScrollRect = new m4m.framework.scrollRect();
                compScrollRect.content = insidMap[compInfo.content];
                compScrollRect.horizontal = compInfo.horizontal;
                compScrollRect.vertical = compInfo.vertical;
                compScrollRect.inertia = compInfo.inertia;
                compScrollRect.decelerationRate = compInfo.decelerationRate;
                return compScrollRect;
            case "rawImage2D":
                let compRawImage2D = new m4m.framework.rawImage2D();
                // compRawImage2D.image=
                m4m.math.colorClone(compInfo.color, compRawImage2D.color);
                return compRawImage2D;
            case "uiScaleDown":
                return new uiScaleDown();
            case "uiScaleAnimation":
                return new uiScaleAnimation();
            case "multiToucher":
                return new multiToucher();
            case "uiSpring":
                return new uiSpring();
            case "sequenceFrame":
                return new sequenceFrame();
            case "uiBtnDown":
                return new uiBtnDown();
            case "progressbar":
                let compProgressbar = new m4m.framework.progressbar();
                compProgressbar.value = compInfo.value;
                compProgressbar.cutPanel = insidMap[compInfo.cutPanel];
                compInfo["_comp"] = compProgressbar;
                compMap.push(compInfo);
                return compProgressbar;
            case "ubiPopupIcon":
                let compUbiPopupIcon = new ubiPopupIcon();
                compInfo["_comp"] = compUbiPopupIcon;
                compMap.push(compInfo);
                return compUbiPopupIcon;
            case "joyStick":
                let compJoyStick = new joyStick();
                compJoyStick.moveRange = compInfo.moveRange;
                compInfo["_comp"] = compJoyStick;
                compMap.push(compInfo);
                return compJoyStick;
            case "uiRoll":
                let compUiRoll = new uiRoll();
                compUiRoll.bgPan1 = insidMap[compInfo.bgPan1];
                compUiRoll.bgPan2 = insidMap[compInfo.bgPan2];

                compInfo["_comp"] = compUiRoll;
                compMap.push(compInfo);
                return compUiRoll;
            case "imgNum":
                let compImgNum = new imgNum();
                compImgNum.gap = compInfo.gap;
                compInfo["_comp"] = compImgNum;
                compMap.push(compInfo);
                return compImgNum;
            case "slideArea":
                let compSlideArea = new m4m.framework.slideArea();
                compSlideArea.horizontal = compInfo.horizontal;
                compSlideArea.vertical = compInfo.vertical;
                return compSlideArea;
            case "uiImageSlider":
                let compuiImageSlider = new uiImageSlider();
                compuiImageSlider.content = insidMap[compInfo.content];
                compuiImageSlider.imageTrans = insidMap[compInfo.imageTrans];
                compuiImageSlider.imageBgTrans = insidMap[compInfo.imageBgTrans];
                compInfo["_comp"] = compuiImageSlider;
                compMap.push(compInfo);
                return compuiImageSlider;
            case "uiFloat":
                let compUiFloat = new uiFloat();
                compInfo["_comp"] = compUiFloat;
                compMap.push(compInfo);
                return compUiFloat;
            default:
                if (name.indexOf("Handle") == -1) {
                    console.error("==========================未完成的2D组件解析：" + name);
                }
                let handleComp = trans.addComponent(name);
                compInfo["_comp"] = handleComp;
                compMap.push(compInfo);
                return null;
        }
    }
    //组装组件
    // tslint:disable-next-line: cyclomatic-complexity
    private static makeAComp(trans: m4m.framework.transform, compInfo: any, insidMap, path: string) {
        let name = compInfo.cmop || compInfo.className;
        let pfbres = testCreat.pfbResList.get(path);
        switch (name) {
            case "asbone":
                let compAsBone = new m4m.framework.asbone();
                return compAsBone;
            case "boxcollider":
                let compBox = new m4m.framework.boxcollider();
                let compInfoBox = compInfo as boxcollider;
                m4m.math.vec3Clone(compInfoBox.size, compBox.size);
                m4m.math.vec3Clone(compInfoBox.center, compBox.center);
                return compBox;
            case "aniplayer":
                let compAnip = new m4m.framework.aniplayer();
                let compInfoAnip = compInfo as aniplayer;
                compAnip.clips = [];
                if (compInfoAnip.clips) {
                    for (let i = 0; i < compInfoAnip.clips.length; i++) {
                        const element = compInfoAnip.clips[i];
                        if (!element.fileName) {
                            continue;
                        }
                        let animc = testCreat.makeAClip(element);
                        if (animc) {
                            compAnip.clips.push(animc);
                            compAnip.addClip(animc);
                        }
                    }
                }
                if (compAnip.clips.length == 0) {
                    if (compInfoAnip.animNames) {
                        for (let i = 0; i < compInfoAnip.animNames.length; i++) {
                            const element = compInfoAnip.animNames[i];
                            // const element = pfbName + "_" + compInfoAnip.animNames[i];
                            let animClip = new m4m.framework.animationClip(element);
                            compAnip.clips.push(animClip);
                            // compAnip.addClip(animClip);
                        }
                    }
                }

                compAnip.bones = [];
                if (compInfoAnip.bones) {
                    for (let i = 0; i < compInfoAnip.bones.length; i++) {
                        let tPos = compInfoAnip.bones[i];
                        let addTpos = new m4m.framework.tPoseInfo();
                        if (tPos) {
                            addTpos.name = tPos.tranName;
                            addTpos.tposep = new m4m.math.vector3();
                            addTpos.tposeq = new m4m.math.quaternion();
                            m4m.math.vec3Clone(tPos.tposep, addTpos.tposep);
                            m4m.math.quatClone(tPos.tposeq, addTpos.tposeq);
                            compAnip.bones.push(addTpos);
                        }
                    }
                }
                compAnip.startPos = [];
                if (compInfoAnip.startPos) {

                    for (let i = 0; i < compInfoAnip.startPos.length; i++) {
                        let spos = compInfoAnip.startPos[i];
                        let addSpos = new m4m.framework.PoseBoneMatrix();
                        addSpos.t = new m4m.math.vector3();
                        addSpos.r = new m4m.math.quaternion();
                        m4m.math.vec3Clone(spos.t, addSpos.t);
                        m4m.math.quatClone(spos.r, addSpos.r);
                        compAnip.startPos.push(addSpos);
                    }
                }
                testCreat.aniplayer = compAnip;
                return compAnip;
            case "skinnedMeshRenderer":
                let compSkin = new m4m.framework.skinnedMeshRenderer();
                let compInfoSkin = compInfo as skinnedMeshRenderer;
                compSkin.materials = [];
                if (compInfoSkin.materials) {

                    for (let j = 0; j < compInfoSkin.materials.length; j++) {
                        let mats = compInfoSkin.materials[j];
                        compSkin.materials.push(pfbres.get(mats));
                    }
                }
                compSkin.center = new m4m.math.vector3();
                compSkin.size = new m4m.math.vector3();
                m4m.math.vec3Clone(compInfoSkin.center, compSkin.center);
                m4m.math.vec3Clone(compInfoSkin.size, compSkin.size);
                // compSkin.mesh = await testCreat.getMeshFromMap(meshMap, compInfoSkin.mesh, path);
                compSkin.mesh = pfbres.get(compInfoSkin.mesh);

                // if (compSkin.mesh) {
                //     let max = compSkin.mesh["_max"] as m4m.math.vector3;
                //     let min = compSkin.mesh["_min"] as m4m.math.vector3;
                //     trans["_aabb"] = new m4m.framework.aabb(min, max);
                //     m4m.framework.transform["aabbStoreMap"][compSkin.mesh.getGUID()] = [min, max];
                // }

                compSkin.bones = [];
                if (compInfoSkin.bones) {
                    for (let j = 0; j < compInfoSkin.bones.length; j++) {
                        let insid = compInfoSkin.bones[j];
                        compSkin.bones.push(insidMap[insid]);
                    }
                }
                compSkin.rootBone = insidMap[compInfoSkin.rootBone];
                compSkin.player = testCreat.aniplayer;
                return compSkin;
            case "meshFilter":
                let compMF = new m4m.framework.meshFilter();
                let compInfoMF = compInfo as meshFilter;
                // compMF.mesh = await testCreat.getMeshFromMap(meshMap, compInfoMF.mesh, path);

                compMF.mesh = pfbres.get(compInfoMF.mesh);

                // if (compMF.mesh) {
                //     let max = compMF.mesh["_max"] as m4m.math.vector3;
                //     let min = compMF.mesh["_min"] as m4m.math.vector3;
                //     trans["_aabb"] = new m4m.framework.aabb(min, max);
                //     m4m.framework.transform["aabbStoreMap"][compMF.mesh.getGUID()] = [min, max];
                // }

                return compMF;
            case "meshRenderer":
                let compMR = new m4m.framework.meshRenderer();
                let compInfoMR = compInfo as meshRenderer;
                compMR.materials = [];
                if (compInfoMR.materials) {
                    for (let j = 0; j < compInfoMR.materials.length; j++) {
                        let mats = compInfoMR.materials[j];
                        compMR.materials.push(pfbres.get(mats));
                        // compSkin.materials.push(testCreat.matMap.get(mats));
                    }
                }
                compMR.lightmapIndex = compInfoMR.lightmapIndex;
                compMR.layer = compInfoMR.layer;
                compMR.lightmapScaleOffset = new m4m.math.quaternion();
                if (compInfoMR.lightmapScaleOffset) {
                    m4m.math.quatClone(compInfoMR.lightmapScaleOffset, compMR.lightmapScaleOffset);
                }
                return compMR;
            case "spherecollider":
                let compSpherecollider = new m4m.framework.spherecollider();
                return compSpherecollider;
            // case "godray":
            //     let compGodray = new godray();
            //     return compGodray;
            case "meshcollider":
                let compMeshcollider = new m4m.framework.meshcollider();
                return compMeshcollider;
            // case "water":
            //     let compWater = new water();
            //     let compInfoWater = compInfo as waterComp;
            //     compInfoWater.copyFrom = compInfoWater.copyFrom;
            //     compInfoWater.defNumVertsPerRow = compInfoWater.defNumVertsPerRow;
            //     return compWater;
            // case "particlesystem":
            // // let particleData = pfbres.get(compInfo.particleSystemData) as m4m.framework.ParticleSystemData;
            // // let particleComp = new m4m.framework.ParticleSystem();
            // // let particleCompData = new m4m.framework.ParticleSystemData(compInfo.particleSystemData);
            // // particleCompData.objectData = particleData;
            // // particleCompData.value = compInfo.particleSystemData;
            // // particleComp.particleSystemData = particleCompData;
            // // particleComp.material = pfbres.get(compInfo.material);
            // // particleComp.sortingFudge = compInfo.sortingFudge;
            // // return particleComp;
            // case "f14effCmop":
            //     // let f14effCmopData = pfbres.get(compInfo.f14eff);
            //     // let f14effCmop = new ISpParticleSystem(f14effCmopData.f14dffName);
            //     // // f14effCmop.f14eff=JSON.parse(f14effCmopData.jsonData);
            //     // let f14 = new m4m.framework.f14eff(f14effCmopData.f14dffName);
            //     // f14.Parse(f14effCmopData.jsonData, m4m.framework.sceneMgr.app.getAssetMgr());
            //     // f14effCmop.f14eff = f14;
            //     // for (let i = 0; i < f14.data.layers.length; i++) {
            //     //     let elementdata = f14.data.layers[i].elementdata;

            //     // }

            //     // return f14effCmop;
            //     break;
            default:
                console.error("==========================未完成的组件解析：" + name);
        }
    }
    // private static async getMeshFromMap(meshMap, meshName: string, path: string) {
    //     if (!meshName || !path) return null;
    //     let getMesh = meshMap[meshName];
    //     if (!getMesh) {
    //         let meshInfo = await testReadTool.loadAssetBoundleFiles(path + "resources/" + meshName + ".js", true) as any;
    //         // if (meshInfo&&meshInfo.lenght > 0) {

    //         var smesh = testCreat.createMesh(meshInfo[0] as Mesh, m4m.framework.assetMgr.Instance.webgl);
    //         meshMap[meshName] = smesh;
    //         return smesh;
    //         // }
    //     }
    //     return getMesh;
    // }
    //组装Mesh
    private static createMesh(meshData: Mesh, webgl: WebGL2RenderingContext): m4m.framework.mesh {
        let _mesh: m4m.framework.mesh = new m4m.framework.mesh(meshData.meshName + ".mesh.bin");
        _mesh.maximun = m4m.poolv3(meshData.maximum);
        _mesh.minimun = m4m.poolv3(meshData.minimum);
        _mesh.defaultAsset = true;
        _mesh.data = new m4m.render.meshData();
        // _mesh.data.pos = meshData.position;
        // _mesh.data.color = meshData.color;
        // _mesh.data.normal = meshData.normal;
        // _mesh.data.uv = meshData.UV0;
        // _mesh.data.uv2 = meshData.UV1;
        // _mesh.data.tangent = meshData.tangent;
        // _mesh.data.blendIndex = meshData.blendIndex;
        // _mesh.data.blendWeight = meshData.blendWeight;
        _mesh.data.trisindex = meshData.trisindex;
        _mesh.submesh = [];
        if (meshData.subMesh) {
            for (let i = 0; i < meshData.subMesh.length; i++) {
                const element = meshData.subMesh[i];
                let subMesh = new m4m.framework.subMeshInfo();
                subMesh.line = element.line;
                subMesh.matIndex = element.matIndex;
                subMesh.size = element.size;
                subMesh.start = element.start;
                subMesh.useVertexIndex = element.useVertexIndex;
                _mesh.submesh.push(subMesh);
            }
        }
        let vf = meshData.originVF;
        _mesh.data.originVF = vf;
        let v32 = meshData.tmpVArr;
        // _mesh.data.tmpVArr = meshData.tmpVArr;
        _mesh.data.vertexBufferData = meshData.tmpVArr
        // var v32 = _mesh.data.genVertexDataArray(vf);

        let i16 = _mesh.data.genIndexDataArray();
        // var i16 = _mesh.data.genIndexDataArray();
        _mesh.glMesh = new m4m.render.glMesh();
        _mesh.glMesh.initBuffer(webgl, vf, meshData.posCount);

        // _mesh.maximun=new m4m.math.vector3();
        // _mesh.minimun=new m4m.math.vector3();
        // _mesh.glMesh.initBuffer(webgl, vf, _mesh.data.pos.length);
        // _mesh.glMesh = new m4m.render.glMesh();
        // _mesh.glMesh.initBuffer(webgl, vf, _mesh.data.pos.length);
        _mesh.glMesh.uploadVertexData(webgl, v32);
        _mesh.glMesh.addIndex(webgl, i16.length);
        _mesh.glMesh.uploadIndexData(webgl, 0, i16);
        return _mesh;
    }
    public static async creatAimClip(url: string, animName: string = null) {
        let pfbName = animName;
        let clipFileInfo = await testReadTool.loadAssetBoundleFiles(url, true) as any;
        let clip = testCreat.makeAClip(clipFileInfo[0], pfbName);
        return clip;
    }
    public static pfbList: cMap<m4m.framework.prefab> = new cMap<m4m.framework.prefab>();
    public static qualityString = "";
    public static osString = "";
    public static loadMap = new cMap<any>();
    private static _CDNURL: string;
    private static isSetGetMesh = false;
    private static readonly allEnd = ".bin.js";
    private static readonly noClipEnd = "_split.bin.js";
    private static readonly noMeshEnd = "_Json.json";
    private static readonly meshEnd = "_Mesh.bin.js";
    private static readonly tNormal = "t_Normal";
    private static readonly tPVR = "t_PVR";
    private static readonly tDDS = "t_DDS";
    private static readonly tKTX = "t_KTX";
    private static readonly tASCT = "t_ASTC";
    private static pfbResList: cMap<cMap<any>> = new cMap<cMap<any>>();
    private static meshMap: cMap<any> = new cMap<any>();
    private static _systemOS = 0;
    private static fileList: string[] = ["laser-bolt.png"];
    private static aniplayer: m4m.framework.aniplayer;
    // 资源路径 替换map
    private static _pathReplaceMap: { [srcPath: string]: string } = {};
}

//暴露出 类，微信前端使用
if (m4m) {
    if (!m4m["test"]) {
        m4m["test"] = {};
    }
    m4m["test"].testCreat = testCreat;
}