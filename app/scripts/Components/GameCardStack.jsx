import * as React from 'react';
import { CardBack, CardBase } from '../Logic/Card.js';
var { isNullOrUndefined } = require('util');
var { GameCard } = require('./GameCard.jsx');

export function GameCardStack ({ stack }) {
    var cards = [];
    var emptyStack = isNullOrUndefined(stack) || stack.length === 0;

    if (emptyStack) {
        cards.push(<GameCard key={0} index={0} card={new CardBase()} />);
    }
    else {
        cards = stack.map((card, i) => <GameCard key={i} index={i} card={card} />)
    }

    return (
        <div className="CardStack">
            {cards}
        </div>
    );
};