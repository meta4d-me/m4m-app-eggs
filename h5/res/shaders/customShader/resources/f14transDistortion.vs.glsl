#version 300 es

layout(location = 0) in highp vec4 _glesVertex;
layout(location = 4) in mediump vec4 _glesMultiTexCoord0;
layout(location = 3) in vec4 _glesColor;

layout(location = 1) in lowp vec3 _glesNormal;

uniform lowp vec4 _Main_Color;
uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _Main_Tex_ST;

uniform highp vec4 OFFSET;



// #ifdef FOG
out lowp float factor;
// #endif

out highp vec4 xlv_COLOR;
out mediump vec2 xlv_TEXCOORD0;


#define DIST	20.0
#define FOG_far	100.0  

void main()
{
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _Main_Tex_ST.xy + _Main_Tex_ST.zw;
    highp vec4 position=vec4(_glesVertex.xyz,1.0);

    position = (glstate_matrix_mvp * position);

	highp float zOff = position.z / DIST;
	position += OFFSET * zOff * zOff;

    // #ifdef FOG
	highp float x = position.z;
    x = clamp(x,0.0,FOG_far);
    highp float a = 2.0*FOG_far/x -1.0;
    factor = 1.0 - 1.0/a;
    // #endif

	xlv_COLOR = _glesColor * _Main_Color;
    gl_Position =position;
}