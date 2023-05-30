/****************************************************************************** 
    rtree.js - General-Purpose Non-Recursive Javascript R-Tree Library
    Version 0.6.2, December 5st 2009

  Copyright (c) 2009 Jon-Carlos Rivera
  
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    Jon-Carlos Rivera - imbcmdth@hotmail.com
******************************************************************************/
type Rect = {x: number, y: number, w: number, h: number};
/* Rectangle - Generic rectangle object - Not yet used */
class Rectangle {
    get x1() { return this._x; }
    get x() { return this._x; }
    get y() { return this._y; }
    get y1() { return this._y; }
    get x2() { return this._x2; }
    get y2() { return this._y2; }
    get w() { return this._w; }
    get h() { return this._h; }

    /* returns true if rectangle 1 overlaps rectangle 2
    * [ boolean ] = overlap_rectangle(rectangle a, rectangle b)
    * @static function
    */
    public static overlap_rectangle(a, b) {
        return (a.x < (b.x + b.w) && (a.x + a.w) > b.x && a.y < (b.y + b.h) && (a.y + a.h) > b.y);
    }

    /* returns true if rectangle a is contained in rectangle b
    * [ boolean ] = contains_rectangle(rectangle a, rectangle b)
    * @static function
    */
    public static contains_rectangle(a, b) {
        return ((a.x + a.w) <= (b.x + b.w) && a.x >= b.x && (a.y + a.h) <= (b.y + b.h) && a.y >= b.y);
    }

    /* expands rectangle A to include rectangle B, rectangle B is untouched
    * [ rectangle a ] = expand_rectangle(rectangle a, rectangle b)
    * @static function
    */
    public static expand_rectangle(a, b) {
        let nx = Math.min(a.x, b.x);
        let ny = Math.min(a.y, b.y);
        a.w = Math.max(a.x + a.w, b.x + b.w) - nx;
        a.h = Math.max(a.y + a.h, b.y + b.h) - ny;
        a.x = nx; a.y = ny;
        return (a);
    }

    /* generates a minimally bounding rectangle for all rectangles in
    * array "nodes". If rect is set, it is modified into the MBR. Otherwise,
    * a new rectangle is generated and returned.
    * [ rectangle a ] = make_MBR(rectangle array nodes, rectangle rect)
    * @static function
    */
    public static make_MBR(nodes, _rect) {
        if (nodes.length < 1) {
            return ({ x: 0, y: 0, w: 0, h: 0 });
        }
        let rect = _rect;
        //throw "make_MBR: nodes must contain at least one rectangle!";
        if (!rect) {
            rect = { x: nodes[0].x, y: nodes[0].y, w: nodes[0].w, h: nodes[0].h };
        } else {
            rect.x = nodes[0].x;
        }
        rect.y = nodes[0].y; rect.w = nodes[0].w; rect.h = nodes[0].h;

        for (let i = nodes.length - 1; i > 0; i--) {
            this.expand_rectangle(rect, nodes[i]);
        }

        return (rect);
    }

    public static squarified_ratio(l, w, fill) {
        // Area of new enlarged rectangle
        let lperi = (l + w) / 2; // Average size of a side of the new rectangle
        let larea = l * w; // Area of new rectangle
        // return the ratio of the perimeter to the area - the closer to 1 we are, 
        // the more "square" a rectangle is. conversly, when approaching zero the 
        // more elongated a rectangle is
        let lgeo = larea / (lperi * lperi);
        return (larea * fill / lgeo);
    }
    constructor(ix, iy, iw, ih) { // new Rectangle(bounds) or new Rectangle(x, y, w, h)
        if (ix.x) {
            this._x = ix.x;
            this._y = ix.y;
            if (ix.w !== 0 && !ix.w && ix.x2) {
                this._w = ix.x2 - ix.x;
                this._h = ix.y2 - ix.y;
            } else {
                this._w = ix.w;
                this._h = ix.h;
            }
            this._x2 = this._x + this._w;
            this._y2 = this._y + this._h; // For extra fastitude
        } else {
            this._x = ix;
            this._y = iy;
            this._w = iw;
            this._h = ih;
            this._x2 = this._x + this._w;
            this._y2 = this._y + this._h; // For extra fastitude
        }
    }
    private _x: number;
    private _x2: number;
    private _y: number;
    private _y2: number;
    private _w: number;
    private _h: number;

