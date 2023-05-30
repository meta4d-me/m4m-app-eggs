
@m4m.reflect.nodeComponent
export class windHandle extends m4m.framework.behaviour {
    static mat: m4m.framework.material;
    private static scene: m4m.framework.scene;
    private runingArr: m4m.framework.trailRender[] = [];
    stop = true;
    boostlevel = 0;
    public onPlay() {
        //windHandle.scene = this.gameObject.transform.scene;
    }

    private playlist: m4m.framework.trailRender[] = [];
    private readonly zLen = 100;
    private readonly tag_x = "tag_x";
    private readonly tag_y = "tag_y";
    //安排一个
    private setOne() {
        let t = windHandle.new_one();
        t[this.tag_x] = Math.random();
        t[this.tag_y] = Math.random();
        let tran = t.gameObject.transform;
        let rtran = this.gameObject.transform;
        tran.localTranslate.y = 3 + Math.random() * 2;
        tran.localTranslate.z = rtran.localTranslate.z + this.zLen + Math.random() * 30;
        let r_x = Math.random() * 8;
        tran.localTranslate.x = Math.random() > 0.5 ? r_x : r_x * -1;
        tran.localTranslate = tran.localTranslate;

        this.playlist.push(t);
        this.runingArr.push(t);

        if (!tran.parent) {
            windHandle.scene.addChild(tran);
        }
        windHandle.scene.addChild(tran);
    }

    private clearList: m4m.framework.trailRender[] = [];
    private readonly speed = 80;
    public update(delta: number) {
        if (this.stop) return;
        this.ckPlay();
        this.ckGenline(delta);
        this.moveAndDel(delta);
    }

    private moveAndDel(delta: number) {
        this.runingArr.forEach(item => {
            //console.error(` item : ${item.gameObject.transform.localTranslate.z} `);
            let tran = item.gameObject.transform;
            let rtran = this.gameObject.transform
            tran.localTranslate.z -= delta * this.speed;
            let dis = Math.abs(rtran.localTranslate.z - tran.localTranslate.z);
            let rete = (this.zLen - dis) / this.zLen;
            rete = rete * rete;
            //y dir
            let abs_x = Math.abs(tran.localTranslate.x);
            tran.localTranslate.y += delta * rete * (-abs_x * 6 + 50 + item[this.tag_y] * 10);
            tran.localTranslate.y = m4m.math.floatClamp(tran.localTranslate.y, 2, 100);
            tran.localTranslate = tran.localTranslate;

            if (tran.localTranslate.z < rtran.localTranslate.z - 16) {
                this.clearList.push(item);
            }
        });

        //delete
        this.clearList.forEach(item => {
            windHandle.delete_one(item);
            //item.stop();
            let idx = this.runingArr.indexOf(item);
            if (idx != -1) {
                this.runingArr.splice(idx, 1);
            }
        });
        this.clearList.length = 0;
    }

    private ckPlay() {
        this.playlist.forEach(item => {
            if (item) {
                item.play();
            }
        });
        this.playlist.length = 0;
    }

    private gCount = 0;
    private gSpeed = 10;
    private ckGenline(delta: number) {
        if (this.boostlevel <= 0) return;
        let s = delta * this.gSpeed;
        this.gCount += s * this.boostlevel / 3;

        if (this.gCount >= 1) {
            this.gCount = 0;
            this.setOne();
        }

    }

    public remove() {

    }

    private static genLineOne() {
        let tran = new m4m.framework.transform();
        let trailrender = tran.gameObject.addComponent("trailRender") as m4m.framework.trailRender;
        if (!this.scene) this.scene = m4m.framework.sceneMgr.scene;
        let app = this.scene.app;
        // let tex = app.getAssetMgr().getAssetByName('t.png') as m4m.framework.texture;
        // this.mat.setTexture("_Main_Tex", tex);
        m4m.math.quatFromEulerAngles(90, 90, 0, tran.localRotate);
        trailrender.setspeed(0.26);
        trailrender.setWidth(0.2);
        trailrender.material = this.mat;
        trailrender.lookAtCamera = false;
        trailrender.extenedOneSide = false;
        trailrender.color = new m4m.math.color(1, 1, 1, 0.4);
        trailrender.isAlphaGradual = true;;

        return trailrender;
    }

    private static poolArr: m4m.framework.trailRender[] = [];
    private static new_one() {
        if (this.poolArr.length < 1) {
            return this.genLineOne();
        } else {
            let temp = this.poolArr.pop();
            return temp;
        }
    }

    private static delete_one(t: m4m.framework.trailRender) {
        if (!t) return;
        if (t.gameObject.transform.parent) {
            t.gameObject.transform.parent.removeChild(t.gameObject.transform);
        }
        t.stop();
        this.poolArr.push(t);
    }
}    
