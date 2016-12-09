import React from 'react'

class Cell extends React.Component {
    render(){
        let color;
        if (this.props.piece[this.props.nbr])
            color = this.props.piece[this.props.nbr];
        else {
            color = "red";
        }
        return (
            <div className={color + " cell"}>
            </div>
        )
    }
}

export default Cell