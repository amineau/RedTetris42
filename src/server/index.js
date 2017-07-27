import fs  from 'fs'
import debug from 'debug'
import { Player } from './player'
import { Room } from './room'
import { renderToString } from 'react-dom/server'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import move from '../client/reducers'
import Express from 'express'
import React from 'react'

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

function renderFullPage(preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>RedTetris</title>
        <link rel="icon" href="http://redpelicans.com/favicon.ico">
        <link rel="stylesheet" type="text/css" href="src/client/style/style.css">
      </head>
      <body>
        <div id="tetris"></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="build/bundle.js"></script>
      </body>
    </html>
    `
}

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    // let player = new Player(socket.id)
    // let room = new Room('toto', player)


    // const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    // const file = '/../../build/bundle.js'
    // loginfo('file', file)
    // fs.readFile(__dirname + file, (err, data) => {
    //   if (err) {
    //     logerror(err)
    //     res.writeHead(500)
    //     return res.end('Error loading index.html')
    //   }
      // res.writeHead(200)



      const initialState =
      {
        currentTetro: {
          crd: [81, 82, 93, 73],
          color: "blue",
          type: "t",
          position: 0
        },
        nextTetro: {
          crd: [81, 82, 94, 74],
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
      const preloadedState = store.getState()
      res.render('../index.ejs', {preloadedState})
    // })
  }

  // app.on('request', handler)
  app.use(handler)
  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const initEngine = io => {
  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)

    // socket.emit('stack', {stack: room.stack})
    socket.on('action', (action) => {
      if (action.type === "nextTetro") {
        room.sendTetro(action.index).then(nextTetro => {
          socket.emit('action', {
            type: "nextTetro",
            tetro: nextTetro,
            message:'nextTetro received'})
          console.log('nextTetro send')
        }).catch(err => console.log(err))
      }
      if(action.type === 'server/ping'){
        socket.emit('action', {type: 'pong'})
      }
    })
  })
}

export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = Express()
    initApp(app, params, () => {
      const server = require('http').createServer(app)
      let io = require('socket.io')(server)
      const stop = (cb) => {
        io.close()
        loginfo(`Engine stopped.`)
        cb()
      }

      initEngine(io)
      resolve({stop})
    })
  })
  return promise
}
