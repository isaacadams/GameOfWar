var GameCardStack = require('./GameCardStack.jsx').GameCardStack;
var GamePlayerInfo = require('./GamePlayerInfo.jsx').GamePlayerInfo;
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
            var self = this;
            var trigger = self.player.isComputer && (window.innerWidth >= this.widthBoundary !== this.state.OverWidth);

            if (trigger) {
                Switch();
            }

            function Switch() {
                //If the current state is OverWidth: false, then that means it is transitioning to OverWidth: true
                var $computer = jquery('#computer');
                var $deck = $computer.children().first();
                $deck.remove();
                $computer.children().after($deck);

                if(!self.state.OverWidth) {
                    $computer.parentsUntil('','.panel').css('width','max-content');
                }
                else {
                    $computer.parentsUntil('','.panel').css('width','');
                }                   
                
                self.state.OverWidth = !self.state.OverWidth;
            }
            
        };

        if(this.player.isComputer)
            window.addEventListener('resize', this.ReorderComponents);
    }

    componentDidMount() {        
        if(this.player.isComputer)
            this.ReorderComponents();
    }

    render() {
        var player = this.player;
        var info = <GamePlayerInfo player={player} />;

        var playerStack = <GameCardStack stack={player.viewStack} back={false} />;
        var playerDeck = <GameCardStack info={info} back={true} />;

        var id = player.isComputer ? 'computer' : 'user';

        return (
            <div id={id} className="player">
                {playerDeck}{playerStack}
            </div>
        );
    }    
    
}