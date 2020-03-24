import * as React from 'react';
var { isNullOrUndefined } = require('util');

export function GameCard({ card, index }) {
    var _index = isNullOrUndefined(index) ? 0 : index;
    var myPosition = _index === 0 ? "relative" : "absolute";

    let css = {
        zIndex: _index,
        top: _index + _index * 70,
        position: myPosition
    };
    return (
        <div style={css} >
            <img src={card.getImagePath()} />
        </div>
    );
};