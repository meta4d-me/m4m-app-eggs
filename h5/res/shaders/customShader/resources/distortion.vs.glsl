#version 300 es

precision mediump float;

layout(location = 0) in highp vec4 _glesVertex;
layout(location = 4) in mediump vec4 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _MainTex_ST;
out mediump vec2 xlv_TEXCOORD0;

layout(location = 1) in lowp vec3 _glesNormal;

out highp vec3 v_N;

#ifdef FOG
out lowp float factor;
#endif

uniform highp vec4 OFFSET;

layout(location = 3) in vec4 _glesColor;
out highp vec4 v_color;

#define DIST	20.0
#define FOG_far	100.0

void main()
{
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
    highp vec4 position=vec4(_glesVertex.xyz,1.0);

	v_N = _glesNormal;
    position = (glstate_matrix_mvp * position);

	highp float zOff = position.z / DIST;
	position += OFFSET * zOff * zOff;

    #ifdef FOG
    highp float x = position.z;
    x = clamp(x,0.0,FOG_far);
    highp float a = 2.0*FOG_far/x -1.0;
    factor = 1.0 - 1.0/a;
    #endif
	v_color = _glesColor;
    gl_Position =position;
}