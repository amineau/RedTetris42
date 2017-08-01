import math from 'mathjs'

export default function matriceRotate (matrix) {
    const size = matrix.size()
    let newMatrix = math.zeros(size[1], size[0])
    matrix.data().forEach((index, y) => {
        index.forEach((ind, x) => {
            if (ind) {
                newMatrix.subset(math.index(y, x), 1)
            }
        })
    })
    return newMatrix
}