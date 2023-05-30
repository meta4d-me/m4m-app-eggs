#version 300 es

precision mediump float;

uniform lowp sampler2D _Splat0;
uniform lowp sampler2D _Splat1;
uniform lowp sampler2D _Splat2;
uniform lowp sampler2D _Splat3;
uniform lowp sampler2D _Control;

//in-----------------------------
in mediump vec2 s0_uv_TEXCOORD0;
in mediump vec2 s1_uv_TEXCOORD1;
in mediump vec2 s2_uv_TEXCOORD2;
in mediump vec2 s3_uv_TEXCOORD3;
in mediump vec2 c_uv_TEXCOORD4;

//------------------------------------

//textureEtC1Mark

#ifdef LIGHTMAP
uniform lowp sampler2D _LightmapTex;
in mediump vec2 lightmap_TEXCOORD;
lowp vec3 decode_hdr(lowp vec4 data)
{
    lowp float power =pow( 2.0 ,data.a * 255.0 - 128.0);
    return data.rgb * power * 2.0 ;
}
#endif

#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
in lowp float factor;
#endif


out vec4 color;
void main()
{
    // lowp vec4 basecolor = texture(_MainTex, xlv_TEXCOORD0);
    // if(basecolor.a < _AlphaCut)
    //     discard;
    // lowp vec4 fristColor = basecolor;
    // lowp vec4 emission = fristColor;
    lowp vec4 emission = vec4(.0,.0,.0,.0);

    //----------------------------------------------------------
    lowp vec4 splat_control = texture(_Control, c_uv_TEXCOORD4);
    lowp float weight = dot(splat_control, vec4(1.0, 1.0, 1.0, 1.0));
    splat_control /= (weight + 0.001);

    lowp vec4 mixedDiffuse = vec4(.0,.0,.0,.0);
    mixedDiffuse += splat_control.r * texture(_Splat0, s0_uv_TEXCOORD0);
    mixedDiffuse += splat_control.g * texture(_Splat1, s1_uv_TEXCOORD1);
    mixedDiffuse += splat_control.b * texture(_Splat2, s2_uv_TEXCOORD2);
    mixedDiffuse += splat_control.a * texture(_Splat3, s3_uv_TEXCOORD3);
    emission = vec4(mixedDiffuse.xyz , weight);

    #ifdef LIGHTMAP
        lowp vec4 lightmap = texture(_LightmapTex, lightmap_TEXCOORD);
        emission.xyz *= decode_hdr(lightmap);
    #endif

    #ifdef FOG
        emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    #endif
    
    color = emission;
}