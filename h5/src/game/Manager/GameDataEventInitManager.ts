import { GameArchiveManager } from "./GameArchiveManager";
import { UIOpenOrHideManager } from "./UIOpenOrHideManager";
import { UserDataManager } from "./UserDataManager";
export class GameDataEventInitManager {
    public static init() {
        UserDataManager.Instance.init();
        GameArchiveManager.Instance.init();
        UIOpenOrHideManager.Instance.init();
    }
}