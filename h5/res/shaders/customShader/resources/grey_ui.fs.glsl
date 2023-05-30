#version 300 es

precision mediump float;

uniform sampler2D _MainTex;

in lowp float xlv_Alpha;
in highp vec2 xlv_TEXCOORD0;

out vec4 color;
void main()
{
    lowp vec4 final = texture(_MainTex, xlv_TEXCOORD0);
    lowp float lum = (final.x + final.y + final.z) *  0.3333; 
    final = vec4(lum,lum,lum,xlv_Alpha * final.a);

    color = final ;
}