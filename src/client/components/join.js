import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'


class Join extends React.Component {
    constructor(props) {
        super(props)
        this.playerName = props.playerName
       
        props.socket.emit('join game')
    }

    render() {
        let list_rooms = (<h1>No game</h1>)

        if (!_.isEmpty(this.props.list_rooms)) {
            list_rooms = this.props.list_rooms.map((item, index) => (
                <Link to={`/game/${item.name}[${this.playerName}]`}>
                <div className={"cursor"}></div>
                    <h1 key={index}>{item.name} - {item.player.length} player{item.player.length > 1 ? "s" : ""}</h1>
                </Link>
            ))
        }
        return (
            <div className={"homeButtonContainer"}>
                <div className={"homeMenu"}>                    
                    <div className={"homeButton"}>
                        {list_rooms}
                    </div>
                </div>
            </div>
        )
    }
}

export default Join