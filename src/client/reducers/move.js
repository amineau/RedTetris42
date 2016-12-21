import { FALL, DIVE, LEFT, RIGHT } from '../constants/ActionTypes'

var array = require('lodash/array');

function isOnLeftSide(e) {
    return e % 10 == 0;
}

function isOnRightSide(e) {
    return e % 10 == 9;
}

function addLine(n) {
    return n += 10; 
}

const move = (state = {}, action) => {
    switch(action.type){
        case FALL:
            const nextMove = [...state.currentTetro.crd.map(addLine)];
            const res = array.intersection(nextMove, [...state.oldTetros])
            if (res.length == 0) {
                return {
                    ...state,
                    currentTetro: {
                        ...state.currentTetro,
                        crd: [...state.currentTetro.crd.map((n) => {
                            return n += 10;
                        })]
                    }
                }
            }
            else return {...state}
        // case ROTATE:
        //     return state
        case LEFT:
            if (!state.currentTetro.crd.find(isOnLeftSide)) {
                return {
                    ...state,
                    currentTetro: {
                        ...state.currentTetro,
                        crd: [...state.currentTetro.crd.map((n) => {
                            return n -= 1;
                        })]
                    }
                }
            }
            else return {...state}
        case RIGHT:
            if (!state.currentTetro.crd.find(isOnRightSide)) {
                return {
                    ...state,
                    currentTetro: {
                        ...state.currentTetro,
                        crd: [...state.currentTetro.crd.map((n) => {
                            return n += 1;
                        })]
                    }
                }
            }
            else return {...state}
        case DIVE:
            return {
                ...state,
                currentTetro: {
                    ...state.currentTetro,
                    crd: [...state.currentTetro.crd.map((n) => {
                        if (state.oldTetro.find(n+10))
                            return n += 10;
                    })]
                }
            }
        default:
            return state
    }
}

export default move