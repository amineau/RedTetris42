import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import  Home  from '../components/home'
import  Join  from '../components/join'
import  Create  from '../components/create'
import  MainView  from './mainView'
import _ from 'lodash'
import * as allActions from '../actions'
import ping from '../actions/server'

const App = ({ tetro, nextTetro, board, actions, list, playerName, player, room, socket }) => {
  console.log('############  APP #############')
  console.log(list)
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={ props => (
          <Home actions={actions} playerName={playerName} list={list}/>
        )} />
        <Route path="/game/:room[:player]" render={ props => (
          <MainView 
                  player={_.merge(player, {name: props.match.params.player})}
                  room={_.merge(room, {name: props.match.params.room})}
                  tetro={tetro}
                  nextTetro={nextTetro}
                  board={board}
                  actions={actions}
                  socket={socket}/>
        )} />
        <Route path="/create" render={ props =>  (
          <Create 
                  socket={socket}
                  list={list}
                  playerName={playerName}/>
        )} />
        <Route path="/join" render={ props =>  (
          <Join 
                  socket={socket}
                  list={list}
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


