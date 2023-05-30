import { AwaitDataManager } from "../../Net/AwaitDataManager";
import { NetWebscoket } from "../../Net/NetWebsocket";
import { NetData } from "../../Net/NetData";
import { WsDataManager } from "./WsDataManager";
import { UiDataManager } from "PSDUI/UiDataManager";

export class WebsocketTool {
    public static get Instance(): WebsocketTool {
        if (this._instance == null) {
            this._instance = new WebsocketTool();
        }

        return this._instance;
    }
    private static _instance: WebsocketTool;
    public onmessage(netData: NetData) {
        if (netData.head == "[Data]") {
            //服务端通知数据修改完成...
            let obj = netData.GetJson();
            AwaitDataManager.dispatchSuccess(obj.className + "." + obj.functionName + "_#" + obj.args[0], obj.args);
            return true;
        } else if (netData.head == "[DataError]") {
            //发送错误消息
            let obj = netData.GetJson();
            AwaitDataManager.dispatchError(obj.className + "." + obj.functionName + "_#" + obj.args[0], obj.args);
            return true;
        } else if (netData.head != "[LOG]") {
            let messObj = netData.GetJson()[0];
            if (messObj.argsType == "code") {
                return false;
            }
            if (messObj.argsType == "Event") {
                UiDataManager.changeFunctionData(messObj.className + "_" + messObj.functionName, messObj.args);
                return true;
            }
            if (messObj.functionName == "All") {
                WsDataManager.setData(messObj.className, messObj.args[0]);
            } else if (messObj.functionName == "ChangeList") {
                WsDataManager.changeDataList(messObj.className, messObj.args[0]);
            } else if (messObj.functionName == "TipData") {
                WsDataManager.dispatchTipData(messObj.className, messObj.args[0]);
            } else {
                for (var i = 0; i < messObj.args.length; i++) {
                    let element = messObj.args[i];
                    WsDataManager.changeData(messObj.className, messObj.functionName, messObj.argsType, element);
                }
            }
            return true;
        }
        return false;
    }
    public getMsg(className,functionName,text) {
        let mess = `{"currentType":null,"type":null,"callTime":"0001-01-01T00:00:00","callid":0,"timeout":0,"className":"${className}","functionName":"${functionName}","argsType":null,
        "args":[${text}],"returnType":null,"returnValue":null}`;
        return mess;
    }

