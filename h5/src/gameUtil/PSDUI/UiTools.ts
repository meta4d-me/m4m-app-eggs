export class UiTools {

    public static cloneUi<T>(old: T): T {
        return this.cloneUiClass(old, true) as T;
    }
    private static cloneUiClass(old, isFirstTran, tranName = "", parentTran: m4m.framework.transform2D = null) {
        let newObj = new Object();
        if (isFirstTran && old["transform"]) {
            newObj["transform"] = old["transform"].clone();
        }
        if (!isFirstTran && parentTran) {
            for (let i = 0; i < parentTran.children.length; i++) {
                let tran = parentTran.children[i];
                if (tran.name == tranName) {
                    newObj["transform"] = tran;
                    break;
                }
            }
        }
        let proList = Object.getOwnPropertyNames(old);
        for (let index = 0; index < proList.length; index++) {
            let compName = proList[index];
            switch (compName) {
                case "transform":
                    break;
                case "image":
                    newObj["image"] = newObj["transform"].getComponent("image2D");
                    break;
                case "label":
                    newObj["label"] = newObj["transform"].getComponent("label");
                    break;
                case "button":
                    newObj["button"] = newObj["transform"].getComponent("button");
                    break;
                case "rawImage2D":
                    newObj["rawImage2D"] = newObj["transform"].getComponent("rawImage2D");
                    break;
                case "progressbar":
                    newObj["progressbar"] = newObj["transform"].getComponent("progressbar");
                    break;
                case "scrollRect":
                    newObj["scrollRect"] = newObj["transform"].getComponent("scrollRect");
                    break;
                case "inputField":
                    newObj["inputField"] = newObj["transform"].getComponent("inputField");
                    break;
                default:
                    newObj[compName] = this.cloneUiClass(old[compName], false, compName, newObj["transform"]);
            }
        }
        return newObj;

    }
}