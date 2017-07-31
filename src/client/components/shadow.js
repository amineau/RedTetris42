import React from 'react'
import Cell from './cell'

function findHighestCell(e) {
    let res = [];
    for(let i = 0; i <= 9; i++) {
        let ret = e.filter((el) => {
            return el % 10 === i
        });
        res = res.concat(Math.min(...ret)); 
    }
    return res;
}

function getShadow(e) {
    let res = [];
    e.forEach((el) => {
        let ret = [el];
        while (Math.max(...ret) < 200) {
            ret.push(Math.max(...ret) + 10);
        }
        res = res.concat(ret);
    });
    return res;
}

const Shadow = ({board}) => {
    const color = 4
    const high = findHighestCell(board);
    let shadow = getShadow(high);
    shadow.forEach((e) => {
        e != 0 ? e = color : e = 0;
    })

    const cells = [];
    for (let i = 0; i < 200; i++) {
        cells.push(
            <Cell
                key={i}
                type={shadow[i]} />
        )
    }
    return (
        <div className="board">
            {cells}
        </div>
    )
};

export default Shadow