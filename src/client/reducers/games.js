import { } from '../constants/ActionTypes'

const games = (state = {}, action) => {

    switch(action.type){
        case 'TOTO':
            console.log({action})
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
                players: ["bob", "jimmy", "alfre"],
                index: 0,
            }

        default:
            return state
    }
}

export default games
