import { FALL, DIVE, LEFT, RIGHT, ROTATE} from '../constants/ActionTypes'

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

function concatCrdStruct(e) {
    let res = [];
    e.forEach((el) => {
        res = res.concat(el.crd);
    });
    return res;
}

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const move = (state = {}, action) => {
    switch(action.type){
        case FALL:
            const nextMove = [...state.currentTetro.crd.map(addLine)];
            const struct = concatCrdStruct([...state.oldTetros]);
            const res = array.intersection(nextMove, struct)
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
            else {
                const newOld = [...state.oldTetros.concat([{...state.currentTetro}])];
                return {
                    ...state, 
                    currentTetro: {
                        crd: pickRandom([[81, 82, 91, 71], [81, 82, 83, 84], [81, 82, 83, 93]]),
                        color: pickRandom(["red", "blue", "green", "yellow"])
                    },
                    oldTetros: newOld

                }
            }
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