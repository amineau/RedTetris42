import React from 'react'
import Cell from './cell'
import { TYPESMATRICES } from '../constants/typesMatrices'
import _ from 'lodash'

const Preview = ({tetro}) => {
    let cells = [];
    if (!_.isEmpty(tetro)){
        const next = TYPESMATRICES[tetro.type]

        for (let i = 0; i < 16; i++) {
            cells.push(
                <Cell
                    key={i}
                    type={next[i]} />
            )
        }
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