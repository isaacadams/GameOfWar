import * as React from 'react';
import { CardBase } from '../Logic/Card';
import {CardView} from './CardView';

export function GameCardStack ({ stack }) {
    return (
        <div className="CardStack">
            {getCardView(stack)}
        </div>
    );
};

function getCardView(stack) {
    
    if(!stack || stack.length < 1) return <CardView card={new CardBase()} />;

    if(stack.length === 1) return <CardView card={stack[0]} />;

    return stack.map((card, i) => 
        <CardView key={i} card={card} 
            style={{ 
                zIndex: i,
                top: i + i * 70,
                position: i > 0 ? "absolute" : "relative"
            }} 
        />
    );
}