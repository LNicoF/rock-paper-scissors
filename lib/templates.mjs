'use strict'

import { readFile } from 'fs/promises'
import { getEnv } from './envreader.mjs'

const regex = /({{)([^}]*)(}})/gm

const PUB_DIR = getEnv( 'PUB_DIR', 'pub' )

/** @param { string } url */
const route = ( url ) => `/${ PUB_DIR }/${ url }`

/**
 * @param { string } filename
 * @param { Object } args     access from the template with {{ args.<> }}
 */
export const parseTemplate = async ( filename, args = {} ) => {
    /** @type string */
    let content = await readFile( filename, 'utf8' )
    return content.replace( regex, ( expr ) => eval( expr ) )
}

export default { parse: parseTemplate }
