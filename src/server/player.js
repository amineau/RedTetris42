export default class Player {

  constructor (socketId, name = 'guest') {
    console.log(`Player construct with socketId ${socketId}`)
    this._socketId = socketId
    this._name = name
    this._position = 0
    this._lines = 0
    this._score = 0
    this._level = 0
    this._board = []
  }

  get position ()   { return this._position}
  get socketId ()   { return this._socketId }
  get board ()      { return this._board}
  get name ()       { return this._name}
  get level ()      { return this._level}
  get lines ()      { return this._lines}
  get score ()      { return this._score}

  set name (name)         { this._name = name }
  set lines (lines)       { this._lines = lines }
  set score (score)       { this._score = score }
  set level (level)       { this._level = level }
  set position (position) { this._position = position }
  set board (tetro)       { this._board.concat(tetro)}

  incrementPosition () { this._position++ }
}