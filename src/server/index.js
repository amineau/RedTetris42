import fs  from 'fs'
import debug from 'debug'
import { Player } from './player'
import { Room } from './room'

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    loginfo('file', file)
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      loginfo('toto')
      loginfo('coucou',data)
      res.writeHead(200)
      res.end(data)
    })
  }

  app.on('request', handler)

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const initEngine = io => {
  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    let player = new Player(socket.id)
    let room = new Room('toto', player)
    socket.emit('stack', {stack: room.stack})
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
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close( () => {
          app.unref()
        })
        loginfo(`Engine stopped.`)
        cb()
      }

      initEngine(io)
      resolve({stop})
    })
  })
  return promise
}
