/**链表节点接口*/
export interface ILNode<T> {
    element: T;
    next: ILNode<T>;
}
/**
 * 链表节点类
 */
export class LNode<T> implements ILNode<T>{
    element: T;
    next: LNode<T>;
    constructor(element:T) {
        this.element = element;
        this.next = null;
    }
}

/**
 * 单链表:一些列由指针链接的元素节点组成的存储结构
 */
export class LinkedList<T>{
    private length = 0;
    private _head:LNode<T> = null;

    /**
     * 向列表尾部添加一个新的节点元素。
     * @param element 指定节点元素
     */
    append(element: T) {
        var node = new LNode<T>(element);
        var current;

        if (this._head === null) {
            this._head = node;
        } else {
            current = this._head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }
    /**
     * 向列表的特定位置插入一个新的节点元素。
     * @param position  指定位置
     * @param element  指定节点元素
     */
    insert(position: number, element: T) {
        if (position >= 0 && position <= this.length) {
            var node = new LNode<T>(element),
                current = this._head,
                previous,
                index = 0;
            if (position === 0) {
                node.next = current;
                this._head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;
            return true;
        } else {
            return false;
        }
    }
    /**
     * 从列表中移除指定节点元素。
     * @param element  指定节点元素
     */
    remove(element: T) {
        var index = this.indexOf(element);
        return this.removeAt(index);
    }
    /**
     * 返回元素在列表中的索引。如果列表中没有该元素则返回-1。
     * @param element  指定节点元素
     */
    indexOf(element: T) {
        var current = this._head,
            index = 0;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }
    /**
     * 从列表的特定位置移除一节点元素
     * @param position  指定节点元素
     */
    removeAt(position: number) {
        if (position > -1 && position < this.length) {
            var current = this._head;
            var previous;
            var index = 0;
            if (position === 0) {
                this._head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        } else {
            return null;
        }
    }
    /**是否为空*/
    get isEmpty() {
        return this.length === 0;
    }
    /**返回链表包含的元素个数*/
    get size() {
        return this.length;
    }
    /**链表的第一个节点元素*/
    get head() {
        return this._head;
    }
    /**所有元素值输出为字符串*/
    toString() {
        var current = this._head,
            str = "";
        while (current) {
            str += String(current.element);
            current = current.next;
        }
        return str;
    }

}