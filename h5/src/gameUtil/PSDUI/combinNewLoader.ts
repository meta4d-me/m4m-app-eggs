import { newLoader } from "./newLoader";
import { newLoaderManager } from "./newLoaderManager";

enum LoadType {
    ARRAYBUFFER = 0,
    JSON = 1,
    IMAGE = 2,//Scene
}
// tslint:disable-next-line: class-name
export class combinNewLoader {
    //总需要加载的文件数量
    public fileCount: number = 0;
    //当前已经加载文件数量
    public fileLoadedCount: number = 0;
    //加载文件完成的进度
    public sucessProgress: number = 0;
    //总进度
    public progress: number = 0;

    private list: newLoader[] = new Array<newLoader>();
    private loadedFile = [];
    private loadCallBack: Function;
    private progressCallback: Function;
    public add(url: string, callback: Function, type: LoadType = LoadType.ARRAYBUFFER) {

        let loader: newLoader = newLoaderManager.Instance.load(url, callback, url, type);
        this.list.push(loader);
        this.fileCount++;

        return;
    }
    public loaderEnd(loader: newLoader, file: any): void {

        if (file) {
            this.fileLoadedCount++;
            this.sucessProgress = this.fileLoadedCount / this.fileCount;

            this.loadedFile.push(file);
            if (this.loadCallBack && this.fileLoadedCount >= this.fileCount) {
                this.loadCallBack(this.loadedFile);
                this.list.length = 0;
            }
        }

    }
    public start(callback: Function = null): void {
        this.loadCallBack = callback;
        // this.list.forEach((loader) => {
        //     loader.endFunction = this.loaderEnd.bind(this);
        //     loader.load();
        //     this.progressCallback = this.LoadProgress.bind(this);
        //     loader.addProgressCallBack(this.progressCallback)
        // })
        if (this.fileCount <= 0) {
            callback(null);
            return;
        }
        for (let i: number = 0; i < this.list.length; i++) {
            let loader: newLoader = this.list[i];
            loader.endFunction = this.loaderEnd.bind(this);
            loader.load();
            this.progressCallback = this.LoadProgress.bind(this);
            loader.addProgressCallBack(this.progressCallback);
        }
    }
    public LoadProgress(progress: number, fileLoadedCount: number, fileCount: number, bytesLoaded: number, bytesTotal: number) {
        //总进度
        this.progress = bytesLoaded / bytesTotal / this.fileCount + this.sucessProgress;
    }

}