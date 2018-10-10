"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var GameOfWarPage = require('./Components/GameOfWarPage.jsx').GameOfWarPage;

module.exports = {
    Render: function Render(domId) {
        ReactDOM.render(<GameOfWarPage />, document.getElementById(domId));
    }
};

//Render('body');