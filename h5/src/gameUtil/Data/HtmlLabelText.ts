import { commTool } from "../Tools/commTool";
import { cMap } from "./Map";

export class HtmlLabelText {
    public textList: HtmlLabelData[] = [];
    public transform: m4m.framework.transform2D;
    //可设置行间距
    public linespace: number = 0;

    constructor(parentTrans: m4m.framework.transform2D, lab: m4m.framework.label = null) {
        this.transform = new m4m.framework.transform2D();
        this._list = new Array<m4m.framework.transform2D>();

        this.parentTrans = parentTrans;
        this.parentTrans.addChild(this.transform);
        if (lab) {
            this.labSize = lab.fontsize;
            // console.error("HtmlLabelText ", this.labSize);
        }
    }
    private static fontStart: string = "<font";
    private static fontEnd: string = "</font>";
    private static fontTagEnd: string = ">";
    private static fontTagList: HtmlTagData[];

    private static imageStart: string = "[img]";
    private static imageEnd: string = "[/img]";
    private static imageTagList: HtmlTagData[];
    private labSize: number = 0;
    private baseList: HtmlLabelBaseData[] = [];
    //中转
    private transitList: HtmlLabelData[] = [];
    private lineDic: cMap<m4m.framework.transform2D> = new cMap();
    private _list: m4m.framework.transform2D[];
    private parentTrans: m4m.framework.transform2D;
    private endNum: number = 0;

    //font 标签数据
    private static getFontTagDataFun() {
        if (this.fontTagList == null) {
            this.fontTagList = [];
            let fontTag = new HtmlTagData();
            fontTag.tagStart = "<font";
            fontTag.tagEnd = "</font>";
            fontTag.titleTagEnd = ">";
            this.fontTagList.push(fontTag);

            let colorTag = new HtmlTagData();
            colorTag.tagStart = "[color";
            colorTag.tagEnd = "[/color]";
            colorTag.titleTagEnd = "]";
            this.fontTagList.push(colorTag);
        }
        return this.fontTagList;
    }

    //image 标签数据
    private static getImageTagDataFun() {
        if (this.imageTagList == null) {
            this.imageTagList = [];
            let imageTag = new HtmlTagData();
            imageTag.tagStart = "[img]";
            imageTag.tagEnd = "[/img]";
            imageTag.titleTagEnd = "";
            this.imageTagList.push(imageTag);

            // let colorTag = new HtmlTagData();
            // colorTag.tagStart = "[color";
            // colorTag.tagEnd = "[/color]";
            // colorTag.titleTagEnd = "]";
            // this.imageTagList.push(colorTag);
        }
        return this.imageTagList;
    }

    public setText(str: string) {
        // tslint:disable-next-line: max-line-length
        // str = "00000<font color='#00FF00'>111111水的力量，<font color='#00FF00'>222222立即获得<font color='#00FF00'>333333 120分钟</font></font>444444的</font>555555必须要有这句<font color='#00FF00'><font color='#00FF00'>666666挂机收益</font>777777这</font>8888888这这<font color='#00FF00'>9999999是测试文本</font>AAA结尾\n(玩家经验除外)<font color='#00FF00'><font color='#00FF00'>BBB挂机收益</font>CCC这</font>DDD这这<font color='#00FF00'>EEE是测试文本</font>FFF";
        // tslint:disable-next-line: no-parameter-reassignment
        //str = "[color=#ffbf6d]穿戴[img]ui://f86p4w0vosq7l3g51h[/img]4件套装激活效果，[img]ui://f86p4w0vosq7l3g51h[/img]攻击+8%，生命+8%[/color]";
        let fontTagList = HtmlLabelText.getFontTagDataFun();
        //获取字体标签相应数据
        for (let i = 0; i < fontTagList.length; i++) {
            let tagData: HtmlTagData = fontTagList[i];
            if (str.indexOf(tagData.tagStart) != -1) {
                HtmlLabelText.fontStart = tagData.tagStart;
                HtmlLabelText.fontEnd = tagData.tagEnd;
                HtmlLabelText.fontTagEnd = tagData.titleTagEnd;
                break;
            }
        }

        let imageTagList = HtmlLabelText.getImageTagDataFun();
        //获取字体标签相应数据
        for (let i = 0; i < imageTagList.length; i++) {
            let tagData: HtmlTagData = imageTagList[i];
            if (str.indexOf(tagData.tagStart) != -1) {
                HtmlLabelText.imageStart = tagData.tagStart;
                HtmlLabelText.imageEnd = tagData.tagEnd;
                // HtmlLabelText.fontTagEnd = tagData.titleTagEnd;
                break;
            }
        }
        this.clear();
        let lineArr = str.split("\n");//处理换行
        for (let i = 0; i < lineArr.length; i++) {
            let text = lineArr[i];
            // console.error(text);
            this.splitStrText(text, i);
        }
        //提取文本属性 font
        this.extractTextAttr();
        this.baseList.length = 0;
        console.error(this.transitList);
        this.extractImageAttr();
        this.transitList.length = 0;
        console.error(this.textList);
        this.create();
    }

