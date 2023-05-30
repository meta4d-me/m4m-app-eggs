// tslint:disable-next-line: class-name
export class testPvrParse {
    public height = 1;
    public width = 1;
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }
    private version = 0x03525650;
    private flags = 0;
    private pixelFormatH = 0;
    private pixelFormatL = 0;
    // private colourSpace = 0;
    private channelType = 0;
    private depth = 1;
    // private numSurfaces = 1;
    private numFaces = 1;
    private mipMapCount = 1;
    private metaDataSize = 0;
    private gl: WebGL2RenderingContext;
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 解析pvr图片
     * @param _buffer 图片二进制数据
     * @version m4m 1.0
     */
    public parse(_buffer: ArrayBuffer): m4m.render.glTexture2D {
        let ar: Uint8Array = new Uint8Array(_buffer);
        // tslint:disable-next-line: no-parameter-reassignment
        _buffer = null;
        let tool: m4m.io.binTool = new m4m.io.binTool();
        tool.writeUint8Array(ar);
        this.version = tool.readUInt32();
        if (this.version == 0x03525650) {

            let tex = this.parseV3(tool);
            tool.dispose();
            return tex;
        } else if (this.version === 0x50565203) {
            //v2
            console.error("v2");
        } else {
            console.error("pvr parse error!:" + this.version);
            return null;
        }
    }

    private parseV3(tool: m4m.io.binTool) {

        this.flags = tool.readUInt32();//0:没有设置  0x02 ：alpha预乘
        if (this.flags == 0) {
            this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        } else {
            this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        }//开启预乘
        this.pixelFormatH = tool.readUInt32();//高4位 rgba
        // tslint:disable-next-line: max-line-length
        this.pixelFormatL = tool.readUInt32();//低4位 8888/4444/5551/565    高四位和低四位共同决定了其格式RGBA（32位）、RGBA4（16位）、    RGB、RGB5_A1、RGB565、  LUMINANCE_ALPHA、LUMINANCE、ALPHA
        // this.colourSpace = tool.readUInt32();//0:linear rgb   1:srgb
        tool.readBytes(4);
        this.channelType = tool.readUInt32();//格式
        this.height = tool.readUInt32();
        this.width = tool.readUInt32();
        this.depth = tool.readUInt32();
        // this.numSurfaces = tool.readUInt32();
        tool.readBytes(4);
        this.numFaces = tool.readUInt32();
        this.mipMapCount = tool.readUInt32();
        this.metaDataSize = tool.readUInt32();
        tool.readBytes(this.metaDataSize);
        let engineFormat;
        let textureFormat;
        let textureType;
        let t2d = new m4m.render.glTexture2D(this.gl);
        const ext = m4m.framework.sceneMgr.app.webgl.extensions.WEBGL_compressed_texture_pvrtc;
        switch (this.pixelFormatH) {
            case 0:
                textureFormat = ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                engineFormat = m4m.render.TextureFormatEnum.PVRTC2_RGB;
                break;
            case 1:
                textureFormat = ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                engineFormat = m4m.render.TextureFormatEnum.PVRTC2_RGBA;
                break;
            case 2:
                textureFormat = ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                engineFormat = m4m.render.TextureFormatEnum.PVRTC4_RGB;
                break;
            case 3:
                textureFormat = ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                engineFormat = m4m.render.TextureFormatEnum.PVRTC4_RGBA;
                break;
            default:
                textureFormat = this.gl.RGB;
                engineFormat = m4m.render.TextureFormatEnum.RGB;
                console.log("unknow pixel format::" + this.pixelFormatH);
        }
        t2d.format = engineFormat;
        // tslint:disable-next-line: switch-default
        switch (this.channelType) {
            case ChannelTypes.UnsignedByteNorm:
                textureType = this.gl.UNSIGNED_BYTE;
                break;
            case ChannelTypes.UnsignedShortNorm:
        }
        let target = this.gl.TEXTURE_2D;
        if (this.numFaces > 1) {
            target = this.gl.TEXTURE_CUBE_MAP;
        }

        //v3
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);//对齐方式
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 0);//不对Y翻转

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(target, t2d.texture);

        if (this.numFaces > 1) {
            target = this.gl.TEXTURE_CUBE_MAP_POSITIVE_X;
        }

        function textureLevelSize(format, width, height) {
            const ext = m4m.framework.sceneMgr.app.webgl.extensions.WEBGL_compressed_texture_pvrtc;

            switch (format) {
                case ext.COMPRESSED_RGB_S3TC_DXT1_EXT:
                case ext.COMPRESSED_RGB_ATC_WEBGL:
                case ext.COMPRESSED_RGB_ETC1_WEBGL:
                    return ((width + 3) >> 2) * ((height + 3) >> 2) * 8;

                case ext.COMPRESSED_RGBA_S3TC_DXT3_EXT:
                case ext.COMPRESSED_RGBA_S3TC_DXT5_EXT:
                case ext.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL:
                case ext.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL:
                    return ((width + 3) >> 2) * ((height + 3) >> 2) * 16;

                case ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG:
                case ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG:
                    return Math.floor((Math.max(width, 8) * Math.max(height, 8) * 4 + 7) / 8);
                case ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG:
                case ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG:
                    return Math.floor((Math.max(width, 16) * Math.max(height, 8) * 2 + 7) / 8);
                default:
                    return 0;
            }
        }
        let offset = 0;
        let _width: number = this.width;
        let _height: number = this.height;
        for (let i = 0; i < this.mipMapCount; ++i) {
            let levelSize = textureLevelSize(textureFormat, _width, _height);
            let data = tool.readBytes(levelSize);
            this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, i, textureFormat, _width, _height, 0, data);

            _width = _width >> 1;
            if (_width < 1) {
                _width = 1;
            }
            _height = _height >> 1;
            if (_height < 1) {
                _height = 1;
            }
            offset += levelSize;
        }
        if (this.mipMapCount > 1) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
        } else {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        }
        return t2d;
    }
}

enum ChannelTypes {
    UnsignedByteNorm = 0,
    SignedByteNorm = 1,
    UnsignedByte = 2,
    SignedByte = 3,
    UnsignedShortNorm = 4,
    SignedShortNorm = 5,
    UnsignedShort = 6,
    SignedShort = 7,
    UnsignedIntegerNorm = 8,
    SignedIntegerNorm = 9,
    UnsignedInteger = 10,
    SignedInteger = 11,
    SignedFloat = 12,
    Float = 12, //the name Float is now deprecated.
    UnsignedFloat = 13,
}