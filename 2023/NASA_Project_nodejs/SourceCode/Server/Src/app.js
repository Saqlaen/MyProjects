const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const path = require('path');

const v1_API = require('./Routes/api_v1')

const app = express();

// MIDDLEWARE'S

// security feature
app.use( cors({
    origin:'http://localhost:3000',
}) );

//for logs
app.use( morgan('combined') )

//to parse incoming / outgoing json 
app.use( express.json() );

// serving the static files we get from react build
app.use( express.static( path.join( __dirname, '..', 'Public' )));

// versioning our api
app.use('/v1', v1_API );

// request's from browser
app.get('/*', ( req, res ) => {
    res.sendFile( path.join( __dirname, "..", 'Public', 'index.html') )
})

module.exports =  app;