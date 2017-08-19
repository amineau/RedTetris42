import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'
import  Home  from '../components/home'
import  MainView  from './mainView'
import * as allActions from '../actions'
import ping from '../actions/server'

const App = ({ tetro, nextTetro, board, actions, players }) => {
  
  return (
    <div>
      <Route exact path='/' render={(props) => (
        <Home players={players}/>
      )} />
      <Route path='/game' render={(props) => (
        <MainView tetro={tetro}
                nextTetro={nextTetro}
                board={board}
                actions={actions}/>
      )} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tetro: state.tetro,
    nextTetro: state.nextTetro,
    board: state.board,
    players: state.players
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(allActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)


