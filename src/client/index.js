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
  currentTetro: {
      crd: [81, 82, 91, 71],
      color: "blue",
      type: "t",
      position: 0
    },
  oldTetros: [
      {
        crd: [200, 201, 202, 203, 204, 205, 206, 207, 208, 209],
        color: "blue"
      },
    ]
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
