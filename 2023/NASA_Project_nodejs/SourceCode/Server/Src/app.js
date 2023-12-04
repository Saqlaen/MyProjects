const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const path = require('path');

const planetsRouter = require('./Routes/planets.router')
const launchesRouter = require('./Routes/launch.router')

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
app.use( express.static( path.join( __dirname, '..', 'Public' )))

// adding our route handler's
app.use("/planets", planetsRouter);
app.use( '/launches', launchesRouter );

// request's from browser
app.get('/*', ( req, res ) => {
    res.sendFile( path.join( __dirname, "..", 'Public', 'index.html') )
})

module.exports =  app;