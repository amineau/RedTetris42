import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import move from './reducers'
import App from './containers/app'
import io from 'socket.io-client'



const socket = io.connect('http://localhost:3004');

socket.on('init', action => {
  if(action.type === 'start'){
    console.log('ping-pong ok')
    const initStack = action.initStack
    const initialState = 
    {
      tetro: initStack[0],
      nextTetro: initStack[1],
    };

    console.log(initialState)

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
  }
})

socket.emit('init')