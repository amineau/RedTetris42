import { StackTetros } from './stackTetros'
import { Player } from './player'

export default class Room {

  constructor (room, player) {
    this.name = room
    this.leader = player
    this.listPlayer = [player]
    this.state = 0
    this._stack = new StackTetros()
    this._position = 0
  }

  get stack ()      { return this._stack.pool }

  sendTetro (index, socketId) {
    const player = this.listPlayer.filter(e => {
      return e.socketId === socketId
    })
    // const player = this._listPlayer[0]
    player._position = index
    return this._stack.tetroByIndex(index)
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
    }
  }

  finish () {
    if (this.state === 1) {
      this.state = 2
    }
  }

}