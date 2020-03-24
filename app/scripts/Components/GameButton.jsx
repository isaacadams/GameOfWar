import * as React from 'react';

export function GameButton (props) {
    return (
        <button onClick={props.onClick} className="btn">
            {props.content}
        </button>
    );
};