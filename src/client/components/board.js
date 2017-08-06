import React from 'react'
import Cell from './cell'

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
        if (tetro.type === 4 && flag === 0) {
            tetro.orientation ? boardAndTetro[e] = 10 : boardAndTetro[e] = 12;
            flag++
        }
        else if (tetro.type === 4 && (flag === 1 || flag == 2)) {
            tetro.orientation ? boardAndTetro[e] = 9 : boardAndTetro[e] = 13;
            flag++
        }
        else if (tetro.type === 4 && flag === 3)
            tetro.orientation ? boardAndTetro[e] = 4 : boardAndTetro[e] = 14;
        else
            boardAndTetro[e] = tetro.type
    })
    return boardAndTetro
}

const Board = ({tetro, board, actions}) => {
    let boardAndTetro = [...board];
    const translatedTetro = translateTetro(tetro);
    boardAndTetro = manageBarTetro(boardAndTetro, translatedTetro, tetro)

    let cells = [];
    for (let i = 12; i < 252; i++) {
        cells.push(
            <Cell
                key={i}
                type={boardAndTetro[i]}
                orientation={tetro.orientation} />
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
