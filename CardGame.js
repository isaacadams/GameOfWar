import { isNullOrUndefined } from 'util';

class Queue {
    constructor() {
        this.array = [];
    }

    enqueue(element) {
        this.array.push(element);
    }

    dequeue() {
        return this.array.shift();
    }

    get length () {
        return this.array.length;
    }
}

class Card {
    constructor(value, suit, name) {
        this.value = value;
        this.suit = suit;
        this.name = name;
    }
}

export class Deck {

    constructor() {
        this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        this.suits = ['club', 'heart', 'spade', 'diamond'];
        this.cards = [];

        for (var n = 0; n < this.names.length; n++) {
            for (var s = 0; s < this.suits.length; s++) {
                this.cards.push(new Card(n + 1, this.suits[s], this.names[n]));
            }
        }

        this.shuffle();
    }

    shuffle() {
        this.cards.sort(function (a, b) { return 0.5 - Math.random(); });
    }

    deal(players, numOfCardsPerHand) {
        for (var i = 0; i < players.length; i++) {
            for (var c = 0; c < numOfCardsPerHand; c++) {
                players[i].add(this.cards.pop());
            }
        }
    }
}

export class Player {
    constructor(isComputer) {
        this.isComputer = isComputer;
        this.name = this.isComputer ? 'Computer' : 'User';
        this.hand = new Queue();
        this.stack = [];
        this.viewStack = [];
    }

    add(card) {
        this.hand.enqueue(card);
    }

    draw(numberOfCardsToDraw) {
        for (var i = 0; i < numberOfCardsToDraw; i++) {
            this.stack.push(this.hand.dequeue());
        }
    }

    transferStack(queue) {
        this.viewStack = [];
        var length = this.stack.length;
        for (var i = 0; i < length; i++) {
            var card = this.stack.pop();
            this.viewStack.unshift(card);
            queue.enqueue(card);
        }
    }

    get cardInPlay() {
        return isNullOrUndefined(this.stack[0]) ? new Card() : this.stack[this.stack.length-1];
    }
}
