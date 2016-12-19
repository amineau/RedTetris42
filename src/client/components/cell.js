import React from 'react'

class Cell extends React.Component {
    render(){
        let color;
        const crd = this.props.tetro.crd;
        if (crd.find((e) => {return e === this.props.nbr}))
            color = this.props.tetro.color;
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