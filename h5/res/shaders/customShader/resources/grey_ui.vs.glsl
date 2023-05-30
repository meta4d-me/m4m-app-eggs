#version 300 es

precision mediump float;

layout(location = 0) in vec4 _glesVertex;
layout(location = 4) in vec4 _glesMultiTexCoord0;
layout(location = 3) in vec4 _glesColor;

uniform highp mat4 glstate_matrix_mvp; 

out lowp float xlv_Alpha;
out highp vec2 xlv_TEXCOORD0;

void main(){
    highp vec4 position = vec4(_glesVertex.xyz,1.0);    
    position = (glstate_matrix_mvp * position);
    xlv_Alpha = _glesColor.a;
    xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);  
    gl_Position = position;
}