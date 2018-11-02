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