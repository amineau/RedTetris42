 import { WHITE, T, L, LINV, BARTOP, SINV, S,
        SQUARE, BRICK, BARMIDV, BARBOT, BLOCK,
        BARLEFT, BARMIDH, BARRIGHT } from './tetrosTypes'

 export const TYPESMATRICES = [
        [],
        [0,0,0,0,
        T,T,T,0,
        0,T,0,0,
        0,0,0,0],

        [0,0,0,0,
        0,0,LINV,0,
        LINV,LINV,LINV,0,
        0,0,0,0],

        [0,0,0,0,
        L,0,0,0,
        L,L,L,0,
        0,0,0,0],

        [0,0,0,0,
        BARLEFT,BARMIDH,BARMIDH,BARRIGHT,
        0,0,0,0,
        0,0,0,0],

        [0,0,0,0,
        S,S,0,0,
        0,S,S,0,
        0,0,0,0],

        [0,0,0,0,
        0,SINV,SINV,0,
        SINV,SINV,0,0,
        0,0,0,0],

        [0,0,0,0,
        0,SQUARE,SQUARE,0,
        0,SQUARE,SQUARE,0,
        0,0,0,0]
    ]