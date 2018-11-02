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

var less = require('./../resources/Styles/game.less');

var React = require('react');

var ReactDOM = require('react-dom');

var GameOfWar = require('./Logic/GameOfWar').GameOfWar;

var GameButton = require('./Components/GameButton').GameButton;

var GamePlayer = require('./Components/GamePlayer').GamePlayer;

var FileServer = require('./../resources/fileServer');

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
    FileServer.Listen();
  }
};