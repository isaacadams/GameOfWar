"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = exports.Deck = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var util = require('util');

var Queue =
/*#__PURE__*/
function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.array = [];
  }

  _createClass(Queue, [{
    key: "enqueue",
    value: function enqueue(element) {
      this.array.push(element);
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      return this.array.shift();
    }
  }, {
    key: "length",
    get: function get() {
      return this.array.length;
    }
  }]);

  return Queue;
}();

var Card = function Card(value, suit, name) {
  _classCallCheck(this, Card);

  this.value = value;
  this.suit = suit;
  this.name = name;
};

var Deck =
/*#__PURE__*/
function () {
  function Deck() {
    _classCallCheck(this, Deck);

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

  _createClass(Deck, [{
    key: "shuffle",
    value: function shuffle() {
      this.cards.sort(function (a, b) {
        return 0.5 - Math.random();
      });
    }
  }, {
    key: "deal",
    value: function deal(players, numOfCardsPerHand) {
      for (var i = 0; i < players.length; i++) {
        for (var c = 0; c < numOfCardsPerHand; c++) {
          players[i].add(this.cards.pop());
        }
      }
    }
  }]);

  return Deck;
}();

exports.Deck = Deck;

var Player =
/*#__PURE__*/
function () {
  function Player(isComputer) {
    _classCallCheck(this, Player);

    this.isComputer = isComputer;
    this.name = this.isComputer ? 'Computer' : 'User';
    this.hand = new Queue();
    this.stack = [];
    this.viewStack = [];
  }

  _createClass(Player, [{
    key: "add",
    value: function add(card) {
      this.hand.enqueue(card);
    }
  }, {
    key: "draw",
    value: function draw(numberOfCardsToDraw) {
      for (var i = 0; i < numberOfCardsToDraw; i++) {
        this.stack.push(this.hand.dequeue());
      }
    }
  }, {
    key: "transferStack",
    value: function transferStack(queue) {
      this.viewStack = [];
      var length = this.stack.length;

      for (var i = 0; i < length; i++) {
        var card = this.stack.pop();
        this.viewStack.unshift(card);
        queue.enqueue(card);
      }
    }
  }, {
    key: "cardInPlay",
    get: function get() {
      return util.isNullOrUndefined(this.stack[0]) ? new Card() : this.stack[this.stack.length - 1];
    }
  }]);

  return Player;
}();

exports.Player = Player;