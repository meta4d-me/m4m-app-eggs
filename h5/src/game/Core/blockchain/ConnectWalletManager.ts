import { cMap } from "Data/Map";
import { UiManager } from "PSDUI/UiManager";
import { GameArchiveManagerRequest } from "../../AutoCode/Net/ClientRequest/GameArchiveManagerRequest";
import { WsDataManager } from "../../AutoCode/Net/WsDataManager";
import { GameArchiveManager } from "../../Manager/GameArchiveManager";

export const M4M_NFT_ID = "m4m-nft";
export const M4M_COMPONENT_ID = "m4m-components";
export const ZipContract = "0x757464676A09b46fE522B8d2A1413371E317e089";
export const M4mNFTRegistry = "0xc9d7d33f679000d7621ea381569259eb599ab1c4";
export const VersionManager = "0xd8b1FB6c7f7A2d3Ed5CECF87cBa516c245f3BbAf";
export const m4mDAO = "0x38cd1db1b3eafee726f790470bd675d2d7850a86";
export const m4mNFT = "0xfa860d48571fa0d19324cbde77e0fbdfdffb0a47";
export const m4mComponent = "0xb6bb4812a8e075cbad0128e318203553c4ca463d";

export class ConnectWalletManager {
    public static get Instance(): ConnectWalletManager {
        if (this._instance == null) {
            this._instance = new ConnectWalletManager();
        }
        return this._instance;
    }
    public address: any;
    private static _instance: ConnectWalletManager;
    private M4M_SDK: any;
    // private web3_Extend: web3Extend;
    // private web3_wallet: web3Wallet;
    private axios: any;
    private wallet: any;
    private M4MComponentsCmap: cMap<cMap<CollectionNFT>> = new cMap();
    constructor() {
        this.M4M_SDK = window["M4M"];
        this.axios = window["axios"];
        // this.web3_wallet = web3Wallet.Instance;
    }
    public onAccountsChanged(accounts) {
        console.log("onAccountsChanged callback: ", accounts);
        console.log("Switch wallet");
    }
    public async logineg() {
    }

    public onChainChanged(chainId) {
        console.log("onChainChanged callback: ", chainId);
        // if (chainId === 80001) {  }
    }

    public onDisconnect(error) {
        console.log("onDisconnect callback: ", error);
        this.M4M_SDK.disconnect();
    }

    public onError(error) {
        console.log("onError callback: ", error);
        console.log(error);
    }

    // 销毁钱包
    public async destroy() {
        await this.wallet?.destroy?.();
        this.wallet = null;
    }

    //是否连上钱包
    public async IsMetaMaskLinked() {
        const accounts = await this.wallet.getAccounts(false);
        if (accounts?.[0]) {
            return true;
        } else {
            return false;
        }
    }

