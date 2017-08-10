import React from 'react'
import Board from '../components/board'
import Shadow from '../components/shadow'
import Preview from '../components/preview'
import Score from '../components/score'
import Panel from '../components/panel'
// import Preview from '../components/preview'

const MainView = ({tetro, nextTetro, board, actions}) => {
    return (
        <div className={"mainView"}>
            <div className={"shadowLeftPart"}>
                <Shadow board={board} /> 
                <Shadow board={board} /> 
            </div>
            <div className={"boardMainPart"}>
                <Board tetro={tetro} board={board} actions={actions.fall}/>
                <div className={"boardInfoPart"}>
                    <Score score={"4242"}/>
                    <Panel name={"lines"} info={"42"}/>
                    <Preview tetro={nextTetro} />
                </div>
            </div>
            <div className={"shadowRightPart"}>
                <Shadow board={board} /> 
                <Shadow board={board} /> 
            </div>
        </div>
    )
}

export default MainView