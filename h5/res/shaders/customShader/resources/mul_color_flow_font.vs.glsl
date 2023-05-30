#version 300 es

precision mediump float;

layout(location = 0) in vec4 _glesVertex;
layout(location = 3) in vec4 _glesColor;
layout(location = 8) in vec4 _glesColorEx;
layout(location = 4) in vec4 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp; 

out highp float xlv_X;
out lowp float xlv_Alpha;
out lowp vec4 xlv_COLOR;                 
out lowp vec4 xlv_COLOREx;
out highp vec2 xlv_TEXCOORD0;

void main(){
    highp vec4 position = vec4(_glesVertex.xyz,1.0);    
    position = (glstate_matrix_mvp * position);
    xlv_X = position.x;
    xlv_Alpha = _glesColor.a;
    xlv_COLOR = _glesColor;                      
    xlv_COLOREx = _glesColorEx;   
    xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);  
    gl_Position = position;
}