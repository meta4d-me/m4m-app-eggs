import { IPageBase, uiPage, loadTool } from "../base/uiPage";
import { inviteFriendsPageHandle } from "../inviteFriendsPageHandle";
import { inviteMgr } from "../../inviteMgr";
import { GameMgr } from "../../GameMgr";
import { skinMgr } from "../../skinMgr";
import { videoPrizePage } from "./videoPrizePage";
import { homePage } from "./homePage";
import { skinBoxHandle } from "../skinBoxHandle"
import { unlockPage } from "./unlockPage"
import { commTool } from "../../Tool/commTool";
import { joinTool } from "../../Tool/joinTool";
import { wxTool } from "../../Tool/wxTool";
import { AudioMgr } from "audio/AudioMgr";
//邀请
export class inviteFriendsPage implements IPageBase {

    private static _instance: inviteFriendsPage;
    static prefabName: string = `invite_page`; //依赖的 预设体 资源
    static atlasList: string[] = ["invite"]; //依赖的 图集资源
    static async Instance() {
        // let tt = await commTool.getTexture(`env/negx.jpg`);
        if (!this._instance) {
            await loadTool.loadPrefeb(this.prefabName);
            if (this._instance) return this._instance;  //别的流中可能已经加载完成

            this._instance = new inviteFriendsPage();
            this._instance.init();

            loadTool.loadAtlas(this.atlasList);
        }
        return this._instance;
    }
    private static Pageurl = `${GameMgr.atlasPath}${inviteFriendsPage.atlasList[0]}/resources/${inviteFriendsPage.atlasList[0]}.atlas.json`;
    handle: inviteFriendsPageHandle;
    static homeI: homePage;

    private inited = false;
    private init() {
        if (this.inited) return;
        let pfb = loadTool.PagePrefeb_map.get(inviteFriendsPage.prefabName);
        let tempRoot = pfb.getCloneTrans2D();
        this.handle = tempRoot.getComponent("inviteFriendsPageHandle") as inviteFriendsPageHandle;
        //事件
        this.handle.close.addListener(m4m.event.UIEventEnum.PointerClick, this.onCloseClick, this);
        this.handle.bt.addListener(m4m.event.UIEventEnum.PointerDown, () => {
            this.handle.invite.addListener(m4m.event.UIEventEnum.PointerClick, this.onInviteClick, this);
        }, this);

        //
        this.initData();
        this.inited = true;

        //  this.handle.info

        homePage.Instance().then(ins => {
            inviteFriendsPage.homeI = ins;
        })

        //  prize
        /* let l = inviteMgr.prize[GameMgr.shareActivity];
         let src = "";
         switch (l.type) {
             case 1:
                 src = GameMgr.skinIconPath + skinMgr.getSkinInfo(l.id).headPortrait;
                 break;
             case 2:
                 src = GameMgr.themeIconPath + themeMgr.themes[l.id].icon;
                 break;
         }*/
        let l = true;
        skinMgr.shareSkins.forEach(obj => {
            if (GameMgr.unlockSkins[obj.id] != true && l != false) {
                this.loadRwaImg2D(this.handle.prize, `${GameMgr.skinIconPath}${obj.headPortrait}`);
                l = false;

            }
        });
        if (l) {
            this.loadRwaImg2D(this.handle.prize, "res/art/skin/share/share_pic_coin3.png");
        }
    }

    /**
     * 设置已经邀请的第X个好友的信息
     * @param index 第X个好友
     * @param head  第X个好友好友的头像
     */
    setInvite(index: number, head: string = "https://s.gravatar.com/avatar/e67aef28a1b943b6a8955219d46763c0?s=45") {
        let headRwaImg = this.handle.head.children[index].getComponent("rawImage2D") as m4m.framework.rawImage2D;
        this.handle.line.children[index].visible = true;
        let num = (inviteFriendsPage.maxInvite - (index + 1)) + "";
        this.handle.num.text = num;
        inviteFriendsPage.homeI.setCanInviteNum(num);
        //    homePage.Instance.
        this.loadRwaImg2D(headRwaImg, head);

        if (inviteFriendsPage.maxInvite == index + 1) {

            let img = this.handle.invite.transform.getComponent("image2D") as m4m.framework.image2D;
            img.sprite = GameMgr.assetMgr.getAssetByName("invite.atlas.json_share_btn_yaoqing0") as m4m.framework.sprite;
            img.transform.markDirty();
        }
    }

