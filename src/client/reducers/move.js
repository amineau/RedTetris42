import { FALL, DIVE, LEFT, RIGHT, ROTATE, NEWTETRO } from '../constants/ActionTypes'
import math from 'mathjs'

var array = require('lodash/array');

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const moveCheck = (state, move = FALL) => {
    return state.tetro.crd.y > 0
}

const matriceRotate = (tetro) => {
    const nbrPosition = tetro.matrix.length
    return (tetro.orientation + 1) % nbrPosition
}

const move = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case NEWTETRO:
            console.log('new Tetroo ask', action.tetro)
            return {
                ...state,
                nextTetro: {
                    ...action.tetro,
                    matrix: action.tetro.matrix,
                    orientation: 0
                },
                index: state.index + 1
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
                state.socket.emit('action', {index: state.index + 1})
                return {
                    ...state,
                    tetro: state.nextTetro
                }
            }

        case ROTATE:
            return {
                ...state,
                tetro: {
                    ...state.tetro,
                    orientation: matriceRotate(state.tetro)
                }
            }
        case LEFT:
            if (state.tetro.crd.x < 9) {
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
            else return {...state}
        case RIGHT:
            if (state.tetro.crd.x > 0) {
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
            else return {...state}
        case DIVE:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default move
