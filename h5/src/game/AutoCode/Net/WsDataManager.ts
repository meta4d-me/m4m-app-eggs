import { ArrangementData } from "ArrangementData";
import { cMap } from "Data/Map";
import { EquipBase } from "EquipBase";
import { EquipDate } from "EquipDate";
import { EquipEffectBase } from "EquipEffectBase";
import { EquipExpBase } from "EquipExpBase";
import { ErrorInfo } from "ErrorInfo";
import { Formulas } from "Formulas";
import { GameArchiveData } from "GameArchiveData";
import { ItemBase } from "ItemBase";
import { ItemData } from "ItemData";
import { LevelBase } from "LevelBase";
import { MainBase } from "MainBase";
import { RoleBase } from "RoleBase";
import { RoleData } from "RoleData";
import { ServerUserData } from "ServerUserData";
import { SeverConfigBase } from "SeverConfigBase";
import { SeverData } from "SeverData";
import { SkinBase } from "SkinBase";
import { test } from "test";
import { ThemeBase } from "ThemeBase";
import { TimeEvent } from "TimeEvent";
import { UploadIpfsData } from "UploadIpfsData";
import { UserDataBase } from "UserDataBase";
import { UserVarBase } from "UserVarBase";
import { WalletErrLog } from "WalletErrLog";
import { WalletLog } from "WalletLog";


export class WsDataManager {
    public static ArrangementDataData: ArrangementData = new ArrangementData();
    public static EquipBaseData: EquipBase = new EquipBase();
    public static EquipDateData: EquipDate = new EquipDate();
    public static EquipEffectBaseData: EquipEffectBase = new EquipEffectBase();
    public static EquipExpBaseData: EquipExpBase = new EquipExpBase();
    public static GameArchiveDataData: GameArchiveData = new GameArchiveData();
    public static ItemBaseData: ItemBase = new ItemBase();
    public static ItemDataData: ItemData = new ItemData();
    public static LevelBaseData: LevelBase = new LevelBase();
    public static MainBaseData: MainBase = new MainBase();
    public static RoleBaseData: RoleBase = new RoleBase();
    public static RoleDataData: RoleData = new RoleData();
    public static SkinBaseData: SkinBase = new SkinBase();
    public static testData: test = new test();
    public static ThemeBaseData: ThemeBase = new ThemeBase();
    public static UploadIpfsDataData: UploadIpfsData = new UploadIpfsData();
    public static UserDataBaseData: UserDataBase = new UserDataBase();
    public static UserVarBaseData: UserVarBase = new UserVarBase();
    public static WalletErrLogData: WalletErrLog = new WalletErrLog();
    public static WalletLogData: WalletLog = new WalletLog();
    public static ErrorInfoData: ErrorInfo = new ErrorInfo();
    public static FormulasData: Formulas = new Formulas();
    public static ServerUserDataData: ServerUserData = new ServerUserData();
    public static SeverConfigBaseData: SeverConfigBase = new SeverConfigBase();
    public static SeverDataData: SeverData = new SeverData();
    public static TimeEventData: TimeEvent = new TimeEvent();

    public static ArrangementDataDataList = ArrangementData;
    public static EquipBaseDataList = EquipBase;
    public static EquipDateDataList = EquipDate;
    public static EquipEffectBaseDataList = EquipEffectBase;
    public static EquipExpBaseDataList = EquipExpBase;
    public static GameArchiveDataDataList = GameArchiveData;
    public static ItemBaseDataList = ItemBase;
    public static ItemDataDataList = ItemData;
    public static LevelBaseDataList = LevelBase;
    public static MainBaseDataList = MainBase;
    public static RoleBaseDataList = RoleBase;
    public static RoleDataDataList = RoleData;
    public static SkinBaseDataList = SkinBase;
    public static testDataList = test;
    public static ThemeBaseDataList = ThemeBase;
    public static UploadIpfsDataDataList = UploadIpfsData;
    public static UserDataBaseDataList = UserDataBase;
    public static UserVarBaseDataList = UserVarBase;
    public static WalletErrLogDataList = WalletErrLog;
    public static WalletLogDataList = WalletLog;
    public static ErrorInfoDataList = ErrorInfo;
    public static FormulasDataList = Formulas;
    public static ServerUserDataDataList = ServerUserData;
    public static SeverConfigBaseDataList = SeverConfigBase;
    public static SeverDataDataList = SeverData;
    public static TimeEventDataList = TimeEvent;

    public static setData(className, data) {
        WsDataManager[className + "Data"].clone(data);
        WsDataManager[className + "Data"].dispatchEvent("All", data);
    }
    public static changeDataList(className: string, data) {
        let getClass = WsDataManager[className + "DataList"];
        if (getClass) {
            let newMap = new cMap();
            for (const key in data) {
                newMap.set(key, data[key]);
            }
            getClass.list = newMap;
        }
        WsDataManager[className + "Data"].dispatchEvent("ChangeList", data);
    }
    public static changeData(className: string, proName: string, paramType: string, data) {
        let param = WsDataManager[className + "Data"][proName];
        switch (paramType) {
            case "list":
                if (!param) {
                    WsDataManager[className + "Data"][proName] = [];
                }
                for (let key = 0; key < data.length; key++) {
                    if (key >= param.length) {
                        WsDataManager[className + "Data"][proName].push(data[key]);
                    } else {
                        WsDataManager[className + "Data"][proName][key] = data[key];
                    }
                }
                break;
            case "map":
                let oldMap;
                if (WsDataManager[className + "Data"][proName]) {
                    oldMap = WsDataManager[className + "Data"][proName];
                } else {
                    oldMap = {};
                }
                for (const key in data) {
                    oldMap[key] = data[key];
                }
                WsDataManager[className + "Data"][proName] = oldMap;
                break;
            case "mapdel":
                let oldMapDel;
                if (WsDataManager[className + "Data"][proName]) {
                    oldMapDel = WsDataManager[className + "Data"][proName];
                } else {
                    oldMapDel = {};
                }
                for (const key in data) {
                    if (oldMapDel[key]) {
                        delete oldMapDel[key];
                    }
                }
                WsDataManager[className + "Data"][proName] = oldMapDel;
                break;
            default:
                WsDataManager[className + "Data"][proName] = data;
        }
        WsDataManager[className + "Data"].dispatchEvent(proName, data);
    }
    public static dispatchTipData(className: string, data) {
        WsDataManager[className + "Data"].dispatchEvent("TipData", data);
    }
}