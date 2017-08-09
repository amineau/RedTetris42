import React from 'react'

const Home = () => {
    return (
        <div className={"home"}>
            <div className={"homeImage"}></div>
            <div className={"homeMenu"}>
                <h1></h1>
                <div className={"homeButtonContainer"}>
                    <div className={"homeButton"}>
                        <div className={"cursor"}></div>
                        <a href="#"><h1> create game</h1></a>
                    </div>
                    <div className={"homeButton"}>
                        <div className={"cursor"}></div>
                        <a href="#"><h1>join game</h1></a>
                    </div>
                </div>
                <h1 className={"copyright"}>&copy;2017 amineau tpierron</h1>
            </div>
        </div>
    )
};

export default Home