import { Ress } from "./Ress";

export class inviteMgr {
    static gold: number[];
    static prize = [];
    static init() {
        let l = JSON.parse(Ress.inviteConfig);
        this.gold = l.gold;
        this.prize = l.prize;
    }
}

