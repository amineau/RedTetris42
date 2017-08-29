import React from 'react'

const Cell = ({type, shadow}) => {

    const colors = [
        "white",
        "T",
        "L",
        "Linv",
        "barTop",
        "Sinv",
        "S",
        "square",
        "brick",
        "barMidV",
        "barBot",
        "block",
        "barLeft",
        "barMidH",
        "barRight"
    ]

    let cellType = ""
    shadow ? cellType = "shadowCell " : cellType = "cell "

    return (
        <div className={cellType + colors[type]}></div>
    )
};

export default Cell