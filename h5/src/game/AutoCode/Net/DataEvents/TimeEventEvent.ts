export class TimeEventEvent{
    /** 初始化全部数据*/
    public static All = "All";
    /** 批量加载数据*/
    public static ChangeList = "ChangeList";
    /** 提示数据*/
    public static TipData = "TipData";
    /** 配置ID*/
    public static id = "id";
    /** 任务名称*/
    public static eventName = "eventName";
    /** 任务实际开始时间*/
    public static taskstartTime = "taskstartTime";
    /** 任务结束时间*/
    public static taskEndTime = "taskEndTime";
    /** 上次开始时间*/
    public static lastStartTime = "lastStartTime";
    /** 上次结束时间*/
    public static lastEndTime = "lastEndTime";
    /** 默认时间是0也就是utc时间*/
    public static serverTimeZone = "serverTimeZone";
    /** 重复循环次数，0就是无限次循环*/
    public static LoopCount = "LoopCount";
    /** 已经重复的次数*/
    public static LoopTimers = "LoopTimers";
    /** 第一次是否有cd*/
    public static isFristNoCD = "isFristNoCD";
    /** 任务间隔执行时间*/
    public static taskLoopTime = "taskLoopTime";
    /** 循环类型
1.日循环
2.周循环
3.月循环*/
    public static timeType = "timeType";
    /** 每天任务开始的时间，和loopTime共同执行*/
    public static startTime = "startTime";
    /** 每天任务开始的时间的结束时间*/
    public static startLimitTime = "startLimitTime";
    /** 前置任务id，可以组成任务集合*/
    public static predecessorTaskID = "predecessorTaskID";
    /** 任务的回调事件名字*/
    public static taskEventString = "taskEventString";
    /** 任务执行日志列表*/
    public static taskEventLog = "taskEventLog";
    /** 任务目前状态，0等待执行，1正在执行，2执行错误，3执行成功*/
    public static taskState = "taskState";
    /** 任务之前的执行状态，1正在执行，2执行错误，3执行成功，注意写任务的一定要注意可能服务器被中断的情况*/
    public static taskPreviousState = "taskPreviousState";
}