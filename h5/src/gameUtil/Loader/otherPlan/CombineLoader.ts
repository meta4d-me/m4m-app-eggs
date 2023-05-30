import { Loader } from "./Loader";
import { LoaderManage } from "./LoaderManage";

export class CombineLoader {
    //总需要加载的文件数量
    public fileCount: number = 0;
    //当前已经加载文件数量
    public fileLoadedCount: number = 0;
    //加载文件完成的进度
    public sucessProgress: number = 0;
    //总进度
    public progress: number = 0;
    private list: Loader[] = new Array<Loader>();
    private callback: Function;
    public add(url: string, callback: Function, progress: Function): Loader {
        let loader: Loader = LoaderManage.Instance.load(url, callback, url);
        this.list.push(loader);
        this.fileCount++;
        return null;
    }

    public loaderEnd(loader: Loader): void {
        let index: number = this.list.indexOf(loader);
        if (index != -1) {
            this.list.splice(index, 1);
        }
        this.fileLoadedCount++;
        this.sucessProgress = this.fileLoadedCount / this.fileCount;
    }
    public start(): void {
        for (let i: number = 0; i < this.list.length; i++) {
            let loader: Loader = this.list[i];
            loader.load();
            this.callback = this.LoadProgress.bind(this);
            loader.addProgressCallBack(this.callback);
            loader.endFunction = this.loaderEnd.bind(this);
        }
    }
    public LoadProgress(progress: number, fileLoadedCount: number, fileCount: number, bytesLoaded: number, bytesTotal: number) {
        //总进度
        this.progress = bytesLoaded / bytesTotal / this.fileCount + this.sucessProgress;
    }
}
