import React from 'react';
import { isNullOrUndefined } from 'util';
import { relative } from 'path';

import { GameCard } from './GameCard.jsx';

export const GameCardStack = (props) => {
    var cards = [];
    var emptyStack = isNullOrUndefined(props.stack) || props.stack.length === 0;

    if (emptyStack) {
        cards.push(<GameCard key={0} index={0} back={props.back} />);
    }
    else {
        for (var i = 0; i < props.stack.length; i++) {
            cards.push(<GameCard key={i} index={i} card={props.stack[i]} />);
        }
    }

    return (
        <div className="CardStack">
            {props.info}
            {cards}
        </div>
    );
};