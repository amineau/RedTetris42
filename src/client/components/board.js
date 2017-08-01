import React from 'react'
import Cell from './cell'

const translateTetro = (tetro) => {
    let ret = []
    const mat = tetro.matrix.valueOf()
    // console.log(mat);
    mat.forEach((index, y) => {
                // console.log({index,y});
        index.forEach((ind, x) => {
            if (ind !== 0) {
                ret.push(tetro.crd.x - x + 10 * (tetro.crd.y + y))
            }
        })
    })
    return ret
}

const Board = ({tetro, board, actions}) => {
    let boardAndTetro = [...board];
    const translatedTetro = translateTetro(tetro);
    translatedTetro.forEach((e) => {
        boardAndTetro[e] = tetro.type
    })
    let cells = [];
    for (let i = 0; i < 200; i++) {
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