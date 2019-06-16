let React = require('react');
var { isNullOrUndefined } = require('util');

export const GameCard = (props) => {
    var suffix;

    if (isNullOrUndefined(props.card))
        suffix = props.back ? 'back' : 'card-base';
    else
        suffix = props.card.suit + '_' + props.card.name;

    var index = isNullOrUndefined(props.index) ? 0 : props.index;
    var myPosition = index === 0 ? "relative" : "absolute";

    let css = {
        zIndex: index,
        top: index + index * 70,
        position: myPosition
    };

    //let options = {
    //    host: 'localhost',
    //    port: 3000,
    //    path: '/?image=' + suffix
    //};

    //let src = `http://${options.host}:${options.port + options.path}`;

    let src = `playingcards/${suffix}.png`;

    return (
        <div style={css} >
            <img src={src} />
        </div>
    );
};