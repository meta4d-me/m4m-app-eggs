
/** 水平移动的方块 控制组件 */
@m4m.reflect.nodeComponent
export class HMoveHandle extends m4m.framework.behaviour
{
    /** 移动块的 速度 */
    static moveSpeed : number = 0; 
    private currtStyle = [];
    private mode = 0;  //0 , 1 
    tran:m4m.framework.transform;
    stop = true;
    public onPlay() {
        
    }
    
    /**
     *  初始化 ， mode : 0 ,1   | isRevert : 是否倒转
     */
    init(mode:number,isRevert = false){
        if(!this.tran) this.tran = this.gameObject.transform;
        this.mode = mode;
        if(this.mode == 0 ){
            if(isRevert)
            this.currtStyle = [1,4,0,4];
            else
            this.currtStyle = [3,0,4,0];
            
        }else if(this.mode == 1){
            if(isRevert)
            this.currtStyle = [4,0];
            else
            this.currtStyle = [0,4];
        }

        this.lastpos = 0;
        this.pos = 1;  
        let temp = this.currtStyle[0];
        this.doMove(this.getXbyNum(this.currtStyle[0]),this.getXbyNum(this.currtStyle[1]));
    }

    public update(delta: number) {
        if(this.stop ) return;
        this.moveing(delta);
    }

    private startX = 0;
    private endX = 0 ;
    private doMove(start,end){
        this.startX = start;
        this.endX = end;
        this.time = this.excess;
        this.tran.localTranslate.x = start;
        this.tran.localTranslate = this.tran.localTranslate;
        this.excess = 0;   
        this.canMove = true;
    }

    private canMove = false;
    private excess = 0;
    private time = 0;
    private moveing(delta:number){
        if(!this.canMove) return;

        let speed = HMoveHandle.moveSpeed;
        this.time += delta * speed;
        if(this.time >= 1){
            this.excess = this.time - 1;
            this.time = 1;
        }
        let dis = this.endX - this.startX;
        
        //this.tran.localTranslate.x =  this.startX * (1-p) + this.endX * p; //larep
        let p = m4m.math.floatClamp(this.time,0,1);
        this.tran.localTranslate.x = this.tween(p,dis) + this.startX;
        this.tran.localTranslate = this.tran.localTranslate;
        if(this.time >= 1){
            this.canMove = false;
            this.moveEnd();
        }
    }

    private tween(p,dis){
        let mth, tp ;
        if(p <= 0.5){
            mth =  m4m.framework.tweenMethod.QuadEaseIn;
            tp = p * 2;
            return m4m.framework.tweenUtil.GetEaseProgress(mth,tp) * dis/2;
        }else{
            mth =  m4m.framework.tweenMethod.QuadEaseOut;
            tp = p * 2 -1;
            return m4m.framework.tweenUtil.GetEaseProgress(mth,tp) * dis/2 +  dis/2;
        }
    }

    private pos = 0;
    private lastpos = 0;
    private moveEnd(){
        this.lastpos = this.pos;
        this.pos++;
        this.pos = this.pos%this.currtStyle.length
        let temp = this.currtStyle[this.pos];
        this.doMove(this.getXbyNum(this.currtStyle[this.lastpos]),this.getXbyNum(this.currtStyle[this.pos]));
    }

    //0 - 4 Num ， left to right
    private getXbyNum(num:number){
        num = num< 0 ?  0: num > 4 ? 4: num; //limit
        return num * 2 - 4;
    }

    public remove()
    {
        
    }
}    
