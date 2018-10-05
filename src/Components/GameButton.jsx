import React  from 'react';
import { isNullOrUndefined } from 'util';
import { relative } from 'path';

export const GameButton = (props) => {
    return (
        <button onClick={props.onClick} className="btn">
            {props.content}
        </button>
    );
};
