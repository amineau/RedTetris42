import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import move from './reducers'
import App from './containers/app'

const initialState = 
{
  piece: {81: "blue", 82: "blue", 83: "blue", 84: "blue"},
  blocs: {},
  test: 'prout'
};

const store = createStore(
  move,
  initialState,
  applyMiddleware(thunk, createLogger())
)

ReactDom.render((
  <Provider store={store}>
    <App store={store}/>
  </Provider>
), document.getElementById('tetris'))
