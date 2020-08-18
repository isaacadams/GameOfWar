/**
 * Queue's follow the FIFO: First In, First Out
 * So whatever goes into the array first should be the first thing to come out
 * This is how a player's hand works in Game Of War
 * When they add a card to their hand, all other cards added before it should be removed first before the new card is removed
 */
export class Queue<T> {
    array: T[];

    constructor() {
        this.array = [];
    }

    enqueue(element: T) {
        this.array.push(element);
    }

    dequeue(): T {
        return this.array.shift();
    }

    get length() {
        return this.array.length;
    }
}