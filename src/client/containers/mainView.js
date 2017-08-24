import React from 'react'
import Board from '../components/board'
import Shadow from '../components/shadow'
import Preview from '../components/preview'
import Score from '../components/score'
import Panel from '../components/panel'


class MainView extends React.Component {
    constructor(props) {
        super(props)
        // console.log({props})
        this.state = {
            pause: true,
            antiRepeatFlag: false,
        }
        this.socket = props.socket
        window.addEventListener("keydown",(e) => {
            if (e.keyCode === 13)
                this.handlePause()
            if (this.state.pause === false && this.state.antiRepeatFlag === false) {
                switch (e.keyCode) {
                    case 37: this.props.actions.left(); break;
                    case 39: this.props.actions.right(); break;
                    case 40: this.props.actions.fall(); break;
                    case 38: this.props.actions.rotate(); break;
                    case 32: this.props.actions.dive(); break;
                }
                this.setState({antiRepeatFlag: true})
                setTimeout(() => {this.setState({antiRepeatFlag: false})}, 10)
            }
        });
    }

    componentDidMount() {
        this.socket.emit('init')
    }


    handlePause() {
        if (this.state.pause === true) {
            const intervalID = setInterval(() => this.props.actions.fall(), 1000);
            this.setState({pause: false, intervalID })
        }
        else {
            clearInterval(this.state.intervalID);
            this.setState({pause: true})
        }
        console.log({pause: this.state.pause})
    }


    render() {
        if (this.props.board) {
            return (
                <div className={"mainView"}>
                    <div className={"shadowLeftPart"}>
                        <Shadow board={this.props.board} side={"left"} /> 
                        <Shadow board={this.props.board} side={"left"} /> 
                    </div>
                    <div className={"boardMainPart"}>
                        <Board tetro={this.props.tetro} board={this.props.board} actions={this.props.actions.fall}/>
                        <div className={"boardInfoPart"}>
                            <Score score={"4242"}/>
                            <Panel name={"lines"} info={"42"}/>
                            <Preview tetro={this.props.nextTetro} />
                        </div>
                    </div>
                    <div className={"shadowRightPart"}>
                        <Shadow board={this.props.board} side={"right"}/> 
                        <Shadow board={this.props.board} side={"right"}/> 
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default MainView