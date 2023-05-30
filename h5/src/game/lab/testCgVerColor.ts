
@m4m.reflect.nodeComponent
export class testCgVerColor extends m4m.framework.behaviour
{
    public onPlay() {
        let mf = this.gameObject.getComponent("meshFilter") as m4m.framework.meshFilter;
        let mesh = mf.mesh;

        let len = 78;
        mesh.data.color = [];
        for(let i=0;i< len ;i++){
            mesh.data.color.push(new m4m.math.color(1,1,1,1));
        }

        mesh.defaultAsset = true;
        debugger;
        let webgl = this.gameObject.getScene().app.webgl;

        let vf = mesh.glMesh.vertexFormat | m4m.render.VertexFormatMask.Color;
        let v32 = mf.mesh.data.genVertexDataArray(vf);
        var i16 = mesh.data.genIndexDataArray();

        mesh.glMesh = new m4m.render.glMesh();
        mesh.glMesh.initBuffer(webgl, vf, mesh.data.pos.length);
        mesh.glMesh.uploadVertexData(webgl, v32);

        mesh.glMesh.addIndex(webgl, i16.length);
        mesh.glMesh.uploadIndexData(webgl, 0, i16)

    }
    public update(delta: number) {

    }
    public remove()
    {
        
    }
}    
