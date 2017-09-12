import React from 'react'
import ReactDom from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io';
import { Provider } from 'react-redux'
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import reducers from './reducers'
import App from './containers/app'
import { server } from '../../params'
// import Home from './components/home'
import io from 'socket.io-client'
import math from 'mathjs'
import styles from './style/style.css'

let socket = io.connect(server.url);

let socketIoMiddleware = createSocketIoMiddleware(socket, (type, action) => {
});

const initialState =
{
  playerName: null,
  gameList: [],
  socket,
};

let store = applyMiddleware(socketIoMiddleware)(createStore)(
  reducers,
  initialState,
  applyMiddleware(thunk, createLogger())
)

ReactDom.render((
  <Provider store={store}>
      <App />
  </Provider>
), document.getElementById('tetris'))