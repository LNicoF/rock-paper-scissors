'use strict'

import { readFileSync } from 'fs'

const ENV_FILE = '.env'

let env = {
}

const parseFile = () => {
    /** @type string */
    let rawContents = readFileSync( ENV_FILE, 'utf8' )
    for ( let prop of rawContents.split( '\n' ) ) {
        const [ name, value ] = prop.split( '=' )
        if ( value === undefined ) {
            if ( !name ) {
                continue
            }
            throw `Syntax error on ${ ENV_FILE }`
        }
        env[ name ] = value
    }
}

const init = () => {
    try {
        parseFile()
    } catch {
        console.error( 'couldn\'t parse env file' )
    }
}

/**
 * @param { string } varName
 * @param { any } defaultValue
 */
export const getEnv = ( varName, defaultValue ) => {
    return env[ varName ] ?? defaultValue
}

init()

export default { get: getEnv }

