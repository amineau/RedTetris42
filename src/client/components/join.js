import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'


class Join extends React.Component {
    constructor(props) {
        super(props)
        this.playerName = props.playerName
    }

    joinGame(name) {
        this.props.socket.emit('action', {
            type: 'server/join',
            game: {
                name,
            },
            player: {
                name: this.playerName,
            },
        })
    }

    render() {
        let game_list = (
            <div className={"homeButton"}>
                <h1>No game</h1>
            </div>
        )


        const listGameFilter = this.props.gameList
        if (!_.isEmpty(listGameFilter)) {
            game_list = listGameFilter.map((item, index) => {
                const disabled = item.state === 1 ? " disabledButton" : ""
                const disabledLink = item.state === 1 ? "disabledLink" : ""
                return (
                    <div className={"homeButton"} key={item.name} >
                        <div className={"cursor" + disabled}></div>
                        <Link to={`/${item.name}[${this.playerName}]`} onClick={() => this.joinGame(item.name)} className={disabledLink + disabled}>
                            <h1 className={disabled}>{item.name} - {item.players.length} player{item.players.length > 1 ? "s" : ""}</h1>
                        </Link>
                    </div>
                )
            })
        }
        return (                   
                <div className={"joinButtonContainer menu"}>
                    {game_list}
                </div>
        )
    }
}

export default Join