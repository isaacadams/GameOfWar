import * as React from 'react';
import { GameCardStack } from './GameCardStack.jsx';
import { GamePlayerInfo } from './GamePlayerInfo.jsx';
import { CardBack } from '../Logic/Card.js';

export class GamePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.widthBoundary = 1660;
    }

    render() {
        var { player } = this.props;
        
        let css = {
            display: "flex"
        };

        if(player.isComputer) css["flexDirection"] = "row-reverse";

        return (
            <div className="player" style={css}>                
                <div className="CardStack">
                    <GamePlayerInfo player={player} />
                    <GameCard card={new CardBack()} />
                </div>
                <GameCardStack stack={player.viewStack} />                
            </div>
        );
    }    
    
}