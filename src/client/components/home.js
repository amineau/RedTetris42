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
        this.menuComponent = {}
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
        if (this.comparePlayersName(event.target.value.toLowerCase()))
            this.setState({playerNameChecked: true})
        else {
            this.menuComponent = {}
            this.setState({playerNameChecked: false})
        }
    }

    comparePlayersName(name) {
        const cmp = this.props.list.player.find((e) => {
            return name === e.toLowerCase()
        })
        console.log({nameCompare:!cmp && name.toLowerCase() !== "playr" && name !== ""})
        return !cmp && name !== "playr" && name !== ""

    }

    createGame(event) {
        console.log('create')
        if (this.comparePlayersName(this.state.name)) {
            this.actions.playerName(this.state.name.toLowerCase())
            this.menuComponent = {
                name: 'create',
                component: (
                    <Create
                        socket={this.props.socket}
                        list={this.props.list}
                        playerName={this.state.name}/>
                )
            }
        } else {
            this.menuComponent = {}
        }
        this.forceUpdate()
    }

    joinGame(event) {
        console.log('join')
        if (this.comparePlayersName(this.state.name)) {
            this.actions.playerName(this.state.name)
            this.menuComponent = {
                name: 'join',
                component: (
                    <Join
                        socket={this.props.socket}
                        list={this.props.list}
                        playerName={this.state.name}/>
                )
            }
        } else {
            this.menuComponent = {}
        }
        this.forceUpdate()
    }

    render() {
        const disabledClass = this.state.playerNameChecked ? "" : " disabledButton"
        let createClass = ''
        let joinClass = ''
        console.log({join: this.menuComponent.name})
        if (this.menuComponent.name === 'create') {
            createClass = ' active'
            joinClass = ' notActive'
        } else if (this.menuComponent.name === 'join') {
            createClass = ' notActive'
            joinClass = ' active'
        }

        return (
            <div className={"home"}>
                <div className={"homeImage"}></div>
                <div className={"homeMenu"}>
                    <form onSubmit={(e) => {e.preventDefault()}}>
                        <label style={{ fontSize: "30px" }}>
                            Player name:
                            <input className={"playerNameInput" + disabledClass} type="text" value={this.state.name} onChange={this.handleNameChange} maxLength="5"/>
                        </label>
                    </form>
                        <div className={"homeButtonContainer"}>
                            <div className={"homeButton" + createClass}>
                                <span className={disabledClass} onClick={this.createGame}>create game</span>
                            </div>
                            <div className={"homeButton" + joinClass}>
                                <span className={disabledClass} onClick={this.joinGame}>join game</span>
                            </div>
                        </div>
                    {this.menuComponent.component}
                    <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
                </div>
            </div>
        )
    }
};

export default Home