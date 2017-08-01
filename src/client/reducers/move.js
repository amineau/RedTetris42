import { FALL, DIVE, LEFT, RIGHT, ROTATE} from '../constants/ActionTypes'
import math from 'mathjs'

var array = require('lodash/array');

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const moveCheck = (state, move = FALL) => {
    
    return true
}

const move = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case FALL:
            if (moveCheck(state.tetro)){
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
                state.socket.emit('newTetro', {index: state.index + 1})
                state.socket.on('newTetro', tetro => {

                })
                return {
                    ...state,
                    tetro: state.nextTetro,
                    index: state.index + 1
                    }
                }

        case ROTATE:
            return {
                ...state,
                tetro: {
                    ...state.tetro,
                    matrix: state.tetro.matrix
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
            if (state.tetro.crd.x > state.tetro.matrix.size[1] - 1) {
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