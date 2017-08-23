import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import  Home  from '../components/home'
import  MainView  from './mainView'
import * as allActions from '../actions'
import ping from '../actions/server'

const App = ({ tetro, nextTetro, board, actions, socket }) => {
  console.log('############  APP #############')
  console.log({tetro, nextTetro})
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={(props) => (
          <Home players={[]}/>
        )} />
        <Route path="/game" render={(props) => (
          <MainView 
                  tetro={tetro}
                  nextTetro={nextTetro}
                  board={board}
                  actions={actions}
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


