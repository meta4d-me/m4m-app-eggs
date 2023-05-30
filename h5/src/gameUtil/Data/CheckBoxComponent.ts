@m4m.reflect.node2DComponent
export class CheckBoxComponent extends m4m.framework.behaviour2d {
    public checkType: CheckType = CheckType.Default;
    public btn: m4m.framework.button;
    public callBackFun: Function;
    //勾选状态
    private _checkState: boolean = false;
    private assetMgr: m4m.framework.assetMgr;
    private image: m4m.framework.image2D;
    private baseName: string;
    private iconSprStr: string = ".atlas.json_";
    public onPlay() {
        //
        this.btn = this.transform.addComponent("button") as m4m.framework.button;
        this.btn.addListener(m4m.event.UIEventEnum.PointerClick, this.btnClick_event, this);

        this.init();
    }

    public set value(value: boolean) {
        if (this._checkState == value) {
            return;
        }
        this._checkState = value;
        let iconState = 0;
        if (value) {
            iconState = 1;
        }
        this.init();
        let spriteIcon = this.assetMgr.getAssetByName(this.baseName + iconState) as m4m.framework.sprite;
        this.image.sprite = spriteIcon;

        if (this.callBackFun) {
            this.callBackFun(this._checkState);
        }
    }
    public get value(): boolean {
        return this._checkState;
    }
    //按钮 点击
    public btnClick_event() {
        if (this.checkType == CheckType.Default) {
            this.value = !this._checkState;
        } else {
            if (this._checkState == false) {
                this.value = !this._checkState;
            }
        }
    }

    private init() {
        if (this.baseName == null) {
            this.assetMgr = m4m.framework.sceneMgr.app.getAssetMgr();
            this.image = this.transform.getComponent("image2D") as m4m.framework.image2D;

            let nameArr = this.transform.name.split("_");
            let iconName = nameArr[0];
            //.atlas.json
            this.baseName = (this.image["_spriteName"] as string);
            let index = this.baseName.indexOf(this.iconSprStr);
            if (index != -1) {
                let uiName = this.baseName.substring(0, index + this.iconSprStr.length);
                this.baseName = uiName + iconName;
                // console.error(a + iconName);
            } else {
                console.error("CheckBoxComponent 组件取图片名出错！");
                return;
            }
            let lastOne = this.baseName[this.baseName.length - 1];
            this.baseName = isNaN(Number(lastOne)) ? this.baseName : this.baseName.substring(0, this.baseName.length - 1);
            //默认不勾选
            let spriteIcon = this.assetMgr.getAssetByName(this.baseName + 0) as m4m.framework.sprite;
            this.image.sprite = spriteIcon;
        }
    }
}

export enum CheckType {
    Default = 1,//默认
    Special = 2,//特殊
}