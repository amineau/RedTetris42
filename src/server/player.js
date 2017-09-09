import math from 'mathjs'

export default class Player {

  constructor (socketId, name = 'guest') {
    console.log(`Player construct with socketId ${socketId}`)
    this._socketId = socketId
    this.name = name
    this.position = 0
    this.score = 0
    this.linesDone = 0
    this.looser = false
    this.board = this._boardFill()
  }

  _boardFill(type = 0) {
    let board = []
    board.length = 252;
    board.fill(type);
    board.forEach((e, i) => {
    if (i % 12 === 0 || i % 12 === 11 || i < 12)
      board[i] = 8
    })
    return board
  }

  reset () {
    this.board = this._boardFill()
    this.position = 0
    this.score = 0
    this.linesDone = 0
    this.looser = false
  }

  loose () {
    this.looser = true
    this.board = this._boardFill(11)
  }

  scoring (nbLines) {
    const bonus = math.round(0.42 * 42 * (nbLines - 1))
    this.score += 42 * nbLines + bonus
    this.linesDone += nbLines
  }
}