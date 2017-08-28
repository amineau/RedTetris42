import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.initState(props.playerName)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNameSubmit = this.handleNameSubmit.bind(this)
        this.actions = props.actions
        console.log('props', props)
    }

    initState(name) {
        return (name && name !== 'playr') ? {
            name,
            playerNameChecked: true,
        } : {
            name: 'playr',
            playerNameChecked: false
        }
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleNameSubmit(event) {
        event.preventDefault()        
        const cmp = this.props.list.player.find((e) => {
            return this.state.name === e
        })
        if (cmp === undefined && this.state.name !== "playr" && this.state.name !== ""){
            this.setState({playerNameChecked: true})
            this.actions.playerName(this.state.name)
        } else {
            this.setState({playerNameChecked: false})
            this.actions.playerName()
        }
    }

    render() {
        const enabledButtons = 
                    <div className={"homeButtonContainer"}>
                        <div className={"homeButton"}>
                            <div className={"cursor"}></div>
                            <Link to='/create'><h1>create game</h1></Link>
                        </div>
                        <div className={"homeButton"}>
                            <div className={"cursor"}></div>
                            <Link to='/join'><h1>join game</h1></Link>
                        </div>
                    </div>

        const disabledButtons = 
                    <div className={"homeButtonContainer"}>
                        <div className={"homeButton"}>
                            <h1 className={"disabledButton"}>create game</h1>
                        </div>
                        <div className={"homeButton"}>
                            <h1 className={"disabledButton"}>join game</h1>
                        </div>
                    </div>
        const buttons = this.state.playerNameChecked ? enabledButtons : disabledButtons
        let inputClass = "playerNameInput"
        !this.state.playerNameChecked ? inputClass += " disabledButton" : 0

        return (
            <div className={"home"}>
                <div className={"homeImage"}></div>
                <div className={"homeMenu"}>
                    <form onSubmit={this.handleNameSubmit}>
                        <label style={{ fontSize: "30px" }}>
                            Player name:
                            <input className={inputClass} type="text" value={this.state.name} onChange={this.handleNameChange} maxLength="5"/>
                        </label>
                    </form>
                    { buttons }
                    <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
                </div>
            </div>
        )
    }
};

export default Home