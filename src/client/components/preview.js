import React from 'react'
import Cell from './cell'

const Preview = ({tetro}) => {
    let next = []
    next.length = 36
    next.fill(0)
    next[7] = 2
    next[8] = 2
    next[9] = 2
    next[13] = 2
// next.reverse()
    let cells = [];
    for (let i = 0; i < 36; i++) {
        cells.push(
            <Cell
                key={i}
                type={next[i]} />
        )
    }
    return (
        <div className="preview">
            {cells}
        </div>
    )
};

export default Preview