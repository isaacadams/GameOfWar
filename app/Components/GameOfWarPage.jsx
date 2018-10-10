//import React from 'react';
//import { GameOfWar } from './../GameOfWar';
//import { GameButton } from './GameButton.jsx';
//import { GamePlayer } from './GamePlayer.jsx';

var React = require('react');
var GameOfWar = require('./../GameOfWar').GameOfWar;
var GameButton = require('./GameButton.jsx').GameButton;
var GamePlayer = require('./GamePlayer.jsx').GamePlayer;


export class GameOfWarPage extends React.Component {
    constructor() {
        super();
        
        var Game = new GameOfWar();

        this.state = {
            Game: Game,
            Message: 'Click "Deal" to begin the game',
            Draw: 1
        };

        this.handleClick = (event) => {
            var game = this.state.Game;
            if (!game.gameOver) {
                game.draw(this.state.Draw);
                this.setState(game.saveState);
            }
        };
    }

    render() {
        var players = this.state.Game.players;
        var playerView = [];

        for (var i = 0; i < players.length; i++) {
            playerView.push(<GamePlayer player={players[i]} key={i} />);
        }

        return (
            <div id="GameOfWar">
                
                <div className="panel">
                    <GameButton content="Deal" onClick={this.handleClick} />
                    <div className="status">{this.state.Message}</div>
                </div>
                <div className="panel">
                    {playerView}
                </div>

            </div>
        );
    }
}
