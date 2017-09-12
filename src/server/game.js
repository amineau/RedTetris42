import { Piece } from './piece'
import { Player } from './player'

export default class Game {

  constructor (game, player) {
    this.name = game
    this.leader = player
    this.listPlayer = [player]
    this.state = 0
    this._piece = null
    this._position = 0
    this.initStack()
  }

  get stack ()      { return this._piece.pool }

  initStack () {
    this._piece = new Piece()
    this._position = 0
  }

  sendTetro (index, player) {
    player.position = index
    return this._piece.tetroByIndex(index)
  }

  add (player) {
    this.listPlayer.push(player)
  }

  remove (player) {
    const index = this.listPlayer.indexOf(player)
    if (index === -1)
      return;
    this.listPlayer.splice(index, 1)
    if (this.leader === player) {
      this.leader = this.listPlayer[0]
    }
  }

  start () {
    if (this.state === 0 || this.state === 2) {
      this.state = 1
      this.listPlayer.map(player => player.reset())
    }
  }

  finish () {
    if (this.state === 1) {
      this.state = 2
      this.initStack()
    }
  }

}