    /**
     * 初始化基本信息
     */
    private initData() {
        let c = this.handle.info.children;
        for (let i = 0; i < c.length; i++) {
            let text = c[i].getComponent("label") as m4m.framework.label;
            text.text = inviteMgr.gold[i] + "";
        }
    }
    /**
     * 加载外部图片
     *  @param rwaImg 需要加载外部图片的组件
     *  @param  src 外部图片地址
     */
    loadRwaImg2D(rwaImg: m4m.framework.rawImage2D, src: string) {

        if (commTool.loadedTexsDic.ContainsKey(src)) {
            rwaImg.image = commTool.loadedTexsDic.GetValue(src);
        } else {
            commTool.ImgByLoad(src, (_tex) => {
                if (_tex) {
                    commTool.loadedTexsDic.Add(src, _tex);
                    rwaImg.image = _tex;
                }
            });
        }

    }
    //没有皮肤后开始留取金币 金币的数量
    static gold: number = 100;

    /**
     * 关闭界面
     */
    onCloseClick() {
        //播放按钮声音
        AudioMgr.Play("touch.mp3");

        this.hide();
    }
    //每天最多邀请
    static maxInvite: number = 5;
    //当天已经邀请
    static inviteNum: number = 0;
    static array = [];
    onInviteClick() {

        if (inviteFriendsPage.inviteNum == inviteFriendsPage.maxInvite)
            return;
        //播放按钮声音
        AudioMgr.Play("touch.mp3");
        joinTool.invitation(wxTool.token);
    }
    static isContinueRefresh: boolean = true;
    static i: number = 0;
    /**
     * 领取奖励
     */
    static sharels() {

        if (!inviteFriendsPage.isContinueRefresh) return;
        if (!wxTool.wx || !wxTool.token || wxTool.token == "undefined") return;
        console.log("在请求 好友邀请数据!!!");
        
        wxTool._loadFun(GameMgr.DNS_AND_PORT + "/sharels?token=" + wxTool.token, (res) => {
            inviteFriendsPage.array = res.data.body;
            console.log(inviteFriendsPage.array.length + "长度");
            if (inviteFriendsPage.array.length > 0) {
                inviteFriendsPage.isContinueRefresh = false;
                inviteFriendsPage.Instance().then((ins)=>{
                    ins.ss();
                });
            }

        }, function () {
            //return;
        });

    }
    //显示头像及领取
    private ss() {
        /* if (inviteFriendsPage.array.length == inviteFriendsPage.inviteNum && inviteFriendsPage.inviteNum != inviteFriendsPage.maxInvite) {
             inviteFriendsPage.isContinueRefresh = true;
         }*/
        //是否有邀请成功的人

        let self = this;

        if (inviteFriendsPage.array.length > inviteFriendsPage.inviteNum && inviteFriendsPage.inviteNum < inviteFriendsPage.maxInvite && inviteFriendsPage.homeI.handle.transform.visible == true) {
            let item = inviteFriendsPage.array[inviteFriendsPage.inviteNum];
            this.setInvite(inviteFriendsPage.inviteNum, item.avataUrl);



            // if (inviteFriendsPage.cacheInviteFriendsPage) {
            // }
            // else {
            //     inviteFriendsPage.Instance().then(ins => {
            //         ins.setInvite(inviteFriendsPage.inviteNum, item.avataUrl);
            //         inviteFriendsPage.cacheInviteFriendsPage = ins;
            //     });
            // }

            //是否未领取金币
            if (!item.isAcquire) {
                //  console.log("开始领取金币!!!");
                if (wxTool.token == "" || wxTool.token == undefined || wxTool.token == "undefined") return;
                console.log(GameMgr.DNS_AND_PORT + `/prize?token=${wxTool.token}&time=${item.time}&hello=${item.token}`)
                //领取金币
                if (wxTool.token != undefined && wxTool.token != "")
                    wxTool._loadFun(GameMgr.DNS_AND_PORT + `/prize?token=${wxTool.token}&time=${item.time}&hello=${item.token}`, (res) => {

                        let gold = inviteMgr.gold[inviteFriendsPage.inviteNum];
                        //是否是新用户
                        if (item.isNewPlayer) {
                            //新用户金币*2
                            gold = gold + gold;
                        }

                        if (gold == undefined || gold <= -1 || inviteFriendsPage.inviteNum == inviteFriendsPage.array.length) {
                            inviteFriendsPage.isContinueRefresh = true;
                        } else {
                            //领取金币
                            //  GameMgr.diamond += gold;
                            //领取终级奖励
                            if (inviteFriendsPage.inviteNum == inviteFriendsPage.maxInvite - 1) {

                                let l = true;
                                skinMgr.shareSkins.forEach(obj => {
                                    if (GameMgr.unlockSkins[obj.id] != true && l != false) {
                                        l = false;
                                        GameMgr.unlockSkins[obj.id] = true;
                                        //领取皮肤
                                        unlockPage.Instance().then(ins => {
                                            console.log("领取皮肤");
                                            ins.show();
                                            if (skinBoxHandle.shareSkinBoxs.ContainsKey(obj.id)) {
                                                ins.setShareSkinfo(obj, skinBoxHandle.shareSkinBoxs.GetValue(obj.id));
                                            } else {
                                                ins.setShareSkinfo(obj, null);
                                            }
                                        });


                                    }
                                });
                                //已经留取完了   领取金币
                                if (l == true) {
                                    //
                                    gold = gold + inviteFriendsPage.gold;
                                    console.log("领取金币");
                                }
                                GameMgr.shareActivity++;


                                let img = this.handle.invite.transform.getComponent("image2D") as m4m.framework.image2D;
                                img.sprite = GameMgr.assetMgr.getAssetByName("invite.atlas.json_share_btn_yaoqing0") as m4m.framework.sprite;
                                img.transform.markDirty();

                                // if (inviteFriendsPage.cacheInviteFriendsPage) {
                                // }
                                // else {
                                //     inviteFriendsPage.Instance().then(ins => {
                                //         let img = ins.handle.invite.transform.getComponent("image2D") as m4m.framework.image2D;
                                //         img.sprite = GameMgr.assetMgr.getAssetByName("invite.atlas.json_share_btn_yaoqing0") as m4m.framework.sprite;
                                //         img.transform.markDirty();
                                //         inviteFriendsPage.cacheInviteFriendsPage = ins;
                                //     });
                                // }

                            }

                            //saveTool.save(null, null);

                            // GameMgr.diamond += gold;

                            videoPrizePage.Instance().then(ins => {
                                ins.show();
                                ins.setInfo(gold, () => {
                                    if (inviteFriendsPage.inviteNum == inviteFriendsPage.maxInvite) {
                                        inviteFriendsPage.isContinueRefresh = false;
                                        // console.log("最后一个了停止获取");
                                        //  return;
                                    } else
                                        if (inviteFriendsPage.array.length == inviteFriendsPage.inviteNum) {
                                            // console.log("继续向服务器获取");
                                            inviteFriendsPage.isContinueRefresh = true;
                                        } else {
                                            // console.log("还没完接着判断!");
                                            self.ss();
                                        }
                                });
                            });
                            inviteFriendsPage.inviteNum++;
                            inviteFriendsPage.i++;
                        }
                        //失败
                    }, () => {
                        // console.log("失败了!!!");
                        inviteFriendsPage.isContinueRefresh = true;
                    });

            } else {

                // console.log("领取过的!!!");
                inviteFriendsPage.inviteNum++;
                inviteFriendsPage.i++;
                // console.log(inviteFriendsPage.i + "-已领取的--" + inviteFriendsPage.inviteNum + "----" + inviteFriendsPage.array.length);
                if (inviteFriendsPage.array.length == inviteFriendsPage.inviteNum) {
                    // console.log("领取过的领取完了!!!");
                    //  console.log("进来了!!!!!");
                    inviteFriendsPage.isContinueRefresh = true;

                } else {
                    // console.log("领取过的---还没完接着判断!");
                    self.ss();
                }

            }

        } else if (inviteFriendsPage.array.length != inviteFriendsPage.maxInvite) {
            inviteFriendsPage.isContinueRefresh = true;
            // console.log("接着获取!");
        }



    }
    show() {
        this.handle.show();

    }

    hide() {
        this.handle.hide();
    }


}