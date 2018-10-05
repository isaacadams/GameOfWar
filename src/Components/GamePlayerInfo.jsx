import React from 'react';
import { isNullOrUndefined } from 'util';
import { relative } from 'path';

export const GamePlayerInfo = (props) => {
    var player = props.player;

    return (
        <div className="info">
            <h4>{player.name}</h4>
            <p>{player.hand.length}</p>
        </div>
    );
};