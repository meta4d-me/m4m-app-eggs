import { newUiBase } from "PSDUI/newUiBase";
export class wloading extends newUiBase {
    public static Instance: wloading;
    public onInit(){
        if (this.onInite) {
            this.onInite();
        }
        //添加按钮事件


    }
    //按钮事件

    //文字修改方法

 public uiName:string="wloading";

 /***/
 public gamebg:gamebg=new gamebg();
 public symbol_img:symbol_img=new symbol_img();
}
export class gamebg{
 public transform:m4m.framework.transform2D;
}
export class symbol_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
}