    public toJSON() {
        // tslint:disable-next-line: max-line-length
        return ("{\"x\":" + this._x.toString() + ", \"y\":" + this._y.toString() + ", \"w\":" + this._w.toString() + ", \"h\":" + this._h.toString() + "}");
    }
    public overlap(a) {
        return (this.x < a.x2 && this.x2 > a.x && this.y < a.y2 && this.y2 > a.y);
    }
    public expand(a) {
        let nx = Math.min(this.x, a.x);
        let ny = Math.min(this.y, a.y);
        this._w = Math.max(this.x2, a.x2) - nx;
        this._h = Math.max(this.y2, a.y2) - ny;
        this._x = nx;
        this._y = ny;
        return this;
    }
    public setRect(ix, iy, iw, ih) {
        if (ix.x) {
            this._x = ix.x;
            this._y = ix.y;
            if (ix.w !== 0 && !ix.w && ix.x2) {
                this._w = ix.x2 - ix.x;
                this._h = ix.y2 - ix.y;
            } else {
                this._w = ix.w;
                this._h = ix.h;
            }
            this._x2 = this._x + this._w;
            this._y2 = this._y + this._h; // For extra fastitude
        } else {
            this._x = ix;
            this._y = iy;
            this._w = iw;
            this._h = ih;
            this._x2 = this._x + this._w;
            this._y2 = this._y + this._h; // For extra fastitude
        }
    }
}

/**
 * RTree - A simple r-tree structure for great results.
 * @constructor
 */
export class RTree {

    constructor(width) {
        if (!isNaN(width)) {
            this._MinWidth = Math.floor(width / 2);
            this._MaxWidth = width;
        }
    }
    // Variables to control tree-dimensions
    private _MinWidth = 3;  // Minimum width of any node before a merge
    private _MaxWidth = 6;  // Maximum width of any node before a split
    private _T = { x: 0, y: 0, w: 0, h: 0, id: "root", nodes: [] }; // Start with an empty root-tree

    // hide our idCache inside this closure
    private idCache = {};

    private hitStack = [];
    private hsBuoy = 0;

    /* quick 'n' dirty function for plugins or manually drawing the tree
     * [ tree ] = RTree.get_tree(): returns the raw tree data. useful for adding
     * @public
     * !! DEPRECATED !!
     */
    public get_tree() {
        return this._T;
    }
    /* quick 'n' dirty function for plugins or manually loading the tree
     * [ tree ] = RTree.set_tree(sub-tree, where to attach): returns the raw tree data. useful for adding
     * @public
     * !! DEPRECATED !!
     */
    public set_tree(newTree, _where) {
        let where = _where;
        if (!where) {
            where = this._T;
        }
        return this._attach_data(where, newTree);
    }
    /* non-recursive search function 
     * [ nodes | objects ] = RTree.search(rectangle, [return node data], [array to fill])
     * @public
     */
    public search(rect: Rect, returnNode: boolean, returnArray: any[]) {
        if (arguments.length < 1) {
            throw new Error("Wrong number of arguments. RT.Search requires at least a bounding rectangle.");
        }

        switch (arguments.length) {
            case 1:
                arguments[1] = false;// Add an "return node" flag - may be removed in future
            // tslint:disable-next-line: no-switch-case-fall-through
            case 2:
                arguments[2] = []; // Add an empty array to contain results
            // tslint:disable-next-line: no-switch-case-fall-through
            case 3:
                arguments[3] = this._T; // Add root node to end of argument list
            // tslint:disable-next-line: no-switch-case-fall-through
            default:
                arguments.length = 4;
        }
        return (this._search_subtree.apply(this, arguments));
    }
    /**
     * 拓展搜索方法 （返回 索引列表长度）
     * @param rect 搜索矩形范围
     * @param out 返回的索引列表
     */
    public searchExtend(rect: Rect, out: any[]) {
        return this._search_subtreeExtend(rect, out, this._T);
    }

