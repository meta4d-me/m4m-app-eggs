@m4m.reflect.node2DComponent
@m4m.reflect.nodeRender
// tslint:disable-next-line: class-name
export class uiPolygon implements m4m.framework.IRectRenderer {
    public transform: m4m.framework.transform2D;
    @m4m.reflect.Field("color")
    public color: m4m.math.color = new m4m.math.color(1, 1, 1, 1);

    private static readonly defUIShader = `shaders/defui`;  //非mask 使用shader
    private static readonly defMaskUIShader = `shaders/defmaskui`; //mask 使用shader
    private static readonly helpV2 = new m4m.math.vector2();
    private static readonly helpV2v1 = new m4m.math.vector2();
    @m4m.reflect.Field("number[]")
    private polygonData: number[] = [];
    private datar: number[] = [
        //3 pos  4 color  2 uv 4 color2
        // 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
        // 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        // 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        // 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        // 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        // 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    private minX: number = Number.MAX_VALUE;
    private maxX: number = Number.MAX_VALUE * -1;
    private minY: number = Number.MAX_VALUE;
    private maxY: number = Number.MAX_VALUE * -1;
    private _darwRect: m4m.math.rect;
    private _cacheMaskV4: m4m.math.vector4;
    private _CustomShaderName = ``; //自定义UIshader

    /**
     * @private
     * ui默认材质
     */
    private _uimat: m4m.framework.material;
    private get uimat() {
        let assetmgr = m4m.framework.sceneMgr.app.getAssetMgr();
        if (!assetmgr) { return this._uimat; }
        let pMask = this.transform.parentIsMask;
        let mat = this._uimat;
        let rectTag = "";
        let uiTag = "_ui";
        if (pMask) {
            let rId = this.transform.maskRectId;
            rectTag = `mask(${rId})`;
        }
        let matName = `_polygon_${uiTag}${rectTag}`;
        if (!mat || mat.getName() != matName) {
            if (mat) { mat.unuse(); }
            mat = assetmgr.getAssetByName(matName) as m4m.framework.material;
            if (mat) { mat.use(); }
        }
        if (!mat) {
            mat = new m4m.framework.material(matName);
            let sh = assetmgr.getShader(this._CustomShaderName);
            sh = sh ? sh : assetmgr.getShader(pMask ? uiPolygon.defMaskUIShader : uiPolygon.defUIShader);
            mat.setShader(sh);
            mat.use();
            // this.needRefreshImg = true;
        }
        this._uimat = mat;

        return this._uimat;
    }

    /**
     * 添加 多边形的点
     * @param localPos 坐标（本地坐标空间为基坐标系）
     */
    public addPoint(localPos: m4m.math.vector2) {
        this.polygonData.push(localPos.x);
        this.polygonData.push(localPos.y);
    }

    /**
     * 清理 所有的点
     */
    public clearPoint() {
        this.polygonData.length = 0;
        // this.updateTran
        this.datar.length = 0;
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 设置rander Shader名字
     * @version m4m 1.0
     */
    public setShaderByName(shaderName: string) {
        this._CustomShaderName = shaderName;
    }

    public render(canvas: m4m.framework.canvas) {
        let plen = this.polygonData.length;
        let triNum = plen - 2;  //3 角形数量
        if (triNum < 1) { return; }
        let mat = this.uimat;
        if (!mat) { return; }
        if (this.transform.parentIsMask) {
            let _cMaskV4 = this._cacheMaskV4;
            if (!_cMaskV4) { _cMaskV4 = this._cacheMaskV4 = new m4m.math.vector4(); }
            let rect = this.transform.maskRect;
            if (_cMaskV4.x != rect.x || _cMaskV4.y != rect.y || _cMaskV4.w != rect.w || _cMaskV4.z != rect.h) {
                _cMaskV4.x = rect.x; _cMaskV4.y = rect.y; _cMaskV4.z = rect.w; _cMaskV4.w = rect.h;
                mat.setVector4("_maskRect", _cMaskV4);
            }
        }

        canvas.pushRawData(mat, this.datar);
    }

    public updateTran() {
        let _pData = this.polygonData;
        let _data = this.datar;
        let plen = _pData.length;
        let triNum = plen - 2;  //3 角形数量
        if (triNum < 1) { return; }
        let rpLen = triNum * 3;
        let dLen = _data.length / 13;
        if (rpLen != dLen) {  //检查是否需要 调整
            //datar 调整大小
            if (dLen > rpLen) {
                _data.length = rpLen * 13;
            } else {
                let df = rpLen - dLen;
                for (let i = 0; i < df; i++) {
                    _data.push(0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1);
                }
            }
            dLen = rpLen * 13;
        }
        //
        let m = this.transform.getWorldMatrix();
        let l = -this.transform.pivot.x * this.transform.width;
        let t = -this.transform.pivot.y * this.transform.height;
        for (let i = 0; i < triNum; i++) {
            //pos
            let pi = i * 2;
            let x0 = _pData[0] + l;
            let y0 = _pData[1] + t;
            let x1 = _pData[pi + 2] + l;
            let y1 = _pData[pi + 3] + t;
            let x2 = _pData[pi + 4] + l;
            let y2 = _pData[pi + 5] + t;

            //calc pos
            let _x0 = x0 * m.rawData[0] + y0 * m.rawData[2] + m.rawData[4];
            let _y0 = x0 * m.rawData[1] + y0 * m.rawData[3] + m.rawData[5];
            let _x1 = x1 * m.rawData[0] + y1 * m.rawData[2] + m.rawData[4];
            let _y1 = x1 * m.rawData[1] + y1 * m.rawData[3] + m.rawData[5];
            let _x2 = x2 * m.rawData[0] + y2 * m.rawData[2] + m.rawData[4];
            let _y2 = x2 * m.rawData[1] + y2 * m.rawData[3] + m.rawData[5];

            let _i = i * 3;
            _data[_i * 13] = _x0;
            _data[_i * 13 + 1] = _y0;
            _data[(_i + 1) * 13] = _x1;
            _data[(_i + 1) * 13 + 1] = _y1;
            _data[(_i + 2) * 13] = _x2;
            _data[(_i + 2) * 13 + 1] = _y2;

            //drawRect 
            this.minX = Math.min(_x0, _x1, _x2, this.minX);
            this.minY = Math.min(_y0, _y1, _y2, this.minY);
            this.maxX = Math.max(_x0, _x1, _x2, this.maxX);
            this.maxY = Math.max(_y0, _y1, _y2, this.maxY);
        }

        //主color
        for (let i = 0; i < rpLen; i++) {
            _data[i * 13 + 3] = this.color.r;
            _data[i * 13 + 4] = this.color.g;
            _data[i * 13 + 5] = this.color.b;
            _data[i * 13 + 6] = this.color.a;
        }
        //Drawrect
        this.calcDrawRect();
    }

    public getMaterial(): m4m.framework.material {
        if (!this._uimat) {
            return this.uimat;
        }
        return this._uimat;
    }
    public getDrawBounds(): m4m.math.rect {
        if (!this._darwRect) {
            this._darwRect = new m4m.math.rect();
            this.calcDrawRect();
        }
        return this._darwRect;
    }
    public onPlay() {
    }
    public start() {
    }
    public update(delta: number) {
    }
    public remove() {
        this.clearPoint();

        if (this._uimat) { this._uimat.unuse(); }
        this._cacheMaskV4 = null;
        this.transform = null;
        this.color = null;
        this._darwRect = null;
        this.transform = null;
    }

    /** 计算drawRect */
    private calcDrawRect() {
        if (!this._darwRect) { return; }
        //drawBounds (y 轴反向)
        let canvas = this.transform.canvas;
        if (!canvas) { return; }
        let minPos = uiPolygon.helpV2;
        minPos.x = this.minX;
        minPos.y = this.maxY;
        canvas.clipPosToCanvasPos(minPos, minPos);

        let maxPos = uiPolygon.helpV2v1;
        maxPos.x = this.maxX;
        maxPos.y = this.minY;
        canvas.clipPosToCanvasPos(maxPos, maxPos);

        this._darwRect.x = minPos.x;
        this._darwRect.y = minPos.y;
        this._darwRect.w = maxPos.x - minPos.x;
        this._darwRect.h = maxPos.y - minPos.y;

        this.minX = this.minY = Number.MAX_VALUE;
        this.maxX = this.maxY = Number.MAX_VALUE * -1;
    }

}