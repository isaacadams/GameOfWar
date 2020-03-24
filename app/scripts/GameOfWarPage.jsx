require('../styles/game.less');
import * as React from 'react';
var ReactDOM = require('react-dom');

import { GameOfWar } from './Logic/GameOfWar';
var { GameButton }= require('./Components/GameButton.jsx');
var { GamePlayer } = require('./Components/GamePlayer.jsx');


class GameOfWarPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Game: new GameOfWar(),
            Message: 'Click "Deal" to begin the game',
            Draw: 1
        };
    }

    handleClick(event) {
        var game = this.state.Game;
        if (!game.gameOver) {
            game.draw(this.state.Draw);
            this.setState(game.saveState);
        }
    }

    render() {
        return (
            <div id="GameOfWar">
                <div className="panel">
                    <GameButton content="Deal" onClick={e => this.handleClick(e)} />
                    <div className="status">{this.state.Message}</div>
                </div>
                <div className="panel">
                    {this.state.Game.players.map((p, i) => <GamePlayer player={p} key={i} />)}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<GameOfWarPage />, document.getElementById('import_gameofwar'));