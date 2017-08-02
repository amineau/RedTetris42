import React from 'react'
import Cell from './cell'

function findHighestCell(e) {
    let crds = [];
    for(let i = 0; i < 200; i++) {
        if (e[i] != 0)
            crds.push(i);
    }
    let tmp = [10]
    tmp.fill(0)
    for(let i = 0; i < 10; i++) {
        for (let j = 0; j < crds.length; j++) {
            if (crds[j] % i === 0 && crds[j] > tmp[i])
                tmp[i] = crds[j]
        }
    }
    return tmp;
}

function getShadow(tab, color) {
    for (let i = 9; i >= 0; i--) {
        let flag = false;
        for (let j = 190 + i; j >= 0; j -= 10) {
            if (tab[j] !== 0 || flag === true) {
                tab[j] = color
                flag = true
            }
        }
    }
    return tab
}

const Shadow = ({board}) => {
    const color = 4
    let shadow = getShadow([...board], color)
    shadow.forEach((e, i) => {
    if (i % 12 === 0 || i % 12 === 11 || i < 12)
        shadow[i] = 8
    })
    shadow.reverse()
    const cells = [];
    for (let i = 12; i < 252; i++) {
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