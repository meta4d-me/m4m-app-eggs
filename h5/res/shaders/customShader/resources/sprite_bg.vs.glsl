#version 300 es

precision highp float;

layout(location = 0) in vec4 _glesVertex;
layout(location = 4) in vec2 _glesMultiTexCoord0;

uniform mat4 glstate_matrix_mvp;

out lowp vec2 uv;

#ifdef FOG
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
out lowp float factor;
#endif

void main()
{
    vec4 position = vec4(_glesVertex.xyz,1.0);

    position = glstate_matrix_mvp * position;

    uv = _glesMultiTexCoord0.xy;

    #ifdef FOG
    factor = (glstate_fog_end - abs(position.z))/(glstate_fog_end - glstate_fog_start);
    factor = clamp(factor, 0.0, 1.0);
    #endif
    
    gl_Position = position;
}