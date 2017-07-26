import { StackTetros } from './stackTetros'
import { Player } from './player'

export class Room {

  constructor (room, player) {
    this._name = room
    this._leader = player
    this._listPlayer = [player]
    this._state = "waiting"
    this._stack = new StackTetros()
    this._position = 0
  }

  toString () { return this._name }

  get players ()    { return this._listPlayer }
  get state ()      { return this._state }
  get stack ()      { return this._stack.pool }

  sendTetro (index) {
    return this._stack.tetroByIndex(index)
  }

  add (player) {
    this._listPlayer.push(player)
  }

  remove (player) {
    const index = this._listPlayer.indexOf(player)
    this._listPlayer.splice(index, 1)
    if (this._leader === player) {
      this._leader = this._listPlayer[0]
    }
  }

  start () {
    if (this._state === "waiting" || this._state === "finish") {
      this._state = "playing"
    }
  }

  finish () {
    if (this._state === "playing") {
      this._state = "finish"
    }
  }

}
