import React from 'react'
import Cell from './cell'

class Board extends React.Component {
    render() {
        const cells = [];
        const piece = {81: "blue", 82: "blue", 83: "blue", 84: "blue",};
        for (let i = 0; i < 200; i++) {
            cells.push(<Cell key={i} nbr={i} piece={piece}/>)
        }
        return (
            <div className="board">
                {cells}
            </div>
        )
    }
}

export default Board