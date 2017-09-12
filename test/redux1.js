import {configureStore} from './helpers/server'
import move from '../src/client/reducers/move'
import {FALL, PLAYER_NAME, GAME_INIT, RIGHT, LEFT, DIVE, INIT_LIST, ADD_TO_LIST, REMOVE_TO_LIST, UPDATE_LIST} from '../src/client/constants/ActionTypes'

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
    game: [],
    player: [],
  },
  socket: 1,
};

chai.should()

describe('redux: INIT LIST', function(){
  it('basic', function(done){
    const initialState = {}
    const store =  configureStore(move, null, initialState, {
      'INIT LIST': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.gameList).to.be.equal(7)
        done()
      }
    })
    store.dispatch({type: INIT_LIST, gameList: 7})
  });
});

describe('redux: ADD TO LIST', function(){
  it('basic', function(done){
    const initialState = { gameList: [5, 4] }
    const store =  configureStore(move, null, initialState, {
      'ADD TO LIST': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.gameList).to.deep.equal([5, 4, 7])
        done()
      }
    })
    store.dispatch({type: ADD_TO_LIST, game: 7})
  });
});

describe('redux: REMOVE TO LIST', function(){
  it('basic', function(done){
    const initialState = { gameList: [ {name: "tutu"}, {name: "toto"} ] }
    const store =  configureStore(move, null, initialState, {
      'REMOVE TO LIST': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.gameList).to.not.include({name: "tutu"})
        expect(state.gameList).to.deep.include({name: "toto"})
        done()
      }
    })
    store.dispatch({type: REMOVE_TO_LIST, game: {name: "tutu"}})
  });
});

describe('redux: UPDATE LIST', function(){
  it('basic', function(done){
    const initialState = { gameList: [ {name: "tutu", state: 0} ] }
    const store =  configureStore(move, null, initialState, {
      'UPDATE LIST': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.gameList).to.have.lengthOf(1)
        expect(state.gameList[0]).to.have.all.keys('name', 'foo','state')
        done()
      }
    })
    store.dispatch({type: UPDATE_LIST, game: {name: "tutu", foo: "bar"}})
  });
  it('basic_bis', function(done){
    const initialState = { gameList: [ {name: "toto", state: 0} ] }
    const store =  configureStore(move, null, initialState, {
      'UPDATE LIST': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.gameList).to.have.lengthOf(1)
        expect(state.gameList[0]).to.have.all.keys('name','state')
        done()
      }
    })
    store.dispatch({type: UPDATE_LIST, game: {name: "tutu", foo: "bar"}})
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

describe('redux: GAME INIT', function(){
  it('basic', function(done){
    const initialState = {}
    const store =  configureStore(move, null, initialState, {
      'GAME INIT': ({dispatch, getState}) =>  {
        const state = getState()
        expect(state).to.have.property("game")
        done()
      }
    })
    store.dispatch({type: GAME_INIT, players: [{name: "bob"}]})
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
