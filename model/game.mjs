'use strict'

export const [
    ROCK,
    PAPER,
    SCISSORS,
] = Array( 3 ).keys() // 0, 1, 2

export const LABELS = [ 'Rock', 'Paper', 'Scissor' ]

/** inv: BATTLES[ i ].winner == i */
export const BATTLES = [
    { winner: ROCK,     looser: SCISSORS },
    { winner: PAPER,    looser: ROCK },
    { winner: SCISSORS, looser: PAPER },
]

/**
 * @param { number } lhs
 * @param { number } rhs
 * @return ( -1 | 0 | 1 )
 */
export const play = ( lhs, rhs ) => {
    if ( lhs == rhs ) {
        return 0 ;
    }
    return BATTLES[ lhs ].looser == rhs
        ? -1
        : 1
}
