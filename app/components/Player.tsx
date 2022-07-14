import React from "react";
import MoroboxAIPlayer from 'moroboxai-player-react';

type PlayerProps = {
    id?: string;
    className?: string;
};

class Player extends React.Component<PlayerProps> {
    static propTypes: any;

    constructor(props) {
        super(props);
    }
  
    render() {
        const {id, className, ...props} = this.props;

        return (
            <>
                <MoroboxAIPlayer {...props}/>
            </>
        )
    }
}

Player.propTypes = {};

export default Player;