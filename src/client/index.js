import React from 'react'
import ReactDom from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io';
import { Provider } from 'react-redux'
import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import move from './reducers'
import App from './containers/app'
// import Home from './components/home'
import io from 'socket.io-client'
import math from 'mathjs'

let boardInit = [];
boardInit.length = 252;
boardInit.fill(0);
boardInit.forEach((e, i) => {
  if (i % 12 === 0 || i % 12 === 11 || i < 12)
    boardInit[i] = 8
})

console.log(boardInit)

let socket = io.connect('http://localhost:3004');

let socketIoMiddleware = createSocketIoMiddleware(socket, (type, action) => {
  console.log({type, action})
});

socket.on('init', action => {
  if(action.type === 'start'){
    const initStack = action.initStack
    console.log('ping-pong ok')
    const initialState =
    {
      tetro: {
        ...initStack[0],
        matrix: initStack[0].matrix,
        orientation: 0
      },
      nextTetro: {
        ...initStack[1],
        matrix: initStack[1].matrix,
        orientation: 0
      },
      board: boardInit,
      index: 0,
      players: ["bob", "jimmy", "alfre"],
      socket
    };

    let store = applyMiddleware(socketIoMiddleware)(createStore)(
      move,
      initialState,
      applyMiddleware(thunk, createLogger())
    )

    ReactDom.render((
      <Provider store={store}>
          <App />
      </Provider>
    ), document.getElementById('tetris'))
  }
})

socket.emit('init')