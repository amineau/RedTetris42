import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  Board  from '../components/board'
import  Shadow  from '../components/shadow'
import  Preview  from '../components/preview'
import * as allActions from '../actions'
import ping from '../actions/server'

let flag = 0;
let start = 0;

const App = ({ tetro, nextTetro, board, actions }) => {

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
        case 40:
          actions.dive(); break;
      }
      flag = 1;
      setTimeout(() => {flag = 0}, 10)
    }
  });
  
  return (
    <div>
      <Preview tetro={nextTetro} />
      <Board tetro={tetro} board={board} actions={actions.fall}/>
      <Shadow board={board} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tetro: state.tetro,
    nextTetro: state.nextTetro,
    board: state.board,
    nextTetro: state.nextTetro
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(allActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)


