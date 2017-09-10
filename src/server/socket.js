import debug from 'debug'
import Player from './player'
import Room from './room'
import HightScores from './database'

const loginfo = debug('tetris:info')

let room_list = []
let player_list = []
const hightScores = new HightScores()

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
	players: room.listPlayer.map(p => ({
		name: p.name,
		board: p.board
	})),
	leader: room.leader.name,
	state: room.state
})



const initEngine = io => {

  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    

    hightScores.show()
      .then(hightScores => {
        socket.emit('action', {
          type: 'HIGHT SCORES',
          hightScores
        })
      })
    socket.emit('action', list())

    let player = new Player(socket.id)
	const addScoreToDb = (player) => {
		hightScores.add(player)
		hightScores.show()
			.then(hightScores => {
				io.sockets.emit('action', {
					type: 'HIGHT SCORES',
					hightScores
				})
			})
	}
	const moveOut = room => {
		socket.leave(room.name)
		if (room.state === 1)
			addScoreToDb(player)
		room.remove(player)
		player_list.splice(player_list.indexOf(player.name), 1)
		player.reset()
		if (!room.listPlayer.length) {
			room_list.splice(room_list.indexOf(room), 1)
			if (room.listPlayer.length === 1 || room.listPlayer.filter(player => !player.looser).length === 1) {
				room.listPlayer.forEach(player => {
					addScoreToDb(player)
				})
				room.finish()
			}
		} else 
			io.sockets.in(room.name).emit('action', room_init(room))
	}


    socket.on('room', action => {

      let room = room_list.find(e => e.listPlayer.indexOf(player) !== -1)

	  switch (action.type) {
		case 'create':
			if (player_list.find(e => e === action.player.name) ||
				room_list.find(e => e === action.room.name)) {
				return socket.emit('action', {
					type: 'ERROR',
					message: 'Name already exists',
				})
			}
			player.name = action.player.name
			room = new Room(action.room.name, player)
			room_list.push(room)
			player_list.push(player.name)
			socket.join(room.name)
			io.sockets.in(room.name).emit('action', room_init(room))
			break;
		
		case 'join':
			if (player_list.find(e => e === action.player.name)) {
				return socket.emit('action', {
					type: 'ERROR',
					message: 'Name already exists',
				})
			}
			if (!(room = room_list.find(e => e.name === action.room.name)))
				return;
			player.name = action.player.name
			room.add(player)
			player_list.push(player.name)
			socket.join(room.name)
			io.sockets.in(room.name).emit('action', room_init(room))
			break;

		case 'start':
			if (!room)
				return;
			room.start()
			io.sockets.in(room.name).emit('action', {
				type: 'ROOM START',
				initStack: room.stack,
				state: room.state,
				players: room.listPlayer.map(p => ({
					name: p.name,
					board: p.board
				})),
			})
			break;

		case 'ask newtetro':
			if (!room)
				return;
			
			room.sendTetro(action, player)
				.then( tetro => socket.emit('action', {type: 'NEWTETRO', tetro}) )
			
			const linesDeleted = action.linesDeleted.length
			if (linesDeleted) {
				player.scoring(linesDeleted)
				socket.broadcast.to(room.name).emit('action', {
					type: "ADD LINE",
					lineToAddNbr: linesDeleted - 1,
				})
				socket.emit('action', {
					type: 'SCORE',
					score: player.score,
					linesDone: player.linesDone,
				})
			}
			break;

		case 'board change':
			if (!room)
				return;
			player.board = action.board
			socket.broadcast.to(room.name).emit('action', {
				type: 'NEW BOARD',
				player: {
					name: player.name,
					board: player.board
				}
			})
			break;

		case 'loose':
			if (!room)
				return;
			player.loose()
			if (room.listPlayer.length === 1 || room.listPlayer.filter(player => !player.looser).length === 1) {
				room.listPlayer.forEach(player => {
					addScoreToDb(player)
				})
				room.finish()
				io.sockets.emit('action', list())
			}
			io.sockets.in(room.name).emit('action', room_init(room))
			break;

		case 'exit':
			if (!room)
				return;
			moveOut(room)
			break;

		}
		io.sockets.emit('action', list())

		console.log('action type :', player.name, action.type)
		console.log('list player :', player_list)

    })

    socket.on('disconnect', () => {
      const room = room_list.find(e => e.listPlayer.indexOf(player) !== -1)
      if (!room)
        return;
      moveOut(room)
      io.sockets.emit('action', list())
    })
  })
}


export default initEngine