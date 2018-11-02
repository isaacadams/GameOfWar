"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameCard = void 0;

var React = require('react');

var isNullOrUndefined = require('util').isNullOrUndefined;

var http = require('http');

var GameCard = function GameCard(props) {
  var suffix;
  if (isNullOrUndefined(props.card)) suffix = props.back ? 'back' : 'card-base';else suffix = props.card.suit + '_' + props.card.name;
  var index = isNullOrUndefined(props.index) ? 0 : props.index;
  var myPosition = index === 0 ? "relative" : "absolute";
  var css = {
    zIndex: index,
    top: index + index * 70,
    position: myPosition
  };
  var options = {
    host: 'localhost',
    port: 3000,
    path: '/?image=' + suffix
  };
  var src = "http://".concat(options.host, ":").concat(options.port + options.path);
  return React.createElement("div", {
    style: css
  }, React.createElement("img", {
    src: src
  }));
};

exports.GameCard = GameCard;