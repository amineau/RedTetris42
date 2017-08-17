import React from 'react'
import { Link } from 'react-router-dom'

const Home = (tetro, board, actions) => {
    return (
        <div className={"home"}>
            <div className={"homeImage"}></div>
            <div className={"homeMenu"}>
                <h1></h1>
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
                <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
            </div>
        </div>
    )
};

export default Home