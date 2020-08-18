import { Player } from "./Player";
import { Deck } from "./Deck";

var util = require('util');

export class GameOfWar {
    players: Player[];
    state: { gameOver: boolean; cardsToDraw: number; roundMessage: string; buttonMessage: string; };
    previousRoundsQueue: any[];
    constructor() {
        this.players = [new Player(false), new Player(true)];
        
        this.state = {
            gameOver: false,
            cardsToDraw: 1,
            roundMessage: 'Click "Deal" to begin the game',
            buttonMessage: "Deal"
        };

        this.dealCardsToPlayers();
        this.previousRoundsQueue = [];
    }

    dealCardsToPlayers() {
        let deckOfCards = new Deck();
        deckOfCards.dealCards(26).forEach(c => this.user.add(c));
        deckOfCards.dealCards(26).forEach(c => this.computer.add(c));
    }

    nextRound() {
        
        while (!this.previousRoundsQueue || this.previousRoundsQueue.length > 0){
            let previousRoundAction = this.previousRoundsQueue.pop();
            previousRoundAction();
        }

        this.draw(this.state.cardsToDraw);
    }

    draw(numberOfCardsToDraw) {
        // should not draw a number of cards that exceeds the amount contained in a player's hand
        numberOfCardsToDraw = Math.min(numberOfCardsToDraw, ...this.players.map(p => p.hand.length));

        this.computer.draw(numberOfCardsToDraw);
        this.user.draw(numberOfCardsToDraw);

        if (this.computer.cardInPlay.value > this.user.cardInPlay.value) {
            this.win(this.computer, this.user, "Computer won this round.");
            return;
        }

        if (this.computer.cardInPlay.value < this.user.cardInPlay.value) {
            this.win(this.user, this.computer, "You won this round!");
            return;
        }

        //Then it must be a tie
        this.state = {
            ...this.state,
            roundMessage: "War!",
            cardsToDraw: 3
        };
    }

    win(winner, loser, roundMessage) {        
        this.previousRoundsQueue.push(() => {
            winner.transferStack(winner.hand);
            loser.transferStack(winner.hand);
        });

        if (loser.hand.length <= 0) {
            this.state.roundMessage = winner.name + " has won the game!";
            this.state.gameOver = true;
            return;
        }
        
        this.state = {
            ...this.state,
            roundMessage,
            cardsToDraw: 1
        };
    }

    get computer() {
        return this.players[1];
    }

    get user() {
        return this.players[0];
    }
}