    //提取图片属性
    public extractImageAttr() {
        for (let i: number = 0; i < this.transitList.length; i++) {
            let labelData: HtmlLabelData = this.transitList[i];
            // labelData.text
            if (labelData.text.indexOf(HtmlLabelText.imageStart) != -1) {
                this.extractImageAttrFun(labelData.text, labelData.line, labelData.color);
                labelData.dispose();
            } else {
                this.textList.push(labelData);
            }
        }
    }

    //提取图片属性**
    public extractImageAttrFun(str: string, line: number, color: m4m.math.color) {
        let startIndex: number = str.indexOf(HtmlLabelText.imageStart);
        if (startIndex != -1) {
            let headText: string;
            let end: number;
            if (startIndex == 0) {
                let endIndex: number = str.indexOf(HtmlLabelText.imageEnd);
                if (endIndex == -1) {
                    console.error("extractImageAttrFun 当前html 标签出错！！！");
                    return;
                }
                end = endIndex + HtmlLabelText.imageEnd.length;
            } else {
                end = startIndex;
            }
            headText = str.substring(0, end);
            // console.error(startIndex + "  " + end);
            let bodyText = str.substring(end);
            console.log(str);
            console.warn("图片1 ", headText);
            console.warn("图片2 ", bodyText);
            if (headText.length > 0) {
                console.error("********* ", headText);
                let imageIndex: number = headText.indexOf(HtmlLabelText.imageStart);
                if (imageIndex != -1) {
                    // 如果是图片
                    let imageName: string = this.getImageNameFun(headText);
                    this.addImageData(imageName, line, color);
                } else {
                    this.addTextData(headText, line, color);
                }
            }
            if (bodyText.length > 0) {
                // console.error("bodyText  ", bodyText);
                this.extractImageAttrFun(bodyText, line, color);
            }
        } else {
            console.error("*********end ", str);
            this.addTextData(str, line, color);
        }
    }

    //提取文本属性
    public extractTextAttr() {
        // let aa = "<font color='#00ff00'>水的力量，<font color='#000066'>立即获得<font color='#00CC00'>120分钟</font></font>的</font>";
        // this.extractTextAttrFun(aa, HtmlLabelText.fontStart.length, 0);
        for (let i: number = 0; i < this.baseList.length; i++) {
            let labelData: HtmlLabelBaseData = this.baseList[i];
            console.error("提取文本属性 ", labelData.text);

            let startIndex: number = labelData.text.indexOf(HtmlLabelText.fontStart);
            if (startIndex != -1) {
                startIndex += HtmlLabelText.fontStart.length;
            } else {
                startIndex = HtmlLabelText.fontStart.length;
            }
            this.extractTextAttrFun(labelData.text, startIndex, labelData.line);
        }
    }

    //提取文本属性**
    public extractTextAttrFun(str: string, index: number, line: number) {
        let startIndex: number = str.indexOf(HtmlLabelText.fontStart, index);
        if (startIndex != -1) {
            let headText = str.substring(0, startIndex);

            console.error("headText ", headText);
            let text: string = this.getTexFun(headText);
            let color = this.getTextColorFun(headText);

            this.addTransitTextData(text, line, color);
            let endIndex = str.lastIndexOf(HtmlLabelText.fontEnd);
            if (endIndex != -1) {
                //内文本
                let withinText = str.substring(startIndex, endIndex);
                console.warn("withinText ", withinText);
                //如果内部文本还有 标签
                let withinIndex = withinText.lastIndexOf(HtmlLabelText.fontEnd);
                if (withinIndex != -1) {
                    this.extractTextAttrFun(withinText, HtmlLabelText.fontStart.length, line);
                    let endText = withinText.substring(withinIndex + HtmlLabelText.fontEnd.length);
                    let texted: string = this.getTexFun(endText);
                    console.error("endText ", endText, color);
                    this.addTransitTextData(texted, line, color);
                }
            }
        } else {
            startIndex = str.indexOf(HtmlLabelText.fontStart);
            if (startIndex != -1) {
                console.warn("单文本标签 withinText ", str);
                let withinIndex = str.lastIndexOf(HtmlLabelText.fontEnd);
                if (withinIndex != -1) {
                    let endText = str.substring(0, withinIndex);
                    console.error("单文本标签 Text ", endText);
                    let text: string = this.getTexFun(endText);
                    console.error("单文本标签 Text2 ", text);
                    let color = this.getTextColorFun(endText);
                    this.addTransitTextData(text, line, color);
                }
            } else {
                this.addTransitTextData(str, line, null);
            }
        }
    }

