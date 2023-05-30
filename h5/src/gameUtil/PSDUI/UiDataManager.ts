import { cMap } from "../Data/Map";
export class UiDataManager {
    private static uiLabelBinders: cMap<labelBinder[]> = new cMap<labelBinder[]>();

    /**清除所有Label绑定 */
    public static clearAllBindLabels() {
        this.uiLabelBinders.clear();
    }
    /**
     * 清除指定绑定名下所有Label绑定
     * @param bindName 绑定名
     */
    public static clearBindLabels(bindName: string) {
        this.uiLabelBinders.delete(bindName);
    }
    /**
     * 将已有的绑定信息加入Label绑定列表
     * @param binder 绑定信息
     */
    public static addBindLabl(binder: labelBinder) {
        if (!binder) { return null; }
        let links = this.uiLabelBinders.get(binder.linkName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkLabel == binder.linkLabel) {
                    console.error(element.linkName + " 当前Label 已绑定 不需要重复绑定！方法 addBindLabl");
                    return null;
                }
            }
            links.push(binder);
        } else {
            let newLinks: labelBinder[] = [];
            newLinks.push(binder);
            this.uiLabelBinders.set(binder.linkName, newLinks);
        }
    }
    /**
     * 添加一个新的Label绑定
     * @param bindName 绑定变量名
     * @param bindlabel 绑定的label组件
     * @param bindText 绑定的文字结构（文字中 {0} 作为标识，{0} 会替换为被绑定的数据，如果没有 {0} 则会将被绑定的数据添加到最后，如果不指定就全部替换为被绑定的数据）
     * @returns 绑定信息
     */
    public static bindLabelData(bindName: string, bindlabel: m4m.framework.label, bindText: string = "") {
        if (!bindlabel) { return null; }
        let links = this.uiLabelBinders.get(bindName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkLabel == bindlabel) {
                    console.error(bindName + " 当前Label 已绑定 不需要重复绑定！");
                    return null;
                }
            }
        }
        let linker = new labelBinder();
        linker.linkName = bindName;
        linker.linkLabel = bindlabel;
        if (!bindText) {
            linker.linkText = "{0}";
        } else if (bindText.indexOf("{0}") == -1) {
            linker.linkText = bindText + "{0}";
        } else {
            linker.linkText = bindText;
        }
        if (links) {
            links.push(linker);
        } else {
            let newLink: labelBinder[] = [];
            newLink.push(linker);
            this.uiLabelBinders.set(bindName, newLink);
        }
        return linker;
    }

    private static needUnBindLabelList = [];
    /**
     * 修改Label信息
     * @param bindName 绑定变量名
     * @param text 传入信息
     */
    public static changeLabelData(bindName: string, text: string) {
        let links = this.uiLabelBinders.get(bindName);
        this.needUnBindLabelList.length = 0;
        if (links && links.length > 0) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkLabel && element.linkLabel.transform && element.linkText) {
                    element.linkLabel.text = element.linkText.replace("{0}", text);
                    element.linkLabel.transform.markDirty();
                } else {
                    this.needUnBindLabelList.push(element);
                }
            }
        }
        for (let i = 0; i < this.needUnBindLabelList.length; i++) {
            let element = this.needUnBindLabelList[i];
            if (element) {
                this.unBindLabelDataByBinder(element);
            }
        }
        this.needUnBindLabelList.length = 0;
    }
    /**
     * 清除一个Label绑定
     * @param binder 绑定信息
     */
    public static unBindLabelDataByBinder(binder: labelBinder) {
        if (!binder) {
            console.error(binder + " 解绑 Label 出错！");
            return;
        }
        let links = this.uiLabelBinders.get(binder.linkName);
        if (links) {
            let index = links.indexOf(binder);
            if (index != -1) {
                links.splice(index, 1);
            }
        }
    }
    /**
     * 清除一个Label绑定
     * @param bindName 绑定变量名
     */
    public static unBindLabelData(bindName: string, bindlabel: m4m.framework.label) {
        if (!bindlabel) {
            console.error("解绑 Label 出错！");
            return;
        }
        let links = this.uiLabelBinders.get(bindName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkLabel == bindlabel) {
                    links.splice(i, 1);
                    return;
                }
            }
        }
        console.error(bindName + " 当前需要解绑Label 未找到！");
    }

    private static uiTranBinders: cMap<tran2DBinder[]> = new cMap<tran2DBinder[]>();
    /**清除所有Tran绑定 */
    public static clearAllBindTrans() {
        this.uiTranBinders.clear();
    }
    /**
     * 清除指定绑定名下所有Tran绑定
     * @param bindName 绑定名
     */
    public static clearBindTrans(bindName: string) {
        this.uiTranBinders.delete(bindName);
    }
    /**
     * 将已有的绑定信息加入Tran绑定列表
     * @param binder 绑定信息
     */
    public static addBindTrans(binder: tran2DBinder) {
        if (!binder) { return null; }
        let links = this.uiTranBinders.get(binder.linkName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkTran == binder.linkTran) {
                    console.error(element.linkName + " 当前trans 已绑定 不需要重复绑定！方法 addBindTrans");
                    return null;
                }
            }
            links.push(binder);
        } else {
            let newLinks: tran2DBinder[] = [];
            newLinks.push(binder);
            this.uiTranBinders.set(binder.linkName, newLinks);
        }
    }
    /**
     * 添加一个新的Tran绑定
     * @param bindName 绑定变量名
     * @param bindTran 绑定的trans组件
     * @returns 绑定信息
     */
    public static bindTransData(bindName: string, bindTran: m4m.framework.transform2D) {
        if (!bindTran) { return null; }
        let links = this.uiTranBinders.get(bindName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkTran == bindTran) {
                    console.error(bindName + " 当前trans 已绑定 不需要重复绑定！");
                    return null;
                }
            }
        }
        let linker = new tran2DBinder();
        linker.linkName = bindName;
        linker.linkTran = bindTran;
        if (links) {
            links.push(linker);
        } else {
            let newLink: tran2DBinder[] = [];
            newLink.push(linker);
            this.uiTranBinders.set(bindName, newLink);
        }
        return linker;
    }
    private static needUnBindTransList = [];
    /**
     * 修改Tran信息
     * @param bindName 绑定变量名
     * @param isVisible 是否显示
     */
    public static changeTransData(bindName: string, isVisible: boolean) {
        let links = this.uiTranBinders.get(bindName);
        this.needUnBindTransList.length = 0;
        if (links && links.length > 0) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element) {
                    element.linkTran.visible = isVisible;
                } else {
                    this.needUnBindTransList.push(element);
                }
            }
        }
        for (let i = 0; i < this.needUnBindTransList.length; i++) {
            let element = this.needUnBindTransList[i];
            if (element) {
                this.unBindTransDataByBinder(element);
            }
        }
        this.needUnBindTransList.length = 0;
    }
    /**
     * 清除一个Tran绑定
     * @param binder 绑定信息
     */
    public static unBindTransDataByBinder(binder: tran2DBinder) {
        if (!binder) {
            console.error(binder + " 解绑 Trans 出错！");
            return;
        }
        let links = this.uiTranBinders.get(binder.linkName);
        if (links) {
            let index = links.indexOf(binder);
            if (index != -1) {
                links.splice(index, 1);
            }
        }
    }
    /**
     * 清除一个Trans绑定
     * @param bindName 绑定变量名
     */
    public static unBindTransData(bindName: string, bindTran: m4m.framework.transform2D) {
        if (!bindTran) {
            console.error("解绑 Trans 出错！");
            return;
        }
        let links = this.uiTranBinders.get(bindName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkTran == bindTran) {
                    links.splice(i, 1);
                    return;
                }
            }
        }
        console.error(bindName + " 当前需要解绑Trans 未找到！");
    }

    private static functionBinders: cMap<FunctionBinder[]> = new cMap<FunctionBinder[]>();
    /**清除所有Function绑定 */
    public static clearAllBindFunction() {
        this.functionBinders.clear();
    }
    /**
     * 清除指定绑定名下所有Function绑定
     * @param bindName 绑定名
     */
    public static clearBindFunction(bindName: string) {
        this.functionBinders.delete(bindName);
    }
    /**
     * 将已有的绑定信息加入Function绑定列表
     * @param binder 绑定信息
     */
    public static addBindFunction(binder: FunctionBinder) {
        if (!binder) { return null; }
        let links = this.functionBinders.get(binder.linkName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkFun == binder.linkFun) {
                    console.error(element.linkName + " 当前Function 已绑定 不需要重复绑定！方法 addBindFunction");
                    return null;
                }
            }
            links.push(binder);
        } else {
            let newLinks: FunctionBinder[] = [];
            newLinks.push(binder);
            this.functionBinders.set(binder.linkName, newLinks);
        }
    }
    /**
     * 添加一个新的Function绑定
     * @param bindName 绑定变量名
     * @param fun function
     * @returns 绑定信息
     */
    public static bindFunctionData(bindName: string, fun: Function) {
        if (!fun) { return null; }
        let links = this.functionBinders.get(bindName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkFun == fun) {
                    console.error(bindName + " 当前Function 已绑定 不需要重复绑定！");
                    return null;
                }
            }
        }
        let linker = new FunctionBinder();
        linker.linkName = bindName;
        linker.linkFun = fun;
        if (links) {
            links.push(linker);
        } else {
            let newLink: FunctionBinder[] = [];
            newLink.push(linker);
            this.functionBinders.set(bindName, newLink);
        }
        return linker;
    }
    private static needUnBindFunctionList = [];
    /**
     * 修改Function信息
     * @param bindName 绑定变量名
     * @param data 
     */
    public static changeFunctionData(bindName: string, data: any) {
        let links = this.functionBinders.get(bindName);
        this.needUnBindFunctionList.length = 0;
        if (links && links.length > 0) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkFun) {
                    element.linkFun(data);
                } else {
                    this.needUnBindFunctionList.push(element);
                }
            }
        }
        for (let i = 0; i < this.needUnBindFunctionList.length; i++) {
            let element = this.needUnBindFunctionList[i];
            if (element) {
                this.unBindFunctionDataByBinder(element);
            }
        }
        this.needUnBindFunctionList.length = 0;
    }
    /**
     * 清除一个Function绑定
     * @param binder 绑定信息
     */
    public static unBindFunctionDataByBinder(binder: FunctionBinder) {
        if (!binder) {
            console.error(binder + " 解绑 function 出错！");
            return;
        }
        let links = this.functionBinders.get(binder.linkName);
        if (links) {
            let index = links.indexOf(binder);
            if (index != -1) {
                links.splice(index, 1);
            }
        }
    }

    /**
     * 清除一个Function绑定
     * @param bindName 绑定变量名
     */
    public static unBindFunctionData(bindName: string, fun: Function) {
        if (!fun) {
            console.error("解绑 function 出错！");
            return;
        }
        let links = this.functionBinders.get(bindName);
        if (links) {
            for (let i = 0; i < links.length; i++) {
                let element = links[i];
                if (element && element.linkFun == fun) {
                    console.log(links.length);
                    links.splice(i, 1);
                    console.log("解绑 function 成功！" + links.length);
                    return;
                }
            }
        }
        console.error(bindName + " 当前需要解绑Function 未找到！");
    }
}
// tslint:disable-next-line: class-name
export class labelBinder {
    public linkName = "";
    public linkText = "";
    public linkLabel: m4m.framework.label;
}
// tslint:disable-next-line: class-name
export class tran2DBinder {
    public linkName = "";
    public linkTran: m4m.framework.transform2D;
}

export class FunctionBinder {
    public linkName = "";
    public linkFun: Function;
}