import React from 'react'

class Cell extends React.Component {
    render(){
        let color;
        const crd = this.props.piece.crd;
        if (crd.find((e) => {return e === this.props.nbr}))
            color = this.props.piece.color;
        else {
            color = "yellow";
        }
        return (
            <div className={color + " cell"}>
            </div>
        )
    }
}

export default Cell