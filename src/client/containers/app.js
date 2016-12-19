import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  Board  from '../components/board'
import * as allActions from '../actions'

const App = ({ tetro, structure, actions }) => {
  return (
    <div>
      <Board tetro={tetro} structure={structure}/>
      <button onClick={actions.fall}>FALL</button>
      <button onClick={actions.dive}>DIVE</button>
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


