import { FALL, DIVE, LEFT, RIGHT, ROTATE, NEWTETRO } from '../constants/ActionTypes'
import math from 'mathjs'

var array = require('lodash/array');

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const moveCheck = (state, move = FALL) => {
    return state.tetro.crd.y > 0
}

const matriceRotate = (matrix) => {
    const size = matrix.size()
    let newMatrix = math.zeros(size[1], size[0])
    matrix.valueOf().forEach((index, y) => {
        index.forEach((ind, x) => {
            if (ind) {
                newMatrix.subset(math.index(x,y), 1)
            }
        })
    })
    console.log({newMatrix, size})
    return newMatrix
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
                    matrix: math.matrix(action.tetro.matrix.data)
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
                    matrix: matriceRotate(state.tetro.matrix)
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