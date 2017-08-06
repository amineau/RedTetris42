import React from 'react'

const Cell = ({type, orientation}) => {

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

    return (
        <div className={"cell " + colors[type]}></div>
    )
};

export default Cell