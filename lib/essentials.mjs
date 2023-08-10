'use strict'

import { getEnv } from "./envreader.mjs";

/**
 * @param { Request } req
 * @param { ( params: {} ) => void } callback
 */
export const buildPostParams = async ( req, callback ) => {
    let res = ""
    let ended = false ;
    req.on( 'data', ( data ) => {
        res += data
    } )

    req.on( 'end', () => {
        ended = true
        res = JSON.parse( res )
        callback( res )
    } )
}

/**
 * @param { Request } req
 * @param { ( params: {} ) => void } callback
 */
export const buildGetParams = async ( req, callback ) => {
    let res = {}
    const HOST = getEnv( 'HOST', 'localhost' )
    const PORT = getEnv( 'PORT', 3000 )
    const url = `${ HOST }:${ PORT }${ req.url }`
    let builder = new URL( url ).searchParams
    for ( const [ key, value ] of builder ) {
        res[ key ] = value
    }
    callback( res )
}
