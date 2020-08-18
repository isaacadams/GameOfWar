import { Card } from './Card';
import '@isaacadams/extensions';

export class Deck {
    names: string[];
    suits: string[];
    cards: any[];
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

    /**
     * @param {number} numOfCardsPerHand number of cards per hand
     * @returns {Card[]} deals out the number of cards specified
     */
    dealCards(numOfCardsPerHand) {
        return this.cards.takeRandomly(numOfCardsPerHand);
    }
}