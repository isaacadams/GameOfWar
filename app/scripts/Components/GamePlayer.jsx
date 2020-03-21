var { GameCardStack } = require('./GameCardStack.jsx');
var { GamePlayerInfo } = require('./GamePlayerInfo.jsx');
var React = require('react');
var jquery = require('jquery');

export class GamePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.player = props.player;        
        this.widthBoundary = 1660;

        this.state = {
            OverWidth: false
        };

        this.ReorderComponents = () => {
            let self = this;
            let isOverWidth = window.innerWidth >= this.widthBoundary;
            let trigger = self.player.isComputer && isOverWidth !== this.state.OverWidth;

            if (trigger) {
                Switch();
            }

            function Switch() {
                //If the current state is OverWidth: false, then that means it is transitioning to OverWidth: true
                
                //Switch the state
                    self.state.OverWidth = !self.state.OverWidth;

                //Switch the decks (stateless)
                    let $computer = jquery('#computer');
                    let $deck = $computer.children().first();
                    //Remove the first deck
                    $deck.remove();
                    //Then place the removed deck after the deck that used to be second
                    $computer.children().after($deck);
                                
                //Switch the width style (state dependent)
                    let $parent = $computer.parentsUntil('','.panel');
                    $parent.css('width', !self.state.OverWidth ? '' : 'max-content');
            }
            
        };

        if(this.player.isComputer)
            window.addEventListener('resize', this.ReorderComponents);
    }

    render() {
        var player = this.player;
        var info = <GamePlayerInfo player={player} />;

        var playerStack = <GameCardStack stack={player.viewStack} back={false} />;
        var playerDeck = <GameCardStack info={info} back={true} />;

        var id = player.isComputer ? 'computer' : 'user';

        return (
            <div id={id} className="player">
                {playerDeck}
                {playerStack}
            </div>
        );
    }    
    
}