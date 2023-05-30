declare let JSZip;

/**
 * zip 工具
 */
export class ZIPTool {
    /**
     * 加载Zip 文件
     * @param file 完整 zip 文件路径
     * @returns ZipPackage
     */
    public static async loadZip(file: string): Promise<ZipPackage> {
        if (!JSZip) {
            console.error(`没有加载 jszip.js 无法使用JSZip 功能。`);
            return;
        }
        let blob = await new Promise<Blob>((res, rej) => {
            m4m.io.loadBlob(file, (_blob, _err, isFail) => {
                if (isFail) {
                    rej();
                }
                res(_blob);
            });
        });

        let val = await JSZip.loadAsync(blob);
        return val as ZipPackage;
    }
}

export type ZipPackage = { files: { [fileName: string]: IZipFile } };
export interface IZipFile {
    /** 是否是文件夹 */
    dir: boolean;
    name: string;
    date: Date;
    comment: string;
    options: object;
    /** 解压获取数据 */
    async<T extends keyof ZipFileType>(type: T): Promise<any>;
}
type ZipFileType = {
    base64;
    text;
    string;
    binarystring;
    array;
    uint8array;
    arraybuffer;
    blob;
    nodebuffer;
};