import chai from "chai"
import chaiArrays from "chai-arrays"
import { translateTetro, manageBarTetro } from '../src/client/components/board'
import { getShadow } from '../src/client/components/shadow'
import { matriceRotate, writeTetroOnBoard, completeLine, deleteLine, addLine, boardInit, boardFill } from '../src/client/reducers/move'
import Player from '../src/server/player'
import Room from '../src/server/room'
import {StackTetros} from '../src/server/stackTetros'
import Create from '../src/client/components/create'
import Home from '../src/client/components/home'
import Preview from '../src/client/components/preview'
import Shadow from '../src/client/components/shadow'
import Score from '../src/client/components/score'
import Join from '../src/client/components/join'
import Panel from '../src/client/components/panel'
import MainView from '../src/client/containers/mainView'
import HighScores from '../src/server/database'
import {fall, dive, left, right, rotate, room_exit, playerName, test } from '../src/client/actions/index'

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
  // it('increment position', () => {
  //   res.incrementPosition()
  //   expect(res).to.have.property('position', 1);
  // });
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

describe('component: create', () => {
  let res = new Create({name: "bob", list: {player: ["herve"], room: []}})
  it('construction', () => {
    expect(res).to.have.property('props')
  });
  it('compare player name different', () => {
    const test = res.compareRoomsName("bill")
    expect(test).to.be.equal(true)
  });
  it('compare player name equal', () => {
    const test = res.compareRoomsName("herve")
    expect(test).to.be.equal(true)
  });
  it('handleChangeName', () => {
    res.handleNameChange({target: {value: 'jim'}})
    expect(res.props).to.have.property('name', 'bob')
  });
});

describe('component: Home', () => {
  let res = new Home({name: "bob", list: {player: ["herve"]}})
  it('construction', () => {
    expect(res).to.have.property('props')
  });
  it('init state func', () => {
    const test = res.initState("phil")
    expect(test).to.have.property('name', "phil")
    expect(test).to.have.property('playerNameChecked', true)
  });
  it('compare player name different', () => {
    const test = res.comparePlayersName("bill")
    expect(test).to.be.equal(true)
  });
  it('compare player name equal', () => {
    const test = res.comparePlayersName("herve")
    expect(test).to.be.equal(false)
  });
  it('create game', () => {
    res.createGame({})
    expect(res).to.exist
  });
  it('join game', () => {
    res.joinGame({})
    expect(res).to.exist
  });
  it('handleChangeName', () => {
    res.handleNameChange({target: {value: 'jim'}})
    expect(res.props).to.have.property('name', 'bob')
  });
});

describe('component: Preview', () => {
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
  let res = new Preview(tetro)
  it('normal construction', () => {
    expect(res).to.have.property('props')
  });
  res = new Preview({})
  it('empty construction', () => {
    expect(res).to.have.property('props')
  });
});

describe('component: Shadow', () => {
  const board = blankBoard
  const res = new Shadow({board, name:"bob"})
  it('normal construction', () => {
    expect(res).to.have.property('props')
  });
});

describe('component: Score', () => {
  const res = new Score(42)
  it('normal construction', () => {
    expect(res).to.have.property('props')
  });
});

describe('component: Join', () => {
  const res = new Join({name: "bob", list: {player: ["herve"]}})
  it('normal construction', () => {
    expect(res).to.have.property('props')
  });
});

describe('component: Panel', () => {
  const res = new Panel({name: "bob", info: "10"})
  it('normal construction', () => {
    expect(res).to.have.property('props')
  });
});

describe('component: MainView', () => {
  const res = new MainView({room: {leader: "bob", state: 0},player:{name: "bob"}, socket: "10"})

  it('normal construction', () => {
    expect(res).to.have.property('props')
  });
  it('keydown', () => {
    res.onKeyDown({keycode: 37});
    expect(res).to.have.property('props')
  });
});

describe('database', () => {
  const res = new HighScores()
  res.add("bob", "1000","10")
  res.show()
  res.close()
  it('normal construction', () => {
    res.show().then((rows) => {
      expect(rows[0]).to.have.property('player', "bob")
    })
  });
});

describe('actions', () => {
  let action = fall()
  it('fall', () => {
    expect(action).to.have.property('type')
  });
  action = dive()
  it('dive', () => {
    expect(action).to.have.property('type')
  });
  action = left()
  it('left', () => {
    expect(action).to.have.property('type')
  });
  action = right()
  it('right', () => {
    expect(action).to.have.property('type')
  });
  action = rotate()
  it('rotate', () => {
    expect(action).to.have.property('type')
  });
  action = room_exit()
  it('room_exit', () => {
    expect(action).to.have.property('type')
  });
  action = playerName()
  it('playerName', () => {
    expect(action).to.have.property('type')
  });
  action = test()
  it('test', () => {
    expect(action).to.have.property('type')
  });
});