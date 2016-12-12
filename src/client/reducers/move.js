import { FALL } from '../constants/ActionTypes'
var _ = require('lodash');

const move = (state = {}, action) => {
    switch(action.type){
        case FALL:
            // return {
            //     piece: _.forEach(piece, function(value, key){
            //         key++;
            //     })
            // }
            // return {
            //     piece: _.forEach(state.piece, function(value, key){
            //         value = 'green'
            //     })
            // }
            return {test: "caca"}
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