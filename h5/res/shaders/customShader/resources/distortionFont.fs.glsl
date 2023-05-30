#version 300 es

precision mediump float;
uniform sampler2D _MainTex;

uniform lowp vec4 glstate_fog_color;
uniform highp float _outlineWidth; // 描边宽度

// #ifdef FOG
in lowp float factor;
// #endif

in lowp vec4 xlv_COLOR;
in lowp vec4 xlv_COLOREx;
in highp vec2 xlv_TEXCOORD0;

out vec4 color;

void main()
{
    // 在m4m中使用的sdf字体做了最大值为2像素的有向距离运算且保存到位图上。
    // 颜色值[0,255]对于区间[-2,2]。
    // 颜色值v表示距离字符边缘有 (v/255*4-2) 单位距离。单位距离为正表示在字符内，否则在字符外。
    
    float _DistanceMark = 0.0; // 距离为 0 处是字符边缘
    float _SmoothDelta = 0.5; // 在字符边缘 0.5 像素进行插值 

    float _OutlineDistanceMark = -_outlineWidth; // 描边位置

    vec4 col = texture(_MainTex, xlv_TEXCOORD0);
    float distance = col.r * 4.0 - 2.0;

    // 平滑字体边缘
    col.a = smoothstep(_DistanceMark - _SmoothDelta, _DistanceMark + _SmoothDelta, distance);
    col.rgb = xlv_COLOR.rgb;
    
    // Outlining 描边
    vec4 outlineCol = vec4(1.0,1.0,1.0,1.0);

    outlineCol.a = smoothstep(_OutlineDistanceMark - _outlineWidth, _OutlineDistanceMark + _outlineWidth, distance);
    outlineCol.rgb = xlv_COLOREx.rgb;
    outlineCol.a = outlineCol.a * xlv_COLOREx.a;
    
    // 混合字体与描边颜色
    col = mix(outlineCol, col, col.a);

    col.a = col.a * xlv_COLOR.a;

    color.a = col.a;
    color.xyz = mix(glstate_fog_color.rgb, col.rgb, factor);
}