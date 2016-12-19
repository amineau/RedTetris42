import React from 'react'

class Cell extends React.Component {
    render(){
        let color;
        const tetro = this.props.tetro.crd;
        const structure = this.props.structure
        if (tetro.find((e) => {return e === this.props.nbr}))
            color = this.props.tetro.color;
        else if (structure.find((e) => {return e === this.props.nbr}))
            color = "red";
        else {
            color = "white";
        }
        return (
            <div className={color + " cell"}>
            </div>
        )
    }
}

export default Cell