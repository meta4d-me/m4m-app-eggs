#version 300 es

precision lowp float;
uniform lowp sampler2D _MainTex;
uniform lowp vec4 _MainColor;

in mediump vec2 xlv_TEXCOORD0;
in highp vec4 v_color;

in lowp vec3 v_N;

#ifdef FOG
uniform lowp vec4 glstate_fog_color;
in lowp float factor;
#endif

out vec4 color; 
void main()
{
    //gl_FragData[0] = v_color;

    lowp vec4 basecolor = texture(_MainTex, xlv_TEXCOORD0);
    if(basecolor.a < 0.8)
        discard;
    lowp vec4 fristColor = basecolor*_MainColor;
    lowp vec4 emission = fristColor;

    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, v_color.a);
    #endif

    color = emission;
}