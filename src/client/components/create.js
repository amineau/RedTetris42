import React from 'react'
import { Link } from 'react-router-dom'

class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: `${props.playerName}'s room`,
            roomNameChecked: this.compareRoomsName(`${props.playerName}'s room`)
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.createRoom = this.createRoom.bind(this)
    }

    createRoom(event) {
        this.props.socket.emit('room', {
            type: 'create',
            room: {
                name: this.state.name,
            },
            player: {
                name: this.props.playerName,
            },
        })
    }

    handleNameChange(event) {
        if (this.compareRoomsName(event.target.value))
            this.setState({roomNameChecked: true})
        else
            this.setState({roomNameChecked: false})
        this.setState({name: event.target.value})
    }

    compareRoomsName(name) {
        const cmp = this.props.list.room.find((e) => {
            return name === e.name
        })
        return !cmp && name !== ""

    }

    render() {
        const linkClass = this.state.roomNameChecked ? "" : "disabledLink"
        const disabledClass = this.state.roomNameChecked ? "" : " disabledButton"

        return (
            <div className={"menu"}>
                <form  onSubmit={(e) => {e.preventDefault()}}>
                    <label style={{ fontSize: "30px" }}>
                        Room name:
                        <input className={"roomNameInput" + disabledClass} type="text" value={this.state.name} onChange={this.handleNameChange} maxLength="50"/>
                    </label>
                </form>
                    <div className={"homeButtonContainer"}>
                    <div className={"homeButton"}>
                        <div className={"cursor" + disabledClass}></div>
                        <Link to={`/${this.state.name}[${this.props.playerName}]`} onClick={this.createRoom} className={linkClass}>
                            <h1 className={disabledClass}>ok</h1>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default Create