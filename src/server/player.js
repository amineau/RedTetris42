export class Player {

  constructor (socketId, name = 'guest') {
    console.log(`Player construct with socketId ${socketId}`)
    this._socketId = socketId
    this._name = name
    this._position = 0
    this._board = []
  }

  toString ()       { return this._name }

  get position ()   { return this._position}
  get socketId ()   { return this._socketId }
  get board ()      { return this._board}

  set name (name)   { this._name = name }
  set board (tetro) { this._board.concat(tetro)}

  incrementPosition () { this._position++ }
}
