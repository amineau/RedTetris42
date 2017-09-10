import React from 'react'

const Panel = ({name, info = 0}) => {
    return (
        <div className={"panel"}>
            <h1>
                {name}<br/>
                {info}
            </h1>
        </div>
    )
}

export default Panel