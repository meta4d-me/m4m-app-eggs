import { Dictionary } from "./Dictionary";

export class EventDispatcher {
    public events: Dictionary = new Dictionary();

    public addEventListener(evnetType: string, fun: Function) {
        let functions: Function[];
        if (!this.events.ContainsKey(evnetType)) {
            this.events.Add(evnetType, new Array<Function>());
        }
        functions = this.events.GetValue(evnetType);
        functions.push(fun);
        this.events.Add(evnetType, functions);

        // console.error(evnetType+"add回调函数的数量为"+functions.length+"      "+fun.name);
    }

    public removeEventListener(evnetType: string, fun: Function) {
        if (!this.events.ContainsKey(evnetType)) {
            return;
        }
        let functions: Function[] = this.events.GetValue(evnetType);
        let index: number = functions.indexOf(fun);
        if (index != -1) {
            functions.splice(index, 1);
        }
        this.events.Add(evnetType, functions);
    }

    public dispatchEvent(evnetType: string, ...args: any[]) {
        let functions: Function[];
        if (!this.events.ContainsKey(evnetType)) {
            this.events.Add(evnetType, new Array<Function>());
        }
        functions = this.events.GetValue(evnetType);

        // console.error(evnetType+"回调函数的数量为"+functions.length);
        functions.forEach((fun) => {
            // console.error(fun.name);
            fun.apply(fun, args);
        });
    }
}