import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class ItemUseManagerRequest {
    public static get Instance(): ItemUseManagerRequest {
        if (this._instance == null) {
            this._instance = new ItemUseManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ItemUseManagerRequest;


    /***
     * 往指定包裹创建一组道具 currItemObj:用于兑换的道具数组 currBagType:兑换包裹 targetItemObj：兑换的道具ID数组 IsDisplay:是否显示奖励弹窗, bagType:指定包裹  forceTime:生效时间 
     */
    public creatNewItemsArrToBag(itemInfo, buyCurrency, IsDisplay, bagType, fromWhere, forceTime) {
        let paramJsons =`"a0":${JSON.stringify(itemInfo)},"a1":${JSON.stringify(buyCurrency)},"a2":${JSON.stringify(IsDisplay)},"a3":${JSON.stringify(bagType)},"a4":${JSON.stringify(fromWhere)},"a5":${JSON.stringify(forceTime)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","creatNewItemsArrToBag",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 兑换道具 currItemObj:用于兑换的道具数组 currBagType:兑换包裹 targetItemObj：兑换的道具ID数组  targetBagType:目标包裹 IsDisplay:是否显示奖励弹窗 格式类型为 ItemExchangeMessageObj  ItemExchangeTargetMessageObj
     */
    public exchange(currItemObj, currBagType, targetItemObj, targetBagType, IsDisplay) {
        let paramJsons =`"a0":${JSON.stringify(currItemObj)},"a1":${JSON.stringify(currBagType)},"a2":${JSON.stringify(targetItemObj)},"a3":${JSON.stringify(targetBagType)},"a4":${JSON.stringify(IsDisplay)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","exchange",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 移除道具 itemsIds:道具uuid列表  itemId:道具baseid  count：数量  useType:通过什么方式消耗  bagType:包裹
     */
    public removeItemStatic(itemsIds, itemId, count, useType, bagType) {
        let paramJsons =`"a0":${JSON.stringify(itemsIds)},"a1":${JSON.stringify(itemId)},"a2":${JSON.stringify(count)},"a3":${JSON.stringify(useType)},"a4":${JSON.stringify(bagType)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","removeItemStatic",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一个道具 id：道具唯一id  ,IsReturn:是否返回数据
     */
    public DelItemdataByBag(id, IsReturn, bagType) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(IsReturn)},"a2":${JSON.stringify(bagType)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","DelItemdataByBag",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建新道具 itemId:道具id userId：玩家uid uint：数量，buyCurrency：买卖价格， IsDisplay:是否显示奖励弹窗, fromWhere:途径
     */
    public AddcreatNewItem(itemId, userId, count, buyCurrency, IsDisplay, fromWhere) {
        let paramJsons =`"a0":${JSON.stringify(itemId)},"a1":${JSON.stringify(userId)},"a2":${JSON.stringify(count)},"a3":${JSON.stringify(buyCurrency)},"a4":${JSON.stringify(IsDisplay)},"a5":${JSON.stringify(fromWhere)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","AddcreatNewItem",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建新道具到指定包裹 itemId:道具id userId：玩家uid uint：数量，buyCurrency：买卖价格， IsDisplay:是否显示奖励弹窗,bagType:包裹（1：装备 2：普通包裹 3：邮件 4建筑） fromWhere:途径
     */
    public AddcreatNewItemToBag(itemId, userId, count, buyCurrency, IsDisplay, bagType, fromWhere) {
        let paramJsons =`"a0":${JSON.stringify(itemId)},"a1":${JSON.stringify(userId)},"a2":${JSON.stringify(count)},"a3":${JSON.stringify(buyCurrency)},"a4":${JSON.stringify(IsDisplay)},"a5":${JSON.stringify(bagType)},"a6":${JSON.stringify(fromWhere)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","AddcreatNewItemToBag",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改道具数量 itemId:道具唯一id count：数量 , ClientData data:
     */
    public SetchangeItemNum(itemDataId, count) {
        let paramJsons =`"a0":${JSON.stringify(itemDataId)},"a1":${JSON.stringify(count)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","SetchangeItemNum",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改角色身上的道具items和itemData的数据 不返回数据  itemDataId:道具的唯一ID，count：数量
     */
    public SetRoleItemsDataNum(itemDataId, count) {
        let paramJsons =`"a0":${JSON.stringify(itemDataId)},"a1":${JSON.stringify(count)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","SetRoleItemsDataNum",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ItemData 数据 id：道具唯一id  ,IsReturn:是否返回数据
     */
    public DelItemdata(id, IsReturn) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(IsReturn)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","DelItemdata",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 英雄道具碎片转化 RoleBaseId: token:玩家token
     */
    public AddItemListsData(RoleBaseId, token) {
        let paramJsons =`"a0":${JSON.stringify(RoleBaseId)},"a1":${JSON.stringify(token)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","AddItemListsData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 宝箱道具处理 itemdataId:道具唯一id RoleBaseId:道具id，token:玩家token, count:数量
     */
    public AddBoxBagListData(itemdataId, itemboxId, token, count) {
        let paramJsons =`"a0":${JSON.stringify(itemdataId)},"a1":${JSON.stringify(itemboxId)},"a2":${JSON.stringify(token)},"a3":${JSON.stringify(count)},`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","AddBoxBagListData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 领取奖励把邮件中的道具放入背包 List<string>itemuuIds:道具唯一id数组 to:玩家token
     */
    public SetEmailToBag(itemuuIds, token) {
        let paramJsons =`"a0":${JSON.stringify(itemuuIds)},"a1":${JSON.stringify(token)}`;
        let mess = WebsocketTool.Instance.getMsg("ItemUseManager","SetEmailToBag",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}