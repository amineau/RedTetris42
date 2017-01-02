import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  Board  from '../components/board'
import * as allActions from '../actions'

let flag = 0;

const App = ({ tetro, structure, actions }) => {
  window.addEventListener("keydown",(e) => {
    switch (e.keyCode) {
      case 37:
        if (flag == 0)
          actions.left();
        flag = 1;
        setTimeout(() => {flag = 0}, 500)
        break;
      case 39:
        if (flag == 0)
          actions.right();
        flag = 1;
        setTimeout(() => {flag = 0}, 500)
        break;
    }
  });
  return (
    <div>
      <Board tetro={tetro} structure={structure} actions={actions.fall}/>
      <button onClick={actions.fall}>FALL</button>
      <button onClick={actions.dive}>DIVE</button>
      <button onClick={actions.left}>LEFT</button>
      <button onClick={actions.right}>RIGHT</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tetro: state.currentTetro,
    structure: state.oldTetros,
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(allActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)


