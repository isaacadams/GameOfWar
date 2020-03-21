export class Queue {
    constructor() {
        this.array = [];
    }
    enqueue(element) {
        this.array.push(element);
    }
    dequeue() {
        return this.array.shift();
    }
    get length() {
        return this.array.length;
    }
}
