import { Queue, CardBase } from '.';

export class Player {
    isComputer: any;
    name: string;
    hand: Queue;
    stack: any[];
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
        if(this.stack[0]) return this.stack[this.stack.length - 1];

        return new CardBase();
    }
}
