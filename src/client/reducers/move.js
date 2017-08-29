import { FALL, DIVE, LEFT, RIGHT, ROTATE, NEWTETRO, ROOM_INIT, ROOM_START, LIST, PLAYER_NAME } from '../constants/ActionTypes'
import * as tetrosTypes from '../constants/tetrosTypes'
import math from 'mathjs'

var array = require('lodash/array');

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const moveCheck = (state, move = FALL) => {
    const board = state.board
    const tetro = state.tetro
    let mat = tetro.matrix[tetro.orientation]
    let moveX = 0
    let moveY = 0

    switch(move){
        case FALL:
            moveY = -1; break
        case DIVE:
            moveY = -1; break
        case RIGHT:
            moveX = -1; break
        case LEFT:
            moveX = 1; break
        case ROTATE:
            mat = tetro.matrix[matriceRotate(tetro)]; break
    }
    let flag = true
    mat.forEach((index, y) => {
        index.forEach((ind, x) => {
            if (ind !== 0) {
                const cell = tetro.crd.x - x + moveX + 12 * (tetro.crd.y + y + moveY)
                if (board[cell]) {
                    flag = false
                }
            }
        })
    })
    return flag
}

const matriceRotate = (tetro) => {
    const nbrPosition = tetro.matrix.length
    return (tetro.orientation + 1) % nbrPosition
}

const writeTetroOnBoard = (state) => {
    let board = [...state.board]
    const tetro = state.tetro
    let flag = 0
    tetro.matrix[tetro.orientation].forEach((index, y) => {
        index.forEach((ind, x) => {
            const index = tetro.crd.x - x + 12 * (tetro.crd.y + y)
            if (ind !== 0) {
                if (tetro.type === tetrosTypes.BARTOP && flag === 0) {
                    tetro.orientation ? board[index] = tetrosTypes.BARBOT : board[index] = tetrosTypes.BARLEFT
                    flag++
                }
                else if (tetro.type === tetrosTypes.BARTOP && (flag === 1 || flag == 2)) {
                    tetro.orientation ? board[index] = tetrosTypes.BARMIDV : board[index] = tetrosTypes.BARMIDH
                    flag++
                }
                else if (tetro.type === tetrosTypes.BARTOP && flag === 3)
                    tetro.orientation ? board[index] = tetrosTypes.BARTOP : board[index] = tetrosTypes.BARRIGHT
                else
                    board[index] = tetro.type
            }
        })
    })
    return board
}

const completeLine = board => {
    let lines = []
    for(let y = 1; y <= 20; y++) {
        let lineIsFull = true
        for(let x = 1; x <= 10; x++) {
            const cell = x + y * 12
            if (!board[cell]) {
                lineIsFull = false
            }
        }
        if (lineIsFull) {
            lines.push(y)
        }
    }
    return lines
}

const deleteLine = board => {
    const lines = completeLine(board).reverse()
    lines.forEach(e => {
        for(let cell = (e + 1) * 12; cell < 252; cell++) {
            board[cell - 12] = board[cell]
        }
    })
    return board
}

const boardInit = () => {
    let board = [];
    board.length = 252;
    board.fill(0);
    board.forEach((e, i) => {
    if (i % 12 === 0 || i % 12 === 11 || i < 12)
        board[i] = 8
    })
    console.log({board})
    return board
}

const move = (state = {}, action) => {

    console.log(action.type, {action})
    switch(action.type){
        
        case LIST:
            return { ...state, list: action.list }

        case PLAYER_NAME:
            return { ...state, playerName: action.name }

        case ROOM_INIT:
            console.log("ROOM INIT", action)
            return {
                ...state,
                room: {
                    ...state.room,
                    players: action.players,
                    leader: action.leader,
                    state: action.state,
                },
                board: boardInit(),
            }
            
        case ROOM_START:
            console.log("ROOM START", action)
            const initStack = action.initStack
            return {
                ...state,
                tetro: {
                    ...initStack[0],
                    matrix: initStack[0].matrix,
                    orientation: 0
                },
                nextTetro: {
                    ...initStack[1],
                    matrix: initStack[1].matrix,
                    orientation: 0
                },
                index: 0,
                room: {...state.room, state: action.state},
            }

        case NEWTETRO:
            return {
                ...state,
                nextTetro: {
                    ...action.tetro,
                    matrix: action.tetro.matrix,
                    orientation: 0
                },
                index: state.index + 1,
            }

        case FALL:
            if (moveCheck(state)){
                return {
                    ...state,
                    tetro: {
                        ...state.tetro,
                        crd: {
                            ...state.tetro.crd,
                            y: state.tetro.crd.y - 1
                        }
                    }
                }
            } else {
                let newBoard = writeTetroOnBoard(state)
                newBoard = deleteLine(newBoard)
                state.socket.emit('ask newtetro', {
                    index: state.index + 1,
                    board: newBoard,
                    room: state.room.name,
                })
                
                return {
                    ...state,
                    tetro: state.nextTetro,
                    board: newBoard
                }
            }

        case ROTATE:
            if (moveCheck(state, ROTATE)){
                return {
                    ...state,
                    tetro: {
                        ...state.tetro,
                        orientation: matriceRotate(state.tetro)
                    }
                }
            } else {
                return state                
            }
        case LEFT:
            if (moveCheck(state, LEFT)){
                return {
                    ...state,
                    tetro: {
                        ...state.tetro,
                        crd: {
                            ...state.tetro.crd,
                            x: state.tetro.crd.x + 1
                        }
                    }
                }
            } else {
                return state
            }
        case RIGHT:
            if (moveCheck(state, RIGHT)){
                return {
                    ...state,
                    tetro: {
                        ...state.tetro,
                        crd: {
                            ...state.tetro.crd,
                            x: state.tetro.crd.x - 1
                        }
                    }
                }
            } else {
                return state
            }
        case DIVE:
            let stateCopy = {...state}
            let count = 0
            while ( moveCheck(stateCopy)) {
                count++
                stateCopy = {...stateCopy,
                    tetro: {
                        ...stateCopy.tetro,
                        crd: {
                            ...stateCopy.tetro.crd,
                            y: stateCopy.tetro.crd.y - 1
                        }
                    }
                }
            }
            state.socket.emit('ask newtetro', {index: state.index + 1})
            let newBoard = writeTetroOnBoard(stateCopy)
            newBoard = deleteLine(newBoard)
            
            return {
                ...state,
                tetro: state.nextTetro,
                board: newBoard
            }
        default:
            return state
    }
}

export default move
