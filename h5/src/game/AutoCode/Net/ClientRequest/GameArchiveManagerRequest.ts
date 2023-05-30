import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class GameArchiveManagerRequest {
    public static get Instance(): GameArchiveManagerRequest {
        if (this._instance == null) {
            this._instance = new GameArchiveManagerRequest();
        }

        return this._instance;
    }
    private static _instance: GameArchiveManagerRequest;


    /***
     * 获取LevelBase配置数据
     */
    public getLevelBase() {
        let paramJsons = ``;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "getLevelBase", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取SkinBase配置数据
     */
    public getSkinBase() {
        let paramJsons = ``;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "getSkinBase", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取MainBase配置数据
     */
    public getMainBase() {
        let paramJsons = ``;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "getMainBase", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取ThemeBase配置数据
     */
    public getThemeBase() {
        let paramJsons = ``;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "getThemeBase", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建存档
     */
    public CreateArchive() {
        let paramJsons = ``;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "CreateArchive", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 选择存档
     */
    public SelectArchive(archiveID) {
        let paramJsons = `${JSON.stringify(archiveID)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "SelectArchive", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 注册NFT
     */
    public LogonNft(archiveID) {
        let paramJsons = `${JSON.stringify(archiveID)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "LogonNft", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 切换皮肤
     */
    public SwitchSkin(archiveID, skinID) {
        let paramJsons = `${JSON.stringify(archiveID)},${JSON.stringify(skinID)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "SwitchSkin", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改该存档的关卡
     */
    public updataGame(archiveID, levelID) {
        let paramJsons = `${JSON.stringify(archiveID)},${JSON.stringify(levelID)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "updataGame", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /**
     * 修改存档使用者
     */
    public M4MNftAddGame(skinNameDic) {
        let paramJsons = `${JSON.stringify(skinNameDic)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "M4MNftAddGame", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    public M4MNFTAddUploadIpfs(ipfsDic) {
        let paramJsons = `${JSON.stringify(ipfsDic)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "M4MNFTAddUploadIpfs", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加数据
     */
    public UploadData(imageName, url, model, Ipfsimage, Ipfsmodel) {
        let paramJsons = `${JSON.stringify(imageName)},${JSON.stringify(url)},${JSON.stringify(model)},${JSON.stringify(Ipfsimage)},${JSON.stringify(Ipfsmodel)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "UploadData", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /**
     *查询上传到Ipfs数据
     */
    public selectData(image) {
        let paramJsons = `${JSON.stringify(image)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "selectData", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /**
     * 修改本地路径资源数据
     */
    public updateData(image, resUrl) {
        let paramJsons = `${JSON.stringify(image)},${JSON.stringify(resUrl)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "updateData", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /**
     * 修改上传到ipfs资源路径
     */
    public updateIpfsData(image, resUrl) {
        let paramJsons = `${JSON.stringify(image)},${JSON.stringify(resUrl)}`;
        let mess = WebsocketTool.Instance.getMsg("GameArchiveManager", "updateData", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}