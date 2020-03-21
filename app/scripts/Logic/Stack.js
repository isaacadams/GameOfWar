/**
 * Stacks follow the LIFO: Last In, First Out
 * Any element that is added into the array will be the first returned from it
 */
export class Stack {
    constructor() {
        this.array = [];
    }
    push(item) {
        this.array.unshift(item);
    }
    pop() {
        return this.array.shift();
    }
    get length() {
        return this.array.length;
    }
}
