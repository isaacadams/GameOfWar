import * as React from 'react';
import { CardView, GameCardStack, GamePlayerInfo } from '.';
import { CardBack } from '../Logic';

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
