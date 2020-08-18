import '../styles/game.less';
import * as React from 'react';
var ReactDOM = require('react-dom');

import { GameOfWar } from './Logic/GameOfWar';
import meta from './meta';
var { GameButton } = require('./Components/GameButton');
var { GamePlayer } = require('./Components/GamePlayer');
//import {Deck} from './Logic/Deck.js';

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
console.log(meta.version);
/* function load() {
    new Deck().cards.forEach(card => {
        new Image().src = `dist/playingcards/${card.suit}_${card.name}.png`;
    });
}

load(); */

ReactDOM.render(<GameOfWarPage />, document.getElementById('import_gameofwar'));