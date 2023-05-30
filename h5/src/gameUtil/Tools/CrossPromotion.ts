declare var wx: any;
declare var GameGlobal: any;

// tslint:disable-next-line: interface-name
export interface CrossPromotionEntity {
    /**
     * URLs of images for the entity to be displayed in GIF-like animation
     */
    frames: string[];
    /**
     * app id
     */
    appId: string;
    /**
     * URL of image for the entity to be displayed in static image
     */
    icon: string;
    /**
     * URL of Qrcode for the entity 
     */
    qrcode: string;
    /**
     * code name of the mini game.
     */
    appCode: string;
    /**
     * weight is the chance of the entity to be displayed when we need to display entities ramdomly.
     */
    weight: number;
    /**
     * localized name of the entity. use zh for simplified Chinese.
     */
    displayName: { [key: string]: string };
}

export class CrossPromotion {

    /**
     * flag if we should highlight crosspromotion button. For example add a red dot beside the button.
     */
    get displayDot(): boolean {
        return this._displayDot;
    }

    /**
     * URL of the config file. You can change it before init for test purpose
     */
    public configUrl = "https://umc-static-content.upaidui.com/crosspromotion/cp_config.json";
    private popupEntities: CrossPromotionEntity[] = [];

    private crossEntities: CrossPromotionEntity[] = [];

    private cachedIndex: number = -1;

    private entryName: string;

    private _displayDot: boolean = false;

    private inited = false;

