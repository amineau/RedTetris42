import chai from "chai"
import chaiArrays from "chai-arrays"
import { translateTetro, manageBarTetro } from '../src/client/components/board'
import { getShadow } from '../src/client/components/shadow'

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
    // res.should.equalTo([233,232,246,245])
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
