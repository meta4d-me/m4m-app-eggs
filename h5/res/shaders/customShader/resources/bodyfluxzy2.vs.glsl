#version 300 es

precision mediump float;

layout(location = 0) in highp vec4 _glesVertex;
layout(location = 4) in mediump vec4 _glesMultiTexCoord0;
// layout(location = 5) in mediump vec4 _glesMultiTexCoord1;
layout(location = 2) in highp vec3 _glesTangent;	//w 被乘到了分量里 x = x*w , y = y*w , z = z*w , 且 w 被做了 +2 的偏移映射。

uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _MainTex_ST;
uniform mediump vec4 _FluxayTex_ST;
uniform mediump vec4 _FluxayTex2_ST;
//light
lowp mat4 blendMat ;
layout(location = 1) in highp vec3 _glesNormal;
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_it_modelview;
uniform highp mat4 glstate_matrix_modelview;


//out--------------------------
out mediump vec2 uv_TEXCOORD0;
out mediump vec2 uv_FluxayTex_TEXCOORD2;
out mediump vec2 uv_FluxayTex2_TEXCOORD3;

out highp mat3 TBNmat;

// out highp vec3 tSpace0;
// out highp vec3 tSpace1;
// out highp vec3 tSpace2;

out highp vec3 t;

//获取 tangent 的 W 值
lowp float tangentW(lowp vec3 _tangent){
	return sqrt(_tangent.x * _tangent.x + _tangent.y * _tangent.y + _tangent.z * _tangent.z) - 2.0;
}

//---------------------------------

//计算 TBN 矩阵-----------------
mediump mat3 calTBNMatrix(highp mat4 _m_mat,lowp vec3 _normal,lowp vec3 _tangent)
{
    lowp vec3 normal = normalize(mat3(_m_mat) * normalize(_normal) );
    lowp vec3 tangent = normalize(mat3(_m_mat) * normalize(_tangent));
    lowp vec3 binormal = cross( normal , tangent) * tangentW(_tangent);
  	return mat3(tangent,binormal,normal);
}
//-----------------------------

mediump vec3 UnityObjectToWorldNormal(mediump mat3 _m_mat,mediump vec3 _normal){
	 return normalize(_m_mat * _normal);
}

#ifdef FOG
// #define glstate_fog_end		150.
// #define glstate_fog_start	1.
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
out lowp float factor;
#endif

#ifdef SKIN
layout(location = 6) in lowp vec4 _glesBlendIndex4;
layout(location = 7) in lowp vec4 _glesBlendWeight4;
uniform highp vec4 glstate_vec4_bones[110];
mat4 buildMat4(int index)
{
	vec4 quat = glstate_vec4_bones[index * 2 + 0];
	vec4 translation = glstate_vec4_bones[index * 2 + 1];
	float xy = 2.0 * quat.x * quat.y;
	float xz = 2.0 * quat.x * quat.z;
	float xw = 2.0 * quat.x * quat.w;
	float yz = 2.0 * quat.y * quat.z;
	float yw = 2.0 * quat.y * quat.w;
	float zw = 2.0 * quat.z * quat.w;
	float xx = 2.0 * quat.x * quat.x;
	float yy = 2.0 * quat.y * quat.y;
	float zz = 2.0 * quat.z * quat.z;
	float ww = 2.0 * quat.w * quat.w;
	float s = translation.w;
	mat4 matrix = mat4(
	(1.0-yy-zz)*s, (xy+zw)*s, (xz-yw)*s, 0,
	(xy-zw)*s, (1.0-xx-zz)*s, (yz + xw)*s, 0,
	(xz + yw)*s, (yz - xw)*s, (1.0-xx-yy)*s, 0,
	translation.x, translation.y, translation.z, 1);
	return matrix;
}
highp vec4 calcVertex(highp vec4 srcVertex,lowp vec4 blendIndex,lowp vec4 blendWeight)
{
	int i = int(blendIndex.x);
    int i2 =int(blendIndex.y);
	int i3 =int(blendIndex.z);
	int i4 =int(blendIndex.w);

    blendMat = buildMat4(i)*blendWeight.x
			 + buildMat4(i2)*blendWeight.y
			 + buildMat4(i3)*blendWeight.z
			 + buildMat4(i4)*blendWeight.w;
	return blendMat * srcVertex;
}

#endif

void calcNormal(highp vec4 pos){
	highp vec3 _n = vec3(.0,.0,.0);
    //求世界空间法线
    #ifdef SKIN
    _n = normalize(mat3(blendMat) * _glesNormal);
    #else
    _n = _glesNormal;
    #endif
    lowp mat3 normalmat = mat3(glstate_matrix_model);

	TBNmat = calTBNMatrix(glstate_matrix_model , _n , _glesTangent);

}

void main()
{
    highp vec4 position=vec4(_glesVertex.xyz,1.0);
    uv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
    uv_FluxayTex_TEXCOORD2 = _glesMultiTexCoord0.xy * _FluxayTex_ST.xy + _FluxayTex_ST.zw;
    uv_FluxayTex2_TEXCOORD3 = _glesMultiTexCoord0.xy * _FluxayTex2_ST.xy + _FluxayTex2_ST.zw;

    //----------------------------------------------------------

    #ifdef SKIN
    position =calcVertex(position,_glesBlendIndex4,_glesBlendWeight4);
    #endif
	//light
    calcNormal(position);

	// t = normalize(_glesTangent);
	

	//mediump mat3 rotation = calTANGENT_SPACE_ROTATION(_glesNormal , _glesTangent);
	

	// highp mat4 itMat = glstate_matrix_it_modelview;

	// c0 = rotation * normalize(glstate_matrix_modelview[0].xyz);
	// c1 = rotation * normalize(glstate_matrix_modelview[1].xyz);
	// c0 = TBNmat * normalize(glstate_matrix_it_modelview[0].xyz);
	// c1 = TBNmat * normalize(glstate_matrix_it_modelview[1].xyz);

	
	// highp mat3 wMat = mat3(glstate_matrix_model);
	// highp vec3 worldNormal = UnityObjectToWorldNormal(wMat , _glesNormal);
	// highp vec3 worldTangent = wMat * _glesTangent;
	// highp vec3 worldBinormal = cross(worldNormal, worldTangent) ;
	// tSpace0 = vec3(worldTangent.x, worldBinormal.x, worldNormal.x);
	// tSpace1 = vec3(worldTangent.y, worldBinormal.y, worldNormal.y);
	// tSpace2 = vec3(worldTangent.z, worldBinormal.z, worldNormal.z);


    
	position = (glstate_matrix_mvp * position);

    #ifdef FOG
    factor = (glstate_fog_end - abs(position.z))/(glstate_fog_end - glstate_fog_start);
    factor = clamp(factor, 0.0, 1.0);
    #endif


    gl_Position =position;
}