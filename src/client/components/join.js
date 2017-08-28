import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'


class Join extends React.Component {
    constructor(props) {
        super(props)
        this.playerName = props.playerName
    }

    render() {
        let room_list = (
            <div className={"homeButton"}>
                <h1>No game</h1>
            </div>
        )

        console.log({props: this.props})

        if (!_.isEmpty(this.props.list.room)) {
            room_list = this.props.list.room.map((item, index) => (
                <div className={"homeButton"}>
                    <div className={"cursor"}></div>
                    <Link to={`/game/${item.name}[${this.playerName}]`}>
                        <h1>{item.name} - {item.player.length} player{item.player.length > 1 ? "s" : ""}</h1>
                    </Link>
                </div>
            ))
        }
        return (                   
                <div className={"joinButtonContainer menu"}>
                    {room_list}
                </div>
        )
    }
}

export default Join