    /**
     * fetch the config file from CDN
     * @param entryName entity name of current game
     */
    public init(entryName: string): Promise<any> {
        this.entryName = entryName;
        return new Promise((resolve, reject) => {
            if (!this.entryName) {
                console.error("entryName is not defined in CrossPromotion");
                reject();
                return;
            }

            if (this.inited) {
                resolve(null);
                return;
            }

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status === 200) {
                        this.parseResponse(JSON.parse(xhr.responseText));
                        this.inited = true;
                        resolve(null);
                    } else {
                        reject();
                    }
                }
            };
            xhr.open("GET", this.configUrl, true);
            xhr.send();
        });
    }

    /**
     * navigate to the mini program of the entity. If the mini program is not whitelisted, it will use QRCode.
     * this function will also record events on talkingdata if talkingdata is integrated.
     * @param entity the entity of the target mini game.
     * @param type the source's type.  cross means it comes from a GIF-like animation(using frames in entity to display the target entity)
     * @param params additional parameters to be added to talkingdata event
     */
    public navigateToMiniProgram(entity: CrossPromotionEntity, type: "cross" | "popup", params: Object = {}) {
        if (GameGlobal && GameGlobal.tdAppSdk) {
            // tslint:disable-next-line: no-parameter-reassignment
            params = {
                ...params,
                from: this.entryName,
                to: entity.appCode,
                type,
            };

            let sdk = GameGlobal.tdAppSdk;
            sdk.event({
                id: "cp_clicked_" + entity.appCode + "_" + type,
                params,
            });
        } else {
            console.error("cannot find talking data sdk, cross promotion events will not be tracked");
        }

        wx.navigateToMiniProgram({
            appId: entity.appId,
            path: "",
            extraData: null,
            fail: (res: any) => {
                if (res && res.errMsg) {
                    if (res.errMsg.indexOf("navigateToMiniProgramAppIdList") >= 0) {
                        this.previewQrcode(entity, type);
                        // tslint:disable-next-line: max-line-length
                        console.error("target mini program is not inside navigateToMiniProgramAppIdList, use qrcode instead, crossPromoSucceed cannot be tracked");
                    } else {
                        console.error("navigateToMiniProgram", res.errMsg);
                    }
                }
            },
            success: (res: any) => {
                if (GameGlobal && GameGlobal.tdAppSdk) {
                    let sdk = GameGlobal.tdAppSdk;
                    sdk.event({
                        id: "cp_go_" + entity.appCode + "_" + type,
                        params,
                    });
                }
            },
        });
    }

    /**
     * Use QRCode for user to navigate to the mini program of the entity.
     * this function will also record events on talkingdata if talkingdata is integrated. 
     * Unlike navigateToMiniProgram, we don't know if user really jump to the other game. Only click event will be recorded.
     * @param entity the entity of the target mini game.
     * @param type the source's type.  cross means it comes from a GIF-like animation(using frames in entity to display the target entity)
     * @param params additional parameters to be added to talkingdata event
     */
    public previewQrcode(entity: CrossPromotionEntity, type: "cross" | "popup", params: Object = {}) {
        if (GameGlobal && GameGlobal.tdAppSdk) {
            // tslint:disable-next-line: no-parameter-reassignment
            params = {
                ...params,
                from: this.entryName,
                to: entity.appCode,
                type,
            };

            let sdk = GameGlobal.tdAppSdk;
            sdk.event({
                id: "cp_clicked_" + entity.appCode + "_" + type,
                params,
            });
        } else {
            console.error("cannot find talking data sdk, cross promotion events will not be tracked");
        }

        if (!entity.qrcode) {
            console.error("target mini program does not have a qrcode");
            return;
        }

        let entities: CrossPromotionEntity[];
        if (type === "cross") {
            entities = [entity];
        } else {
            entities = this.getPopupEntities();
        }

        let urls: string[] = [];
        for (let i = 0; i < entities.length; i++) {
            if (entities[i].qrcode) {
                urls.push(entities[i].qrcode);
            }
        }

        wx.previewImage({
            current: entity.qrcode,
            urls,
        });
    }
    /**
     * @deprecated return a random one in crossEntities
     */
    public randomOne(): CrossPromotionEntity | null {

        let totalWeight = 0;
        for (let i = 0; i < this.crossEntities.length; i++) {
            totalWeight += this.crossEntities[i].weight;
        }

        let random = Math.random() * totalWeight;
        for (let i = 0; i < this.crossEntities.length; i++) {
            random -= this.crossEntities[i].weight;
            if (random < 0) {
                this.cachedIndex = i;
                return this.crossEntities[i];
            }
        }

        return null;
    }
    /**
     * @deprecated return a cached one in crossEntities
     */
    public getCached(): CrossPromotionEntity | null {
        if (this.cachedIndex < 0) {
            return null;
        }

        return this.crossEntities[this.cachedIndex];
    }

    /**
     * Get all the entities can be displayed in GIF-like animation
     */
    public getCrossEntities(): CrossPromotionEntity[] {
        return this.crossEntities.slice();
    }

    /**
     * Get all the entities can be displayed in static image.
     */
    public getPopupEntities(): CrossPromotionEntity[] {
        return this.popupEntities.slice();
    }

    private parseResponse(data: any) {
        let entities: { [key: string]: CrossPromotionEntity } = {};
        // import crossEntities
        if (data["cross"]) {
            let crossEntities = data["cross"][this.entryName];
            for (let i = 0; crossEntities && i < crossEntities.length; i++) {
                let appCode = crossEntities[i];
                if (!entities[appCode]) {
                    entities[appCode] = this.parseCrossPromotionEntity(appCode, data[appCode]);
                }

                if (entities[appCode] && entities[appCode].weight > 0) {
                    this.crossEntities.push(entities[appCode]);
                }
            }
        }

        // import popupEntities
        if (data["popup"]) {
            let popupEntities = data["popup"][this.entryName];
            for (let i = 0; popupEntities && i < popupEntities.length; i++) {
                let appCode = popupEntities[i];
                if (!entities[appCode]) {
                    entities[appCode] = this.parseCrossPromotionEntity(appCode, data[appCode]);
                }

                if (entities[appCode]) {
                    this.popupEntities.push(entities[appCode]);
                }
            }
        }

        if (data["dot"]) {
            this._displayDot = data["dot"][this.entryName] || false;
        }
    }

    private parseCrossPromotionEntity(appCode: string, data: any): CrossPromotionEntity {
        let frames: string[] = [];
        for (let i = 0; i < data.count; i++) {
            frames.push(data.frames + data.name + (i < 10 ? "0" : "") + i + (data.ext ? data.ext : ".png"));
        }

        let weight = 1;
        if (typeof data.weight === "number") {
            weight = data.weight;
        } else {
            if (data.weight) {
                if (typeof data.weight[this.entryName] === "number") {
                    weight = data.weight[this.entryName];
                }
            }
        }

        return {
            frames,
            appId: data.id,
            icon: data.icon ? data.frames + data.icon : "",
            qrcode: data.qrcode ? data.frames + data.qrcode : "",
            appCode,
            weight,
            displayName: data.displayName || {},
        };
    }

}

export const crossPromo = new CrossPromotion();