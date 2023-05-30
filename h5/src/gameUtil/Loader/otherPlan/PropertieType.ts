
    export enum PropertieType {
        //基础数据类型
        typeString = 0,
        typeByte = 1,
        typeSByte = 2,
        typeInt16 = 3,
        typeUInt16 = 4,
        typeInt32 = 5,
        typeUInt32 = 6,
        typeInt64 = 7,
        typeUInt64 = 8,
        typeFloat = 9,
        typeLong = 10,
        typeDouble = 11,
        typeBool = 12,
        typeVector2 = 13,
        typeVector3 = 14,
        typeVector4 = 15,
        typeColor = 16,
        typeBounds = 17,
        typeQuaternion = 18,
        //资源常用类型（暂时没有使用）
        typeF14EffectSystem = 19,
        typeImageSetting = 20,
        typeMat = 21,
        typeGameObject = 22,
        typeMesh = 23,
        typeKeyFrameAnimtionClip = 24,
        typeLinerenderer = 25,
        typeParticleSystem = 26,
        typeBoxcollider = 27,
        typeAniplayer = 28,
        typeSkinnedMeshRenderer = 29,
        typeMeshRenderer = 30,
        typeMeshFilter = 31,
        typeMeshcollider = 32,
        typeAsbone = 33,
        typeF4skinnedMeshRenderer = 34,
        typeTPoseInfo = 35,
        typePoseBoneMatrix = 36,
        typeF14effCmop = 37,
        typeKeyFrameAniPlayer = 38,
        typeAnimationCurve1 = 39,
        typekey = 40,
        typeGradient = 41,
        typeAlphaKey = 42,
        typeColorKey = 43,
        typeParticleMainModule = 44,
        typeParticleEmissionModule = 45,
        typeParticleShapeModule = 46,
        typeParticleVelocityOverLifetimeModule = 47,
        typeParticleLimitVelocityOverLifetimeModule = 48,
        typeParticleInheritVelocityModule = 49,
        typeColorBySpeed = 50,
        typeSizeOverLifetime = 51,
        typeNoise = 52,
        typeTextureSheetAnimation = 53,
        typeMinMaxCurve = 54,
        typeMinMaxGradient = 55,
        typeBurst = 56,
        typePrefab = 57,
        typeNumber4 = 58,
        //对应类型的LIST 类型+100
        //基础数据
        listString = 100,
        listByte = 101,
        listSByte = 102,
        listInt16 = 103,
        listUInt16 = 104,
        listInt32 = 105,
        listUInt32 = 106,
        listInt64 = 107,
        listUInt64 = 108,
        listFloat = 109,
        listLong = 110,
        listDouble = 111,
        listBool = 112,
        listVector2 = 113,
        listVector3 = 114,
        listVector4 = 115,
        listColor = 116,
        listBounds = 117,
        listQuaternion = 118,
        //资源常用类型（暂时没有使用）
        listF14EffectSystem = 119,
        listImageSetting = 120,
        listMat = 121,
        listGameObject = 122,
        listMesh = 123,
        listKeyFrameAnimtionClip = 124,
        listLinerenderer = 125,
        listParticleSystem = 126,
        listBoxcollider = 127,
        listAniplayer = 128,
        listSkinnedMeshRenderer = 129,
        listMeshRenderer = 130,
        listMeshFilter = 131,
        listMeshcollider = 132,
        listAsbone = 133,
        listF4skinnedMeshRenderer = 134,
        listTPoseInfo = 135,
        listPoseBoneMatrix = 136,
        listF14effCmop = 137,
        listKeyFrameAniPlayer = 138,
        listAnimationCurve1 = 139,
        listkey = 140,
        listGradient = 141,
        listAlphaKey = 142,
        listColorKey = 143,
        listParticleMainModule = 144,
        listParticleEmissionModule = 145,
        listParticleShapeModule = 146,
        listParticleVelocityOverLifetimeModule = 147,
        listParticleLimitVelocityOverLifetimeModule = 148,
        listParticleInheritVelocityModule = 149,
        listColorBySpeed = 150,
        listSizeOverLifetime = 151,
        listNoise = 152,
        listTextureSheetAnimation = 153,
        listMinMaxCurve = 154,
        listMinMaxGradient = 155,
        listBurst = 156,
        listPrefab = 157,
        listNumber4 = 158,
        //对应类型的数组 类型+200
        //基础数据
        arrayString = 200,
        arrayByte = 201,
        arraySByte = 202,
        arrayInt16 = 203,
        arrayUInt16 = 204,
        arrayInt32 = 205,
        arrayUInt32 = 206,
        arrayInt64 = 207,
        arrayUInt64 = 208,
        arrayFloat = 209,
        arrayLong = 210,
        arrayDouble = 211,
        arrayBool = 212,
        arrayVector2 = 213,
        arrayVector3 = 214,
        arrayVector4 = 215,
        arrayColor = 216,
        arrayBounds = 217,
        arrayQuaternion = 218,
        //资源常用类型（暂时没有使用）
        arrayF14EffectSystem = 219,
        arrayImageSetting = 220,
        arrayMat = 221,
        arrayGameObject = 222,
        arrayMesh = 223,
        arrayKeyFrameAnimtionClip = 224,
        arrayLinerenderer = 225,
        arrayParticleSystem = 226,
        arrayBoxcollider = 227,
        arrayAniplayer = 228,
        arraySkinnedMeshRenderer = 229,
        arrayMeshRenderer = 230,
        arrayMeshFilter = 231,
        arrayMeshcollider = 232,
        arrayAsbone = 233,
        arrayF4skinnedMeshRenderer = 234,
        arrayTPoseInfo = 235,
        arrayPoseBoneMatrix = 236,
        arrayF14effCmop = 237,
        arrayKeyFrameAniPlayer = 238,
        arrayAnimationCurve1 = 239,
        arraykey = 240,
        arrayGradient = 241,
        arrayAlphaKey = 242,
        arrayColorKey = 243,
        arrayParticleMainModule = 244,
        arrayParticleEmissionModule = 245,
        arrayParticleShapeModule = 246,
        arrayParticleVelocityOverLifetimeModule = 247,
        arrayParticleLimitVelocityOverLifetimeModule = 248,
        arrayParticleInheritVelocityModule = 249,
        arrayColorBySpeed = 250,
        arraySizeOverLifetime = 251,
        arrayNoise = 252,
        arrayTextureSheetAnimation = 253,
        arrayMinMaxCurve = 254,
        arrayMinMaxGradient = 255,
        arrayBurst = 256,
        arrayPrefab = 257,
        arrayNumber4 = 258,
        //其他类型
        typeClass = 1000,
        //其他类型LIST
        listClass = 1100,
        //其他类型数组
        arrayClass = 1200,

    }
