import React from 'react'

const Cell = ({type}) => {
    const colors = [
        "white",
        "tetroT",
        "blue",
        "green",
        "yellow",
        "yellow",
        "yellow",
        "yellow",
        "black"]

    return (
        <div className={"cell " + colors[type]}></div>
    )
};

export default Cell