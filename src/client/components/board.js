import React from 'react'
import Cell from './cell'


class Board extends React.Component {
    componentDidMount() {
        return (
            setInterval(() => {this.props.actions()}, 1000)
        )
    }
    render() {
        const cells = [];
        for (let i = 0; i < 200; i++) {
            cells.push(
                <Cell
                    key={i}
                    nbr={i}
                    tetro={this.props.tetro}
                    structure={this.props.structure} />
            )
        }
        return (
            <div className="board">
                {cells}
            </div>
        )
    }
}

export default Board