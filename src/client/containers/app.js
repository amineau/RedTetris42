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

const App = ({ tetro, nextTetro, board, actions, list, playerName, player, score, linesDone, linesDeleted, room, socket }) => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={ props => (
          <Home actions={actions} playerName={playerName} list={list} socket={socket}/>
        )} />
        <Route path="/:room[:player]" render={ props => (
          <MainView 
                  player={_.merge(player, {name: props.match.params.player})}
                  room={_.merge(room, {name: props.match.params.room})}
                  tetro={tetro}
                  nextTetro={nextTetro}
                  board={board}
                  actions={actions}
                  linesDeleted={linesDeleted}
                  score={score}
                  linesDone={linesDone}
                  socket={socket}/>
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


