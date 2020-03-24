import * as React from 'react';

export function CardView({ card, ...atts }) {
    return (<div style={{ position: "relative" }} {...atts}>
        <img src={card.getImagePath()} />
    </div>);
}
