import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import move from './reducers'
import App from './containers/app'
import math from 'mathjs'

let boardInit = [];
boardInit.length = 200;
boardInit.fill(0);

const initialState = 
{
  tetro: {
      type: 3,
      matrix: math.matrix([[1, 1, 0], [1, 0, 0], [0, 0, 0]]),
      crd: {x: 9, y: 15},
    },
  board: boardInit,
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
