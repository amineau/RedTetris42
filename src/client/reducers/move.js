import { FALL, DIVE, LEFT, RIGHT, ROTATE, ROOM_EXIT, NEWTETRO, ROOM_INIT, ROOM_START, LIST, ADD_LINE, PLAYER_NAME, HIGHT_SCORES, SCORE, NEW_BOARD } from '../constants/ActionTypes'
import * as tetrosTypes from '../constants/tetrosTypes'
import math from 'mathjs'

var array = require('lodash/array');

// export function pickRandom(array) {
//     return array[Math.floor(Math.random() * array.length)];
// }

const moveCheck = ({board, tetro}, move = null) => {
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
        case null:
            break;
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

export const matriceRotate = (tetro) => {
    const nbrPosition = tetro.matrix.length
    return (tetro.orientation + 1) % nbrPosition
}

export const writeTetroOnBoard = (state) => {
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

export const completeLine = board => {
    let lines = []
    for(let y = 1; y <= 20; y++) {
        let lineIsFull = true
        for(let x = 1; x <= 10; x++) {
            const cell = x + y * 12
            if (!board[cell] || board[cell] === 11) {
                lineIsFull = false
            }
        }
        if (lineIsFull) {
            lines.push(y)
        }
    }
    return lines
}

export const deleteLine = oldBoard => {
    let board = [...oldBoard]
    const lines = completeLine(board).reverse()
    lines.forEach(line => {
        for(let cell = (line + 1) * 12; cell < 252; cell++) {
            board[cell - 12] = board[cell]
        }
    })
    return {board, linesDeleted: lines}
}

export const addLine = (board, lineToAddNbr) => {
    let newBoard = [...board]
    let typeCell = 11
    for(let cell = 252 - 12; cell >= 12; cell--) {
        if (cell % 12 !== 0 && cell % 12 !== 11)
            newBoard[cell] = (cell >= 12 + (12 * lineToAddNbr)) ? newBoard[cell - (12 * lineToAddNbr)] : typeCell
    }
    return newBoard
}

export const boardInit = () => {
    let board = [];
    board.length = 252;
    board.fill(0);
    board = board.map((e, i) => (i % 12 === 0 || i % 12 === 11 || i < 12) ? 8 : 0)
    return board
}

export const boardFill = (type = 0) => {
    let board = [];
    board.length = 252;
    board.fill(type);
    board = board.map((e, i) => (i % 12 === 0 || i % 12 === 11 || i < 12) ? 8 : e)
    return board
}

const move = (state = {}, action) => {
    let board = []
    let tetro = null
    let nextTetro = null
    let index = state.index + 1
    
    switch(action.type){
        case HIGHT_SCORES:
            return { ...state, hightScores: action.hightScores }

        case SCORE:
            return {
                ...state,
                score: action.score,
                linesDone: action.linesDone,
            }

        case LIST:
            return { ...state, list: action.list }

        case PLAYER_NAME:
            return { ...state, playerName: action.name }

        case ROOM_INIT:
            board = state.board || boardFill()
            const player = action.players.find(player => player.name == state.playerName)
            return {
                ...state,
                room: {
                    ...state.room,
                    players: action.players,
                    leader: action.leader,
                    state: action.state,
                },
                board,
            }
        

        case ROOM_START:
            tetro = action.initStack[0]
            nextTetro = action.initStack[1]
            board = boardFill()
            return {
                ...state,
                tetro,
                nextTetro,
                index: 0,
                board,
                room: {
                    ...state.room,
                    players: action.players,
                    state: action.state,                        
                },
                score:0,
                linesDone: 0,
            }

        case ROOM_EXIT:
            return { ...state, tetro, nextTetro, score:0, linesDone: 0, board: boardFill() }

        case NEWTETRO:
            nextTetro = action.tetro
            return { ...state, nextTetro, index }

        case ADD_LINE:
            board = addLine(state.board, action.lineToAddNbr)
            state.socket.emit('room', {type: 'board change', board })
            let tetroLineUp = action.lineToAddNbr
            while (tetroLineUp && moveCheck({board, tetro: {
                    ...state.tetro,
                    crd: {
                        ...state.tetro.crd,
                        y: state.tetro.crd.y + tetroLineUp
                    }
                }}, FALL)) {
                tetroLineUp--
            }
            return {
                ...state,
                board,
                tetro: {
                    ...state.tetro,
                    crd: {
                        ...state.tetro.crd,
                        y: state.tetro.crd.y + tetroLineUp,
                    }
                }
            }

        case NEW_BOARD:
            return {
                ...state,
                room: {
                    ...state.room,
                    players: state.room.players.map(player => player.name === action.player.name ? action.player : player)
                }
            }

        case FALL:
            if (moveCheck(state, FALL)){
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
                let { board, linesDeleted } = deleteLine(newBoard)
                tetro = state.nextTetro
                if (!moveCheck({board, tetro})){
                    board = boardFill(11)
                    tetro = null
                    state.socket.emit('room', {type: 'loose'})
                    return { ...state, board, tetro }
                }
                state.socket.emit('room', { type: 'ask newtetro', index, linesDeleted })
                state.socket.emit('room', { type:'board change', board })
                
                return { ...state, tetro, board }
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
            }
            return { ...state } 

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
            }
            return { ...state }

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
            }
            return { ...state }

        case DIVE:
            let stateCopy = {...state}
            while ( moveCheck(stateCopy, FALL)) {
                stateCopy.tetro.crd.y--
            }
            let newBoard = writeTetroOnBoard(stateCopy)
            let { board, linesDeleted } = deleteLine(newBoard)
            tetro = state.nextTetro
            if (!moveCheck({board, tetro})){
                board = boardFill(11)
                tetro = null
                state.socket.emit('room', {type: 'loose'})
                return { ...state, board, tetro }
            }
            state.socket.emit('room', { type: 'ask newtetro', index, linesDeleted })
            state.socket.emit('room', { type: 'board change', board })
            return { ...state, tetro, board }

        default:
            return { ...state }
    }
}

export default move
