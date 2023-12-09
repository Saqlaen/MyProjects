const express = require('express');
const app = express();



app.get( '/', ( req, res ) => {
    res.send( "i'm up" );
} );

app.get( '/timer', (req, res) => {
    Delay(9000);
    res.send("done!! yaay yaay yaay");
});

function Delay( duration ){
    const startTime = Date.now();
    while( Date.now() - startTime < duration ){

    }
}

app.listen( 3000, () => {
    console.log( 'listening on port 3000')
} )