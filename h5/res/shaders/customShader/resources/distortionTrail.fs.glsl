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
    if(basecolor.a < 0.01)
        discard;
    //lowp vec4 fristColor=basecolor*_MainColor * vec4(v_color.rgb, 1);
    //lowp vec4 emission = fristColor;
    // lowp vec4 emission =  v_color * basecolor;
    lowp vec4 emission =  basecolor * vec4(1.0,1.0,1.0,v_color.a);

    // Diffuse
    //emission = (fristColor * DIFFUSE) + (fristColor * fixedAmbient);
    //emission = (fristColor * DIFFUSE) + (fristColor * fixedAmbient);

    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    //emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, v_color.a);
    #endif

    color = emission;
}