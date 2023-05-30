export class UploadIpfsDataEvent{
    /** 初始化全部数据*/
    public static All = "All";
    /** 批量加载数据*/
    public static ChangeList = "ChangeList";
    /** 提示数据*/
    public static TipData = "TipData";
    /** ID*/
    public static id = "id";
    /** 图片名称*/
    public static ImageName = "ImageName";
    /** 本地图片路径*/
    public static ImageUrl = "ImageUrl";
    /** 上传的ipfs上的图片唯一标识*/
    public static IpfsImagehash = "IpfsImagehash";
    /** 本地资源路径*/
    public static modelUrl = "modelUrl";
    /** 上传的ipfs上到资源唯一标识*/
    public static Ipfsmodelhash = "Ipfsmodelhash";
}