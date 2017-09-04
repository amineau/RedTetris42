import math from 'mathjs'

export default class Player {

  constructor (socketId, name = 'guest') {
    console.log(`Player construct with socketId ${socketId}`)
    this._socketId = socketId
    this.name = name
    this.position = 0
    this.score = 0
    this.looser = false
    this.board = null 
    this.boardInit()
  }

  boardInit () {
    this.board = [];
    this.board.length = 252;
    this.board.fill(0);
    this.board.forEach((e, i) => {
    if (i % 12 === 0 || i % 12 === 11 || i < 12)
        this.board[i] = 8
    })
    this.position = 0
    this.score = 0
    this.looser = false
  }

  loose () {
    this.looser = true
    this._boardFull()
  }

  _boardFull () {
    this.board.forEach((e, i) => {
    if (!(i % 12 === 0 || i % 12 === 11 || i < 12))
        this.board[i] = 11
    })
  }

  incrementPosition () { this._position++ }

  scoring (nbLines) {
    const bonus = math.round(0.42 * 42 * (nbLines - 1))
    this.score += 42 * nbLines + bonus
  }
}