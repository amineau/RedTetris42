import debug from 'debug'
import Player from './player'
import Room from './room'
import HightScores from './database'

const loginfo = debug('tetris:info')

let room_list = []
const hightScores = new HightScores()

const playerExists = playerName => (
	room_list.find(room => (
		room.listPlayer.find(player => player.name === playerName)
	))
)

const roomExists = roomName => (
	room_list.find(room => room.name === roomName)
)

const nbrPlayersInGame = room => (
	room.listPlayer.filter(player => !player.looser).length
)

const init_list = () => ({
	type: 'INIT LIST',
	roomList: room_list.map(room => ({
		name: room.name,
		state: room.state,
		players: room.listPlayer.map(({name}) => ({ name })),
	}))
})

const add_to_list = room => ({
	type: 'ADD TO LIST',
	room: {
		name: room.name,
		state: room.state,
		players: room.listPlayer.map(({ name }) => ({ name })),
	}
})

const remove_to_list = room => ({
	type: 'REMOVE TO LIST',
	room: {
		name: room.name,
	}
})

const update_list = room => ({
	type: 'UPDATE LIST',
	room: {
		name: room.name,
		state: room.state,
		players: room.listPlayer.map(({ name }) => ({ name })),
	}
})

const score = ({score, linesDone}) => ({
	type: 'SCORE',
	score,
	linesDone,
})

const new_board = ({name, board,looser}) => ({
	type: 'NEW BOARD',
	player: { name, board, looser }
})

const room_init = (room) => ({
	type: 'ROOM INIT',
	players: room.listPlayer.map(({ name, board, looser }) => ({ name, board, looser })),
	leader: room.leader.name,
	state: room.state
})

const error = message => ({
	type: 'ERROR',
	message
})

const initEngine = io => {

  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    


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
		player.reset()
		if (!room.listPlayer.length) {
			room.finish()
			room_list.splice(room_list.indexOf(room), 1)
			io.sockets.emit('action', remove_to_list(room))
		} else {
			io.sockets.emit('action', update_list(room))
			io.sockets.in(room.name).emit('action', room_init(room))
		}
	}

    socket.on('action', action => {

		
      let room = room_list.find(e => e.listPlayer.indexOf(player) !== -1)

	  switch (action.type.slice(action.type.indexOf('/') + 1)) {

		case 'create':
			if (playerExists(action.player.name) || roomExists(action.room.name)) {
				return socket.emit('action', error('Name already exists'))
			}
			player.name = action.player.name
			room = new Room(action.room.name, player)
			room_list.push(room)
			socket.join(room.name)
			io.sockets.in(room.name).emit('action', room_init(room))
			io.sockets.emit('action', add_to_list(room))
			break;
		
		case 'join':
			if (playerExists(action.player.name)) {
				return socket.emit('action', error('Name already exists'))
			}
			if (!(room = room_list.find(e => e.name === action.room.name)))
				return socket.emit('action', error('Room unknows'))
			player.name = action.player.name
			room.add(player)
			socket.join(room.name)
			io.sockets.in(room.name).emit('action', room_init(room))
			io.sockets.emit('action', update_list(room))
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
					board: p.board,
					looser: p.looser
				})),
			})
			io.sockets.emit('action', update_list(room))
			break;

		case 'ask newtetro':
			if (!room)
				return;
			
			room.sendTetro(action.index, player)
				.then( tetro => socket.emit('action', {type: 'NEWTETRO', tetro}) )
			
			const linesDeleted = action.linesDeleted.length
			if (linesDeleted) {
				player.scoring(linesDeleted)
				socket.broadcast.to(room.name).emit('action', {
					type: "ADD LINE",
					lineToAddNbr: linesDeleted - 1,
				})
				socket.emit('action', score(player))
			}
			break;

		case 'board change':
			if (!room)
				return;
			player.board = action.board
			socket.broadcast.to(room.name).emit('action', new_board(player))
			break;

		case 'loose':
			if (!room)
				return;
			player.loose()
			if (room.listPlayer.length === 1 || nbrPlayersInGame(room) === 1) {
				room.listPlayer.forEach(player => {
					addScoreToDb(player)
				})
				room.finish()
				io.sockets.emit('action', update_list(room))
			}
			io.sockets.in(room.name).emit('action', room_init(room))
			break;

		case 'exit':
			if (!room)
				return;
			moveOut(room)
			break;
		}

    })

    socket.on('disconnect', () => {
      const room = room_list.find(e => e.listPlayer.indexOf(player) !== -1)
      if (!room)
        return;
      moveOut(room)
    })

    hightScores.show()
      .then(hightScores => {
        socket.emit('action', {
          type: 'HIGHT SCORES',
          hightScores
        })
      })
    socket.emit('action', init_list())

  })
}


export default initEngine