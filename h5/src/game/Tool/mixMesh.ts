import { GameMgr } from "../GameMgr";

export class GMesh
{
    vf:number;
    vertexByteSize:number;
    mat:m4m.framework.material;
    mesh:m4m.framework.mesh;

    maxVerteCount:number;
    currentVerteCount:number=0;

    maxVboLen:number;
    realVboLen:number=0;
    vbodata:Float32Array;

    maxEboLen:number;
    realEboLen:number=0;
    ebodata:Uint16Array;

    constructor(mat: m4m.framework.material, vCount:number,vf:number,webgl:WebGL2RenderingContext)
    {
        this.mat = mat;
        let total = m4m.render.meshData.calcByteSize(vf) / 4;
        let gmesh=new m4m.framework.mesh();
        let maxSize = 2048;
        this.vbodata= new Float32Array(total*maxSize);
        this.ebodata= new Uint16Array(maxSize);
        this.vf=vf;

        this.maxVerteCount=vCount;
        this.maxVboLen=this.vbodata.length;
        this.maxEboLen=this.ebodata.length;

        gmesh.glMesh = new m4m.render.glMesh();
        // gmesh.glMesh.eboType=webgl.UNSIGNED_INT;
        gmesh.glMesh.initBuffer(webgl, vf, vCount,m4m.render.MeshTypeEnum.Dynamic);
        // gmesh.glMesh.uploadVertexData(webgl, vboArr);

        gmesh.glMesh.addIndex(webgl, this.ebodata.length);
        // gmesh.glMesh.uploadIndexData(webgl, 0, eboArr);
        gmesh.submesh = [];
        {
            var sm = new m4m.framework.subMeshInfo();
            sm.matIndex = 0;
            sm.useVertexIndex = 0;
            sm.start = 0;
            sm.size = this.ebodata.length;
            sm.line = false;
            gmesh.submesh.push(sm);
        }
        this.mesh=gmesh;
        this.vertexByteSize=gmesh.glMesh.vertexByteSize;
    }
    reset() {
        this.currentVerteCount = 0;
        this.realVboLen = 0;
        this.realEboLen = 0;
    }

    private temptPos:m4m.math.vector3=new m4m.math.vector3();
    uploadMeshData(mat:m4m.math.matrix,mesh:m4m.framework.mesh,webgl:WebGL2RenderingContext)
    {
        let data=mesh.data;

        this.checkMeshCapacity(data.pos.length,data.trisindex.length,webgl);

        let vertexcount=data.pos.length;
        let size=this.vertexByteSize/4;

        let vbodata=this.vbodata;
        for(let i=0;i<vertexcount;i++)
        {
            let seek = 0;
            m4m.math.matrixTransformVector3(data.pos[i],mat,this.temptPos);
            vbodata[this.realVboLen+i*size]=this.temptPos.x;
            vbodata[this.realVboLen+i*size+1]=this.temptPos.y;
            vbodata[this.realVboLen+i*size+2]=this.temptPos.z;
            seek+=3;

            if (this.vf & m4m.render.VertexFormatMask.Normal)
            {
                vbodata[this.realVboLen+i*size+seek]=data.normal[i].x;
                vbodata[this.realVboLen+i*size+seek+1]=data.normal[i].y;
                vbodata[this.realVboLen+i*size+seek+2]=data.normal[i].z;
                seek+=3;
            }

            if (this.vf & m4m.render.VertexFormatMask.Tangent)
            {
                vbodata[this.realVboLen+i*size+seek]=data.tangent[i].x;
                vbodata[this.realVboLen+i*size+seek+1]=data.tangent[i].y;
                vbodata[this.realVboLen+i*size+seek+2]=data.tangent[i].z;
                seek+=3;
            }

            if (this.vf & m4m.render.VertexFormatMask.Color)
            {
                if(data.color!=null)
                {
                    vbodata[this.realVboLen+i*size+seek]=data.color[i].r;
                    vbodata[this.realVboLen+i*size+seek+1]=data.color[i].g;
                    vbodata[this.realVboLen+i*size+seek+2]=data.color[i].b;
                    vbodata[this.realVboLen+i*size+seek+3]=data.color[i].a;
                }else
                {
                    vbodata[this.realVboLen+i*size+seek]=1;
                    vbodata[this.realVboLen+i*size+seek+1]=1;
                    vbodata[this.realVboLen+i*size+seek+2]=1;
                    vbodata[this.realVboLen+i*size+seek+3]=1;
                }
                seek+=4;
            }

            if (this.vf & m4m.render.VertexFormatMask.UV0)
            {
                vbodata[this.realVboLen+i*size+seek]=data.uv[i].x;
                vbodata[this.realVboLen+i*size+seek+1]=data.uv[i].y;
                seek+=2;
            }
        }

        let ebodata=this.ebodata;
        let len=data.trisindex.length;
        for(let i=0;i<len;i++)
        {
            ebodata[this.realEboLen+i]=data.trisindex[i]+this.currentVerteCount;
        }

        this.realVboLen+=size*vertexcount;
        this.realEboLen+=len;
        this.currentVerteCount+=vertexcount;

        this.mesh.submesh[0].size=this.realEboLen;
    }

