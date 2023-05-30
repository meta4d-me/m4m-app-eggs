import { ArrangementDataBuffer } from "./ArrangementDataBuffer";
import { EquipBaseBuffer } from "./EquipBaseBuffer";
import { EquipDateBuffer } from "./EquipDateBuffer";
import { EquipEffectBaseBuffer } from "./EquipEffectBaseBuffer";
import { EquipExpBaseBuffer } from "./EquipExpBaseBuffer";
import { ErrorInfoBuffer } from "./ErrorInfoBuffer";
import { FormulasBuffer } from "./FormulasBuffer";
import { GameArchiveDataBuffer } from "./GameArchiveDataBuffer";
import { ItemBaseBuffer } from "./ItemBaseBuffer";
import { ItemDataBuffer } from "./ItemDataBuffer";
import { LevelBaseBuffer } from "./LevelBaseBuffer";
import { MainBaseBuffer } from "./MainBaseBuffer";
import { RoleBaseBuffer } from "./RoleBaseBuffer";
import { RoleDataBuffer } from "./RoleDataBuffer";
import { ServerUserDataBuffer } from "./ServerUserDataBuffer";
import { SeverConfigBaseBuffer } from "./SeverConfigBaseBuffer";
import { SeverDataBuffer } from "./SeverDataBuffer";
import { SkinBaseBuffer } from "./SkinBaseBuffer";
import { testBuffer } from "./testBuffer";
import { ThemeBaseBuffer } from "./ThemeBaseBuffer";
import { TimeEventBuffer } from "./TimeEventBuffer";
import { UserDataBaseBuffer } from "./UserDataBaseBuffer";
import { UserVarBaseBuffer } from "./UserVarBaseBuffer";
import { WalletErrLogBuffer } from "./WalletErrLogBuffer";
import { WalletLogBuffer } from "./WalletLogBuffer";
import { TipInfoBuffer } from "./TipInfoBuffer";
import { UploadIpfsDataBuffer } from "./UploadIpfsDataBuffer";


export class BufferDataReader{

    public static get Instance(): BufferDataReader {
        if (this._instance == null) {
            this._instance = new BufferDataReader();
        }

        return this._instance;
    }
    private static _instance: BufferDataReader;
    public readArrayBuffer(className:string, br: m4m.io.binTool){
          switch (className) {
                case "ArrangementData":
                    return ArrangementDataBuffer.Instance.readArrayBuffer(br);
                case "EquipBase":
                    return EquipBaseBuffer.Instance.readArrayBuffer(br);
                case "EquipDate":
                    return EquipDateBuffer.Instance.readArrayBuffer(br);
                case "EquipEffectBase":
                    return EquipEffectBaseBuffer.Instance.readArrayBuffer(br);
                case "EquipExpBase":
                    return EquipExpBaseBuffer.Instance.readArrayBuffer(br);
                case "ErrorInfo":
                    return ErrorInfoBuffer.Instance.readArrayBuffer(br);
                case "Formulas":
                    return FormulasBuffer.Instance.readArrayBuffer(br);
                case "GameArchiveData":
                    return GameArchiveDataBuffer.Instance.readArrayBuffer(br);
                case "ItemBase":
                    return ItemBaseBuffer.Instance.readArrayBuffer(br);
                case "ItemData":
                    return ItemDataBuffer.Instance.readArrayBuffer(br);
                case "LevelBase":
                    return LevelBaseBuffer.Instance.readArrayBuffer(br);
                case "MainBase":
                    return MainBaseBuffer.Instance.readArrayBuffer(br);
                case "RoleBase":
                    return RoleBaseBuffer.Instance.readArrayBuffer(br);
                case "RoleData":
                    return RoleDataBuffer.Instance.readArrayBuffer(br);
                case "ServerUserData":
                    return ServerUserDataBuffer.Instance.readArrayBuffer(br);
                case "SeverConfigBase":
                    return SeverConfigBaseBuffer.Instance.readArrayBuffer(br);
                case "SeverData":
                    return SeverDataBuffer.Instance.readArrayBuffer(br);
                case "SkinBase":
                    return SkinBaseBuffer.Instance.readArrayBuffer(br);
                case "test":
                    return testBuffer.Instance.readArrayBuffer(br);
                case "ThemeBase":
                    return ThemeBaseBuffer.Instance.readArrayBuffer(br);
                case "TimeEvent":
                    return TimeEventBuffer.Instance.readArrayBuffer(br);
                case "UploadIpfsData":
                    return UploadIpfsDataBuffer.Instance.readArrayBuffer(br);
                case "UserDataBase":
                    return UserDataBaseBuffer.Instance.readArrayBuffer(br);
                case "UserVarBase":
                    return UserVarBaseBuffer.Instance.readArrayBuffer(br);
                case "WalletErrLog":
                    return WalletErrLogBuffer.Instance.readArrayBuffer(br);
                case "WalletLog":
                    return WalletLogBuffer.Instance.readArrayBuffer(br);
                case "TipInfo":
                    return TipInfoBuffer.Instance.readArrayBuffer(br);

          }
          return null;
    }
}