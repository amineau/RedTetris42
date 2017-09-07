import {configureStore} from './helpers/server'
// import rootReducer from '../src/client/reducers'
import move from '../src/client/reducers/move'
// import {ALERT_POP, alert} from '../src/client/actions/alert'
// import {fall} from '../src/client/actions/index'
import {FALL, PLAYER_NAME} from '../src/client/constants/ActionTypes'

import chai from "chai"

const expect = chai.expect

let blankBoard = [];
blankBoard.length = 252;
blankBoard.fill(0);
blankBoard.forEach((e, i) => {
  if (i % 12 === 0 || i % 12 === 11 || i < 12)
    blankBoard[i] = 8
})

let blankState =
{
  playerName: null,
  list: {
    room: [],
    player: [],
  },
  socket: 1,
};

chai.should()

// describe('Fake redux test', function(){
//   it('alert it', function(done){
//     const initialState = {}
//     const store =  configureStore(rootReducer, null, initialState, {
//       ALERT_POP: ({dispatch, getState}) =>  {
//         const state = getState()
//         state.message.should.equal(MESSAGE)
//         done()
//       }
//     })
//     store.dispatch(alert(MESSAGE))
//   });

// });

describe('redux: LIST', function(){
  it('simpliest one', function(done){
    const initialState = {}
    const store =  configureStore(move, null, initialState, {
      LIST: ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.list).to.be.equal(7)
        done()
      }
    })
    // store.dispatch(alert(MESSAGE))
    store.dispatch({type:"LIST", list: 7})
  });

});

describe('redux: PLAYER NAME', function(){
  it('simpliest one', function(done){
    const initialState = {}
    const store =  configureStore(move, null, initialState, {
      'PLAYER NAME': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state).to.have.property("playerName", "toto")
        done()
      }
    })
    // store.dispatch(alert(MESSAGE))
    store.dispatch({type: PLAYER_NAME, name: "toto"})
  });

});
