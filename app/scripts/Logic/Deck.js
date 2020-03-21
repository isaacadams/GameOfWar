import { Card } from './Card';
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
