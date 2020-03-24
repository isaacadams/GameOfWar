import { Card } from './Card';
import { Queue } from './Queue';
var util = require('util');

export class Player {
    constructor(isComputer) {
        this.isComputer = isComputer;
        this.name = this.isComputer ? 'Computer' : 'User';

        this.hand = new Queue();
        this.stack = [];
    }
    
    /**
     * Add card to player's hand
     * @param {Card} card 
     */
    add(card) {
        this.hand.enqueue(card);
    }
    
    draw(numberOfCardsToDraw) {
        for (var i = 0; i < numberOfCardsToDraw; i++) {
            this.stack.push(this.hand.dequeue());
        }
    }
    
    transferStack(queue) {
        while (!this.stack || this.stack.length > 0){
            queue.enqueue(this.stack.pop());
        }
    }
    
    get cardInPlay() {
        return util.isNullOrUndefined(this.stack[0]) ? new Card() : this.stack[this.stack.length - 1];
    }
}
