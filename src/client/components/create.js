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
        const buttonClass = this.state.roomNameChecked ? "" : "disabledLink"
        const titleClass = this.state.roomNameChecked ? "" : "disabledButton"
        let inputClass = "roomNameInput"
        !this.state.roomNameChecked ? inputClass += " disabledButton" : 0

        return (
            <div className={"home"}>
                <div className={"homeMenu"}>
                    <form  onSubmit={(e) => {e.preventDefault()}}>
                        <label style={{ fontSize: "30px" }}>
                            Room name:
                            <input className={inputClass} type="text" value={this.state.name} onChange={this.handleNameChange} maxLength="50"/>
                        </label>
                    </form>
                     <div className={"homeButtonContainer"}>
                        <div className={"homeButton"}>
                            <div className={"cursor"}></div>
                            <Link to={`/game/${this.state.name}[${this.props.playerName}]`} className={buttonClass}>
                                <h1 className={titleClass}>ok</h1>
                            </Link>
                        </div>
                    </div>
                    <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
                </div>
            </div>
        )
    }
};

export default Create