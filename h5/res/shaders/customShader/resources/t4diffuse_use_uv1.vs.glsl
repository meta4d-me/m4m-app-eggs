#version 300 es

precision mediump float;

layout(location = 0) in highp vec4 _glesVertex;
layout(location = 4) in mediump vec2 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _Splat0_ST;
uniform mediump vec4 _Splat1_ST;
uniform mediump vec4 _Splat2_ST;
uniform mediump vec4 _Splat3_ST;
uniform mediump vec4 _Control_ST;

//light
lowp mat4 blendMat ;
layout(location = 1) in lowp vec3 _glesNormal;
uniform highp mat4 glstate_matrix_model;

//varing--------------
out mediump vec2 s0_uv_TEXCOORD0;
out mediump vec2 s1_uv_TEXCOORD1;
out mediump vec2 s2_uv_TEXCOORD2;
out mediump vec2 s3_uv_TEXCOORD3;
out mediump vec2 c_uv_TEXCOORD4;
//---------------------

#ifdef LIGHTMAP
layout(location = 5) in mediump vec4 _glesMultiTexCoord1;
uniform mediump vec4 glstate_lightmapOffset;
// uniform mediump float glstate_lightmapUV;
out mediump vec2 lightmap_TEXCOORD;
#endif

#ifdef FOG
// #define glstate_fog_end		150.
// #define glstate_fog_start	1.
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
out lowp float factor;
#endif

void main()
{
    s0_uv_TEXCOORD0 = _glesMultiTexCoord0.xy * _Splat0_ST.xy + _Splat0_ST.zw;
    s1_uv_TEXCOORD1 = _glesMultiTexCoord0.xy * _Splat1_ST.xy + _Splat1_ST.zw;
    s2_uv_TEXCOORD2 = _glesMultiTexCoord0.xy * _Splat2_ST.xy + _Splat2_ST.zw;
    s3_uv_TEXCOORD3 = _glesMultiTexCoord0.xy * _Splat3_ST.xy + _Splat3_ST.zw;
    c_uv_TEXCOORD4  = _glesMultiTexCoord0.xy * _Control_ST.xy + _Control_ST.zw;
    highp vec4 position=vec4(_glesVertex.xyz,1.0);

    //----------------------------------------------------------
    #ifdef LIGHTMAP
    mediump vec2 beforelightUV = _glesMultiTexCoord0.xy;
    lowp float u = beforelightUV.x * glstate_lightmapOffset.x + glstate_lightmapOffset.z;
    lowp float v = beforelightUV.y * glstate_lightmapOffset.y + glstate_lightmapOffset.w;
    lightmap_TEXCOORD = vec2(u,v);
    #endif

    position = (glstate_matrix_mvp * position);

    #ifdef FOG
    factor = (glstate_fog_end - abs(position.z))/(glstate_fog_end - glstate_fog_start);
    factor = clamp(factor, 0.0, 1.0);
    #endif


    gl_Position =position;
}