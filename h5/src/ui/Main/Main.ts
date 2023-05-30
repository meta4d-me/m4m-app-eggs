import { newUiBase } from "PSDUI/newUiBase";
export class Main extends newUiBase {
    public static Instance: Main;
    public onInit(){
        if (this.onInite) {
            this.onInite();
        }
        //添加按钮事件
        this.back_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.back_btn_event, this);
        this.back_btn.set_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.set_btn_event, this);
        this.rtbg.spin_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.spin_btn_event, this);
        this.rtbg.shop1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.shop1_btn_event, this);


    }
    //按钮事件
    private back_btn_event(){if(this.back_btn_btnEvent)this.back_btn_btnEvent();};
    /**this.back_btn.button 的按钮事件*/
    public back_btn_btnEvent:()=>any;
    private set_btn_event(){if(this.set_btn_btnEvent)this.set_btn_btnEvent();};
    /**this.back_btn.set_btn.button 的按钮事件*/
    public set_btn_btnEvent:()=>any;
    private spin_btn_event(){if(this.spin_btn_btnEvent)this.spin_btn_btnEvent();};
    /**this.rtbg.spin_btn.button 的按钮事件*/
    public spin_btn_btnEvent:()=>any;
    private shop1_btn_event(){if(this.shop1_btn_btnEvent)this.shop1_btn_btnEvent();};
    /**this.rtbg.shop1_btn.button 的按钮事件*/
    public shop1_btn_btnEvent:()=>any;

    //文字修改方法

 public uiName:string="Main";

 public bg:bg=new bg();
 public back_btn:back_btn=new back_btn();
 public rtbg:rtbg=new rtbg();
}
export class bg{
 public transform:m4m.framework.transform2D;
}
export class back_btn{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public button:m4m.framework.button;
 public set_btn:set_btn=new set_btn();
}
export class set_btn{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public button:m4m.framework.button;
}
export class rtbg{
 public transform:m4m.framework.transform2D;
 public spin_btn:spin_btn=new spin_btn();
 public shop1_btn:shop1_btn=new shop1_btn();
}
export class spin_btn{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public button:m4m.framework.button;
}
export class shop1_btn{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public button:m4m.framework.button;
}
