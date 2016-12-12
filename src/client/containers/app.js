import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  Board  from '../components/board'
import * as allActions from '../actions'

const App = ({piece,test,actions}) => {
  return (
    <div>
      <Board piece={piece} test={test} />
      <button onClick={actions.fall}>FALL</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    piece: state.piece,
    blocs: state.blocs,
    test: state.test
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(allActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)


