import { FALL } from '../constants/ActionTypes'

const move = (state = {}, action) => {
    switch(action.type){
        case FALL:
            return {
                ...state,
                currentTetro: {
                    ...state.currentTetro,
                    crd: [...state.currentTetro.crd.map((n) => {
                        return n += 10;
                    })]
                }
            }
        // case ROTATE:
        //     return state
        // case LEFT:
        //     return state
        // case RIGHT:
        //     return state
        // case DIVE:
        //     return state
        default:
            return state
    }
}

export default move