    //登录账户
    public loginAccount(callBackFun: Function) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        this.M4M_SDK.login(this.M4M_SDK.Connector_Types.Injected).then((res) => {
            console.log(res);// res  钱包对字符串的签名。后面可以发到后端进行验证，发放session cookie或者jwt
            this.M4M_SDK.connect({
                handleAccountsChanged: this.onAccountsChanged,
                handleChainChanged: this.onChainChanged,
                handleDisconnect: this.onDisconnect,
                handleError: this.onError,
            });
            this.M4M_SDK.getInfo()
                .then(async (res) => {
                    // res.address 钱包地址
                    this.address = res.address;
                    if (callBackFun) {
                        callBackFun(res.address);
                    }
                    if (res.chainId !== 80001) {
                        return this.M4M_SDK.switchNetwork().then(() => { });
                    }
                });
        }).catch((error) => {
            console.log("签名错误信息", error);
            if (error.code == 4001) {
                // UITipManager.Instance.tipPanelText = "Sorry, signature authorization failed";
                // UIOpenOrHideManager.Instance.OpenTipsTCView();
            }
        });
    }
    public claimLoot(componentids, componentNums, backendSig, fun: Function) {
        UiManager.showUi("wloading")
        let token = WsDataManager.UserDataBaseData.token;
        this.M4M_SDK.claimLoot({
            uuid: token,
            componentIds: componentids,
            amounts: componentNums,
            sig: backendSig,
        }).then((claimRes) => {
            UiManager.hideUi("wloading");
            console.log(claimRes);
            let game = GameArchiveManager.Instance.GameArchiveData
            GameArchiveManagerRequest.Instance.LogonNft(game.id);
        }).catch((error) => {
            UiManager.hideUi("wloading");
            console.error(error);
            if (fun) {
                fun(componentids, componentNums);
            }
        });
    }

    /**获取M4M-Components */
    public async getM4MComponents(index: number) {
        let CmapComponents: cMap<CollectionNFT> = new cMap();
        if (!this.M4MComponentsCmap.has(index)) {
            let data = await this.fetchUserCollectionNFTs(M4M_COMPONENT_ID, index);
            for (const iterator of data.data) {
                CmapComponents.set(iterator.token_id, iterator);
            }
            this.M4MComponentsCmap.set(index, CmapComponents);
        }
        console.log(this.M4MComponentsCmap);
        return this.M4MComponentsCmap;
    }

    public async fetchUserCollectionNFTs(collection_id: any, index) {
        const params = {
            collection_id,
            chain_name: "mumbai",
            addr: this.address,
            page: index,
            gap: 50,
        };
        let data = await this.getCollectionNFTs(params);
        return data;
    }

    /**请求nft数组 */
    public async getCollectionNFTs(data: IGetCollectionNFTsParams): Promise<IGetCollectionNFTsData> {
        const url = "https://web3api.meta4d.me/api/v1/collection/nfts";
        const method = "GET";
        const modet = (method === "GET" ? { params: data } : { data });
        const res = await this.axios.get(url, modet);
        for (let index = 0; index < res.data.data.data.length; index++) {
            const element = res.data.data.data[index];
            // tslint:disable-next-line: no-shadowed-variable
            const data = await this.axios.get(element.uri);
            element.data = data.data;
        }
        return res.data.data as IGetCollectionNFTsData;
    }
    public judgeNFT(data) {
        let gamearchive: { [key: string]: string } = {};
        let gamerIPFSdic: { [key: string]: IGetIpfsParams } = {};
        for (const key in this.M4MComponentsCmap["data"]) {
            const element = this.M4MComponentsCmap["data"][key]["data"];
            for (const key in element) {
                const res = element[key];
                if (res.data && res.data.attributes && res.data.attributes.length > 0) {
                    let bool = res.data.attributes[0].value == "Sphere";
                    if (bool) {
                        let game = WsDataManager.UserDataBaseData.GameArchive[res.token_id];
                        if (game) {
                            if (!game.ism4mnft) {
                                GameArchiveManagerRequest.Instance.LogonNft(game.id);
                            }
                        } else {
                            if (res.data) {
                                gamearchive[res.token_id] = res.data.name;
                                for (const iterator in data) {
                                    let element = data[iterator]
                                    if (element.skinName == res.data.name) {
                                        let Params: IGetIpfsParams = {
                                            prev: res.data.prev,
                                            url: res.data.image
                                        }
                                        gamerIPFSdic[element.headPortrait] = Params
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (Object.keys(gamearchive).length > 0) {
            GameArchiveManagerRequest.Instance.M4MNftAddGame(gamearchive);
        }
        if (Object.keys(gamerIPFSdic).length > 0) {
            GameArchiveManagerRequest.Instance.M4MNFTAddUploadIpfs(gamerIPFSdic)

        }
    }
}


export interface IGetIpfsParams {
    prev: string;
    url: string;
}

export enum ENUM_CHAIN_NAME {
    CHAIN_NAME_MAINNET = "mainnet",
    CHAIN_NAME_POLYGON = "polygon",
    CHAIN_NAME_RINKEBY = "rinkeby",
    CHAIN_NAME_MUMBAI = "mumbai",
}
export interface IBindMetadataParams {
    chain_name: ENUM_CHAIN_NAME;
    m4m_token_id: string;
    description: string;
    name: string;
    uri: string;
}
export interface IpareComponentParams {
    prev: string;
    Id: string;
    desc: string;
    itemName: string;
    symbol: string;
    rolePartName: string;
    tokenid: string;
    address: string;
    pictureRes: string;
    imageBase64: string;
    keybool: any;
}

export interface IGetCollectionNFTsParams {
    collection_id: string;
    chain_name: string;
    addr: string;
    page?: number;
    gap?: number;
}

export interface CollectionNFT {
    contract: string;
    erc: string;
    token_id: string;
    amount: string;
    uri: string;
    data: any;
    owner: string;
}


export interface IGetCollectionNFTsData {
    collection_id: string;
    collection_name: string;
    collection_img: string;
    total: number;
    data: CollectionNFT[];
}