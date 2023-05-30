export class ItemBaseEvent{
    /** 初始化全部数据*/
    public static All = "All";
    /** 批量加载数据*/
    public static ChangeList = "ChangeList";
    /** 提示数据*/
    public static TipData = "TipData";
    /** 配置ID*/
    public static id = "id";
    /** 道具名字*/
    public static itemName = "itemName";
    /** 描述*/
    public static desc = "desc";
    /** 图标*/
    public static icon = "icon";
    /** 模型*/
    public static model = "model";
    /** 特效*/
    public static effect = "effect";
    /** 页签类型*/
    public static tagType = "tagType";
    /** 道具类型
1.基础货币
2.消耗品
3.宝箱
4.碎片
5.其他物品
6.装备*/
    public static itemType = "itemType";
    /** 品质*/
    public static quality = "quality";
    /** 叠加数量限制*/
    public static maxNum = "maxNum";
    /** 使用类型
1.直接单个使用
2.批量使用*/
    public static useType = "useType";
    /** 使用限制*/
    public static useLimit = "useLimit";
    /** 效果脚本*/
    public static useEffect = "useEffect";
    /** 跳转*/
    public static jump = "jump";
    /** 去使用（引导）*/
    public static use = "use";
    /** 装备类型
1：头盔
2：盔甲*/
    public static equipType = "equipType";
    /** 属性*/
    public static status = "status";
    /** 升级提升属性*/
    public static statusUp = "statusUp";
    /** lv上限*/
    public static lv = "lv";
    /** 稀有度*/
    public static rera = "rera";
    /** 出售价格*/
    public static sale = "sale";
    /** 购买价格*/
    public static buy = "buy";
    /** 分解获得消耗物品数量[道具id，数量区间最小值:数量区间最大值]*/
    public static decompose = "decompose";
    /** 是否立即使用*/
    public static imUse = "imUse";
}