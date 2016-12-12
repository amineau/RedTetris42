import React from 'react'
import Cell from './cell'

class Board extends React.Component {
    render() {
        const cells = [];
        for (let i = 0; i < 200; i++) {
            cells.push(<Cell key={i} nbr={i} piece={this.props.piece}/>)
        }
        return (
            <div>
            <p>{this.props.test}</p>
            <div className="board">
                {cells}
            </div>
            </div>
        )
    }
}

export default Board