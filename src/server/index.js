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


let room_list = []
let player_list = []

const initEngine = io => {
  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    
    let player = new Player(socket.id)
    
    const list = () => ({
      type: 'LIST',
      list: {
        room: room_list.map(d => ({
          name: d.name,
          state: d.state,
          player: d.listPlayer.map(e => e.name),
        })),
        player: player_list,
      }
    })

    const room_init = (room) => ({
      type: 'ROOM INIT',
      players: room.listPlayer,
      leader: room.leader.name,
      state: room.state,
      score: player.score,
    })

    socket.emit('action', list())

    socket.on('room', action => {
      let room = room_list.find(e => e.listPlayer.indexOf(player) !== undefined)
      if (action.type === "createOrJoin") {
        if (//room_list.find(e => e.name === action.room.name) ||
             player_list.find(e => e === action.player.name)) {
          return socket.emit('action', {
            type: 'ERROR',
            message: 'Name already exists',
          })
        }
        player.name = action.player.name
        if (!room) {
          room = new Room(action.room.name, player)
          room_list.push(room)
        } else {
          room.add(player)
        }
        player_list.push(player.name)
        socket.join(room.name)
        io.sockets.in(room.name).emit('action', room_init(room))
      
    } else if (action.type === "start") {
    
        room.start()
        io.sockets.in(room.name).emit('action', {
          type: 'ROOM START',
          initStack: room.stack,
          state: room.state,
        })
    
    } else if (action.type === "exit") {
  
        console.log('exit')
        socket.leave(room.name)
        room.remove(player)
        player_list.splice(player_list.indexOf(player.name), 1)
        player.boardInit()
        if (room.listPlayer.length) {
          io.sockets.in(room.name).emit('action', room_init(room))
        } else {
          room_list.splice(room_list.indexOf(room), 1)
        }
      }
      io.sockets.emit('action', list())
    })
    socket.on('ask newtetro', action => {
      let room = room_list.find(e => e.listPlayer.indexOf(player) !== undefined)
      if (!room)
        return;
      const linesDeleted = action.linesDeleted.length
      if (linesDeleted) {
        player.scoring(linesDeleted)
        socket.broadcast.to(room.name).emit('action', {
          type: "ADD LINE",
          typeLineToAdd: linesDeleted,
        })
      }
      room.sendTetro(action, player)
        .then(tetro => {
          socket.emit('action', {type: 'NEWTETRO', tetro})
        })
    })
    socket.on('board change', action => {
      const room = room_list.find(e => e.listPlayer.indexOf(player) !== undefined)
      if (!room)
        return;
      player.board = action.board
      io.sockets.in(room.name).emit('action', room_init(room))
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
      const room = room_list.find(e => e.listPlayer.indexOf(player) !== undefined)
      if (!room)
        return;
      socket.leave(room.name)
      room.remove(player)
      player_list.splice(player_list.indexOf(player.name), 1)
      if (room.listPlayer.length) {
        io.sockets.in(room.name).emit('action', room_init(room))
      } else {
        room_list.splice(room_list.indexOf(room), 1)
      }
      io.sockets.emit('action', list())
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
