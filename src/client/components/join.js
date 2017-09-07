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

        const listRoomFilter = this.props.room
        if (!_.isEmpty(listRoomFilter)) {
            room_list = listRoomFilter.map((item, index) => (
                <div className={"homeButton"}>
                    <div className={"cursor"}></div>
                    <Link to={`/${item.name}[${this.playerName}]`} className={item.state === 1 ? "disabledLink" : ""}>
                        <h1>{item.name} - {item.player.length} player{item.player.length > 1 ? "s" : ""} -- Debug state: {item.state}</h1>
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