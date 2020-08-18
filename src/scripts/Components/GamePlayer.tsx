import * as React from 'react';
import { CardView, GameCardStack, GamePlayerInfo } from '.';
import { CardBack, Player } from '../Logic';

interface IProp {
    player: Player;
}

export function GamePlayer({player}: IProp) {

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
