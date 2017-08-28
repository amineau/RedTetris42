import React from 'react'
import { Link } from 'react-router-dom'
import Join from './join'
import Create from './create'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.initState(props.playerName)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.createGame = this.createGame.bind(this)
        this.joinGame = this.joinGame.bind(this)
        this.menuComponent = null
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
        if (this.comparePlayersName(event.target.value))
            this.setState({playerNameChecked: true})
        else
            this.setState({playerNameChecked: false})
    }

    comparePlayersName(name) {
        const cmp = this.props.list.player.find((e) => {
            return name === e
        })
        console.log({nameCompare:!cmp && name !== "playr" && name !== ""})
        return !cmp && name !== "playr" && name !== ""

    }

    createGame(event) {
        console.log('create')
        if (this.comparePlayersName(this.state.name)) {
            this.actions.playerName(this.state.name)
            this.menuComponent = (
                <Create
                    socket={this.props.socket}
                    list={this.props.list}
                    playerName={this.state.name}/>
            )
        } else {
            this.menuComponent = null
        }
        this.forceUpdate()
    }

    joinGame(event) {
        console.log('join')
        if (this.comparePlayersName(this.state.name)) {
            this.actions.playerName(this.state.name)
            this.menuComponent = (
                <Join
                    socket={this.props.socket}
                    list={this.props.list}
                    playerName={this.state.name}/>
            )
        } else {
            this.menuComponent = null
        }
        this.forceUpdate()
    }

    render() {
        const buttonsClass = this.state.playerNameChecked ? "" : "disabledButtons"
        let inputClass = "playerNameInput"
        let menu
        !this.state.playerNameChecked ? inputClass += " disabledButton" : 0

        return (
            <div className={"home"}>
                <div className={"homeImage"}></div>
                <div className={"homeMenu"}>
                    <form onSubmit={(e) => {e.preventDefault()}}>
                        <label style={{ fontSize: "30px" }}>
                            Player name:
                            <input className={inputClass} type="text" value={this.state.name} onChange={this.handleNameChange} maxLength="5"/>
                        </label>
                    </form>
                        <div className={"homeButtonContainer"}>
                            <div className={"homeButton"}>
                                <div className={"cursor"}></div>
                                <button className={buttonsClass} value='create game' onClick={this.createGame}>create game</button>
                            </div>
                            <div className={"homeButton"}>
                                <div className={"cursor"}></div>
                                <button className={buttonsClass} value='join game' onClick={this.joinGame}>join game</button>
                            </div>
                        </div>
                    {this.menuComponent}
                    <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
                </div>
            </div>
        )
    }
};

export default Home