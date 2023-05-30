#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define PI          3.141592653589

uniform samplerCube u_sky;
uniform vec4        glstate_eyepos;
uniform float       u_Exposure;

in vec3        TexCoords;

vec3 decoRGBE(vec4 r) {
    if(r.a != 0.) {
        float e = exp2(r.a * 255. - 128.);
        return vec3(r.r * e, r.g * e, r.b * e);
    }
    return vec3(0);
}

vec3 toneMapACES(vec3 color) {
    const float A = 2.51;
    const float B = 0.03;
    const float C = 2.43;
    const float D = 0.59;
    const float E = 0.14;
    return pow(clamp((color * (A * color + B)) / (color * (C * color + D) + E), 0.0, 1.0), vec3(1.0 / 2.2));
}

out vec4 color; 
void main () {
    color = vec4(toneMapACES(u_Exposure * decoRGBE(texture(u_sky, TexCoords))), 1.0);
}