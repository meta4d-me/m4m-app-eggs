export class SeverConfigBaseEvent{
    /** 初始化全部数据*/
    public static All = "All";
    /** 批量加载数据*/
    public static ChangeList = "ChangeList";
    /** 提示数据*/
    public static TipData = "TipData";
    /** 配置ID*/
    public static id = "id";
    /** 备注*/
    public static depict = "depict";
    /** ip*/
    public static ip = "ip";
    /** 网关地址*/
    public static gateWay = "gateWay";
    /** 区服ID*/
    public static serverID = "serverID";
    /** 区服名称*/
    public static serverName = "serverName";
    /** 区服状态:
1.爆满
2.维护
3.流畅*/
    public static serverState = "serverState";
    /** 新区*/
    public static newServer = "newServer";
    /** MAC地址*/
    public static MAC = "MAC";
    /** 启动时间*/
    public static setupTime = "setupTime";
    /** 状态*/
    public static status = "status";
    /** 当前人数*/
    public static playerSum = "playerSum";
    /** 是否为网关*/
    public static isGate = "isGate";
    /** 备注IP*/
    public static descIP = "descIP";
    /** 地图更新序号*/
    public static mapSaveVer = "mapSaveVer";
    /** 小地图显示玩家等级下限*/
    public static mapShowLevel = "mapShowLevel";
    /** 地图分割尺寸*/
    public static mapSplit = "mapSplit";
    /** 心跳断开限制*/
    public static heatbeatLimit = "heatbeatLimit";
    /** 每日最大野外战斗次数*/
    public static battleTimes = "battleTimes";
    /** 行军速度*/
    public static marchSpeed = "marchSpeed";
    /** 战役推图玩家基础最大体力*/
    public static campaignMaxStamina = "campaignMaxStamina";
    /** 每日购买体力基础次数*/
    public static PhysicalTime = "PhysicalTime";
    /** 上阵基础数量*/
    public static arrangeNum = "arrangeNum";
    /** 战役起始关卡*/
    public static campaignStartId = "campaignStartId";
    /** 扫荡模式变更*/
    public static sweepModeChanged = "sweepModeChanged";
    /** 推荐阵营奖励*/
    public static recomCampReward = "recomCampReward";
    /** 阵营加入等级*/
    public static campJoin = "campJoin";
    /** 围攻等待时间*/
    public static siegeWaitTime = "siegeWaitTime";
    /** 围攻提高消耗时间*/
    public static siegeMaxTime = "siegeMaxTime";
    /** 突袭消耗*/
    public static strikeCost = "strikeCost";
    /** 围攻低消耗*/
    public static siegeMinCost = "siegeMinCost";
    /** 围攻高消耗*/
    public static siegeMaxCost = "siegeMaxCost";
    /** 召回功能消耗道具与数量*/
    public static callBack = "callBack";
    /** 快速召回消耗道具与数量*/
    public static fastCallBack = "fastCallBack";
    /** 行军加速消耗道具与数量*/
    public static marchSpeedUp = "marchSpeedUp";
    /** 超级行军加速消耗道具与数量*/
    public static superMarchSpeedUp = "superMarchSpeedUp";
    /** 炸矿消耗*/
    public static minerAttack = "minerAttack";
    /** 同阵营炸矿每日次数*/
    public static sameCampMinerAttackLim = "sameCampMinerAttackLim";
    /** 领地失守后免战时间（秒）*/
    public static avoidWarTime = "avoidWarTime";
    /** 免战特效*/
    public static avoidWarEffect = "avoidWarEffect";
    /** 装备库最终解锁容量上限*/
    public static maxEquipVolume = "maxEquipVolume";
    /** 突破解锁条件*/
    public static breakOutUnlock = "breakOutUnlock";
    /** 日常任务解锁条件*/
    public static dailyEventUnlock = "dailyEventUnlock";
    /** 解锁野外需要的玩家等级*/
    public static unlockWildLevel = "unlockWildLevel";
    /** 军情功能解锁条件*/
    public static IntelligenceUnlock = "IntelligenceUnlock";
    /** 装备自动锁定品质*/
    public static equipAuutoLock = "equipAuutoLock";
    /** 普通成长恢复时间（秒）*/
    public static commonGrowthRecover = "commonGrowthRecover";
    /** 普通成长恢复最大上限*/
    public static commonGrowthMaxTime = "commonGrowthMaxTime";
    /** 没有使用*/
    public static seniorGrowthCost = "seniorGrowthCost";
    /** 跳过战斗时间（秒）*/
    public static battleJumpTime = "battleJumpTime";
    /** 狂暴开始回合*/
    public static furiousRound = "furiousRound";
    /** 狂暴强化倍率*/
    public static furiousStrengthen = "furiousStrengthen";
    /** 狂暴强化上限*/
    public static furiousMaxStrengthen = "furiousMaxStrengthen";
    /** 据点免战时间（秒）*/
    public static fortifiedAvoidWarTime = "fortifiedAvoidWarTime";
    /** 申请总督时长（秒）*/
    public static applyGvernorTime = "applyGvernorTime";
    /** 据点总督撤离时间（秒）*/
    public static fortifiedRetreatTime = "fortifiedRetreatTime";
    /** 玩家进攻据点限制*/
    public static fortifiedAvailable = "fortifiedAvailable";
    /** 资源田收取间隔（间隔多少秒可以收取一次资源）*/
    public static resourceGetInterval = "resourceGetInterval";
    /** 资源田计算时间（每隔多少秒获取一次addrescue）*/
    public static resourceGetTime = "resourceGetTime";
    /** 初次引导气泡获取奖励*/
    public static firstGuideReward = "firstGuideReward";
    /** 掠夺资源数量%*/
    public static plunderPrecent = "plunderPrecent";
    /** 工人掠夺的数量%*/
    public static HamalplunderPrecent = "HamalplunderPrecent";
    /** 工人损失数量%*/
    public static HamalLostPrecent = "HamalLostPrecent";
    /** 阵营建设每日最大次数*/
    public static campDevelopMaxTime = "campDevelopMaxTime";
    /** 改名卡消耗*/
    public static changNameCost = "changNameCost";
    /** 改名卡消耗不足替换*/
    public static changNameExchange = "changNameExchange";
    /** 喇叭消耗*/
    public static hornCost = "hornCost";
    /** 喇叭消耗不足替换*/
    public static hornCostExchange = "hornCostExchange";
    /** 聊天间隔cd*/
    public static chatCd = "chatCd";
    /** 解锁队列1介绍*/
    public static Arrangement1UnlockDesc = "Arrangement1UnlockDesc";
    /** 解锁队列2介绍*/
    public static Arrangement2UnlockDesc = "Arrangement2UnlockDesc";
    /** 邮件分享CD*/
    public static mailShareCd = "mailShareCd";
    /** 邮件默认保存时间*/
    public static mailSaveTime = "mailSaveTime";
    /** 邮件最大持有数量*/
    public static mailMaxKeep = "mailMaxKeep";
    /** 免费附魔恢复间隔时间*/
    public static enchantingFreeRefreshInterval = "enchantingFreeRefreshInterval";
    /** 普通附魔消耗*/
    public static commonGrowthCost = "commonGrowthCost";
    /** 高级附魔每次消耗*/
    public static seniorEnchantingCost = "seniorEnchantingCost";
    /** 终极附魔消耗*/
    public static ultimateEnchantingCost = "ultimateEnchantingCost";
    /** 免费附魔最大次数*/
    public static enchantingFreeTimesLimit = "enchantingFreeTimesLimit";
    /** 附魔气泡出现免费次数*/
    public static EnchantingBubble = "EnchantingBubble";
    /** 祭坛出现条件，（消耗n倍时出现）*/
    public static altarBubble = "altarBubble";
    /** 活动按钮出现条件*/
    public static activityIconAvailable = "activityIconAvailable";
    /** 福利按钮出现条件*/
    public static welfareIconAvailable = "welfareIconAvailable";
    /** 特惠按钮出现条件*/
    public static preferentialIconAvailable = "preferentialIconAvailable";
}