    /* partially-recursive toJSON function
     * [ string ] = RTree.toJSON([rectangle], [tree])
     * @public
     */
    public toJSON(rect, tree) {
        let hitStack = []; // Contains the elements that overlap
        let countStack = []; // Contains the elements that overlap
        let returnStack: any = {}; // Contains the elements that overlap
        let maxDepth = 3;  // This triggers recursion and tree-splitting
        let currentDepth = 1;
        let returnString = "";

        if (rect && !Rectangle.overlap_rectangle(rect, this._T)) {
            return "";
        }

        if (!tree) {
            countStack.push(this._T.nodes.length);
            hitStack.push(this._T.nodes);
            // tslint:disable-next-line: max-line-length
            returnString += "var main_tree = {x:" + this._T.x.toFixed() + ",y:" + this._T.y.toFixed() + ",w:" + this._T.w.toFixed() + ",h:" + this._T.h.toFixed() + ",nodes:[";
        } else {
            maxDepth += 4;
            countStack.push(tree.nodes.length);
            hitStack.push(tree.nodes);
            // tslint:disable-next-line: max-line-length
            returnString += "var main_tree = {x:" + tree.x.toFixed() + ",y:" + tree.y.toFixed() + ",w:" + tree.w.toFixed() + ",h:" + tree.h.toFixed() + ",nodes:[";
        }

        do {
            let nodes = hitStack.pop();
            let i = countStack.pop() - 1;

            if (i >= 0 && i < nodes.length - 1) {
                returnString += ",";
            }

            while (i >= 0) {
                let ltree = nodes[i];
                if (!rect || Rectangle.overlap_rectangle(rect, ltree)) {
                    if (ltree.nodes) { // Not a Leaf
                        if (currentDepth >= maxDepth) {
                            let len = returnStack.length;
                            let nam = this._name_to_id("saved_subtree");
                            // tslint:disable-next-line: max-line-length
                            returnString += "{x:" + ltree.x.toFixed() + ",y:" + ltree.y.toFixed() + ",w:" + ltree.w.toFixed() + ",h:" + ltree.h.toFixed() + ",load:'" + nam + ".js'}";
                            returnStack[nam] = this.toJSON(rect, ltree);
                            if (i > 0) {
                                returnString += ",";
                            }
                        } else {
                            // tslint:disable-next-line: max-line-length
                            returnString += "{x:" + ltree.x.toFixed() + ",y:" + ltree.y.toFixed() + ",w:" + ltree.w.toFixed() + ",h:" + ltree.h.toFixed() + ",nodes:[";
                            currentDepth += 1;
                            countStack.push(i);
                            hitStack.push(nodes);
                            nodes = ltree.nodes;
                            i = ltree.nodes.length;
                        }
                    } else if (ltree.leaf) { // A Leaf !!
                        let data = ltree.leaf.toJSON ? ltree.leaf.toJSON() : JSON.stringify(ltree.leaf);
                        // tslint:disable-next-line: max-line-length
                        returnString += "{x:" + ltree.x.toFixed() + ",y:" + ltree.y.toFixed() + ",w:" + ltree.w.toFixed() + ",h:" + ltree.h.toFixed() + ",leaf:" + data + "}";
                        if (i > 0) {
                            returnString += ",";
                        }
                    } else if (ltree.load) { // A load
                        // tslint:disable-next-line: max-line-length
                        returnString += "{x:" + ltree.x.toFixed() + ",y:" + ltree.y.toFixed() + ",w:" + ltree.w.toFixed() + ",h:" + ltree.h.toFixed() + ",load:'" + ltree.load + "'}";
                        if (i > 0) {
                            returnString += ",";
                        }
                    }
                }
                i -= 1;
            }
            if (i < 0) {
                returnString += "]}"; currentDepth -= 1;
            }
        } while (hitStack.length > 0);

        returnString += ";";

        for (let myKey in returnStack) {
            returnString += "\nvar " + myKey + " = function(){" + returnStack[myKey] + " return(main_tree);};";
        }
        return (returnString);
    }
    /* non-recursive function that deletes a specific
     * [ number ] = RTree.remove(rectangle, obj)
     */
    public remove(rect, obj) {
        if (arguments.length < 1) {
            throw new Error("Wrong number of arguments. RT.remove requires at least a bounding rectangle.");
        }

        switch (arguments.length) {
            case 1:
                arguments[1] = false; // obj == false for conditionals
            // tslint:disable-next-line: no-switch-case-fall-through
            case 2:
                arguments[2] = this._T; // Add root node to end of argument list
            // tslint:disable-next-line: no-switch-case-fall-through
            default:
                arguments.length = 3;
        }
        if (arguments[1] === false) { // Do area-wide delete
            let numberdeleted = 0;
            let retArray = [];
            do {
                numberdeleted = retArray.length;
                retArray = retArray.concat(this._removeSubtree.apply(this, arguments));
            } while (numberdeleted != retArray.length);
            return retArray;
        }
        return (this._removeSubtree.apply(this, arguments));
    }
    /* non-recursive insert function
     * [] = RTree.insert(rectangle, object to insert)
     */
    public insert(rect : Rect, obj) {
        if (arguments.length < 2) {
            throw new Error("Wrong number of arguments. RT.Insert requires at least a bounding rectangle and an object.");
        }

        return (this._insert_subtree({ x: rect.x, y: rect.y, w: rect.w, h: rect.h, leaf: obj }, this._T));
    }
    private isArray(o) {
        return Object.prototype.toString.call(o) === "[object Array]";
    }
    /* @function
     * @description Function to generate unique strings for element IDs
     * @param {String} n			The prefix to use for the IDs generated.
     * @return {String}				A guarenteed unique ID.
     */
    private _name_to_id(idPrefix) {
        // return the api: our function that returns a unique string with incrementing number appended to given idPrefix
        let idVal = 0;
        if (idPrefix in this.idCache) {
            idVal = this.idCache[idPrefix]++;
        } else {
            this.idCache[idPrefix] = 0;
        }
        return idPrefix + "_" + idVal;
    }

