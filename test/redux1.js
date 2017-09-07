import {configureStore} from './helpers/server'
import move from '../src/client/reducers/move'
import {FALL, PLAYER_NAME, ROOM_INIT, RIGHT, LEFT, DIVE} from '../src/client/constants/ActionTypes'

import chai from "chai"

const expect = chai.expect

let blankBoard = [];
blankBoard.length = 252;
blankBoard.fill(0);
blankBoard.forEach((e, i) => {
  if (i % 12 === 0 || i % 12 === 11 || i < 12)
    blankBoard[i] = 8
})

const tetroTest = {
    type: 1,
    matrix: [[
      [ 0, 0, 1, 0 ],
      [ 0, 1, 1, 1 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
    ],[
      [ 0, 0, 1, 0 ],
      [ 0, 1, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ],[
      [ 0, 0, 0, 0 ],
      [ 0, 1, 1, 1 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 1 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ]],
    orientation: 0,
    crd: {x:4, y: 7}
  }

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

describe('redux: LIST', function(){
  it('basic', function(done){
    const initialState = {}
    const store =  configureStore(move, null, initialState, {
      LIST: ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.list).to.be.equal(7)
        done()
      }
    })
    store.dispatch({type:"LIST", list: 7})
  });
});

describe('redux: PLAYER NAME', function(){
  it('basic', function(done){
    const initialState = {}
    const store =  configureStore(move, null, initialState, {
      'PLAYER NAME': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state).to.have.property("playerName", "toto")
        done()
      }
    })
    store.dispatch({type: PLAYER_NAME, name: "toto"})
  });
});

describe('redux: ROOM INIT', function(){
  it('basic', function(done){
    const initialState = {}
    const store =  configureStore(move, null, initialState, {
      'ROOM INIT': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state).to.have.property("room")
        done()
      }
    })
    store.dispatch({type: ROOM_INIT})
  });
});

describe('redux: FALL', function(){
  it('basic', function(done){
    const initialState = {board: [...blankBoard], tetro: {...tetroTest}}
    const store =  configureStore(move, null, initialState, {
      'FALL': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.tetro.crd.y).to.equal(6)
        done()
      }
    })
    store.dispatch({type: FALL})
  });
});

describe('redux: RIGHT', function(){
  it('can t move right', function(done){
    const initialState = {board: [...blankBoard], tetro: {...tetroTest}}
    const store =  configureStore(move, null, initialState, {
      'RIGHT': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.tetro.crd.x).to.equal(4)
        done()
      }
    })
    store.dispatch({type: RIGHT})
  });
});

describe('redux: LEFT', function(){
  it('basic', function(done){
    const initialState = {board: [...blankBoard], tetro: {...tetroTest}}
    const store =  configureStore(move, null, initialState, {
      'LEFT': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.tetro.crd.x).to.equal(5)
        done()
      }
    })
    store.dispatch({type: LEFT})
  });
});

describe('redux: DIVE', function(){
  it('basic', function(done){
    let nextTetro = {...tetroTest}
    nextTetro.crd.y = 10
    const initialState = {board: [...blankBoard],
        tetro: {...tetroTest},
        nextTetro,
        socket: {emit: () => (0)}}
    const store =  configureStore(move, null, initialState, {
      'DIVE': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.board[140]).to.equal(11)
        done()
      }
    })
    store.dispatch({type: DIVE})
  });
});
