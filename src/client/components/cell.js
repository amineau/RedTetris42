import React from 'react'

const Cell = ({type}) => {
    const colors = [
        "white",
        "T",
        "L",
        "Linv",
        "yellow",
        "Sinv",
        "S",
        "square",
        "brick"]

    return (
        <div className={"cell " + colors[type]}></div>
    )
};

export default Cell