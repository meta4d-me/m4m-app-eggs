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

#define fixedAmbient    vec4(0.6, 0.6, 0.6, 1.0)
#define LIGHT_COLOR     vec4(1)
#define LIGHT_DIRECTION vec3(0, 1, 0)
#define DIFFUSE_CTB     dot(normalize(v_N.xyz), normalize(LIGHT_DIRECTION))
#define DIFFUSE         max(DIFFUSE_CTB, 0.0) * LIGHT_COLOR

out vec4 color; 
void main()
{
    //gl_FragData[0] = v_color;

    lowp vec4 basecolor = texture(_MainTex, xlv_TEXCOORD0);
    if(basecolor.a < 0.1)
        discard;
    lowp vec4 fristColor=basecolor*_MainColor * vec4(v_color.rgb, 1);
    lowp vec4 emission = fristColor;

    // Diffuse
    emission = (fristColor * DIFFUSE) + (fristColor * fixedAmbient);

    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, v_color.a);
    #endif

   color = emission;
}