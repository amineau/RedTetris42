import { StackTetros } from './stackTetros'
import { Player } from './player'

export default class Room {

  constructor (room, player) {
    this.name = room
    this._leader = player
    this.listPlayer = [player]
    this._state = "waiting"
    this._stack = new StackTetros()
    this._position = 0
  }

  get stack ()      { return this._stack.pool }

  sendTetro (index, socketId) {
    const player = this.listPlayer.filter(e => {
      return e.socketId === socketId
    })
    console.log(player)
    // const player = this._listPlayer[0]
    player._position = index
    return this._stack.tetroByIndex(index)
  }

  add (player) {
    this.listPlayer.push(player)
  }

  remove (player) {
    const index = this.listPlayer.indexOf(player)
    this.listPlayer.splice(index, 1)
    if (this._leader === player) {
      this._leader = this.listPlayer[0]
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