import React from 'react';

class Card extends React.Component{
    render() {
        return (
            <div>
            {this.props.name}
                </div>
        )
    }
}

export default Card;