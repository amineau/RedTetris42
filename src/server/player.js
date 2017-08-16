export default class Player {

  constructor (socketId, name = 'guest') {
    console.log(`Player construct with socketId ${socketId}`)
    this._socketId = socketId
    this.name = name
    this.position = 0
    this.lines = 0
    this.score = 0
    this.level = 0
    this.board = []
  }

  incrementPosition () { this._position++ }
}