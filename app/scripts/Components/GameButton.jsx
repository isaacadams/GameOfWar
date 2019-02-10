//var React = require('react');
import * as React from 'react';

export const GameButton = (props) => {
    return (
        <button onClick={props.onClick} className="btn">
            {props.content}
        </button>
    );
};
