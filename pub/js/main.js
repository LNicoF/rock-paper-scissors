'use strict'

const getLabel = ( element ) => {
    return document.querySelector( `label[for=${ element.id }]` )
}

let inputDump    = document.querySelector( '#choice-dump' )
let choiceForm   = document.querySelector( '#choice-form' )
let choiceInputs = document.querySelectorAll( 'input[name=\'choice\']' )
let responseDump = document.querySelector( '#response-dump' )
let resultDump   = document.querySelector( '#result span' )

const clearMatch = () => {
    responseDump.innerHTML = ''
    resultDump.innerHTML   = ''
}

const updateChoice = ( from ) => {
    const label = getLabel( from )
    inputDump.innerHTML = label.innerHTML
}

const validateChoice = () => {
    return true
}

const getChoiceElement = () => {
    for ( const input of choiceInputs ) {
        if ( input.checked ) {
            return input
        }
    }
    return null
}

const buildRequest = ( choice ) => {
    return `${ choiceForm.action }?choice=${ choice }`
}

/** @param { ( -1 | 0 | 1 ) } winner */
const dumpResult = ( winner ) => {
    if ( winner == -1 ) {
        resultDump.innerHTML = 'PLAYER WINS'
    } else if ( winner == 1 ) {
        resultDump.innerHTML = 'CPU WINS'
    } else {
        resultDump.innerHTML = 'TIE'
    }
}

/** @param { { choice, winner } } res */
const processRes = ( res ) => {
    console.log( 'response', res )
    let choiceInput = choiceInputs[ parseInt( res.choice ) ]
    responseDump.innerHTML = getLabel( choiceInput ).innerHTML
    dumpResult( parseInt( res.winner ) )
}

const fmtRes = ( text ) => JSON.parse( text )

const sendChoice = async ( choice ) => {
    let reqUrl = buildRequest( choice )
    let res = await fetch( reqUrl )
    let formattedRes = fmtRes( await res.text() )
    processRes( formattedRes )
}

const init = () => {
    for ( let input of choiceInputs ) {
        input.onchange = ( ev ) => {
            clearMatch()
            updateChoice( ev.target )
        }
        if ( input.checked ) {
            updateChoice( input )
        }
    }

    choiceForm.onsubmit = ( event ) => {
        event.preventDefault()
        let choice = getChoiceElement().value
        let ok = validateChoice( choice )
        if ( ok ) {
            sendChoice( choice )
        }
    }
}

init()
