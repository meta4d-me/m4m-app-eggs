import { uiPage, uiPop } from "./base/uiPage"

@m4m.reflect.node2DComponent
export class victoryPagehandle extends uiPop {
    //设置
    @m4m.reflect.Field("reference", null, "image2D")
    Image: m4m.framework.image2D;


    public onPlay() {

    }
    static call_back: () => {};

    time: number = 2;
    ctime: number = 3;
    isc: boolean = false;

    public update(delta: number) {
        this.ctime += delta;
        if (this.ctime >= this.time) {
            if (this.isc) {
                victoryPagehandle.call_back();
                this.isc = false;
            }
        }
    }
    public remove() {

    }
}


