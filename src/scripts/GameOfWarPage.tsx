import '../styles/game.less';
import * as React from 'react';
var ReactDOM = require('react-dom');

import { GameOfWar } from './Logic/GameOfWar';
var { GameButton } = require('./Components/GameButton');
var { GamePlayer } = require('./Components/GamePlayer');

const game = new GameOfWar();
function GameOfWarPage() {
    let [gameState, setState] = React.useState(game.state);

    return(
        <div id="GameOfWar">
            <div className="panel">
                <GameButton content={gameState.buttonMessage} onClick={e => handleClick(e)} />
                <div className="status">{gameState.roundMessage}</div>
            </div>
            <div className="panel">
                {game.players.map((p, i) => <GamePlayer player={p} key={i} />)}
            </div>
        </div>
    );

    function handleClick(event) {
        if(gameState.gameOver) return;
        game.nextRound();
        setState(game.state);
    }
}

ReactDOM.render(<GameOfWarPage />, document.getElementById('import_gameofwar'));