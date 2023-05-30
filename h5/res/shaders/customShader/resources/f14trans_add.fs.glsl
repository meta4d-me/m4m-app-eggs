#version 300 es
precision mediump float;
uniform mediump sampler2D _Main_Tex;
in lowp vec4 v_color;
in mediump vec2 xlv_TEXCOORD0;

out vec4 color; 
void main()
{
    lowp vec4 basecolor = texture(_Main_Tex, xlv_TEXCOORD0);
    // if(basecolor.a < 0.6)
    //     discard;
    lowp vec4 emission = basecolor * v_color;

    color = emission;
}