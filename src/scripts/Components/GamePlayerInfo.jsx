import * as React from 'react';

export const GamePlayerInfo = ({ player }) => {
    return (
        <div className="info">
            <h4>{player.name}</h4>
            <p>{player.hand.length}</p>
        </div>
    );
};