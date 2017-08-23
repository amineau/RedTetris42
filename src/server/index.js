import fs  from 'fs'
import debug from 'debug'
import Player from './player'
import Room from './room'

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
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

let list_rooms = []

const initEngine = io => {
  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    socket.on('join_game', () => {
      socket.emit('list_game', {
        type: 'game',
        rooms: Object.assign(...list_rooms.map(r => ({
          name: d.name,
          player: d.listPlayer
        })))
      })
    })
    socket.on('init', () => {
      let player = new Player(socket.id)
      let room = new Room('test', player)
      list_rooms.push(room)
      socket.emit('action', {
        type: 'INIT',
        initStack: room.stack,
        players: room.listPlayer,
      })
    })
    socket.on('ask newtetro', action => {
      let room = list_rooms[0]
      if (room){
        room.sendTetro(action.index, socket.id)
          .then(tetro => {
            socket.emit('action', {type: 'NEWTETRO', tetro})
          })
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
