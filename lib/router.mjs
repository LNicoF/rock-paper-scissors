'use strict'

let routes = {
    [ '404' ]: ( _, res ) => {
        res.statusCode = 404
        res.end( '<h1> 404 </h1>' )
    }
}

/** @param { string } url */
const extractPath = ( url ) => url.split( '?' )[ 0 ]

/**
 * @param { string } route
 * @param { Function } callback
 */
export const addRoute = ( route, callback ) => {
    if ( routes[ route ] !== undefined ) {
        throw 'Route already declared'
    }
    routes[ route ] = callback
}

export const set404 = ( callback ) => {
    routes[ '404' ] = callback
}

export const run = ( req, res ) => {
    const path = extractPath( req.url )
    for ( const [ route, callback ] of Object.entries( routes ) ) {
        if ( route === path ) {
            callback( req, res )
            return
        }
    }
    routes[ '404' ]( req, res )
}

export default {
    addRoute,
    set404,
    run,
}
