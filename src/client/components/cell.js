import React from 'react'

const Cell = ({tetro, structure, nbr}) => {
    let color;

    const findCrd = (e) => {
        return e.crd.find((el) => {return el === nbr});
    };

    const findInStruct = () => {
        structure.forEach((e) => {
            if (findCrd(e))
                color = e.color;
        });
        if (color)
            return color;
        return "white";
    };

    if (tetro.crd.find((e) => {return e === nbr}))
        color = tetro.color;
    else 
        color = findInStruct();

    return (
        <div className={color + " cell"}></div>
    )
};

export default Cell