#version 300 es

precision lowp float;
uniform lowp sampler2D _R;
uniform lowp sampler2D _G;
uniform lowp sampler2D _B;

uniform lowp float _RClose;
uniform lowp float _GClose;
uniform lowp float _BClose;

uniform lowp vec4 _Rcolor;
uniform lowp vec4 _Gcolor;
uniform lowp vec4 _Bcolor;


//in-------------------------
in mediump vec2 uv_R_TEXCOORD;
in mediump vec2 uv_G_TEXCOORD;
in mediump vec2 uv_B_TEXCOORD;
in mediump float v_color_a;

//--------------------------------

//textureEtC1Mark

#define lerp(a, b, v)   (a) * (1.0 - (v)) + (b) * (v) 

#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
in lowp float factor;
#endif


out vec4 color;
void main()
{
    lowp float _tempf = 2.0;
    highp float _RClose_var = lerp( texture( _R , uv_R_TEXCOORD).r, 0.0, _RClose );
    highp float _GClose_var = lerp( texture( _G , uv_G_TEXCOORD).g, 0.0, _GClose );
    highp float _BClose_var = lerp( texture( _B , uv_B_TEXCOORD).b, 0.0, _BClose );
    lowp vec3 finalColor = ((_RClose_var*_Rcolor.rgb*_Rcolor.a*_tempf)+(_GClose_var*_Gcolor.rgb*_Gcolor.a*_tempf)+(_BClose_var*_Bcolor.rgb*_Bcolor.a*_tempf));
    lowp vec4 emission = vec4(finalColor , ((_RClose_var + _GClose_var + _BClose_var) * v_color_a));

    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    #endif
    
    color = emission;
}