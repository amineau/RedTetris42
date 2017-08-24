import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import  Home  from '../components/home'
import  Join  from '../components/join'
import  MainView  from './mainView'
import * as allActions from '../actions'
import ping from '../actions/server'

const App = ({ tetro, nextTetro, board, actions, list_rooms, playerName, socket }) => {
  console.log('############  APP #############')
  console.log({tetro, nextTetro})
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={ props => (
          <Home actions={actions} playerName={playerName} players={[]}/>
        )} />
        <Route path="/game/:room[:player]" render={ props => (
          <MainView 
                  playerName={playerName}
                  tetro={tetro}
                  nextTetro={nextTetro}
                  board={board}
                  actions={actions}
                  socket={socket}/>
        )} />
        <Route path="/join" render={ props =>  (
          <Join 
                  socket={socket}
                  list_rooms={list_rooms}
                  playerName={playerName}/>
        )} />
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({...state})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(allActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)


