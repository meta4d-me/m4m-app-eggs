import { UiManager } from "PSDUI/UiManager";

export class TipsManager {
    public static get Instance(): TipsManager {
        if (this._instance == null) {
            this._instance = new TipsManager();
        }
        return this._instance;
    }
    public static descTips: string;
    public static tipsbool: boolean;
    private static _instance: TipsManager;

    public static ShowTips(desc: string, bool = false) {
        this.descTips = desc;
        this.tipsbool = bool;
        UiManager.showUi("Tips");
    }
}