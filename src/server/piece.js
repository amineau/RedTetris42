const tetros = [
  {
    type: 1,
    matrix: [[
      [ 0, 0, 1, 0 ],
      [ 0, 1, 1, 1 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
    ],[
      [ 0, 0, 1, 0 ],
      [ 0, 1, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ],[
      [ 0, 0, 0, 0 ],
      [ 0, 1, 1, 1 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 1 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ]]
  },
  {
    type: 2,
    matrix: [[
      [ 0, 0, 0, 0 ],
      [ 0, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 0, 1, 1 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 1, 0, 0 ],
      [ 0, 1, 1, 1 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 1, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ]]
  },
  {
    type: 3,
    matrix: [[
      [ 0, 0, 0, 0 ],
      [ 0, 1, 1, 1 ],
      [ 0, 1, 0, 0 ],
      [ 0, 0, 0, 0 ],
    ],[
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 1 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 0, 0, 1 ],
      [ 0, 1, 1, 1 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 1, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ]]
  },
  {
    type: 4,
    matrix: [[
      [ 0, 0, 0, 0 ],
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 0 ],
    ]]
  },
  {
    type: 5,
    matrix: [[
      [ 0, 0, 0, 0 ],
      [ 0, 0, 1, 1 ],
      [ 0, 1, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 0, 1, 0 ],
      [ 0, 0, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 0 ],
    ]]
  },
  {
    type: 6,
    matrix: [[
      [ 0, 0, 0, 0 ],
      [ 0, 1, 1, 0 ],
      [ 0, 0, 1, 1 ],
      [ 0, 0, 0, 0 ],
    ], [
      [ 0, 0, 0, 1 ],
      [ 0, 0, 1, 1 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ]]
  },
  {
    type: 7,
    matrix: [[
      [ 0, 0, 0, 0 ],
      [ 0, 1, 1, 0 ],
      [ 0, 1, 1, 0 ],
      [ 0, 0, 0, 0 ],
    ]]
  },
]

export class Piece {

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
      if (keys.indexOf(index + 1) === -1) {
        if (keys.indexOf(index) === -1) {
          return reject({error: "Index non conforme ou hors zone, sorry", index, keys})
        }
        this._getNewTetro()
          .then(newTetro => {
            this._pool[index + 1] = newTetro
            return resolve(newTetro)
          })
      } else {
        resolve(this._pool[index + 1])
      }
    })
  }

  _getMinIndex() {
    const keys = Object.keys(this._pool)
    return Math.min(...keys)
  }

  _getTetroRandom () {
    const index = Math.floor(Math.random()*this._tetros.length)
    this._tetros[index].crd = {
      x: 7,
      y: 18,
    }
    this._tetros[index].orientation = 0
    return this._tetros[index]
  }

  _getNewTetro () {
    return new Promise(resolve => {
      const newTetro = this._getTetroRandom()
      resolve(newTetro)
    })
  }

  removeTetroOfPool () {
    delete this._pool[this._getMinIndex()]
  }

}
