import React  from 'react';
import { isNullOrUndefined } from 'util';
import { relative } from 'path';

const GameButton = (props) => {
    return (
        <button onClick={props.onClick} className="btn">
            {props.content}
        </button>
        );
}

const GameCard = (props) => {
    var path = './assets/imgs/playingcards/1x/';
    var suffix;

    if (isNullOrUndefined(props.card))
        suffix = props.back ? 'back' : 'card-base';
    else
        suffix = props.card.suit + '_' + props.card.name;

    var index = isNullOrUndefined(props.index) ? 0 : props.index
    var myPosition = index == 0 ? "relative" : "absolute";

    return (
        <div style={{
            zIndex: index,
            top: index + index * 70,
            position: myPosition
        }}>
            <img src={path + suffix + '.png'} />
        </div>
        );
}

const GameCardStack = (props) => {
    var cards = [];
    var emptyStack = isNullOrUndefined(props.stack) || props.stack.length === 0;

    if (emptyStack) {
        cards.push(<GameCard key={0} index={0} back={props.back} />)
    }
    else {
        for (var i = 0; i < props.stack.length; i++) {
            cards.push(<GameCard key={i} index={i} card={props.stack[i]} />);
        }
    }

    return (
        <div className="CardStack">
            {props.info}
            {cards}
        </div>
        );
}

const GamePlayerInfo = (props) => {
    var player = props.player;

    return (
        <div className="info">
            <h4>{player.name}</h4>
            <p>{player.hand.length}</p>
        </div>
        );
}

const GamePlayer = (props) => {
    var player = props.player;
    var info = <GamePlayerInfo player={player} />;

    var playerStack = <GameCardStack stack={player.viewStack} back={false}/>;
    var playerDeck = <GameCardStack info={info} back={true} />;

    return (
        <div className="player">
            {player.isComputer ? playerStack : playerDeck}
            {player.isComputer ? playerDeck : playerStack}
        </div>
        );
}

module.exports = {
    GameButton: GameButton,
    GamePlayer: GamePlayer
};