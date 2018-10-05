import React from 'react';
import { isNullOrUndefined } from 'util';


export const GameCard = (props) => {
    var path = './playingcards/1x/';
    var suffix;

    if (isNullOrUndefined(props.card))
        suffix = props.back ? 'back' : 'card-base';
    else
        suffix = props.card.suit + '_' + props.card.name;

    var index = isNullOrUndefined(props.index) ? 0 : props.index;
    var myPosition = index === 0 ? "relative" : "absolute";

    var css = {
        zIndex: index,
        top: index + index * 70,
        position: myPosition
    };

    return (
        <div style={css} >
            <img src={path + suffix + '.png'} />
        </div>
    );
};