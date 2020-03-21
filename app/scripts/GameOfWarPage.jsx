require('../styles/game.less');

import * as React from 'react';
var ReactDOM = require('react-dom');
var { GameOfWar } = require('./Logic/GameOfWar');
var { GameButton }= require('./Components/GameButton.jsx');
var { GamePlayer } = require('./Components/GamePlayer.jsx');


class GameOfWarPage extends React.Component {
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

        players.forEach((player, i) => {
            playerView.push(<GamePlayer player={player} key={i} />);
        });        

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

ReactDOM.render(<GameOfWarPage />, document.getElementById('import_gameofwar'));

//module.exports = {
//    Render: function (domId) {        
//        ReactDOM.render(<GameOfWarPage />, document.getElementById(domId));
//    }
//};
