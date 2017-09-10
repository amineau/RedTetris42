import React from 'react'

const Score = ({score = 0}) => {
    return (
        <div className={"score"}>
            <h1>score</h1>
            <h1>{score}</h1>
        </div>
    )
}

export default Score