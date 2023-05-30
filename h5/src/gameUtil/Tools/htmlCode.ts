import { UiManager } from "../PSDUI/UiManager";

// tslint:disable-next-line: class-name
export class htmlCode {
    public static runCode() {
        let urlCode: string = window["urlCode"];
        if (!urlCode) {
            console.error("没有指令");
            return;
        }
        let codeList = urlCode.split("=");
        let order = codeList[0].toLowerCase();
        switch (order) {
            case "showui":
                if (codeList.length < 2) {
                    console.error("指令错误");
                    return;
                }
                UiManager.showUi(codeList[1]);
                return;

            default:
                console.error("指令错误");
                return;
        }
    }
}