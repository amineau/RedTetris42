import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import { create, join, start, ask_newtetro, board_change,loose, exit } from '../src/client/actions/server'
import io from 'socket.io-client'
import params from '../params'

const expect = chai.expect

describe('socket: init', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('init empty roomList', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'INIT LIST': ({action}) =>{
        expect(action).to.have.property("roomList")        
        done()
      }
    })
    store.dispatch({type: ""})
  });
});


describe('socket: room', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('create success', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'ADD TO LIST': ({ action }) => {
        expect(action).to.have.property("room")
        expect(action.room.name).to.be.a("string")
        expect(action.room).to.have.property("state")
        expect(action.room.players).to.be.an('array').that.includes({name: "toto"})
        done()
      },
	})
    store.dispatch(create({room: 'e2',player: 'toto'}))
  });

   it('create fail', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
       'ERROR': ({ action }) => {
          expect(action).to.have.property("message")
          expect(action.message).to.deep.equal('Name already exists')
          done()
        },
	})
    store.dispatch(create({room: 'e2',player: 'tutu'}))
  });

  it('join fail', function(done){
    const initialState = {}    
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'ERROR': ({ action }) => {
        expect(action).to.have.property("message")
        expect(action.message).to.deep.equal('Room unknows')
        done()
      },
	})
    store.dispatch(join({room: 'e3',player: 'plop'}))
  });

  it('join success', function(done){
    const initialState = {}    
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'UPDATE LIST': ({ action }) => {
        expect(action).to.have.property("room")
        expect(action.room.name).to.be.a("string")
        expect(action.room).to.have.property("state")
        expect(action.room.players).to.deep.include({name: "toto"})
        expect(action.room.players).to.deep.include({name: "titi"})
        done()
      },
	})
    store.dispatch(join({room: 'e2',player: 'titi'}))
  });

});

describe('socket: game', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('start -> exit', function(done){
    const initialState = {}    
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'UPDATE LIST': ({ action }) => {
        expect(action).to.have.property("room")
        expect(action.room.name).to.be.a("string")
        expect(action.room).to.have.property("state")
        expect(action.room.state).to.deep.equal(1)
      },
      'REMOVE TO LIST': ({ getState, action }) => {
        const state = getState()
        expect(state).to.have.property("roomList")
        expect(state.roomList).to.be.empty
        done()
      },
      'SCORE': ({action}) => {
        expect(action).to.include.all.keys('score', 'linesDone')
        expect(action.linesDone).to.deep.equal(3)
      },
      'NEW BOARD': ({action}) => {
        expect(action).to.have.property('player')   
        expect(action.player.board).to.deep.equal([0,0])   
      }
	})
    store.dispatch(create({room: 'e2',player: 'titi'}))
    store.dispatch(start())
    store.dispatch(ask_newtetro())
    store.dispatch(board_change())
    store.dispatch(loose())
    store.dispatch(exit())
  });

});
