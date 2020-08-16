import * as React from 'react';
import { CardView } from './CardView.jsx';
import { GameCardStack } from './GameCardStack.jsx';
import { GamePlayerInfo } from './GamePlayerInfo.jsx';
import { CardBack } from '../Logic/Card.js';

export function GamePlayer({player}) {
    let widthBoundary = 1660;
    let css = {
        display: "flex"
    };

    if(player.isComputer) css["flexDirection"] = "row-reverse";

    return (
        <div className="player" style={css}>
            <div className="CardStack">
                <GamePlayerInfo player={player} />
                <CardView card={new CardBack()} />
            </div>
            <GameCardStack stack={player.stack} />
        </div>
    );
}
