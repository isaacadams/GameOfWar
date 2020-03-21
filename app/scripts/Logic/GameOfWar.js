import { Player } from "./Player";
import { Deck } from "./Deck";

var util = require('util');

export class GameOfWar {
    constructor() {
        this.players = [new Player(false), new Player(true)];

        this.theDeck = new Deck();
        this.theDeck.deal(this.players, 26);
        this.saveState = {};
        this.gameOver = false;
    }

    draw(numberOfCardsToDraw) {

        numberOfCardsToDraw = this.checkCardsInHand(numberOfCardsToDraw);

        this.computer.draw(numberOfCardsToDraw);
        this.user.draw(numberOfCardsToDraw);

        if (this.computer.cardInPlay.value > this.user.cardInPlay.value) {
            this.win(this.computer, this.user, "Computer won this round.");
        } else
            if (this.computer.cardInPlay.value < this.user.cardInPlay.value) {
                this.win(this.user, this.computer, "You won this round!");
            }
            else { //Then it must be a tie
                this.save("War!", 3);

                //Keeps cards in the stack while putting them in the view card stack
                for (var i = 0; i < this.players.length; i++) {
                    var player = this.players[i];
                    player.viewStack = [];
                    for (var s = 0; s < player.stack.length; s++) {
                        var card = player.stack[s];
                        player.viewStack.push(card);
                    }
                }
            }
    }

    win(winner, loser, roundMessage) {
        winner.transferStack(winner.hand);
        loser.transferStack(winner.hand);

        if (loser.hand.length <= 0) {
            roundMessage = winner.name + " has won the game!";
            this.gameOver = true;
        }

        this.save(roundMessage);
    }

    get computer() {
        return this.players[1];
    }

    get user() {
        return this.players[0];
    }

    save(message, draw = null) {
        this.saveState = {
            Game: this,
            Message: message,
            Draw: util.isNullOrUndefined(draw) ? 1 : draw
        };
    }

    checkCardsInHand(numberOfCardsToDraw) {
        //Check to see if a player doesn't have enough cards to draw
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            var cardsInHand = player.hand.length;

            if (cardsInHand < numberOfCardsToDraw) {
                numberOfCardsToDraw = cardsInHand;

                //If this player's hand has less cards, then we don't need to check the other player since it is impossible that they would also have less than the required amount
                break;
            }
        }

        return numberOfCardsToDraw;
    }
}