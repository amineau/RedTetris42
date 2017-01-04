import React from 'react'
import Cell from './cell'

const Board = ({tetro, structure, actions}) => {

    let cells = [];
    for (let i = 0; i < 200; i++) {
        cells.push(
            <Cell
                key={i}
                nbr={i}
                tetro={tetro}
                structure={structure} />
        )
    }

    return (
        <div className="board">
            {cells}
        </div>
    )
};

export default Board