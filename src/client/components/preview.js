import React from 'react'
import Cell from './cell'

const Preview = ({tetro}) => {
    const type = [
        [],
        [0,0,0,0,
        1,1,1,0,
        0,1,0,0,
        0,0,0,0],

        [0,0,0,0,
        2,2,2,0,
        2,0,0,0,
        0,0,0,0],

        [0,0,0,0,
        3,3,3,0,
        0,0,3,0,
        0,0,0,0],

        [0,0,0,0,
        4,4,4,4,
        0,0,0,0,
        0,0,0,0],

        [0,0,0,0,
        5,5,0,0,
        0,5,5,0,
        0,0,0,0],

        [0,0,0,0,
        0,6,6,0,
        6,6,0,0,
        0,0,0,0],

        [0,0,0,0,
        0,7,7,0,
        0,7,7,0,
        0,0,0,0]
    ]
    const next = type[tetro.type]

    let cells = [];
    for (let i = 0; i < 16; i++) {
        cells.push(
            <Cell
                key={i}
                type={next[i]} />
        )
    }
    return (
        <div className={"previewContainer"}>
            <div className="preview">
                {cells}
            </div>
        </div>
    )
};

export default Preview