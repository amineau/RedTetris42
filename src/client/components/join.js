import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'


class Join extends React.Component {
    constructor(props) {
        super(props)
        this.playerName = props.playerName
       
        props.socket.emit('list game')
    }

    render() {
        let list_rooms = (
            <div className={"homeButton"}>
                <h1>No game</h1>
            </div>
        )

        if (!_.isEmpty(this.props.list_rooms)) {
            list_rooms = this.props.list_rooms.map((item, index) => (
                <div className={"homeButton"}>
                    <div className={"cursor"}></div>
                    <Link to={`/game/${item.name}[${this.playerName}]`}>
                        <h1 key={index}>{item.name} - {item.player.length} player{item.player.length > 1 ? "s" : ""}</h1>
                    </Link>
                </div>
            ))
        }
        return (
            <div className={"homeMenu"}>                    
                <div className={"joinButtonContainer"}>
                    {list_rooms}
                </div>
            </div>
        )
    }
}

export default Join