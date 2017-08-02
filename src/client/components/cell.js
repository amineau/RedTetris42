import React from 'react'

const Cell = ({type}) => {
    const colors = [
        "white",
        "red",
        "blue",
        "green",
        "yellow",
        "yellow",
        "yellow",
        "yellow",
        "black"]

    return (
        <div className={colors[type] + " cell"}></div>
    )
};

export default Cell