import { Ress } from "./Ress";

export class levelMgr {
    static levels: level[] = [];
    static init() {
        //let { levels } = JSON.parse(Ress.levelConfig);
        let objArr = Ress.levelConfig;
        for (const key in objArr) {
            const element = objArr[key];
            this.levels.push(new level(element));
        }
        // this.levels = objArr.map(info => new level(info));
    }
}

export class level {
    id: number;
    amount: number;
    stageName: string;
    length: number;
    weight: number[];
    cubeSpeedRange: number[];  //方块移动速度的范围 [ 最小速度, 最大速度]
    // 机器人逻辑
    beyondRate: number;
    bootsRates: number[];
    reviveCount: number;    // 可复活次数
    constructor({ id, amount, stageName, runwayLength, runwayWeight, cubeSpMin, cubeSpMax, beyondRate, bootsWght, reviveCount }) {
        this.id = id;
        this.amount = amount;
        this.stageName = stageName;
        this.length = runwayLength;
        this.weight = runwayWeight;
        this.cubeSpeedRange = [cubeSpMin, cubeSpMax];
        // 机器人逻辑
        this.beyondRate = beyondRate;
        let boostSum = bootsWght[0] + bootsWght[1] + bootsWght[2];
        this.bootsRates = bootsWght.map(weight => weight / boostSum);
        this.reviveCount = reviveCount;
    }

}