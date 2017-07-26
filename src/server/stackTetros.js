// [ 00 01 ... 09
//   10 11 ... 19
//   ...
//   30 31 ... 39 ]

const tetros = [
  {
    type: "t",
    crd: [0, 1, 2, 11]
  },
  {
    type: "l",
    crd: [2, 10, 11, 12]
  },
  {
    type: "l-inv",
    crd: [0, 1, 2, 12]
  },
  {
    type: "i",
    crd: [0, 1, 2, 3]
  },
  {
    type: "s",
    crd: [0, 1, 11, 12]
  },
  {
    type: "s-inv",
    crd: [1, 2, 10, 11]
  },
  {
    type: "square",
    crd: [0, 1, 10, 11]
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
