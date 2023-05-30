import { newUiBase } from "PSDUI/newUiBase";
export class ArchiveSelection extends newUiBase {
    public static Instance: ArchiveSelection;
    public onInit(){
        if (this.onInite) {
            this.onInite();
        }
        //添加按钮事件
        this.midbg.listscr_scr.listscrcontent.plus_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.plus_btn_event, this);
        this.topbg_img.back_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.back_btn_event, this);


    }
    //按钮事件
    private plus_btn_event(){if(this.plus_btn_btnEvent)this.plus_btn_btnEvent();};
    /**this.midbg.listscr_scr.listscrcontent.plus_btn.button 的按钮事件*/
    public plus_btn_btnEvent:()=>any;
    private back_btn_event(){if(this.back_btn_btnEvent)this.back_btn_btnEvent();};
    /**this.topbg_img.back_btn.button 的按钮事件*/
    public back_btn_btnEvent:()=>any;

    //文字修改方法
    /**修改label Level修改label文字方法*/
    public level_lab_text(text:string){this.midbg.listscr_scr.listscrcontent.frame_img.level_lab.label.text=text;}
    /**修改label 修改label文字方法*/
    public toptext_lab_text(text:string){this.topbg_img.toptext_lab.label.text=text;}

 public uiName:string="ArchiveSelection";

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
 /***/
 public listscr_scr:listscr_scr=new listscr_scr();
}
export class listscr_scr{
 public transform:m4m.framework.transform2D;
 public scrollRect:m4m.framework.scrollRect;
 public listscrcontent:listscrcontent=new listscrcontent();
}
export class listscrcontent{
 public transform:m4m.framework.transform2D;
 public plus_btn:plus_btn=new plus_btn();
 public frame_img:frame_img=new frame_img();
}
export class plus_btn{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public button:m4m.framework.button;
}
export class frame_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 public frame1_img:frame1_img=new frame1_img();
 public new_img:new_img=new new_img();
 /**Level*/
 public level_lab:level_lab=new level_lab();
 public ball_raw:ball_raw=new ball_raw();
}
export class frame1_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
export class new_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
export class level_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
export class ball_raw{
 public transform:m4m.framework.transform2D;
 public rawImage2D:m4m.framework.rawImage2D;
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
