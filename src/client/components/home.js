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
        this.menuComponentName = null
        this.actions = props.actions
    }

    initState(name) {
        return (name && name !== 'playr') ? {
            name,
            playerNameChecked: true,
        } : {
            name: 'playr',
            playerNameChecked: false,
        }
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
        if (this.comparePlayersName(event.target.value))
            this.setState({playerNameChecked: true})
        else {
            this.setState({playerNameChecked: false})
        }
    }

    comparePlayersName(name) {
        const cmp = this.props.roomList.find( room => (
            room.players.find(player => (
                name.toLowerCase() === player.name.toLowerCase()
            ))
        ))
        return !cmp && name !== "playr" && name !== ""

    }

    createGame() {
        if (this.comparePlayersName(this.state.name)) {
            this.actions.playerName(this.state.name)
            this.menuComponentName = 'create'
        } else {
            this.menuComponentName = null
        }
        this.forceUpdate()
    }

    joinGame() {
        if (this.comparePlayersName(this.state.name)) {
            this.actions.playerName(this.state.name)
            this.menuComponentName = 'join'
        } else {
            this.menuComponentName = null
        }
        this.forceUpdate()
    }

    render() {
        const disabledClass = this.state.playerNameChecked ? "" : " disabledButton"
        let createClass = ''
        let joinClass = ''
        let menuComponent = null
        if (this.menuComponentName === 'create' && this.state.playerNameChecked) {
            menuComponent = (<Create
                socket={this.props.socket}
                roomList={this.props.roomList}
                playerName={this.state.name}/>)
            createClass = ' active'
            joinClass = ' notActive'
        } else if (this.menuComponentName === 'join' && this.state.playerNameChecked) {
            menuComponent = (<Join
                socket={this.props.socket}
                roomList={this.props.roomList}
                playerName={this.state.name}/>)
            createClass = ' notActive'
            joinClass = ' active'
        }
        let hightScores = [(
            <tr key={'-1'}>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Lines</th>
            </tr>
         )]
        if (this.props.hightScores){ 
            this.props.hightScores.forEach((elem, id) => {
                hightScores.push(
                <tr key={elem.id}>
                    <td>{id + 1}</td>
                    <td>{elem.player}</td>
                    <td>{elem.score}</td>
                    <td>{elem.lines}</td>
                </tr>)
            })
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
                        {menuComponent}
      
                        <table>
                            <tbody>
                                {hightScores}
                            </tbody>
                        </table>
                  
                    <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
                </div>
            </div>
        )
    }
};

export default Home