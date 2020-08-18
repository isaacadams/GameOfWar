/**
 * Stacks follow the LIFO: Last In, First Out
 * Any element that is added into the array will be the first returned from it
 * 
 * In Game of War, the concept of a stack is used when a 'War' event occurs
 * the card on the top of their stack was the last on in and will be the first one to be taken out into their hand if they win or, if not, the other player's hand
 */
export class Stack<T> {
    array: T[];

    constructor() {
        this.array = [];
    }

    push(item: T) {
        this.array.unshift(item);
    }

    pop(): T {
        return this.array.shift();
    }

    get length() {
        return this.array.length;
    }
}
