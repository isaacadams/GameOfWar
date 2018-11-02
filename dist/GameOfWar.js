"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOfWar = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cardgame = require('./CardGame');

var util = require('util');

var GameOfWar =
/*#__PURE__*/
function () {
  function GameOfWar() {
    _classCallCheck(this, GameOfWar);

    this.players = [new cardgame.Player(false), new cardgame.Player(true)];
    this.theDeck = new cardgame.Deck();
    this.theDeck.deal(this.players, 26);
    this.saveState = {};
    this.gameOver = false;
  }

  _createClass(GameOfWar, [{
    key: "draw",
    value: function draw(numberOfCardsToDraw) {
      numberOfCardsToDraw = this.checkCardsInHand(numberOfCardsToDraw);
      this.computer.draw(numberOfCardsToDraw);
      this.user.draw(numberOfCardsToDraw);

      if (this.computer.cardInPlay.value > this.user.cardInPlay.value) {
        this.win(this.computer, this.user, "Computer won this round.");
      } else if (this.computer.cardInPlay.value < this.user.cardInPlay.value) {
        this.win(this.user, this.computer, "You won this round!");
      } else {
        //Then it must be a tie
        this.save("War!", 3); //Keeps cards in the stack while putting them in the view card stack

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
  }, {
    key: "win",
    value: function win(winner, loser, roundMessage) {
      winner.transferStack(winner.hand);
      loser.transferStack(winner.hand);

      if (loser.hand.length <= 0) {
        roundMessage = winner.name + " has won the game!";
        this.gameOver = true;
      }

      this.save(roundMessage);
    }
  }, {
    key: "save",
    value: function save(message, draw) {
      this.saveState = {
        Game: this,
        Message: message,
        Draw: util.isNullOrUndefined(draw) ? 1 : draw
      };
    }
  }, {
    key: "checkCardsInHand",
    value: function checkCardsInHand(numberOfCardsToDraw) {
      //Check to see if a player doesn't have enough cards to draw
      for (var i = 0; i < this.players.length; i++) {
        var player = this.players[i];
        var cardsInHand = player.hand.length;

        if (cardsInHand < numberOfCardsToDraw) {
          numberOfCardsToDraw = cardsInHand; //If this player's hand has less cards, then we don't need to check the other player since it is impossible that they would also have less than the required amount

          break;
        }
      }

      return numberOfCardsToDraw;
    }
  }, {
    key: "computer",
    get: function get() {
      return this.players[1];
    }
  }, {
    key: "user",
    get: function get() {
      return this.players[0];
    }
  }]);

  return GameOfWar;
}();

exports.GameOfWar = GameOfWar;