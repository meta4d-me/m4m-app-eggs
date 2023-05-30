#version 300 es
precision mediump float;
layout(location = 0) in vec4 _glesVertex;
layout(location = 3) in vec4 _glesColor;
layout(location = 8) in vec4 _glesColorEx;
layout(location = 4) in vec4 _glesMultiTexCoord0;

//因为front 逻辑不会走fog 通道 所以强行开启
// #ifdef FOG
out lowp float factor;
// #endif

uniform highp vec4 OFFSET;

uniform highp mat4 glstate_matrix_mvp; 
out lowp vec4 xlv_COLOR;     
out lowp vec4 xlv_COLOREx;   
out highp vec2 xlv_TEXCOORD0;

#define DIST 20.0
#define FOG_far	100.0

void main(){
    highp vec4 position = vec4(_glesVertex.xyz,1.0);    
    position = (glstate_matrix_mvp * position);
	highp float zOff = position.z / DIST;
	position += OFFSET * zOff * zOff;     

    // #ifdef FOG
    highp float x = position.z;
    x = clamp(x,0.0,FOG_far);
    highp float a = 2.0*FOG_far/x -1.0;
    factor = 1.0 - 1.0/a;
    // #endif

    xlv_COLOR = _glesColor;       
    xlv_COLOREx = _glesColorEx;
    xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);  
    gl_Position = position;
}