    public splitStrText(str: string, line: number) {
        if (str.length <= 0) {
            return;
        }
        let startIndex: number = str.indexOf(HtmlLabelText.fontStart);
        if (startIndex != -1) {
            this.endNum = -1;
            let aaaaaa = str.substring(startIndex);
            this.detectionTextFun(aaaaaa, HtmlLabelText.fontStart.length);

            // console.error("endNum", this.endNum);

            let end: number;
            if (this.endNum != -1) {
                end = startIndex + this.endNum + HtmlLabelText.fontEnd.length;
            } else {
                let endIndex: number = str.indexOf(HtmlLabelText.fontEnd);
                if (endIndex == -1) {
                    console.error("当前html 标签出错！！！");
                    return;
                }
                end = endIndex + HtmlLabelText.fontEnd.length;
            }
            let headText = str.substring(0, end);
            // console.error(startIndex + "  " + end);
            let bodyText = str.substring(end);
            console.log(str);
            console.warn("文本1 ", headText);
            console.warn("文本2 ", bodyText);
            if (headText.length > 0) {
                // console.error("********* ", headText);
                let headStartIndex: number = headText.indexOf(HtmlLabelText.fontStart);
                //截取开头文本
                if (headStartIndex != -1) {//截取开头文本
                    let headTitleText = headText.substring(0, headStartIndex);
                    if (headTitleText && headTitleText.length > 0) {
                        this.baseList.push(this.getTextBaseData(headTitleText, line));
                    }
                    let bodyTitleText = headText.substring(headStartIndex);
                    this.baseList.push(this.getTextBaseData(bodyTitleText, line));
                } else {
                    this.baseList.push(this.getTextBaseData(headText, line));
                }

                //截取结尾文本
                let endIndex: number = headText.lastIndexOf(HtmlLabelText.fontEnd);
                if (endIndex != -1) {//截取结尾文本
                    let endText = headText.substring(endIndex + HtmlLabelText.fontEnd.length);
                    if (endText && endText.length > 0) {
                        this.baseList.push(this.getTextBaseData(endText, line));
                    }
                }
            }
            if (bodyText.length > 0) {
                // console.error(bodyText);
                this.splitStrText(bodyText, line);
            }
            // 
        } else {
            // console.error("$$$$$$$ ", str);
            this.baseList.push(this.getTextBaseData(str, line));
        }
    }

    public detectionTextFun(str: string, index: number) {
        let startIndex: number = str.indexOf(HtmlLabelText.fontStart, index);
        if (startIndex != -1) {
            let aaaaaa = str.substring(0, startIndex);
            // console.error("检测文本  ", aaaaaa);
            let endIndex = aaaaaa.lastIndexOf(HtmlLabelText.fontEnd);
            if (endIndex != -1) {
                this.endNum = endIndex;
                // console.error("找到当前 end 标签 " + endIndex);
            } else {
                this.detectionTextFun(str, startIndex + HtmlLabelText.fontStart.length);
            }
        }
    }

    //图片数据
    public addImageData(imageName: string, line: number, color: m4m.math.color) {
        if (imageName && imageName.length > 0) {
            this.textList.push(this.getImageData(imageName, line, color));
        }
    }

    //文本数据
    public addTextData(str: string, line: number, color: m4m.math.color) {
        if (str && str.length > 0) {
            this.textList.push(this.getTextData(str, line, color));
        }
    }

    //存储 临时文本
    public addTransitTextData(str: string, line: number, color: m4m.math.color) {
        if (str && str.length > 0) {
            this.transitList.push(this.getTextData(str, line, color));
        }
    }

    public clear() {
        this._list.length = 0;
        this.lineDic.clear();
        this.baseList.length = 0;
        this.transitList.length = 0;
        for (let i: number = 0; i < this.textList.length; i++) {
            let labelData: HtmlLabelData = this.textList[i];
            labelData.dispose();
        }
        this.textList.length = 0;
        this.transform.removeAllChild();
    }
    public dispose() {
        this.clear();
        this._list = null;
        this.baseList = null;
        this.transitList = null;
        this.textList = null;
    }
    //取图片
    private getImageNameFun(text: string) {
        let str: string;
        let index = text.indexOf(HtmlLabelText.imageStart);
        if (index != -1) {
            str = text.substring(index + HtmlLabelText.imageStart.length);
            let endIndex = str.indexOf(HtmlLabelText.imageEnd);
            if (endIndex != -1) {
                str = str.substring(0, endIndex);
            }
        } else {
            console.error("转入的图片数据出错!");
        }
        return str;
    }