    /* find the best specific node(s) for object to be deleted from
     * [ leaf node parent ] = _remove_subtree(rectangle, object, root)
     * @private
     */
    // tslint:disable-next-line: cyclomatic-complexity
    private _removeSubtree(rect, obj, root) {
        let hitStack = []; // Contains the elements that overlap
        let countStack = []; // Contains the elements that overlap
        let retArray = [];
        let currentDepth = 1;

        if (!rect || !Rectangle.overlap_rectangle(rect, root)) {
            return retArray;
        }

        let retObj;
        retObj = { x: rect.x, y: rect.y, w: rect.w, h: rect.h, target: obj };

        countStack.push(root.nodes.length);
        hitStack.push(root);

        do {
            let tree = hitStack.pop();
            let i = countStack.pop() - 1;

            if ("target" in retObj) { // We are searching for a target
                while (i >= 0) {
                    let ltree = tree.nodes[i];
                    if (Rectangle.overlap_rectangle(retObj, ltree)) {
                        if ((retObj.target && "leaf" in ltree && ltree.leaf === retObj.target)
                            || (!retObj.target && ("leaf" in ltree || Rectangle.contains_rectangle(ltree, retObj)))) { // A Match !!
                            // Yup we found a match...
                            // we can cancel search and start walking up the list
                            if ("nodes" in ltree) {// If we are deleting a node not a leaf...
                                retArray = this._search_subtree(ltree, true, [], ltree);
                                tree.nodes.splice(i, 1);
                            } else {
                                retArray = tree.nodes.splice(i, 1);
                            }
                            // Resize MBR down...
                            Rectangle.make_MBR(tree.nodes, tree);
                            delete retObj.target;
                            if (tree.nodes.length < this._MinWidth) { // Underflow
                                retObj.nodes = this._search_subtree(tree, true, [], tree);
                            }
                            break;
                        } else if ("nodes" in ltree) { // Not a Leaf
                            currentDepth += 1;
                            countStack.push(i);
                            hitStack.push(tree);
                            tree = ltree;
                            i = ltree.nodes.length;
                        }
                    }
                    i -= 1;
                }
            } else if ("nodes" in retObj) { // We are unsplitting
                tree.nodes.splice(i + 1, 1); // Remove unsplit node
                // ret_obj.nodes contains a list of elements removed from the tree so far
                if (tree.nodes.length > 0) {
                    Rectangle.make_MBR(tree.nodes, tree);
                }
                for (let t = 0; t < retObj.nodes.length; t++) {
                    this._insert_subtree(retObj.nodes[t], tree);
                }
                retObj.nodes.length = 0;
                if (hitStack.length == 0 && tree.nodes.length <= 1) { // Underflow..on root!
                    retObj.nodes = this._search_subtree(tree, true, retObj.nodes, tree);
                    tree.nodes.length = 0;
                    hitStack.push(tree);
                    countStack.push(1);
                } else if (hitStack.length > 0 && tree.nodes.length < this._MinWidth) { // Underflow..AGAIN!
                    retObj.nodes = this._search_subtree(tree, true, retObj.nodes, tree);
                    tree.nodes.length = 0;
                } else {
                    delete retObj.nodes; // Just start resizing
                }
            } else { // we are just resizing
                Rectangle.make_MBR(tree.nodes, tree);
            }
            currentDepth -= 1;
        } while (hitStack.length > 0);

        return (retArray);
    }
    /* choose the best damn node for rectangle to be inserted into
     * [ leaf node parent ] = _choose_leaf_subtree(rectangle, root to start search at)
     * @private
     */
    private _choose_leaf_subtree(rect, root) {
        let bestChoiceIndex = -1;
        let bestChoiceStack = [];
        let bestChoiceArea;

        let loadCallback = (localTree, localNode) => {
            return ((data) => {
                localTree._attach_data(localNode, data);
            });
        };

        bestChoiceStack.push(root);
        let nodes = root.nodes;

        do {
            if (bestChoiceIndex != -1) {
                bestChoiceStack.push(nodes[bestChoiceIndex]);
                nodes = nodes[bestChoiceIndex].nodes;
                bestChoiceIndex = -1;
            }

            for (let i = nodes.length - 1; i >= 0; i--) {
                let ltree = nodes[i];
                if ("leaf" in ltree) {
                    // Bail out of everything and start inserting
                    bestChoiceIndex = -1;
                    break;
                } /*else if(ltree.load) {
  				throw( "Can't insert into partially loaded tree ... yet!");
  				//jQuery.getJSON(ltree.load, load_callback(this, ltree));
  				//delete ltree.load;
  			}*/
                // Area of new enlarged rectangle
                let oldLratio = Rectangle.squarified_ratio(ltree.w, ltree.h, ltree.nodes.length + 1);

                // Enlarge rectangle to fit new rectangle
                let nw = Math.max(ltree.x + ltree.w, rect.x + rect.w) - Math.min(ltree.x, rect.x);
                let nh = Math.max(ltree.y + ltree.h, rect.y + rect.h) - Math.min(ltree.y, rect.y);

                // Area of new enlarged rectangle
                let lratio = Rectangle.squarified_ratio(nw, nh, ltree.nodes.length + 2);

                if (bestChoiceIndex < 0 || Math.abs(lratio - oldLratio) < bestChoiceArea) {
                    bestChoiceArea = Math.abs(lratio - oldLratio); bestChoiceIndex = i;
                }
            }
        } while (bestChoiceIndex != -1);

        return (bestChoiceStack);
    }
    /* split a set of nodes into two roughly equally-filled nodes
     * [ an array of two new arrays of nodes ] = linear_split(array of nodes)
     * @private
     */
    private _linear_split(nodes) {
        let n = this._pick_linear(nodes);
        while (nodes.length > 0) {
            this._pick_next(nodes, n[0], n[1]);
        }
        return (n);
    }
    /* insert the best source rectangle into the best fitting parent node: a or b
     * [] = pick_next(array of source nodes, target node array a, target node array b)
     * @private
     */
    private _pick_next(nodes, a, b) {
        // Area of new enlarged rectangle
        let areaA = Rectangle.squarified_ratio(a.w, a.h, a.nodes.length + 1);
        let areaB = Rectangle.squarified_ratio(b.w, b.h, b.nodes.length + 1);
        let highAreaDelta;
        let highAreaNode;
        let lowestGrowthGroup;

        for (let i = nodes.length - 1; i >= 0; i--) {
            let l = nodes[i];
            let newAreaA;
            newAreaA = {};
            newAreaA.x = Math.min(a.x, l.x); newAreaA.y = Math.min(a.y, l.y);
            newAreaA.w = Math.max(a.x + a.w, l.x + l.w) - newAreaA.x; newAreaA.h = Math.max(a.y + a.h, l.y + l.h) - newAreaA.y;
            let changeNewAreaA = Math.abs(Rectangle.squarified_ratio(newAreaA.w, newAreaA.h, a.nodes.length + 2) - areaA);

            let newAreaB;
            newAreaB = {};
            newAreaB.x = Math.min(b.x, l.x); newAreaB.y = Math.min(b.y, l.y);
            newAreaB.w = Math.max(b.x + b.w, l.x + l.w) - newAreaB.x; newAreaB.h = Math.max(b.y + b.h, l.y + l.h) - newAreaB.y;
            let changeNewAreaB = Math.abs(Rectangle.squarified_ratio(newAreaB.w, newAreaB.h, b.nodes.length + 2) - areaB);

            if (!highAreaNode || !highAreaDelta || Math.abs(changeNewAreaB - changeNewAreaA) < highAreaDelta) {
                highAreaNode = i;
                highAreaDelta = Math.abs(changeNewAreaB - changeNewAreaA);
                lowestGrowthGroup = changeNewAreaB < changeNewAreaA ? b : a;
            }
        }
        let tempNode = nodes.splice(highAreaNode, 1)[0];
        if (a.nodes.length + nodes.length + 1 <= this._MinWidth) {
            a.nodes.push(tempNode);
            Rectangle.expand_rectangle(a, tempNode);
        } else if (b.nodes.length + nodes.length + 1 <= this._MinWidth) {
            b.nodes.push(tempNode);
            Rectangle.expand_rectangle(b, tempNode);
        } else {
            lowestGrowthGroup.nodes.push(tempNode);
            Rectangle.expand_rectangle(lowestGrowthGroup, tempNode);
        }
    }
    /* pick the "best" two starter nodes to use as seeds using the "linear" criteria
     * [ an array of two new arrays of nodes ] = pick_linear(array of source nodes)
     * @private
     */
    private _pick_linear(nodes) {
        let lowestHighX = nodes.length - 1;
        let highestLowX = 0;
        let lowestHighY = nodes.length - 1;
        let highestLowY = 0;
        let t1;
        let t2;

        for (let i = nodes.length - 2; i >= 0; i--) {
            let l = nodes[i];
            // tslint:disable-next-line: max-line-length
            if (l.x > nodes[highestLowX].x) { highestLowX = i; } else if (l.x + l.w < nodes[lowestHighX].x + nodes[lowestHighX].w) { lowestHighX = i; }
            // tslint:disable-next-line: max-line-length
            if (l.y > nodes[highestLowY].y) { highestLowY = i; } else if (l.y + l.h < nodes[lowestHighY].y + nodes[lowestHighY].h) { lowestHighY = i; }
        }
        let dx = Math.abs((nodes[lowestHighX].x + nodes[lowestHighX].w) - nodes[highestLowX].x);
        let dy = Math.abs((nodes[lowestHighY].y + nodes[lowestHighY].h) - nodes[highestLowY].y);
        if (dx > dy) {
            if (lowestHighX > highestLowX) {
                t1 = nodes.splice(lowestHighX, 1)[0];
                t2 = nodes.splice(highestLowX, 1)[0];
            } else {
                t2 = nodes.splice(highestLowX, 1)[0];
                t1 = nodes.splice(lowestHighX, 1)[0];
            }
        } else {
            if (lowestHighY > highestLowY) {
                t1 = nodes.splice(lowestHighY, 1)[0];
                t2 = nodes.splice(highestLowY, 1)[0];
            } else {
                t2 = nodes.splice(highestLowY, 1)[0];
                t1 = nodes.splice(lowestHighY, 1)[0];
            }
        }
        return ([{ x: t1.x, y: t1.y, w: t1.w, h: t1.h, nodes: [t1] },
        { x: t2.x, y: t2.y, w: t2.w, h: t2.h, nodes: [t2] }]);
    }
    private _attach_data(node, moreTree) {
        node.nodes = moreTree.nodes;
        node.x = moreTree.x; node.y = moreTree.y;
        node.w = moreTree.w; node.h = moreTree.h;
        return (node);
    }
    /* non-recursive internal search function 
     * [ nodes | objects ] = _search_subtree(rectangle, [return node data], [array to fill], root to begin search at)
     * @private
     */
    private _search_subtree(rect, returnNode, returnArray, root) {
        let hitStack = []; // Contains the elements that overlap

        if (!Rectangle.overlap_rectangle(rect, root)) {
            return (returnArray);
        }

        let loadCallback = (localTree, localNode) => {
            return ((data) => {
                localTree._attach_data(localNode, data);
            });
        };

        hitStack.push(root.nodes);
        do {
            let nodes = hitStack.pop();

            for (let i = nodes.length - 1; i >= 0; i--) {
                let ltree = nodes[i];
                if (Rectangle.overlap_rectangle(rect, ltree)) {
                    if ("nodes" in ltree) { // Not a Leaf
                        hitStack.push(ltree.nodes);
                    } else if ("leaf" in ltree) { // A Leaf !!
                        if (!returnNode) {
                            returnArray.push(ltree.leaf);
                        } else {
                            returnArray.push(ltree);
                        }
                    }/*	else if("load" in ltree) { // We need to fetch a URL for some more tree data
	  				jQuery.getJSON(ltree.load, load_callback(this, ltree));
	  				delete ltree.load;
	  			//	i++; // Replay this entry
	  			}*/
                }
            }
        } while (hitStack.length > 0);

        return (returnArray);
    }
    /* non-recursive internal insert function
     * [] = _insert_subtree(rectangle, object to insert, root to begin insertion at)
     * @private
     */
    private _insert_subtree(node, root) {
        let bc; // Best Current node
        // Initial insertion is special because we resize the Tree and we don't
        // care about any overflow (seriously, how can the first object overflow?)
        if (root.nodes.length == 0) {
            root.x = node.x; root.y = node.y;
            root.w = node.w; root.h = node.h;
            root.nodes.push(node);
            return;
        }

        // Find the best fitting leaf node
        // choose_leaf returns an array of all tree levels (including root)
        // that were traversed while trying to find the leaf
        let treeStack = this._choose_leaf_subtree(node, root);
        let retObj = node;//{x:rect.x,y:rect.y,w:rect.w,h:rect.h, leaf:obj};

        // Walk back up the tree resizing and inserting as needed
        do {
            //handle the case of an empty node (from a split)
            if (bc && "nodes" in bc && bc.nodes.length == 0) {
                let pbc = bc; // Past bc
                bc = treeStack.pop();
                for (let t = 0; t < bc.nodes.length; t++) {
                    if (bc.nodes[t] === pbc || bc.nodes[t].nodes.length == 0) {
                        bc.nodes.splice(t, 1);
                        break;
                    }
                }
            } else {
                bc = treeStack.pop();
            }

            // If there is data attached to this ret_obj
            if ("leaf" in retObj || "nodes" in retObj || this.isArray(retObj)) {
                // Do Insert
                if (this.isArray(retObj)) {
                    for (let ai = 0; ai < retObj.length; ai++) {
                        Rectangle.expand_rectangle(bc, retObj[ai]);
                    }
                    bc.nodes = bc.nodes.concat(retObj);
                } else {
                    Rectangle.expand_rectangle(bc, retObj);
                    bc.nodes.push(retObj); // Do Insert
                }

                if (bc.nodes.length <= this._MaxWidth) { // Start Resizeing Up the Tree
                    retObj = { x: bc.x, y: bc.y, w: bc.w, h: bc.h };
                } else { // Otherwise Split this Node
                    // linear_split() returns an array containing two new nodes
                    // formed from the split of the previous node's overflow
                    let a = this._linear_split(bc.nodes);
                    retObj = a;//[1];

                    if (treeStack.length < 1) { // If are splitting the root..
                        bc.nodes.push(a[0]);
                        treeStack.push(bc);     // Reconsider the root element
                        retObj = a[1];
                    } /*else {
						delete bc;
					}*/
                }
            } else { // Otherwise Do Resize
                //Just keep applying the new bounding rectangle to the parents..
                Rectangle.expand_rectangle(bc, retObj);
                retObj = { x: bc.x, y: bc.y, w: bc.w, h: bc.h };
            }
        } while (treeStack.length > 0);
    }
    private _search_subtreeExtend(rect, returnArray, root) {
        let hitStack = this.hitStack; // Contains the elements that overlap
        this.hsBuoy = 0;

        if (!Rectangle.overlap_rectangle(rect, root)) {
            return 0;
        }

        // hit_stack.push(root.nodes);
        this.hsBuoy++;
        hitStack[this.hsBuoy] = root.nodes;
        let idx = 0;
        do {
            // var nodes = hit_stack.pop();
            let nodes = hitStack[this.hsBuoy];
            this.hsBuoy--;

            for (let i = nodes.length - 1; i >= 0; i--) {
                let ltree = nodes[i];
                if (Rectangle.overlap_rectangle(rect, ltree)) {
                    if ("nodes" in ltree) { // Not a Leaf
                        // hit_stack.push(ltree.nodes);
                        this.hsBuoy++;
                        hitStack[this.hsBuoy] = ltree.nodes;
                    } else if ("leaf" in ltree) { // A Leaf !!
                        returnArray[idx] = ltree.leaf;
                        idx++;
                    }
                }
            }
            // } while (hit_stack.length > 0);
        } while (this.hsBuoy > 0);

        //all set to null
        let len = hitStack.length;
        for (let i = 0; i < len; i++) {
            if (!hitStack[i]) { break; }
            hitStack[i] = null;
        }

        return idx;
    }
    /* non-recursive delete function
     * [deleted object] = RTree.remove(rectangle, [object to delete])
     */

    //End of RTree
}