    mixToGLmesh(webgl:WebGL2RenderingContext)
    {
        this.mesh.glMesh.uploadVertexData(webgl,this.vbodata);
        this.mesh.glMesh.uploadIndexData(webgl, 0, this.ebodata);
        this.mesh.glMesh.initVAO();
    }

    private checkMeshCapacity(vertexcount:number,eboLen:number,webgl:WebGL2RenderingContext)
    {
        if(this.currentVerteCount+vertexcount>this.maxVerteCount)
        {
            let needCount=this.currentVerteCount+vertexcount;
            let needMaxVertexcount=this.maxVerteCount;

            while(needCount>needMaxVertexcount)
            {
                needMaxVertexcount*=2;
            }
            if(needMaxVertexcount!=this.maxVerteCount)
            {
                this.maxVerteCount=needMaxVertexcount;
                let newVbo=new Float32Array(this.maxVerteCount*this.vertexByteSize);
                this.maxVboLen=newVbo.length;
                newVbo.set(this.vbodata);
                this.mesh.glMesh.resetVboSize(webgl,this.maxVerteCount);
                this.vbodata=newVbo;
            }
        }
        if(this.realEboLen+eboLen>this.maxEboLen)
        {
            let needEbolen=this.realEboLen+eboLen;
            let curMaxlen=this.maxEboLen;
            while(needEbolen>curMaxlen)
            {
                curMaxlen*=2;
            }
            if(curMaxlen!=this.maxEboLen)
            {
                this.maxEboLen=curMaxlen;
                let newebo=new Uint16Array(this.maxEboLen);
                newebo.set(this.ebodata);
                this.mesh.glMesh.resetEboSize(webgl,0,this.maxEboLen);

                this.ebodata=newebo;
            }
        }

    }

}
export class mixMesh
{
    matDic:{[matID:number]:m4m.framework.transform[]}={};
    matinstance: { [matID: number]: m4m.framework.material } = {};
    mixmeshDic:{[matID:number]:GMesh}={};

    resetDic() {
        for(let k in this.mixmeshDic) {
            this.mixmeshDic[k].reset();
        }
    }
    gl;
    constructor(gl = GameMgr.app.webgl) {
        this.gl = gl;
    }


    mixMesh(targets:m4m.framework.transform[],vf:number=m4m.render.VertexFormatMask.Position | m4m.render.VertexFormatMask.UV0 | m4m.render.VertexFormatMask.Normal | m4m.render.VertexFormatMask.Color):{nobatch:m4m.framework.transform[],batch:m4m.framework.transform[],mixMeshId:number[]}
    {
        let nobatchArr:m4m.framework.transform[]=[];
        let batchArr:m4m.framework.transform[]=[];
        let mixmeshid:number[]=[];
        this.matDic={};

        for(let i=0;i<targets.length;i++)
        {
            let meshr=targets[i].gameObject.getComponent("meshRenderer") as m4m.framework.meshRenderer;
            if(meshr.materials.length>1)
            {
                nobatchArr.push(targets[i]);
            }else
            {
                let id = meshr.materials[0].getGUID();
                if(!this.matDic[id])
                    this.matDic[id] = [];
                this.matDic[id].push(targets[i]);
                this.matinstance[id] = meshr.materials[0];
            }
        }


        for(let key in this.matDic)
        {
            let transArr=this.matDic[key];
            if(transArr.length>=2)
            {
                for(let i=0;i< transArr.length;i++)
                {
                    let meshf=transArr[i].gameObject.getComponent("meshFilter") as m4m.framework.meshFilter;
                    if(this.mixmeshDic[key]==null)
                    {
                        this.mixmeshDic[key]=new GMesh(this.matinstance[key], 2048,vf,this.gl);
                        // mixmeshid.push(Number(key));
                    }
                    if (mixmeshid.indexOf(Number(key))<0) {
                        mixmeshid.push(Number(key));
                    }
                    this.mixmeshDic[key].uploadMeshData(transArr[i].getWorldMatrix(),meshf.mesh,this.gl);

                    batchArr.push(transArr[i]);
                }
            }else
            {
                if(transArr[0]!=null)
                {
                    nobatchArr.push(transArr[0]);
                }
            }
        }

        for(let key in this.mixmeshDic)
        {
            this.mixmeshDic[key].mixToGLmesh(this.gl);
        }

        return {batch:batchArr,nobatch:nobatchArr,mixMeshId:mixmeshid};
    }


}