    //取文本
    private getTexFun(text: string) {
        let str: string;
        let index = text.indexOf(HtmlLabelText.fontTagEnd);
        if (index != -1) {
            str = text.substring(index + 1);
        } else {
            str = text;
        }
        return str;
    }

    private getTextColorFun(text: string) {
        let color: m4m.math.color;
        let colorStr: string;
        let colorIndex = text.indexOf("color");
        if (colorIndex != -1) {
            colorStr = text.substring(colorIndex + 5);
            let jinIndex = colorStr.indexOf("#");
            if (jinIndex != -1) {
                colorStr = colorStr.substring(jinIndex + 1);
            }
            let endIndex = colorStr.indexOf(HtmlLabelText.fontTagEnd);
            if (endIndex != -1) {
                colorStr = colorStr.substring(0, endIndex);
            }
            colorStr = colorStr.replace("'", "");
            color = m4m.poolcolor();
            commTool.color16To10(colorStr, color);
        }
        return color;
    }

    private getImageData(imageName: string, line: number, color: m4m.math.color) {
        let data = new HtmlLabelData();
        data.imageName = imageName;
        data.line = line;
        data.color = color;
        return data;
    }

    private getTextData(str: string, line: number, color: m4m.math.color) {
        let data = new HtmlLabelData();
        data.text = str;
        data.line = line;
        data.color = color;
        return data;
    }

    private getTextBaseData(str: string, line: number) {
        let data = new HtmlLabelBaseData();
        data.text = str;
        data.line = line;
        return data;
    }
    private create(): void {
        let lineWW: number = 0;
        let lineHH: number = 0;
        let line: number = 0;
        for (let i: number = 0; i < this.textList.length; i++) {
            let labelData: HtmlLabelData = this.textList[i];
            if (labelData.text == "" || labelData.text == null) {
                continue;
            }
            let lineTrans: m4m.framework.transform2D;
            if (!this.lineDic.has(labelData.line)) {
                lineTrans = new m4m.framework.transform2D();
                this.lineDic.set(labelData.line, lineTrans);
                this.transform.addChild(lineTrans);
            }
            if (lineTrans == null) {
                lineTrans = this.lineDic.get(labelData.line);
            }
            let labelClass: m4m.framework.label = this.getLabel();
            labelClass.text = labelData.text;
            if (labelData.color) {
                labelClass.color = labelData.color;
            }
            labelClass.horizontalOverflow = true;
            // labelClass.verticalType = m4m.framework.VerticalType.Top;
            if (this.labSize > 0) {
                labelClass.fontsize = this.labSize;
            } else {
                labelClass.fontsize = 24;
            }
            labelClass.fontsize = 14;
            let labTrans: m4m.framework.transform2D = labelClass.transform;
            lineTrans.addChild(labTrans);
            // lineTrans.width = 200;
            // lineTrans.height = 200;
            // lineTrans.markDirty();

            let lab = labelClass;
            //--------刷新 getDrawBounds ------
            this.transform.updateTran(true);
            lab.getMaterial();
            lab.updateData(lab.font);
            //--------------------------------
            let rect = lab.getDrawBounds();
            let labww = rect.w;
            let labhh = rect.h;
            labTrans.width = labww;
            labTrans.height = labhh;

            if (line != labelData.line) {
                lineWW = 0;
                lineHH += labhh + this.linespace;
            }
            line = labelData.line;
            labTrans.setLayoutValue(m4m.framework.layoutOption.LEFT, lineWW);
            labTrans.setLayoutValue(m4m.framework.layoutOption.TOP, lineHH);
            labTrans.markDirty();

            lineWW += labww;
            //行 trans
            lineTrans.width = labww;
            lineTrans.height = labhh;
            lineTrans.markDirty();
            console.error(labelData.text, labww, labhh);

            this._list.push(labTrans);

        }
        this.transform.width = 200;
        this.transform.height = 50;
        this.transform.markDirty();

    }

    private getLabel() {
        let trans = new m4m.framework.transform2D();
        let lab = trans.addComponent("label") as m4m.framework.label;
        trans.layoutState = m4m.framework.layoutOption.LEFT | m4m.framework.layoutOption.TOP;
        return lab;
    }
}

export class HtmlLabelBaseData {
    public text: string;
    public line: number;
}
export class HtmlLabelData extends HtmlLabelBaseData {
    public imageName: string;
    public color: m4m.math.color;
    public x: number;
    public y: number;
    public dispose() {
        if (this.color) {
            m4m.poolcolor_del(this.color);
            // this.color = null;
        }
    }
}

export class HtmlTagData {
    public tagStart: string;
    public tagEnd: string;
    public titleTagEnd: string;
}