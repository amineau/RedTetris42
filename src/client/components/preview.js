import React from 'react'
import Cell from './cell'
import { TYPESMATRICES } from '../constants/typesMatrices'

const Preview = ({tetro}) => {
    const next = TYPESMATRICES[tetro.type]

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