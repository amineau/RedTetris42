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
        this.handleNameSubmit = this.handleNameSubmit.bind(this)
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleNameSubmit(event) {
        event.preventDefault()        
        const cmp = this.props.list.room.find((e) => {
            return this.state.name === e.name
        })
        if (cmp === undefined && this.state.name !== ""){
            this.setState({roomNameChecked: true})
        } else {
            this.setState({roomNameChecked: false})
        }
    }

    render() {
        const enabledButtons = 
                    <div className={"homeButtonContainer"}>
                        <div className={"homeButton"}>
                            <div className={"cursor"}></div>
                            <Link to='/'><h1>cancel</h1></Link>
                        </div>
                        <div className={"homeButton"}>
                            <div className={"cursor"}></div>
                            <Link to={`/game/${this.state.name}[${this.props.playerName}]`}><h1>ok</h1></Link>
                        </div>
                    </div>

        const disabledButtons = 
                    <div className={"homeButtonContainer"}>
                        <div className={"homeButton"}>
                            <div className={"cursor"}></div>
                            <Link to='/'><h1>cancel</h1></Link>
                        </div>
                        <div className={"homeButton"}>
                            <h1 className={"disabledButton"}>ok</h1>
                        </div>
                    </div>
        const buttons = this.state.roomNameChecked ? enabledButtons : disabledButtons
        let inputClass = "roomNameInput"
        !this.state.roomNameChecked ? inputClass += " disabledButton" : 0

        return (
            <div className={"home"}>
                <div className={"homeMenu"}>
                    <form onSubmit={this.handleNameSubmit}>
                        <label style={{ fontSize: "30px" }}>
                            Room name:
                            <input className={inputClass} type="text" value={this.state.name} onChange={this.handleNameChange} maxLength="50"/>
                        </label>
                    </form>
                    { buttons }
                    <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
                </div>
            </div>
        )
    }
};

export default Create