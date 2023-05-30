#version 300 es
precision mediump float;
layout(location = 0) in highp vec4 _glesVertex;
layout(location = 4) in mediump vec4 _glesMultiTexCoord0;
layout(location = 3) in vec4 _glesColor;

uniform lowp vec4 _Main_Color;
uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _Main_Tex_ST;

uniform highp vec4 OFFSET;

out highp vec4 v_color;
out mediump vec2 xlv_TEXCOORD0;

#define DIST	20.0
void main()
{
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _Main_Tex_ST.xy + _Main_Tex_ST.zw;
    highp vec4 position=vec4(_glesVertex.xyz,1.0);

    position = (glstate_matrix_mvp * position);

	highp float zOff = position.z / DIST;
	position += OFFSET * zOff * zOff;

	v_color = _glesColor * _Main_Color;
    gl_Position =position;
}