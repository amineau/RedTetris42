import React from 'react'

const Cell = ({type}) => {
    const colors = [
        "white",
        "tetroT",
        "L",
        "Linv",
        "yellow",
        "Sinv",
        "yellow",
        "yellow",
        "brick"]

    return (
        <div className={"cell " + colors[type]}></div>
    )
};

export default Cell