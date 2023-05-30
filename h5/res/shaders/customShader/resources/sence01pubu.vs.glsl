#version 300 es

precision mediump float;

layout(location = 0) in highp vec4 _glesVertex;
layout(location = 4) in mediump vec2 _glesMultiTexCoord0;
layout(location = 3) in lowp vec4 _glesColor;

uniform float glstate_timer;
uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _R_ST;
uniform mediump vec4 _G_ST;
uniform mediump vec4 _B_ST;

uniform mediump float _RS;
uniform mediump float _GS;
uniform mediump float _BS;

//varing ---------
out mediump vec2 uv_R_TEXCOORD;
out mediump vec2 uv_G_TEXCOORD;
out mediump vec2 uv_B_TEXCOORD;
out mediump float v_color_a;

//----------------

#ifdef FOG
// #define glstate_fog_end		150.
// #define glstate_fog_start	1.
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
out lowp float factor;
#endif


void main()
{
	lowp float timeScale = 1.0;
	v_color_a = _glesColor.a;
    uv_R_TEXCOORD = (_glesMultiTexCoord0 + (timeScale * glstate_timer * _RS) * vec2(0.0,-1.0)) * _R_ST.xy + _R_ST.zw;
    uv_G_TEXCOORD = (_glesMultiTexCoord0 + (timeScale * glstate_timer * _GS) * vec2(0.0,-1.0)) * _G_ST.xy + _G_ST.zw;
    uv_B_TEXCOORD = (_glesMultiTexCoord0 + (timeScale * glstate_timer * _BS) * vec2(0.0,-1.0)) * _B_ST.xy + _B_ST.zw;

    highp vec4 position = vec4(_glesVertex.xyz,1.0);
    position = (glstate_matrix_mvp * position);

    #ifdef FOG
    factor = (glstate_fog_end - abs(position.z))/(glstate_fog_end - glstate_fog_start);
    factor = clamp(factor, 0.0, 1.0);
    #endif

    gl_Position = position;
}