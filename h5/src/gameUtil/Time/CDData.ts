import { Dictionary } from "../Data/Dictionary";
import { CDManage } from "./CDManage";

export class CDData{
    public showLog = false;

    public list: Dictionary = new Dictionary();
    public cdID: number=0;
    public startTime: number=0;
    public endTime: number=0;
    public cdTime: number = 0;

    public cdUpdate(): void {
        let cd: number = this.GetCDPercentage();
        if (cd > 100 || cd <= 0) {
            this.endTime = 0;
        }
        //super.dispatchEvent(new UI.CUIEvent(UI.CUIEvent.CD_UPDATE, cd));
    }

    public GetCDPercentage(): number {
        let nowTime: number = CDManage.Instance.serverTime();
        if (this.endTime <= nowTime) { return 0; }
        return (this.endTime - nowTime) / this.cdTime * 100;
    }
}