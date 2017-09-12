import React from 'react'
import { Link } from 'react-router-dom'

class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: `${props.playerName}'s game`,
            gameNameChecked: this.compareGamesName(`${props.playerName}'s game`)
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.createGame = this.createGame.bind(this)
    }

    createGame(event) {
        this.props.socket.emit('action', {
            type: 'server/create',
            game: {
                name: this.state.name,
            },
            player: {
                name: this.props.playerName,
            },
        })
    }

    handleNameChange(event) {
        if (this.compareGamesName(event.target.value))
            this.setState({gameNameChecked: true})
        else
            this.setState({gameNameChecked: false})
        this.setState({name: event.target.value})
    }

    compareGamesName(name) {
        const cmp = this.props.gameList.find((game) => {
            return name === game.name
        })
        return !cmp && name !== ""

    }

    render() {
        const linkClass = this.state.gameNameChecked ? "" : "disabledLink"
        const disabledClass = this.state.gameNameChecked ? "" : " disabledButton"

        return (
            <div className={"menu"}>
                <form  onSubmit={(e) => {e.preventDefault()}}>
                    <label style={{ fontSize: "30px" }}>
                        Game name:
                        <input className={"gameNameInput" + disabledClass} type="text" value={this.state.name} onChange={this.handleNameChange} maxLength="50"/>
                    </label>
                </form>
                    <div className={"homeButtonContainer"}>
                    <div className={"homeButton"}>
                        <div className={"cursor" + disabledClass}></div>
                        <Link to={`/${this.state.name}[${this.props.playerName}]`} onClick={this.createGame} className={linkClass}>
                            <h1 className={disabledClass}>ok</h1>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default Create