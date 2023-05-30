import { newUiBase } from "PSDUI/newUiBase";
export class Skin extends newUiBase {
    public static Instance: Skin;
    public onInit(){
        if (this.onInite) {
            this.onInite();
        }
        //添加按钮事件
        this.midbg.btnbg.bluebtn_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.bluebtn_btn_event, this);
        this.midbg.btnbg.greybtn_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.greybtn_btn_event, this);
        this.topbg_img.back_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.back_btn_event, this);


    }
    //按钮事件
    private bluebtn_btn_event(){if(this.bluebtn_btn_btnEvent)this.bluebtn_btn_btnEvent();};
    /**this.midbg.btnbg.bluebtn_btn.button 的按钮事件*/
    public bluebtn_btn_btnEvent:()=>any;
    private greybtn_btn_event(){if(this.greybtn_btn_btnEvent)this.greybtn_btn_btnEvent();};
    /**this.midbg.btnbg.greybtn_btn.button 的按钮事件*/
    public greybtn_btn_btnEvent:()=>any;
    private back_btn_event(){if(this.back_btn_btnEvent)this.back_btn_btnEvent();};
    /**this.topbg_img.back_btn.button 的按钮事件*/
    public back_btn_btnEvent:()=>any;

    //文字修改方法
    /**修改label 修改label文字方法*/
    public text1_lab_text(text:string){this.midbg.btnbg.bluebtn_btn.text1_lab.label.text=text;}
    /**修改label Level10修改label文字方法*/
    public text2_lab_text(text:string){this.midbg.btnbg.greybtn_btn.text2_lab.label.text=text;}
    /**修改label Minted修改label文字方法*/
    public text3_lab_text(text:string){this.midbg.btnbg.greybtn_btn.text3_lab.label.text=text;}
    /**修改label 修改label文字方法*/
    public name_lab_text(text:string){this.midbg.listscr_scr.listscrcontent.ball_raw.namebg_img.name_lab.label.text=text;}
    /**修改label 修改label文字方法*/
    public toptext_lab_text(text:string){this.topbg_img.toptext_lab.label.text=text;}

 public uiName:string="Skin";

 /***/
 public bg_img:bg_img=new bg_img();
 public midbg:midbg=new midbg();
 /***/
 public topbg_img:topbg_img=new topbg_img();
}
export class bg_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
export class midbg{
 public transform:m4m.framework.transform2D;
 public btnbg:btnbg=new btnbg();
 /***/
 public listscr_scr:listscr_scr=new listscr_scr();
}
export class btnbg{
 public transform:m4m.framework.transform2D;
 public bluebtn_btn:bluebtn_btn=new bluebtn_btn();
 public greybtn_btn:greybtn_btn=new greybtn_btn();
}
export class bluebtn_btn{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public button:m4m.framework.button;
 /***/
 public text1_lab:text1_lab=new text1_lab();
}
export class text1_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
export class greybtn_btn{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public button:m4m.framework.button;
 /**Level10*/
 public text2_lab:text2_lab=new text2_lab();
 /**Minted*/
 public text3_lab:text3_lab=new text3_lab();
 public btnlock_img:btnlock_img=new btnlock_img();
}
export class text2_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
export class text3_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
export class btnlock_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
export class listscr_scr{
 public transform:m4m.framework.transform2D;
 public scrollRect:m4m.framework.scrollRect;
 public listscrcontent:listscrcontent=new listscrcontent();
}
export class listscrcontent{
 public transform:m4m.framework.transform2D;
 public ball_raw:ball_raw=new ball_raw();
}
export class ball_raw{
 public transform:m4m.framework.transform2D;
 public rawImage2D:m4m.framework.rawImage2D;
 public frame1_img:frame1_img=new frame1_img();
 public lockbg_img:lockbg_img=new lockbg_img();
 public namebg_img:namebg_img=new namebg_img();
 public lock_img:lock_img=new lock_img();
}
export class frame1_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
export class lockbg_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
export class namebg_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 /***/
 public name_lab:name_lab=new name_lab();
}
export class name_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
export class lock_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
export class topbg_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 /***/
 public toptext_lab:toptext_lab=new toptext_lab();
 public back_btn:back_btn=new back_btn();
}
export class toptext_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
export class back_btn{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public button:m4m.framework.button;
}
