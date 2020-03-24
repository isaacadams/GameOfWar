import * as React from 'react';
var { isNullOrUndefined } = require('util');

export function GameCard({ card, back, index }) {
    var suffix;

    if (isNullOrUndefined(card))
        suffix = back ? 'back' : 'card-base';
    else
        suffix = card.suit + '_' + card.name;

    var index = isNullOrUndefined(index) ? 0 : index;
    var myPosition = index === 0 ? "relative" : "absolute";

    let css = {
        zIndex: index,
        top: index + index * 70,
        position: myPosition
    };

    let src = `playingcards/${suffix}.png`;

    return (
        <div style={css} >
            <img src={src} />
        </div>
    );
};