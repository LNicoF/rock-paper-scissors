'use strict'

import http              from 'http'
import { getEnv }        from './lib/envreader.mjs'
import router            from "./lib/router.mjs"
import { parseTemplate } from "./lib/templates.mjs"
import bot               from './model/bot.mjs'
import { play } from './model/game.mjs'
import { buildGetParams } from './lib/essentials.mjs'

const HOST    = getEnv( 'HOST', 'localhost' )
const PORT    = getEnv( 'PORT', 3000 )
const PUB_DIR = getEnv( 'PUB_DIR', 'pub' )

router.addRoute( '/', async ( _, res ) => {
    res.setHeader( 'Content-Type', 'text/html' )
    try {
        res.end( await parseTemplate( `${ PUB_DIR }/index.html` ) )
    } catch {
        console.error( `syntax error on ${ PUB_DIR }/index.html` )
        res.end( 'server error' )
    }
} )

router.addRoute( '/choice/send', ( req, res ) => {
    res.setHeader( 'Content-Type', 'text/json' )
    const botChoice = bot.getChoice()
    buildGetParams( req, ( params ) => {
        res.end( JSON.stringify( {
            choice: botChoice,
            winner: play( parseInt( params.choice ), botChoice )
        } ) )
    } )
} )

const server = http.createServer( async ( req, res ) => {
    if ( req.url.startsWith( `/${ PUB_DIR }/` ) ) {
        try {
            res.end( await parseTemplate( req.url.substr( 1 ), { request: req } ) )
            return
        } catch {
            console.error( `accessing ${ req.url.substr( 1 ) } failed` )
        }
    }

    router.run( req, res )
} )

server.listen( PORT, HOST, () => {
    console.log( `listening on http://${ HOST }:${ PORT }/` )
} )
