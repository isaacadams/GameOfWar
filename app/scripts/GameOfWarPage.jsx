require('../styles/game.less');
import * as React from 'react';
var ReactDOM = require('react-dom');

import { GameOfWar } from './Logic/GameOfWar';
var { GameButton }= require('./Components/GameButton.jsx');
var { GamePlayer } = require('./Components/GamePlayer.jsx');


class GameOfWarPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.game = new GameOfWar();        
        this.state = this.game.state;
    }

    handleClick(event) {
        if(this.state.gameOver) return;
        this.game.nextRound();
        this.setState(this.game.state);
    }

    render() {
        return (
            <div id="GameOfWar">
                <div className="panel">
                    <GameButton content={this.state.buttonMessage} onClick={e => this.handleClick(e)} />
                    <div className="status">{this.state.roundMessage}</div>
                </div>
                <div className="panel">
                    {this.game.players.map((p, i) => <GamePlayer player={p} key={i} />)}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<GameOfWarPage />, document.getElementById('import_gameofwar'));