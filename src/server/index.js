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
    const emitListRooms = () => (socket.emit('action', {
      type: 'LIST_ROOMS',
      list_rooms: list_rooms.map(d => ({
        name: d.name,
        state: d.state,
        player: d.listPlayer,
      }))
    }))
    socket.on('list game', () => {
      emitListRooms()
    })
    socket.on('room', action => {
      if (action.type === "createOrJoin") {
        let player = new Player(socket.id, action.player.name)
        let room = list_rooms.find(elem => elem.name === action.room.name)
        if (!room) {
          room = new Room(action.room.name, player)
          list_rooms.push(room)
        } else {
          room.add(player)
        }
        socket.join(room.name)
        socket.broadcast.to(room.name).emit('action', {
          type: 'ROOM ADD PLAYER',
          player: player.name
        })
        socket.emit('action', {
          type: 'ROOM INIT',
          players: room.listPlayer.map(d => d.name),
          leader: room.leader.name,
          state: room.state,
        })
      } else if (action.type === "start") {
        let room = list_rooms.filter( room => room.name === action.room.name)[0]
        room.start()
        io.sockets.in(room.name).emit('action', {
          type: 'ROOM START',
          initStack: room.stack,
          state: room.state,
        })
      }
      // emitListRooms()
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
