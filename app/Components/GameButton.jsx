var React = require('react');

export const GameButton = (props) => {
    return (
        <button onClick={props.onClick} className="btn">
            {props.content}
        </button>
    );
};
