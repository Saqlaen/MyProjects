const express = require('express')
const socket = require('socket.io')

// initialize
const app = express();
app.use( express.static( '/public' ) )

let port = 5000;

// listen
let server = app.listen( port, () => {
    console.log( 'listening on port ' + port );
})

let io = socket( server )
console.log( io )
io.on( "connection", (socket) => {
    console.log('made connection', socket.id )
} )
