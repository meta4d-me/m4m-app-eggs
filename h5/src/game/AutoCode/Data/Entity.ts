namespace Entity {
    export type Dictionary<K, V> = {
        [key: string | number]: V;
    };
    export type List<V> = {
        [Symbol.iterator]: V;
        [key: number]: V;
        get length(): number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AbyssBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 深渊层数 */
        abyssLayer?: number;
        /** 表类型: string, 注释: 深渊名称 */
        abyssName?: string;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: string, 注释: 背景图 */
        background?: string;
        /** 表类型: data_ArmyDate, 注释: 怪物配置 */
        monsterConfiguration?: ArmyDate;
        /** 表类型: int, 注释: 挑战消耗次数 */
        challengeConsumptionTimes?: number;
        /** 表类型: string, 注释: 消耗探索卷数量 */
        consumptionExplorationVolume?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AbyssPurchaseTimesBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 贵族等级 */
        nobleLv?: number;
        /** 表类型: int, 注释: 每日购买次数上限 */
        dayLimit?: number;
        /** 表类型: int, 注释: 每次购买获得次数 */
        timesBuy?: number;
        /** 表类型: string, 注释: 单次购买消耗 */
        consume?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AbyssSweepsBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 扫荡等级 */
        SweepingLv?: number;
        /** 表类型: int, 注释: 解锁层数 */
        unlockLayer?: number;
        /** 表类型: string, 注释: 攻击符文奖池 */
        actRuneJackpot?: string;
        /** 表类型: string, 注释: 防御符文奖池 */
        defRuneJackpot?: string;
        /** 表类型: string, 注释: 统率符文奖池 */
        comRuneJackpot?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AccelerateBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 加速名称 */
        accelerateName?: string;
        /** 表类型: string, 注释: 所加速功能：
1.建造加速
2.研发科技
3.招募士兵
4.铁匠加速 */
        accelerateSystem?: string;
        /** 表类型: byte, 注释: 加速类型
1.钻石加速直接完成
2.道具加速 */
        accelerateType?: number;
        /** 表类型: data_ItemBase, 注释: 加速 */
        accelerateTime?: ItemBase;
        /** 表类型: data_ItemExchangeBase, 注释: 道具兑换 */
        accelerateExchange?: ItemExchangeBase;
        /** 表类型: byte, 注释: 最小时间间隔（秒） */
        minInterval?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AchievementReward = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 支线任务累计完成奖励宝箱 */
        achievementName?: string;
        /** 表类型: int, 注释: 支线任务完成数量 */
        achievementGoal?: number;
        /** 表类型: string, 注释: 支线任务完成累计奖励 */
        achievementReward?: string;
        /** 表类型: string, 注释: 奖励宝箱显示图 */
        RewardIcon?: string;
        /** 表类型: string, 注释: 已领取宝箱显示图 */
        GetRewardIcon?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ActivetyCloseData = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 活动类型
1抽奖活动
2任务活动
3buff活动
4积分排名活动
5成长基金活动
6体力赠送活动
7每日登录活动 */
        activityType?: number;
        /** 表类型: int, 注释: 活动编号 */
        activityNumber?: number;
        /** 表类型: byte, 注释: 排序优先级
1high
2Medium
3low */
        sortPriority?: number;
        /** 表类型: string, 注释: 活动名称 */
        activityName?: string;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: string, 注释: 背景图 */
        backgroundPicture?: string;
        /** 表类型: string, 注释: 横幅 */
        banner?: string;
        /** 表类型: string, 注释: 开启条件 */
        OpeningConditions?: string;
        /** 表类型: string, 注释: 活动说明 */
        activityDescription?: string;
        /** 表类型: int, 注释: 时间类型
1.永久活动
2.固定年月日开启
3.开服后第n天
4.合服后第n天
5.每月第n天开始
6.每周第n天开始
7.每天n点开始
8.开始时间点，每隔n天开启一次 */
        timeType?: number;
        /** 表类型: string, 注释: 开始时间点 */
        startTime?: string;
        /** 表类型: string, 注释: 持续时间{秒} */
        endTime?: string;
        /** 表类型: string, 注释: 活动提前预览时间{秒} */
        activityPreviewTime?: string;
        /** 表类型: string, 注释: 活动保留时间{秒} */
        activityRetentionTime?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ActivetyOpenData = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 活动类型
1抽奖活动
2任务活动3buff活动
4积分排名活动 */
        activityType?: number;
        /** 表类型: int, 注释: 活动编号 */
        activityNumber?: number;
        /** 表类型: string, 注释: 开启条件 */
        OpeningConditions?: string;
        /** 表类型: string, 注释: 活动说明 */
        activityDescription?: string;
        /** 表类型: ulong, 注释: 开始时间点 */
        startTime?: number;
        /** 表类型: ulong, 注释: 持续时间{秒} */
        endTime?: number;
        /** 表类型: ulong, 注释: 活动提前预览时间{秒} */
        activityPreviewTime?: number;
        /** 表类型: ulong, 注释: 活动保留时间{秒} */
        activityRetentionTime?: number;
        /** 表类型: int, 注释: 所属活动组 */
        activityGroup?: number;
        /** 表类型: int, 注释: 时间类型
1.永久活动
2.固定年月日开启
3.开服后第n天
4.合服后第n天
5.每月第n天开始
6.每周第n天开始
7.每天n点开始
8.开始时间点，每隔n天开启一次 */
        timeType?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ActivityBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 活动类型
1转盘活动
2任务活动
3buff活动
4积分排名活动
5成长基金活动
6体力赠送活动
7每日登录活动
8八日登录活动
9个人目标活动
10在线奖励活动
11新服抽奖活动
12上古矿脉
13领取奖励活动
14新服冲榜活动
15.新服挑战活动
16.首充活动
17.召唤怪活动
18.召唤怪积分活动
19.返利活动
20.特价礼包活动
21.弹脸礼包活动
22.商店每日礼品
 */
        activityType?: number;
        /** 表类型: int, 注释: 活动编号 */
        activityNumber?: number;
        /** 表类型: int, 注释: 所属活动组 */
        activityGroup?: number;
        /** 表类型: byte, 注释: 排序优先级
1high
2Medium
3low */
        sortPriority?: number;
        /** 表类型: int, 注释: 入口类型
不填不开放显示
1.主界面
2.福利界面
3.活动界面
4.礼包界面 */
        enterType?: number;
        /** 表类型: string, 注释: 活动名称 */
        activityName?: string;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: string, 注释: 背景图 */
        backgroundPicture?: string;
        /** 表类型: string, 注释: 横幅 */
        banner?: string;
        /** 表类型: string, 注释: 摆放spine */
        spine?: string;
        /** 表类型: int, 注释: spine位置x */
        spineLocX?: number;
        /** 表类型: int, 注释: spine位置y */
        spineLocY?: number;
        /** 表类型: string, 注释: 开启条件 */
        OpeningConditions?: string;
        /** 表类型: string, 注释: 活动标语 */
        activityTitle?: string;
        /** 表类型: string, 注释: 活动说明 */
        activityDescription?: string;
        /** 表类型: int, 注释: 时间类型
1.永久活动
2.固定年月日开启
3.开服后第n天
4.合服后第n天
5.每月第n天开始
6.每周第n天开始
7.每天n点开始
8.开始时间点，每隔n天开启一次 */
        timeType?: number;
        /** 表类型: string, 注释: 开始时间点 */
        startTime?: string;
        /** 表类型: string, 注释: 间隔时间 */
        intervalTime?: string;
        /** 表类型: string, 注释: 任务刷新时间 */
        taskRefreshTime?: string;
        /** 表类型: string, 注释: 活动提前预览时间{秒} */
        activityPreviewTime?: string;
        /** 表类型: string, 注释: 持续时间{秒} */
        endTime?: string;
        /** 表类型: string, 注释: 活动保留时间{秒} */
        activityRetentionTime?: string;
        /** 表类型: string, 注释: 奖励结算时间 */
        rewardGetTime?: string;
        /** 表类型: int, 注释: 开服n天内不开启 */
        availableDay?: number;
        /** 表类型: string, 注释: 下一活动ID */
        nextActivityId?: string;
        /** 表类型: string, 注释: 提供buff */
        buffReward?: string;
        /** 表类型: stringMap, 注释: 概率随机（物品id，怪物id */
        fixReward?: Dictionary<string, string>;
        /** 表类型: int, 注释: 每天掉落上限 */
        dailyDropLimit?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ActivityIntegralBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 行为类型
1.fortifiedbeatwin :据点战斗胜利
2.playerbeatwin：击败玩家
3.itemcollection：收集道具
4.fieldarmybeat：击败野怪
5.armslost:损失士兵
6.forgingequipment：打造装备
7.itemconsume：消耗道具
8.equipmentenchant：附魔装备
9.arrangementheroequip:上阵英雄穿戴装备
10.travelerstarrating：旅人升星
11.favorabilityget:旅人好感度获取
12.arrangementheroequipenchanting：上阵英雄装备附魔
13.arrangementherolevelup：主战英雄等级
14.arrangementherogrownup：主战英雄成长值
15.campdev：阵营建设 */
        taskId?: string;
        /** 表类型: string, 注释: 积分获取条件[[获取方式，完成数量，获取积分数量，道具id]] */
        getIntegral?: string;
        /** 表类型: ints, 注释: 条件完成次数|获取积分数量 */
        getIntegralNum?: List<number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ActivityIntegralRewardBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 积分编号 */
        integralNum?: string;
        /** 表类型: string, 注释: 需求积分条件 */
        demandIntegrationCondition?: string;
        /** 表类型: string, 注释: 积分奖励 */
        integralReward?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AltarData = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 玩家id */
        token?: string;
        /** 表类型: int, 注释: 当前进度 */
        currentProgress?: number;
        /** 表类型: int, 注释: 上一次进度 */
        chargeCount?: number;
        /** 表类型: string, 注释: 当前物品baseid */
        currentItem?: string;
        /** 表类型: int*, 注释: 随机表下标 */
        index?: number;
        /** 表类型: int, 注释: 此次暴击倍率 */
        criticalRate?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AltarListBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 祭坛效果名称 */
        itemName?: string;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: string, 注释: 模型 */
        model?: string;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: int, 注释: 戒指类型 */
        ringType?: number;
        /** 表类型: int, 注释: 等级 */
        level?: number;
        /** 表类型: string, 注释: 突破后下一级ID */
        nextLevelId?: string;
        /** 表类型: string, 注释: 获得下一级道具 */
        nextLevelItem?: string;
        /** 表类型: string, 注释: 解锁条件 */
        unlockRing?: string;
        /** 表类型: string, 注释: 单次充能消耗 */
        chargeCost?: string;
        /** 表类型: int, 注释: 充能进度 */
        chargeProgress?: number;
        /** 表类型: int, 注释: 最大充能进度 */
        maxChargingProgress?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AltarPositionBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 戒指名字 */
        ringName?: string;
        /** 表类型: int, 注释: 戒指类型 */
        ringType?: number;
        /** 表类型: string, 注释: 未解锁描述 */
        unlockDepict?: string;
        /** 表类型: string, 注释: 强化描述 */
        strongDepict?: string;
        /** 表类型: string, 注释: 解锁条件 */
        unlockRing?: string;
        /** 表类型: string, 注释: 解锁消耗 */
        unlockCost?: string;
        /** 表类型: string, 注释: 跳转位置 */
        jumpTo?: string;
        /** 表类型: string, 注释: 跳转描述 */
        jumpToDescribe?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AncientVeinActivityBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 活动id */
        activityId?: string;
        /** 表类型: int, 注释: 最大兑换次数 */
        maxNumOfExchanges?: number;
        /** 表类型: strings, 注释: 对应次数消耗与获得奖励（填AncientVeinConsumptionBase中的id） */
        consumptionNum?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AncientVeinActivityData = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 活动编号 */
        activityNum?: number;
        /** 表类型: string, 注释: 玩家token */
        token?: string;
        /** 表类型: int, 注释: 已抽取次数 */
        numOfDraws?: number;
        /** 表类型: string, 注释: 获得奖励 */
        rewarded?: string;
        /** 表类型: intMap, 注释: 历史记录 */
        history?: Dictionary<string, number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AncientVeinConsumptionBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 对应消耗次数 */
        consumptionNum?: number;
        /** 表类型: string, 注释: 消耗数量 */
        consumptionQuantity?: string;
        /** 表类型: string, 注释: 获得奖励 */
        rewarded?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ArmsData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 玩家ID */
        playerId?: string;
        /** 表类型: byte, 注释: 兵营类型
1.war 兵营
2.mag 秘术营地
3.str 靶场 */
        barracksType?: number;
        /** 表类型: int, 注释: 士兵等级 */
        soldiersLevel?: number;
        /** 表类型: int, 注释: 军营等级 */
        barracksLevel?: number;
        /** 表类型: int, 注释: 士兵容量 */
        soldierCapacity?: number;
        /** 表类型: byte, 注释: 已解锁队列序号 */
        unlockedQueueNumber?: number;
        /** 表类型: int, 注释: 募兵时间等级 */
        recruitmentTimeLevel?: number;
        /** 表类型: int, 注释: 科技加成募兵数 */
        technologyRecruitmentSoldiers?: number;
        /** 表类型: int, 注释: 道具加成募兵数 */
        propRecruitmentSoldiers?: number;
        /** 表类型: bool, 注释: 士兵容量满 */
        soldierCapacityFull?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ArmyDate = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 队伍类型:
1.普通野外怪物
100.召唤怪
101.精英怪
102.深渊怪 */
        armyType?: number;
        /** 表类型: string, 注释: 玩家token */
        playerToken?: string;
        /** 表类型: byte, 注释: 阵营 */
        camp?: number;
        /** 表类型: string, 注释: 队伍名称（备注） */
        teamName?: string;
        /** 表类型: int, 注释: 等级 */
        lv?: number;
        /** 表类型: datas_RoleData, 注释: 玩家队伍角色 */
        armyRole?: List<RoleData>;
        /** 表类型: string, 注释: 展示模型 */
        showModle?: string;
        /** 表类型: int, 注释: 当前兵力 */
        currentTroops?: number;
        /** 表类型: int, 注释: 最大兵力 */
        maxTroops?: number;
        /** 表类型: string, 注释: 头像 */
        icon?: string;
        /** 表类型: string*, 注释: 概率随机（物品id，概率万分率，最小值，最大值） */
        fixReward?: string;
        /** 表类型: int*, 注释: 随机奖励数量 */
        randomCount?: number;
        /** 表类型: string*, 注释: 权重随机（物品数量权重） */
        randomWeight?: string;
        /** 表类型: bool*, 注释: 是否重复获取 */
        ifRepeat?: boolean;
        /** 表类型: string, 注释: 战斗推荐 */
        fightAdvice?: string;
        /** 表类型: float, 注释: 损兵补偿% */
        lostSoldiersCompensation?: number;
        /** 表类型: string, 注释: 怪物显示图标 */
        armyIcon?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ArrangementData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 玩家id */
        token?: string;
        /** 表类型: stringsMap, 注释: 队列安排 */
        Arrangement?: Dictionary<string, List<string>>;
        /** 表类型: ints, 注释: 队伍上限 */
        Limit?: List<number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type AudioBase = {
        /** 表类型: string, 注释: 音频ID */
        id?: string;
        /** 表类型: string, 注释: 资源名 */
        resName?: string;
        /** 表类型: string, 注释: 音频key */
        audioKey?: string;
        /** 表类型: float, 注释: 音量（0-1） */
        volume?: number;
        /** 表类型: bool, 注释: 是否循环播放 */
        isLoop?: boolean;
        /** 表类型: string, 注释: 备注 */
        depict?: string;
        /** 表类型: byte, 注释: 播放bgm类型
1，登录界面bgm
2.主城界面bgm
3.战斗bgm1 */
        audioType?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BagTag = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 页签名称 */
        tagName?: string;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: bytes, 注释: 页签类型 */
        include?: List<number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BarracksBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 扩建类型
1.近战招募队列扩建
2.法师招募队列扩建
3.弓箭手招募队列扩建
4.步兵加时等级
5.法师加时等级
6.射手加时等级
7.招募步兵
8.招募法师
9.招募射手 */
        queueType?: number;
        /** 表类型: string, 注释: 队列名称 */
        queueName?: string;
        /** 表类型: string, 注释: 获得 */
        soldiersCapacityIncreases?: string;
        /** 表类型: string, 注释: 消耗 */
        unlockCostDiamond?: string;
        /** 表类型: string, 注释: 扩建特殊条件：
 */
        unlockNeedViplevel?: string;
        /** 表类型: string, 注释: 扩建条件描述 */
        unlockNeedDes?: string;
        /** 表类型: string, 注释: 下一级效果 */
        nextLevel?: string;
        /** 表类型: string, 注释: 当前等级 */
        currentLevel?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BarracksConfig = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 军营类型
1.war 兵营
2.mag 秘术营地
3.str 靶场 */
        barracksType?: number;
        /** 表类型: ulong, 注释: 募兵时间刻度 */
        recruitmentTimeScale?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BarracksData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 玩家ID */
        playerId?: string;
        /** 表类型: byte, 注释: 军营类型
1.war 兵营
2.mag 秘术营地
3.str 靶场 */
        barracksType?: number;
        /** 表类型: int, 注释: 军营等级 */
        barracksLevel?: number;
        /** 表类型: int, 注释: 模型 */
        model?: number;
        /** 表类型: bool, 注释: 军营能否升级 */
        barracksLevelUp?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BattleLog = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 战斗类型 */
        battleType?: number;
        /** 表类型: bytes, 注释: 战斗数据 */
        battleInfo?: List<number>;
        /** 表类型: date, 注释: 战斗时间 */
        battleTime?: number;
        /** 表类型: string, 注释: 显示野怪名字等级 */
        battleShowName?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type Broadcast = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: byte, 注释: 广播类型 */
        type?: number;
        /** 表类型: strings, 注释: 触发id */
        triggerId?: List<string>;
        /** 表类型: string, 注释: 广播的内容 （@@ 中间的字不要乱改 如需添加需要修改程序） */
        content?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BuffActivityBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 活动编号 */
        activityNum?: number;
        /** 表类型: ulongMap, 注释: buff编号 */
        buffNum?: Dictionary<string, number>;
        /** 表类型: string, 注释: 归属背包 */
        bagMove?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BuildingConfig = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: byte, 注释: 建筑id */
        buildingId?: number;
        /** 表类型: byte, 注释: 最大建造数量 */
        maxBuilding?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BuildingData = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: data_ItemBase, 注释: 建筑配置 */
        buildingData?: ItemBase;
        /** 表类型: string, 注释: 建筑名 */
        buildingName?: string;
        /** 表类型: data_ItemBase, 注释: 角色配置 */
        baseData?: ItemBase;
        /** 表类型: byte, 注释: 建筑状态（0空闲 1 建造中 2忙碌） */
        buildingState?: number;
        /** 表类型: ulong, 注释: 建造开始时间 */
        buildingStartTime?: number;
        /** 表类型: ulong, 注释: 建造结束时间 */
        buildingEndTime?: number;
        /** 表类型: string, 注释: 玩家id */
        playerId?: string;
        /** 表类型: uint, 注释: 建筑当前位置X坐标 */
        buildingLocationx?: number;
        /** 表类型: uint, 注释: 建筑当前位置Y坐标 */
        buildingLocationy?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BuildingGain = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 建筑增益类型名称 */
        gainTypeName?: string;
        /** 表类型: byte, 注释: 增益类型
1.战争保护
2.雇佣建筑队伍
3.行军加速
4.训练加速
5.攻击提升
6.防御提升
7.训练加速 */
        GainType?: number;
        /** 表类型: string, 注释: 增益名称 */
        gainName?: string;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: byte, 注释: 增益类型：
11.玩家效果增益
16.玩家持有英雄增益 */
        toBag?: number;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: string, 注释: 使用条件 */
        supportLevelUpcondition?: string;
        /** 表类型: string, 注释: 支援道具 */
        supportItem?: string;
        /** 表类型: bool, 注释: 是否叠加 */
        isCover?: boolean;
        /** 表类型: int, 注释: 持续时间（s） */
        supportTime?: number;
        /** 表类型: string, 注释: 消耗物品数量[道具id，数量] */
        supportMaterial?: string;
        /** 表类型: string, 注释: 资源不足时替换 */
        ExMaterial?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BuildingListBase = {
        /** 表类型: string, 注释: 配置Id */
        id?: string;
        /** 表类型: string, 注释: 建造建筑 */
        buildingList?: string;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: byte, 注释: 建造种类
1:建造
2:升级
3:维修
4:拆除 */
        buildingFunType?: number;
        /** 表类型: data_ItemBase, 注释: 建造id */
        buildingID?: ItemBase;
        /** 表类型: int, 注释: 建筑类型（2001-2999）：
2001：城镇大厅
2002：铁匠铺
2003：兵营
2004：秘术营地
2005：靶场
2006：学院
2007：战争广场
2008：仓库
2009：金矿
2010：伐木场
2011：牧场
2012：魔石矿
2013：集合石
2014：商店
2015：贸易所
2016：里程碑
2017：祭坛
2018：附魔台
2019：元素之力
2020：旅行者号
2021：哨塔 */
        buildingType?: number;
        /** 表类型: ulong, 注释: 最大建造数量 */
        maxNum?: number;
        /** 表类型: string, 注释: 特殊条件：
 */
        useLimit?: string;
        /** 表类型: string, 注释: 特殊条件描述 */
        limitdesc?: string;
        /** 表类型: string, 注释: 效果描述 */
        effectDesc?: string;
        /** 表类型: string, 注释: 建筑效果 */
        buildingEffect?: string;
        /** 表类型: uint, 注释: 建筑等级 */
        lv?: number;
        /** 表类型: int, 注释: 下一级id */
        breakdownID?: number;
        /** 表类型: uint, 注释: 建造时间（s） */
        productionTime?: number;
        /** 表类型: string, 注释: 消耗
[[物品id */
        itemCost?: string;
        /** 表类型: bool, 注释: 是否显示在建筑列表中 */
        visable?: boolean;
        /** 表类型: bool, 注释: 是否显示等级 */
        visableLevel?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BuildingSupportBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 建筑支援单位 */
        supportName?: string;
        /** 表类型: byte, 注释: 支援类型
1.铁匠铺打造装备
2.低级生产专家
3.高级生产专家
4.低级学者
5.高级学者
6.雇佣建筑队2号 */
        supportType?: number;
        /** 表类型: byte, 注释: 等级 */
        supportLevel?: number;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: string, 注释: 大图标 */
        bigPic?: string;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: string, 注释: 支援建筑类型
1.主城建设
2.铁匠铺
3.仓库
4.学院
 */
        supportBildingType?: string;
        /** 表类型: string, 注释: 支援效果
条件内容格式



 */
        supportEffect?: string;
        /** 表类型: string, 注释: 下一级 */
        supportNextLevel?: string;
        /** 表类型: string, 注释: 升级消耗 */
        supportLevelUpMaterial?: string;
        /** 表类型: string, 注释: 雇佣条件 */
        supportLevelUpcondition?: string;
        /** 表类型: string, 注释: 支援道具 */
        supportItem?: string;
        /** 表类型: string, 注释: 持续时间（s） */
        supportTime?: string;
        /** 表类型: string, 注释: 消耗物品数量[道具id，数量] */
        supportMaterial?: string;
        /** 表类型: string, 注释: 资源不足时替换 */
        ExMaterial?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BuildingSupportDate = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: data_BuildingSupportBase, 注释: 支援配置 */
        supportData?: BuildingSupportBase;
        /** 表类型: string, 注释: 建筑支援单位 */
        supportName?: string;
        /** 表类型: byte, 注释: 角色状态（0空闲 1 雇佣中） */
        roleState?: number;
        /** 表类型: ulong, 注释: 支援开始时间 */
        supportStartTime?: number;
        /** 表类型: ulong, 注释: 支援结束时间 */
        supportEndTime?: number;
        /** 表类型: string, 注释: 玩家id */
        playerId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampaignBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 章节ID */
        chapterId?: string;
        /** 表类型: string, 注释: 章节序号 */
        chapterNumber?: string;
        /** 表类型: string, 注释: 章节名称 */
        chapterName?: string;
        /** 表类型: string, 注释: 关卡名称 */
        campaignName?: string;
        /** 表类型: string, 注释: 精英怪名称 */
        monsterName?: string;
        /** 表类型: string, 注释: 怪物阵营图标 */
        monsterCampIcon?: string;
        /** 表类型: string, 注释: 怪物阵营名称 */
        monsterCampName?: string;
        /** 表类型: int, 注释: 怪物战力 */
        monsterPowerValue?: number;
        /** 表类型: string, 注释: BOSS图片 */
        bossPicture?: string;
        /** 表类型: string, 注释: 关卡描述 */
        depict?: string;
        /** 表类型: byte, 注释: 关卡类型
1.普通关卡
2.精英关卡
3.BOSS关卡 */
        checkpointType?: number;
        /** 表类型: string, 注释: 关卡图标 */
        icon?: string;
        /** 表类型: string, 注释: 奖励预览[道具ID */
        rewardPreview?: string;
        /** 表类型: data_ArmyDate, 注释: 怪物配置 */
        monsterConfiguration?: ArmyDate;
        /** 表类型: string, 注释: 首通奖励[道具ID */
        firstPassReward?: string;
        /** 表类型: string, 注释: 扫荡固定奖励[道具ID */
        sweepReward?: string;
        /** 表类型: int, 注释: 扫荡英雄经验 */
        sweepHeroExp?: number;
        /** 表类型: bool, 注释: 能否重复挑战 */
        repeatChallenge?: boolean;
        /** 表类型: int, 注释: 挑战消耗体力 */
        challengeCost?: number;
        /** 表类型: int, 注释: 挑战失败返还体力 */
        failureReturn?: number;
        /** 表类型: uint, 注释: X坐标 */
        x?: number;
        /** 表类型: uint, 注释: Y坐标 */
        y?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampaignConfig = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 玩家体力值上限 */
        playerStaminaCeiling?: number;
        /** 表类型: ulong, 注释: 每点体力恢复时间 */
        nextRecoveryTime?: number;
        /** 表类型: int, 注释: 每日大体力药剂使用上限 */
        dailyUseLimit?: number;
        /** 表类型: string, 注释: 小体力药剂ID */
        smallPhysicalAgentsId?: string;
        /** 表类型: string, 注释: 大体力药剂ID */
        bigPhysicalAgentsId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampaignData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 玩家token */
        playerToken?: string;
        /** 表类型: string, 注释: 当前进度关卡ID */
        currentProgressCheckpointId?: string;
        /** 表类型: stringsMap, 注释: 扫荡英雄列表 */
        sweepsTheHeroList?: Dictionary<string, List<string>>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampaignMapBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 章节ID */
        chapterId?: string;
        /** 表类型: string, 注释: 地区名称 */
        regionName?: string;
        /** 表类型: string, 注释: 地区图片 */
        regionPicture?: string;
        /** 表类型: uint, 注释: X坐标 */
        x?: number;
        /** 表类型: uint, 注释: Y坐标 */
        y?: number;
        /** 表类型: uint, 注释: 图片宽 */
        IconW?: number;
        /** 表类型: uint, 注释: 图片高 */
        IconH?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampAssembleData = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 集结发起玩家 */
        assemblePlayerId?: string;
        /** 表类型: ulong, 注释: 集结开始时间 */
        assembleStartTime?: number;
        /** 表类型: ulong, 注释: 集结结束时间 */
        assemblEndTime?: number;
        /** 表类型: int, 注释: 已响应人数 */
        assemblPerson?: number;
        /** 表类型: int, 注释: 最大响应人数 */
        assemblMaxPerson?: number;
        /** 表类型: string, 注释: 集结响应条件 */
        assembleLimit?: string;
        /** 表类型: int, 注释: 集结响应范围 */
        assembleRange?: number;
        /** 表类型: int, 注释: 所属阵营 */
        campId?: number;
        /** 表类型: int, 注释: 集结位置x */
        assembleLocationX?: number;
        /** 表类型: int, 注释: 集结位置y */
        assembleLocationY?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: byte, 注释: 阵营id */
        campId?: number;
        /** 表类型: string, 注释: 阵营名称 */
        campName?: string;
        /** 表类型: string, 注释: 阵营全显示名称 */
        campFullName?: string;
        /** 表类型: string, 注释: 阵营图标 */
        campIcon?: string;
        /** 表类型: string, 注释: 阵营图标（大） */
        campIconbig?: string;
        /** 表类型: string, 注释: 阵营主界面图标 */
        campMainIcon?: string;
        /** 表类型: string, 注释: 阵营主界面图标（大） */
        campMainIconbig?: string;
        /** 表类型: string, 注释: 阵营排行界面图标 */
        campRankIcon?: string;
        /** 表类型: string, 注释: 阵营颜色 */
        campColoer?: string;
        /** 表类型: string, 注释: 阵营介绍 */
        campIntroduce?: string;
        /** 表类型: string, 注释: 阵营底图 */
        campBG?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampData = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: byte, 注释: 阵营id */
        campId?: number;
        /** 表类型: string, 注释: 阵营名称 */
        campName?: string;
        /** 表类型: byte, 注释: 阵营等级 */
        campLevel?: number;
        /** 表类型: ulong, 注释: 阵营经验 */
        campExp?: number;
        /** 表类型: ulong, 注释: 阵营荣耀点数 */
        campHonour?: number;
        /** 表类型: stringMap, 注释: 阵营排行记录 */
        campRankInfo?: Dictionary<string, string>;
        /** 表类型: ulong, 注释: 修改公告冷却时间 */
        campNoticeCd?: number;
        /** 表类型: string, 注释: 公告内容 */
        campNotice?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampDevelopBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: byte, 注释: 次数id */
        countID?: number;
        /** 表类型: string, 注释: 建设消耗物品数量权重[道具id，数量] */
        devMaterial?: string;
        /** 表类型: uint, 注释: 当此建设提供的经验值 */
        devExp?: number;
        /** 表类型: string, 注释: 建设后奖励 */
        devReward?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampElectionBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: int, 注释: 选举排名 */
        electionRank?: number;
        /** 表类型: string, 注释: 排名对应官员 */
        electionOfficial?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampEventsListbase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 任务名称 */
        CampEventName?: string;
        /** 表类型: byte, 注释: 任务类型：
1.主线任务
2.支线任务
3.日常任务
4.阵营任务 */
        eventType?: number;
        /** 表类型: data_ItemBase, 注释: 任务基础id */
        eventBaseid?: ItemBase;
        /** 表类型: string, 注释: 任务完成条件 */
        goal?: string;
        /** 表类型: string, 注释: 任务奖励 */
        eventReward?: string;
        /** 表类型: string, 注释: 任务引导跳转 */
        jump?: string;
        /** 表类型: int, 注释: 阵营荣誉点数奖励 */
        campGloryReward?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampGloryBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: int, 注释: 阵营荣誉点数要求 */
        CampGlory?: number;
        /** 表类型: string, 注释: 名称 */
        CampGloryRewardName?: string;
        /** 表类型: string, 注释: 阵营荣耀奖励 */
        CampGloryReward?: string;
        /** 表类型: string, 注释: 阵营荣耀奖励未领取icon */
        CampGloryUnrewardIcon?: string;
        /** 表类型: string, 注释: 阵营荣耀奖励icon */
        CampGloryRewardIcon?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampGloryWeekBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: int, 注释: 周排行种类
1.据点战
2.领地战
3.阵营建设 */
        GloryWeekType?: number;
        /** 表类型: int, 注释: 排名 */
        GloryWeekRank?: number;
        /** 表类型: int, 注释: 票数奖励 */
        ticketReward?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampLevelBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: byte, 注释: 对应阵营等级 */
        lv?: number;
        /** 表类型: string, 注释: 升级所需exp */
        expMax?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampOfficialBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 官员名称 */
        officialName?: string;
        /** 表类型: string, 注释: 官员图标 */
        officialIcon?: string;
        /** 表类型: int, 注释: 官职类型
1.官员1
2.官员2
3.官员3
4.官员4
5.平民 */
        officialType?: number;
        /** 表类型: bool, 注释: 是否可以修改阵营公告 */
        campNotice?: boolean;
        /** 表类型: ulong, 注释: 公告修改cd */
        NoticeChangeCd?: number;
        /** 表类型: bool, 注释: 是否可以跨区宣战 */
        ArearBattle?: boolean;
        /** 表类型: int, 注释: 每日最大集结次数 */
        assembleDailyTimes?: number;
        /** 表类型: int, 注释: 集结玩家人数 */
        assemblePlayerTimes?: number;
        /** 表类型: string, 注释: 集结响应条件 */
        assembleLimit?: string;
        /** 表类型: int, 注释: 集结响应范围 */
        assembleRange?: number;
        /** 表类型: string, 注释: 弃用 */
        assembleCost?: string;
        /** 表类型: strings, 注释: 集结消耗 */
        assemblesCost?: List<string>;
        /** 表类型: ulong, 注释: 集结时间 */
        assembleTime?: number;
        /** 表类型: string, 注释: 集结次数刷新时间（timeevent id） */
        assembleRefreshTime?: string;
        /** 表类型: string, 注释: 每日奖励 */
        officialReward?: string;
        /** 表类型: string, 注释: 官员加成 */
        officialBuff?: string;
        /** 表类型: string, 注释: 阵营邮件发送条件 */
        campEmailLimit?: string;
        /** 表类型: string, 注释: 条件描述 */
        LimitDesc?: string;
        /** 表类型: string, 注释: 阵营邮件消耗（LuckyDrawConsumeBase的id） */
        campEmailCost?: string;
        /** 表类型: ulong, 注释: 阵营邮件发送间隔 */
        campEmailCd?: number;
        /** 表类型: string, 注释: 邮件消耗刷新时间 */
        EmailCostRefresh?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampRank = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 对应爵位 */
        campRank?: string;
        /** 表类型: string, 注释: 爵位图标 */
        rankIcon?: string;
        /** 表类型: byte, 注释: 爵位星级 */
        rankStart?: number;
        /** 表类型: byte, 注释: 爵位最大星级 */
        rankMaxStart?: number;
        /** 表类型: string, 注释: 爵位提升消耗物品数量[道具id，数量] */
        rankMaterial?: string;
        /** 表类型: string, 注释: 爵位提升奖励[道具id，数量] */
        rankReward?: string;
        /** 表类型: string, 注释: 爵位每日奖励[道具id，数量] */
        rankDailyReward?: string;
        /** 表类型: string, 注释: 爵位提供效果（buffbase id） */
        rankEffect?: string;
        /** 表类型: string, 注释: 爵位提供效果（在配置表中创建一个道具代表对应效果） */
        rankEffectDesc?: string;
        /** 表类型: int, 注释: 爵位额外票数 */
        campRankTicket?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type CampRankingAwardBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 排名编号 */
        typeNum?: number;
        /** 表类型: string, 注释: 积分道具id */
        integralPropsId?: string;
        /** 表类型: int, 注释: 阵营排名 */
        campRanking?: number;
        /** 表类型: string, 注释: 排名奖励 */
        numReward?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ChallengeTaskListBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 活动编号 */
        activityNumber?: string;
        /** 表类型: int, 注释: 任务天数
1第一天
2第二天
3第三天
4第四天
5第五天
6第六天
7第七天
8第八天 */
        taskDays?: number;
        /** 表类型: byte, 注释: 页签类型
 */
        taskType?: number;
        /** 表类型: string, 注释: 任务类型名称 */
        taskTypeName?: string;
        /** 表类型: strings, 注释: 任务ID */
        taskId?: List<string>;
        /** 表类型: string, 注释: 背景图 */
        backgroundPicture?: string;
        /** 表类型: string, 注释: 对应天数图标 */
        icon?: string;
        /** 表类型: int, 注释: 位置X */
        locX?: number;
        /** 表类型: int, 注释: 位置Y */
        locY?: number;
        /** 表类型: string, 注释: 路线解锁图 */
        routeUnlockingMap?: string;
        /** 表类型: string, 注释: 标语1 */
        slogan1?: string;
        /** 表类型: string, 注释: 标语2 */
        slogan2?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ChargeSet = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 充值商店ID
1001.购买钻石
1002.礼包
1003.月卡
1004.周卡
1005.旅人礼包
1006.每日特惠礼包 */
        chargeShopId?: number;
        /** 表类型: int, 注释: 商店页签类型 */
        shopType?: number;
        /** 表类型: string, 注释: 页签描述 */
        typeDepict?: string;
        /** 表类型: string, 注释: 礼包描述 */
        giftbagDescription?: string;
        /** 表类型: string, 注释: 充值图标 */
        chargeIcon?: string;
        /** 表类型: string, 注释: 背景图 */
        backgroundPicture?: string;
        /** 表类型: string, 注释: 充值名称 */
        chargeName?: string;
        /** 表类型: intMap, 注释: 商品{"id":数量} */
        goodsList?: Dictionary<string, number>;
        /** 表类型: intMap, 注释: 首充额外获得{"id":数量} */
        ExGoodsList?: Dictionary<string, number>;
        /** 表类型: string, 注释: 获取贵族点数（贵族点数放入包裹7） */
        noblePointGet?: string;
        /** 表类型: int, 注释: 实际售价 */
        sellPrice?: number;
        /** 表类型: string, 注释: 货币类型 */
        sellCurrency?: string;
        /** 表类型: bool, 注释: 是否显示 */
        visible?: boolean;
        /** 表类型: string, 注释: 内容描述 */
        contentDescription?: string;
        /** 表类型: int, 注释: 限购次数 */
        numberOfPurchasing?: number;
        /** 表类型: float, 注释: 显示折扣 */
        accordingDiscount?: number;
        /** 表类型: string, 注释: 标签展示 */
        showTag?: string;
        /** 表类型: string, 注释: 限制条件 */
        chargeLimit?: string;
        /** 表类型: int, 注释: 礼包权重 */
        randomWeight?: number;
        /** 表类型: string, 注释: 宣传文字 */
        propagandaText?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ChatMessage = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 频道类型 */
        channel?: number;
        /** 表类型: data_UseSimpleInfo, 注释: 发送者ID */
        sender?: UseSimpleInfo;
        /** 表类型: string, 注释: 接收者 */
        recipient?: string;
        /** 表类型: string, 注释: 聊天内容 */
        content?: string;
        /** 表类型: byte, 注释: 阵营 */
        comp?: number;
        /** 表类型: ulong, 注释: 发送时间 */
        time?: number;
        /** 表类型: int, 注释: 对话类型 */
        chatType?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ChatConfig = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 对话类型 */
        chatType?: number;
        /** 表类型: string, 注释: 对话名称 */
        chatName?: string;
        /** 表类型: string, 注释: 对话格式 */
        chatContentDesc?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type DailyCheckActivityBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 名称 */
        loginActiveName?: string;
        /** 表类型: int, 注释: 登录活动编号 */
        loginActiveType?: number;
        /** 表类型: string, 注释: 领取奖励 */
        loginActiveReward?: string;
        /** 表类型: bool, 注释: 贵族双倍领取 */
        nobleDoubleClaim?: boolean;
        /** 表类型: string, 注释: 双倍领取条件 */
        doubleClaimConditions?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type DailyCheckRewardBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: strings, 注释: 可领取奖励id */
        rewardId?: List<string>;
        /** 表类型: string, 注释: 标语1 */
        slogan1?: string;
        /** 表类型: string, 注释: 标语2 */
        slogan2?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type DailyDiscountBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 每日特惠名称 */
        dailyDiscountName?: string;
        /** 表类型: string, 注释: 领取等级 */
        lvClass?: string;
        /** 表类型: strings, 注释: 礼包组 */
        chargeGroup?: List<string>;
        /** 表类型: string, 注释: 购买全部礼包组 */
        buyGroup?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type DailyEventsListBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 任务名称 */
        eventName?: string;
        /** 表类型: byte, 注释: 任务类型：
1.主线任务
2.支线任务
3.日常任务 */
        eventType?: number;
        /** 表类型: data_ItemBase, 注释: 任务基础id */
        eventBaseid?: ItemBase;
        /** 表类型: string, 注释: 任务完成条件 */
        goal?: string;
        /** 表类型: string, 注释: 任务奖励 */
        eventReward?: string;
        /** 表类型: string, 注释: 每日活跃奖励 */
        dailyActiveReward?: string;
        /** 表类型: string, 注释: 任务引导跳转 */
        jump?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type DailyEventsReward = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 活跃度任务名 */
        activityName?: string;
        /** 表类型: int, 注释: 活跃度目标 */
        activityGoal?: number;
        /** 表类型: string, 注释: 活跃值奖励 */
        activityReward?: string;
        /** 表类型: string, 注释: 奖励宝箱显示图 */
        RewardIcon?: string;
        /** 表类型: string, 注释: 已领取宝箱显示图 */
        GetRewardIcon?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type DialogueBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 对话名称 */
        dialogueName?: string;
        /** 表类型: strings, 注释: 下一句对话id（如果是最后的对话就不填 */
        dialogueDesc?: List<string>;
        /** 表类型: string, 注释: 发起者(npc)id */
        dialogueNpc?: string;
        /** 表类型: string, 注释: 对话内容 */
        dialogueWord?: string;
        /** 表类型: string, 注释: 对话分支 */
        dialoguedifference?: string;
        /** 表类型: long, 注释: 播放持续时间 */
        dialogueTime?: number;
        /** 表类型: long, 注释: 延时播放时间 */
        dialogueTimeDelay?: number;
        /** 表类型: string, 注释: 对应音频 */
        dialogueAudio?: string;
        /** 表类型: string, 注释: 对话开始前触发的事件 */
        frontEvent?: string;
        /** 表类型: bool, 注释: 是否等待前置事件完成才开始播放对话内容（TREU/FALSE） */
        ifPlayFrontEvent?: boolean;
        /** 表类型: string, 注释: 对话完成后触发的事件 */
        afterEvent?: string;
        /** 表类型: bool, 注释: 是否等待后置事件完成后才结束当前对象内容（TREU/FALSE） */
        ifPlayAfterEvent?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EliteMonsterBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: data_ArmyDate, 注释: 精英id */
        eliteMonster?: ArmyDate;
        /** 表类型: ulong, 注释: 精英怪持续时间 */
        eliteMonsterTime?: number;
        /** 表类型: int, 注释: 精英怪刷新位置 */
        eliteMonsterBorn?: number;
        /** 表类型: int, 注释: 最大刷新数量 */
        maxRefreshNum?: number;
        /** 表类型: string, 注释: 每日首次击败奖励 */
        dailyFirstReward?: string;
        /** 表类型: string, 注释: 每日参与奖励（物品id，概率万分率，最小值，最大值） */
        dailyPartakeReward?: string;
        /** 表类型: int, 注释: 最大参与人数 */
        maxPartakePersonNum?: number;
        /** 表类型: ulong, 注释: 精英怪消失后刷新时间 */
        eliteRefreshTime?: number;
        /** 表类型: int, 注释: 随机奖励数量 */
        randomcCunt?: number;
        /** 表类型: string, 注释: 随机物品数量权重[道具id */
        randomwWeight?: string;
        /** 表类型: bool, 注释: 是否可以重复获取同一奖励 */
        ifRepeat?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EnchantingBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 对应品质 */
        quality?: number;
        /** 表类型: byte, 注释: 品质词条数量 */
        effectNumber?: number;
        /** 表类型: int, 注释: 词条最高等级 */
        effectMaxLevel?: number;
        /** 表类型: string, 注释: 初始词条[[词条id */
        origineffectTypeInclude?: string;
        /** 表类型: string, 注释: 可随机词条类型[[词条equipType类型 */
        effectTypeInclude?: string;
        /** 表类型: byte, 注释: 初始秘技词条数量 */
        origineExtraSkillNumber?: number;
        /** 表类型: byte, 注释: 最大秘技词条数量 */
        extraSkillNumber?: number;
        /** 表类型: string, 注释: 可随机秘技[[秘技id */
        extraSkillInclude?: string;
        /** 表类型: int, 注释: 极品装备概率(百分比) */
        EnchantingProbability?: number;
        /** 表类型: int, 注释: 触发最小次数 */
        minEnchantingTime?: number;
        /** 表类型: int, 注释: 保底触发值 */
        maxEnchantingTime?: number;
        /** 表类型: int, 注释: 类型
1.装备附魔
2.装备锻造或宝箱 */
        enchantingType?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EnchantingLvBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 对应等级和 */
        lvSum?: number;
        /** 表类型: int, 注释: 普通附魔积分 */
        comEnchantingPoint?: number;
        /** 表类型: int, 注释: 高级附魔积分 */
        seniorEnchantingPoint?: number;
        /** 表类型: int, 注释: 累计保底值 */
        breakOutMax?: number;
        /** 表类型: int, 注释: 普通附魔升级概率（x%） */
        commonbreakOutProbability?: number;
        /** 表类型: int, 注释: 高级附魔升级概率（x%） */
        seniorbreakOutProbability?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EquipBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 名称 */
        equipName?: string;
        /** 表类型: string, 注释: 可预览条件 */
        visibl?: string;
        /** 表类型: string, 注释: 打造解锁条件 */
        eliminate?: string;
        /** 表类型: string, 注释: 打造时间 */
        buildTime?: string;
        /** 表类型: data_PortfolioBase, 注释: 打造公式 */
        equipPortfolio?: PortfolioBase;
        /** 表类型: string, 注释: 打造消耗 */
        PortfolioCost?: string;
        /** 表类型: byte, 注释: 最大词条数量 */
        maxEffect?: number;
        /** 表类型: string*, 注释: 随机词条效果权重 */
        randomEffect?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EquipDate = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: datas_ItemBase, 注释: 装备打造id */
        equipData?: List<ItemBase>;
        /** 表类型: ulong, 注释: 打造开始时间 */
        equipStartTime?: number;
        /** 表类型: ulong, 注释: 打造结束时间 */
        equipEndTime?: number;
        /** 表类型: string*, 注释: 获取的词条 */
        equipEffect?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EquipExpBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 引用id */
        quoteuId?: string;
        /** 表类型: int, 注释: 装备对应等级 */
        lv?: number;
        /** 表类型: int, 注释: 升级所需exp */
        expMax?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EquipVolumeBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 名称 */
        equipVolumeName?: string;
        /** 表类型: string, 注释: 特殊条件：
 */
        useLimit?: string;
        /** 表类型: string, 注释: 消耗
[[物品id */
        itemCost?: string;
        /** 表类型: string, 注释: 扩容效果 */
        volumeEffect?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EventActivityBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 活动ID */
        activityId?: string;
        /** 表类型: strings, 注释: 任务ID */
        eventId?: List<string>;
        /** 表类型: string, 注释: 活动描述 */
        activityDesc?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EventData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: date, 注释: 接受时间 */
        accep?: number;
        /** 表类型: date, 注释: 领取时间 */
        draw?: number;
        /** 表类型: string, 注释: 完成进度 */
        percent?: string;
        /** 表类型: string, 注释: 玩家id */
        playerId?: string;
        /** 表类型: data_ItemBase, 注释: 取任务配置 */
        baseData?: ItemBase;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EventRankingAwardBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 排名编号 */
        typeNum?: number;
        /** 表类型: string, 注释: 积分道具id */
        integralPropsId?: string;
        /** 表类型: int, 注释: 玩家排名最小区间 */
        miniPlayerRanking?: number;
        /** 表类型: int, 注释: 玩家排名最大区间 */
        maxPlayerRanking?: number;
        /** 表类型: string, 注释: 排名奖励 */
        numReward?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type EventsListBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 任务名称 */
        eventName?: string;
        /** 表类型: byte, 注释: 任务类型：
1.主线任务
2.支线任务
3.活动任务 */
        eventType?: number;
        /** 表类型: data_ItemBase, 注释: 任务基础id */
        eventBaseid?: ItemBase;
        /** 表类型: string, 注释: 后续任务id */
        afterID?: string;
        /** 表类型: strings, 注释: 分支任务id(多个分支使用|隔开) */
        branchID?: List<string>;
        /** 表类型: string, 注释: 任务完成条件 */
        goal?: string;
        /** 表类型: string, 注释: 任务奖励 */
        eventReward?: string;
        /** 表类型: string, 注释: 任务引导跳转
 */
        jump?: string;
        /** 表类型: bool, 注释: 是否处于未激活状态
（不填或者填FALSE */
        eventAvailable?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ExchangeFormulaBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 转换类型 */
        exchangeType?: number;
        /** 表类型: string, 注释: 转换类型名称 */
        exchangeTypeName?: string;
        /** 表类型: string, 注释: 选中时页签图标 */
        logIcon?: string;
        /** 表类型: string, 注释: 未选中时页签图标 */
        UnLogIcon?: string;
        /** 表类型: string, 注释: 消耗 */
        consume?: string;
        /** 表类型: string, 注释: 资源消耗 */
        resourceCeonsume?: string;
        /** 表类型: string, 注释: 一份奖励 */
        reward?: string;
        /** 表类型: int, 注释: 随机最小数 */
        minmultiple?: number;
        /** 表类型: int, 注释: 随机最大倍数 */
        maxmultiple?: number;
        /** 表类型: string, 注释: 交易所等级 */
        ExchangeRank?: string;
        /** 表类型: int, 注释: 基础转换时间 */
        ExchangeTime?: number;
        /** 表类型: string, 注释: 备注 */
        ExchangeFormulaBaseDesc?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ExchangePositionBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 消耗资源需求 */
        NeedResources?: string;
        /** 表类型: string, 注释: 贸易所等级需求 */
        NeedExchangeRank?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ExpItemConversionBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 元素类型 */
        elementType?: number;
        /** 表类型: string, 注释: 经验道具id */
        expItemId?: string;
        /** 表类型: int, 注释: 转换经验 */
        conversionExp?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type FirstRechargeActivityBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 活动编号 */
        activityNum?: number;
        /** 表类型: string, 注释: 充值奖励 */
        rechargeReward?: string;
        /** 表类型: string, 注释: 展示图 */
        showFigure?: string;
        /** 表类型: string, 注释: 活动标题 */
        activityTitle?: string;
        /** 表类型: string, 注释: 活动标语1 */
        activitySlogan1?: string;
        /** 表类型: string, 注释: 活动标语2 */
        activitySlogan2?: string;
        /** 表类型: string, 注释: 自动弹出条件 */
        automaticEjectCondition?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ForgingEquipment = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 名称 */
        equipName?: string;
        /** 表类型: string, 注释: 可预览条件 */
        visibl?: string;
        /** 表类型: string, 注释: 打造解锁条件 */
        eliminate?: string;
        /** 表类型: string, 注释: 打造时间(s) */
        buildTime?: string;
        /** 表类型: data_PortfolioBase, 注释: 打造公式 */
        equipPortfolio?: PortfolioBase;
        /** 表类型: string, 注释: 打造消耗(按钮上的资源消耗） */
        PortfolioCost?: string;
        /** 表类型: byte, 注释: 最大词条数量 */
        maxEffect?: number;
        /** 表类型: string, 注释: 随机词条效果权重 */
        randomEffect?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type FortifiedBase = {
        /** 表类型: string*, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 据点头像 */
        fortifiedIcon?: string;
        /** 表类型: string, 注释: 据点头像阵营1 */
        fortifiedIconCamp1?: string;
        /** 表类型: string, 注释: 据点头像阵营2 */
        fortifiedIconCamp2?: string;
        /** 表类型: string, 注释: 据点头像阵营3 */
        fortifiedIconCamp3?: string;
        /** 表类型: string, 注释: 基础进攻据点奖励 */
        baseAttackReward?: string;
        /** 表类型: string, 注释: 据点资源 */
        fortifiedResource?: string;
        /** 表类型: ulong, 注释: 集结时间（秒） */
        assembleTime?: number;
        /** 表类型: int, 注释: 征收间隔 */
        collectionInterval?: number;
        /** 表类型: string, 注释: 征收消耗 */
        collectionCost?: string;
        /** 表类型: byte, 注释: 征收最大储存次数 */
        collectMax?: number;
        /** 表类型: data_ItemBase, 注释: 奖励道具 */
        collectItem?: ItemBase;
        /** 表类型: string, 注释: 征收描述 */
        collectionDepict?: string;
        /** 表类型: data_ItemBase, 注释: 总督上任奖励 */
        leaderReward?: ItemBase;
        /** 表类型: data_ItemBase, 注释: 总督每日奖励 */
        leaderDailyReward?: ItemBase;
        /** 表类型: string, 注释: 总督介绍 */
        leaderDepict?: string;
        /** 表类型: ulong, 注释: 总督担任时间 */
        leaderKeepTime?: number;
        /** 表类型: datas_RoleData, 注释: 防守部队 */
        fortifiedDefenser?: List<RoleData>;
        /** 表类型: string, 注释: 总督申请消耗 */
        leaderCost?: string;
        /** 表类型: intMap, 注释: 据点修复消耗 */
        fortifiedFix?: Dictionary<string, number>;
        /** 表类型: string, 注释: 据点进攻描述 */
        fortifiedAttackDesc?: string;
        /** 表类型: string, 注释: 据点解锁条件 */
        fortifiedUnlock?: string;
        /** 表类型: string, 注释: 据点解锁条件描述 */
        fortifiedUnlockDesc?: string;
        /** 表类型: string, 注释: 前往 */
        jump?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type FortifiedData = {
        /** 表类型: string*, 注释: 配置ID */
        id?: string;
        /** 表类型: data_FortifiedBase, 注释: 据点信息 */
        fortifiedID?: FortifiedBase;
        /** 表类型: ulong, 注释: 上一次查看时间 */
        ExCheckOutTime?: number;
        /** 表类型: strings, 注释: 可申请总督 */
        candidateList?: List<string>;
        /** 表类型: string, 注释: 总督名字 */
        GvernorName?: string;
        /** 表类型: data_RoleData*, 注释: 总督信息 */
        GvernorInfo?: RoleData;
        /** 表类型: intMap, 注释: 总督列表给前端的 */
        GvernorListNames?: Dictionary<string, number>;
        /** 表类型: datas_RoleData*, 注释: 总督列表 */
        GvernorList?: List<RoleData>;
        /** 表类型: ulong, 注释: 总督上任时间 */
        GvernorTime?: number;
        /** 表类型: ulong, 注释: 总督卸任时间 */
        GvernorOverTime?: number;
        /** 表类型: int, 注释: 当前兵力 */
        CurrntArmy?: number;
        /** 表类型: int, 注释: 最大兵力 */
        MaxArmy?: number;
        /** 表类型: string, 注释: 地图id */
        mapDataId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type FriendConfig = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: byte, 注释: 好友数量 */
        quantity?: number;
        /** 表类型: byte, 注释: 黑名单数量 */
        blacklistQuantity?: number;
        /** 表类型: byte, 注释: 推荐好友最低等级 */
        suggestFriendLev?: number;
        /** 表类型: byte, 注释: 推荐好友最长离线时间（H） */
        suggestFriendLog?: number;
        /** 表类型: byte, 注释: 好友请求保存时间（h） */
        friendRequestTime?: number;
        /** 表类型: string, 注释: 备注 */
        depict?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type FriendData = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 玩家Token */
        playerToken?: string;
        /** 表类型: byte, 注释: 好友状态：
1申请中
2好友 */
        friendStatus?: number;
        /** 表类型: ulong, 注释: 创角时间 */
        creatTime?: number;
        /** 表类型: data_UseSimpleInfo, 注释: 好友简略信息 */
        friendsInfo?: UseSimpleInfo;
        /** 表类型: ulong, 注释: 期限时间 */
        limitTime?: number;
        /** 表类型: string, 注释: 申请玩家token */
        ApplyplayerToken?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type FristDownBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 首胜记录道具（同等级填同一首胜道具） */
        fdItem?: string;
        /** 表类型: data_ItemBase, 注释: 首胜奖励 */
        fdReward?: ItemBase;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type FristDownData = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: int, 注释: 等级 */
        lv?: number;
        /** 表类型: byte, 注释: 首杀状态
初始状态为0 */
        status?: number;
        /** 表类型: data_FristDownBase, 注释: 首杀配置 */
        baseData?: FristDownBase;
        /** 表类型: string, 注释: 备注 */
        FristDownDepict?: string;
        /** 表类型: string, 注释: 首杀据点名 */
        FortifiedName?: string;
        /** 表类型: datas_UseSimpleInfo, 注释: 首杀玩家列表 */
        playerList?: List<UseSimpleInfo>;
        /** 表类型: ulong, 注释: 首杀时间 */
        fdTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GameSystemBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 系统英文名字 */
        systemEnglishName?: string;
        /** 表类型: string, 注释: 系统中文名字 */
        systemChineseName?: string;
        /** 表类型: string, 注释: 系统介绍 */
        systemIntroduce?: string;
        /** 表类型: bool, 注释: 系统激活状态 */
        systemActivate?: boolean;
        /** 表类型: string, 注释: 系统激活条件 */
        activatecondition?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GiftBagGroupBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 活动编号 */
        activityId?: string;
        /** 表类型: int, 注释: 礼包组号 */
        giftBagGroupNum?: number;
        /** 表类型: byte, 注释: 礼包组优先级 */
        giftBagGroupPriority?: number;
        /** 表类型: strings, 注释: 礼包组内容（对应ChargeSet表ID） */
        giftBagGroupContent?: List<string>;
        /** 表类型: ulong, 注释: 触发后持续时间（秒） */
        giftBagGroupTime?: number;
        /** 表类型: string, 注释: 触发事件 */
        giftBagLimit?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GrowthFundAwardBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 基金类型 */
        growthFundType?: number;
        /** 表类型: string, 注释: 描述 */
        describe?: string;
        /** 表类型: string, 注释: 解锁消耗 */
        unlockConsumption?: string;
        /** 表类型: string, 注释: 领取等级 */
        lvClass?: string;
        /** 表类型: string, 注释: 领取奖励 */
        reward?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GrowthFundAwardData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 玩家token */
        token?: string;
        /** 表类型: int, 注释: 基金类型 */
        growthFundType?: number;
        /** 表类型: string, 注释: 进度id */
        growthFundProgress?: string;
        /** 表类型: string, 注释: 可领取奖励id */
        rewardAvailableProgress?: string;
        /** 表类型: string, 注释: 已领取奖励id */
        receivedId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GrowthFundConditionsBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 活动编号 */
        activityNum?: number;
        /** 表类型: strings, 注释: 成长基金内容 */
        growthFundContent?: List<string>;
        /** 表类型: string, 注释: 解锁条件 */
        condition?: string;
        /** 表类型: string, 注释: 解锁消耗 */
        consume?: string;
        /** 表类型: string, 注释: 成长基金凭证 */
        growthFundPass?: string;
        /** 表类型: string, 注释: 标语1 */
        slogan1?: string;
        /** 表类型: string, 注释: 标语2 */
        slogan2?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GuideBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 引导名称 */
        guideName?: string;
        /** 表类型: int, 注释: 引导id（引导组） */
        guideID?: number;
        /** 表类型: byte, 注释: 步骤id */
        stepID?: number;
        /** 表类型: string, 注释: 引导备注 */
        guideDesc?: string;
        /** 表类型: string, 注释: 引导提示 */
        guideTips?: string;
        /** 表类型: byte, 注释: 引导框朝向
1.朝左
2.朝右 */
        guideDirection?: number;
        /** 表类型: float, 注释: 引导框大小 */
        guideFrame?: number;
        /** 表类型: string, 注释: 步骤行动 */
        guideActions?: string;
        /** 表类型: string, 注释: 引导前置条件 */
        guidePrecondition?: string;
        /** 表类型: string, 注释: (下一步id，若为分支对话则为x */
        nextGuide?: string;
        /** 表类型: string, 注释: 中断重开id（中断后从哪个id开始） */
        breakPoint?: string;
        /** 表类型: long, 注释: 延时执行时间 */
        GuideTimeDelay?: number;
        /** 表类型: string, 注释: 发起者(npc)姓名 */
        dialogueNpcName?: string;
        /** 表类型: byte, 注释: 对话类型
1.下方
2.中间 */
        dialogueType?: number;
        /** 表类型: string, 注释: 发起者(npc)头像 */
        dialogueNpcIcon?: string;
        /** 表类型: string, 注释: 发起者spine */
        dialogueNpcSpine?: string;
        /** 表类型: byte, 注释: 头像位置
1.左侧
2.右侧 */
        IconLoc?: number;
        /** 表类型: string, 注释: 对话内容 */
        dialogueWord?: string;
        /** 表类型: string, 注释: 对话分支 */
        dialoguedifference?: string;
        /** 表类型: bool, 注释: 是否可以跳过剧情 */
        jumpdDialogue?: boolean;
        /** 表类型: string, 注释: 对话开始前触发的事件 */
        frontEvent?: string;
        /** 表类型: bool, 注释: 是否等待前置事件完成才开始播放对话内容（TREU/FALSE） */
        ifPlayFrontEvent?: boolean;
        /** 表类型: string, 注释: 对话完成后触发的事件 */
        afterEvent?: string;
        /** 表类型: bool, 注释: 是否等待后置事件完成后才结束当前对象内容（TREU/FALSE） */
        ifPlayAfterEvent?: boolean;
        /** 表类型: int, 注释: 下一个要监听的组 */
        link?: number;
        /** 表类型: string, 注释: 引导完成条件 */
        guideFinishCondition?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GuideTypeBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 类型 */
        type?: string;
        /** 表类型: strings, 注释: 引导id（引导组） */
        guideID?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type HandbookBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 图鉴类型
1.英雄 */
        handbookType?: number;
        /** 表类型: int, 注释: 图鉴等级 */
        handbookRank?: number;
        /** 表类型: int, 注释: 升至这一级所需总图鉴值 */
        nextHandbookPoint?: number;
        /** 表类型: string, 注释: 所获buff */
        buff?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type HandbookTagBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 标签类型 */
        handbookTagType?: number;
        /** 表类型: string, 注释: 标签名称 */
        handbookTagName?: string;
        /** 表类型: string, 注释: 标签颜色 */
        handbookTagColor?: string;
        /** 表类型: bytes, 注释: 包含英雄id */
        handbookTagContent?: List<number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type HangUpMonthCardBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 解锁下一级损兵上限 */
        nextCeiling?: number;
        /** 表类型: int, 注释: 每次补充兵力 */
        supplementSoldiers?: number;
        /** 表类型: int, 注释: 兵力补充上限 */
        supplementSoldiersCeiling?: number;
        /** 表类型: int, 注释: 结算间隔S */
        settlementTime?: number;
        /** 表类型: int, 注释: 消耗兵力最小值 */
        minConsumption?: number;
        /** 表类型: int, 注释: 消耗兵力最大值 */
        maxConsumption?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type HeadPortraitListBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 名称 */
        itemName?: string;
        /** 表类型: string, 注释: 获取描述 */
        getDepict?: string;
        /** 表类型: data_ItemBase, 注释: 关联id */
        HeadPortraitid?: ItemBase;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type HelpContentBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 系统英文名字 */
        systemEnglishName?: string;
        /** 表类型: string, 注释: 系统中文名字 */
        systemChineseName?: string;
        /** 表类型: string, 注释: 帮助描述 */
        helpDescribe?: string;
        /** 表类型: strings, 注释: 特殊内容 */
        specialContent?: List<string>;
        /** 表类型: strings, 注释: 特殊内容颜色 */
        specialContentColor?: List<string>;
        /** 表类型: strings, 注释: 特殊内容字号 */
        specialContentWordSize?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type InitialItemBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 道具ID */
        itemID?: string;
        /** 表类型: string, 注释: 道具名称 */
        itemName?: string;
        /** 表类型: ulong, 注释: 数量 */
        itemNum?: number;
        /** 表类型: string, 注释: 放入包裹位置 */
        packageLoc?: string;
        /** 表类型: string, 注释:  */
        listid?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type IntegralRankingActivityBase = {
        /** 表类型: string, 注释: 活动编号 */
        id?: string;
        /** 表类型: string, 注释: 暂时不用 */
        activityNum?: string;
        /** 表类型: string, 注释: 活动积分id */
        integralID?: string;
        /** 表类型: strings, 注释: 获取积分(ActivityIntegralBase) */
        forIntegral?: List<string>;
        /** 表类型: strings, 注释: 排名奖励（EventRankingAwardBase中的id） */
        numReward?: List<string>;
        /** 表类型: strings, 注释: 积分奖励（ActivityIntegralRewardBase中的id） */
        integralReward?: List<string>;
        /** 表类型: string, 注释: 排序方式（关联RankingBase表） */
        rankingMode?: string;
        /** 表类型: ulong, 注释: 邮件发送间隔时间 */
        mailInterval?: number;
        /** 表类型: int, 注释: 单次邮件发送数量 */
        singleMailCount?: number;
        /** 表类型: bool, 注释: 是否阵营奖励 */
        whetherCampReward?: boolean;
        /** 表类型: strings, 注释: 阵营奖励 */
        campReward?: List<string>;
        /** 表类型: int, 注释: 排名奖励领取方式
1.活跃类结算（根据历史最高排名，领取多个档次）
2.充值类结算
（根据结算排名领取对应排名奖励） */
        rewardGetType?: number;
        /** 表类型: int, 注释: 页签类型
1.领主冲级
2.装备提升
3.旅人成长
4.英雄历练 */
        tabType?: number;
        /** 表类型: string, 注释: 积分获取提示 */
        integraGetDesc?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type IntelligenceData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: byte, 注释: 页签类型 */
        intelligenceType?: number;
        /** 表类型: string, 注释: 攻方阵营图标 */
        attckerCampicon?: string;
        /** 表类型: string, 注释: 攻方名字 */
        attckerName?: string;
        /** 表类型: string, 注释: 攻方头像 */
        attckerIcon?: string;
        /** 表类型: int, 注释: 攻方兵力 */
        attckerTroops?: number;
        /** 表类型: float, 注释: 攻方x坐标 */
        attckerX?: number;
        /** 表类型: float, 注释: 攻方y坐标 */
        attckerY?: number;
        /** 表类型: string, 注释: 防方阵营图标 */
        defenderCampicon?: string;
        /** 表类型: string, 注释: 防方名字 */
        defenderName?: string;
        /** 表类型: string, 注释: 防方头像 */
        defenderIcon?: string;
        /** 表类型: int, 注释: 防方兵力 */
        defenderTroops?: number;
        /** 表类型: float, 注释: 防方x坐标 */
        defenderX?: number;
        /** 表类型: float, 注释: 防方y坐标 */
        defenderY?: number;
        /** 表类型: ulong, 注释: 战斗倒计时时间 */
        combatTime?: number;
        /** 表类型: ulong, 注释: 起始时间 */
        startTime?: number;
        /** 表类型: ulong, 注释: 终止时间 */
        endTime?: number;
        /** 表类型: bool, 注释: 参战状态 */
        warStatus?: boolean;
        /** 表类型: bool, 注释: 阅读状态 */
        readStatus?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ItemData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 道具名字 */
        itemName?: string;
        /** 表类型: string, 注释: 配置ID */
        baseId?: string;
        /** 表类型: data_ItemBase, 注释: 配置数据 */
        baseData?: ItemBase;
        /** 表类型: ulong, 注释: 数量 */
        count?: number;
        /** 表类型: ulong, 注释: 最大数量 */
        maxNum?: number;
        /** 表类型: string, 注释: 来源 */
        fromWhere?: string;
        /** 表类型: intMap, 注释: 获取使用货币 */
        buyCurrency?: Dictionary<string, number>;
        /** 表类型: intMap, 注释: 属性 */
        status?: Dictionary<string, number>;
        /** 表类型: datas_ItemData, 注释: 装备词条效果（样例：1001|1002） */
        equipEffect?: List<ItemData>;
        /** 表类型: int, 注释: 等级 */
        lv?: number;
        /** 表类型: int, 注释: 稀有度 */
        rera?: number;
        /** 表类型: int, 注释: 品质 */
        quality?: number;
        /** 表类型: string, 注释: 持有者 */
        playerUuid?: string;
        /** 表类型: ulong, 注释: 获取时间 */
        getTime?: number;
        /** 表类型: byte, 注释: 物品状态：
1.新获得
2.暂时获得
3.无状态
4.锁定 */
        statustype?: number;
        /** 表类型: bool, 注释: 是否满足使用限制 */
        ifUseLimit?: boolean;
        /** 表类型: ulong, 注释: 生效时间 */
        forceTime?: number;
        /** 表类型: ulong, 注释: 失效事件 */
        invalidTime?: number;
        /** 表类型: ulong, 注释: 获得显示时间 */
        getsShowTime?: number;
        /** 表类型: stringMap, 注释: 自定义数据 */
        customizeData?: Dictionary<string, string>;
        /** 表类型: intMap, 注释: 计算属性 */
        statusCalculation?: Dictionary<string, number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ItemExchangeBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: data_ItemBase, 注释: 对应道具 */
        exchangeItem?: ItemBase;
        /** 表类型: string, 注释: 兑换花费 */
        exchangeCost?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ItemLog = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 道具名字 */
        itemName?: string;
        /** 表类型: string, 注释: 数据ID */
        dataId?: string;
        /** 表类型: ulong, 注释: 数量 */
        count?: number;
        /** 表类型: intMap, 注释: 获取使用货币 */
        buyCurrency?: Dictionary<string, number>;
        /** 表类型: string, 注释: 持有者 */
        playerUuid?: string;
        /** 表类型: date, 注释: 消耗时间 */
        useTime?: number;
        /** 表类型: byte, 注释: 消耗方式 */
        useType?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type JobBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 职业名称 */
        jobName?: string;
        /** 表类型: byte, 注释: 职业类型 */
        jobType?: number;
        /** 表类型: int, 注释: 攻击占比权重 */
        atkWeight?: number;
        /** 表类型: int, 注释: 防御占比权重 */
        defWeight?: number;
        /** 表类型: int, 注释: 率领士兵类型（填士兵的itemtype） */
        soldier?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type JumpBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 跳转位置 */
        jumpTo?: string;
        /** 表类型: string, 注释: 跳转描述 */
        jumpDesc?: string;
        /** 表类型: string, 注释: 跳转限制 */
        jumpLimit?: string;
        /** 表类型: string, 注释: 跳转限制描述 */
        jumpLimitDesc?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LimitData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: token */
        token?: string;
        /** 表类型: int, 注释: 限制类型
 */
        limitType?: number;
        /** 表类型: int, 注释: 限制编号 */
        limitNumber?: number;
        /** 表类型: intMap, 注释: 商品购买次数 */
        goodsLimit?: Dictionary<string, number>;
        /** 表类型: ulong, 注释: 上次刷新时间 */
        lastRefreshTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LoginActiveBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 名称 */
        loginActiveName?: string;
        /** 表类型: int, 注释: 登录活动编号 */
        loginActiveType?: number;
        /** 表类型: string, 注释: 领取奖励 */
        loginActiveReward?: string;
        /** 表类型: string, 注释: 重点奖励展示 */
        highLevelReward?: string;
        /** 表类型: string, 注释: 重点奖励文字描述 */
        highLevelDesc?: string;
        /** 表类型: string, 注释: 宣传语 */
        propaganda?: string;
        /** 表类型: string, 注释: 宣传语2 */
        propaganda2?: string;
        /** 表类型: bool, 注释: 是否为重点奖励 */
        ifhighLevel?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LoginActiveData = {
        /** 表类型: string, 注释: 玩家id */
        id?: string;
        /** 表类型: int, 注释: 登录活动编号 */
        loginActiveType?: number;
        /** 表类型: string, 注释: 活动进度id */
        activeProgress?: string;
        /** 表类型: string, 注释: 可领取奖励id */
        rewardAvailableProgress?: string;
        /** 表类型: ulong, 注释: 活动开始时间 */
        activeStartTime?: number;
        /** 表类型: ulong, 注释: 上一次领取时间 */
        lastCollectionTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LoginLogBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: token */
        token?: string;
        /** 表类型: date, 注释: 登陆时间 */
        loginTime?: number;
        /** 表类型: byte, 注释: 状态 */
        status?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LuckyDrawBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 抽奖单次消耗(填写消耗表中对应ID) */
        singleConsumption?: string;
        /** 表类型: string, 注释: 十连消耗（不填代表没有十连） */
        tenConsumption?: string;
        /** 表类型: datas_LuckyDrawContentBase, 注释: 抽奖配置 */
        LuckyDraw?: List<LuckyDrawContentBase>;
        /** 表类型: datas_LuckyDrawContentBase, 注释: 抽奖兑换商店配置 */
        LuckyDrawExchangeBase?: List<LuckyDrawContentBase>;
        /** 表类型: string, 注释: 活动对应积分id */
        integralReward?: string;
        /** 表类型: int, 注释: 每日免费次数 */
        dailyFreeTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LuckyDrawConsumeBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: byte, 注释: 类型
1消耗增加
2列表循环 */
        type?: number;
        /** 表类型: string, 注释: 活动名称 */
        activityName?: string;
        /** 表类型: string, 注释: 消耗道具id（item表中对应ID） */
        consumptionItemId?: string;
        /** 表类型: ints, 注释: 基础消耗列表 */
        basicConsumption?: List<number>;
        /** 表类型: int, 注释: 消耗增量 */
        increment?: number;
        /** 表类型: int, 注释: 消耗上限 */
        upperLimit?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LuckyDrawContentBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 奖池类型 */
        luckyDrawType?: string;
        /** 表类型: byte, 注释: 稀有度类型
1.大图标
2.中图标
3.小图标 */
        rareType?: number;
        /** 表类型: string, 注释: 奖励物品 */
        rewardItems?: string;
        /** 表类型: int, 注释: 物品权重 */
        goodsweight?: number;
        /** 表类型: int, 注释: 可获取次数 */
        availableCount?: number;
        /** 表类型: int, 注释: 对应物品积分 */
        integral?: number;
        /** 表类型: int, 注释: 最低抽取次数 */
        drawTimes?: number;
        /** 表类型: int, 注释: 保底获取次数 */
        maxDrawTimes?: number;
        /** 表类型: string, 注释: 后续补充id */
        supportId?: string;
        /** 表类型: bool, 注释: 是否广播 */
        ifNotice?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LuckyDrawData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 玩家id */
        playerId?: string;
        /** 表类型: string, 注释: 活动id */
        activeId?: string;
        /** 表类型: string, 注释: 活动卡池进度 */
        drawTypeProgress?: string;
        /** 表类型: int, 注释: 免费单抽 */
        freePoint?: number;
        /** 表类型: long, 注释: 下一次免费单抽时间 */
        lastTime?: number;
        /** 表类型: datas_LuckyDrawContentBase, 注释: 当前卡池 */
        drawProgress?: List<LuckyDrawContentBase>;
        /** 表类型: strings*, 注释: 抽奖信息 */
        drawInformation?: List<string>;
        /** 表类型: intMap, 注释: 抽奖次数 */
        drawCount?: Dictionary<string, number>;
        /** 表类型: long, 注释: 此活动总抽奖次数 */
        drawNum?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LuckyDrawExchangeDate = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 所属活动id */
        luckyDrawType?: string;
        /** 表类型: intMap, 注释: 道具Id */
        itemId?: Dictionary<string, number>;
        /** 表类型: int, 注释: 商品购买次数 */
        goodsBuyLimit?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LuckyDrawPositionBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 卡池展示类型 */
        luckyDrawType?: string;
        /** 表类型: byte, 注释: 稀有度类型
1.大图标
2.中图标
3.小图标 */
        rareType?: number;
        /** 表类型: int, 注释: 位置x */
        locaX?: number;
        /** 表类型: int, 注释: 位置y */
        locaY?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MailBase = {
        /** 表类型: string, 注释: 邮件ID */
        id?: string;
        /** 表类型: string, 注释: 邮件图标 */
        mailicon?: string;
        /** 表类型: string, 注释: 邮件来源 */
        mailFrom?: string;
        /** 表类型: string, 注释: 邮件标题 */
        mailTitle?: string;
        /** 表类型: string, 注释: 邮件内容 */
        mailContent?: string;
        /** 表类型: datas_ItemData, 注释: 附带道具 */
        items?: List<ItemData>;
        /** 表类型: date, 注释: 发送时间 */
        sendTime?: number;
        /** 表类型: date, 注释: 过期时间 */
        expires?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MailConfig = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 邮件类型 */
        mailType?: number;
        /** 表类型: string, 注释: 邮件标题 */
        mailName?: string;
        /** 表类型: string, 注释: 邮件icon */
        mailIcon?: string;
        /** 表类型: string, 注释: 邮件内大图 */
        mailBanner?: string;
        /** 表类型: string, 注释: 邮件副标题 */
        mailMainTitle?: string;
        /** 表类型: string, 注释: 邮件内容 */
        mailContentDesc?: string;
        /** 表类型: bool, 注释: 是否可以分享 */
        sharetAvailable?: boolean;
        /** 表类型: bool, 注释: 是否可以回放 */
        replayAvailable?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MailData = {
        /** 表类型: string, 注释: 邮件ID */
        id?: string;
        /** 表类型: uint, 注释: 邮件状态：
1.已读
2.收藏
4.已领取
 */
        mailStatus?: number;
        /** 表类型: uint, 注释: 邮件类型：
1.无奖励邮件
2.包含奖励邮件
3.侦察邮件成功
4.战斗情报邮件
5.阵营邮件
6.侦察失败 */
        mailType?: number;
        /** 表类型: string, 注释: 邮件图标 */
        mailicon?: string;
        /** 表类型: string, 注释: 邮件来源 */
        mailFrom?: string;
        /** 表类型: string, 注释: 邮件接收者 */
        mailTo?: string;
        /** 表类型: string, 注释: 邮件标题 */
        mailTitle?: string;
        /** 表类型: string, 注释: 邮件内容 */
        mailContent?: string;
        /** 表类型: string, 注释: 战斗数据 */
        BattleCountent?: string;
        /** 表类型: string, 注释: 侦察数据 */
        scoutCountent?: string;
        /** 表类型: byte, 注释: 战斗结果 */
        battleResult?: number;
        /** 表类型: datas_ItemData, 注释: 附带道具 */
        items?: List<ItemData>;
        /** 表类型: date, 注释: 发送时间 */
        sendTime?: number;
        /** 表类型: ulong, 注释: 过期时间 */
        expires?: number;
        /** 表类型: string, 注释: 道具显示数量 */
        showItemIcon?: string;
        /** 表类型: string, 注释: 群体邮件id */
        mailGroupID?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MailGroupData = {
        /** 表类型: string, 注释: 邮件ID */
        id?: string;
        /** 表类型: uint, 注释: 邮件状态：
1.已读
2.收藏
4.已领取
 */
        mailStatus?: number;
        /** 表类型: uint, 注释: 邮件类型：
1.无奖励邮件
2.包含奖励邮件
3.侦察邮件成功
4.战斗情报邮件
5.阵营邮件
6.侦察失败 */
        mailType?: number;
        /** 表类型: string, 注释: 邮件图标 */
        mailicon?: string;
        /** 表类型: string, 注释: 邮件来源 */
        mailFrom?: string;
        /** 表类型: string, 注释: 邮件接收者 */
        mailTo?: string;
        /** 表类型: string, 注释: 邮件标题 */
        mailTitle?: string;
        /** 表类型: string, 注释: 邮件内容 */
        mailContent?: string;
        /** 表类型: string, 注释: 战斗数据 */
        BattleCountent?: string;
        /** 表类型: string, 注释: 侦察数据 */
        scoutCountent?: string;
        /** 表类型: byte, 注释: 战斗结果 */
        battleResult?: number;
        /** 表类型: datas_ItemData, 注释: 附带道具 */
        items?: List<ItemData>;
        /** 表类型: date, 注释: 发送时间 */
        sendTime?: number;
        /** 表类型: ulong, 注释: 标记发送事件 */
        showSendTime?: number;
        /** 表类型: ulong, 注释: 过期时间 */
        expires?: number;
        /** 表类型: string, 注释: 道具显示数量 */
        showItemIcon?: string;
        /** 表类型: ints, 注释: 发送阵营 */
        campSend?: List<number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MailTag = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 页签名称 */
        tagName?: string;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: bytes, 注释: 包含邮件类型 */
        include?: List<number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MapBase = {
        /** 表类型: string*, 注释: 配置ID */
        id?: string;
        /** 表类型: uint, 注释: X坐标 */
        x?: number;
        /** 表类型: uint, 注释: Y坐标 */
        y?: number;
        /** 表类型: byte, 注释: 据点类型，1怪， */
        type?: number;
        /** 表类型: byte*, 注释: 地图编号 */
        mapId?: number;
        /** 表类型: string, 注释: 显示名称 */
        showName?: string;
        /** 表类型: byte, 注释: 阵营 */
        camp?: number;
        /** 表类型: string*, 注释: 显示图标 */
        icon?: string;
        /** 表类型: int, 注释: 据点尺寸 */
        mapSize?: number;
        /** 表类型: string*, 注释: 展示模型 */
        model?: string;
        /** 表类型: byte, 注释: 等级 */
        level?: number;
        /** 表类型: data_ArmyDate*, 注释: 交战信息 */
        fightdata?: ArmyDate;
        /** 表类型: string, 注释: 交战信息id */
        fightdataId?: string;
        /** 表类型: string, 注释: 据点配置 */
        fortifiedID?: string;
        /** 表类型: data_FortifiedBase, 注释: 据点情报 */
        fortifiedInfo?: FortifiedBase;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MapConfig = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: byte, 注释: 地图编号 */
        mapId?: number;
        /** 表类型: byte, 注释: 列数 */
        mapColumn?: number;
        /** 表类型: byte, 注释: 行数 */
        mapRow?: number;
        /** 表类型: int, 注释: 最大玩家数 */
        maxPlayers?: number;
        /** 表类型: string, 注释: 下一张地图 */
        nextId?: string;
        /** 表类型: bool, 注释: 是否已经初始化 */
        isInit?: boolean;
        /** 表类型: string, 注释: 地图名称 */
        mapName?: string;
        /** 表类型: bool, 注释: 是否开放 */
        mapAvailable?: boolean;
        /** 表类型: byte, 注释: 开放条件 */
        progress?: number;
        /** 表类型: string, 注释: 大地图对应地点 */
        place?: string;
        /** 表类型: byte, 注释: 阵营 */
        camp?: number;
        /** 表类型: string, 注释: 大地图对应icon */
        icon?: string;
        /** 表类型: data_MonsterRefreshBase, 注释: 怪物刷新配置 */
        enemyRefresh?: MonsterRefreshBase;
        /** 表类型: data_MinerRefreshBase, 注释: 矿洞刷新配置 */
        minerRefresh?: MinerRefreshBase;
        /** 表类型: datas_EliteMonsterBase, 注释: 精英怪配置 */
        eliteMonster?: List<EliteMonsterBase>;
        /** 表类型: int, 注释: 最大怪物数量 */
        maxEnemy?: number;
        /** 表类型: int, 注释: 空地保留数量 */
        emptyLand?: number;
        /** 表类型: string, 注释: 光明占领显示地图 */
        camp1MapPic?: string;
        /** 表类型: string, 注释: 暗影占领显示地图 */
        camp2MapPic?: string;
        /** 表类型: string, 注释: 自然神殿显示地图 */
        camp3MapPic?: string;
        /** 表类型: string, 注释: 中立显示地图 */
        camp4MapPic?: string;
        /** 表类型: string, 注释: 地图名图片 */
        mapNamePic?: string;
        /** 表类型: int, 注释: 世界地图位置x */
        locaX?: number;
        /** 表类型: int, 注释: 世界地图位置y */
        locaY?: number;
        /** 表类型: int, 注释: 标签位置x */
        logLocaX?: number;
        /** 表类型: int, 注释: 标签位置y */
        logLocaY?: number;
        /** 表类型: int, 注释: 地图名x */
        nameLocX?: number;
        /** 表类型: int, 注释: 地图名y */
        nameLocY?: number;
        /** 表类型: string, 注释: 叛军等级 */
        logEnemy?: string;
        /** 表类型: string, 注释: 资源等级 */
        logResources?: string;
        /** 表类型: data_FristDownBaseMap*, 注释: 首杀配置 */
        fristDownBases?: Dictionary<string, FristDownBase>;
        /** 表类型: string, 注释: 未首杀时显示的名字 */
        unFristDownShow?: string;
        /** 表类型: data_FristDownDataMap, 注释: 首杀配置 */
        fristDownDatas?: Dictionary<string, FristDownData>;
        /** 表类型: int, 注释: 地图最高等级据点 */
        highestFortified?: number;
        /** 表类型: bytes, 注释: 可宣战区域 */
        declareWarAvailable?: List<number>;
        /** 表类型: bytes, 注释: 可参战区域 */
        battleAvailable?: List<number>;
        /** 表类型: string, 注释: 精英组队介绍 */
        EliteMonsterDesc?: string;
        /** 表类型: string, 注释: 未解锁提示 */
        unlockTips?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MapData = {
        /** 表类型: string*, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 点位ID */
        pointId?: string;
        /** 表类型: uint, 注释: X坐标 */
        x?: number;
        /** 表类型: uint, 注释: Y坐标 */
        y?: number;
        /** 表类型: byte, 注释: 据点类型，1怪， */
        type?: number;
        /** 表类型: byte*, 注释: 地图编号 */
        mapId?: number;
        /** 表类型: byte, 注释: 地图状态（0 空闲 1交战中） */
        mapState?: number;
        /** 表类型: string, 注释: 玩家Token */
        userToken?: string;
        /** 表类型: string, 注释: 显示名称 */
        showName?: string;
        /** 表类型: byte, 注释: 阵营 */
        camp?: number;
        /** 表类型: string, 注释: 显示图标 */
        icon?: string;
        /** 表类型: int, 注释: 据点尺寸 */
        mapSize?: number;
        /** 表类型: string, 注释: 展示模型 */
        model?: string;
        /** 表类型: byte, 注释: 等级 */
        level?: number;
        /** 表类型: ulong, 注释: 下个等级时间 */
        nextLvTime?: number;
        /** 表类型: byte, 注释: 下个等级 */
        nextLevel?: number;
        /** 表类型: data_ArmyDate*, 注释: 交战信息 */
        fightdata?: ArmyDate;
        /** 表类型: string, 注释: 交战信息id */
        fightdataId?: string;
        /** 表类型: data_ArmyDate*, 注释: 城墙守卫 */
        wallGuard?: ArmyDate;
        /** 表类型: data_ArmyDate*, 注释: 驻守友军 */
        defenseteam?: ArmyDate;
        /** 表类型: ulong, 注释: 免战时间 */
        avoidWarTime?: number;
        /** 表类型: string, 注释: 据点配置 */
        fortifiedID?: string;
        /** 表类型: data_FortifiedData, 注释: 据点情报 */
        fortifiedInfo?: FortifiedData;
        /** 表类型: data_MinerData, 注释: 矿洞信息 */
        minerData?: MinerData;
        /** 表类型: int, 注释: 组队人数限制 */
        teamLimit?: number;
        /** 表类型: data_CampAssembleData, 注释: 召集信息 */
        campAssembleData?: CampAssembleData;
        /** 表类型: data_ArmyDateMap*, 注释: 驻守友军 */
        defenseteams?: Dictionary<string, ArmyDate>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MarchData = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 角色名 */
        roleName?: string;
        /** 表类型: byte, 注释: 阵营 */
        camp?: number;
        /** 表类型: float, 注释: 出发点x坐标 */
        startPointx?: number;
        /** 表类型: float, 注释: 出发点y坐标 */
        startPointy?: number;
        /** 表类型: float, 注释: 当前x坐标 */
        currentPointx?: number;
        /** 表类型: float, 注释: 当前y坐标 */
        currentPointy?: number;
        /** 表类型: float, 注释: 终点x坐标 */
        endPointx?: number;
        /** 表类型: float, 注释: 终点y坐标 */
        endPointy?: number;
        /** 表类型: float, 注释: 行军速度 */
        marchSpeed?: number;
        /** 表类型: ulong, 注释: 行军开始时间 */
        marchstartTime?: number;
        /** 表类型: ulong, 注释: 行军结束时间 */
        marchendTime?: number;
        /** 表类型: intMap, 注释: 行军消耗 */
        marchConsumption?: Dictionary<string, number>;
        /** 表类型: string, 注释: 头像 */
        icon?: string;
        /** 表类型: int, 注释: 兵力 */
        troops?: number;
        /** 表类型: datas_ArmyDate, 注释: 队伍配置 */
        squadConfiguration?: List<ArmyDate>;
        /** 表类型: string, 注释: 玩家id */
        playerId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MasterDiscipleBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 解锁师徒条件 */
        MasterDiscipleConditions?: string;
        /** 表类型: string, 注释: 拜师条件 */
        fromMasterConditions?: string;
        /** 表类型: string, 注释: 拜师条件描述 */
        fromMasterDescribe?: string;
        /** 表类型: string, 注释: 收徒条件 */
        enlighteningConditions?: string;
        /** 表类型: string, 注释: 收徒条件描述 */
        enlighteningDescribe?: string;
        /** 表类型: int, 注释: 徒弟上限 */
        discipleCeiling?: number;
        /** 表类型: ulong, 注释: 开始离线天数显示时间 */
        offlineDisplayTime?: number;
        /** 表类型: ulong, 注释: 免费解除关系时间 */
        freeDissolveRelationshipTime?: number;
        /** 表类型: string, 注释: 解除关系消耗 */
        dissolveRelationshipConsumption?: string;
        /** 表类型: ulong, 注释: 拜师冷却时间 */
        fromMasterCoolingTime?: number;
        /** 表类型: string, 注释: 首次拜师奖励 */
        firstFromMasterReward?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MasterDiscipleData = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 玩家Token */
        playerToken?: string;
        /** 表类型: byte, 注释: 徒弟状态:
1申请中
2徒弟 */
        discipleStatus?: number;
        /** 表类型: ulong, 注释: 申请时间 */
        creatTime?: number;
        /** 表类型: data_UseSimpleInfo, 注释: 徒弟简略信息 */
        discipleInfo?: UseSimpleInfo;
        /** 表类型: ulong, 注释: 限制时间 */
        limitTime?: number;
        /** 表类型: string, 注释: 申请玩家token */
        applyplayerToken?: string;
        /** 表类型: data_UseSimpleInfo, 注释: 师父简略信息 */
        masterInfo?: UseSimpleInfo;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MasterDiscipleTaskBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 任务条件 */
        taskConditions?: string;
        /** 表类型: string, 注释: 任务描述 */
        taskDescribe?: string;
        /** 表类型: string, 注释: 任务奖励 */
        taskReward?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MileStoneBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 里程碑名称 */
        MileStoneName?: string;
        /** 表类型: ulong, 注释: 持续时间 */
        DurationTime?: number;
        /** 表类型: string, 注释: 里程碑完成条件描述 */
        MileStoneDesc?: string;
        /** 表类型: string, 注释: 里程碑完成条件 */
        MileStonegoal?: string;
        /** 表类型: string, 注释: 任务奖励 */
        MileStoneBaseReward?: string;
        /** 表类型: intMap, 注释: 解锁功能 */
        unlock?: Dictionary<string, number>;
        /** 表类型: string, 注释: 解锁展示 */
        unlockShow?: string;
        /** 表类型: string, 注释: 下一个里程碑id */
        NextMileStone?: string;
        /** 表类型: string, 注释: 未解锁状态背景图 */
        unlcokBg?: string;
        /** 表类型: string, 注释: 进行中状态背景图 */
        inProgressBg?: string;
        /** 表类型: string, 注释: 完成状态背景图 */
        finishBg?: string;
        /** 表类型: string, 注释: 据点解锁提示 */
        unlockTips?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MileStoneDate = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: data_MileStoneBase, 注释: 里程碑配置 */
        baseData?: MileStoneBase;
        /** 表类型: int, 注释: 任务进度 */
        MileStoneProgress?: number;
        /** 表类型: int, 注释: 完成目标 */
        MileStoneGoal?: number;
        /** 表类型: byte, 注释: 里程碑状态 */
        MileStoneState?: number;
        /** 表类型: ulong, 注释: 开始时间 */
        StartTime?: number;
        /** 表类型: ulong, 注释: 结束时间 */
        EndTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MinerBase = {
        /** 表类型: string*, 注释: 配置ID */
        id?: string;
        /** 表类型: byte, 注释: 矿物类型
1.金矿
2.伐木场
3.牧场
4.矿场
5.钻石矿 */
        minerType?: number;
        /** 表类型: string, 注释: 显示名称 */
        minerShowName?: string;
        /** 表类型: string, 注释: 矿场显示图标 */
        icon?: string;
        /** 表类型: string, 注释: 矿物图标 */
        minerResourceicon?: string;
        /** 表类型: int, 注释: 矿物尺寸 */
        mineralSize?: number;
        /** 表类型: string, 注释: 展示模型 */
        model?: string;
        /** 表类型: byte, 注释: 矿物等级 */
        level?: number;
        /** 表类型: string, 注释: 最大采集量 */
        maxAcquisition?: string;
        /** 表类型: ulong, 注释: 最大采集时间 */
        maxTime?: number;
        /** 表类型: string, 注释: 残矿奖励 */
        completionReward?: string;
        /** 表类型: float, 注释: 每秒采集获取经验值 */
        expPreSecond?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MinerData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: data_MinerBase, 注释: ItemBase数据 */
        baseData?: MinerBase;
        /** 表类型: ulong, 注释: 已经开采 */
        acquisition?: number;
        /** 表类型: ulong, 注释: 当前队伍开始采集时间 */
        startTime?: number;
        /** 表类型: data_RoleData, 注释: 采集的英雄 */
        minerRole?: RoleData;
        /** 表类型: string, 注释: 玩家token */
        playerToken?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MinerRefreshBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: int, 注释: 最大数量 */
        maxNum?: number;
        /** 表类型: byte, 注释: 等级 */
        lv?: number;
        /** 表类型: datas_MinerBase, 注释: 矿洞刷新类型 */
        type?: List<MinerBase>;
        /** 表类型: ints, 注释: 矿洞刷新权重 */
        weight?: List<number>;
        /** 表类型: int, 注释: 每次刷新数(个) */
        number?: number;
        /** 表类型: uint, 注释: 刷新频率(s) */
        rate?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ModleActionBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 动作名称 */
        actionName?: string;
        /** 表类型: string, 注释: 备注 */
        des?: string;
        /** 表类型: float, 注释: 播放速度 */
        speed?: number;
        /** 表类型: bool, 注释: 是否倒放 */
        mirror?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MonsterRefreshBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: int, 注释: 最大数量 */
        maxNum?: number;
        /** 表类型: byte, 注释: 等级 */
        lv?: number;
        /** 表类型: datas_ArmyDate, 注释: 怪物类型 */
        type?: List<ArmyDate>;
        /** 表类型: ints, 注释: 怪物权重 */
        weight?: List<number>;
        /** 表类型: int, 注释: 每次刷新数(个) */
        number?: number;
        /** 表类型: uint, 注释: 刷新频率(s) */
        rate?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MonsterSummonyBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: data_ArmyDate, 注释: 召唤怪id */
        summonMonsterId?: ArmyDate;
        /** 表类型: ulong, 注释: 召唤怪持续时间 */
        summonMonsterTime?: number;
        /** 表类型: int, 注释: 召唤半径 */
        summonRadius?: number;
        /** 表类型: ulong, 注释: 集结时间 */
        gatheringTime?: number;
        /** 表类型: string, 注释: 召唤怪图标 */
        summonMonsterIcon?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MonthlyCardBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: data_ChargeSet, 注释: ChargeSet表ID */
        baseData?: ChargeSet;
        /** 表类型: int, 注释: 类型
1.月卡
2.周卡
3.挂机月卡 */
        type?: number;
        /** 表类型: string, 注释: 宣传图 */
        publicityFigure?: string;
        /** 表类型: string, 注释: 背景 */
        background?: string;
        /** 表类型: string, 注释: 宣传语1 */
        slogan1?: string;
        /** 表类型: string, 注释: 宣传语2 */
        slogan2?: string;
        /** 表类型: string, 注释: 名称 */
        designation?: string;
        /** 表类型: string, 注释: 立刻获得 */
        immediatelyGet?: string;
        /** 表类型: string, 注释: 每日获得 */
        dailyGet?: string;
        /** 表类型: int, 注释: 持续天数 */
        continuousDays?: number;
        /** 表类型: string, 注释: 奖励刷新时间 */
        rewardRefreshTime?: string;
        /** 表类型: int, 注释: 续费提示天数 */
        renewalTipsDays?: number;
        /** 表类型: string, 注释: 已领取点击飘字 */
        floatText?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type MoveCity = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 迁城名称 */
        moveCityName?: string;
        /** 表类型: string, 注释: 迁城描述 */
        moveCityDesc?: string;
        /** 表类型: byte, 注释: 迁城类型 */
        moveCityType?: number;
        /** 表类型: string, 注释: 使用条件 */
        moveCitycondition?: string;
        /** 表类型: string, 注释: 消耗物品数量[道具id，数量] */
        moveCityMaterial?: string;
        /** 表类型: string, 注释: 资源不足时替换 */
        moveCityExMaterial?: string;
        /** 表类型: byte, 注释: 区域移动概率 */
        moveCityProbability?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type NobleBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 贵族等级 */
        nobleLevel?: number;
        /** 表类型: string, 注释: 贵族名称 */
        nobleName?: string;
        /** 表类型: int, 注释: 贵族点数 */
        noblePoint?: number;
        /** 表类型: string, 注释: 贵族礼包名称 */
        nobleGiftBagName?: string;
        /** 表类型: string, 注释: 贵族图标 */
        nobleIcon?: string;
        /** 表类型: string, 注释: 贵族礼包内容（[道具ID */
        nobleGiftBag?: string;
        /** 表类型: string, 注释: 贵族礼包原始价格 */
        nobleGiftBagPrice?: string;
        /** 表类型: string, 注释: 贵族礼包当前价格 */
        currentNobleGiftBagPrice?: string;
        /** 表类型: string, 注释: 贵族特权描述(加成内容，加成数值，是否为新增加:0为否，1为是) */
        nobleEffectDescribe?: string;
        /** 表类型: string, 注释: 贵族特权效果 */
        nobleEffect?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type NobleData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 玩家ID */
        playerId?: string;
        /** 表类型: int, 注释: 当前贵族点数 */
        currentNoblePoints?: number;
        /** 表类型: int, 注释: 当前贵族等级 */
        currentNobleLevel?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type NoticeBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 公告类型
1普通公告
 */
        noticeType?: number;
        /** 表类型: string, 注释: 公告标题 */
        noticeHeadline?: string;
        /** 表类型: string, 注释: 公告内容 */
        noticeContent?: string;
        /** 表类型: strings, 注释: 特殊内容 */
        specialContent?: List<string>;
        /** 表类型: strings, 注释: 特殊内容颜色 */
        specialContentColor?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RoleData = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 角色名 */
        roleName?: string;
        /** 表类型: string, 注释: 所属服务器 */
        server?: string;
        /** 表类型: data_RoleBase, 注释: 角色配置 */
        baseData?: RoleBase;
        /** 表类型: byte, 注释: 角色类型 */
        roleType?: number;
        /** 表类型: byte, 注释: 角色状态（0空闲 1 外出） */
        roleState?: number;
        /** 表类型: long, 注释: 上次行动时间 */
        lastTime?: number;
        /** 表类型: intMap, 注释: 属性值1.atk 攻击
2.def 防御
3.com 统率
4.cbatk 城战攻击
5.cbdef 城战防御
6.fire 火元素攻击
7 ice 冰元素攻击
8.lighting 雷元素攻击
9. firedef 火元素抵抗
10.icedef 冰元素抵抗
11.lightdef 雷元素抵抗 */
        status?: Dictionary<string, number>;
        /** 表类型: string, 注释: 玩家id */
        playerId?: string;
        /** 表类型: data_SkillBaseMap, 注释: 技能列表 */
        skills?: Dictionary<string, SkillBase>;
        /** 表类型: int, 注释: 当前等级 */
        lv?: number;
        /** 表类型: int, 注释: 当前经验 */
        exp?: number;
        /** 表类型: int, 注释: 当前稀有度 */
        rera?: number;
        /** 表类型: int, 注释: 当前品质 */
        quality?: number;
        /** 表类型: int, 注释: 当前成长值 */
        currentGrowth?: number;
        /** 表类型: int, 注释: 当前突破值 */
        breakThrough?: number;
        /** 表类型: int, 注释: 当前状态 */
        currentState?: number;
        /** 表类型: stringMap, 注释: 人物属性 */
        roleStatus?: Dictionary<string, string>;
        /** 表类型: intMap, 注释: 持有货币 */
        currency?: Dictionary<string, number>;
        /** 表类型: data_ItemDataMap, 注释: 装备 */
        equip?: Dictionary<string, ItemData>;
        /** 表类型: int, 注释: 当前装备库上限 */
        equipmMaxHold?: number;
        /** 表类型: data_ItemDataMap, 注释: 持有道具 */
        items?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 邮箱道具 */
        mailItem?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 持有建筑 */
        building?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 军营 */
        barracks?: Dictionary<string, ItemData>;
        /** 表类型: bytes, 注释: 二进制数据 */
        bytesinfo?: List<number>;
        /** 表类型: data_ItemDataMap, 注释: 未领取道具背包 */
        unclaimedItem?: Dictionary<string, ItemData>;
        /** 表类型: intMap, 注释: 计算属性 */
        statusCalculation?: Dictionary<string, number>;
        /** 表类型: data_ItemDataMap, 注释: 贵族特权效果 */
        nobleEffect?: Dictionary<string, ItemData>;
        /** 表类型: ulongMap, 注释: 记录时间 */
        recordTime?: Dictionary<string, number>;
        /** 表类型: data_ItemDataMap, 注释: 探索区域背包 */
        Territory?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 探索事件背包 */
        TerritoryEvent?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 探索NPC背包 */
        TerritoryNPC?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: buff特殊效果 */
        buffEffect?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 学院buff效果 */
        collegeEffect?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 主要任务（包括主线支线） */
        mainEvent?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 日常任务 */
        dailyEvent?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 活动任务 */
        activityEvent?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 阵营任务 */
        campEvent?: Dictionary<string, ItemData>;
        /** 表类型: stringMap, 注释: 自定义数据 */
        customizeData?: Dictionary<string, string>;
        /** 表类型: data_ItemDataMap, 注释: 角色经验 */
        roleExperience?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 英雄buff特殊效果 */
        heroBuffEffect?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 头像头像框 */
        HeadPortrait?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 里程碑记录 */
        MileStone?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 交易所记录 */
        ExchangeHouse?: Dictionary<string, ItemData>;
        /** 表类型: strings, 注释: 记录引导数据 */
        GuideRecord?: List<string>;
        /** 表类型: data_LimitDataMap, 注释: 限制次数记录 */
        limitData?: Dictionary<string, LimitData>;
        /** 表类型: data_AltarDataMap, 注释: 祭坛记录 */
        altarData?: Dictionary<string, AltarData>;
        /** 表类型: data_ItemDataMap, 注释: 图鉴记录 */
        handBookData?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 符文背包 */
        runeBag?: Dictionary<string, ItemData>;
        /** 表类型: data_ItemDataMap, 注释: 旅人背包 */
        travelerBag?: Dictionary<string, ItemData>;
        /** 表类型: long, 注释: 上次精英怪首杀时间 */
        lastEliteKill?: number;
        /** 表类型: long, 注释: 上次精英怪参战时间 */
        lastEliteFight?: number;
        /** 表类型: data_ItemDataMap, 注释: 挂机兵力背包 */
        autoJungleSoldiersBag?: Dictionary<string, ItemData>;
        /** 表类型: long, 注释: 挂机开始时间 */
        hangUpStartTime?: number;
        /** 表类型: long, 注释: 挂机结束时间 */
        hangUpEndTime?: number;
        /** 表类型: long, 注释: 挂机扣兵时间 */
        hangUpDeductSoldiersTime?: number;
        /** 表类型: data_ItemDataMap, 注释: 挂机未领取奖励背包 */
        hangUpUnclaimedBag?: Dictionary<string, ItemData>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ObtianBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 获取组id（ObtianGroupBaseid） */
        groupID?: string;
        /** 表类型: string, 注释: 获取id */
        ObtianId?: string;
        /** 表类型: strings, 注释: 通用获取方法id */
        obtianComId?: List<string>;
        /** 表类型: string, 注释: 跳转（jumpbase） */
        jump?: string;
        /** 表类型: string, 注释: 跳转图标 */
        jumpIcon?: string;
        /** 表类型: string, 注释: 批量购买（填shopsetid） */
        pluralBuy?: string;
        /** 表类型: string, 注释: 批量购买图标 */
        pluralBuyIcon?: string;
        /** 表类型: string, 注释: 单个购买（填shopsetid） */
        singleBuy?: string;
        /** 表类型: string, 注释: 单个购买图标 */
        singleBuyIcon?: string;
        /** 表类型: string, 注释: 使用宝箱获取 */
        TreasureID?: string;
        /** 表类型: string, 注释: 使用宝箱图标 */
        TreasureIDIcon?: string;
        /** 表类型: string, 注释: 物品描述 */
        itemDesc?: string;
        /** 表类型: string, 注释: 物品描述图标 */
        itemDescIcon?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ObtianComBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 补兵类型
1 */
        groupType?: number;
        /** 表类型: int, 注释: 类型
1.跳转前往
2.使用道具
3.单个购买类型
4.批量购买类型
5.文字说明类型
6.增益效果 */
        getType?: number;
        /** 表类型: string, 注释: 跳转（jumpbase） */
        jump?: string;
        /** 表类型: string, 注释: 图标 */
        showIcon?: string;
        /** 表类型: string, 注释: 显示名称 */
        showName?: string;
        /** 表类型: string, 注释: 显示描述 */
        showDesc?: string;
        /** 表类型: string, 注释: 支援道具 */
        supportItem?: string;
        /** 表类型: bool, 注释: 是否叠加 */
        isCover?: boolean;
        /** 表类型: int, 注释: 持续时间（s） */
        supportTime?: number;
        /** 表类型: string, 注释: 增益效果支持id（填buildingGain中的id） */
        buildingGainId?: string;
        /** 表类型: string, 注释: 消耗物品数量[道具id，数量] */
        supportMaterial?: string;
        /** 表类型: string, 注释: 资源不足时替换 */
        ExMaterial?: string;
        /** 表类型: string, 注释: 购买id（填shopsetid） */
        pluralBuy?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ObtianGroupBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 获取组类型 */
        groupType?: number;
        /** 表类型: strings, 注释: 获取组内道具id */
        groupID?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type OnlineActiveBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 名称 */
        loginActiveName?: string;
        /** 表类型: int, 注释: 登录活动编号 */
        loginActiveType?: number;
        /** 表类型: string, 注释: 领取奖励 */
        loginActiveReward?: string;
        /** 表类型: string, 注释: 领取等级 */
        lvClass?: string;
        /** 表类型: int, 注释: 等级 */
        lv?: number;
        /** 表类型: int, 注释: 在线奖励间隔时间 */
        RefreshTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type OnlineActiveData = {
        /** 表类型: string, 注释: 玩家id */
        id?: string;
        /** 表类型: string, 注释: 领取进度 */
        GetProgress?: string;
        /** 表类型: ulong, 注释: 上一个领取结束时间 */
        BeforeGetEndTime?: number;
        /** 表类型: string, 注释: 今天开始进度 */
        startProgress?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PayOrder = {
        /** 表类型: string, 注释: 订单号 */
        id?: string;
        /** 表类型: string, 注释: 用户uuid */
        userOpenid?: string;
        /** 表类型: string, 注释: 游戏充值平台id */
        payPlatformID?: string;
        /** 表类型: string, 注释: ip地址 */
        ip?: string;
        /** 表类型: string, 注释: 道具id */
        gameItemID?: string;
        /** 表类型: int, 注释: 法币价格 */
        legalTender?: number;
        /** 表类型: date, 注释: 创建时间 */
        timeStart?: number;
        /** 表类型: date, 注释: 付款期限 */
        timeLimit?: number;
        /** 表类型: date, 注释: 付款时间 */
        timePay?: number;
        /** 表类型: int, 注释: 实际退款金额 */
        refundAmount?: number;
        /** 表类型: string, 注释: 退款审批人 */
        refund?: string;
        /** 表类型: string, 注释: 备注 */
        remark?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type OrderPlatformConfig = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 游戏名字 */
        gameName?: string;
        /** 表类型: string, 注释: 平台名字 */
        platformName?: string;
        /** 表类型: string, 注释: 发货地址URL */
        orderCallBackURL?: string;
        /** 表类型: string, 注释: ip地址 */
        ip?: string;
        /** 表类型: string, 注释: 紧急联系人手机号码（发货服务器异常的时候会发送短信通知） */
        emergencyContactNumber?: string;
        /** 表类型: string, 注释: 紧急联系人微信账号 */
        emergencyContactWechatID?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type OrderRefund = {
        /** 表类型: string, 注释: 用户uuid */
        id?: string;
        /** 表类型: string, 注释: 订单号 */
        orderid?: string;
        /** 表类型: string, 注释: ip地址 */
        ip?: string;
        /** 表类型: string, 注释: 道具id */
        gameItemID?: string;
        /** 表类型: int, 注释: 法币价格 */
        legalTender?: number;
        /** 表类型: int, 注释: 实际退款金额 */
        refundAmount?: number;
        /** 表类型: string, 注释: 退款审批人 */
        refund?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PayPlatform = {
        /** 表类型: string, 注释: 游戏充值平台id */
        id?: string;
        /** 表类型: string, 注释: 服务器url */
        severUrl?: string;
        /** 表类型: string, 注释: 备注 */
        remark?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PersonalActiveBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 名称 */
        PersonalActiveName?: string;
        /** 表类型: int, 注释: 活动编号 */
        PersonalActiveType?: number;
        /** 表类型: string, 注释: 任务奖励 */
        eventReward?: string;
        /** 表类型: string, 注释: 重点奖励展示 */
        highLevelReward?: string;
        /** 表类型: string, 注释: 任务完成条件 */
        goal?: string;
        /** 表类型: string, 注释: 标语描述 */
        sloganDescription?: string;
        /** 表类型: string, 注释: 完成条件描述 */
        conditionDescription?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PersonalActiveData = {
        /** 表类型: string, 注释: 玩家id */
        id?: string;
        /** 表类型: int, 注释: 登录活动编号 */
        loginActiveType?: number;
        /** 表类型: string, 注释: 可领取奖励id */
        rewardAvailableProgress?: string;
        /** 表类型: strings*, 注释: 已领取id */
        hasReward?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PhysicalConfig = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 体力补充 */
        physicalPurchaseReply?: number;
        /** 表类型: string, 注释: 钻石消耗 */
        diamondCost?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PhysicalGiftActiveBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 体力赠送档次 */
        physcalPowerGrade?: string;
        /** 表类型: string, 注释: 开始领取时间 */
        startTime?: string;
        /** 表类型: string, 注释: 结束领取时间 */
        endTime?: string;
        /** 表类型: string, 注释: 领取奖励 */
        receiveRewards?: string;
        /** 表类型: string, 注释: 补领消耗 */
        replenishmentConsumption?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PhysicalGiftActiveNumRewardBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 活动编号 */
        activityNum?: number;
        /** 表类型: strings, 注释: 档数奖励 */
        numOfReward?: List<string>;
        /** 表类型: string, 注释: 标语1 */
        slogan1?: string;
        /** 表类型: string, 注释: 标语2 */
        slogan2?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PlayerConfig = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: int, 注释: 每日野外战斗次数 */
        npcBattle?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PlayerExpBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 玩家对应等级 */
        lv?: number;
        /** 表类型: ulong, 注释: 升级所需exp */
        expMax?: number;
        /** 表类型: string, 注释: 升级奖励
例子：[[物品id */
        lvUpReward?: string;
        /** 表类型: string, 注释: 升级奖励描述 */
        lvUpRewardDsec?: string;
        /** 表类型: string, 注释: 升级体力描述 */
        lvUpPhysicalDsec?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PortfolioBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 备注描述 */
        depict?: string;
        /** 表类型: string, 注释: 物品数量权重[道具id，数量] */
        material?: string;
        /** 表类型: string, 注释: 合成结果（道具配置表id） */
        result?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PowerComparison = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 属性名称 */
        propertyName?: string;
        /** 表类型: byte, 注释: 属性类型 */
        propertyType?: number;
        /** 表类型: string, 注释: 计算的公式id */
        formulaId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PowerUpBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 战力提升类型 */
        powerUpType?: string;
        /** 表类型: string, 注释: 战力提升名称 */
        powerUpName?: string;
        /** 表类型: string, 注释: 战力提升图标 */
        powerUpIcon?: string;
        /** 表类型: string, 注释: 战力途径描述 */
        powerUpDepict?: string;
        /** 表类型: string, 注释: 显示条件
 */
        visableLimit?: string;
        /** 表类型: string, 注释: 跳转
前往 */
        jump?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PreferentialTabBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 特惠类型
1.特价礼包
2.每日特惠
3.月卡
4.充值 */
        perferentialType?: number;
        /** 表类型: string, 注释: 特惠名称 */
        perferentialName?: string;
        /** 表类型: byte, 注释: 排序优先级
1.high
2.medium
3.low */
        sortPriority?: number;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: string, 注释: 开启条件 */
        openingConditions?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PubContentBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 招募类型
1.英雄招募
2.传奇宴会 */
        pubType?: number;
        /** 表类型: byte, 注释: 稀有度类型
1.大图标
2.小图标 */
        rareType?: number;
        /** 表类型: string, 注释: 奖励物品 */
        rewardItems?: string;
        /** 表类型: int, 注释: 物品权重 */
        goodsweight?: number;
        /** 表类型: int, 注释: 累计进度值 */
        integral?: number;
        /** 表类型: int, 注释: 抽取类型 */
        guaranteeType?: number;
        /** 表类型: bool, 注释: 是否广播 */
        ifNotice?: boolean;
        /** 表类型: string, 注释: 重复转换物品（空为不转换） */
        exchangeItems?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PubData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: token */
        token?: string;
        /** 表类型: strings, 注释: 英雄招募抽取记录 */
        heroRecruitpubRecord?: List<string>;
        /** 表类型: strings, 注释: 传奇宴会抽取记录 */
        legendRecruitpubRecord?: List<string>;
        /** 表类型: uint, 注释: 英雄招募抽取次数 */
        heroRecruitTimes?: number;
        /** 表类型: uint, 注释: 传奇宴会抽取次数 */
        legendRecruitTimes?: number;
        /** 表类型: ulong, 注释: 传奇宴会开启时间 */
        legendOpen?: number;
        /** 表类型: ulong, 注释: 传奇宴会关闭时间 */
        legendEnd?: number;
        /** 表类型: int, 注释: 英雄招募每日免费次数 */
        heroDailyFreeTimes?: number;
        /** 表类型: int, 注释: 英雄半价招募次数 */
        heroHalfPriceTime?: number;
        /** 表类型: int, 注释: 传奇宴会免费次数 */
        legendFreeTimes?: number;
        /** 表类型: string, 注释: 每日半价次数刷新时间 */
        halfPriceReflashTime?: string;
        /** 表类型: ulong, 注释: 每日半价次数刷新时间 */
        dailyHalfPriceReflashTime?: number;
        /** 表类型: ulong, 注释: 每日免费次数刷新时间 */
        FreeReflashTime?: number;
        /** 表类型: string, 注释: 每日免费次数刷新时间 */
        dailyFreeReflashTime?: string;
        /** 表类型: strings, 注释: 抽取结果 */
        PubResult?: List<string>;
        /** 表类型: int, 注释: 传奇宴会进度累计 */
        legendCharge?: number;
        /** 表类型: intMap, 注释: 额外奖励记录 */
        PubRewardTime?: Dictionary<string, number>;
        /** 表类型: int, 注释: 剩余英雄招募触发保底次数 */
        nextHeroGuaranteeTimes?: number;
        /** 表类型: int, 注释: 剩余传奇招募触发保底次数 */
        nextLegendGuaranteeTimes?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PubRecruitBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 卡池类型
1.英雄招募
2.传奇宴会 */
        recruitType?: number;
        /** 表类型: string, 注释: 卡池介绍 */
        recruitDesc?: string;
        /** 表类型: string, 注释: 抽奖单次消耗(填写LuckyDrawConsumeBase对应ID) */
        singleConsumption?: string;
        /** 表类型: string, 注释: 十连消耗（不填代表没有十连） */
        tenConsumption?: string;
        /** 表类型: string, 注释: 半价消耗(填写LuckyDrawConsumeBase中对应ID) */
        halfPriceConsumption?: string;
        /** 表类型: string, 注释: 单次抽奖券消耗(填写LuckyDrawConsumeBase中对应ID) */
        singleTicketConsumption?: string;
        /** 表类型: string, 注释: 10连抽奖券消耗 */
        tenTicketConsumption?: string;
        /** 表类型: datas_LuckyDrawContentBase, 注释: 抽奖配置 */
        LuckyDraw?: List<LuckyDrawContentBase>;
        /** 表类型: datas_PubContentBase, 注释: 抽奖配置 */
        PubRecruit?: List<PubContentBase>;
        /** 表类型: int, 注释: 免费次数 */
        dailyFreeTime?: number;
        /** 表类型: string, 注释: 每日免费次数刷新时间 */
        dailyFreeReflashTime?: string;
        /** 表类型: int, 注释: 半价次数 */
        halfPriceTime?: number;
        /** 表类型: string, 注释: 每日半价次数刷新时间 */
        halfPriceReflashTime?: string;
        /** 表类型: ulong, 注释: 持续时间 */
        sustainTime?: number;
        /** 表类型: int, 注释: 卡池进度值触发条件 */
        chargePoint?: number;
        /** 表类型: int, 注释: 保底类型（填抽取类型） */
        guarantee?: number;
        /** 表类型: int, 注释: 保底数量 */
        guaranteeMax?: number;
        /** 表类型: int, 注释: 保护类型（抽取类型） */
        protect?: number;
        /** 表类型: int, 注释: 保护数量 */
        protectMax?: number;
        /** 表类型: int, 注释: 保底触发次数 */
        guarant?: number;
        /** 表类型: string, 注释: 抽取提示 */
        recruitTips?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PubRewardBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 奖励类型
1.英雄招募累计奖励
2.宴会累计奖励 */
        rewardType?: number;
        /** 表类型: int, 注释: 奖励显示类型
1.列表
2.最终奖励 */
        showType?: number;
        /** 表类型: string, 注释: 奖励内容 */
        rewardContent?: string;
        /** 表类型: string, 注释: 奖励描述 */
        rewardDesc?: string;
        /** 表类型: int, 注释: 达到奖励需要的值 */
        rewardNeedNum?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type PubShowBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 奖励类型
1.英雄招募累计奖励
2.宴会累计奖励 */
        rewardType?: number;
        /** 表类型: string, 注释: 普通奖励内容 */
        normalShow?: string;
        /** 表类型: string, 注释: 稀有奖励展示[[第一排英雄id] */
        rareShow?: string;
        /** 表类型: int, 注释: 达到奖励需要的值 */
        rewardNeedNum?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type QualityEffect = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 对应品质 */
        quality?: number;
        /** 表类型: string, 注释: 品质名称 */
        qualityName?: string;
        /** 表类型: string, 注释: 品质描述 */
        qualityDepict?: string;
        /** 表类型: string, 注释: 品质颜色 */
        qualityColour?: string;
        /** 表类型: int, 注释: 对应品质英雄每升一级提高统率值 */
        qualitycomGrowth?: number;
        /** 表类型: string, 注释: 普通成长提升[[成长值道具 */
        commonGrowth?: string;
        /** 表类型: string, 注释: 高级成长提升[[成长值道具 */
        seniorGrowth?: string;
        /** 表类型: string, 注释: 普通成长消耗 */
        commonGrowthCost?: string;
        /** 表类型: string, 注释: 高级成长每次消耗 */
        seniorGrowthCost?: string;
        /** 表类型: string, 注释: 突破累计值 */
        breakOutPoint?: string;
        /** 表类型: string, 注释: 突破消耗 */
        breakOutCost?: string;
        /** 表类型: string, 注释: 突破概率（x%） */
        breakOutProbability?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type QueueBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: byte, 注释: 兵营类型
1.近战招募队列
2.法师招募队列
3.弓箭手招募队列 */
        queueType?: number;
        /** 表类型: string, 注释: 队列名称 */
        queueName?: string;
        /** 表类型: int, 注释: 扩建后士兵容量增加 */
        soldiersCapacityIncreases?: number;
        /** 表类型: string, 注释: 扩建消耗 */
        unlockCostDiamond?: string;
        /** 表类型: string, 注释: 扩建特殊条件：
x:y;x:y

x：代表任务主要类型
1：等级达到y级
2:贵族等级达到y级

y：对应限制代表目标 */
        unlockNeedViplevel?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type QueueData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 玩家ID */
        playerId?: string;
        /** 表类型: byte, 注释: 兵营类型
1.war 兵营
2.mag 秘术营地
3.str 靶场 */
        barracksType?: number;
        /** 表类型: byte, 注释: 队列序号 */
        queueNumber?: number;
        /** 表类型: bool, 注释: 是否解锁 */
        eliminate?: boolean;
        /** 表类型: bool, 注释: 贵族等级是否能够解锁 */
        vipLevelCanUnlock?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RankingBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 排行类型
1.全服排行
2.阵营内排行 */
        rankingType?: number;
        /** 表类型: string, 注释: 排序名称 */
        sortName?: string;
        /** 表类型: int, 注释: 单次发送数量 */
        frontName?: number;
        /** 表类型: ulong, 注释: 排序时间间隔 */
        sortRefresh?: number;
        /** 表类型: bool, 注释: 能否查看自己的每次 */
        canFindRankSelf?: boolean;
        /** 表类型: bool, 注释: 能否查看排名外玩家 */
        canFindOutRank?: boolean;
        /** 表类型: string, 注释: 排序条件 */
        rankCondition?: string;
        /** 表类型: bool, 注释: 是否降序排序 */
        upRank?: boolean;
        /** 表类型: ulong, 注释: 上榜积分要求 */
        entrPointsRequirement?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RankingData = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 玩家token */
        playerId?: string;
        /** 表类型: string, 注释: 所属活动id */
        activeId?: string;
        /** 表类型: int, 注释: 玩家排名 */
        playerRank?: number;
        /** 表类型: strings, 注释: 排好序的前n名 */
        rank?: List<string>;
        /** 表类型: ulong, 注释: 玩家分数 */
        pointNum?: number;
        /** 表类型: ulong, 注释: 排名更新时间 */
        rankUpdateTime?: number;
        /** 表类型: data_UseSimpleInfo, 注释: 玩家信息 */
        userInfo?: UseSimpleInfo;
        /** 表类型: int, 注释: 历史最高排名 */
        historyHighRank?: number;
        /** 表类型: ulong, 注释: 下一档位剩余积分 */
        nextRewardPoint?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RankingListData = {
        /** 表类型: string, 注释: 顺序id */
        id?: string;
        /** 表类型: data_RankingData, 注释: 数据排名表 */
        RankingData?: RankingData;
        /** 表类型: int, 注释: 所在页签 */
        Tab?: number;
        /** 表类型: string, 注释: 所属活动id */
        activeId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RebateActiveBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 活动编号 */
        activityNum?: number;
        /** 表类型: string, 注释: 宣传图 */
        publicityFigure?: string;
        /** 表类型: string, 注释: 宣传语1 */
        slogan1?: string;
        /** 表类型: string, 注释: 宣传语2 */
        slogan2?: string;
        /** 表类型: string, 注释: 礼包名称 */
        giftBagName?: string;
        /** 表类型: strings, 注释: 礼包内容 */
        giftBagContent?: List<string>;
        /** 表类型: string, 注释: 礼包消耗 */
        giftBagConsume?: string;
        /** 表类型: string, 注释: 提示 */
        giftBagTips?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RebateRewardBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 天数 */
        days?: string;
        /** 表类型: string, 注释: 礼包奖励 */
        giftBagReward?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ResourceExchangeBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: byte, 注释: 仓库等级 */
        lv?: number;
        /** 表类型: int, 注释: 单次冷却时间 */
        SingleCooldownTime?: number;
        /** 表类型: int, 注释: 冷却时间最大值 */
        MaxCoolingTime?: number;
        /** 表类型: string, 注释: 基础消耗数量 */
        BaseConsumptionQuantity?: string;
        /** 表类型: string, 注释: 转换后数量 */
        QuantityAfterConversion?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ResourceObtian = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 资源获取名称 */
        ResourceObtianName?: string;
        /** 表类型: string, 注释: 资源获取icon */
        ResourceObtianIcon?: string;
        /** 表类型: string, 注释: 资源获取描述 */
        ResourceObtianIconDesc?: string;
        /** 表类型: byte, 注释: 获取种类：
1.获取金币
2.获取木头
3.获取食物
4.获取矿石 */
        ResourceObtianSystem?: number;
        /** 表类型: byte, 注释: 获取类类型
1.直接获取一定时间产量的资源
2.使用道具获取固定数量资源
3.获取提示 */
        ResourceObtianType?: number;
        /** 表类型: int, 注释: 时间 */
        accelerateTime?: number;
        /** 表类型: string, 注释: 道具兑换 */
        ResourceObtianItem?: string;
        /** 表类型: string, 注释: 跳转 */
        jump?: string;
        /** 表类型: string, 注释: 最低获取 */
        minGet?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RewardActivityBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 活动id */
        activityId?: string;
        /** 表类型: string, 注释: 获取奖励 */
        rewardContent?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RoleBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 角色名 */
        roleName?: string;
        /** 表类型: data_JobBase, 注释: 职业类型
10001.战士
10002.法师
10003.游侠 */
        jobType?: JobBase;
        /** 表类型: byte, 注释: 英雄id */
        heroId?: number;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: string, 注释: 圆图标 */
        circularIcon?: string;
        /** 表类型: string, 注释: 模型
这部分的标色不要动，用来表示美术资源是不是正式的 */
        model?: string;
        /** 表类型: string, 注释: 士兵模型 */
        soldier?: string;
        /** 表类型: string, 注释: 动态立绘
这部分的标色不要动，用来表示美术资源是不是正式的 */
        spine?: string;
        /** 表类型: string, 注释: 立绘背景 */
        backround?: string;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: int, 注释: 等级上限 */
        lv?: number;
        /** 表类型: byte, 注释: 稀有度
1.r
2.sr
3.ssr */
        rera?: number;
        /** 表类型: data_QualityEffect, 注释: 品质
1001.绿
1002.蓝
1003.紫
1004.橙
1005.红 */
        originQuality?: QualityEffect;
        /** 表类型: data_QualityEffect, 注释: 最大品质
1001.绿
1002.蓝
1003.紫
1004.橙
1005.红 */
        maxQuality?: QualityEffect;
        /** 表类型: intMap, 注释: 属性值
1.atk 攻击
2.def 防御
3.com 统率
4.cbatk 城战攻击
5.cbdef 城战防御
6.fire 火元素攻击
7 ice 冰元素攻击
8.lighting 雷元素攻击
9. firedef 火元素抵抗
10.icedef 冰元素抵抗
11.lightdef 雷元素抵抗
12.crit暴击率
13.critdamage暴击伤害 */
        attributeMax?: Dictionary<string, number>;
        /** 表类型: int, 注释: 初始成长值
（废弃） */
        growthLim?: number;
        /** 表类型: int, 注释: 成长值上限 */
        growthMax?: number;
        /** 表类型: int, 注释: 突破后赠送成长点 */
        growthSend?: number;
        /** 表类型: string, 注释: 初始获得物品 */
        originItem?: string;
        /** 表类型: string, 注释: 突破后获得物品 */
        brokenItem?: string;
        /** 表类型: string, 注释: 重复获得转化（填道具表id） */
        ownedExchange?: string;
        /** 表类型: string, 注释: 突破解锁道具 */
        breakUnlock?: string;
        /** 表类型: int, 注释: 突破保险值 */
        breakThroughMin?: number;
        /** 表类型: int, 注释: 突破最大值 */
        breakThroughMax?: number;
        /** 表类型: data_SkillBaseMap, 注释: 技能列表（填技能表id） */
        skills?: Dictionary<string, SkillBase>;
        /** 表类型: string, 注释: 突破后id */
        breakThroughChange?: string;
        /** 表类型: int, 注释: 突破次数 */
        breakThroughCount?: number;
        /** 表类型: int, 注释: 潜力值 */
        Potential?: number;
        /** 表类型: float, 注释: 英雄攻击距离 */
        heroAttackDistance?: number;
        /** 表类型: float, 注释: 士兵攻击距离 */
        soldierAttackDistance?: number;
        /** 表类型: int, 注释: 图鉴值 */
        handbookPoint?: number;
        /** 表类型: int, 注释: 英雄所属元素 */
        element?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RoleEquipConfig = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 装备位置 */
        equipLoc?: number;
        /** 表类型: string, 注释: 装备位置名称 */
        equipName?: string;
        /** 表类型: bool, 注释: 是否显示 */
        viewShow?: boolean;
        /** 表类型: string, 注释: 装备位置底图 */
        equipLocIcon?: string;
        /** 表类型: string, 注释: 装备解锁条件 */
        unlockTri?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RoleExpBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: int, 注释: 对应等级 */
        lv?: number;
        /** 表类型: int, 注释: 升级所需exp */
        expmax?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RoleLevelUpBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 强化名称 */
        strengthName?: string;
        /** 表类型: data_ItemBase, 注释: 强化道具 */
        strengthItem?: ItemBase;
        /** 表类型: string, 注释: 获得经验 */
        strengthExchange?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RuleBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: int, 注释: 说明系统类型 */
        ruleType?: number;
        /** 表类型: string, 注释: 规则系统名称 */
        ruleName?: string;
        /** 表类型: string, 注释: 规则系统说明 */
        ruleDesc?: string;
        /** 表类型: string, 注释: 显示颜色 */
        rulecolor?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type RuneSlotBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 符文槽 */
        runeSlot?: number;
        /** 表类型: int, 注释: 符文类型
9001.攻击
9002.防御
9003.统率 */
        runeType?: number;
        /** 表类型: string, 注释: 解锁条件 */
        OpeningConditions?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ScoutConfig = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 侦察名称 */
        scoutName?: string;
        /** 表类型: byte, 注释: 侦察类型
1：普通侦察
2：高级侦察
0：顶级侦察 */
        scoutType?: number;
        /** 表类型: string, 注释: 侦察条件 */
        scoutCondition?: string;
        /** 表类型: string, 注释: 侦察描述 */
        scoutDesc?: string;
        /** 表类型: string, 注释: 侦察消耗 */
        scoutCost?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ScoutLog = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: uint, 注释: 侦察坐标x */
        scoutLocX?: number;
        /** 表类型: uint, 注释: 侦察坐标y */
        scoutLocY?: number;
        /** 表类型: bytes, 注释: 侦察数据 */
        scoutResult?: List<number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ServerLog = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: ulongMap*, 注释: 道具相关记录 */
        itemCount?: Dictionary<string, number>;
        /** 表类型: ulongMap*, 注释: 战斗相关记录 */
        battleCount?: Dictionary<string, number>;
        /** 表类型: ulongMap*, 注释: 商店相关记录 */
        shopCount?: Dictionary<string, number>;
        /** 表类型: ulongMap*, 注释: 其他记录 */
        otherCount?: Dictionary<string, number>;
        /** 表类型: string, 注释: log的类型 */
        logType?: string;
        /** 表类型: int, 注释: 敌人的类型 */
        armyType?: number;
        /** 表类型: int, 注释: 等级 */
        lv?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ServerUserData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: int, 注释: 玩家ID数量记录 */
        playerIDCount?: number;
        /** 表类型: intMap, 注释: 玩家阵营数量记录 */
        userCampCount?: Dictionary<string, number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SeverConfigBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 备注 */
        depict?: string;
        /** 表类型: string, 注释: ip */
        ip?: string;
        /** 表类型: string, 注释: 网关地址 */
        gateWay?: string;
        /** 表类型: string, 注释: 区服ID */
        serverID?: string;
        /** 表类型: string, 注释: 区服名称 */
        serverName?: string;
        /** 表类型: byte, 注释: 区服状态:
1.爆满
2.维护
3.流畅 */
        serverState?: number;
        /** 表类型: bool, 注释: 新区 */
        newServer?: boolean;
        /** 表类型: string, 注释: MAC地址 */
        MAC?: string;
        /** 表类型: date, 注释: 启动时间 */
        setupTime?: number;
        /** 表类型: byte, 注释: 状态 */
        status?: number;
        /** 表类型: uint, 注释: 当前人数 */
        playerSum?: number;
        /** 表类型: bool, 注释: 是否为网关 */
        isGate?: boolean;
        /** 表类型: string, 注释: 备注IP */
        descIP?: string;
        /** 表类型: ulong, 注释: 地图更新序号 */
        mapSaveVer?: number;
        /** 表类型: byte, 注释: 小地图显示玩家等级下限 */
        mapShowLevel?: number;
        /** 表类型: int, 注释: 地图分割尺寸 */
        mapSplit?: number;
        /** 表类型: uint, 注释: 心跳断开限制 */
        heatbeatLimit?: number;
        /** 表类型: int, 注释: 每日最大野外战斗次数 */
        battleTimes?: number;
        /** 表类型: int, 注释: 精英每日首杀奖励次数 */
        EliteFirstMaxNum?: number;
        /** 表类型: int, 注释: 精英每日首杀奖励次数 */
        ElitePartakeMaxNum?: number;
        /** 表类型: float, 注释: 行军速度 */
        marchSpeed?: number;
        /** 表类型: int, 注释: 战役推图玩家基础最大体力 */
        campaignMaxStamina?: number;
        /** 表类型: int, 注释: 每日购买体力基础次数 */
        PhysicalTime?: number;
        /** 表类型: string, 注释: 购买体力跳转（jumpbaseid） */
        PhysicalTimeJump?: string;
        /** 表类型: int, 注释: 上阵基础数量 */
        arrangeNum?: number;
        /** 表类型: int, 注释: 战役起始关卡 */
        campaignStartId?: number;
        /** 表类型: string, 注释: 扫荡模式变更 */
        sweepModeChanged?: string;
        /** 表类型: string, 注释: 推荐阵营奖励 */
        recomCampReward?: string;
        /** 表类型: byte, 注释: 阵营加入等级 */
        campJoin?: number;
        /** 表类型: int, 注释: 围攻等待时间 */
        siegeWaitTime?: number;
        /** 表类型: int, 注释: 围攻提高消耗时间 */
        siegeMaxTime?: number;
        /** 表类型: string, 注释: 突袭消耗 */
        strikeCost?: string;
        /** 表类型: string, 注释: 围攻低消耗 */
        siegeMinCost?: string;
        /** 表类型: string, 注释: 围攻高消耗 */
        siegeMaxCost?: string;
        /** 表类型: string, 注释: 召回功能消耗道具与数量 */
        callBack?: string;
        /** 表类型: string, 注释: 快速召回消耗道具与数量 */
        fastCallBack?: string;
        /** 表类型: string, 注释: 行军加速消耗道具与数量 */
        marchSpeedUp?: string;
        /** 表类型: string, 注释: 超级行军加速消耗道具与数量 */
        superMarchSpeedUp?: string;
        /** 表类型: string, 注释: 炸矿消耗 */
        minerAttack?: string;
        /** 表类型: int, 注释: 同阵营炸矿每日次数 */
        sameCampMinerAttackLim?: number;
        /** 表类型: int, 注释: 领地失守后免战时间（秒） */
        avoidWarTime?: number;
        /** 表类型: string, 注释: 免战特效 */
        avoidWarEffect?: string;
        /** 表类型: int, 注释: 装备库最终解锁容量上限 */
        maxEquipVolume?: number;
        /** 表类型: string, 注释: 突破解锁条件 */
        breakOutUnlock?: string;
        /** 表类型: string, 注释: 日常任务解锁条件 */
        dailyEventUnlock?: string;
        /** 表类型: int, 注释: 解锁野外需要的玩家等级 */
        unlockWildLevel?: number;
        /** 表类型: string, 注释: 军情功能解锁条件 */
        IntelligenceUnlock?: string;
        /** 表类型: byte, 注释: 装备自动锁定品质 */
        equipAuutoLock?: number;
        /** 表类型: int, 注释: 普通成长恢复时间（秒） */
        commonGrowthRecover?: number;
        /** 表类型: int, 注释: 普通成长恢复最大上限 */
        commonGrowthMaxTime?: number;
        /** 表类型: string, 注释: 没有使用 */
        seniorGrowthCost?: string;
        /** 表类型: int, 注释: 跳过战斗时间（秒） */
        battleJumpTime?: number;
        /** 表类型: string, 注释: 跳过战斗条件 */
        battleJumpUnlock?: string;
        /** 表类型: int, 注释: 狂暴开始回合 */
        furiousRound?: number;
        /** 表类型: float, 注释: 狂暴强化倍率 */
        furiousStrengthen?: number;
        /** 表类型: float, 注释: 狂暴强化上限 */
        furiousMaxStrengthen?: number;
        /** 表类型: int, 注释: 据点免战时间（秒） */
        fortifiedAvoidWarTime?: number;
        /** 表类型: int, 注释: 申请总督时长（秒） */
        applyGvernorTime?: number;
        /** 表类型: int, 注释: 据点总督撤离时间（秒） */
        fortifiedRetreatTime?: number;
        /** 表类型: string, 注释: 玩家进攻据点限制 */
        fortifiedAvailable?: string;
        /** 表类型: int, 注释: 资源田收取间隔（间隔多少秒可以收取一次资源） */
        resourceGetInterval?: number;
        /** 表类型: int, 注释: 资源田计算时间（每隔多少秒获取一次addrescue） */
        resourceGetTime?: number;
        /** 表类型: string, 注释: 初次引导气泡获取奖励 */
        firstGuideReward?: string;
        /** 表类型: int, 注释: 掠夺资源数量% */
        plunderPrecent?: number;
        /** 表类型: int, 注释: 掠夺损失% */
        plunderLostPrecent?: number;
        /** 表类型: int, 注释: 补偿百分比 */
        plunderReturn?: number;
        /** 表类型: int, 注释: 高等补偿条件 */
        plunderHighReturnLimit?: number;
        /** 表类型: int, 注释: 高等补偿百分比 */
        plunderHighReturn?: number;
        /** 表类型: uintMap, 注释: 高等补偿消耗 */
        plunderHighReturnCost?: Dictionary<string, number>;
        /** 表类型: int, 注释: 工人掠夺的数量% */
        HamalplunderPrecent?: number;
        /** 表类型: int, 注释: 工人损失数量% */
        HamalLostPrecent?: number;
        /** 表类型: int, 注释: 阵营建设每日最大次数 */
        campDevelopMaxTime?: number;
        /** 表类型: string, 注释: 改名卡消耗 */
        changNameCost?: string;
        /** 表类型: string, 注释: 改名卡消耗不足替换 */
        changNameExchange?: string;
        /** 表类型: string, 注释: 喇叭消耗 */
        hornCost?: string;
        /** 表类型: string, 注释: 喇叭消耗不足替换 */
        hornCostExchange?: string;
        /** 表类型: int, 注释: 聊天间隔cd */
        chatCd?: number;
        /** 表类型: string, 注释: 聊天解锁等级 */
        chatUnlock?: string;
        /** 表类型: string, 注释: 聊天解锁等级描述 */
        chatUnlockDesc?: string;
        /** 表类型: string, 注释: 解锁队列1介绍 */
        Arrangement1UnlockDesc?: string;
        /** 表类型: string, 注释: 解锁队列2介绍 */
        Arrangement2UnlockDesc?: string;
        /** 表类型: int, 注释: 邮件分享CD */
        mailShareCd?: number;
        /** 表类型: int, 注释: 邮件默认保存时间 */
        mailSaveTime?: number;
        /** 表类型: int, 注释: 邮件最大持有数量 */
        mailMaxKeep?: number;
        /** 表类型: int, 注释: 免费附魔恢复间隔时间 */
        enchantingFreeRefreshInterval?: number;
        /** 表类型: string, 注释: 普通附魔消耗 */
        commonGrowthCost?: string;
        /** 表类型: string, 注释: 高级附魔每次消耗 */
        seniorEnchantingCost?: string;
        /** 表类型: string, 注释: 终极附魔消耗 */
        ultimateEnchantingCost?: string;
        /** 表类型: int, 注释: 免费附魔最大次数 */
        enchantingFreeTimesLimit?: number;
        /** 表类型: int, 注释: 附魔气泡出现免费次数 */
        EnchantingBubble?: number;
        /** 表类型: int, 注释: 祭坛出现条件，（消耗n倍时出现） */
        altarBubble?: number;
        /** 表类型: string, 注释: 活动按钮出现条件 */
        activityIconAvailable?: string;
        /** 表类型: string, 注释: 福利按钮出现条件 */
        welfareIconAvailable?: string;
        /** 表类型: string, 注释: 特惠按钮出现条件 */
        preferentialIconAvailable?: string;
        /** 表类型: string, 注释: 商店礼品解锁条件 */
        shopGiftsAvailable?: string;
        /** 表类型: int, 注释: 商店礼品每日最大领取次数 */
        shopGiftsMaxGetNum?: number;
        /** 表类型: int, 注释: 礼品领取后CD(秒) */
        giftCollectionCd?: number;
        /** 表类型: int, 注释: 精英怪刷怪圈数 */
        eliteMonsterCircles?: number;
        /** 表类型: int, 注释: 友军驻守英雄最大数量 */
        friendlyGarrisonHeroMax?: number;
        /** 表类型: int, 注释: 深渊重置次数 */
        abyssResetNum?: number;
        /** 表类型: int, 注释: 密谈重置次数 */
        communeResetNum?: number;
        /** 表类型: int, 注释: 精力重置值 */
        energyResetNum?: number;
        /** 表类型: string, 注释: 阵营拉票消耗 */
        campCanvassConsume?: string;
        /** 表类型: string, 注释: 挂机功能解锁 */
        hangUpUnlock?: string;
        /** 表类型: string, 注释: 采集栏位解锁 */
        collectionHeroUnlock?: string;
        /** 表类型: string, 注释: 采集栏位解锁提示 */
        collectionHeroUnlockDesc?: string;
        /** 表类型: string, 注释: 防守栏位解锁 */
        defenceHeroUnlock?: string;
        /** 表类型: string, 注释: 防守栏位解锁提示 */
        defenceHeroUnlockDesc?: string;
        /** 表类型: string, 注释: 战役胜利退回主界面 */
        pushMapBackMainId?: string;
        /** 表类型: string, 注释: 玩家描述修改限制 */
        playerDescLimit?: string;
        /** 表类型: int, 注释: 玩家描述字数上限 */
        playerDescNumLimit?: number;
        /** 表类型: string, 注释: 限制引导触发等级 */
        idleGuideLimit?: string;
        /** 表类型: int, 注释: 限制引导触发时间 */
        idleGuideTime?: number;
        /** 表类型: string, 注释: 图鉴功能限制 */
        handBookLimit?: string;
        /** 表类型: string, 注释: 等级排行榜限制 */
        RankingLimit?: string;
        /** 表类型: intMap, 注释: 初始的解锁如 地图移动 据点可攻打 征收播报等 */
        unlockInit?: Dictionary<string, number>;
        /** 表类型: string, 注释: 精英组队解锁条件 */
        eliteTeamLimit?: string;
        /** 表类型: string, 注释: 旅行者号解锁 */
        TravelerUnlock?: string;
        /** 表类型: int, 注释: 世界喇叭显示时间 */
        publicHronWorldShowtime?: number;
        /** 表类型: int, 注释: 系统公告显示时间 */
        publicSystemNoticeShowtime?: number;
        /** 表类型: int, 注释: 世界喇叭移动速度 */
        publicHronWorldMoveSpeed?: number;
        /** 表类型: int, 注释: 系统公告移动速度 */
        publicSystemNoticeMoveSpeed?: number;
        /** 表类型: string, 注释: 加速浪费提示弹窗解锁条件 */
        wastePopupLimit?: string;
        /** 表类型: int, 注释: 加速道具每日掉落次数 */
        acceleDropNum?: number;
        /** 表类型: int, 注释: 加速道具掉落概率(百分之多少) */
        acceleDropPer?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SeverData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: byte, 注释: 区服状态:
1.爆满
2.维护
3.流畅 */
        serverState?: number;
        /** 表类型: bool, 注释: 新区 */
        newServer?: boolean;
        /** 表类型: date, 注释: 启动时间 */
        setupTime?: number;
        /** 表类型: byte, 注释: 状态 */
        status?: number;
        /** 表类型: uint, 注释: 当前人数 */
        playerSum?: number;
        /** 表类型: ulong, 注释: 地图更新序号 */
        mapSaveVer?: number;
        /** 表类型: date, 注释: 开服时间 */
        openTime?: number;
        /** 表类型: long, 注释: 服务器偏移时间 */
        addTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ShopList = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 备注 */
        depict?: string;
        /** 表类型: data_ItemData, 注释: 道具配置 */
        itemData?: ItemData;
        /** 表类型: intMap, 注释: 道具Id */
        itemId?: Dictionary<string, number>;
        /** 表类型: int, 注释: 货币类型 */
        shopType?: number;
        /** 表类型: intMap, 注释: 实际售价 */
        sellPrice?: Dictionary<string, number>;
        /** 表类型: intMap, 注释: 显示原价 */
        showPrice?: Dictionary<string, number>;
        /** 表类型: floats, 注释: 折扣 */
        onOff?: List<number>;
        /** 表类型: int, 注释: 商品购买次数 */
        goodsBuyLimit?: number;
        /** 表类型: ulong, 注释: 商品刷新时间 */
        goodsRefreshTime?: number;
        /** 表类型: string, 注释: 商品购买限制条件 */
        buyLimit?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ShopSet = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 商店ID
1001.普通商店
1002.贵族商店
20001.新服兑换商店
30001.召唤怪活动兑换
40001.礼品商店
50001.师徒兑换商店 */
        shopId?: string;
        /** 表类型: int, 注释: 商店页签类型 */
        shopType?: number;
        /** 表类型: string, 注释: 页签描述 */
        typeDepict?: string;
        /** 表类型: string, 注释: 道具名字 */
        itemName?: string;
        /** 表类型: intMap, 注释: 商品{"id":数量} */
        goodsList?: Dictionary<string, number>;
        /** 表类型: int, 注释: 商品购买次数 */
        goodsBuyLimit?: number;
        /** 表类型: int, 注释: 单次购买最大数量 */
        goodsBuyCountLimit?: number;
        /** 表类型: string, 注释: 商品刷新时间（对应timeevent中任务回调名字的内容） */
        goodsRefreshTime?: string;
        /** 表类型: intMap, 注释: 实际售价{"id":数量} */
        sellPrice?: Dictionary<string, number>;
        /** 表类型: intMap, 注释: 显示原价{"id":数量} */
        showPrice?: Dictionary<string, number>;
        /** 表类型: floats, 注释: 折扣 */
        onOff?: List<number>;
        /** 表类型: string, 注释: 商品购买限制条件 */
        buyLimit?: string;
        /** 表类型: string, 注释: 商品购买限制描述 */
        buyLimitDesc?: string;
        /** 表类型: bool, 注释: 是否显示 */
        visible?: boolean;
        /** 表类型: bool, 注释: 是否显示红点 */
        redPoint?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SignInBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 活动编号 */
        activityNum?: number;
        /** 表类型: strings, 注释: 奖励组id */
        rewardGroups?: List<string>;
        /** 表类型: int, 注释: 循环模式 */
        loopMode?: number;
        /** 表类型: string, 注释: 刷新时间 */
        refreshTimeEvent?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SkillBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 技能名 */
        skillName?: string;
        /** 表类型: string, 注释: 技能描述 */
        depict?: string;
        /** 表类型: string, 注释: 动画 */
        anim?: string;
        /** 表类型: byte, 注释: 技能类型 */
        skillType?: number;
        /** 表类型: int, 注释: 技能战力 */
        skillPower?: number;
        /** 表类型: string, 注释: 技能图标 */
        icon?: string;
        /** 表类型: byte, 注释: 发动优先级 */
        priority?: number;
        /** 表类型: ints, 注释: 发动回合
 */
        castRounds?: List<number>;
        /** 表类型: int, 注释: 发动次数
 */
        castNum?: number;
        /** 表类型: string, 注释: 公式 */
        actions?: string;
        /** 表类型: string, 注释: 技能播放特效 */
        effect?: string;
        /** 表类型: float, 注释: 特效播放延迟 */
        effectpDelay?: number;
        /** 表类型: string, 注释: 音效 */
        voice?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SpecilEffectBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 备注描述 */
        depict?: string;
        /** 表类型: string, 注释: 特效名 */
        effectName?: string;
        /** 表类型: string, 注释: 特效资源 */
        effect?: string;
        /** 表类型: float, 注释: 播放速度 */
        speed?: number;
        /** 表类型: string, 注释: 特效点位置 */
        effectPoint?: string;
        /** 表类型: string, 注释: 下一个特效 */
        nextEffect?: string;
        /** 表类型: float, 注释: 下一个特效延迟 */
        nextDelay?: number;
        /** 表类型: bool, 注释: 是否为盾特效 */
        isSheld?: boolean;
        /** 表类型: byte, 注释: 曲线类型
0：没有曲线
1：直接出现在目标上
2：平直弹道
3：抛物线
4：弓箭混合（近距离直线/远距离曲线） */
        curvetype?: number;
        /** 表类型: float, 注释: 子弹速度 */
        bulletSpeed?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type StatusDepict = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 对应属性 */
        status?: string;
        /** 表类型: string, 注释: 属性名称 */
        statusName?: string;
        /** 表类型: string, 注释: 属性描述 */
        statusDepict?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SummonMonsterActivityBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 活动id */
        activityId?: string;
        /** 表类型: string, 注释: 参与活动条件 */
        joinActivityCondition?: string;
        /** 表类型: string, 注释: 低级召唤怪编号(怪物召唤表编号) */
        lowSummonMonsterNum?: string;
        /** 表类型: string, 注释: 低级召唤怪消耗道具 */
        lowSummonMonstersConsumeItems?: string;
        /** 表类型: string, 注释: 中级召唤怪编号 */
        midSummonMonsterNum?: string;
        /** 表类型: string, 注释: 中级召唤怪消耗道具 */
        midSummonMonstersConsumeItems?: string;
        /** 表类型: string, 注释: 高级召唤怪编号 */
        highSummonMonsterNum?: string;
        /** 表类型: string, 注释: 高级召唤怪消耗道具 */
        highSummonMonstersConsumeItems?: string;
        /** 表类型: string, 注释: 兑换预览 */
        exchangePreview?: string;
        /** 表类型: string, 注释: 兑换商店id */
        exchangeShopId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SystemConsumeBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 类型
1.深渊次数购买
2.世界boss挑战消耗
3.集结消耗 */
        consumeType?: number;
        /** 表类型: int, 注释: 第N次购买 */
        buyNum?: number;
        /** 表类型: string, 注释: 该次消耗 */
        consumeContent?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TechnologyListBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: int, 注释: 提升
1001金币科技
1002.木材科技
1003.食物科技
1004.魔矿石科技
1005.全资源科技
1006.建造加速科技
1007.仓库容量科技
1008.秘技科技
1009.极品装备科技
1010.贸易专家科技
1100.近战军营容量提升科技
1101.法师军营容量提升科技
1102.射手军营容量提升科技
1103.近战
1200.行军速度科技
1206.遗物注能术科技 */
        technologyType?: number;
        /** 表类型: string, 注释: 科技图标 */
        technologyIcon?: string;
        /** 表类型: byte, 注释: 所属页签
1.内政页签
2.军事页签
3.进阶页签 */
        logType?: number;
        /** 表类型: string, 注释: 获得道具id */
        technologyItem?: string;
        /** 表类型: string, 注释: 科技显示名称 */
        technologyShowName?: string;
        /** 表类型: string, 注释: 备注 */
        technologyList?: string;
        /** 表类型: string, 注释: 效果描述 */
        effectDesc?: string;
        /** 表类型: string, 注释: 下一级效果描述 */
        nextEffectDesc?: string;
        /** 表类型: string, 注释: 科技阶段
没填则没有阶段
填值则显示对应阶段 */
        technologysStage?: string;
        /** 表类型: string, 注释: 总共几个阶段 */
        allStage?: string;
        /** 表类型: string, 注释: 当前等级 */
        currentLevel?: string;
        /** 表类型: string, 注释: 显示等级 */
        showLevel?: string;
        /** 表类型: string, 注释: 研发特殊条件：
 */
        technologyCondition?: string;
        /** 表类型: string, 注释: 研发条件描述：
 */
        technologyDes?: string;
        /** 表类型: string, 注释: 消耗 */
        itemCost?: string;
        /** 表类型: string, 注释: 下一级id */
        nextLevel?: string;
        /** 表类型: string, 注释: 研发时间 */
        productionTime?: string;
        /** 表类型: int, 注释: 位置x */
        locX?: number;
        /** 表类型: int, 注释: 位置y */
        locY?: number;
        /** 表类型: string, 注释: 连接线位置 */
        connectLine?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TerritoryEventListBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 探索事件名称 */
        terEventName?: string;
        /** 表类型: string, 注释: 任务摘要 */
        terEventSynopsis?: string;
        /** 表类型: byte, 注释: 探索事件类型
1.任务事件
2.清除障碍物
3.击败敌人
4.与npc互动
5.过程场画
6.招募英雄
7.自动接任务
8.接任务自动完成 */
        terEventType?: number;
        /** 表类型: string, 注释: 事件对应id（填） */
        terEventId?: string;
        /** 表类型: string, 注释: 探索事件开始剧情对话（填入引导id） */
        terEventdialogue?: string;
        /** 表类型: string, 注释: 探索事件过程中剧情对话（填入引导id） */
        terEventProgressdialogue?: string;
        /** 表类型: string, 注释: 事件完成时剧情对话（填入引导id） */
        terEventEnddialogue?: string;
        /** 表类型: string, 注释: 后续探索事件id
填入[[TerritoryEventBase中的id]] */
        nextTerEvent?: string;
        /** 表类型: string, 注释: 事件出现条件 */
        eventvVisableLimit?: string;
        /** 表类型: string, 注释: 事件接受条件 */
        eventAcceptLimit?: string;
        /** 表类型: string, 注释: 事件接受条件描述 */
        eventAcceptLimitDesc?: string;
        /** 表类型: string, 注释: 完成条件 */
        finishLimit?: string;
        /** 表类型: string, 注释: 完成奖励
若此任务完成需要解锁区域，请填入TerritoryBase中的区域id[[物品 */
        finishReward?: string;
        /** 表类型: string, 注释: 完成后删除的道具 */
        finishCost?: string;
        /** 表类型: string, 注释: 任务归属的npc的id
TerritoryNpcListBase中的id */
        terEventNpc?: string;
        /** 表类型: string, 注释: 战斗信息(如果是战斗任务，则不需要填完成条件) */
        battleID?: string;
        /** 表类型: ulong, 注释: 事件等待时间 */
        eventWaitTime?: number;
        /** 表类型: string, 注释: jumpbase跳转id */
        jumpId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TerritoryListBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 区域名称 */
        areaName?: string;
        /** 表类型: string, 注释: 区域场景模型 */
        areaModel?: string;
        /** 表类型: string, 注释: 探索区域对应id
填TechnologyBase中的id
 */
        TerritoryBaseid?: string;
        /** 表类型: int, 注释: 探索等级 */
        exploreLevel?: number;
        /** 表类型: strings, 注释: 区域中的npcid（多个时使用|隔开） */
        areaNpc?: List<string>;
        /** 表类型: string, 注释: 下一级区域id（若同时解锁多个） */
        nextArea?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TerritoryNpcListBase = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: npc名称 */
        NpcName?: string;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: string, 注释: 模型 */
        model?: string;
        /** 表类型: string, 注释: 执行动作 */
        modelAction?: string;
        /** 表类型: string, 注释: 动态立绘 */
        spine?: string;
        /** 表类型: string, 注释: 对应npcid
填TerritoryNpcBase的id */
        NpcId?: string;
        /** 表类型: int, 注释: npc类型
1.普通npc（对话任务）
2 */
        NpcType?: number;
        /** 表类型: string, 注释: 所在区域（填TerritoryListBase中的id） */
        NpcArea?: string;
        /** 表类型: float, 注释: 坐标位置x */
        areaLocX?: number;
        /** 表类型: float, 注释: 坐标位置y */
        areaLocY?: number;
        /** 表类型: float, 注释: 模型旋转角度 */
        angle?: number;
        /** 表类型: data_DialogueBase, 注释: 空闲时对话事件（填入对话表id） */
        dialogue?: DialogueBase;
        /** 表类型: string, 注释: npc对应事件（填入事件表id） */
        npcEvent?: string;
        /** 表类型: string, 注释: npc出现条件 */
        visableLimit?: string;
        /** 表类型: string, 注释: NPC消失条件 */
        unviableLimit?: string;
        /** 表类型: string, 注释: 互动限制 */
        activeLimit?: string;
        /** 表类型: string, 注释: 互动限制提示 */
        activeLimitDesc?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type Test = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 道具名字 */
        itemName?: string;
        /** 表类型: data_ItemBase, 注释: test1 */
        test1?: ItemBase;
        /** 表类型: datas_ItemBase, 注释: test2 */
        test2?: List<ItemBase>;
        /** 表类型: stringMap, 注释: test3 */
        test3?: Dictionary<string, string>;
        /** 表类型: stringsMap, 注释: test4 */
        test4?: Dictionary<string, List<string>>;
        /** 表类型: data_ItemBaseMap, 注释: test5 */
        test5?: Dictionary<string, ItemBase>;
        /** 表类型: datas_ItemBaseMap, 注释: test6 */
        test6?: Dictionary<string, List<ItemBase>>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TipsShow = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: ui名 */
        uiName?: string;
        /** 表类型: string, 注释: ui备注 */
        uiDesc?: string;
        /** 表类型: bool, 注释: 是否显示本日不在提示 */
        ifShow?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TowerBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 下一级id */
        nextId?: string;
        /** 表类型: int, 注释: 防守类型
1.防守等级加成
2.防守火焰元素加成
3.防守冰霜元素加成
4.防守雷电元素加成 */
        defType?: number;
        /** 表类型: int, 注释: 防守等级 */
        defLv?: number;
        /** 表类型: string, 注释: 消耗 */
        itemCost?: string;
        /** 表类型: string, 注释: 特殊条件： */
        useLimit?: string;
        /** 表类型: string, 注释: 特殊条件描述 */
        limitdesc?: string;
        /** 表类型: ulongMap, 注释: 提供buff（对应BuffBaseID） */
        provideBuff?: Dictionary<string, number>;
        /** 表类型: string, 注释: buff描述 */
        provideBuffDesc?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TowerSettingBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 自动补兵百分比条件 */
        autoReinforcements?: number;
        /** 表类型: string, 注释: 补兵消耗（每个兵需要消耗的资源） */
        replenishmentCost?: string;
        /** 表类型: int, 注释: 消耗时间（0-100%兵力需要消耗的时间）秒 */
        consumeTime?: number;
        /** 表类型: int, 注释: 加速补兵最小时间 */
        consumeMinTime?: number;
        /** 表类型: string, 注释: 消耗钻石数 */
        consumeDiamond?: string;
        /** 表类型: int, 注释: 参战百分比条件 */
        joinBattleConditions?: number;
        /** 表类型: ulong, 注释: 驻守英雄单次最大时长 */
        garrisonHeroMaxTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TravelerBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: string, 注释: 下一级id */
        frontId?: string;
        /** 表类型: string, 注释: 旅人名称 */
        travelerName?: string;
        /** 表类型: int, 注释: 旅人id */
        travelerId?: number;
        /** 表类型: string, 注释: 对应baseid */
        itemBaseId?: string;
        /** 表类型: int, 注释: 获得类型
1.解锁获得
2.购买获得 */
        unlockType?: number;
        /** 表类型: string, 注释: 解锁条件 */
        unlockingConditions?: string;
        /** 表类型: string, 注释: 解锁条件描述 */
        unlockingConditionsDesc?: string;
        /** 表类型: int, 注释: 星级 */
        starRating?: number;
        /** 表类型: string, 注释: 升下一级所需升星材料 */
        nextLvNeedMaterials?: string;
        /** 表类型: string, 注释: 获得奖励 */
        rewards?: string;
        /** 表类型: ulongMap, 注释: 提供buff（对应BuffBaseID） */
        provideBuff?: Dictionary<string, number>;
        /** 表类型: string, 注释: buff描述 */
        provideBuffDesc?: string;
        /** 表类型: string, 注释: 动态立绘 */
        spine?: string;
        /** 表类型: string, 注释: 立绘背景 */
        backround?: string;
        /** 表类型: string, 注释: 旅人生平介绍 */
        travelerDesc?: string;
        /** 表类型: ulongMap, 注释: 送礼所获好感度[ItemBaseID */
        giftGetFavorability?: Dictionary<string, number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TravelerDialogueBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 好感度等级 */
        favorability?: number;
        /** 表类型: strings, 注释: 互动台词 */
        DialogueId?: List<string>;
        /** 表类型: strings, 注释: 冷淡互动台词库id */
        coldDialogueId?: List<string>;
        /** 表类型: strings, 注释: 中立互动台词库id */
        neutralDialogueId?: List<string>;
        /** 表类型: strings, 注释: 友善互动台词库id */
        friendlyDialogueId?: List<string>;
        /** 表类型: strings, 注释: 尊敬互动台词库id */
        respectDialogueId?: List<string>;
        /** 表类型: strings, 注释: 崇敬互动台词库id */
        reverenceDialogueId?: List<string>;
        /** 表类型: strings, 注释: 崇拜互动台词库id */
        worshipDialogueId?: List<string>;
        /** 表类型: strings, 注释: 爱慕互动台词库id */
        aimerDialogueId?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TravelerFavorabilityBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 旅人id */
        travelerId?: number;
        /** 表类型: int, 注释: 友好度
0.冷淡
1.初识
2.友善
3.熟悉
4.亲切
5.亲密
6.爱慕
7.尊敬
8.崇敬
9.崇拜
10.生死相许 */
        favorability?: number;
        /** 表类型: ulongMap, 注释: 提供buff（对应BuffBaseID） */
        provideBuff?: Dictionary<string, number>;
        /** 表类型: string, 注释: buff描述 */
        provideBuffDesc?: string;
        /** 表类型: int, 注释: 到达本级所需友好度 */
        requiredFavorability?: number;
        /** 表类型: string, 注释: 解锁条件 */
        unlockingConditions?: string;
        /** 表类型: string, 注释: 解锁条件描述 */
        unlockingConditionsDesc?: string;
        /** 表类型: strings, 注释: 台词库id */
        lineLibraryId?: List<string>;
        /** 表类型: strings, 注释: 互动库id（对应TravelerInteractiveBaseID） */
        interactiveId?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TravelerFavorabilityConfig = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 旅人id */
        favorabilityType?: number;
        /** 表类型: string, 注释: 友好度
 */
        favorabilityName?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TravelerInteractiveBase = {
        /** 表类型: string, 注释: 配置id */
        id?: string;
        /** 表类型: int, 注释: 所属旅人id */
        heroInteractiveId?: number;
        /** 表类型: int, 注释: 互动类型
1.问候
2.喝酒
3.密谈 */
        interactiveType?: number;
        /** 表类型: string, 注释: 解锁条件 */
        unlockingConditions?: string;
        /** 表类型: string, 注释: 解锁阶段显示 */
        ulockFavorabilityType?: string;
        /** 表类型: string, 注释: 解锁条件描述 */
        unlockingConditionsDesc?: string;
        /** 表类型: int, 注释: 获得友好度 */
        getFavorability?: number;
        /** 表类型: int, 注释: 消耗精力 */
        consumeEnergy?: number;
        /** 表类型: int, 注释: 消耗次数 */
        consumeTime?: number;
        /** 表类型: strings, 注释: 台词库id */
        lineLibraryId?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TreasureBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 备注描述 */
        depict?: string;
        /** 表类型: byte, 注释: 奖励类型
1.自选奖励
2.随机奖励 */
        treasureType?: number;
        /** 表类型: string, 注释: 自选奖励 */
        treasureChoice?: string;
        /** 表类型: string, 注释: 随机固定奖励(id */
        fixReward?: string;
        /** 表类型: int, 注释: 随机奖励数量 */
        randomcCunt?: number;
        /** 表类型: string, 注释: 随机物品数量权重[道具id */
        randomwWeight?: string;
        /** 表类型: bool, 注释: 是否可以重复获取同一奖励 */
        ifRepeat?: boolean;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type UnlockConfig = {
        /** 表类型: string, 注释: id */
        id?: string;
        /** 表类型: string, 注释: 解锁内容 */
        position?: string;
        /** 表类型: string, 注释: 解锁条件 */
        eliminate?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type UserDataBase = {
        /** 表类型: string, 注释: 用户uid */
        id?: string;
        /** 表类型: string, 注释: 用户名 */
        playerName?: string;
        /** 表类型: string, 注释: token */
        token?: string;
        /** 表类型: string, 注释: 玩家搜索ID */
        searchId?: string;
        /** 表类型: string*, 注释: 密码 */
        passWord?: string;
        /** 表类型: byte, 注释: 账号状态 */
        status?: number;
        /** 表类型: intMap, 注释: 持有货币 */
        currency?: Dictionary<string, number>;
        /** 表类型: bool, 注释: 是否屏蔽 */
        isBlock?: boolean;
        /** 表类型: bool, 注释: 是否记录 */
        isLogUser?: boolean;
        /** 表类型: ulong, 注释: 登录时间 */
        loginTime?: number;
        /** 表类型: ulong, 注释: 登出时间 */
        logOutTime?: number;
        /** 表类型: byte, 注释: 第三方账号 */
        thirdPartyAccount?: number;
        /** 表类型: byte, 注释: 服务器渠道 */
        serverChannel?: number;
        /** 表类型: byte, 注释: 账号权限 */
        accountAccess?: number;
        /** 表类型: strings, 注释: 黑名单 */
        blacklist?: List<string>;
        /** 表类型: bool, 注释: 是否是npc */
        isNPC?: boolean;
        /** 表类型: string, 注释: 玩家姓名 */
        frinedName?: string;
        /** 表类型: string, 注释: 玩家头像 */
        icon?: string;
        /** 表类型: string, 注释: 玩家头像框 */
        frame?: string;
        /** 表类型: int, 注释: 玩家阵营 */
        camp?: number;
        /** 表类型: int, 注释: 玩家等级 */
        rank?: number;
        /** 表类型: int, 注释: 玩家经验 */
        rankExp?: number;
        /** 表类型: byte, 注释: 玩家阵营爵位等级 */
        campRank?: number;
        /** 表类型: data_FriendDataMap, 注释: 好友列表 */
        friendList?: Dictionary<string, FriendData>;
        /** 表类型: string, 注释: 玩家描述 */
        playerDecipt?: string;
        /** 表类型: data_FriendDataMap, 注释: 申请中好友 */
        application?: Dictionary<string, FriendData>;
        /** 表类型: int, 注释: 玩家战斗力 */
        power?: number;
        /** 表类型: data_MapData, 注释: 玩家主城位置 */
        playerCityLocation?: MapData;
        /** 表类型: ulong, 注释: 野外战斗次数刷新时间 */
        lastRefreshTime?: number;
        /** 表类型: ulong, 注释: 战役推图体力刷新时间 */
        CampaignAPRefreshTime?: number;
        /** 表类型: ulong, 注释: 使用体力药水刷新时间 */
        APPotionRefreshTime?: number;
        /** 表类型: ulong, 注释: 钻石购买体力刷新时间 */
        APBuyRefreshTime?: number;
        /** 表类型: ulong, 注释: 阵营建设次数刷新时间 */
        campDevRefreshTime?: number;
        /** 表类型: ulong, 注释: 阵营爵位每日薪酬 */
        campRankDailyReward?: number;
        /** 表类型: ulong, 注释: 每日任务刷新时间 */
        dailyEventRefreshTime?: number;
        /** 表类型: ulong, 注释: 贵族商店刷新时间 */
        nobleShopRefreshTime?: number;
        /** 表类型: ulong, 注释: 阵营任务刷新时间 */
        campEventRefreshTime?: number;
        /** 表类型: ulong, 注释: 工人最终刷新时间 */
        hamalRefreshTime?: number;
        /** 表类型: data_CampaignData, 注释: 关卡进度 */
        campaignProgress?: CampaignData;
        /** 表类型: ulong, 注释: 免费附魔次数刷新 */
        enchantingFreeRefreshTime?: number;
        /** 表类型: float, 注释: 当前登录时间 */
        currentLoginTIme?: number;
        /** 表类型: string, 注释: 有这个码就可以调用用户任何操作，登陆后生成，每次随机 */
        securityToken?: string;
        /** 表类型: string, 注释: 用户名 */
        userid?: string;
        /** 表类型: string, 注释: 用户密码 */
        userpwd?: string;
        /** 表类型: int, 注释: 账户人民币金额 */
        monery?: number;
        /** 表类型: bool, 注释: 账户状态 */
        active?: boolean;
        /** 表类型: float, 注释: 用户被封禁的时间 */
        blokerTime?: number;
        /** 表类型: string, 注释: 微信平台唯一识别码 */
        wechatToken?: string;
        /** 表类型: string, 注释: 苹果账户唯一识别码 */
        appleToken?: string;
        /** 表类型: string, 注释: qq平台唯一识别码 */
        qqToken?: string;
        /** 表类型: stringMap, 注释: 玩家设置 */
        playerSeting?: Dictionary<string, string>;
        /** 表类型: data_UseSimpleInfo, 注释: 玩家简易信息 */
        useSimpleInfo?: UseSimpleInfo;
        /** 表类型: datas_ChatMessageMap, 注释: 聊天记录 */
        chatLog?: Dictionary<string, List<ChatMessage>>;
        /** 表类型: data_FortifiedData, 注释: 担任据点总督 */
        keepGvernor?: FortifiedData;
        /** 表类型: bytes, 注释: 玩家交易所效率表 */
        ExchangeEfficiencyList?: List<number>;
        /** 表类型: data_GrowthFundAwardDataMap, 注释: 成长基金数据 */
        growthFundAwardData?: Dictionary<string, GrowthFundAwardData>;
        /** 表类型: stringMap, 注释: 玩家抽卡数据 */
        luckyDrawData?: Dictionary<string, string>;
        /** 表类型: int, 注释: 新服挑战活动天数进度 */
        challengeTaskProgress?: number;
        /** 表类型: ulong, 注释: buff活动奖励刷新时间 */
        buffActivityBonusRefreshTime?: number;
        /** 表类型: ulong, 注释: 深渊刷新时间 */
        abyssRefreshTime?: number;
        /** 表类型: int, 注释: 深渊重置次数 */
        abyssResetNum?: number;
        /** 表类型: int, 注释: 密谈重置次数 */
        communeResetNum?: number;
        /** 表类型: int, 注释: 精力重置值 */
        energyResetNum?: number;
        /** 表类型: ulongMap, 注释: 旅行者号记录 */
        travelerRecord?: Dictionary<string, number>;
        /** 表类型: string, 注释: 阵营拉票消耗 */
        campCanvassConsume?: string;
        /** 表类型: data_MasterDiscipleDataMap, 注释: 徒弟列表 */
        discipleList?: Dictionary<string, MasterDiscipleData>;
        /** 表类型: data_MasterDiscipleDataMap, 注释: 申请中徒弟 */
        applicationDisciple?: Dictionary<string, MasterDiscipleData>;
        /** 表类型: data_MasterDiscipleData, 注释: 当前师父 */
        currentMaster?: MasterDiscipleData;
        /** 表类型: ulong, 注释: 解除师徒关系时间 */
        dissolveRelationshipTime?: number;
        /** 表类型: data_MasterDiscipleDataMap, 注释: 申请中师父 */
        applicationMaster?: Dictionary<string, MasterDiscipleData>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type UserVarBase = {
        /** 表类型: string, 注释: 用户uid */
        id?: string;
        /** 表类型: byte, 注释: 游戏中账号状态 */
        inGameStatus?: number;
        /** 表类型: intMap, 注释: 持有货币 */
        currency?: Dictionary<string, number>;
        /** 表类型: bool, 注释: 小人图标 */
        littleManIcon?: boolean;
        /** 表类型: data_RoleData, 注释: 玩家角色 */
        PlayerAccount?: RoleData;
        /** 表类型: data_RoleDataMap, 注释: 英雄列表 */
        listOfFigures?: Dictionary<string, RoleData>;
        /** 表类型: data_ArrangementData, 注释: 布阵信息 */
        Arrangement?: ArrangementData;
        /** 表类型: date*, 注释: 创角时间 */
        creatTime?: number;
        /** 表类型: byte, 注释: 阵营 */
        camp?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type UseSimpleInfo = {
        /** 表类型: string, 注释: 用户uid */
        id?: string;
        /** 表类型: int, 注释: 玩家阵营 */
        camp?: number;
        /** 表类型: string, 注释: 玩家头像 */
        icon?: string;
        /** 表类型: string, 注释: 玩家头像框 */
        frame?: string;
        /** 表类型: string, 注释: 玩家姓名 */
        frinedName?: string;
        /** 表类型: int, 注释: 玩家等级 */
        rank?: number;
        /** 表类型: byte, 注释: 玩家阵营爵位等级 */
        campRank?: number;
        /** 表类型: string, 注释: 玩家所在区域 */
        Area?: string;
        /** 表类型: int, 注释: 玩家战斗力 */
        playerPower?: number;
        /** 表类型: int, 注释: 玩家胜利次数 */
        victoryNum?: number;
        /** 表类型: string, 注释: 玩家搜索ID */
        searchId?: string;
        /** 表类型: int, 注释: 持有票数 */
        ownTicketNum?: number;
        /** 表类型: int, 注释: 竞选票数 */
        ticketNum?: number;
        /** 表类型: string, 注释: 票投给谁 */
        ticketTar?: string;
        /** 表类型: int, 注释: 官职 */
        position?: number;
        /** 表类型: string, 注释: 阵营官职 */
        officeposition?: string;
        /** 表类型: intMap, 注释: 记录每日宝箱的领取状态 */
        campTreasure?: Dictionary<string, number>;
        /** 表类型: int, 注释: 每周排行据点战次数 */
        weekCampFortifiedBattleNum?: number;
        /** 表类型: int, 注释: 每周排行领地战次数 */
        weekCampPlayerBattle?: number;
        /** 表类型: int, 注释: 每周排行阵营建设次数 */
        weekCampDevelopNum?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type WalletErrLog = {
        /** 表类型: string, 注释: 记录ID */
        id?: string;
        /** 表类型: string, 注释: 类名 */
        className?: string;
        /** 表类型: string, 注释: 方法名 */
        methodName?: string;
        /** 表类型: string, 注释: 玩家ID */
        userToken?: string;
        /** 表类型: string, 注释: log信息 */
        logMessage?: string;
        /** 表类型: date, 注释: 记录时间 */
        resultTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type WalletLog = {
        /** 表类型: string, 注释: 记录ID */
        id?: string;
        /** 表类型: string, 注释: 类名 */
        className?: string;
        /** 表类型: string, 注释: 方法名 */
        methodName?: string;
        /** 表类型: string, 注释: 玩家ID */
        userToken?: string;
        /** 表类型: string, 注释: log信息 */
        logMessage?: string;
        /** 表类型: date, 注释: 记录时间 */
        resultTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type WorldBossBase = {
        /** 表类型: string, 注释: 活动编号 */
        id?: string;
        /** 表类型: string, 注释: 世界boss活动id */
        integralID?: string;
        /** 表类型: strings, 注释: 排名奖励（EventRankingAwardBase中的id） */
        numReward?: List<string>;
        /** 表类型: string, 注释: 排序方式（关联RankingBase表） */
        rankingMode?: string;
        /** 表类型: ulong, 注释: 邮件发送间隔时间 */
        mailInterval?: number;
        /** 表类型: int, 注释: 单次邮件发送数量 */
        singleMailCount?: number;
        /** 表类型: bool, 注释: 是否阵营奖励 */
        whetherCampReward?: boolean;
        /** 表类型: strings, 注释: 阵营奖励 */
        campReward?: List<string>;
        /** 表类型: ulong, 注释: 阵营奖励分数限制 */
        campRewardLimit?: number;
        /** 表类型: int, 注释: 每日挑战次数 */
        dailyTime?: number;
        /** 表类型: string, 注释: boss战id */
        armyBaseid?: string;
        /** 表类型: string, 注释: 刷新时间 */
        timeRefresh?: string;
        /** 表类型: strings, 注释: 挑战消耗 */
        worldBossConsume?: List<string>;
        /** 表类型: string, 注释: 不可战斗状态模型 */
        unBattleModel?: string;
        /** 表类型: bool, 注释: 不可战斗需要底座 */
        unBattleNeedBase?: boolean;
        /** 表类型: string, 注释: 战斗中状态模型 */
        battleModel?: string;
        /** 表类型: bool, 注释: 战斗需要底座 */
        battleNeedBase?: boolean;
        /** 表类型: string, 注释: 结束后状态模型 */
        battledModel?: string;
        /** 表类型: bool, 注释: 结束需要底座 */
        battledNeedBase?: boolean;
        /** 表类型: string, 注释: 底座模型 */
        baseModel?: string;
        /** 表类型: string, 注释: 体积(x */
        volume?: string;
        /** 表类型: string, 注释: 领地中位置（X，Y) */
        areaLoc?: string;
        /** 表类型: string, 注释: boss显示条件 */
        shouwLimit?: string;
        /** 表类型: string, 注释: 下一个boss的id */
        nextBossId?: string;
        /** 表类型: string, 注释: 点击boss弹窗文字 */
        clickText?: string;
        /** 表类型: ints, 注释: 狂暴追加攻击力（第一天增加|第二天增加。。。。|后续重复增加） */
        furiousAttack?: List<number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ItemBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 引用id */
        quoteuId?: string;
        /** 表类型: string, 注释: 祭坛效果名称 */
        itemName?: string;
        /** 表类型: string, 注释: 描述 */
        depict?: string;
        /** 表类型: string, 注释: 阵营1图标 */
        icon?: string;
        /** 表类型: string, 注释: 阵营2图标 */
        camp2icon?: string;
        /** 表类型: string, 注释: 阵营3图标 */
        camp3icon?: string;
        /** 表类型: string, 注释: 模型 */
        model?: string;
        /** 表类型: string, 注释: 暗影模型 */
        camp2model?: string;
        /** 表类型: string, 注释: 自然模型 */
        camp3model?: string;
        /** 表类型: string, 注释: 特效 */
        effect?: string;
        /** 表类型: string, 注释: 暗影特效 */
        camp2effect?: string;
        /** 表类型: string, 注释: 自然特效 */
        camp3effect?: string;
        /** 表类型: int, 注释: 页签类型 */
        tagType?: number;
        /** 表类型: int, 注释: 道具品类 */
        itemClass?: number;
        /** 表类型: int, 注释: 戒指类型
7000勇气之戒
7001力量之戒
7002智慧之戒
7003正义之戒
7004幸运之戒 */
        itemType?: number;
        /** 表类型: int, 注释: 品质 */
        quality?: number;
        /** 表类型: ulong, 注释: 最大数量 */
        maxNum?: number;
        /** 表类型: int, 注释: 使用类型
1.直接单个使用
2.批量使用 */
        useType?: number;
        /** 表类型: data_TreasureBase, 注释: 宝箱获得奖励 */
        treasureReward?: TreasureBase;
        /** 表类型: string, 注释:   */
        useLimit?: string;
        /** 表类型: string, 注释: buff效果对象 */
        useEffect?: string;
        /** 表类型: string, 注释: 跳转 */
        jump?: string;
        /** 表类型: string, 注释: 去使用（引导） */
        utilize?: string;
        /** 表类型: data_PortfolioBase, 注释: 合成获取 */
        portfolio?: PortfolioBase;
        /** 表类型: int, 注释: 生产道具类型类型（填物品id）

2.金币
3.木头
4.食物
5.矿石 */
        currencytype?: number;
        /** 表类型: int, 注释: 装备类型
1：头盔
2：盔甲 */
        equipType?: number;
        /** 表类型: intMap, 注释: buff效果 */
        status?: Dictionary<string, number>;
        /** 表类型: string, 注释: 附魔方案（对应EnchantingBase配置id） */
        enchantingId?: string;
        /** 表类型: string, 注释: 突破前置id */
        breakdownID?: string;
        /** 表类型: intMap, 注释: 升级提升属性 */
        statusUp?: Dictionary<string, number>;
        /** 表类型: uint, 注释: 戒指等级 */
        lv?: number;
        /** 表类型: int, 注释: 稀有度 */
        rera?: number;
        /** 表类型: intMap, 注释: 出售价格 */
        sale?: Dictionary<string, number>;
        /** 表类型: intMap, 注释: 购买价格 */
        buy?: Dictionary<string, number>;
        /** 表类型: string, 注释: 拆除建筑获得物品数量[道具id，数量] */
        fixdecompose?: string;
        /** 表类型: string, 注释: 拆除建筑获得物品数量[道具id，数量区间最小值:数量区间最大值] */
        randomdecompose?: string;
        /** 表类型: bool, 注释: 是否立即使用 */
        imUse?: boolean;
        /** 表类型: string, 注释: 建造速度 */
        productionTime?: string;
        /** 表类型: string, 注释: 消耗 */
        itemCost?: string;
        /** 表类型: string, 注释: 体积(x */
        volume?: string;
        /** 表类型: string, 注释: 归属背包 */
        bagMove?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ErrorInfo = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 错误消息 */
        message?: string;
        /** 表类型: string, 注释: 异常类型 */
        errorType?: string;
        /** 表类型: string, 注释: 创建时间 */
        time?: string;
        /** 表类型: string, 注释: 机型 */
        modelType?: string;
        /** 表类型: string, 注释: IP地址 */
        ip?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type Formulas = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 备注 */
        depict?: string;
        /** 表类型: string, 注释: 公式 */
        formulas?: string;
        /** 表类型: float, 注释: 浮动范围（填0.1代表 ±0.1 即为 0.9~1.1） */
        randomRange?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TimeEvent = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 任务名称 */
        eventName?: string;
        /** 表类型: ulong, 注释: 任务实际开始时间 */
        taskstartTime?: number;
        /** 表类型: ulong, 注释: 任务结束时间 */
        taskEndTime?: number;
        /** 表类型: ulong, 注释: 上次开始时间 */
        lastStartTime?: number;
        /** 表类型: ulong, 注释: 上次结束时间 */
        lastEndTime?: number;
        /** 表类型: int, 注释: 默认时间是0也就是utc时间 */
        serverTimeZone?: number;
        /** 表类型: int, 注释: 重复循环次数，0就是无限次循环 */
        LoopCount?: number;
        /** 表类型: int, 注释: 已经重复的次数 */
        LoopTimers?: number;
        /** 表类型: bool, 注释: 第一次是否有cd */
        isFristNoCD?: boolean;
        /** 表类型: ulong, 注释: 任务间隔执行时间 */
        taskLoopTime?: number;
        /** 表类型: byte, 注释: 循环类型
1.日循环
2.周循环
3.月循环 */
        timeType?: number;
        /** 表类型: ulong, 注释: 每天任务开始的时间，和loopTime共同执行 */
        startTime?: number;
        /** 表类型: ulong, 注释: 每天任务开始的时间的结束时间 */
        startLimitTime?: number;
        /** 表类型: string, 注释: 前置任务id，可以组成任务集合 */
        predecessorTaskID?: string;
        /** 表类型: string, 注释: 任务的回调事件名字 */
        taskEventString?: string;
        /** 表类型: string, 注释: 任务执行日志列表 */
        taskEventLog?: string;
        /** 表类型: int, 注释: 任务目前状态，0等待执行，1正在执行，2执行错误，3执行成功 */
        taskState?: number;
        /** 表类型: int, 注释: 任务之前的执行状态，1正在执行，2执行错误，3执行成功，注意写任务的一定要注意可能服务器被中断的情况 */
        taskPreviousState?: number;
    }
}