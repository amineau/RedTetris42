import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props)
        // console.log(this.props.players)
        this.state = {name: "bob",
                    playerNameChecked: false}
        this.handleNameChange = this.handleNameChange.bind(this)
    }

    handleNameChange(event) {
        const cmp = this.props.players.find((e) => {
            return event.target.value === e
        })
        this.setState({name: event.target.value})
        if (cmp === undefined)
            this.setState({playerNameChecked: true})
        else
            this.setState({playerNameChecked: false})

    }

    render() {
        const enabledButtons = 
                    <div className={"homeButtonContainer"}>
                        <div className={"homeButton"}>
                            <div className={"cursor"}></div>
                            <Link to='/game'><h1>create game</h1></Link>
                        </div>
                        <div className={"homeButton"}>
                            <div className={"cursor"}></div>
                            <Link to='/game'><h1>join game</h1></Link>
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

        return (
            <div className={"home"}>
                <div className={"homeImage"}></div>
                <div className={"homeMenu"}>
                    <label style={{ fontSize: "30px" }}>
                        Player name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} maxLength="5"/>
                    </label>
                    { buttons }
                    <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
                </div>
            </div>
        )
    }
};

export default Home