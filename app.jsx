import React from 'react';
import ReactDOM from 'react-dom';
import { GameOfWar } from './GameOfWar.js';
import { GameButton, GamePlayer } from './GameViews.jsx';

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

export function Render(domId) {
    ReactDOM.render(<GameOfWarPage />, document.getElementById(domId));
}
