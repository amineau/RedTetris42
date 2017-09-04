import {configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
// import {ALERT_POP, alert} from '../src/client/actions/alert'
// import {FALL, fall} from '../src/client/actions/index'
import chai from "chai"

let blankBoard = [];
blankBoard.length = 252;
blankBoard.fill(0);
blankBoard.forEach((e, i) => {
  if (i % 12 === 0 || i % 12 === 11 || i < 12)
    blankBoard[i] = 8
})

chai.should()

describe('Fake redux test', function(){
  it('alert it', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, null, initialState, {
      ALERT_POP: ({dispatch, getState}) =>  {
        const state = getState()
        state.message.should.equal(MESSAGE)
        done()
      }
    })
    store.dispatch(alert(MESSAGE))
  });

});

// describe('Fall redux test', function(){
//   it('simpliest one', function(done){
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
