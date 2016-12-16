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
  piece: {
      crd: [81, 82, 83, 84],
      color: "blue"      
    },
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
    <App />
  </Provider>
), document.getElementById('tetris'))
