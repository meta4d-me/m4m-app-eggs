import { commTool } from "../Tool/commTool";
import { wxTool } from "../Tool/wxTool";

//icon 跳转广告
@m4m.reflect.node2DComponent
export class iconAdvHandle extends m4m.framework.behaviour2d
{
    public onPlay() {

    }

    private appid = ""; 
    private inited = false;
    setIcon(data : any){
        if(this.inited || !data) return;
        let icon = this.transform.getComponent("rawImage2D") as m4m.framework.rawImage2D;
        let btn = this.transform.getComponent("button") as m4m.framework.button;
        if(!icon){
            icon = this.transform.addComponent("rawImage2D") as m4m.framework.rawImage2D;
        }
        if(!btn){
            btn = this.transform.addComponent("button") as m4m.framework.button;
        }
        
        this.appid = data.appid;
        btn.addListener(m4m.event.UIEventEnum.PointerClick,this.onIconClick,this);

        commTool.getTexture(data.imgurl).then((tex)=>{
            icon.image = tex;
        });
        this.inited = true;
    }

    onClick : Function;
    private onIconClick(){

        wxTool.openMiniPrograme(this.appid,"");
        if(this.onClick) 
            this.onClick();
    }

    public update(delta: number) {

    }
    public remove() {
        
    }
}    
