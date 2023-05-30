import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class ExcelManagerRequest {
    public static get Instance(): ExcelManagerRequest {
        if (this._instance == null) {
            this._instance = new ExcelManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ExcelManagerRequest;


    /***
     * 获取全部test数据
     */
    public testDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","testDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条test数据
     */
    public testDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","testDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单test数组的指定属性，propertyName：属性名，value：值
     */
    public modifytestDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifytestDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个test数据
     */
    public addtestData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addtestData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加test数组数据
     */
    public addtestDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addtestDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条test
     */
    public removetestData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removetestData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取UserDataBase数据
     */
    public UserDataBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserDataBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部UserDataBase数据
     */
    public UserDataBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserDataBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条UserDataBase数据
     */
    public UserDataBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserDataBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单UserDataBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyUserDataBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyUserDataBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个UserDataBase数据
     */
    public addUserDataBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addUserDataBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加UserDataBase数组数据
     */
    public addUserDataBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addUserDataBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条UserDataBase
     */
    public removeUserDataBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeUserDataBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取UserVarBase数据
     */
    public UserVarBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserVarBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部UserVarBase数据
     */
    public UserVarBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserVarBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条UserVarBase数据
     */
    public UserVarBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserVarBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单UserVarBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyUserVarBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyUserVarBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个UserVarBase数据
     */
    public addUserVarBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addUserVarBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加UserVarBase数组数据
     */
    public addUserVarBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addUserVarBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条UserVarBase
     */
    public removeUserVarBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeUserVarBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取WalletErrLog数据
     */
    public WalletErrLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletErrLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部WalletErrLog数据
     */
    public WalletErrLogDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletErrLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条WalletErrLog数据
     */
    public WalletErrLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletErrLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单WalletErrLog数组的指定属性，propertyName：属性名，value：值
     */
    public modifyWalletErrLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyWalletErrLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个WalletErrLog数据
     */
    public addWalletErrLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addWalletErrLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加WalletErrLog数组数据
     */
    public addWalletErrLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addWalletErrLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条WalletErrLog
     */
    public removeWalletErrLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeWalletErrLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取WalletLog数据
     */
    public WalletLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部WalletLog数据
     */
    public WalletLogDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条WalletLog数据
     */
    public WalletLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单WalletLog数组的指定属性，propertyName：属性名，value：值
     */
    public modifyWalletLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyWalletLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个WalletLog数据
     */
    public addWalletLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addWalletLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加WalletLog数组数据
     */
    public addWalletLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addWalletLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条WalletLog
     */
    public removeWalletLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeWalletLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ErrorInfo数据
     */
    public ErrorInfoDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ErrorInfoDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ErrorInfo数据
     */
    public ErrorInfoDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ErrorInfoDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ErrorInfo数据
     */
    public ErrorInfoDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ErrorInfoDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ErrorInfo数组的指定属性，propertyName：属性名，value：值
     */
    public modifyErrorInfoDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyErrorInfoDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ErrorInfo数据
     */
    public addErrorInfoData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addErrorInfoData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ErrorInfo数组数据
     */
    public addErrorInfoDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addErrorInfoDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ErrorInfo
     */
    public removeErrorInfoData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeErrorInfoData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取Formulas数据
     */
    public FormulasDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","FormulasDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部Formulas数据
     */
    public FormulasDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","FormulasDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条Formulas数据
     */
    public FormulasDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","FormulasDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单Formulas数组的指定属性，propertyName：属性名，value：值
     */
    public modifyFormulasDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyFormulasDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个Formulas数据
     */
    public addFormulasData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addFormulasData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加Formulas数组数据
     */
    public addFormulasDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addFormulasDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条Formulas
     */
    public removeFormulasData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeFormulasData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ServerUserData数据
     */
    public ServerUserDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerUserDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ServerUserData数据
     */
    public ServerUserDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerUserDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ServerUserData数据
     */
    public ServerUserDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerUserDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ServerUserData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyServerUserDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyServerUserDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ServerUserData数据
     */
    public addServerUserDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addServerUserDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ServerUserData数组数据
     */
    public addServerUserDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addServerUserDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ServerUserData
     */
    public removeServerUserDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeServerUserDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SeverConfigBase数据
     */
    public SeverConfigBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverConfigBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SeverConfigBase数据
     */
    public SeverConfigBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverConfigBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SeverConfigBase数据
     */
    public SeverConfigBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverConfigBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SeverConfigBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifySeverConfigBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifySeverConfigBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SeverConfigBase数据
     */
    public addSeverConfigBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSeverConfigBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SeverConfigBase数组数据
     */
    public addSeverConfigBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSeverConfigBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SeverConfigBase
     */
    public removeSeverConfigBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeSeverConfigBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SeverData数据
     */
    public SeverDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SeverData数据
     */
    public SeverDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SeverData数据
     */
    public SeverDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SeverData数组的指定属性，propertyName：属性名，value：值
     */
    public modifySeverDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifySeverDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SeverData数据
     */
    public addSeverDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSeverDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SeverData数组数据
     */
    public addSeverDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSeverDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SeverData
     */
    public removeSeverDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeSeverDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取TimeEvent数据
     */
    public TimeEventDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","TimeEventDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部TimeEvent数据
     */
    public TimeEventDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","TimeEventDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条TimeEvent数据
     */
    public TimeEventDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","TimeEventDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单TimeEvent数组的指定属性，propertyName：属性名，value：值
     */
    public modifyTimeEventDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyTimeEventDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个TimeEvent数据
     */
    public addTimeEventData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addTimeEventData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加TimeEvent数组数据
     */
    public addTimeEventDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addTimeEventDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条TimeEvent
     */
    public removeTimeEventData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeTimeEventData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ArrangementData数据
     */
    public ArrangementDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ArrangementDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ArrangementData数据
     */
    public ArrangementDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ArrangementDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ArrangementData数据
     */
    public ArrangementDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ArrangementDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ArrangementData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyArrangementDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyArrangementDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ArrangementData数据
     */
    public addArrangementDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addArrangementDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ArrangementData数组数据
     */
    public addArrangementDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addArrangementDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ArrangementData
     */
    public removeArrangementDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeArrangementDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取EquipBase数据
     */
    public EquipBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部EquipBase数据
     */
    public EquipBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条EquipBase数据
     */
    public EquipBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单EquipBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyEquipBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyEquipBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个EquipBase数据
     */
    public addEquipBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addEquipBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加EquipBase数组数据
     */
    public addEquipBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addEquipBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条EquipBase
     */
    public removeEquipBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeEquipBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取EquipDate数据
     */
    public EquipDateDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipDateDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部EquipDate数据
     */
    public EquipDateDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipDateDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条EquipDate数据
     */
    public EquipDateDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipDateDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单EquipDate数组的指定属性，propertyName：属性名，value：值
     */
    public modifyEquipDateDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyEquipDateDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个EquipDate数据
     */
    public addEquipDateData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addEquipDateData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加EquipDate数组数据
     */
    public addEquipDateDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addEquipDateDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条EquipDate
     */
    public removeEquipDateData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeEquipDateData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取EquipEffectBase数据
     */
    public EquipEffectBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipEffectBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部EquipEffectBase数据
     */
    public EquipEffectBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipEffectBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条EquipEffectBase数据
     */
    public EquipEffectBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipEffectBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单EquipEffectBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyEquipEffectBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyEquipEffectBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个EquipEffectBase数据
     */
    public addEquipEffectBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addEquipEffectBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加EquipEffectBase数组数据
     */
    public addEquipEffectBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addEquipEffectBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条EquipEffectBase
     */
    public removeEquipEffectBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeEquipEffectBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取EquipExpBase数据
     */
    public EquipExpBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipExpBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部EquipExpBase数据
     */
    public EquipExpBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipExpBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条EquipExpBase数据
     */
    public EquipExpBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","EquipExpBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单EquipExpBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyEquipExpBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyEquipExpBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个EquipExpBase数据
     */
    public addEquipExpBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addEquipExpBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加EquipExpBase数组数据
     */
    public addEquipExpBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addEquipExpBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条EquipExpBase
     */
    public removeEquipExpBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeEquipExpBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取GameArchiveData数据
     */
    public GameArchiveDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GameArchiveDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部GameArchiveData数据
     */
    public GameArchiveDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GameArchiveDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条GameArchiveData数据
     */
    public GameArchiveDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GameArchiveDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单GameArchiveData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyGameArchiveDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyGameArchiveDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个GameArchiveData数据
     */
    public addGameArchiveDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addGameArchiveDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加GameArchiveData数组数据
     */
    public addGameArchiveDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addGameArchiveDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条GameArchiveData
     */
    public removeGameArchiveDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeGameArchiveDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ItemBase数据
     */
    public ItemBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ItemBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ItemBase数据
     */
    public ItemBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ItemBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ItemBase数据
     */
    public ItemBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ItemBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ItemBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyItemBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyItemBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ItemBase数据
     */
    public addItemBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addItemBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ItemBase数组数据
     */
    public addItemBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addItemBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ItemBase
     */
    public removeItemBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeItemBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ItemData数据
     */
    public ItemDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ItemDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ItemData数据
     */
    public ItemDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ItemDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ItemData数据
     */
    public ItemDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ItemDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ItemData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyItemDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyItemDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ItemData数据
     */
    public addItemDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addItemDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ItemData数组数据
     */
    public addItemDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addItemDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ItemData
     */
    public removeItemDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeItemDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取LevelBase数据
     */
    public LevelBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LevelBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部LevelBase数据
     */
    public LevelBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LevelBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条LevelBase数据
     */
    public LevelBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LevelBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单LevelBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyLevelBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyLevelBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个LevelBase数据
     */
    public addLevelBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addLevelBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加LevelBase数组数据
     */
    public addLevelBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addLevelBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条LevelBase
     */
    public removeLevelBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeLevelBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取RoleBase数据
     */
    public RoleBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","RoleBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部RoleBase数据
     */
    public RoleBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","RoleBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条RoleBase数据
     */
    public RoleBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","RoleBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单RoleBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyRoleBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyRoleBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个RoleBase数据
     */
    public addRoleBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addRoleBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加RoleBase数组数据
     */
    public addRoleBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addRoleBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条RoleBase
     */
    public removeRoleBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeRoleBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取RoleData数据
     */
    public RoleDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","RoleDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部RoleData数据
     */
    public RoleDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","RoleDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条RoleData数据
     */
    public RoleDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","RoleDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单RoleData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyRoleDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyRoleDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个RoleData数据
     */
    public addRoleDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addRoleDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加RoleData数组数据
     */
    public addRoleDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addRoleDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条RoleData
     */
    public removeRoleDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeRoleDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SkinBase数据
     */
    public SkinBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SkinBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SkinBase数据
     */
    public SkinBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SkinBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SkinBase数据
     */
    public SkinBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SkinBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SkinBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifySkinBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifySkinBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SkinBase数据
     */
    public addSkinBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSkinBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SkinBase数组数据
     */
    public addSkinBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSkinBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SkinBase
     */
    public removeSkinBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeSkinBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取test数据
     */
    public testDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","testDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}