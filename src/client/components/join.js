import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'


class Join extends React.Component {
    constructor(props) {
        super(props)
        this.playerName = props.playerName
    }

    joinRoom(name) {
        this.props.socket.emit('room', {
            type: 'join',
            room: {
                name,
            },
            player: {
                name: this.playerName,
            },
        })
    }

    render() {
        let room_list = (
            <div className={"homeButton"}>
                <h1>No game</h1>
            </div>
        )


        const listRoomFilter = this.props.room
        if (!_.isEmpty(listRoomFilter)) {
            room_list = listRoomFilter.map((item, index) => {
                const disabled = item.state === 1 ? " disabledButton" : ""
                const disabledLink = item.state === 1 ? "disabledLink" : ""
                return (
                    <div className={"homeButton"}>
                        <div className={"cursor" + disabled}></div>
                        <Link to={`/${item.name}[${this.playerName}]`} onClick={() => this.joinRoom(item.name)} className={disabledLink + disabled}>
                            <h1 className={disabled}>{item.name} - {item.player.length} player{item.player.length > 1 ? "s" : ""}</h1>
                        </Link>
                    </div>
                )
            })
        }
        return (                   
                <div className={"joinButtonContainer menu"}>
                    {room_list}
                </div>
        )
    }
}

export default Join