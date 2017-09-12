import debug from 'debug'
import Player from './player'
import Game from './game'
import HightScores from './database'

const loginfo = debug('tetris:info')

let game_list = []
const hightScores = new HightScores()

const playerExists = playerName => (
	game_list.find(game => (
		game.listPlayer.find(player => player.name === playerName)
	))
)

const gameExists = gameName => (
	game_list.find(game => game.name === gameName)
)

const nbrPlayersInGame = game => (
	game.listPlayer.filter(player => !player.looser).length
)

const init_list = () => ({
	type: 'INIT LIST',
	gameList: game_list.map(game => ({
		name: game.name,
		state: game.state,
		players: game.listPlayer.map(({name}) => ({ name })),
	}))
})

const add_to_list = game => ({
	type: 'ADD TO LIST',
	game: {
		name: game.name,
		state: game.state,
		players: game.listPlayer.map(({ name }) => ({ name })),
	}
})

const remove_to_list = game => ({
	type: 'REMOVE TO LIST',
	game: {
		name: game.name,
	}
})

const update_list = game => ({
	type: 'UPDATE LIST',
	game: {
		name: game.name,
		state: game.state,
		players: game.listPlayer.map(({ name }) => ({ name })),
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

const game_init = (game) => ({
	type: 'GAME INIT',
	players: game.listPlayer.map(({ name, board, looser }) => ({ name, board, looser })),
	leader: game.leader.name,
	state: game.state
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
	const moveOut = game => {
		socket.leave(game.name)
		if (game.state === 1)
			addScoreToDb(player)
		game.remove(player)
		player.reset()
		if (!game.listPlayer.length) {
			game.finish()
			game_list.splice(game_list.indexOf(game), 1)
			io.sockets.emit('action', remove_to_list(game))
		} else {
			io.sockets.emit('action', update_list(game))
			io.sockets.in(game.name).emit('action', game_init(game))
		}
	}

    socket.on('action', action => {

		
      let game = game_list.find(e => e.listPlayer.indexOf(player) !== -1)

	  switch (action.type.slice(action.type.indexOf('/') + 1)) {

		case 'create':
			if (playerExists(action.player.name) || gameExists(action.game.name)) {
				return socket.emit('action', error('Name already exists'))
			}
			player.name = action.player.name
			game = new Game(action.game.name, player)
			game_list.push(game)
			socket.join(game.name)
			io.sockets.in(game.name).emit('action', game_init(game))
			io.sockets.emit('action', add_to_list(game))
			break;
		
		case 'join':
			if (playerExists(action.player.name)) {
				return socket.emit('action', error('Name already exists'))
			}
			if (!(game = game_list.find(e => e.name === action.game.name)))
				return socket.emit('action', error('Game unknows'))
			player.name = action.player.name
			game.add(player)
			socket.join(game.name)
			io.sockets.in(game.name).emit('action', game_init(game))
			io.sockets.emit('action', update_list(game))
			break;

		case 'start':
			if (!game)
				return;
			game.start()
			io.sockets.in(game.name).emit('action', {
				type: 'GAME START',
				initStack: game.stack,
				state: game.state,
				players: game.listPlayer.map(p => ({
					name: p.name,
					board: p.board,
					looser: p.looser
				})),
			})
			io.sockets.emit('action', update_list(game))
			break;

		case 'ask newtetro':
			if (!game)
				return;
			
			game.sendTetro(action.index, player)
				.then( tetro => socket.emit('action', {type: 'NEWTETRO', tetro}) )
			
			const linesDeleted = action.linesDeleted.length
			if (linesDeleted) {
				player.scoring(linesDeleted)
				socket.broadcast.to(game.name).emit('action', {
					type: "ADD LINE",
					lineToAddNbr: linesDeleted - 1,
				})
				socket.emit('action', score(player))
			}
			break;

		case 'board change':
			if (!game)
				return;
			player.board = action.board
			socket.broadcast.to(game.name).emit('action', new_board(player))
			break;

		case 'loose':
			if (!game)
				return;
			player.loose()
			if (game.listPlayer.length === 1 || nbrPlayersInGame(game) === 1) {
				game.listPlayer.forEach(player => {
					addScoreToDb(player)
				})
				game.finish()
				io.sockets.emit('action', update_list(game))
			}
			io.sockets.in(game.name).emit('action', game_init(game))
			break;

		case 'exit':
			if (!game)
				return;
			moveOut(game)
			break;
		}

    })

    socket.on('disconnect', () => {
      const game = game_list.find(e => e.listPlayer.indexOf(player) !== -1)
      if (!game)
        return;
      moveOut(game)
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