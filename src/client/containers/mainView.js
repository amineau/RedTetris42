import React from 'react'
import Board from '../components/board'
import Shadow from '../components/shadow'
import Preview from '../components/preview'
import Score from '../components/score'
import Panel from '../components/panel'


class MainView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pause: true,
            state: props.room.state,
            antiRepeatFlag: false,
        }
        this.socket = props.socket
        this.gameStartSubmit = this.gameStartSubmit.bind(this)
    }

    onKeydown (e) {
        // if (e.keyCode === 13  && this.props.room.state === 1)
        //     this.handlePause()
        // if (this.state.pause === false && this.state.antiRepeatFlag === false) {
        if (this.state.antiRepeatFlag === false) {
            console.log({keycode:e.keyCode})
            switch (e.keyCode) {
                case 37: this.props.actions.left(); break;
                case 39: this.props.actions.right(); break;
                case 40: this.props.actions.fall(); break;
                case 38: this.props.actions.rotate(); break;
                case 32: this.props.actions.dive(); break;
                case 53: this.props.actions.test(); break;
            }
            this.setState({antiRepeatFlag: true})
            setTimeout(() => {this.setState({antiRepeatFlag: false})}, 10)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.room.state === 1 && this.props.room.state !== 1) {
            const intervalID = setInterval(() => this.props.actions.fall(), 1000);
            this.setState({pause: false, intervalID })
        } else if (nextProps.room.state !== 1 && this.props.room.state === 1) {
            clearInterval(this.state.intervalID);            
        }
    }

    componentDidMount() {
        console.log('MainView componentDidMount')
        window.addEventListener("keydown", this.onKeydown.bind(this))
        this.socket.emit('room', {
            type: 'createOrJoin',
            room: {
                name: this.props.room.name,
            },
            player: {
                name: this.props.player.name,
            },
        })
    }

    componentWillUnmount() {
        console.log('MainView componentWillUnmount')
        clearInterval(this.state.intervalID);
        window.removeEventListener("keydown", this.onKeydown.bind(this))
        this.props.actions.room_exit()
        this.socket.emit('room', {
            type: 'exit',
            room: {
                name: this.props.room.name,
            },
        })
    }


    // handlePause() {
    //     if (this.state.pause === true) {
    //         const intervalID = setInterval(() => this.props.actions.fall(), 1000);
    //         this.setState({pause: false, intervalID })
    //     }
    //     else {
    //         clearInterval(this.state.intervalID);
    //         this.setState({pause: true})
    //     }
    // }

    gameStartSubmit(event) {
        event.preventDefault()
        this.socket.emit('room', {
            type: "start",
            room: {
                name: this.props.room.name
            }
        })
    }

    statusGame () {
        switch (this.props.room.state) {
            case 0:
                if (this.props.room.leader === this.props.player.name)
                    return (
                        <div className={"statusGame"}>
                            <div className={"cursor"}></div>
                            <h1 onClick={this.gameStartSubmit}>start game</h1>
                        </div>
                    )
                else
                    return (
                        <div className={"statusGame"}>
                           <h1>waiting for start game</h1>
                        </div>
                    )
            case 2:
                if (this.props.room.leader === this.props.player.name)
                    return (
                        <div className={"statusGame"}>
                            <div className={"cursor"}></div>
                            <h1 onClick={this.gameStartSubmit}>restart game</h1>
                        </div>
                    )
                else
                    return (
                        <div className={"statusGame"}>
                            <h1>waiting for restart game</h1>
                        </div>
                    )
            default:
                return null
        }
    }


    render() {
        if (this.props.room.state !== undefined) {
            const list_shadows = this.props.room.players
                .filter(e => e.name !== this.props.player.name)
                .map( item => <Shadow board={item.board} name={item.name} side={"left"} />)
            let statusGame = null

            return (
                <div className={"mainView"}>
                    <div className={"shadowLeftPart"}>
                        {list_shadows}
                    </div>
                    <div className={"boardMainPart"}>
                        <Board 
                            tetro={this.props.tetro}
                            board={this.props.board}
                            actions={this.props.actions.fall}
                            linesDeleted={this.props.linesDeleted}
                            message={this.statusGame()}
                        />
                        <div className={"boardInfoPart"}>
                            <Score score={this.props.score}/>
                            <Panel name={"lines"} info={"42"}/>
                            <Preview tetro={this.props.nextTetro} />
                        </div>
                    </div>
                    <div className={"shadowRightPart"}>
                    
                    </div>
                </div>
            )
        }
        return null
        // switch (this.props.room.state) {
        //     case 2:
        //         return (<div className={"mainView"}>END</div>)
        //     case 0:
        //         const list_players = this.props.room.players.map( item => {
        //             const name = item.name
        //             let classPlayer = name === this.props.player.name ? "green-text" : ""
        //             return (
        //                 <div className={"homeButton"}>
        //                     <h1 className={classPlayer}>{name}{name === this.props.room.leader ? " (L)" : ""}</h1>
        //                 </div>
        //             )
        //         })
        //         const button = this.props.room.leader === this.props.player.name ? (
        //             <form onSubmit={this.gameStartSubmit}>
        //                 <div className={"homeButton"}>
        //                     <input type="submit" value="Start Game"/>
        //                 </div>
        //             </form>
        //         ) : (
        //             <h1>waiting for start game</h1>
        //         )
        //         return (<div className={"mainView"}>
        //              <div className={"homeMenu"}>   
        //                 <div className={"joinButtonContainer"}>
        //                     {list_players}
        //                 </div>
        //                 {button}
        //             </div>
        //         </div>)
        //     default:
        //         return (<div className={"mainView"}>default</div>)
        // }
    }
}

export default MainView