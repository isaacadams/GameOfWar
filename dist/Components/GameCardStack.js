"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameCardStack = void 0;

var React = require('react');

var isNullOrUndefined = require('util').isNullOrUndefined;

var GameCard = require('./GameCard').GameCard;

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