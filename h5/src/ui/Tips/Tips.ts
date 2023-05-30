import { newUiBase } from "PSDUI/newUiBase";
export class Tips extends newUiBase {
    public static Instance: Tips;
    public onInit(){
        if (this.onInite) {
            this.onInite();
        }
        //添加按钮事件


    }
    //按钮事件

    //文字修改方法
    /**修改label 修改label文字方法*/
    public text_lab_text(text:string){this.frame_img.text_lab.label.text=text;}

 public uiName:string="Tips";

 /***/
 public bg_img:bg_img=new bg_img();
 public frame_img:frame_img=new frame_img();
}
export class bg_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
export class frame_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 /***/
 public text_lab:text_lab=new text_lab();
}
export class text_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
