import { FALL } from '../constants/ActionTypes'

const move = (state = {}, action) => {
    switch(action.type){
        case FALL:
            return {
                ...state,
                piece: {
                    ...state.piece,
                    crd: [...state.piece.crd.map((n) => {
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