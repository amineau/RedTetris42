// ([
// [ 0, 0, 1 ],
// [ 1, 1, 1 ],
// [ 0, 0, 0 ],
// ])

import math from 'mathjs'

const tetros = [
  {
    type: "t",
    crd: math.matrix([
        [ 0, 1, 0 ],
        [ 1, 1, 1 ],
    ])
  },
  {
    type: "L",
    crd: math.matrix([
        [ 1, 1, 1 ],
        [ 1, 0, 0 ],
    ])
  },
  {
    type: "L-inv",
    crd: math.matrix([
        [ 1, 1, 1 ],
        [ 0, 0, 1 ],
    ])
  },
  {
    type: "i",
    crd: math.matrix([
        [ 1, 1, 1, 1 ],
    ])
  },
  {
    type: "s",
    crd: math.matrix([
        [ 1, 1, 0 ],
        [ 0, 1, 1 ],
    ])
  },
  {
    type: "s-inv",
    crd: math.matrix([
        [ 0, 1, 1 ],
        [ 1, 1, 0 ],
    ])
  },
  {
    type: "square",
    crd: math.matrix([
        [ 1, 1 ],
        [ 1, 1 ],
    ])
  },
]

export class StackTetros {

  constructor() {
    this._tetros = tetros
    this._pool = {
      0: this._getTetroRandom(),
      1: this._getTetroRandom()
    }
  }

  get tetros () { return this._tetros }
  get pool ()   { return this._pool }

  tetroByIndex (index) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this._pool).map(x => Number(x))
      if (keys.indexOf(index) === -1) {
        if (keys.indexOf(index - 1) === -1) {
          return reject({error: "Index non conforme ou hors zone, sorry", index, keys})
        }
        this._getNewTetro()
          .then(newTetro => {
            this._pool[index] = newTetro
            return resolve(newTetro)
          })
      } else {
        resolve(this._pool[index])
      }
    })
  }

  _getMinIndex() {
    const keys = Object.keys(this._pool)
    return Math.min(...keys)
  }

  _getTetroRandom () {
    return this._tetros[Math.floor(Math.random()*this._tetros.length)]
  }

  _getNewTetro () {
    return new Promise(resolve => {
      const newTetro = this._getTetroRandom()
      resolve(newTetro)
    })
  }

  removeTetroToPool () {
    delete this._pool[this._getMinIndex()]
  }

}