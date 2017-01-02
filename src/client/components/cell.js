import React from 'react'

class Cell extends React.Component {
    render(){
        let color;
        const tetro = this.props.tetro.crd;
        const structure = this.props.structure;

        var findCrd = (e) => {
            return e.crd.find((el) => {return el === this.props.nbr});
        };

        var findInStruct = () => {
            structure.forEach((e) => {
                if (findCrd(e))
                    color = e.color;
            });
            if (color)
                return color;
            return "white";
        };

        if (tetro.find((e) => {return e === this.props.nbr}))
            color = this.props.tetro.color;
        else 
            color = findInStruct();
            
        return (
            <div className={color + " cell"}>
            </div>
        )
    }
}

export default Cell