import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'
import  Home  from '../components/home'
import  MainView  from './mainView'
import * as allActions from '../actions'
import ping from '../actions/server'

let flag = 0;
let start = 0;

const App = ({ tetro, nextTetro, board, actions, players }) => {

  if (start == 0) {
    setInterval(() => actions.fall(), 1000);
    start = 1;
  }

  window.addEventListener("keydown",(e) => {
    if (flag == 0) {
      switch (e.keyCode) {
        case 37:
          actions.left(); break;
        case 39:
          actions.right(); break;
        case 40:
          actions.fall(); break;
        case 38:
          actions.rotate(); break;
        case 32:
          actions.dive(); break;
      }
      flag = 1;
      setTimeout(() => {flag = 0}, 10)
    }
  });
  
  return (
    <div>
      <Route exact path='/' render={(props) => (
        <Home players={players}/>
      )} />
      <Route path='/game' render={(props) => (
        <MainView tetro={tetro}
                nextTetro={nextTetro}
                board={board}
                actions={actions.fall}/>
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


