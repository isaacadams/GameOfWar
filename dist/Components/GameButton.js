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