import React from 'react'
import { Link } from 'react-router-dom'

class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: `${props.playerName}'s room`,
            roomNameChecked: true
        }
        this.handleNameChange = this.handleNameChange.bind(this)
    }

    handleNameChange(event) {
        if (this.comparePlayersName(event.target.value))
            this.setState({roomNameChecked: true})
        else
            this.setState({roomNameChecked: false})
        this.setState({name: event.target.value})
    }

    comparePlayersName(name) {
        const cmp = this.props.list.room.find((e) => {
            return name === e
        })
        console.log({nameRoomCompare:!cmp && name !== "playr" && name !== ""})
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
                        <Link to={`/game/${this.state.name}[${this.props.playerName}]`} className={linkClass}>
                            <h1 className={disabledClass}>ok</h1>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default Create