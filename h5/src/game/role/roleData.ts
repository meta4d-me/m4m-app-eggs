//角色 数据
export class roleData
{            
    private static _list : roleData[] = [];
    static get list(){return this._list;}

    name : string = "_name";
    iconUrl : string = "";
    ranking :number = 0 ;
    scoreNum : number  = 0;
    
}