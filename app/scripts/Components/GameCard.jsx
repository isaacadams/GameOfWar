import * as React from 'react';
var { isNullOrUndefined } = require('util');

export const GameCard = (props) => {
    var suffix;

    if (isNullOrUndefined(props.card))
        suffix = props.back ? 'back' : 'card-base';
    else
        suffix = props.card.suit + '_' + props.card.name;

    var index = isNullOrUndefined(props.index) ? 0 : props.index;
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