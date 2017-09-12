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

const App = ({ tetro, nextTetro, board, actions, gameList, hightScores, playerName, player, score, linesDone, linesDeleted, game, socket }) => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={ props => (
          <Home actions={actions} playerName={playerName} gameList={gameList} hightScores={hightScores} socket={socket}/>
        )} />
        <Route path="/:game[:player]" render={ props => (
          <MainView 
                  player={_.merge(player, {name: props.match.params.player})}
                  game={_.merge(game, {name: props.match.params.game})}
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


