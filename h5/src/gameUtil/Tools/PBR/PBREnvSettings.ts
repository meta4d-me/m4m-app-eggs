/** PBR 环境设置 */
export class PBREnvSettings {
    /** 天空盒资源名 */
    public skyBox: string = "";
    /** 曝光强度强度 */
    public exposure: number = 1;
    /** pbr是否使用间接环境光照图 */
    public pbrUseEnvMap: boolean = true;

    // //环境天光
    // public ambientCubemapLight: AmbientCubemapLight;
    // //主光
    // public mainLight: Light;
    // //次光
    // public secondaryLight: Light;
    // //第三光
    // public tertiaryLight: Light;

    // //set json 关注的字段列表
    // private static readonly jsonCareList = [
    //     "ambientCubemapLight",
    //     "mainLight",
    //     "secondaryLight",
    //     "tertiaryLight",
    // ];

    // /**
    //  * 设置通过 json 数据
    //  * @param jsonStr json 字符串
    //  * @returns 
    //  */
    // public setByJson(jsonStr: string) {
    //     if (!jsonStr) { return; }
    //     let jsonObj: object;
    //     try {
    //         jsonObj = JSON.parse(jsonStr);
    //     } catch (err) {
    //         console.error(`set fial json parse error : ${err}`);
    //     }
    //     if (!jsonObj) { return; }
    //     let list = PBREnvSettings.jsonCareList;
    //     for (let i = 0, len = list.length; i < len; i++) {
    //         let key = list[i];
    //         let val = jsonObj[key];
    //         if (val == null) { continue; }
    //         this[key] = val;
    //     }
    // }
}

// type AmbientCubemapLight = {
//     texture: string,
//     $texture: string,
//     $textureOptions: string[],
//     exposure: number,
//     diffuseIntensity: number,
//     specularIntensity: number,
// };

// type Light = {
//     shadow: false,
//     shadowQuality: string,
//     intensity: number,
//     color: string,
//     alpha: number,
//     beta: number,
//     $padAngle: number[],
// };