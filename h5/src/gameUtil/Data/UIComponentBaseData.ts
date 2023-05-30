//方向类型
export enum DirectionType {
    Vertical,//竖直
    Horizontal,//水平
    UP,//向上
    DOWN,//向下
}

export abstract class UIComponentBaseData {
    public index: number = 0;
    public width: number = 0;
    public height: number = 0;

    public abstract Clone();
}