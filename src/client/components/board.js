import React from 'react'
import Cell from './cell'
import * as tetrosType from '../constants/tetrosTypes'
import _ from 'lodash'

const translateTetro = (tetro) => {
    let ret = []
    const mat = tetro.matrix[tetro.orientation]
    // console.log(mat);
    mat.forEach((index, y) => {
                // console.log({index,y});
        index.forEach((ind, x) => {
            if (ind !== 0) {
                ret.push(tetro.crd.x - x + 12 * (tetro.crd.y + y))
            }
        })
    })
    return ret
}

const manageBarTetro = (boardAndTetro, translatedTetro, tetro) => {
    let flag = 0;
    translatedTetro.forEach((e) => {
        if (tetro.type === tetrosType.BARTOP && flag === 0) {
            tetro.orientation ? boardAndTetro[e] = tetrosType.BARBOT : boardAndTetro[e] = tetrosType.BARLEFT;
            flag++
        }
        else if (tetro.type === tetrosType.BARTOP && (flag === 1 || flag == 2)) {
            tetro.orientation ? boardAndTetro[e] = tetrosType.BARMIDV : boardAndTetro[e] = tetrosType.BARMIDH;
            flag++
        }
        else if (tetro.type === tetrosType.BARTOP && flag === 3)
            tetro.orientation ? boardAndTetro[e] = tetrosType.BARTOP : boardAndTetro[e] = tetrosType.BARRIGHT;
        else
            boardAndTetro[e] = tetro.type
    })
    return boardAndTetro
}

const Board = ({tetro, board, actions}) => {
    let boardAndTetro = [...board];
    let cells = [];

    if (!_.isEmpty(tetro)) {
        const translatedTetro = translateTetro(tetro);
        boardAndTetro = manageBarTetro(boardAndTetro, translatedTetro, tetro)
    }
        for (let i = 12; i < 252; i++) {
            cells.push(
                <Cell
                    key={i}
                    type={boardAndTetro[i]} />
            )
        }
        cells.reverse();

    return (
        <div className="board">
            {cells}
        </div>
    )
};

export default Board
