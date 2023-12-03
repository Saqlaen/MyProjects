const express = require("express");
const planetsRouter = require('./Routes/planets.router')

const app = express();

// MIDDLEWARE'S
app.use( express.json() );
app.use( planetsRouter )

module.exports =  app;