import React from 'react'
import Cell from './cell'

function concatCrdStruct(e) {
    let res = [];
    e.forEach((el) => {
        res = res.concat(el.crd);
    });
    return res;
}

function findHighestCell(e) {
    // console.log(e);
    let res = [];
    for(let i = 0; i <= 9; i++) {
        let ret = e.filter((el) => {
            return el % 10 === i
        });
        // console.log(Math.min(ret))
        res = res.concat(Math.min(...ret)); 
    }
    return res;
}

function getShadow(e) {
    let res = [];
    e.forEach((el) => {
        let ret = [el];
        while (Math.max(...ret) < 200) {
            console.log(ret);
            ret.push(Math.max(...ret) + 10);
        }
        // console.log(ret);
        res = res.concat(ret);
    });
    return res;
}

class Shadow extends React.Component {
    render() {
        const crd = concatCrdStruct(this.props.structure);
        const high = findHighestCell(crd);
        const shadow = getShadow(high);
        const cells = [];
        for (let i = 0; i < 200; i++) {
            cells.push(
                <Cell
                    key={i}
                    nbr={i}
                    tetro={{crd: [-1]}}
                    structure={[{crd :shadow, color: "red"}]} />
            )
        }
        return (
            <div className="board">
                {cells}
            </div>
        )
    }
}

export default Shadow