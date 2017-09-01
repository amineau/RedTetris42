import * as types from '../constants/ActionTypes'

export const fall = () => {
    return {
        type: types.FALL,
    }
}

export const dive = () => {
    return {
        type: types.DIVE,
    }
}

export const left = () => {
    return {
        type: types.LEFT,
    }
}

export const right = () => {
    return {
        type: types.RIGHT,
    }
}

export const rotate = () => {
    return {
        type: types.ROTATE,
    }
}

export const room_exit = () => {
    return {
        type: types.ROOM_EXIT,
    }
}

export const playerName = (name = null) => {
    return {
        type: types.PLAYER_NAME,
        name
    }
}

export const test = () => {
    return {
        type: types.ADD_LINE,
    }
}