    /***
     * 获取全部test数据
     */
    public ExcelManager_testDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","testDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条test数据
     */
    public ExcelManager_testDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","testDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单test数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifytestDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifytestDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个test数据
     */
    public ExcelManager_addtestData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addtestData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加test数组数据
     */
    public ExcelManager_addtestDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addtestDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条test
     */
    public ExcelManager_removetestData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removetestData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取UserDataBase数据
     */
    public ExcelManager_UserDataBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","UserDataBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部UserDataBase数据
     */
    public ExcelManager_UserDataBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","UserDataBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条UserDataBase数据
     */
    public ExcelManager_UserDataBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","UserDataBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单UserDataBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyUserDataBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyUserDataBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个UserDataBase数据
     */
    public ExcelManager_addUserDataBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addUserDataBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加UserDataBase数组数据
     */
    public ExcelManager_addUserDataBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addUserDataBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条UserDataBase
     */
    public ExcelManager_removeUserDataBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeUserDataBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取UserVarBase数据
     */
    public ExcelManager_UserVarBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","UserVarBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部UserVarBase数据
     */
    public ExcelManager_UserVarBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","UserVarBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条UserVarBase数据
     */
    public ExcelManager_UserVarBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","UserVarBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单UserVarBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyUserVarBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyUserVarBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个UserVarBase数据
     */
    public ExcelManager_addUserVarBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addUserVarBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加UserVarBase数组数据
     */
    public ExcelManager_addUserVarBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addUserVarBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条UserVarBase
     */
    public ExcelManager_removeUserVarBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeUserVarBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取WalletErrLog数据
     */
    public ExcelManager_WalletErrLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","WalletErrLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部WalletErrLog数据
     */
    public ExcelManager_WalletErrLogDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","WalletErrLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条WalletErrLog数据
     */
    public ExcelManager_WalletErrLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","WalletErrLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单WalletErrLog数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyWalletErrLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyWalletErrLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个WalletErrLog数据
     */
    public ExcelManager_addWalletErrLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addWalletErrLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加WalletErrLog数组数据
     */
    public ExcelManager_addWalletErrLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addWalletErrLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条WalletErrLog
     */
    public ExcelManager_removeWalletErrLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeWalletErrLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取WalletLog数据
     */
    public ExcelManager_WalletLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","WalletLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部WalletLog数据
     */
    public ExcelManager_WalletLogDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","WalletLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条WalletLog数据
     */
    public ExcelManager_WalletLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","WalletLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单WalletLog数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyWalletLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyWalletLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个WalletLog数据
     */
    public ExcelManager_addWalletLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addWalletLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加WalletLog数组数据
     */
    public ExcelManager_addWalletLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addWalletLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条WalletLog
     */
    public ExcelManager_removeWalletLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeWalletLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ErrorInfo数据
     */
    public ExcelManager_ErrorInfoDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ErrorInfoDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ErrorInfo数据
     */
    public ExcelManager_ErrorInfoDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ErrorInfoDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ErrorInfo数据
     */
    public ExcelManager_ErrorInfoDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ErrorInfoDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ErrorInfo数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyErrorInfoDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyErrorInfoDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ErrorInfo数据
     */
    public ExcelManager_addErrorInfoData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addErrorInfoData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ErrorInfo数组数据
     */
    public ExcelManager_addErrorInfoDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addErrorInfoDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ErrorInfo
     */
    public ExcelManager_removeErrorInfoData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeErrorInfoData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取Formulas数据
     */
    public ExcelManager_FormulasDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","FormulasDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部Formulas数据
     */
    public ExcelManager_FormulasDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","FormulasDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条Formulas数据
     */
    public ExcelManager_FormulasDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","FormulasDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单Formulas数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyFormulasDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyFormulasDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个Formulas数据
     */
    public ExcelManager_addFormulasData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addFormulasData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加Formulas数组数据
     */
    public ExcelManager_addFormulasDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addFormulasDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条Formulas
     */
    public ExcelManager_removeFormulasData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeFormulasData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ServerUserData数据
     */
    public ExcelManager_ServerUserDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ServerUserDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ServerUserData数据
     */
    public ExcelManager_ServerUserDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ServerUserDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ServerUserData数据
     */
    public ExcelManager_ServerUserDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ServerUserDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ServerUserData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyServerUserDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyServerUserDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ServerUserData数据
     */
    public ExcelManager_addServerUserDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addServerUserDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ServerUserData数组数据
     */
    public ExcelManager_addServerUserDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addServerUserDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ServerUserData
     */
    public ExcelManager_removeServerUserDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeServerUserDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SeverConfigBase数据
     */
    public ExcelManager_SeverConfigBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","SeverConfigBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SeverConfigBase数据
     */
    public ExcelManager_SeverConfigBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","SeverConfigBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SeverConfigBase数据
     */
    public ExcelManager_SeverConfigBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","SeverConfigBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SeverConfigBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifySeverConfigBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifySeverConfigBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SeverConfigBase数据
     */
    public ExcelManager_addSeverConfigBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSeverConfigBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SeverConfigBase数组数据
     */
    public ExcelManager_addSeverConfigBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSeverConfigBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SeverConfigBase
     */
    public ExcelManager_removeSeverConfigBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeSeverConfigBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SeverData数据
     */
    public ExcelManager_SeverDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","SeverDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SeverData数据
     */
    public ExcelManager_SeverDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","SeverDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SeverData数据
     */
    public ExcelManager_SeverDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","SeverDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SeverData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifySeverDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifySeverDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SeverData数据
     */
    public ExcelManager_addSeverDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSeverDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SeverData数组数据
     */
    public ExcelManager_addSeverDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSeverDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SeverData
     */
    public ExcelManager_removeSeverDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeSeverDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取TimeEvent数据
     */
    public ExcelManager_TimeEventDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","TimeEventDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部TimeEvent数据
     */
    public ExcelManager_TimeEventDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","TimeEventDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条TimeEvent数据
     */
    public ExcelManager_TimeEventDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","TimeEventDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单TimeEvent数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyTimeEventDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyTimeEventDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个TimeEvent数据
     */
    public ExcelManager_addTimeEventData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addTimeEventData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加TimeEvent数组数据
     */
    public ExcelManager_addTimeEventDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addTimeEventDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条TimeEvent
     */
    public ExcelManager_removeTimeEventData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeTimeEventData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ArrangementData数据
     */
    public ExcelManager_ArrangementDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ArrangementDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ArrangementData数据
     */
    public ExcelManager_ArrangementDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ArrangementDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ArrangementData数据
     */
    public ExcelManager_ArrangementDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ArrangementDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ArrangementData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyArrangementDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyArrangementDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ArrangementData数据
     */
    public ExcelManager_addArrangementDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addArrangementDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ArrangementData数组数据
     */
    public ExcelManager_addArrangementDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addArrangementDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ArrangementData
     */
    public ExcelManager_removeArrangementDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeArrangementDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取EquipBase数据
     */
    public ExcelManager_EquipBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","EquipBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部EquipBase数据
     */
    public ExcelManager_EquipBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","EquipBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条EquipBase数据
     */
    public ExcelManager_EquipBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","EquipBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单EquipBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyEquipBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyEquipBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个EquipBase数据
     */
    public ExcelManager_addEquipBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addEquipBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加EquipBase数组数据
     */
    public ExcelManager_addEquipBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addEquipBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条EquipBase
     */
    public ExcelManager_removeEquipBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeEquipBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取EquipDate数据
     */
    public ExcelManager_EquipDateDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","EquipDateDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部EquipDate数据
     */
    public ExcelManager_EquipDateDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","EquipDateDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条EquipDate数据
     */
    public ExcelManager_EquipDateDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","EquipDateDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单EquipDate数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyEquipDateDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyEquipDateDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个EquipDate数据
     */
    public ExcelManager_addEquipDateData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addEquipDateData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加EquipDate数组数据
     */
    public ExcelManager_addEquipDateDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addEquipDateDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条EquipDate
     */
    public ExcelManager_removeEquipDateData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeEquipDateData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取EquipEffectBase数据
     */
    public ExcelManager_EquipEffectBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","EquipEffectBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部EquipEffectBase数据
     */
    public ExcelManager_EquipEffectBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","EquipEffectBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条EquipEffectBase数据
     */
    public ExcelManager_EquipEffectBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","EquipEffectBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单EquipEffectBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyEquipEffectBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyEquipEffectBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个EquipEffectBase数据
     */
    public ExcelManager_addEquipEffectBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addEquipEffectBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加EquipEffectBase数组数据
     */
    public ExcelManager_addEquipEffectBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addEquipEffectBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条EquipEffectBase
     */
    public ExcelManager_removeEquipEffectBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeEquipEffectBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取EquipExpBase数据
     */
    public ExcelManager_EquipExpBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","EquipExpBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部EquipExpBase数据
     */
    public ExcelManager_EquipExpBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","EquipExpBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条EquipExpBase数据
     */
    public ExcelManager_EquipExpBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","EquipExpBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单EquipExpBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyEquipExpBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyEquipExpBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个EquipExpBase数据
     */
    public ExcelManager_addEquipExpBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addEquipExpBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加EquipExpBase数组数据
     */
    public ExcelManager_addEquipExpBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addEquipExpBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条EquipExpBase
     */
    public ExcelManager_removeEquipExpBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeEquipExpBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取GameArchiveData数据
     */
    public ExcelManager_GameArchiveDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","GameArchiveDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部GameArchiveData数据
     */
    public ExcelManager_GameArchiveDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","GameArchiveDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条GameArchiveData数据
     */
    public ExcelManager_GameArchiveDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","GameArchiveDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单GameArchiveData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyGameArchiveDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyGameArchiveDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个GameArchiveData数据
     */
    public ExcelManager_addGameArchiveDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addGameArchiveDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加GameArchiveData数组数据
     */
    public ExcelManager_addGameArchiveDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addGameArchiveDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条GameArchiveData
     */
    public ExcelManager_removeGameArchiveDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeGameArchiveDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ItemBase数据
     */
    public ExcelManager_ItemBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ItemBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ItemBase数据
     */
    public ExcelManager_ItemBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ItemBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ItemBase数据
     */
    public ExcelManager_ItemBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ItemBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ItemBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyItemBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyItemBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ItemBase数据
     */
    public ExcelManager_addItemBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addItemBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ItemBase数组数据
     */
    public ExcelManager_addItemBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addItemBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ItemBase
     */
    public ExcelManager_removeItemBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeItemBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ItemData数据
     */
    public ExcelManager_ItemDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ItemDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ItemData数据
     */
    public ExcelManager_ItemDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ItemDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ItemData数据
     */
    public ExcelManager_ItemDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ItemDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ItemData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyItemDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyItemDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ItemData数据
     */
    public ExcelManager_addItemDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addItemDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ItemData数组数据
     */
    public ExcelManager_addItemDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addItemDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ItemData
     */
    public ExcelManager_removeItemDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeItemDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取LevelBase数据
     */
    public ExcelManager_LevelBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","LevelBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部LevelBase数据
     */
    public ExcelManager_LevelBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","LevelBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条LevelBase数据
     */
    public ExcelManager_LevelBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","LevelBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单LevelBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyLevelBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyLevelBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个LevelBase数据
     */
    public ExcelManager_addLevelBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addLevelBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加LevelBase数组数据
     */
    public ExcelManager_addLevelBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addLevelBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条LevelBase
     */
    public ExcelManager_removeLevelBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeLevelBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取RoleBase数据
     */
    public ExcelManager_RoleBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","RoleBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部RoleBase数据
     */
    public ExcelManager_RoleBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","RoleBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条RoleBase数据
     */
    public ExcelManager_RoleBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","RoleBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单RoleBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyRoleBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyRoleBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个RoleBase数据
     */
    public ExcelManager_addRoleBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addRoleBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加RoleBase数组数据
     */
    public ExcelManager_addRoleBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addRoleBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条RoleBase
     */
    public ExcelManager_removeRoleBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeRoleBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取RoleData数据
     */
    public ExcelManager_RoleDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","RoleDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部RoleData数据
     */
    public ExcelManager_RoleDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","RoleDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条RoleData数据
     */
    public ExcelManager_RoleDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","RoleDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单RoleData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyRoleDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyRoleDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个RoleData数据
     */
    public ExcelManager_addRoleDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addRoleDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加RoleData数组数据
     */
    public ExcelManager_addRoleDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addRoleDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条RoleData
     */
    public ExcelManager_removeRoleDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeRoleDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SkinBase数据
     */
    public ExcelManager_SkinBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","SkinBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SkinBase数据
     */
    public ExcelManager_SkinBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","SkinBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SkinBase数据
     */
    public ExcelManager_SkinBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","SkinBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SkinBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifySkinBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifySkinBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SkinBase数据
     */
    public ExcelManager_addSkinBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSkinBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SkinBase数组数据
     */
    public ExcelManager_addSkinBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSkinBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SkinBase
     */
    public ExcelManager_removeSkinBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeSkinBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取test数据
     */
    public ExcelManager_testDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","testDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 记录客户端异常消息
     */
    public ErrorInfoManager_CreateErrorInfo(message, modelType) {
        let paramJsons =`"a0":${JSON.stringify(message)},"a1":${JSON.stringify(modelType)},`;
        let mess = this.getMsg("ErrorInfoManager","CreateErrorInfo",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * callService
     */
    public FrontDataManager_callService(className, funcName, args) {
        let paramJsons =`"a0":${JSON.stringify(className)},"a1":${JSON.stringify(funcName)},"a2":${JSON.stringify(args)},`;
        let mess = this.getMsg("FrontDataManager","callService",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * callFunc
     */
    public FrontDataManager_callFunc(tableName, funcName, args) {
        let paramJsons =`"a0":${JSON.stringify(tableName)},"a1":${JSON.stringify(funcName)},"a2":${JSON.stringify(args)},`;
        let mess = this.getMsg("FrontDataManager","callFunc",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取LevelBase配置数据
     */
    public GameArchiveManager_getLevelBase() {
        let paramJsons =``;
        let mess = this.getMsg("GameArchiveManager","getLevelBase",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取SkinBase配置数据
     */
    public GameArchiveManager_getSkinBase() {
        let paramJsons =``;
        let mess = this.getMsg("GameArchiveManager","getSkinBase",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 玩家登录,userId:玩家ID,passWord:密码
     */
    public LoginManager_loginWithOutWallet(userId, passWord) {
        let paramJsons =`"a0":${JSON.stringify(userId)},"a1":${JSON.stringify(passWord)},`;
        let mess = this.getMsg("LoginManager","loginWithOutWallet",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 切换账号
     */
    public LoginManager_switchLogin() {
        let paramJsons =``;
        let mess = this.getMsg("LoginManager","switchLogin",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改服务器时间,count：时间便宜量，单位秒
     */
    public ServerManager_timePlus(count) {
        let paramJsons =`"a0":${JSON.stringify(count)},`;
        let mess = this.getMsg("ServerManager","timePlus",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 心跳检测
     */
    public ServerManager_heartBeat() {
        let paramJsons =``;
        let mess = this.getMsg("ServerManager","heartBeat",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 延迟检测
     */
    public ServerManager_ping() {
        let paramJsons =``;
        let mess = this.getMsg("ServerManager","ping",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取服务器时间
     */
    public ServerManager_servertime() {
        let paramJsons =``;
        let mess = this.getMsg("ServerManager","servertime",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}