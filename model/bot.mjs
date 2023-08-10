'use strict'

export const getChoice = () => {
    return Math.trunc( Math.random() * 10 ) % 3
}

export default { getChoice }
