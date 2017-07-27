import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  Board  from '../components/board'
import  Shadow  from '../components/shadow'
import * as allActions from '../actions'
import { ping } from '../actions/server'

let flag = 0;
let start = 0;

const App = ({ socket, currentTetro, nextTetro, structure, actions }) => {

  if (start == 0) {
    setInterval(() => actions.fall(), 1000);
    start = 1;
  }


  window.addEventListener("keydown",(e) => {
    if (flag == 0) {
      switch (e.keyCode) {
        case 37:
          actions.left();
          break;
        case 39:
          actions.right();
          break;
        case 40:
          actions.fall();
          break;
        case 38:
          actions.rotate();
          break;
        case 40:
          actions.dive();
          break;
        case 8:
          console.log(ping())
          socket.emit('action', ping());
          break;
      }
      flag = 1;
      setTimeout(() => {flag = 0}, 500)
    }
  });

  return (
    <div>
      <Board tetro={currentTetro} structure={structure} actions={actions.fall}/>
      <Shadow structure={structure} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    currentTetro: state.currentTetro,
    nextTetro: state.nextTetro,
    structure: state.oldTetros,
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(allActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
