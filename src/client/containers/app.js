import React from 'react'
import { connect } from 'react-redux'
import  Board  from '../components/board'


const App = ({message}) => {
  return (
    <div>
      <span>{message} + prout</span>
      <Board />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


