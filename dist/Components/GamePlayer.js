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

var GameCardStack = require('./GameCardStack').GameCardStack;

var GamePlayerInfo = require('./GamePlayerInfo').GamePlayerInfo;

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