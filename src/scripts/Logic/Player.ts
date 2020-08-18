import { Queue, CardBase, Card } from '.';

export class Player {
    isComputer: any;
    name: string;
    hand: Queue<Card>;
    stack: Card[];
    constructor(isComputer: boolean) {
        this.isComputer = isComputer;
        this.name = this.isComputer ? 'Computer' : 'User';
        this.hand = new Queue<Card>();
        this.stack = [];
    }

    /**
     * Add card to player's hand
     */
    add(card: Card) {
        this.hand.enqueue(card);
    }

    draw(numberOfCardsToDraw: number) {
        for (var i = 0; i < numberOfCardsToDraw; i++) {
            this.stack.push(this.hand.dequeue());
        }
    }

    transferStack(queue: Queue<Card>) {
        while (!this.stack || this.stack.length > 0){
            queue.enqueue(this.stack.pop());
        }
    }

    get valueOfCardInPlay(): number {
        if(this.stack[0]) return this.stack[this.stack.length - 1].value;

        return -1;
    }
}
