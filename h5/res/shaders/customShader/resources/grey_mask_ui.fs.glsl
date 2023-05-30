#version 300 es

precision mediump float;

uniform sampler2D _MainTex;
uniform highp vec4 _maskRect;

in lowp float xlv_Alpha;
in highp vec2 xlv_TEXCOORD0;
in highp vec2 mask_TEXCOORD;

bool CalcuCut(){    
    highp float l; 
    highp float t; 
    highp float r; 
    highp float b; 
    highp vec2 texc1; 
    bool beCut; 
    l = _maskRect.x; 
    t = _maskRect.y; 
    r = _maskRect.z + l; 
    b = _maskRect.w + t; 
    texc1 = mask_TEXCOORD; 
    if(texc1.x >(1.0 - l) || texc1.x <(1.0 - r) || texc1.y <t || texc1.y>b){  
        beCut = true;  
    }else{ 
        beCut = false; 
    } 
    return beCut; 
} 

out vec4 color;
void main()
{
    if(CalcuCut()) discard;
    lowp vec4 final = texture(_MainTex, xlv_TEXCOORD0);
    lowp float lum = (final.x + final.y + final.z) *  0.3333; 
    final = vec4(lum,lum,lum,xlv_Alpha * final.a);

    color = final ;
}