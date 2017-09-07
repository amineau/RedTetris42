import chai from "chai"
import chaiArrays from "chai-arrays"
import { translateTetro, manageBarTetro } from '../src/client/components/board'
import { getShadow } from '../src/client/components/shadow'
import { matriceRotate, writeTetroOnBoard, completeLine, deleteLine, addLine, boardInit, boardFill } from '../src/client/reducers/move'
import Player from '../src/server/player'
import Room from '../src/server/room'
import {StackTetros} from '../src/server/stackTetros'

chai.use(chaiArrays)
const expect = chai.expect
chai.should()

let blankBoard = [];
blankBoard.length = 252;
blankBoard.fill(0);
blankBoard.forEach((e, i) => {
  if (i % 12 === 0 || i % 12 === 11 || i < 12)
    blankBoard[i] = 8
})

describe('Board: translateTetro', () => {
  it('matrix => crd', () => {
    const tetro = {
      crd: {x:7, y:18},
      orientation: 0,
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
    }
    const res = translateTetro(tetro)
    expect(res).to.equalTo([233,232,246,245])
  });
});

describe('Board: manageBarTetro', () => {
  it('bar tetro change img when hori/vert', () => {
    const tetro = {
      crd: {x:7, y:12},
      orientation: 0,
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
    }
    const board = [...blankBoard]
    const translatedTetro = [163, 162, 161, 160]
    const res = manageBarTetro(board, translatedTetro, tetro)
    expect(res[160]).to.equal(14)
    expect(res[161]).to.equal(13)
    expect(res[162]).to.equal(13)
    expect(res[163]).to.equal(12)
  });
});

describe('Shadow: get shadow', () => {
  it('on blank board', () => {
    const board = [...blankBoard]
    const res = getShadow(board, 11)
    expect(res[160]).to.equal(0)
  });
});

describe('reducers func: rotateMatrice', () => {
  it('simple case', () => {
    const tetro = {
      crd: {x:7, y:12},
      orientation: 0,
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
    }
    const res = matriceRotate(tetro)
    expect(res).to.equal(1)
  });
});

describe('reducers func: writeTetroOnBoard', () => {
  it('tetro with negative crd', () => {
    const tetro = {
      crd: {x:-1, y:-12},
      orientation: 0,
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
    }
    const state = {tetro: tetro, board: blankBoard}
    const res = writeTetroOnBoard(state)
    expect(res[160]).to.equal(0)
    expect(res[161]).to.equal(0)
    expect(res[162]).to.equal(0)
    expect(res[163]).to.equal(0)
  });
});

describe('reducers func: completeLine', () => {
  it('blank board', () => {
    const board = [...blankBoard]
    const res = completeLine(board)
    expect(res).to.be.an('array').with.lengthOf(0);
  });
});

describe('reducers func: deleteLine', () => {
  it('blank board', () => {
    const board = [...blankBoard]
    const res = deleteLine(board)
    expect(res).to.have.property('board')
    expect(res).to.have.property('linesDeleted')
  });
});

describe('reducers func: addLine', () => {
  const board = [...blankBoard]
  it('blank board, typeLine 4', () => {
    const res = addLine(board, 4)
    expect(res).to.be.an('array').with.lengthOf(252);
    expect(res[160]).to.equal(0)
  });
  it('blank board, typeLine 9', () => {
    const res = addLine(board, 9)
    expect(res).to.be.an('array').with.lengthOf(252);
    expect(res[160]).to.equal(0)
  });
});

describe('reducers func: boardInit', () => {
  it('unique case', () => {
    const res = boardInit()
    expect(res).to.be.an('array').with.lengthOf(252);
  });
});

describe('reducers func: boardFill', () => {
  it('fill with brick 0', () => {
    const res = boardFill(0)
    expect(res).to.be.an('array').with.lengthOf(252);
  });
});

describe('server class: player', () => {
  const res = new Player(2342342, "bob")
  it('construction', () => {
    expect(res).to.have.property('_socketId', 2342342);
    expect(res).to.have.property('name', 'bob');
    expect(res).to.have.property('position', 0);
    expect(res).to.have.property('score', 0);
    expect(res.board).to.be.an('array').with.lengthOf(252);
  });
  it('increment position', () => {
    res.incrementPosition()
    expect(res).to.have.property('position', 1);
  });
  it('lose', () => {
    res.loose()
    expect(res).to.have.property('looser', true);
  });
});

describe('server class: room', () => {
  const player = new Player(2342342, "bob")
  const res = new Room("room", player)

  it('construction', () => {
    expect(res).to.have.property('name', "room");
    expect(res).to.have.property('leader', player);
    expect(res).to.have.property('state', 0);
  });
  const player2 = new Player(2, 'bill');
  it('add player', () => {
    res.add(player2)
    expect(res.listPlayer).to.be.an('array').with.lengthOf(2);
  });
  it('remove player', () => {
    res.remove(player2)
    expect(res.listPlayer).to.be.an('array').with.lengthOf(1);
  });
  it('start after construction', () => {
    res.start()
    expect(res).to.have.property('state', 1);
  });
  it('start after start', () => {
    res.start()
    expect(res).to.have.property('state', 1);
  });
  it('finish', () => {
    res.finish()
    expect(res).to.have.property('state', 2);
  });
});

describe('server class: stackTetros', () => {
  let res = new StackTetros()
  it('construction', () => {
    expect(res).to.have.property('_pool');
    expect(res._tetros).to.be.an('array').with.lengthOf(7);
  });
  it('get tetro by index', () => {
    let tetro = res.tetroByIndex(1)
    expect(tetro).to.exist;
    tetro = res.tetroByIndex(10)
    expect(tetro).to.exist;
  });
  it('get min index', () => {
    const min = res._getMinIndex()
    expect(min).to.be.equal(0);
  });
  it('get random tetro', () => {
    const tetro = res._getTetroRandom()
    expect(tetro).to.have.property('matrix');
  });
  it('get new tetro', () => {
    const tetro = res._getNewTetro()
    expect(tetro).to.exist;
  });
  it('remove tetro', () => {
    res.removeTetroOfPool()
    const min = res._getMinIndex()
    expect(min).to.be.equal(1);
  });
  
});

