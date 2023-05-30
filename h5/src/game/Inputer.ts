import {GameMgr} from "./GameMgr";
import {playerMgr} from "./role/playerMgr";

export class Inputer
{
    static init(){
        GameMgr.inputMgr.addPointListener(m4m.event.PointEventEnum.PointMove,this.onMove,this);
        GameMgr.inputMgr.addPointListener(m4m.event.PointEventEnum.PointDown,this.onDown,this);
        GameMgr.inputMgr.addPointListener(m4m.event.PointEventEnum.PointUp,this.onUp,this);
        //GameMgr.inputMgr.addPointListener(m4m.event.PointEventEnum.PointClick,this.click,this);
    }

    private static click(){
        console.error(`  jump test `);
        let role =playerMgr.getRole();
        role.root.jump(); //跳起
    }

    private static lastPoint_x = -1;
    private static isDonw = false;
    private static onDown([x,y]){
        this.isDonw = true;
        this.lastPoint_x = x;
    }

    private static onUp(){
        this.isDonw = false;
    }

    private static onMove([x,y]){
        if(!this.isDonw || !this.onHorizTouch) return;
        let len = Math.abs(this.lastPoint_x - x);
        if(len < 0.0001) return;
        let dir = x > this.lastPoint_x ? 1: -1;
        this.onHorizTouch(dir * len);

        this.lastPoint_x = x;
    }

    static onHorizTouch:(delta:number)=>{};

}