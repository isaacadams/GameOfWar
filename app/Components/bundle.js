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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameButton = void 0;

var React = require('react');

var GameButton = function GameButton(props) {
  return React.createElement("button", {
    onClick: props.onClick,
    className: "btn"
  }, props.content);
};

exports.GameButton = GameButton;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameCard = void 0;

var React = require('react');

var isNullOrUndefined = require('util').isNullOrUndefined;

var GameCard = function GameCard(props) {
  var path = './playingcards/1x/';
  console.log(path);
  var suffix;
  if (isNullOrUndefined(props.card)) suffix = props.back ? 'back' : 'card-base';else suffix = props.card.suit + '_' + props.card.name;
  var index = isNullOrUndefined(props.index) ? 0 : props.index;
  var myPosition = index === 0 ? "relative" : "absolute";
  var css = {
    zIndex: index,
    top: index + index * 70,
    position: myPosition
  };
  return React.createElement("div", {
    style: css
  }, React.createElement("img", {
    src: path + suffix + '.png'
  }));
};

exports.GameCard = GameCard;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameCardStack = void 0;

var React = require('react');

var isNullOrUndefined = require('util').isNullOrUndefined;

var GameCard = require('./GameCard.jsx').GameCard;

var GameCardStack = function GameCardStack(props) {
  var cards = [];
  var emptyStack = isNullOrUndefined(props.stack) || props.stack.length === 0;

  if (emptyStack) {
    cards.push(React.createElement(GameCard, {
      key: 0,
      index: 0,
      back: props.back
    }));
  } else {
    for (var i = 0; i < props.stack.length; i++) {
      cards.push(React.createElement(GameCard, {
        key: i,
        index: i,
        card: props.stack[i]
      }));
    }
  }

  return React.createElement("div", {
    className: "CardStack"
  }, props.info, cards);
};

exports.GameCardStack = GameCardStack;
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var less = require('./../Styles/game.less');

var React = require('react');

var ReactDOM = require('react-dom');

var GameOfWar = require('./../GameOfWar').GameOfWar;

var GameButton = require('./GameButton.jsx').GameButton;

var GamePlayer = require('./GamePlayer.jsx').GamePlayer;

var GameOfWarPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GameOfWarPage, _React$Component);

  function GameOfWarPage() {
    var _this;

    _classCallCheck(this, GameOfWarPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameOfWarPage).call(this));
    var Game = new GameOfWar();
    _this.state = {
      Game: Game,
      Message: 'Click "Deal" to begin the game',
      Draw: 1
    };

    _this.handleClick = function (event) {
      var game = _this.state.Game;

      if (!game.gameOver) {
        game.draw(_this.state.Draw);

        _this.setState(game.saveState);
      }
    };

    return _this;
  }

  _createClass(GameOfWarPage, [{
    key: "render",
    value: function render() {
      var players = this.state.Game.players;
      var playerView = [];

      for (var i = 0; i < players.length; i++) {
        playerView.push(React.createElement(GamePlayer, {
          player: players[i],
          key: i
        }));
      }

      return React.createElement("div", {
        id: "GameOfWar"
      }, React.createElement("div", {
        className: "panel"
      }, React.createElement(GameButton, {
        content: "Deal",
        onClick: this.handleClick
      }), React.createElement("div", {
        className: "status"
      }, this.state.Message)), React.createElement("div", {
        className: "panel"
      }, playerView));
    }
  }]);

  return GameOfWarPage;
}(React.Component);

module.exports = {
  Render: function Render(domId) {
    ReactDOM.render(React.createElement(GameOfWarPage, null), document.getElementById(domId));
  }
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePlayer = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var GameCardStack = require('./GameCardStack.jsx').GameCardStack;

var GamePlayerInfo = require('./GamePlayerInfo.jsx').GamePlayerInfo;

var React = require('react');

var jquery = require('jquery');

var GamePlayer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GamePlayer, _React$Component);

  function GamePlayer(props) {
    var _this;

    _classCallCheck(this, GamePlayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GamePlayer).call(this, props));
    _this.props = props;
    _this.player = props.player;
    _this.widthBoundary = 1660;
    _this.state = {
      OverWidth: false
    };

    _this.ReorderComponents = function () {
      var self = _assertThisInitialized(_assertThisInitialized(_this));

      var trigger = self.player.isComputer && window.innerWidth >= _this.widthBoundary !== _this.state.OverWidth;

      if (trigger) {
        Switch();
      }

      function Switch() {
        //If the current state is OverWidth: false, then that means it is transitioning to OverWidth: true
        //Switch the state
        self.state.OverWidth = !self.state.OverWidth; //Switch the decks (stateless)

        var $computer = jquery('#computer');
        var $deck = $computer.children().first(); //Remove the first deck

        $deck.remove(); //Then place the removed deck after the deck that used to be second

        $computer.children().after($deck); //Switch the width style (state dependent)

        var $parent = $computer.parentsUntil('', '.panel');
        $parent.css('width', !self.state.OverWidth ? '' : 'max-content');
      }
    };

    if (_this.player.isComputer) window.addEventListener('resize', _this.ReorderComponents);
    return _this;
  }

  _createClass(GamePlayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.player.isComputer) this.ReorderComponents();
    }
  }, {
    key: "render",
    value: function render() {
      var player = this.player;
      var info = React.createElement(GamePlayerInfo, {
        player: player
      });
      var playerStack = React.createElement(GameCardStack, {
        stack: player.viewStack,
        back: false
      });
      var playerDeck = React.createElement(GameCardStack, {
        info: info,
        back: true
      });
      var id = player.isComputer ? 'computer' : 'user';
      return React.createElement("div", {
        id: id,
        className: "player"
      }, playerDeck, playerStack);
    }
  }]);

  return GamePlayer;
}(React.Component);

exports.GamePlayer = GamePlayer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePlayerInfo = void 0;

var React = require('react');

var GamePlayerInfo = function GamePlayerInfo(props) {
  var player = props.player;
  return React.createElement("div", {
    className: "info"
  }, React.createElement("h4", null, player.name), React.createElement("p", null, player.hand.length));
};

exports.GamePlayerInfo = GamePlayerInfo;